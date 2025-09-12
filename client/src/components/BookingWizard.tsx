import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Calendar, User, MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';

// Form validation schema
const bookingSchema = z.object({
  service: z.string().min(1, 'Selecciona un servicio'),
  date: z.string().min(1, 'Selecciona una fecha'),
  time: z.string().min(1, 'Selecciona una hora'),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Teléfono inválido'),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface Step {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Servicio',
    icon: <Calendar className="w-5 h-5" />,
    description: 'Elige tu tratamiento',
  },
  {
    id: 2,
    title: 'Fecha y Hora',
    icon: <Calendar className="w-5 h-5" />,
    description: 'Selecciona cuándo',
  },
  {
    id: 3,
    title: 'Datos Personales',
    icon: <User className="w-5 h-5" />,
    description: 'Información de contacto',
  },
  {
    id: 4,
    title: 'Confirmación',
    icon: <Check className="w-5 h-5" />,
    description: 'Revisa y confirma',
  },
];

const services = [
  'Higiene Facial Suprema',
  'Ice Skin Crioterapia Facial',
  'Micropigmentación Cejas',
  'Micropigmentación Labios',
  'Tratamiento Corporal',
];

const timeSlots = [
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
];

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => (
  <div className="flex items-center justify-between mb-8">
    {steps.map((step, index) => {
      const isActive = index + 1 === currentStep;
      const isCompleted = index + 1 < currentStep;
      
      return (
        <div key={step.id} className="flex items-center">
          <div
            className={cn(
              'flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300',
              {
                'bg-[#8b2154] border-[#8b2154] text-white': isActive || isCompleted,
                'border-gray-300 text-gray-400': !isActive && !isCompleted,
              }
            )}
          >
            {isCompleted ? <Check className="w-5 h-5" /> : step.icon}
          </div>
          
          <div className="ml-3 flex-1">
            <div className={cn('text-sm font-semibold', {
              'text-[#8b2154]': isActive || isCompleted,
              'text-gray-400': !isActive && !isCompleted,
            })}>
              {step.title}
            </div>
            <div className="text-xs text-gray-500">{step.description}</div>
          </div>
          
          {index < steps.length - 1 && (
            <div
              className={cn('w-12 h-0.5 mx-4 transition-colors duration-300', {
                'bg-[#8b2154]': isCompleted,
                'bg-gray-300': !isCompleted,
              })}
            />
          )}
        </div>
      );
    })}
  </div>
);

interface BookingWizardProps {
  onSubmit: (data: BookingFormData) => void;
  className?: string;
}

const BookingWizard: React.FC<BookingWizardProps> = ({ onSubmit, className }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: 'onBlur',
  });

  const { register, handleSubmit, watch, formState: { errors }, trigger, getValues } = form;
  const watchedValues = watch();

  const nextStep = async () => {
    let fieldsToValidate: (keyof BookingFormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['service'];
        break;
      case 2:
        fieldsToValidate = ['date', 'time'];
        break;
      case 3:
        fieldsToValidate = ['name', 'email', 'phone'];
        break;
    }

    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleFormSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-800">Selecciona tu tratamiento</h3>
            <div className="grid gap-3">
              {services.map((service) => (
                <label
                  key={service}
                  className={cn(
                    'flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:border-[#8b2154]',
                    {
                      'border-[#8b2154] bg-[#8b2154]/5': watchedValues.service === service,
                      'border-gray-300': watchedValues.service !== service,
                    }
                  )}
                >
                  <input
                    type="radio"
                    value={service}
                    {...register('service')}
                    className="sr-only"
                  />
                  <div
                    className={cn('w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center', {
                      'border-[#8b2154]': watchedValues.service === service,
                      'border-gray-300': watchedValues.service !== service,
                    })}
                  >
                    {watchedValues.service === service && (
                      <div className="w-2 h-2 bg-[#8b2154] rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-700">{service}</span>
                </label>
              ))}
            </div>
            {errors.service && (
              <p className="text-red-600 text-sm">{errors.service.message}</p>
            )}
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-800">Fecha y hora</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha preferida
                </label>
                <input
                  type="date"
                  {...register('date')}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b2154] focus:border-[#8b2154]"
                />
                {errors.date && (
                  <p className="text-red-600 text-sm mt-1">{errors.date.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hora preferida
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map((time) => (
                    <label
                      key={time}
                      className={cn(
                        'flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:border-[#8b2154]',
                        {
                          'border-[#8b2154] bg-[#8b2154]/5': watchedValues.time === time,
                          'border-gray-300': watchedValues.time !== time,
                        }
                      )}
                    >
                      <input
                        type="radio"
                        value={time}
                        {...register('time')}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{time}</span>
                    </label>
                  ))}
                </div>
                {errors.time && (
                  <p className="text-red-600 text-sm mt-1">{errors.time.message}</p>
                )}
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-800">Datos de contacto</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b2154] focus:border-[#8b2154]"
                  placeholder="Tu nombre completo"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b2154] focus:border-[#8b2154]"
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b2154] focus:border-[#8b2154]"
                  placeholder="123 456 789"
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje adicional (opcional)
                </label>
                <textarea
                  {...register('message')}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b2154] focus:border-[#8b2154]"
                  placeholder="Cuéntanos si tienes alguna preferencia especial..."
                />
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-800">Confirma tu cita</h3>
            
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div className="border-b pb-4">
                <h4 className="font-semibold text-gray-700">Servicio</h4>
                <p className="text-gray-600">{watchedValues.service}</p>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="font-semibold text-gray-700">Fecha y Hora</h4>
                <p className="text-gray-600">
                  {watchedValues.date} a las {watchedValues.time}
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h4 className="font-semibold text-gray-700">Datos de Contacto</h4>
                <p className="text-gray-600">{watchedValues.name}</p>
                <p className="text-gray-600">{watchedValues.email}</p>
                <p className="text-gray-600">{watchedValues.phone}</p>
              </div>
              
              {watchedValues.message && (
                <div>
                  <h4 className="font-semibold text-gray-700">Mensaje</h4>
                  <p className="text-gray-600">{watchedValues.message}</p>
                </div>
              )}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                📋 <strong>Importante:</strong> Esta es una solicitud de cita. Nos pondremos en contacto contigo para confirmar la disponibilidad.
              </p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn('max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg', className)}>
      <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
      
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        <div className="flex justify-between mt-8 pt-6 border-t">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={cn(
              'flex items-center px-6 py-3 rounded-lg font-medium transition-colors duration-200',
              {
                'text-gray-400 cursor-not-allowed': currentStep === 1,
                'text-gray-600 hover:text-gray-800': currentStep > 1,
              }
            )}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Anterior
          </button>

          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center px-6 py-3 bg-[#8b2154] text-white rounded-lg font-medium hover:bg-[#7a1d47] transition-colors duration-200"
            >
              Siguiente
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-6 py-3 bg-[#8b2154] text-white rounded-lg font-medium hover:bg-[#7a1d47] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Confirmar Cita
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookingWizard;