import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, Phone, Mail, Clock, 
  Facebook, Instagram, Twitter, Dribbble
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
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
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
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
      
      // Send form data to backend
      await apiRequest('POST', '/api/booking', formData);
      
      // Track form submission event
      trackEvent('booking_submitted', 'form', 'booking_form');
      
      // Show success message
      toast({
        title: "Reserva enviada",
        description: "Nos pondremos en contacto contigo a la mayor brevedad para confirmar tu cita.",
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
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error al enviar",
        description: "Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo más tarde.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="reserva" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Booking Form */}
          <motion.div 
            className="lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            <motion.h2 
              className="font-playfair text-3xl md:text-4xl font-semibold mb-6"
              variants={itemVariants}
            >
              Reserva tu cita
            </motion.h2>
            
            <motion.p 
              className="text-textLight mb-8"
              variants={itemVariants}
            >
              Completa el formulario y nos pondremos en contacto contigo para confirmar tu cita. También puedes contactarnos directamente por teléfono o WhatsApp.
            </motion.p>
            
            <motion.form 
              className="space-y-6"
              onSubmit={handleSubmit}
              variants={containerVariants}
            >
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium text-textDark mb-1">
                    Nombre completo
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-textDark mb-1">
                    Email
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <label htmlFor="phone" className="block text-sm font-medium text-textDark mb-1">
                    Teléfono
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="service" className="block text-sm font-medium text-textDark mb-1">
                    Servicio
                  </label>
                  <select 
                    id="service" 
                    name="service" 
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  >
                    <option value="">Seleccionar servicio</option>
                    <option value="facial">Tratamiento Facial</option>
                    <option value="massage">Masaje Terapéutico</option>
                    <option value="manicure">Manicura y Pedicura</option>
                    <option value="hair">Tratamiento Capilar</option>
                    <option value="body">Tratamiento Corporal</option>
                    <option value="makeup">Maquillaje Profesional</option>
                  </select>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <label htmlFor="date" className="block text-sm font-medium text-textDark mb-1">
                    Fecha preferida
                  </label>
                  <input 
                    type="date" 
                    id="date" 
                    name="date" 
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="time" className="block text-sm font-medium text-textDark mb-1">
                    Hora preferida
                  </label>
                  <select 
                    id="time" 
                    name="time" 
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  >
                    <option value="">Seleccionar hora</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                    <option value="18:00">18:00</option>
                    <option value="19:00">19:00</option>
                  </select>
                </motion.div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-medium text-textDark mb-1">
                  Mensaje (opcional)
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accentDark text-white py-3 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={submitting}
                >
                  {submitting ? "Enviando..." : "Solicitar Cita"}
                </button>
              </motion.div>
            </motion.form>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div 
            className="lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            <motion.div 
              className="bg-neutralDark p-8 rounded-2xl h-full"
              variants={itemVariants}
            >
              <h3 className="font-playfair text-2xl font-semibold mb-6">
                Información de contacto
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/30 rounded-full flex items-center justify-center text-accent mt-1">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Dirección</h4>
                    <p className="text-textLight">Calle Belleza 123, 28001 Madrid</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/30 rounded-full flex items-center justify-center text-accent mt-1">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Teléfono</h4>
                    <p className="text-textLight">+34 912 345 678</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/30 rounded-full flex items-center justify-center text-accent mt-1">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Email</h4>
                    <p className="text-textLight">info@beautywellness.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/30 rounded-full flex items-center justify-center text-accent mt-1">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Horario</h4>
                    <p className="text-textLight">Lunes a Viernes: 10:00 - 20:00</p>
                    <p className="text-textLight">Sábado: 10:00 - 14:00</p>
                    <p className="text-textLight">Domingo: Cerrado</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8" id="contacto">
                <h4 className="font-medium text-lg mb-4">Síguenos en redes sociales</h4>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors">
                    <Facebook size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors">
                    <Twitter size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors">
                    <Dribbble size={18} />
                  </a>
                </div>
              </div>
              
              <div className="mt-8">
                {/* Google Map */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12144.42814679646!2d-3.7026599614282227!3d40.42675782610712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2sMadrid%2C%20Spain!5e0!3m2!1sen!2suk!4v1655380177835!5m2!1sen!2suk" 
                  width="100%" 
                  height="200" 
                  style={{ border: 0, borderRadius: '0.75rem' }}
                  allowFullScreen 
                  loading="lazy" 
                  title="Ubicación del centro"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
