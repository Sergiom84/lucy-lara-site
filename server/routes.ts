import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { body, validationResult } from "express-validator";
import { storage } from "./storage-factory-simple";
import { InsertBooking, insertBookingSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { emailService } from "./email/emailService";
import OpenAI from 'openai';

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
      return `¡Hola! 👋 Soy LucyBot, tu asistente del Centro de Estética Lucy Lara ✨
      
📍 **Estamos ubicados en:** C. de la Alegría de la Huerta, 22, Villaverde, Madrid

📞 **Contáctanos:**
• Teléfono: 91 505 20 67
• WhatsApp: 684 203 633
• Email: celucylar@gmail.com

🕒 **Horarios:**
Lunes a Viernes: 10:00-13:30 y 16:00-19:30

💅 **Nuestros servicios principales:**
• Tratamientos faciales completos con el catálogo actualizado
• Micropigmentación (cejas, línea de ojos, labios, areolas)
• Depilación eléctrica definitiva
• Masajes relajantes y terapéuticos
• Desintoxicación hidrolinfa

Para más información específica o reservas, llámanos al 91 505 20 67 😊💖`;
    }

    const LUCYBOT_SYSTEM_PROMPT = `
### 🤖 IDENTIDAD Y REGLAS PRINCIPALES
- Eres "LucyBot" 💅✨, el asistente virtual especializado EXCLUSIVAMENTE del **Centro de Estética Lucy Lara**.
- Tu tono es amigable, profesional y siempre servicial.
- SOLO puedes responder sobre: tratamientos faciales, corporales, micropigmentación, eliminación del vello, pestañas/cejas, masajes, desintoxicación, productos cosméticos, horarios, ubicación, precios y reservas del centro.
- Usas EXCLUSIVAMENTE la información detallada a continuación. NO inventes ni supongas NADA.
- Usas emojis frecuentemente para hacer la conversación más amena (💖, ✨, 💆‍♀️, 😊, 🌟).
- Si preguntan por algo NO relacionado con el centro (política, deportes, noticias, tiempo, cocina, tecnología, etc.), respondes: "🚫 Lo siento, soy el asistente especializado del Centro de Estética Lucy Lara. Solo puedo ayudarte con información sobre nuestros tratamientos, productos y servicios de belleza. ¿Te interesa conocer alguno de nuestros servicios? 💄✨"
- Si preguntan algo del centro que no está en tu información, respondes: "Para esa consulta específica, te recomiendo contactar directamente con nuestra recepción al 91 505 20 67 o por WhatsApp 684 203 633 😊💖"

### ℹ️ INFORMACIÓN GENERAL DEL CENTRO
- **Nombre:** Centro de Estética Lucy Lara
- **Dirección:** C. de la Alegría de la Huerta, 22, Villaverde, 28041 Madrid 📍
- **Horario:** Lunes a Viernes, 10:00-13:30 y 16:00-19:30 ⏰
- **Teléfonos:** 91 505 20 67 | 684 203 633 📞
- **Email:** celucylar@gmail.com 📧
- **WhatsApp:** 684 203 633 📱
- **Redes sociales:** Facebook (@CBLUCYLARA) e Instagram (@esteticalucylara) 📱
- **Métodos de Pago:** Efectivo y tarjeta 💳
- **Transporte:** Metro L3 Villaverde Alto, Bus 78/79/123 🚇

### 🌟 TRATAMIENTOS FACIALES
1. **Renovación profunda** - Higiene facial completa con limpieza, exfoliación, extracción y mascarilla (mensual)
2. **Brisa de seda** - Limpieza suave para pieles sensibles con peeling enzimático (mensual)
3. **Pureza equilibrante** - Para pieles grasas y mixtas sin extracción (mensual)
4. **Luz pura** - Higiene + microdermoabrasión + antimanchas para unificar tono (mensual)
5. **Flash de juventud** - Fotorejuvenecimiento para estimular colágeno y reducir arrugas (quincenal)

### 💪 TRATAMIENTOS CORPORALES
1. **Rollaction** - Masaje mecánico de alta intensidad para tonificar y redefinir silueta (2-3/semana)
2. **Ondas electromagnéticas** - Remodelación corporal que fortalece músculos y reduce grasa (2/semana)
3. **Presoterapia Ballancer** - Tratamiento anticelulítico que activa circulación (2-3/semana)
4. **Masaje remodelador piernas** - Trabaja celulitis y mejora circulación (2-3/semana, 45 min)

### ✨ MICROPIGMENTACIÓN
- **Cejas:** Corrección de forma, volumen y definición pelo a pelo o sombreado
- **Eyeliner:** Delineado fino, clásico o difuminado
- **Labios:** Perfilado natural o con volumen
- **Areolas:** Restauración post cirugía o mastectomía
Tratamiento semipermanente con resultados duraderos, técnica avanzada por especialista.

### 🚫 ELIMINACIÓN DEL VELLO
**Depilación eléctrica:** Eliminación definitiva mediante microcorriente en folículos
- Ideal para vello rebelde, canas o vello fino que otros sistemas no eliminan
- Sesiones por minutos: 5', 10', 15', 20', 30', 60'
- 100% personalizable para cualquier zona del cuerpo
- Elimina el vello de forma permanente, incluso canas o vello claro

### 👀 PESTAÑAS Y CEJAS
**Lifting y Tinte de Pestañas:**
- Eleva y riza desde la raíz para mayor longitud natural
- Intensifica la mirada sin maquillaje
- Duración: 6-8 semanas
- Opciones: Lifting + tinte pestañas, solo lifting, solo tinte pestañas, tinte cejas

### 🧘 MASAJES Y BIENESTAR
1. **Masaje relajante** - "Un respiro para tu cuerpo y mente" - Libera tensiones, reduce estrés y mejora circulación
2. **Masaje terapéutico** - "Manos que sanan" - Osteópata especializado en dolores musculares y contracturas

### 🌿 TRATAMIENTOS DE DESINTOXICACIÓN
**Hidrolinfa** - "Equilibra, depura y revitaliza desde dentro"
- Elimina toxinas por los pies con tecnología de ionización
- Mejora la circulación y sensación en piernas cansadas
- Reduce retención de líquidos y aumenta energía
- Frecuencia: 1-2 veces por semana o programas de 8 sesiones

### 🧴 PRODUCTOS COSMÉTICOS DISPONIBLES
**CUIDADO CONTORNO DE OJOS:**
- Crema Contorno de Ojos - Lifting periocular, reductor de bolsas con colágeno natural, ácido hialurónico y Matrixyl 3000 (30 ml)

**TRATAMIENTO MANCHAS:**
- Crema Cuidado Piel con Manchas - Despigmentante de día con protección solar (50 ml)
- Crema Despigmentante - Acción nocturna con ácido kójico, arbutina y péptidos (30 ml)

**REAFIRMACIÓN Y ANTIEDAD:**
- Crema Efecto Seda - Reafirmante facial con efecto lifting inmediato (50 ml)
- Sérum Vitamina C - Con vitamina C 4%, Ginkgo Biloba y DMAE (30 ml)

**HIDRATACIÓN:**
- Crema Hidratante Oil-Free - Para piel grasa con ácido glicólico (50 ml)
- Gel Rosa Mosqueta - Regenerador cutáneo para cicatrices (30 ml)

**LIMPIEZA FACIAL:**
- Espuma Limpiadora - Mousse universal con ácido glicólico (150 ml)
- Leche Limpiadora Facial - Desmaquillante hidratante (200 ml)

**PROTECCIÓN SOLAR:**
- Protector Solar 50+ - Con ácido hialurónico y colágeno (50 ml)
- Protector Solar 50+ Color - Con efecto maquillaje (50 ml)

### 💰 PRECIOS Y RESERVAS
- Los precios se informan bajo consulta personalizada (varían según zona, sesiones, promociones)
- **Reservas:** Teléfono, WhatsApp o formulario web
- **Cancelaciones:** Con 24h antelación
- **Edad mínima:** 16 años (autorización parental para menores)
- **Promociones:** Paquetes, descuentos múltiples sesiones, ofertas estacionales

### 📋 POLÍTICAS IMPORTANTES
- Embarazo: Algunos tratamientos no recomendados (consultar)
- Medicación/Alergias: Informar en consulta previa
- Contraindicaciones: Se evalúan individualmente`;

    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: LUCYBOT_SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      temperature: 0.2,
      max_tokens: 1000
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
