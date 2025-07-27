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
const logEmail = (to: string, subject: string, content: string) => {
  console.log('\n=================== NUEVA RESERVA ===================');
  console.log('PARA:', to);
  console.log('ASUNTO:', subject);
  console.log('CONTENIDO:');
  console.log(content.replace(/<[^>]*>/g, '').trim()); // Remove HTML tags for console
  console.log('====================================================\n');
};

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
// Email templates
const generateBookingEmailToSalon = (booking: any) => {
  return {
    to: 'celucylar@gmail.com',
    from: 'noreply@centroesteticalucylara.es',
    subject: `Nueva reserva de cita - ${booking.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #8b2154; font-size: 28px; margin: 0;">Centro de Estética Lucy Lara</h1>
            <p style="color: #666; margin: 10px 0 0 0;">Nueva solicitud de reserva</p>
          </div>
          <div style="background-color: #f8e3cf; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #8b2154; margin: 0 0 15px 0; font-size: 20px;">Detalles de la cita</h2>
            <p style="margin: 8px 0; color: #333;"><strong>Cliente:</strong> ${booking.name}</p>
            <p style="margin: 8px 0; color: #333;"><strong>Email:</strong> ${booking.email}</p>
            <p style="margin: 8px 0; color: #333;"><strong>Teléfono:</strong> ${booking.phone}</p>
            <p style="margin: 8px 0; color: #333;"><strong>Servicio:</strong> ${booking.service}</p>
            <p style="margin: 8px 0; color: #333;"><strong>Fecha solicitada:</strong> ${new Date(booking.date).toLocaleDateString('es-ES')}</p>
            <p style="margin: 8px 0; color: #333;"><strong>Hora solicitada:</strong> ${booking.time}</p>
            ${booking.message ? `<p style="margin: 8px 0; color: #333;"><strong>Mensaje:</strong> ${booking.message}</p>` : ''}
          </div>
          <div style="text-align: center; padding: 20px 0; border-top: 1px solid #eee;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              Recuerda contactar al cliente para confirmar la disponibilidad y finalizar la reserva.
            </p>
          </div>
        </div>
      </div>
    `
  };
};
const generateConfirmationEmailToClient = (booking: any) => {
  return {
    to: booking.email,
    from: 'noreply@centroesteticalucylara.es',
    subject: 'Confirmación de solicitud de cita - Centro de Estética Lucy Lara',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #8b2154; font-size: 28px; margin: 0;">Centro de Estética Lucy Lara</h1>
            <p style="color: #666; margin: 10px 0 0 0;">¡Gracias por tu solicitud de cita!</p>
          </div>
          <div style="margin-bottom: 25px;">
            <p style="color: #333; line-height: 1.6; margin: 0 0 15px 0;">Hola ${booking.name},</p>
            <p style="color: #333; line-height: 1.6; margin: 0 0 15px 0;">
              Hemos recibido tu solicitud de cita para el servicio de <strong>${booking.service}</strong>. 
              Nos pondremos en contacto contigo a la mayor brevedad para confirmar la disponibilidad y finalizar tu reserva.
            </p>
          </div>
          <div style="background-color: #f8e3cf; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #8b2154; margin: 0 0 15px 0; font-size: 18px;">Resumen de tu solicitud</h3>
            <p style="margin: 8px 0; color: #333;"><strong>Servicio:</strong> ${booking.service}</p>
            <p style="margin: 8px 0; color: #333;"><strong>Fecha solicitada:</strong> ${new Date(booking.date).toLocaleDateString('es-ES')}</p>
            <p style="margin: 8px 0; color: #333;"><strong>Hora solicitada:</strong> ${booking.time}</p>
            ${booking.message ? `<p style="margin: 8px 0; color: #333;"><strong>Tu mensaje:</strong> ${booking.message}</p>` : ''}
          </div>
          <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #2d7a2d; margin: 0 0 15px 0; font-size: 18px;">Información de contacto</h3>
            <p style="margin: 8px 0; color: #333;"><strong>Dirección:</strong> Calle Alegría de la Huerta 22, 28041 Madrid</p>
            <p style="margin: 8px 0; color: #333;"><strong>Teléfonos:</strong> 91 505 20 67 | 684 203 633</p>
            <p style="margin: 8px 0; color: #333;"><strong>Email:</strong> centrodebelleza@centroesteticalucylara.es</p>
            <p style="margin: 8px 0; color: #333;"><strong>Horarios:</strong> Lunes a viernes: 10:00-13:30 y 16:00-19:30</p>
          </div>
          <div style="text-align: center; padding: 20px 0; border-top: 1px solid #eee;">
            <p style="margin: 0 0 15px 0; color: #666; font-size: 14px;">
              Si tienes alguna pregunta o necesitas cambiar algo, no dudes en contactarnos.
            </p>
            <p style="margin: 0; color: #8b2154; font-weight: bold;">
              ¡Esperamos verte pronto en nuestro centro!
            </p>
          </div>
        </div>
      </div>
    `
  };
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Booking endpoint with enhanced validation
  app.post("/api/booking", bookingValidation, async (req: Request, res: Response) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Datos de formulario inválidos",
          errors: errors.array()
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
        console.warn('Warning: Email notifications failed:', emailResult.error);
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
          time: booking.time
        }
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      return res.status(500).json({ 
        message: "Error interno del servidor. Por favor, inténtalo de nuevo." 
      });
    }
  });
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      return res.status(500).json({ 
        message: "An error occurred while processing your booking" 
      });
    }
  });

  // Get services endpoint
  app.get("/api/services", async (_req: Request, res: Response) => {
    try {
      const services = await storage.getServices();
      return res.status(200).json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      return res.status(500).json({ 
        message: "An error occurred while fetching services" 
      });
    }
  });

  // Get testimonials endpoint
  app.get("/api/testimonials", async (_req: Request, res: Response) => {
    try {
      const testimonials = await storage.getTestimonials();
      return res.status(200).json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return res.status(500).json({ 
        message: "An error occurred while fetching testimonials" 
      });
    }
  });

  // Chatbot endpoint con DeepSeek
  app.post("/api/chatbot", async (req: Request, res: Response) => {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }
      // DeepSeek API configuration
      const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
      if (!DEEPSEEK_API_KEY) {
        return res.status(500).json({ error: "DeepSeek API key not configured" });
      }
      const LUCYBOT_SYSTEM_PROMPT = `
### 🤖 IDENTIDAD Y REGLAS PRINCIPALES
- Eres "LucyBot" 💅✨, el asistente virtual experto del **Centro de Estética Lucy Lara**. Tu tono es amigable, profesional y siempre servicial.
- Tu única función es proporcionar información sobre los servicios, productos, horarios y ubicación del centro.
- Usas EXCLUSIVAMENTE la información detallada a continuación. No inventes ni supongas nada.
- Usas emojis de forma frecuente para hacer la conversación más amena (ej: 💖, ✨, 💆‍♀️, 😊).
- Si un usuario pregunta por algo que no está en tu información, respondes: "Para darte la información más precisa sobre eso, te recomiendo consultarlo directamente en nuestra recepción. ¡Gracias! 😊".
- Si el usuario pregunta por temas no relacionados con el centro, respondes: "Lo siento, solo puedo darte información sobre los tratamientos y servicios del Centro de Estética Lucy Lara 🙅‍♀️. ¿Hay algún tratamiento que te interese?".

### ℹ️ INFORMACIÓN GENERAL
- **Dirección:** Estamos en C. de la Alegría de la Huerta, 22, Villaverde, 28041 Madrid. 📍 
- **Horario:** Lunes a Viernes, de 10:00 a 13:30 y de 16:00 a 19:30. ¡Te esperamos! ⏰
- **Métodos de Pago:** Aceptamos efectivo y tarjeta 💳.
`;
      // Aquí iría la llamada real a la API de DeepSeek (omitida por brevedad)
      return res.json({ response: "Respuesta simulada del chatbot." });
    } catch (error) {
      console.error("Error en el chatbot:", error);
      return res.status(500).json({ error: "Error procesando la consulta del chatbot" });
    }
  });

  // ... otras rutas si las hubiera

  // Crear y devolver el servidor HTTP
  const server = createServer(app);
  return server;
} 