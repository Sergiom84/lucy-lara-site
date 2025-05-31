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

// Datos de tratamientos faciales basados en la información proporcionada
const tratamientosFaciales: TratamientoFacial[] = [
  {
    id: 1,
    nombre: "Renovación Profunda",
    precio: "61€",
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
    alt: "Tratamiento facial de renovación profunda"
  },
  {
    id: 2,
    nombre: "Renovación de Cristal",
    precio: "71€",
    duracion: "70 min",
    frecuencia: "1 vez al mes",
    descripcion: "Higiene facial completa con microdermoabrasión que hidrata, pule y oxigena.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Extracción de comedones para una oxigenación y limpieza de la piel",
      "Microdermoabrasión que exfolia en profundidad, suaviza la textura de la piel y aporta luminosidad",
      "Elimina las células muertas e imperfecciones",
      "Masaje relajante junto con una mascarilla acorde de las necesidades de la piel",
      "Acabamos el tratamiento con una crema finalizadora"
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
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Exfoliación mecánica",
      "Extracción de comedones para una oxigenación y limpieza de la piel",
      "Finalizamos el tratamiento con las gafas de presoterapia",
      "Reducen bolsas, ojeras y fatiga ocular, dejando la mirada más luminosa y descansada"
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
    pasos: [
      "El tratamiento va acompañado de presoterapia en piernas",
      "Activa la circulación, reduce la retención de líquidos",
      "Proporciona una sensación de ligereza y bienestar integral",
      "La higiene consta de limpieza de la piel junto con su tonificación",
      "Exfoliación mecánica, extracción de comedones",
      "Masaje relajante junto con una mascarilla acorde de las necesidades de la piel",
      "Acabamos el tratamiento con una crema finalizadora"
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
    pasos: [
      "El ritual esencial para limpiar y revitalizar la piel sin extracción",
      "Incluye limpieza profunda, tonificación",
      "Exfoliación mecánica, aplicación de ampolla hidratante",
      "Masaje relajante, mascarilla adaptada a tu piel",
      "Crema final para una hidratación duradera",
      "Tratamiento para pieles que no necesiten una limpieza en profundidad"
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
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Exfoliación mecánica, extracción de comedones para una oxigenación y limpieza de la piel",
      "Realizando la higiene comenzaremos con el tratamiento de fotoestimulación Led",
      "Activa la regeneración celular, mejora la hidratación",
      "Aporta un efecto calmante, dejando la piel revitalizada y luminosa",
      "Masaje relajante junto con una mascarilla acorde de las necesidades de la piel",
      "Acabamos el tratamiento con una crema finalizadora"
    ],
    imagen: purezaCompletaSvg,
    alt: "Tratamiento facial pureza y frescura completa con Led"
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
              <motion.div 
                key={tratamiento.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
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
                    <div className="flex gap-2">
                      <Link 
                        href={`/tratamiento-facial/${tratamiento.id}`}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition-colors font-medium text-sm"
                      >
                        Ver detalles
                      </Link>
                      <button className="bg-accent hover:bg-accentDark text-white px-4 py-2 rounded-full transition-colors font-medium text-sm">
                        Reservar
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
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