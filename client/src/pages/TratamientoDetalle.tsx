import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, CheckCircle } from "lucide-react";
import { Link, useParams } from "wouter";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import higieneSupremaImg from "../../../attached_assets/Higiene Facial Suprema_1750665963558.jpg";
import luzCalmanteImg from "../../../attached_assets/Luz calmante - fotoestimulación para la piel sensible_1750665963555.jpg";
import iceSkinImg from "../../../attached_assets/Ice Skin - crioterapia facial_1750665963556.jpg";
import eternaJuventudImg from "../../../attached_assets/Eterna Juventud 2 en 1_1750665963559.jpg";
import descansoVitalidadSvg from "@/assets/svg/descanso-vitalidad.svg";
import equilibrioTotalSvg from "@/assets/svg/equilibrio-total.svg";
import purezaBasicaSvg from "@/assets/svg/pureza-basica.svg";
import purezaCompletaSvg from "@/assets/svg/pureza-completa.svg";

interface TratamientoFacial {
  id: number;
  nombre: string;
  precio: string;
  duracion?: string;
  frecuencia: string;
  descripcion: string;
  descripcionCompleta: string;
  pasos: string[];
  beneficios: string[];
  imagen: string;
  alt: string;
}

// Datos completos de tratamientos faciales
const tratamientosFaciales: TratamientoFacial[] = [
  {
    id: 1,
    nombre: "Renovación Profunda",
    precio: "61€",
    duracion: "60 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento de limpieza profunda que hidrata, revitaliza y equilibra la piel.",
    descripcionCompleta: "Nuestro tratamiento de Renovación Profunda es una higiene facial completa diseñada para revitalizar y equilibrar tu piel. Este tratamiento personalizado combina técnicas profesionales de limpieza profunda con productos de alta calidad para conseguir una piel radiante y saludable.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Exfoliación mecánica suave",
      "Extracción de comedones para una oxigenación y limpieza de la piel",
      "Masaje relajante junto con una mascarilla acorde de las necesidades de la piel",
      "Acabamos el tratamiento con una crema finalizadora hidratante"
    ],
    beneficios: [
      "Piel profundamente limpia y purificada",
      "Mejora de la textura y luminosidad",
      "Hidratación profunda y duradera",
      "Equilibrio del pH natural de la piel",
      "Sensación de relajación y bienestar"
    ],
    imagen: renovacionProfundaSvg,
    alt: "Tratamiento facial de renovación profunda"
  },
  {
    id: 2,
    nombre: "Renovación de Cristal",
    precio: "71€",
    duracion: "70 min",
    frecuencia: "1 vez al mes",
    descripcion: "Higiene facial completa con microdermoabrasión que hidrata, pule y oxigena.",
    descripcionCompleta: "El tratamiento de Renovación de Cristal incorpora la técnica de microdermoabrasión para una exfoliación profunda y efectiva. Este avanzado tratamiento elimina las células muertas, suaviza la textura de la piel y proporciona una luminosidad incomparable.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Extracción de comedones para una oxigenación y limpieza de la piel",
      "Microdermoabrasión que exfolia en profundidad, suaviza la textura de la piel y aporta luminosidad",
      "Eliminación de células muertas e imperfecciones",
      "Masaje relajante junto con una mascarilla acorde de las necesidades de la piel",
      "Acabamos el tratamiento con una crema finalizadora"
    ],
    beneficios: [
      "Exfoliación profunda y renovación celular",
      "Reducción de imperfecciones y marcas",
      "Piel más suave y luminosa",
      "Mejora de la absorción de productos",
      "Estimulación de la producción de colágeno"
    ],
    imagen: renovacionCristalSvg,
    alt: "Tratamiento facial renovación de cristal con microdermoabrasión"
  },
  {
    id: 3,
    nombre: "Descanso y Vitalidad",
    precio: "71€",
    duracion: "70 min",
    frecuencia: "1 vez al mes",
    descripcion: "Higiene facial completa con presoterapia ocular que reduce bolsas, ojeras y fatiga ocular.",
    descripcionCompleta: "Este tratamiento especializado combina una higiene facial completa con presoterapia ocular avanzada. Ideal para reducir los signos de fatiga, bolsas y ojeras, dejando tu mirada más fresca y luminosa.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Exfoliación mecánica suave",
      "Extracción de comedones para una oxigenación y limpieza de la piel",
      "Aplicación de las gafas de presoterapia ocular",
      "Reducción de bolsas, ojeras y fatiga ocular, dejando la mirada más luminosa y descansada"
    ],
    beneficios: [
      "Reducción visible de bolsas y ojeras",
      "Mejora de la circulación en el contorno de ojos",
      "Disminución de la fatiga ocular",
      "Mirada más fresca y descansada",
      "Efecto lifting natural en el área ocular"
    ],
    imagen: descansoVitalidadSvg,
    alt: "Tratamiento facial descanso y vitalidad con presoterapia ocular"
  },
  {
    id: 4,
    nombre: "Equilibrio Total",
    precio: "79€",
    duracion: "80 min",
    frecuencia: "1 vez al mes",
    descripcion: "Higiene facial con presoterapia que revitaliza la cara y el cuerpo.",
    descripcionCompleta: "Nuestro tratamiento más completo que combina higiene facial profesional con presoterapia corporal. Una experiencia integral que cuida tanto tu rostro como tu cuerpo, proporcionando equilibrio y bienestar total.",
    pasos: [
      "Higiene facial completa con limpieza de la piel y tonificación",
      "Exfoliación mecánica y extracción de comedones",
      "Presoterapia en piernas que activa la circulación",
      "Reducción de la retención de líquidos",
      "Masaje relajante junto con una mascarilla personalizada",
      "Sensación de ligereza y bienestar integral",
      "Acabamos el tratamiento con una crema finalizadora"
    ],
    beneficios: [
      "Mejora de la circulación facial y corporal",
      "Reducción de la retención de líquidos",
      "Sensación de ligereza en las piernas",
      "Piel del rostro revitalizada y equilibrada",
      "Relajación profunda y bienestar integral"
    ],
    imagen: equilibrioTotalSvg,
    alt: "Tratamiento facial equilibrio total con presoterapia"
  },
  {
    id: 5,
    nombre: "Pureza y Frescura Básica",
    precio: "55€",
    duracion: "45 min",
    frecuencia: "Según necesidad",
    descripcion: "Higiene facial básica, hidratante y revitalizante.",
    descripcionCompleta: "El tratamiento esencial para mantener tu piel limpia, hidratada y radiante. Perfecto para pieles que no requieren extracción profunda pero necesitan cuidado y mantenimiento regular.",
    pasos: [
      "Limpieza profunda y tonificación",
      "Exfoliación mecánica suave",
      "Aplicación de ampolla hidratante personalizada",
      "Masaje relajante adaptado a tu tipo de piel",
      "Mascarilla específica para tus necesidades",
      "Crema final para una hidratación duradera"
    ],
    beneficios: [
      "Limpieza suave y efectiva",
      "Hidratación profunda sin irritación",
      "Mantenimiento de la salud cutánea",
      "Piel fresca y revitalizada",
      "Tratamiento ideal para pieles sensibles"
    ],
    imagen: purezaBasicaSvg,
    alt: "Tratamiento facial pureza y frescura básica"
  },
  {
    id: 6,
    nombre: "Pureza y Frescura Completa",
    precio: "89€",
    duracion: "75 min",
    frecuencia: "1 vez al mes",
    descripcion: "Higiene facial completa con fotoestimulación Led que hidrata, revitaliza y equilibra la piel.",
    descripcionCompleta: "Nuestro tratamiento más avanzado que combina higiene facial profesional con la tecnología LED de última generación. La fotoestimulación activa la regeneración celular y proporciona resultados visibles desde la primera sesión.",
    pasos: [
      "Limpieza profunda de la piel junto con su tonificación",
      "Exfoliación mecánica y extracción de comedones",
      "Tratamiento de fotoestimulación LED personalizado",
      "Activación de la regeneración celular",
      "Mejora de la hidratación y luminosidad",
      "Masaje relajante con mascarilla específica",
      "Efecto calmante y revitalizante",
      "Acabamos con una crema finalizadora nutritiva"
    ],
    beneficios: [
      "Regeneración celular acelerada",
      "Reducción de líneas de expresión",
      "Mejora significativa de la luminosidad",
      "Hidratación profunda y duradera",
      "Efecto anti-edad y revitalizante",
      "Piel visiblemente más joven y saludable"
    ],
    imagen: purezaCompletaSvg,
    alt: "Tratamiento facial pureza y frescura completa con Led"
  }
];

