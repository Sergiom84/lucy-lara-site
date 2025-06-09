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
    nombre: "Limpieza de Cutis Simple",
    precio: "30€",
    duracion: "30 min",
    frecuencia: "Cada 15 días",
    descripcion: "Limpieza básica que desmaquilla, limpia y tonifica la piel dejándola fresca y renovada.",
    descripcionLarga: "La Limpieza de Cutis Simple es el tratamiento perfecto para mantener tu piel limpia y fresca. Este tratamiento básico pero efectivo desmaquilla profundamente, limpia y tonifica la piel, siendo ideal para el mantenimiento regular de la salud cutánea.",
    pasos: [
      "Desmaquillado completo del rostro",
      "Limpieza profunda de la piel",
      "Tonificación para equilibrar el pH cutáneo",
      "Hidratación final según tipo de piel"
    ],
    beneficios: [
      "Eliminación completa del maquillaje",
      "Piel limpia y fresca",
      "Poros libres de impurezas",
      "Equilibrio del pH cutáneo",
      "Preparación ideal para otros tratamientos"
    ],
    imagen: purezaBasicaSvg,
    alt: "Limpieza de cutis simple"
  },
  {
    id: 2,
    nombre: "Exfoliación",
    precio: "35€",
    duracion: "30 min",
    frecuencia: "1 vez al mes",
    descripcion: "Exfoliación profunda que elimina células muertas y revela una piel más suave y luminosa.",
    descripcionLarga: "La Exfoliación es un tratamiento esencial para renovar la superficie de la piel. Elimina las células muertas acumuladas, mejora la textura cutánea y prepara la piel para absorber mejor los productos de cuidado, revelando un cutis más suave y luminoso.",
    pasos: [
      "Limpieza previa de la piel",
      "Aplicación de exfoliante específico",
      "Masaje circular para eliminar células muertas",
      "Retirada del producto con agua tibia",
      "Tonificación e hidratación final"
    ],
    beneficios: [
      "Renovación celular acelerada",
      "Textura de piel más suave",
      "Mayor luminosidad facial",
      "Mejor absorción de productos",
      "Estimulación de la circulación"
    ],
    imagen: renovacionCristalSvg,
    alt: "Exfoliación facial profesional"
  },
  {
    id: 3,
    nombre: "Higiene + Extracción",
    precio: "45€",
    duracion: "60 min",
    frecuencia: "1 vez al mes",
    descripcion: "Limpieza profunda con extracción de comedones para purificar los poros y oxigenar la piel.",
    descripcionLarga: "La Higiene + Extracción es un tratamiento completo que combina limpieza profunda con extracción manual de comedones. Ideal para pieles con tendencia grasa o con impurezas, este tratamiento purifica los poros en profundidad y oxigena la piel.",
    pasos: [
      "Desmaquillado y limpieza inicial",
      "Vaporización para abrir los poros",
      "Extracción manual de comedones",
      "Aplicación de tónico desinfectante",
      "Mascarilla calmante",
      "Hidratación final personalizada"
    ],
    beneficios: [
      "Poros profundamente limpios",
      "Eliminación de puntos negros",
      "Oxigenación celular mejorada",
      "Prevención de imperfecciones",
      "Piel más clara y uniforme"
    ],
    imagen: renovacionProfundaSvg,
    alt: "Higiene facial con extracción"
  },
  {
    id: 4,
    nombre: "Higiene + Peeling",
    precio: "55€",
    duracion: "60 min",
    frecuencia: "1 vez cada 2 meses",
    descripcion: "Tratamiento que combina higiene facial con peeling químico para renovar y rejuvenecer la piel.",
    descripcionLarga: "La Higiene + Peeling es un tratamiento avanzado que combina la limpieza profunda con un peeling químico suave. Este procedimiento renueva las capas superficiales de la piel, mejora la textura y reduce imperfecciones, proporcionando un cutis más joven y radiante.",
    pasos: [
      "Limpieza y preparación de la piel",
      "Aplicación de peeling químico específico",
      "Tiempo de actuación controlado",
      "Neutralización del peeling",
      "Mascarilla calmante post-peeling",
      "Protección solar obligatoria"
    ],
    beneficios: [
      "Renovación celular acelerada",
      "Reducción de manchas superficiales",
      "Mejora de líneas finas",
      "Textura más uniforme",
      "Estimulación del colágeno"
    ],
    imagen: equilibrioTotalSvg,
    alt: "Higiene facial con peeling"
  },
  {
    id: 5,
    nombre: "Higiene + Radiofrecuencia",
    precio: "70€",
    duracion: "75 min",
    frecuencia: "1 vez al mes",
    descripcion: "Limpieza facial completa con radiofrecuencia para tensar, reafirmar y rejuvenecer la piel.",
    descripcionLarga: "La Higiene + Radiofrecuencia combina una limpieza facial profunda con tecnología de radiofrecuencia. Este tratamiento estimula la producción natural de colágeno, tensa la piel, reduce la flacidez y proporciona un efecto lifting natural inmediato.",
    pasos: [
      "Limpieza profunda inicial",
      "Preparación de la piel para radiofrecuencia",
      "Aplicación de gel conductor",
      "Tratamiento con radiofrecuencia en zonas específicas",
      "Mascarilla tensor post-tratamiento",
      "Hidratación y protección final"
    ],
    beneficios: [
      "Efecto tensor inmediato",
      "Estimulación del colágeno",
      "Reducción de flacidez",
      "Mejora del óvalo facial",
      "Piel más firme y tonificada"
    ],
    imagen: descansoVitalidadSvg,
    alt: "Higiene facial con radiofrecuencia"
  },
  {
    id: 6,
    nombre: "Higiene + LED",
    precio: "60€",
    duracion: "60 min",
    frecuencia: "1 vez al mes",
    descripcion: "Limpieza facial con terapia LED para regenerar, calmar y revitalizar la piel en profundidad.",
    descripcionLarga: "La Higiene + LED es un tratamiento innovador que combina limpieza facial profunda con fototerapia LED. Esta tecnología de luz estimula la regeneración celular, calma la inflamación y revitaliza la piel, proporcionando resultados visibles desde la primera sesión.",
    pasos: [
      "Limpieza y preparación facial completa",
      "Extracción si es necesaria",
      "Aplicación de mascarilla específica",
      "Sesión de fototerapia LED (15-20 minutos)",
      "Retirada de mascarilla",
      "Hidratación y protección final"
    ],
    beneficios: [
      "Regeneración celular acelerada",
      "Efecto antiinflamatorio",
      "Estimulación del colágeno",
      "Mejora de la textura cutánea",
      "Luminosidad y vitalidad aumentada"
    ],
    imagen: purezaCompletaSvg,
    alt: "Higiene facial con terapia LED"
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