import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { body, validationResult } from "express-validator";
import { storage } from "./storage-factory-simple";
import { InsertBooking, insertBookingSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { emailService } from "./email/emailService";
import OpenAI from 'openai';
import {
  buildKnowledgeContext,
  buildTreatmentOverviewContext,
  fetchTreatmentOverview,
  isTreatmentOverviewQuery,
  searchChatbotKnowledge,
} from "./chatbot/knowledge";

// Función para sanitizar entradas y evitar XSS
function sanitizeInput(str: string): string {
  if (typeof str !== 'string') return str;
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .trim();
}

// Cache simple para respuestas del chatbot
const chatbotCache = new Map<string, { response: string; timestamp: number }>();
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutos

// Validation middleware for booking
const bookingValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres')
    .matches(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/)
    .withMessage('El nombre solo puede contener letras y espacios'),
  
  body('email')
    .trim()
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .isMobilePhone('es-ES')
    .withMessage('Debe ser un número de teléfono español válido'),
  
  body('service')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('El servicio debe especificarse correctamente'),
  
  body('date')
    .trim()
    .isISO8601()
    .withMessage('La fecha debe estar en formato válido'),
  
  body('time')
    .trim()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('La hora debe estar en formato HH:MM'),
  
  body('message')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('El mensaje no puede exceder 500 caracteres')
];

// Chatbot message validation
const chatbotValidation = [
  body('message')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('El mensaje debe tener entre 1 y 500 caracteres')
    .matches(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s\?\!\.\,\:\;\-\_\(\)0-9]+$/)
    .withMessage('El mensaje contiene caracteres no permitidos')
];

