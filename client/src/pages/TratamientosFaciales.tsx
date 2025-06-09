import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
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
  pasos: string[];
  imagen: string;
  alt: string;
}

// Datos de tratamientos faciales actualizados según información del Excel
const tratamientosFaciales: TratamientoFacial[] = [
  {
    id: 1,
    nombre: "Renovación profunda - higiene facial completa",
    precio: "61,00€",
    duracion: "60 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento de limpieza profunda que hidrata, revitaliza y equilibra la piel.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Exfoliación mecánica",
      "Extracción de comedones para una oxigenación y limpieza de la piel",
      "Masaje relajante junto con una mascarilla acorde de las necesidades de la piel",
      "Acabamos el tratamiento con una crema finalizadora"
    ],
    imagen: renovacionProfundaSvg,
    alt: "Renovación profunda - higiene facial completa"
  },
  {
    id: 2,
    nombre: "Renovación de cristal - higiene facial completa con microdermoabrasión",
    precio: "71,00€",
    duracion: "70 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento de limpieza profunda que hidrata, pule y oxigena.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Extracción de comedones para una oxigenación y limpieza de la piel",
      "Microdermoabrasión que exfolia en profundidad",
      "Masaje relajante junto con una mascarilla",
      "Acabamos el tratamiento con una crema finalizadora"
    ],
    imagen: renovacionCristalSvg,
    alt: "Renovación de cristal con microdermoabrasión"
  },
  {
    id: 3,
    nombre: "Descanso y vitalidad - higiene facial completa con presoterapia ocular",
    precio: "71,00€",
    duracion: "70 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento de limpieza profunda que hidrata, revitaliza y equilibra la piel.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Exfoliación mecánica",
      "Extracción de comedones",
      "Gafas de presoterapia que reducen bolsas, ojeras y fatiga ocular"
    ],
    imagen: descansoVitalidadSvg,
    alt: "Descanso y vitalidad con presoterapia ocular"
  },
  {
    id: 4,
    nombre: "Equilibrio total - higiene facial con presoterapia",
    precio: "79€",
    duracion: "80 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento de limpieza profunda que hidrata, revitaliza la cara y el cuerpo.",
    pasos: [
      "Presoterapia en piernas que activa la circulación",
      "Higiene facial completa",
      "Masaje relajante con mascarilla",
      "Acabamos con crema finalizadora"
    ],
    imagen: equilibrioTotalSvg,
    alt: "Equilibrio total con presoterapia"
  },
  {
    id: 5,
    nombre: "Pureza y frescura - higiene facial",
    precio: "55€",
    duracion: "45 min",
    frecuencia: "Según necesidad",
    descripcion: "Higiene facial básica, hidratante y revitalizante.",
    pasos: [
      "Limpieza profunda, tonificación",
      "Exfoliación mecánica",
      "Masaje relajante, mascarilla adaptada",
      "Crema final para hidratación duradera"
    ],
    imagen: purezaBasicaSvg,
    alt: "Pureza y frescura - higiene facial"
  },
  {
    id: 6,
    nombre: "Pureza y frescura - higiene facial",
    precio: "89€",
    duracion: "75 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento de limpieza profunda que hidrata, revitaliza y equilibra la piel.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Exfoliación mecánica",
      "Tratamiento de fotoestimulación Led",
      "Masaje relajante con mascarilla personalizada"
    ],
    imagen: purezaCompletaSvg,
    alt: "Pureza y frescura con LED"
  },
  {
    id: 7,
    nombre: "Brisa de seda - higiene facial suave",
    precio: "55,00€",
    duracion: "45 min",
    frecuencia: "1 vez al mes",
    descripcion: "Una limpieza delicada diseñada para pieles sensibles y reactivas.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Peeling enzimático",
      "Masaje relajante con mascarilla calmante",
      "Crema refrescante y reparadora"
    ],
    imagen: purezaBasicaSvg,
    alt: "Brisa de seda - higiene facial suave"
  },
  {
    id: 8,
    nombre: "Calma profunda - higiene facial completa",
    precio: "61,00€",
    duracion: "60 min",
    frecuencia: "1 vez al mes",
    descripcion: "Un tratamiento de limpieza profunda adaptado a pieles sensibles.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Peeling enzimático",
      "Extracción cuidadosa para liberar los poros",
      "Crema refrescante que calma y reduce rojeces"
    ],
    imagen: descansoVitalidadSvg,
    alt: "Calma profunda - higiene facial completa"
  },
  {
    id: 9,
    nombre: "Ritual serenidad - hig. facial + fotobioestimulación + cuidado específico",
    precio: "89,00€",
    duracion: "75 min",
    frecuencia: "1 vez al mes",
    descripcion: "Una combinación perfecta para pieles sensibles que necesitan un tratamiento global.",
    pasos: [
      "Higiene facial suave sin agresión",
      "Cosmética especializada en calmar la piel",
      "Fotobioestimulación Led",
      "Refuerza la barrera protectora de la piel"
    ],
    imagen: purezaCompletaSvg,
    alt: "Ritual serenidad con fotobioestimulación"
  },
  {
    id: 10,
    nombre: "Luz calmante - fotobioestimulación para la piel sensible",
    precio: "89,00€",
    duracion: "60 min",
    frecuencia: "1 vez en semana",
    descripcion: "La fotobioestimulación trabaja en profundidad para regenerar y calmar la piel.",
    pasos: [
      "Preparación específica para piel sensible",
      "Aplicación de fotobioestimulación Led",
      "Trabaja en profundidad para regenerar",
      "Efecto antiinflamatorio y reparador"
    ],
    imagen: purezaCompletaSvg,
    alt: "Luz calmante - fotobioestimulación"
  },
  {
    id: 11,
    nombre: "Pureza equilibrante - higiene facial suave",
    precio: "55,00€",
    duracion: "45 min",
    frecuencia: "1 vez al mes",
    descripcion: "Limpieza profunda sin extracción para pieles grasas y mixtas.",
    pasos: [
      "Limpieza profunda específica para pieles grasas",
      "Línea reguladora del exceso de grasa",
      "Afinamiento del poro",
      "Equilibrio sin sensación de tirantez"
    ],
    imagen: equilibrioTotalSvg,
    alt: "Pureza equilibrante - higiene facial suave"
  },
  {
    id: 12,
    nombre: "Equilibrio puro - tratamiento cosmético regulador",
    precio: "65,00€",
    duracion: "60 min",
    frecuencia: "1 vez por semana",
    descripcion: "Tratamiento sin aparatología que trabaja únicamente con la línea Dermo controle.",
    pasos: [
      "Aplicación de la línea Dermo controle",
      "Regulación de la producción de sebo",
      "Minimización de los poros",
      "Matificación sin deshidratación"
    ],
    imagen: equilibrioTotalSvg,
    alt: "Equilibrio puro - tratamiento cosmético"
  },
  {
    id: 13,
    nombre: "Luz antiacne - tratamiento intensivo bioestimulación",
    precio: "79,00€",
    duracion: "60 min",
    frecuencia: "1 vez por semana",
    descripcion: "Tratamiento enfocado en pieles con acné inflamatorio o brotes recurrentes.",
    pasos: [
      "Preparación específica para piel con acné",
      "Fotobioestimulación en múltiples sesiones",
      "Reducción de la inflamación",
      "Prevención de nuevas imperfecciones"
    ],
    imagen: purezaCompletaSvg,
    alt: "Luz antiacne - bioestimulación"
  },
  {
    id: 14,
    nombre: "Renovación profunda - higiene facial completa",
    precio: "61,00€",
    duracion: "60 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento completo de limpieza profunda con extracción de impurezas.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Extracción de comedones",
      "Mascarilla astringente y purificante",
      "Acabamos con crema refrescante"
    ],
    imagen: renovacionProfundaSvg,
    alt: "Renovación profunda - higiene facial completa"
  },
  {
    id: 15,
    nombre: "Stop acné - higiene facial completa + fotobioestimulación",
    precio: "89,00€",
    duracion: "75 min",
    frecuencia: "1 vez en semana",
    descripcion: "Higiene facial con extracción potenciada con fotobioestimulación.",
    pasos: [
      "Higiene facial completa con extracción",
      "Aplicación de fotobioestimulación específica",
      "Reducción de inflamaciones",
      "Cicatrización de marcas de acné"
    ],
    imagen: purezaCompletaSvg,
    alt: "Stop acné con fotobioestimulación"
  },
  {
    id: 16,
    nombre: "Luz pura - hig. facial completa + microdermoabrasión + cosmética antimanchas",
    precio: "71,00€",
    duracion: "70 min",
    frecuencia: "1 vez al mes",
    descripcion: "Recupera la claridad y uniformidad de tu piel con esta higiene diseñada para combatir las manchas.",
    pasos: [
      "Exfolia, renueva y unifica",
      "Microdermoabrasión con punta de diamante",
      "Aplicación de activos despigmentantes",
      "Mejora de la luminosidad"
    ],
    imagen: renovacionCristalSvg,
    alt: "Luz pura - microdermoabrasión antimanchas"
  },
  {
    id: 17,
    nombre: "Luz renovada - Fotorejuvenecimiento antimanchas",
    precio: "89,00€",
    duracion: "60 min",
    frecuencia: "1 sesión cada 2 semanas (mínimo 6 sesiones)",
    descripcion: "Gracias a la tecnología de luz pulsada intensa (IPL), este tratamiento actúa directamente sobre la hiperpigmentación.",
    pasos: [
      "Aplicación de tecnología IPL",
      "Actuación directa sobre hiperpigmentación",
      "Estimulación de la producción de colágeno",
      "Unificación del tono"
    ],
    imagen: purezaCompletaSvg,
    alt: "Luz renovada - fotorejuvenecimiento IPL"
  },
  {
    id: 18,
    nombre: "Skin glow - dermapen antimanchas",
    precio: "99,00€",
    duracion: "75 min",
    frecuencia: "Cada 2 semanas",
    descripcion: "Tratamiento para pieles con hiperpigmentación, este tratamiento combina dermapen con activos despigmentantes.",
    pasos: [
      "Evaluación del tipo de piel",
      "Aplicación de dermapen con activos despigmentantes",
      "Tratamiento adaptado y personalizado",
      "Unificación del tono de la piel"
    ],
    imagen: renovacionCristalSvg,
    alt: "Skin glow - dermapen antimanchas"
  },
  {
    id: 19,
    nombre: "Luz perfecta - Tratamiento facial cosmético despigmentante",
    precio: "65,00€",
    duracion: "60 min",
    frecuencia: "1 sesión semanal durante el primer mes, luego 1 cada 15 días",
    descripcion: "Este tratamiento es la opción perfecta para quienes buscan atenuar el tono desigual y devolver la vitalidad a su rostro sin recurrir a aparatología.",
    pasos: [
      "Limpieza con emulsión específica",
      "Peeling enzimático con ácidos despigmentantes",
      "Masaje con cóctel despigmentante",
      "Crema + protector solar SPF 50"
    ],
    imagen: equilibrioTotalSvg,
    alt: "Luz perfecta - tratamiento despigmentante"
  },
  {
    id: 20,
    nombre: "Flash de juventud - Fotorejuvenecimiento",
    precio: "89,00€",
    duracion: "60 min",
    frecuencia: "1 vez cada 15 días",
    descripcion: "Fotorejuvenecimiento facial para una piel radiante. Utiliza la última tecnología en fotorejuvenecimiento para estimular la producción de colágeno, reducir arrugas y mejorar la elasticidad de la piel.",
    pasos: [
      "Evaluación personalizada de la piel",
      "Aplicación de tecnología de fotorejuvenecimiento",
      "Estimulación de la producción de colágeno",
      "Protocolo 100% personalizado"
    ],
    imagen: purezaCompletaSvg,
    alt: "Flash de juventud - fotorejuvenecimiento"
  },
  {
    id: 21,
    nombre: "Higiene Facial Suprema",
    precio: "55,00€",
    duracion: "45 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento de limpieza profunda sin extracción, diseñado para pieles que han perdido su luz.",
    pasos: [
      "Limpieza profunda sin extracción",
      "Aplicación de enzimas renovadoras",
      "Cócteles revitalizantes",
      "Masaje lifting"
    ],
    imagen: purezaBasicaSvg,
    alt: "Higiene Facial Suprema"
  },
  {
    id: 22,
    nombre: "Eterna Juventud 2 en 1",
    precio: "89,00€",
    duracion: "75 min",
    frecuencia: "1 sesión personalizada",
    descripcion: "Higiene facial + rejuvenecimiento en un solo tratamiento.",
    pasos: [
      "Higiene facial completa con extracción",
      "Aplicación de activos de alta concentración",
      "Tecnología avanzada para reafirmar",
      "Efecto flash inmediato"
    ],
    imagen: purezaCompletaSvg,
    alt: "Eterna Juventud 2 en 1"
  },
  {
    id: 23,
    nombre: "Ice skin - crioterapia facial",
    precio: "89,00€",
    duracion: "60 min",
    frecuencia: "1 sesión semanal",
    descripcion: "Tratamiento de crioterapia facial para desinflamar, tonificar y redefinir la piel.",
    pasos: [
      "Preparación de la piel",
      "Aplicación de crioterapia facial",
      "Desinflamación y tonificación",
      "Efecto tensor inmediato"
    ],
    imagen: descansoVitalidadSvg,
    alt: "Ice skin - crioterapia facial"
  },
  {
    id: 24,
    nombre: "Lifting Lumínico",
    precio: "89,00€",
    duracion: "60 min",
    frecuencia: "1 o 2 sesiones a la semana",
    descripcion: "Fotobioestimulación para un efecto lifting inmediato.",
    pasos: [
      "Evaluación del tipo de piel",
      "Aplicación de luz LED de alta intensidad",
      "Reafirmación de la piel",
      "Redefinición del óvalo facial"
    ],
    imagen: purezaCompletaSvg,
    alt: "Lifting Lumínico"
  },
  {
    id: 25,
    nombre: "Oxigenación profunda - higiene facial completa con extracción",
    precio: "61,00€",
    duracion: "60 min",
    frecuencia: "1 sesión al mes",
    descripcion: "Limpieza y oxigenación para pieles maduras.",
    pasos: [
      "Limpieza profunda de la piel",
      "Extracción de impurezas",
      "Oxigenación celular",
      "Estimulación de la regeneración celular"
    ],
    imagen: renovacionProfundaSvg,
    alt: "Oxigenación profunda"
  },
  {
    id: 26,
    nombre: "La cápsula del tiempo",
    precio: "89,00€",
    duracion: "75 min",
    frecuencia: "Tratamiento personalizado",
    descripcion: "Tratamiento que fusiona aparatología, activos de alto rendimiento y masajes específicos para regeneración, reafirmación y rejuvenecimiento.",
    pasos: [
      "Evaluación personalizada",
      "Fusión de aparatología avanzada",
      "Aplicación de activos de alto rendimiento",
      "Regeneración, reafirmación y rejuvenecimiento"
    ],
    imagen: purezaCompletaSvg,
    alt: "La cápsula del tiempo"
  },
  {
    id: 27,
    nombre: "Revitalización profunda con dermapen",
    precio: "99,00€",
    duracion: "75 min",
    frecuencia: "Según necesidad",
    descripcion: "Microneedling con Dermapen para potenciar la absorción de activos rejuvenecedores, estimular colágeno y elastina.",
    pasos: [
      "Preparación de la piel",
      "Microneedling con Dermapen",
      "Potenciación de la absorción de activos",
      "Estimulación de colágeno y elastina"
    ],
    imagen: renovacionCristalSvg,
    alt: "Revitalización profunda con dermapen"
  }
];

