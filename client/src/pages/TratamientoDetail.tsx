import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, CheckCircle } from "lucide-react";
import { Link, useParams } from "wouter";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import renovacionProfundaSvg from "@/assets/svg/renovacion-profunda.svg";
import renovacionCristalSvg from "@/assets/svg/renovacion-cristal.svg";
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
  descripcionLarga: string;
  pasos: string[];
  beneficios: string[];
  imagen: string;
  alt: string;
}

const tratamientosFaciales: TratamientoFacial[] = [
  {
    id: 1,
    nombre: "Renovación Profunda",
    precio: "61€",
    duracion: "60 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento de limpieza profunda que hidrata, revitaliza y equilibra la piel.",
    descripcionLarga: "Nuestro tratamiento de Renovación Profunda es la higiene facial completa perfecta para mantener tu piel limpia, hidratada y radiante. Este tratamiento combina técnicas tradicionales de limpieza con productos premium para lograr una piel equilibrada y revitalizada.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Exfoliación mecánica suave",
      "Extracción de comedones para una oxigenación y limpieza de la piel",
      "Masaje relajante junto con una mascarilla acorde de las necesidades de la piel",
      "Acabamos el tratamiento con una crema finalizadora"
    ],
    beneficios: [
      "Limpieza profunda de los poros",
      "Hidratación intensiva",
      "Mejora la textura de la piel",
      "Equilibra la producción de grasa",
      "Proporciona luminosidad natural"
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
    descripcionLarga: "La Renovación de Cristal utiliza la técnica de microdermoabrasión para eliminar las células muertas de la superficie de la piel, revelando una piel más suave, luminosa y rejuvenecida. Este tratamiento avanzado es ideal para mejorar la textura y apariencia general de la piel.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Extracción de comedones para una oxigenación y limpieza de la piel",
      "Microdermoabrasión que exfolia en profundidad, suaviza la textura de la piel y aporta luminosidad",
      "Elimina las células muertas e imperfecciones",
      "Masaje relajante junto con una mascarilla acorde de las necesidades de la piel",
      "Acabamos el tratamiento con una crema finalizadora"
    ],
    beneficios: [
      "Exfoliación profunda y efectiva",
      "Reducción de líneas finas",
      "Mejora la luminosidad de la piel",
      "Suaviza la textura cutánea",
      "Estimula la regeneración celular"
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
    descripcionLarga: "El tratamiento Descanso y Vitalidad combina una higiene facial completa con presoterapia ocular específica para el contorno de ojos. Es perfecto para quienes buscan rejuvenecer la mirada y reducir los signos de fatiga ocular.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Exfoliación mecánica",
      "Extracción de comedones para una oxigenación y limpieza de la piel",
      "Finalizamos el tratamiento con las gafas de presoterapia",
      "Reducen bolsas, ojeras y fatiga ocular, dejando la mirada más luminosa y descansada"
    ],
    beneficios: [
      "Reduce bolsas y ojeras",
      "Disminuye la fatiga ocular",
      "Ilumina la mirada",
      "Mejora la circulación en el contorno de ojos",
      "Efecto relajante y descansado"
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
    descripcionLarga: "Nuestro tratamiento más completo que combina higiene facial profesional con presoterapia corporal. Equilibrio Total ofrece una experiencia de bienestar integral que revitaliza tanto tu rostro como tu cuerpo, proporcionando una sensación de ligereza y renovación total.",
    pasos: [
      "El tratamiento va acompañado de presoterapia en piernas",
      "Activa la circulación, reduce la retención de líquidos",
      "Proporciona una sensación de ligereza y bienestar integral",
      "La higiene consta de limpieza de la piel junto con su tonificación",
      "Exfoliación mecánica, extracción de comedones",
      "Masaje relajante junto con una mascarilla acorde de las necesidades de la piel",
      "Acabamos el tratamiento con una crema finalizadora"
    ],
    beneficios: [
      "Mejora la circulación sanguínea",
      "Reduce la retención de líquidos",
      "Sensación de ligereza en las piernas",
      "Rostro limpio y revitalizado",
      "Bienestar integral cuerpo-mente"
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
    descripcionLarga: "El tratamiento Pureza y Frescura Básica es ideal para pieles que buscan una limpieza suave pero efectiva. Este ritual esencial limpia y revitaliza la piel sin extracciones agresivas, siendo perfecto para pieles sensibles o como mantenimiento regular.",
    pasos: [
      "El ritual esencial para limpiar y revitalizar la piel sin extracción",
      "Incluye limpieza profunda, tonificación",
      "Exfoliación mecánica suave, aplicación de ampolla hidratante",
      "Masaje relajante, mascarilla adaptada a tu piel",
      "Crema final para una hidratación duradera",
      "Tratamiento para pieles que no necesiten una limpieza en profundidad"
    ],
    beneficios: [
      "Limpieza suave pero efectiva",
      "Hidratación profunda",
      "Apto para pieles sensibles",
      "Revitaliza el cutis",
      "Mantenimiento regular de la piel"
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
    descripcionLarga: "Nuestro tratamiento más avanzado que incorpora tecnología LED de última generación. La fotoestimulación LED activa la regeneración celular natural, mejora la hidratación y proporciona un efecto anti-edad visible, dejando la piel revitalizada y luminosa.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Exfoliación mecánica, extracción de comedones para una oxigenación y limpieza de la piel",
      "Realizando la higiene comenzaremos con el tratamiento de fotoestimulación Led",
      "Activa la regeneración celular, mejora la hidratación",
      "Aporta un efecto calmante, dejando la piel revitalizada y luminosa",
      "Masaje relajante junto con una mascarilla acorde de las necesidades de la piel",
      "Acabamos el tratamiento con una crema finalizadora"
    ],
    beneficios: [
      "Estimula la regeneración celular",
      "Efecto anti-edad visible",
      "Mejora la producción de colágeno",
      "Calma y reduce la inflamación",
      "Luminosidad y vitalidad excepcional"
    ],
    imagen: purezaCompletaSvg,
    alt: "Tratamiento facial pureza y frescura completa con Led"
  }
];

const TratamientoDetail = () => {
  const { id } = useParams();
  const tratamiento = tratamientosFaciales.find(t => t.id === parseInt(id || '0'));

  if (!tratamiento) {
    return (
      <div className="font-inter text-textDark bg-neutral min-h-screen">
        <Header />
        <main className="pt-32 pb-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-3xl md:text-4xl font-semibold mb-6">
              Tratamiento no encontrado
            </h1>
            <Link href="/tratamientos-faciales" className="text-accent hover:text-accentDark">
              Volver a tratamientos faciales
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
        <title>{tratamiento.nombre} - Centro de Estética Lucy Lara</title>
        <meta name="description" content={tratamiento.descripcionLarga} />
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
            <div className="lg:order-1">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <img 
                  src={tratamiento.imagen} 
                  alt={tratamiento.alt} 
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
            </div>
            
            {/* Información principal */}
            <div className="lg:order-2">
              <h1 className="font-playfair text-4xl md:text-5xl font-semibold mb-6">
                {tratamiento.nombre}
              </h1>
              
              <div className="flex items-center gap-6 mb-6 text-textLight">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{tratamiento.duracion}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{tratamiento.frecuencia}</span>
                </div>
              </div>
              
              <div className="text-3xl font-semibold text-accent mb-6">
                {tratamiento.precio}
              </div>
              
              <p className="text-lg text-textLight mb-8 leading-relaxed">
                {tratamiento.descripcionLarga}
              </p>
              
              <button className="bg-accent hover:bg-accentDark text-white px-8 py-3 rounded-full transition-colors font-medium text-lg">
                Reservar cita
              </button>
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
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="space-y-4">
                {tratamiento.pasos.map((paso, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-textLight leading-relaxed">{paso}</p>
                  </div>
                ))}
              </div>
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
              Beneficios
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tratamiento.beneficios.map((beneficio, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-accent flex-shrink-0" />
                    <span className="text-textLight">{beneficio}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Call to action final */}
          <motion.div 
            className="text-center bg-white rounded-xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="font-playfair text-2xl font-semibold mb-4">
              ¿Listo para transformar tu piel?
            </h3>
            <p className="text-textLight mb-6 max-w-2xl mx-auto">
              Reserva tu cita ahora y experimenta los beneficios de nuestro tratamiento {tratamiento.nombre}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent hover:bg-accentDark text-white px-8 py-3 rounded-full transition-colors font-medium">
                Reservar cita
              </button>
              <Link 
                href="/tratamientos-faciales"
                className="border border-accent text-accent hover:bg-accent hover:text-white px-8 py-3 rounded-full transition-colors font-medium"
              >
                Ver otros tratamientos
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TratamientoDetail;