// Function to get cached response or call API
async function getChatbotResponse(message: string): Promise<string> {
  const normalizedMessage = message.toLowerCase().trim();
  
  // Check cache first
  const cached = chatbotCache.get(normalizedMessage);
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    console.log('🚀 Using cached chatbot response');
    return cached.response;
  }

  try {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      console.log('⚠️ OPENAI_API_KEY not configured, using fallback response');
      return `¡Hola! 👋 Soy LucyBot del Centro de Estética Lucy Lara. ¿En qué puedo ayudarte? Puedo informarte sobre tratamientos, horarios y reservas. 📞 91 505 20 67`;
    }
    
    const parsedMaxResults = Number(process.env.CHATBOT_KNOWLEDGE_MAX_RESULTS || "8");
    const maxResults = Number.isFinite(parsedMaxResults) && parsedMaxResults > 0 ? parsedMaxResults : 8;
    const parsedOverviewLimit = Number(process.env.CHATBOT_TREATMENT_OVERVIEW_PER_CATEGORY || "2");
    const overviewLimit =
      Number.isFinite(parsedOverviewLimit) && parsedOverviewLimit > 0
        ? Math.min(parsedOverviewLimit, 5)
        : 2;

    let knowledgeContext: string;
    if (isTreatmentOverviewQuery(message)) {
      const treatmentOverview = await fetchTreatmentOverview(overviewLimit);
      if (treatmentOverview.length > 0) {
        knowledgeContext = buildTreatmentOverviewContext(treatmentOverview);
      } else {
        const fallbackItems = await searchChatbotKnowledge(message, maxResults);
        knowledgeContext = buildKnowledgeContext(fallbackItems, message);
      }
    } else {
      const knowledgeItems = await searchChatbotKnowledge(message, maxResults);
      knowledgeContext = buildKnowledgeContext(knowledgeItems, message);
    }

    const LUCYBOT_SYSTEM_PROMPT = `
### IDENTIDAD
Eres LucyBot, la asistente virtual del Centro de Estética Lucy Lara. Hablas como una recepcionista amable y profesional.

### REGLA PRINCIPAL (OBLIGATORIA)
Responde EXCLUSIVAMENTE con información del bloque "CONTEXTO_SUPABASE" y del bloque "INFO_CENTRO".
No inventes datos. Si algo no aparece en el contexto, dilo con naturalidad.

### ESTILO CONVERSACIONAL
- Responde como lo haría una recepcionista amable por chat: cercana, breve y útil.
- Usa un tono cálido pero profesional. Tutea al cliente.
- NO vuelques listados largos de tratamientos ni precios. Sé selectiva.
- Longitud objetivo: 1-3 frases (30-80 palabras). Solo usa bullets si el cliente pide explícitamente una lista.

### CÓMO RESPONDER SEGÚN EL TIPO DE PREGUNTA

**Pregunta general ("¿qué tratamientos tenéis?", "¿qué hacéis?"):**
- Resume las CATEGORÍAS disponibles de forma natural (ej: "Tenemos tratamientos faciales, corporales, masajes, micropigmentación, depilación y más").
- Invita al cliente a indicar qué le interesa para darle más detalle.
- NO enumeres tratamientos individuales ni precios.

**Pregunta sobre una categoría ("tratamientos faciales", "masajes"):**
- Menciona 2-3 tratamientos destacados de esa categoría con precio.
- Ofrece dar más opciones si le interesan.

**Pregunta específica ("¿cuánto cuesta X?", "¿qué incluye X?"):**
- Da la información concreta pedida (precio, duración, frecuencia).
- Sé directa y precisa.

**Pregunta sí/no ("¿hacéis depilación para hombres?"):**
- Empieza por "Sí" o "No" y añade el detalle justo.

**Información del centro (dirección, horario, teléfono):**
- Responde con los datos del bloque INFO_CENTRO.

### INFO_CENTRO
- Dirección: C. de la Alegría de la Huerta, 22, Villaverde, 28041 Madrid
- Horario: Lunes a Viernes de 10:00 a 13:30 y de 16:00 a 19:30
- Teléfono: 91 505 20 67
- WhatsApp: 684 203 633
- Email: celucylar@gmail.com
- Métodos de pago: efectivo y tarjeta
- Transporte: Metro L3 Villaverde Alto, Bus 78/79/123

### CONTEXTO_SUPABASE
${knowledgeContext}
`;

    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: LUCYBOT_SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      temperature: 0.4,
      max_tokens: 250
    });

    if (!response.choices[0]?.message?.content) {
      console.error("Error: No se recibió respuesta de OpenAI");
      return "¡Ups! Parece que hay un problema técnico. Por favor, consulta en recepción 💖";
    }

    const botResponse = response.choices[0].message.content;

    // Cache the response
    chatbotCache.set(normalizedMessage, {
      response: botResponse,
      timestamp: Date.now()
    });

    return botResponse;

  } catch (error) {
    console.error("Error al consultar a LucyBot:", error);
    return "¡Ups! Ahora no puedo responder. Por favor, consulta en recepción 💖";
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({ 
      status: "OK", 
      timestamp: new Date().toISOString(),
      service: "Centro de Estética Lucy Lara API"
    });
  });

  // Booking endpoint with enhanced validation and security
  app.post("/api/booking", bookingValidation, async (req: Request, res: Response) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Datos de formulario inválidos",
          errors: errors.array().map(err => ({
            field: err.type === 'field' ? err.path : 'unknown',
            message: err.msg
          }))
        });
      }

      // Additional Zod validation
      const result = insertBookingSchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          message: "Error de validación", 
          errors: validationError.details 
        });
      }

      // Sanitize and prepare data
      const sanitizedData: InsertBooking = {
        name: sanitizeInput(result.data.name),
        email: result.data.email.toLowerCase().trim(),
        phone: sanitizeInput(result.data.phone),
        service: sanitizeInput(result.data.service),
        date: result.data.date,
        time: result.data.time,
        message: result.data.message ? sanitizeInput(result.data.message) : undefined
      };

      // Store the booking in database
      const storageInstance = await storage.getStorage();
      const booking = await storageInstance.createBooking(sanitizedData);

      // Send email notifications using the new service
      const emailResult = await emailService.sendBookingNotifications(sanitizedData);
      
      if (!emailResult.success) {
        console.warn('⚠️ Warning: Email notifications failed:', emailResult.error);
        // Don't fail the request if email fails, just log it
      }

      // Return success response
      return res.status(201).json({
        message: "Reserva creada exitosamente. Te contactaremos pronto para confirmar.",
        booking: {
          id: booking.id,
          name: booking.name,
          service: booking.service,
          date: booking.date,
          time: booking.time,
          created: booking.createdAt
        }
      });
    } catch (error) {
      console.error("❌ Error creating booking:", error);
      return res.status(500).json({ 
        message: "Error interno del servidor. Por favor, inténtalo de nuevo más tarde." 
      });
    }
  });

  // Backup endpoint for /api/bookings (redirect to singular)
  app.post("/api/bookings", bookingValidation, async (req: Request, res: Response) => {
    console.log('⚠️ Using deprecated /api/bookings endpoint, should use /api/booking');
    
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Datos de formulario inválidos",
          errors: errors.array().map(err => ({
            field: err.type === 'field' ? err.path : 'unknown',
            message: err.msg
          }))
        });
      }

      // Additional Zod validation
      const result = insertBookingSchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          message: "Error de validación", 
          errors: validationError.details 
        });
      }

      // Sanitize and prepare data
      const sanitizedData: InsertBooking = {
        name: sanitizeInput(result.data.name),
        email: result.data.email.toLowerCase().trim(),
        phone: sanitizeInput(result.data.phone),
        service: sanitizeInput(result.data.service),
        date: result.data.date,
        time: result.data.time,
        message: result.data.message ? sanitizeInput(result.data.message) : undefined
      };

      // Store the booking in database
      const storageInstance = await storage.getStorage();
      const booking = await storageInstance.createBooking(sanitizedData);

      // Send email notifications using the new service
      const emailResult = await emailService.sendBookingNotifications(sanitizedData);
      
      if (!emailResult.success) {
        console.warn('⚠️ Warning: Email notifications failed:', emailResult.error);
        // Don't fail the request if email fails, just log it
      }

      // Return success response
      return res.status(201).json({
        message: "Reserva creada exitosamente. Te contactaremos pronto para confirmar.",
        booking: {
          id: booking.id,
          name: booking.name,
          service: booking.service,
          date: booking.date,
          time: booking.time,
          created: booking.createdAt
        }
      });
    } catch (error) {
      console.error("❌ Error creating booking:", error);
      return res.status(500).json({ 
        message: "Error interno del servidor. Por favor, inténtalo de nuevo más tarde." 
      });
    }
  });

  // Get services endpoint
  app.get("/api/services", async (_req: Request, res: Response) => {
    try {
      const storageInstance = await storage.getStorage();
      const services = await storageInstance.getServices();
      return res.status(200).json({
        message: "Servicios obtenidos exitosamente",
        data: services
      });
    } catch (error) {
      console.error("❌ Error fetching services:", error);
      return res.status(500).json({ 
        message: "Error al obtener los servicios" 
      });
    }
  });

  // Get testimonials endpoint
  app.get("/api/testimonials", async (_req: Request, res: Response) => {
    try {
      const storageInstance = await storage.getStorage();
      const testimonials = await storageInstance.getTestimonials();
      return res.status(200).json({
        message: "Testimonios obtenidos exitosamente",
        data: testimonials
      });
    } catch (error) {
      console.error("❌ Error fetching testimonials:", error);
      return res.status(500).json({ 
        message: "Error al obtener los testimonios" 
      });
    }
  });

  // Database status endpoint (simplified)
  app.get("/api/db/status", async (req, res) => {
    try {
      const info = storage.getStorageInfo();
      res.json({
        success: true,
        storage: info
      });
    } catch (error) {
      console.error('Error getting database status:', error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving database status'
      });
    }
  });

  // Enhanced Chatbot endpoint with validation and caching
  app.post("/api/chatbot", chatbotValidation, async (req: Request, res: Response) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Mensaje inválido. Por favor, usa solo letras, números y signos de puntuación básicos."
        });
      }

      const { message } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ 
          error: "El mensaje es requerido y debe ser una cadena de texto." 
        });
      }

      const sanitizedMessage = sanitizeInput(message.trim());
      if (sanitizedMessage.length === 0) {
        return res.status(400).json({ 
          error: "El mensaje no puede estar vacío." 
        });
      }

      console.log(`🤖 Chatbot request: "${sanitizedMessage}"`);
      
      const botResponse = await getChatbotResponse(sanitizedMessage);
      
      return res.status(200).json({ 
        response: botResponse,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error("❌ Error en el chatbot:", error);
      return res.status(500).json({ 
        error: "Error procesando la consulta. Por favor, inténtalo de nuevo." 
      });
    }
  });

  // Clear chatbot cache endpoint (for maintenance)
  app.post("/api/admin/clear-cache", (_req: Request, res: Response) => {
    chatbotCache.clear();
    console.log("🧹 Chatbot cache cleared");
    return res.status(200).json({ 
      message: "Cache limpiado exitosamente" 
    });
  });

  // Get API statistics
  app.get("/api/admin/stats", (_req: Request, res: Response) => {
    return res.status(200).json({
      chatbot: {
        cacheSize: chatbotCache.size,
        cacheDuration: CACHE_DURATION / 1000 / 60 + " minutos"
      },
      timestamp: new Date().toISOString()
    });
  });

  // Create and return HTTP server
  const server = createServer(app);
  
  // Initialize email service
  emailService.verifyConnection().then(isConnected => {
    if (isConnected) {
      console.log("✅ Email service ready");
    } else {
      console.warn("⚠️ Email service not available - emails will be logged only");
    }
  });

  return server;
}