const TratamientosFaciales = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="font-inter text-textDark bg-neutral min-h-screen">
      <Helmet>
        <title>Tratamientos Faciales - Centro de Estética Lucy Lara</title>
        <meta name="description" content="Descubre nuestra amplia gama de tratamientos faciales profesionales. Desde higiene facial básica hasta tratamientos avanzados con microdermoabrasión y presoterapia." />
      </Helmet>
      
      <Header />
      
      <main className="pt-32 pb-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Navegación de regreso */}
          <Link 
            href="/#promociones" 
            className="inline-flex items-center text-accent hover:text-accentDark mb-8 transition-colors"
            onClick={(e) => {
              window.location.href = "/#promociones";
              e.preventDefault();
            }}
          >
            <ArrowLeft size={16} className="mr-2" />
            Volver a servicios
          </Link>
          
          {/* Header de la página */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-playfair text-4xl md:text-5xl font-semibold mb-6">
              Tratamientos Faciales
            </h1>
            <p className="text-textLight max-w-3xl mx-auto text-lg">
              Rejuvenece tu piel con nuestros tratamientos personalizados que combinan técnicas avanzadas y productos naturales para lograr los mejores resultados.
            </p>
          </motion.div>
          
          {/* Grid de tratamientos */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {tratamientosFaciales.map((tratamiento) => (
              <Link key={tratamiento.id} href={`/tratamiento-facial/${tratamiento.id}`}>
                <motion.div 
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                >
                  {/* Imagen del tratamiento */}
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={tratamiento.imagen} 
                      alt={tratamiento.alt} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Contenido de la tarjeta */}
                  <div className="p-6">
                    <h3 className="font-playfair text-xl font-semibold mb-2">
                      {tratamiento.nombre}
                    </h3>
                    
                    <div className="flex items-center gap-4 mb-3 text-sm text-textLight">
                      {tratamiento.duracion && (
                        <span>{tratamiento.duracion}</span>
                      )}
                      <span>•</span>
                      <span>{tratamiento.frecuencia}</span>
                    </div>
                    
                    <p className="text-textLight mb-4 text-sm">
                      {tratamiento.descripcion}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-semibold text-accent">
                        {tratamiento.precio}
                      </span>
                      <span className="text-accent text-sm font-medium">
                        Ver detalles →
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
          
          {/* Información adicional */}
          <motion.div 
            className="mt-16 bg-white rounded-xl p-8 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="font-playfair text-2xl font-semibold mb-4 text-center">
              ¿Por qué elegir nuestros tratamientos faciales?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="font-semibold mb-2">Profesionales Cualificados</h3>
                <p className="text-textLight text-sm">
                  Nuestro equipo está altamente capacitado en las últimas técnicas de estética facial.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Productos de Calidad</h3>
                <p className="text-textLight text-sm">
                  Utilizamos productos premium adaptados a cada tipo de piel y necesidad específica.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Resultados Visibles</h3>
                <p className="text-textLight text-sm">
                  Tratamientos personalizados que garantizan resultados efectivos y duraderos.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TratamientosFaciales;