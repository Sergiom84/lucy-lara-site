import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { InsertBooking, insertBookingSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import nodemailer from "nodemailer";

// Función para sanitizar entradas y evitar XSS
function sanitizeInput(str: string) {
  return typeof str === 'string' ? str.replace(/<[^>]*>/g, '') : str;
}
const logEmail = (to: string, subject: string, content: string) => {
  console.log('\n=================== NUEVA RESERVA ===================');
  console.log('PARA:', to);
  console.log('ASUNTO:', subject);
  console.log('CONTENIDO:');
  console.log(content.replace(/<[^>]*>/g, '').trim()); // Remove HTML tags for console
  console.log('====================================================\n');
};
// Configuración de nodemailer para Gmail
const gmailUser = process.env.GMAIL_USER;
const gmailPass = process.env.GMAIL_PASS;
let transporter: nodemailer.Transporter | null = null;
if (gmailUser && gmailPass) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });
}
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
  // Booking endpoint
  app.post("/api/booking", async (req: Request, res: Response) => {
    try {
      // Validate the request body against the schema
      const result = insertBookingSchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details 
        });
      }
      // Sanitizar los campos antes de almacenar y enviar emails
      const sanitizedData = Object.fromEntries(
        Object.entries(result.data).map(([k, v]) => [k, typeof v === 'string' ? sanitizeInput(v) : v])
      );
      // Store the booking in our database
      const booking = await storage.createBooking(sanitizedData);
      // Log email notifications to console
      try {
        const salonEmail = generateBookingEmailToSalon(booking);
        logEmail(salonEmail.to, salonEmail.subject, salonEmail.html);
        const clientEmail = generateConfirmationEmailToClient(booking);
        logEmail(clientEmail.to, clientEmail.subject, clientEmail.html);
        // Enviar emails reales si el transporter está configurado
        if (transporter) {
          try {
            await transporter.sendMail({
              to: salonEmail.to,
              from: salonEmail.from,
              subject: salonEmail.subject,
              html: salonEmail.html,
            });
            await transporter.sendMail({
              to: clientEmail.to,
              from: clientEmail.from,
              subject: clientEmail.subject,
              html: clientEmail.html,
            });
          } catch (sendError) {
            console.error('Error enviando emails reales:', sendError);
          }
        } else {
          console.warn('nodemailer no está configurado. Emails no enviados.');
        }
        console.log('Email notifications logged successfully');
      } catch (emailError) {
        console.error('Error processing email notifications:', emailError);
      }
      // Return success response
      return res.status(201).json({
        message: "Booking created successfully",
        booking
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