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

// Datos de tratamientos faciales actualizados según información proporcionada
const tratamientosFaciales: TratamientoFacial[] = [
  {
    id: 1,
    nombre: "Limpieza de Cutis Simple",
    precio: "30€",
    duracion: "30 min",
    frecuencia: "Cada 15 días",
    descripcion: "Limpieza básica que desmaquilla, limpia y tonifica la piel dejándola fresca y renovada.",
    pasos: [
      "Desmaquillado completo del rostro",
      "Limpieza profunda de la piel",
      "Tonificación para equilibrar el pH cutáneo",
      "Hidratación final según tipo de piel"
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
    pasos: [
      "Limpieza previa de la piel",
      "Aplicación de exfoliante específico",
      "Masaje circular para eliminar células muertas",
      "Retirada del producto con agua tibia",
      "Tonificación e hidratación final"
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
    pasos: [
      "Desmaquillado y limpieza inicial",
      "Vaporización para abrir los poros",
      "Extracción manual de comedones",
      "Aplicación de tónico desinfectante",
      "Mascarilla calmante",
      "Hidratación final personalizada"
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
    pasos: [
      "Limpieza y preparación de la piel",
      "Aplicación de peeling químico específico",
      "Tiempo de actuación controlado",
      "Neutralización del peeling",
      "Mascarilla calmante post-peeling",
      "Protección solar obligatoria"
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
    pasos: [
      "Limpieza profunda inicial",
      "Preparación de la piel para radiofrecuencia",
      "Aplicación de gel conductor",
      "Tratamiento con radiofrecuencia en zonas específicas",
      "Mascarilla tensor post-tratamiento",
      "Hidratación y protección final"
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
    pasos: [
      "Limpieza y preparación facial completa",
      "Extracción si es necesaria",
      "Aplicación de mascarilla específica",
      "Sesión de fototerapia LED (15-20 minutos)",
      "Retirada de mascarilla",
      "Hidratación y protección final"
    ],
    imagen: purezaCompletaSvg,
    alt: "Higiene facial con terapia LED"
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