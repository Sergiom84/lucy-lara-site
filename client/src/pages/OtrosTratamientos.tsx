import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { ArrowLeft, Clock, Euro, Info, Eye, Droplets, Zap } from "lucide-react";
import { Link } from "wouter";
import Header from "../components/Header";
import Footer from "../components/Footer";
import hidrolinfaImg from "@assets/Hidrolinfa_1750680637700.png";
import acupunturaImg from "@assets/Acupuntura_1750680637702.png";

interface OtroTratamiento {
  id: number;
  nombre: string;
  precios: { [key: string]: string };
  duracion: string;
  frecuencia: string;
  descripcion: string;
  descripcionLarga: string;
  beneficios: string[];
  caracteristicas: string[];
  imagen: string;
  alt: string;
  icono: React.ReactNode;
}

const otrosTratamientos: OtroTratamiento[] = [
  {
    id: 1,
    nombre: "Lifting y Tinte de Pestañas",
    precios: {
      "Lifting + tinte pestañas": "50€",
      "Lifting": "45€",
      "Tinte pestañas": "15€",
      "Tinte cejas": "15€"
    },
    duracion: "60-90 min",
    frecuencia: "Cada 6 a 8 semanas",
    descripcion: "Realza tu mirada con unas pestañas curvadas, intensas y naturales.",
    descripcionLarga: "Si quieres unas pestañas más largas, curvadas y con un color intenso sin necesidad de extensiones ni máscara, el lifting y tinte de pestañas es la solución perfecta. Este tratamiento eleva y riza tus pestañas desde la raíz, creando un efecto de mayor longitud y volumen natural. El tinte intensifica la mirada sin maquillaje.",
    beneficios: [
      "Efecto de pestañas más largas, curvadas y con volumen natural",
      "Resalta la mirada sin necesidad de máscara",
      "Duración aproximada de 6 a 8 semanas",
      "Ideal para casi cualquier tipo de pestaña",
      "Tratamiento rápido, indoloro y sin mantenimiento diario"
    ],
    caracteristicas: [
      "Técnica profesional de lifting con productos seguros",
      "Tinte de alta calidad que no daña las pestañas",
      "Resultado natural y duradero",
      "Proceso cómodo y relajante"
    ],
    imagen: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    alt: "Lifting y tinte de pestañas profesional",
    icono: <Eye className="w-8 h-8" />
  },
  {
    id: 2,
    nombre: "Equilibra, depura y revitaliza desde dentro - Hidrolinfa",
    precios: {
      "1 sesión": "20€",
      "8 sesiones": "125€"
    },
    duracion: "45 min",
    frecuencia: "1-2 veces por semana o programas de 8 sesiones",
    descripcion: "Elimina toxinas por los pies con tecnología de ionización. Ayuda a depurar el organismo y equilibrar energía.",
    descripcionLarga: "La hidrolinfa es un tratamiento de desintoxicación que utiliza tecnología de ionización a través de los pies para ayudar a eliminar toxinas y metales pesados del organismo. Este proceso mejora la circulación, reduce la retención de líquidos y aumenta la energía y bienestar general, potenciando los efectos de otros tratamientos.",
    beneficios: [
      "Elimina toxinas y metales pesados",
      "Mejora la circulación y sensación en piernas cansadas",
      "Reduce retención de líquidos",
      "Aumenta energía y bienestar general",
      "Potencia efectos de otros tratamientos"
    ],
    caracteristicas: [
      "Tecnología de ionización avanzada",
      "Tratamiento completamente natural",
      "Sin efectos secundarios",
      "Resultados progresivos y acumulativos"
    ],
    imagen: hidrolinfaImg,
    alt: "Tratamiento de hidrolinfa - desintoxicación",
    icono: <Droplets className="w-8 h-8" />
  },
  {
    id: 3,
    nombre: "Acupuntura",
    precios: {
      "Sesión": "40,00€"
    },
    duracion: "60 min",
    frecuencia: "Sesiones regulares personalizadas",
    descripcion: "Equilibra tu cuerpo, alivia el dolor y mejora tu bienestar.",
    descripcionLarga: "La acupuntura es una técnica milenaria que equilibra el cuerpo, alivia el dolor y mejora el bienestar general. Mediante la inserción de agujas muy finas en puntos específicos, se estimula la capacidad natural del cuerpo para sanarse, reduciendo el estrés, mejorando la circulación y favoreciendo el equilibrio nervioso y hormonal.",
    beneficios: [
      "Alivia dolores musculares, articulares y tensionales",
      "Reduce estrés, ansiedad y mejora el sueño",
      "Mejora circulación y sistema inmunológico",
      "Ayuda en migrañas, digestión y fatiga crónica",
      "Favorece el equilibrio nervioso y hormonal"
    ],
    caracteristicas: [
      "Tratamiento 100% personalizado según necesidades del paciente",
      "Técnica tradicional china con enfoque moderno",
      "Agujas estériles de un solo uso",
      "Profesional certificado en acupuntura"
    ],
    imagen: acupunturaImg,
    alt: "Tratamiento de acupuntura profesional",
    icono: <Zap className="w-8 h-8" />
  }
];

