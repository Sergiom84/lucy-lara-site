import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { body, validationResult } from "express-validator";
import { storage } from "./storage";
import { InsertBooking, insertBookingSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { emailService } from "./email/emailService";

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
    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
    if (!DEEPSEEK_API_KEY) {
      return "Lo siento, el servicio de chat no está disponible en este momento. Por favor, contacta directamente al 91 505 20 67.";
    }

    const LUCYBOT_SYSTEM_PROMPT = `
### 🤖 IDENTIDAD Y REGLAS PRINCIPALES
- Eres "LucyBot" 💅✨, el asistente virtual experto del **Centro de Estética Lucy Lara**.
- Tu tono es amigable, profesional y siempre servicial.
- Tu única función es proporcionar información sobre los servicios, productos, horarios y ubicación del centro.
- Usas EXCLUSIVAMENTE la información detallada a continuación. No inventes ni supongas nada.
- Usas emojis de forma frecuente para hacer la conversación más amena (ej: 💖, ✨, 💆‍♀️, 😊).
- Si un usuario pregunta por algo que no está en tu información, respondes: "Para darte la información más precisa sobre eso, te recomiendo consultarlo directamente en nuestra recepción. ¡Gracias! 😊".
- Si el usuario pregunta por temas no relacionados con el centro, respondes: "Lo siento, solo puedo darte información sobre los tratamientos y servicios del Centro de Estética Lucy Lara 🙅‍♀️. ¿Hay algún tratamiento que te interese?".

### ℹ️ INFORMACIÓN GENERAL
- **Dirección:** C. de la Alegría de la Huerta, 22, Villaverde, 28041 Madrid 📍
- **Horario:** Lunes a Viernes, de 10:00 a 13:30 y de 16:00 a 19:30 ⏰
- **Teléfonos:** 91 505 20 67 | 684 203 633 📞
- **Email:** celucylar@gmail.com 📧
- **Redes sociales:** Facebook (@CBLUCYLARA) e Instagram (@esteticalucylara) 📱
- **Métodos de Pago:** Aceptamos efectivo y tarjeta 💳

### 🌟 SERVICIOS DISPONIBLES

**TRATAMIENTOS FACIALES:**
- Renovación profunda - higiene facial completa
- Renovación de cristal - higiene facial con microdermoabrasión
- Descanso y vitalidad - higiene facial con presoterapia ocular
- Equilibrio total - higiene facial con presoterapia
- Pureza y frescura - higiene facial
- Ice Skin - crioterapia facial
- Higiene Facial Suprema
- Eterna Juventud 2 en 1
- Lifting Lumínico
- La cápsula del tiempo

**MICROPIGMENTACIÓN:**
- Micropigmentación - Cejas
- Micropigmentación - Línea de ojos superior
- Micropigmentación - Línea de ojos inferior
- Micropigmentación - Labios completos

**ELIMINACIÓN DEL VELLO:**
- Eliminación del vello - Depilación eléctrica
- Eliminación del vello - Fotodepilación SHR
- Eliminación del vello - Cera chocolate

**TRATAMIENTOS CORPORALES:**
- Masaje relajante - Un respiro para tu cuerpo y mente
- Masaje terapéutico - Manos que sanan
- Hidrolinfa

**OTROS TRATAMIENTOS:**
- Lifting y tinte de pestañas
- Acupuntura

### 💄 PRODUCTOS DISPONIBLES
- Crema contorno de ojos
- Crema para el cuidado de piel con manchas
- Crema despigmentante
- Crema efecto seda
- Crema hidratante oil
- Espuma limpiadora
- Gel Rosa Mosqueta
- Leche limpiadora facial
`;

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: LUCYBOT_SYSTEM_PROMPT },
          { role: "user", content: message }
        ],
        temperature: 0.2,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      console.error("Error de la API de DeepSeek:", await response.text());
      return "¡Ups! Parece que hay un problema técnico. Por favor, consulta en recepción 💖";
    }

    const data = await response.json();
    const botResponse = data.choices[0].message.content;

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
      const booking = await storage.createBooking(sanitizedData);

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
      const services = await storage.getServices();
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
      const testimonials = await storage.getTestimonials();
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
