import nodemailer from "nodemailer";
import { InsertBooking } from "@shared/schema";

interface EmailConfig {
  service: string;
  auth: {
    user: string;
    pass: string;
  };
}

interface EmailTemplate {
  to: string;
  from: string;
  subject: string;
  html: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private config: EmailConfig;
  private salonEmail: string;

  constructor() {
    this.salonEmail = process.env.SALON_EMAIL || 'celucylar@gmail.com';
    
    const gmailUser = process.env.GMAIL_USER || 'celucylar@gmail.com';
    const gmailPass = process.env.GMAIL_PASS || 'ytxc flbc amnp gwwm';

    this.config = {
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    };

    this.initializeTransporter();
  }

  private initializeTransporter(): void {
    console.log('🔧 =================== INICIALIZANDO EMAIL SERVICE ===================');
    console.log('📧 Gmail User:', this.config.auth.user);
    console.log('🔑 Gmail Pass configured:', this.config.auth.pass ? 'SÍ (length: ' + this.config.auth.pass.length + ')' : 'NO');
    console.log('⚙️ Service:', this.config.service);
    console.log('📍 Salon Email:', this.salonEmail);
    
    try {
      this.transporter = nodemailer.createTransport(this.config);
      console.log('✅ Email transporter creado exitosamente');
      
      // Test connection immediately
      this.transporter.verify((error, success) => {
        if (error) {
          console.error('❌ Error en verificación de conexión:', error);
        } else {
          console.log('✅ Conexión Gmail verificada exitosamente');
        }
      });
      
      console.log('================================================================\n');
    } catch (error) {
      console.error('❌ Error creating email transporter:', error);
      console.error('================================================================\n');
      this.transporter = null;
    }
  }