const TratamientoDetalle = () => {
  const params = useParams();
  const tratamientoId = parseInt(params.id || "1");
  const tratamiento = tratamientosFaciales.find(t => t.id === tratamientoId);

  if (!tratamiento) {
    return (
      <div className="font-inter text-textDark bg-neutral min-h-screen">
        <Header />
        <main className="pt-32 pb-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-3xl font-semibold mb-4">Tratamiento no encontrado</h1>
            <Link href="/tratamientos-faciales" className="text-accent hover:text-accentDark">
              Volver a tratamientos
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-inter text-textDark bg-neutral min-h-screen">
      <Helmet>
        <title>{tratamiento.nombre} - Tratamientos Faciales - Centro de Estética Lucy Lara</title>
        <meta name="description" content={`${tratamiento.descripcionCompleta} Precio: ${tratamiento.precio}. Duración: ${tratamiento.duracion}.`} />
      </Helmet>
      
      <Header />
      
      <main className="pt-32 pb-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Navegación de regreso */}
          <Link 
            href="/tratamientos-faciales" 
            className="inline-flex items-center text-accent hover:text-accentDark mb-8 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Volver a tratamientos faciales
          </Link>
          
          {/* Header del tratamiento */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Imagen */}
            <div className="relative">
              <div className="aspect-square bg-white rounded-xl shadow-lg overflow-hidden">
                <img 
                  src={tratamiento.imagen} 
                  alt={tratamiento.alt} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Información principal */}
            <div className="space-y-6">
              <div>
                <h1 className="font-playfair text-4xl md:text-5xl font-semibold mb-4">
                  {tratamiento.nombre}
                </h1>
                <p className="text-xl text-textLight mb-6">
                  {tratamiento.descripcionCompleta}
                </p>
              </div>
              
              {/* Detalles del servicio */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-y border-gray-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">
                    {tratamiento.precio}
                  </div>
                  <div className="text-sm text-textLight">Precio</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock size={24} className="text-accent mr-2" />
                    <span className="text-xl font-semibold">{tratamiento.duracion}</span>
                  </div>
                  <div className="text-sm text-textLight">Duración</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Calendar size={24} className="text-accent mr-2" />
                    <span className="text-xl font-semibold">{tratamiento.frecuencia}</span>
                  </div>
                  <div className="text-sm text-textLight">Frecuencia</div>
                </div>
              </div>
              
              {/* Botón de reserva */}
              <div className="pt-6">
                <button className="w-full bg-accent hover:bg-accentDark text-white py-4 px-8 rounded-full text-lg font-semibold transition-colors">
                  Reservar {tratamiento.nombre}
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Pasos del tratamiento */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-playfair text-3xl font-semibold mb-8 text-center">
              Pasos del Tratamiento
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tratamiento.pasos.map((paso, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-textLight">{paso}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Beneficios */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="font-playfair text-3xl font-semibold mb-8 text-center">
              Beneficios del Tratamiento
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tratamiento.beneficios.map((beneficio, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-md"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <CheckCircle size={20} className="text-accent flex-shrink-0" />
                  <span className="text-textLight">{beneficio}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* CTA Final */}
          <motion.div 
            className="bg-accent/10 rounded-xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="font-playfair text-2xl font-semibold mb-4">
              ¿Listo para transformar tu piel?
            </h3>
            <p className="text-textLight mb-6 max-w-2xl mx-auto">
              Reserva tu cita para el tratamiento {tratamiento.nombre} y experimenta los beneficios de nuestros cuidados profesionales.
            </p>
            <button className="bg-accent hover:bg-accentDark text-white py-3 px-8 rounded-full text-lg font-semibold transition-colors">
              Reservar Ahora - {tratamiento.precio}
            </button>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TratamientoDetalle;