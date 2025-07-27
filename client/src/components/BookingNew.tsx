import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Phone, Facebook, Instagram, CheckCircle, AlertCircle } from "lucide-react";
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

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  date?: string;
  time?: string;
  message?: string;
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
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Lista de servicios disponibles
  const services = [
    "Renovación profunda - higiene facial completa",
    "Renovación de cristal - higiene facial con microdermoabrasión",
    "Descanso y vitalidad - higiene facial con presoterapia ocular",
    "Equilibrio total - higiene facial con presoterapia",
    "Pureza y frescura - higiene facial",
    "Ice Skin - crioterapia facial",
    "Higiene Facial Suprema",
    "Eterna Juventud 2 en 1",
    "Lifting Lumínico",
    "La cápsula del tiempo",
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

  // Client-side validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    } else if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(formData.name.trim())) {
      newErrors.name = "El nombre solo puede contener letras y espacios";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Introduce un email válido";
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{8}$/; // Spanish mobile format
    const cleanPhone = formData.phone.replace(/\s+/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio";
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = "Introduce un teléfono móvil español válido (ej: 612345678)";
    }

    // Service validation
    if (!formData.service) {
      newErrors.service = "Debes seleccionar un servicio";
    }

    // Date validation
    if (!formData.date) {
      newErrors.date = "Debes seleccionar una fecha";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = "La fecha no puede ser anterior a hoy";
      }
    }

    // Time validation
    if (!formData.time) {
      newErrors.time = "Debes seleccionar una hora";
    }

    // Message validation (optional but limited)
    if (formData.message && formData.message.length > 500) {
      newErrors.message = "El mensaje no puede exceder 500 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Error en el formulario",
        description: "Por favor, corrige los errores antes de enviar.",
        variant: "destructive"
      });
      return;
    }

    try {
      setSubmitting(true);
      
      // Prepare data for submission
      const submissionData = {
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.replace(/\s+/g, ''),
        message: formData.message.trim() || undefined
      };
      
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Track successful form submission
        trackEvent('booking_submitted', 'form', 'success');
        
        setSubmitted(true);
        
        // Show success message
        toast({
          title: "¡Reserva enviada exitosamente! ✅",
          description: "Hemos recibido tu solicitud. Te contactaremos pronto para confirmar la disponibilidad.",
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
        // Handle validation errors from server
        if (responseData.errors && Array.isArray(responseData.errors)) {
          const serverErrors: FormErrors = {};
          responseData.errors.forEach((error: any) => {
            if (error.field && error.message) {
              serverErrors[error.field as keyof FormErrors] = error.message;
            }
          });
          setErrors(serverErrors);
        }
        
        toast({
          title: "Error al enviar la reserva",
          description: responseData.message || 'Hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo.',
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast({
        title: "Error de conexión",
        description: "No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet e inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Success state
  if (submitted) {
    return (
      <section id="reserva" className="py-16 bg-gradient-to-br from-neutral via-white to-neutral">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="mb-6">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              </div>
              <h2 className="text-3xl font-bold text-primary mb-4">
                ¡Solicitud Enviada! ✨
              </h2>
              <p className="text-textLight text-lg mb-6">
                Hemos recibido tu solicitud de cita. Nuestro equipo se pondrá en contacto contigo muy pronto para confirmar la disponibilidad y finalizar tu reserva.
              </p>
              <div className="bg-accent/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-primary font-medium">
                  📞 Si tienes prisa, puedes llamarnos directamente:
                </p>
                <div className="flex justify-center gap-4 mt-2">
                  <a href="tel:915052067" className="text-primary font-bold hover:underline">
                    91 505 20 67
                  </a>
                  <a href="tel:684203633" className="text-primary font-bold hover:underline">
                    684 203 633
                  </a>
                </div>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Hacer otra reserva
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

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
              Solicita tu cita
            </h2>
            <p className="text-textLight text-lg max-w-2xl mx-auto leading-relaxed">
              Completa el formulario y nos pondremos en contacto contigo para confirmar tu cita. 
              También puedes llamarnos directamente.
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors ${
                      errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="Tu nombre completo"
                    disabled={submitting}
                  />
                  {errors.name && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </div>
                  )}
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors ${
                      errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="tu@email.com"
                    disabled={submitting}
                  />
                  {errors.email && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-sm font-medium text-textDark mb-2">
                    Teléfono móvil *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors ${
                      errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="612345678"
                    disabled={submitting}
                  />
                  {errors.phone && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Formato: 612345678 (sin espacios ni prefijos)
                  </p>
                </div>

                {/* Servicio */}
                <div>
                  <label className="block text-sm font-medium text-textDark mb-2">
                    Servicio que te interesa *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors ${
                      errors.service ? 'border-red-500 bg-red-50' : 'border-gray-200'
                    }`}
                    disabled={submitting}
                  >
                    <option value="">Selecciona un servicio</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.service}
                    </div>
                  )}
                </div>

                {/* Fecha */}
                <div>
                  <label className="block text-sm font-medium text-textDark mb-2">
                    Fecha preferida *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors ${
                      errors.date ? 'border-red-500 bg-red-50' : 'border-gray-200'
                    }`}
                    disabled={submitting}
                  />
                  {errors.date && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.date}
                    </div>
                  )}
                </div>

                {/* Hora */}
                <div>
                  <label className="block text-sm font-medium text-textDark mb-2">
                    Hora preferida *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors ${
                      errors.time ? 'border-red-500 bg-red-50' : 'border-gray-200'
                    }`}
                    disabled={submitting}
                  >
                    <option value="">Selecciona una hora</option>
                    {timeSlots.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.time}
                    </div>
                  )}
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-sm font-medium text-textDark mb-2">
                    Mensaje adicional (opcional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    maxLength={500}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors resize-none ${
                      errors.message ? 'border-red-500 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="¿Alguna preferencia especial o consulta que quieras hacernos saber?"
                    disabled={submitting}
                  />
                  {errors.message && (
                    <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.message.length}/500 caracteres
                  </p>
                </div>

                {/* Botón de envío */}
                <motion.button
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-4 px-6 rounded-lg font-medium text-white text-lg transition-all duration-300 ${
                    submitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-accent hover:bg-accent/90 hover:shadow-lg'
                  }`}
                  whileHover={!submitting ? { scale: 1.02 } : {}}
                  whileTap={!submitting ? { scale: 0.98 } : {}}
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Enviando...
                    </span>
                  ) : (
                    'Solicitar cita'
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Información de contacto */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Contacto directo */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="font-playfair text-2xl font-semibold mb-6 text-accent">
                  Contacto Directo
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="text-accent" size={20} />
                    <div>
                      <p className="font-medium text-textDark">Teléfonos</p>
                      <div className="space-y-1">
                        <a href="tel:915052067" className="text-textLight hover:text-accent transition-colors">
                          91 505 20 67
                        </a>
                        <br />
                        <a href="tel:684203633" className="text-textLight hover:text-accent transition-colors">
                          684 203 633
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="text-accent" size={20} />
                    <div>
                      <p className="font-medium text-textDark">Horarios</p>
                      <p className="text-textLight">Lunes a Viernes</p>
                      <p className="text-textLight">10:00-13:30 y 16:00-19:30</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Calendar className="text-accent mt-1" size={20} />
                    <div>
                      <p className="font-medium text-textDark">Dirección</p>
                      <p className="text-textLight">
                        C. de la Alegría de la Huerta, 22<br />
                        Villaverde, 28041 Madrid
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Redes sociales */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="font-playfair text-2xl font-semibold mb-6 text-accent">
                  Síguenos
                </h3>
                
                <div className="flex gap-4">
                  <a 
                    href="https://facebook.com/CBLUCYLARA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Facebook size={20} />
                  </a>
                  <a 
                    href="https://instagram.com/esteticalucylara" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:opacity-90 transition-opacity"
                  >
                    <Instagram size={20} />
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl shadow-xl p-8">
                <h3 className="font-playfair text-2xl font-semibold mb-4">
                  ¿Prefieres WhatsApp?
                </h3>
                <p className="mb-6 opacity-90">
                  Contáctanos directamente por WhatsApp para una respuesta más rápida.
                </p>
                <a 
                  href="https://wa.me/34684203633" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  <Phone size={20} />
                  Abrir WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