  private generateBookingEmailToSalon(booking: InsertBooking): EmailTemplate {
    return {
      to: this.salonEmail,
      from: 'noreply@centroesteticalucylara.es',
      subject: `🆕 Nueva reserva de cita - ${booking.name}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nueva Reserva - Centro de Estética Lucy Lara</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f9f9f9;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #8b2154; padding-bottom: 20px;">
                <h1 style="color: #8b2154; font-size: 32px; margin: 0; font-weight: 600;">
                  Centro de Estética Lucy Lara
                </h1>
                <p style="color: #666; margin: 15px 0 0 0; font-size: 18px;">
                  🆕 Nueva solicitud de reserva
                </p>
              </div>

              <!-- Alert Badge -->
              <div style="background: linear-gradient(135deg, #8b2154, #a4626d); color: white; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 30px;">
                <h2 style="margin: 0; font-size: 20px;">⚡ Reserva Urgente - Revisar y Confirmar</h2>
              </div>
              
              <!-- Client Details -->
              <div style="background-color: #f8e3cf; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
                <h3 style="color: #8b2154; margin: 0 0 20px 0; font-size: 22px; border-bottom: 2px solid #8b2154; padding-bottom: 10px;">
                  👤 Detalles del Cliente
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #333; font-weight: bold; width: 30%;">Nombre:</td>
                    <td style="padding: 8px 0; color: #333;">${booking.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #333; font-weight: bold;">Email:</td>
                    <td style="padding: 8px 0; color: #333;"><a href="mailto:${booking.email}" style="color: #8b2154; text-decoration: none;">${booking.email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #333; font-weight: bold;">Teléfono:</td>
                    <td style="padding: 8px 0; color: #333;"><a href="tel:${booking.phone}" style="color: #8b2154; text-decoration: none;">${booking.phone}</a></td>
                  </tr>
                </table>
              </div>

              <!-- Service Details -->
              <div style="background-color: #e8f4f8; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
                <h3 style="color: #8b2154; margin: 0 0 20px 0; font-size: 22px; border-bottom: 2px solid #8b2154; padding-bottom: 10px;">
                  💆‍♀️ Detalles del Servicio
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #333; font-weight: bold; width: 30%;">Servicio:</td>
                    <td style="padding: 8px 0; color: #333; font-size: 16px; font-weight: 500;">${booking.service}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #333; font-weight: bold;">Fecha solicitada:</td>
                    <td style="padding: 8px 0; color: #333;">${booking.date}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #333; font-weight: bold;">Hora solicitada:</td>
                    <td style="padding: 8px 0; color: #333; font-size: 16px; font-weight: 500;">${booking.time}</td>
                  </tr>
                </table>
                ${booking.message ? `
                  <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ddd;">
                    <p style="margin: 0; color: #333; font-weight: bold;">Mensaje adicional:</p>
                    <p style="margin: 10px 0 0 0; color: #333; font-style: italic; background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #8b2154;">"${booking.message}"</p>
                  </div>
                ` : ''}
              </div>

              <!-- Action Required -->
              <div style="background: linear-gradient(135deg, #ff6b6b, #ee5a24); color: white; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 25px;">
                <h3 style="margin: 0 0 10px 0; font-size: 18px;">🚨 Acción Requerida</h3>
                <p style="margin: 0; font-size: 14px;">
                  Contacta al cliente para confirmar disponibilidad y finalizar la reserva
                </p>
              </div>

              <!-- Quick Actions -->
              <div style="text-align: center; margin-bottom: 30px;">
                <a href="tel:${booking.phone}" style="background-color: #25d366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 0 10px; display: inline-block;">
                  📞 Llamar Cliente
                </a>
                <a href="mailto:${booking.email}" style="background-color: #8b2154; color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 0 10px; display: inline-block;">
                  ✉️ Enviar Email
                </a>
              </div>

              <!-- Footer -->
              <div style="text-align: center; padding: 20px 0; border-top: 1px solid #eee; color: #666; font-size: 14px;">
                <p style="margin: 0;">
                  📍 Centro de Estética Lucy Lara<br>
                  C. de la Alegría de la Huerta, 22, Villaverde, 28041 Madrid<br>
                  📞 91 505 20 67 | 684 203 633
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };
  }

  private generateConfirmationEmailToClient(booking: InsertBooking): EmailTemplate {
    return {
      to: booking.email,
      from: 'noreply@centroesteticalucylara.es',
      subject: '✅ Confirmación de solicitud de cita - Centro de Estética Lucy Lara',
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmación de Cita - Centro de Estética Lucy Lara</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f9f9f9;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #8b2154; font-size: 32px; margin: 0; font-weight: 600;">
                  Centro de Estética Lucy Lara
                </h1>
                <p style="color: #666; margin: 15px 0 0 0; font-size: 18px;">
                  ✅ ¡Gracias por tu solicitud de cita!
                </p>
              </div>

              <!-- Welcome Message -->
              <div style="background: linear-gradient(135deg, #8b2154, #a4626d); color: white; padding: 25px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
                <h2 style="margin: 0 0 10px 0; font-size: 24px;">¡Hola ${booking.name}! 👋</h2>
                <p style="margin: 0; font-size: 16px;">
                  Hemos recibido tu solicitud de cita y nos pondremos en contacto contigo muy pronto
                </p>
              </div>
              
              <!-- Booking Summary -->
              <div style="background-color: #f8e3cf; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
                <h3 style="color: #8b2154; margin: 0 0 20px 0; font-size: 20px;">📋 Resumen de tu solicitud</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; color: #333; font-weight: bold; width: 35%;">Servicio solicitado:</td>
                    <td style="padding: 10px 0; color: #333; font-size: 16px;">${booking.service}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #333; font-weight: bold;">Fecha preferida:</td>
                    <td style="padding: 10px 0; color: #333;">${booking.date}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #333; font-weight: bold;">Hora preferida:</td>
                    <td style="padding: 10px 0; color: #333; font-size: 16px;">${booking.time}</td>
                  </tr>
                </table>
              </div>

              <!-- Next Steps -->
              <div style="background-color: #e8f4f8; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
                <h3 style="color: #8b2154; margin: 0 0 15px 0; font-size: 20px;">🔄 Próximos pasos</h3>
                <ul style="margin: 0; padding-left: 20px; color: #333; line-height: 1.8;">
                  <li>Revisaremos tu solicitud en las próximas horas</li>
                  <li>Te contactaremos para confirmar la disponibilidad</li>
                  <li>Finalizaremos los detalles de tu cita</li>
                  <li>Recibirás una confirmación final por email</li>
                </ul>
              </div>

              <!-- Contact Info -->
              <div style="background-color: #fff8e1; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
                <h3 style="color: #8b2154; margin: 0 0 15px 0; font-size: 20px;">📞 ¿Tienes preguntas?</h3>
                <p style="margin: 0 0 15px 0; color: #333;">
                  Si necesitas cambiar algo o tienes alguna pregunta, no dudes en contactarnos:
                </p>
                <div style="text-align: center;">
                  <a href="tel:915052067" style="background-color: #8b2154; color: white; padding: 12px 20px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 5px; display: inline-block;">
                    📞 91 505 20 67
                  </a>
                  <a href="tel:684203633" style="background-color: #25d366; color: white; padding: 12px 20px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 5px; display: inline-block;">
                    📱 684 203 633
                  </a>
                </div>
              </div>

              <!-- Final Message -->
              <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #f8e3cf, #e8f4f8); border-radius: 10px;">
                <p style="margin: 0 0 10px 0; color: #8b2154; font-size: 18px; font-weight: bold;">
                  ¡Esperamos verte pronto en nuestro centro! ✨
                </p>
                <p style="margin: 0; color: #666; font-size: 14px;">
                  Estamos aquí para cuidarte y hacerte sentir especial
                </p>
              </div>

              <!-- Footer -->
              <div style="text-align: center; padding: 20px 0; border-top: 1px solid #eee; margin-top: 20px;">
                <p style="margin: 0; color: #666; font-size: 14px;">
                  📍 C. de la Alegría de la Huerta, 22, Villaverde, 28041 Madrid<br>
                  🕒 Lunes a Viernes: 10:00-13:30 y 16:00-19:30<br>
                  🌐 Instagram: @esteticalucylara | Facebook: @CBLUCYLARA
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };
  }

  public logEmail(to: string, subject: string, content: string): void {
    console.log('\n📧 =================== PREVIEW EMAIL ===================');
    console.log('📨 PARA:', to);
    console.log('📋 ASUNTO:', subject);
    console.log('� Timestamp:', new Date().toLocaleString('es-ES'));
    console.log('�📄 CONTENIDO (PREVIEW - primeros 200 chars):');
    console.log('---------------------------------------------------');
    console.log(content.replace(/<[^>]*>/g, '').substring(0, 200) + '...');
    console.log('=====================================================\n');
  }

  public async sendBookingNotifications(booking: InsertBooking): Promise<{success: boolean, error?: string}> {
    console.log('\n🚀 =================== INICIANDO ENVÍO DE EMAILS ===================');
    console.log('📅 Timestamp:', new Date().toISOString());
    console.log('👤 Cliente:', booking.name, '|', booking.email);
    console.log('💆‍♀️ Servicio:', booking.service);
    console.log('📧 Email del salón configurado:', this.salonEmail);
    console.log('🔧 Transporter disponible:', this.transporter ? 'SÍ' : 'NO');
    
    try {
      const salonEmail = this.generateBookingEmailToSalon(booking);
      const clientEmail = this.generateConfirmationEmailToClient(booking);

      console.log('✅ Templates de email generados correctamente');
      
      // Log emails to console for debugging
      this.logEmail(salonEmail.to, salonEmail.subject, salonEmail.html);
      this.logEmail(clientEmail.to, clientEmail.subject, clientEmail.html);

      // Send actual emails if transporter is available
      if (this.transporter) {
        console.log('📤 Iniciando envío real de emails...');
        
        try {
          console.log('📧 [1/2] Enviando email al salón...');
          console.log('   📍 Destinatario:', salonEmail.to);
          console.log('   📝 Asunto:', salonEmail.subject);
          
          // Send email to salon
          const salonResult = await this.transporter.sendMail({
            to: salonEmail.to,
            from: salonEmail.from,
            subject: salonEmail.subject,
            html: salonEmail.html,
          });
          
          console.log('✅ [1/2] Email al salón enviado exitosamente');
          console.log('   📨 Message ID:', salonResult.messageId);

          console.log('📧 [2/2] Enviando email de confirmación al cliente...');
          console.log('   📍 Destinatario:', clientEmail.to);
          console.log('   📝 Asunto:', clientEmail.subject);

          // Send confirmation email to client
          const clientResult = await this.transporter.sendMail({
            to: clientEmail.to,
            from: clientEmail.from,
            subject: clientEmail.subject,
            html: clientEmail.html,
          });

          console.log('✅ [2/2] Email al cliente enviado exitosamente');
          console.log('   📨 Message ID:', clientResult.messageId);
          
          console.log('🎉 =================== TODOS LOS EMAILS ENVIADOS ===================');
          console.log('📊 Resumen:');
          console.log('   ✅ Email al salón (', salonEmail.to, ') - ENVIADO');
          console.log('   ✅ Email al cliente (', clientEmail.to, ') - ENVIADO');
          console.log('🔚 ===================================================================\n');
          
          return { success: true };
        } catch (sendError) {
          console.error('❌ =================== ERROR EN ENVÍO ===================');
          console.error('🚨 Error details:', sendError);
          console.error('📧 Gmail User:', this.config.auth.user);
          console.error('🔑 Gmail Pass length:', this.config.auth.pass?.length || 0);
          console.error('⚙️ Service config:', this.config.service);
          console.error('======================================================\n');
          return { success: false, error: 'Error sending emails' };
        }
      } else {
        console.warn('⚠️ =================== TRANSPORTER NO DISPONIBLE ===================');
        console.warn('🔧 Razón: Email transporter no está configurado');
        console.warn('📧 Gmail User:', this.config.auth.user);
        console.warn('🔑 Gmail Pass configurado:', this.config.auth.pass ? 'SÍ' : 'NO');
        console.warn('📝 Solo se mostrarán logs sin envío real');
        console.warn('==================================================================\n');
        return { success: false, error: 'Email service not configured' };
      }
    } catch (error) {
      console.error('❌ =================== ERROR GENERAL ===================');
      console.error('🚨 Error processing email notifications:', error);
      console.error('📧 Booking data:', JSON.stringify(booking, null, 2));
      console.error('======================================================\n');
      return { success: false, error: 'Error processing email notifications' };
    }
  }

  public async verifyConnection(): Promise<boolean> {
    if (!this.transporter) {
      return false;
    }

    try {
      await this.transporter.verify();
      console.log('✅ Email service connection verified');
      return true;
    } catch (error) {
      console.error('❌ Email service connection failed:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();
