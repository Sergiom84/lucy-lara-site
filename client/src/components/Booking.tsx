import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Phone, Facebook, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string;
}

const Booking = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  
  // Lista de servicios disponibles
  const services = [
    "Renovación profunda - higiene facial completa",
    "Renovación de cristal - higiene facial con microdermoabrasión",
    "Descanso y vitalidad - higiene facial con presoterapia ocular",
    "Equilibrio total - higiene facial con presoterapia",
    "Pureza y frescura - higiene facial",
    "Micropigmentación - Cejas",
    "Micropigmentación - Línea de ojos superior",
    "Micropigmentación - Línea de ojos inferior",
    "Micropigmentación - Labios completos",
    "Eliminación del vello - Depilación eléctrica",
    "Eliminación del vello - Fotodepilación SHR",
    "Eliminación del vello - Cera chocolate",
    "Masaje relajante - Un respiro para tu cuerpo y mente",
    "Masaje terapéutico - Manos que sanan",
    "Lifting y tinte de pestañas",
    "Hidrolinfa",
    "Acupuntura"
  ];

  // Horarios disponibles
  const timeSlots = [
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.date || !formData.time) {
      toast({
        title: "Error en el formulario",
        description: "Por favor, completa todos los campos obligatorios.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Enviar al backend
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Track form submission event
        trackEvent('booking_submitted', 'form', 'backend');
        
        // Show success message
        toast({
          title: "Reserva enviada correctamente",
          description: "Hemos recibido tu solicitud de cita. Nos pondremos en contacto contigo a la mayor brevedad para confirmar la disponibilidad.",
          variant: "default"
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          date: "",
          time: "",
          message: ""
        });
      } else {
        throw new Error('Error en el servidor');
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast({
        title: "Error al enviar",
        description: "Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo o contáctanos directamente.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reserva" className="py-16 bg-gradient-to-br from-neutral via-white to-neutral">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-semibold mb-6 text-accent">
              Solicita información
            </h2>
            <p className="text-textLight text-lg max-w-2xl mx-auto leading-relaxed">
              Completa el formulario y nos pondremos en contacto contigo para confirmar tu cita. 
              También puedes contactarnos directamente por teléfono o WhatsApp.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulario */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-textDark mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                    placeholder="Tu nombre completo"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-textDark mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-sm font-medium text-textDark mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                    placeholder="Tu número de teléfono"
                  />
                </div>

                {/* Servicio */}
                <div>
                  <label className="block text-sm font-medium text-textDark mb-2">
                    Servicio deseado *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                  >
                    <option value="">Selecciona un servicio</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Fecha y hora */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-textDark mb-2">
                      Fecha preferida *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textDark mb-2">
                      Hora preferida *
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                    >
                      <option value="">Selecciona una hora</option>
                      {timeSlots.map((time, index) => (
                        <option key={index} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Mensaje opcional */}
                <div>
                  <label className="block text-sm font-medium text-textDark mb-2">
                    Mensaje (opcional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors resize-none"
                    placeholder="Cuéntanos cualquier detalle adicional sobre tu cita..."
                  />
                </div>

                {/* Botón de envío */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-accent hover:bg-accentDark text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Enviando..." : "Solicitar Cita"}
                </button>
              </form>
            </motion.div>

            {/* Información de contacto */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Información de contacto */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h4 className="font-semibold text-textDark mb-4">Información de contacto</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone size={18} className="text-accent mr-3" />
                    <div>
                      <p className="font-medium">91 505 20 67</p>
                      <p className="text-sm text-textLight">684 203 633</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={18} className="text-accent mr-3" />
                    <div>
                      <p className="font-medium">Lunes a viernes</p>
                      <p className="text-sm text-textLight">10:00-13:30 y 16:00-19:30</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock size={18} className="text-accent mr-3" />
                    <div>
                      <p className="font-medium">Dirección</p>
                      <p className="text-sm text-textLight">Calle Alegría de la Huerta 22, 28041 Madrid</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h4 className="font-semibold text-textDark mb-4">Contacto rápido</h4>
                <a 
                  href="https://wa.me/34684203633?text=Hola,%20me%20gustaría%20solicitar%20una%20cita%20en%20el%20Centro%20de%20Estética%20Lucy%20Lara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full transition-colors font-medium"
                >
                  <Phone size={18} className="mr-2" />
                  WhatsApp
                </a>
              </div>

              {/* Redes sociales */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h4 className="font-semibold text-textDark mb-4">Síguenos en redes sociales</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.facebook.com/CBLUCYLARA/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors"
                  >
                    <Facebook size={20} className="text-white" />
                  </a>
                  <a 
                    href="https://www.instagram.com/esteticalucylara/?hl=es" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 p-3 rounded-full transition-colors"
                  >
                    <Instagram size={20} className="text-white" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;