const OtrosTratamientos = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } }
  };

  return (
    <div className="font-inter text-textDark bg-neutral min-h-screen">
      <Helmet>
        <title>Otros Tratamientos - Centro de Estética Lucy Lara</title>
        <meta name="description" content="Tratamientos especializados: lifting de pestañas, hidrolinfa para desintoxicación y acupuntura terapéutica. Servicios personalizados para tu bienestar integral." />
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
              Otros Tratamientos
            </h1>
            <p className="text-textLight max-w-3xl mx-auto text-lg">
              Descubre nuestra gama completa de tratamientos especializados para satisfacer todas tus necesidades de belleza y bienestar.
            </p>
          </motion.div>

          {/* Tratamientos */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {otrosTratamientos.map((tratamiento, index) => (
              <motion.div 
                key={tratamiento.id}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="lg:flex">
                  {/* Imagen */}
                  <motion.div 
                    className="lg:w-1/2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={tratamiento.imagen}
                      alt={tratamiento.alt}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                  </motion.div>
                  
                  {/* Contenido */}
                  <div className="lg:w-1/2 p-8 lg:p-12">
                    {/* Header del tratamiento */}
                    <div className="flex items-center mb-6">
                      <div className="bg-accent/10 p-3 rounded-full mr-4 text-accent">
                        {tratamiento.icono}
                      </div>
                      <div>
                        <h2 className="font-playfair text-2xl lg:text-3xl font-semibold text-accent">
                          {tratamiento.nombre}
                        </h2>
                        <div className="flex items-center mt-2 text-textDark">
                          <Clock size={16} className="text-accent mr-2" />
                          <span className="text-sm">{tratamiento.duracion}</span>
                          <span className="mx-2">•</span>
                          <span className="text-sm">{tratamiento.frecuencia}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Precios */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-4 flex items-center text-accent">
                        <Euro size={20} className="mr-2" />
                        Precios
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Object.entries(tratamiento.precios).map(([servicio, precio]) => (
                          <div key={servicio} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium">{servicio}</span>
                            <span className="text-sm font-semibold text-accent">{precio}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Descripción */}
                    <p className="text-textLight mb-6 leading-relaxed">
                      {tratamiento.descripcionLarga}
                    </p>
                    
                    {/* Beneficios */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-4 flex items-center text-accent">
                        <Info size={20} className="mr-2" />
                        Beneficios
                      </h3>
                      <ul className="space-y-2">
                        {tratamiento.beneficios.map((beneficio, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-textLight text-sm leading-relaxed">{beneficio}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Características */}
                    <div>
                      <h4 className="font-medium mb-3 text-textDark">Características del tratamiento:</h4>
                      <ul className="space-y-2">
                        {tratamiento.caracteristicas.map((caracteristica, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-1.5 h-1.5 bg-accent/60 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-textLight text-sm leading-relaxed">{caracteristica}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Información adicional */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg p-8 mt-12"
          >
            <h3 className="font-playfair text-2xl font-semibold mb-6 text-center text-accent">
              Tratamientos personalizados para tu bienestar
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-accent/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-semibold mb-2">Belleza natural</h4>
                <p className="text-textLight text-sm">Realza tus rasgos naturales sin artificialidad</p>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Droplets className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-semibold mb-2">Desintoxicación</h4>
                <p className="text-textLight text-sm">Elimina toxinas y revitaliza tu organismo</p>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-semibold mb-2">Equilibrio integral</h4>
                <p className="text-textLight text-sm">Armoniza cuerpo y mente naturalmente</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OtrosTratamientos;