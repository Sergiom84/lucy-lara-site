import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, MessageSquare, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { z } from "zod";

// Validation schema
const bookingSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("El email no es válido"),
  phone: z.string().min(9, "El teléfono debe tener al menos 9 dígitos"),
  service: z.string().min(1, "Debes seleccionar un servicio"),
  date: z.string().min(1, "Debes seleccionar una fecha"),
  time: z.string().min(1, "Debes seleccionar una hora"),
  notes: z.string().optional()
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface FormErrors {
  [key: string]: string;
}

const BookingImproved = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState("");

  const services = [
    "Higiene Facial Suprema",
    "Ice Skin - Crioterapia Facial", 
    "Eterna Juventud 2 en 1",
    "Lifting Lumínico",
    "La Cápsula del Tiempo",
    "Descanso y Vitalidad",
    "Equilibrio Puro",
    "Luz Antiacné",
    "Luz Calmante",
    "Luz Pura",
    "Eliminación de Vello",
    "Hidrolinfa",
    "Acupuntura"
  ];

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30", "20:00"
  ];

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Validate single field
  const validateField = (name: string, value: string) => {
    try {
      const fieldSchema = bookingSchema.pick({ [name]: true } as any);
      fieldSchema.parse({ [name]: value });
      setErrors(prev => ({ ...prev, [name]: "" }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [name]: error.errors[0].message }));
        return false;
      }
      return false;
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    if (value.trim()) {
      validateField(name, value);
    } else {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Validate entire form
  const validateForm = (): boolean => {
    try {
      bookingSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        return false;
      }
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if response is ok first
      if (!response.ok) {
        console.error('Response not ok:', response.status, response.statusText);
        
        // Try to get error message from response
        try {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
        } catch (jsonError) {
          // If JSON parsing fails, use status text
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      }

      // Parse JSON only if response is ok
      const data = await response.json();

      setSubmitStatus('success');
      setSubmitMessage('¡Solicitud enviada! Te hemos enviado un email de confirmación.');
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        date: "",
        time: "",
        notes: ""
      });
      setErrors({});

      // Scroll to success message
      setTimeout(() => {
        document.getElementById('booking-status')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (error) {
      console.error('Booking error:', error);
      setSubmitStatus('error');
      setSubmitMessage(error instanceof Error ? error.message : 'Error inesperado. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset status message
  const resetStatus = () => {
    setSubmitStatus('idle');
    setSubmitMessage('');
  };

  return (
    <section id="booking" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">
            Solicitar Información
          </h2>
          <p className="text-gray-600 text-lg">
            Completa el formulario y nos pondremos en contacto contigo para brindarte toda la información
          </p>
        </motion.div>

        {/* Status Messages */}
        {submitStatus !== 'idle' && (
          <motion.div
            id="booking-status"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mb-8 p-4 rounded-lg border ${
              submitStatus === 'success' 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            <div className="flex items-center">
              {submitStatus === 'success' ? (
                <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              )}
              <p className="flex-1">{submitMessage}</p>
              <button 
                onClick={resetStatus}
                className="ml-2 text-sm underline hover:no-underline"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <User className="inline w-4 h-4 mr-2" />
                Nombre Completo *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Tu nombre completo"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <Mail className="inline w-4 h-4 mr-2" />
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="tu@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <Phone className="inline w-4 h-4 mr-2" />
                Teléfono *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="123 456 789"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Service Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Servicio *
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors ${
                  errors.service ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecciona un servicio</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.service}
                </p>
              )}
            </div>

            {/* Date Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <Calendar className="inline w-4 h-4 mr-2" />
                Fecha Preferida *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={getMinDate()}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors ${
                  errors.date ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.date}
                </p>
              )}
            </div>

            {/* Time Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <Clock className="inline w-4 h-4 mr-2" />
                Hora Preferida *
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors ${
                  errors.time ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecciona una hora</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.time && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.time}
                </p>
              )}
            </div>
          </div>

          {/* Notes Field */}
          <div className="mt-6">
            <label className="block text-gray-700 font-medium mb-2">
              <MessageSquare className="inline w-4 h-4 mr-2" />
              Comentarios Adicionales
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors resize-none"
              placeholder="Cualquier información adicional que consideres importante..."
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-accent hover:bg-accentDark text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Procesando Solicitud...
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5 mr-2" />
                  Enviar
                </>
              )}
            </motion.button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Nota:</strong> Esta solicitud de información y la selección de fecha y hora son orientativas y no constituyen una reserva confirmada hasta que recibas confirmación expresa por parte del centro, ya sea por email o vía telefónica. 
              Para consultas urgentes, puedes contactarnos directamente al{' '}
              <a href="tel:915052067" className="font-medium underline">91 505 20 67</a>.
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default BookingImproved;
