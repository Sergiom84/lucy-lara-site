import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { ArrowLeft, Clock, Euro, Info } from "lucide-react";
import { Link } from "wouter";
import Header from "../components/Header";
import Footer from "../components/Footer";
import micropigmentacionImg from "../assets/images/Micropigmentación_Alex.jpg";
import micropigmentacion2Img from "../assets/images/Micropigmentación2.jpg";
import micropigmentacionTamaraImg from "../assets/images/Micropigmentación_Tamara3.jpg";

interface TratamientoMicropigmentacion {
  id: number;
  nombre: string;
  precios: {
    cejas: string;
    lineaOjosSuperior: string;
    lineaOjosInferior: string;
    labiosCompletos: string;
  };
  duracion: string;
  descripcion: string;
  beneficios: string[];
  tecnicas: string[];
  imagen: string;
  alt: string;
}

const tratamientoMicropigmentacion: TratamientoMicropigmentacion = {
  id: 1,
  nombre: "Belleza y definición duradera - micropigmentación",
  precios: {
    cejas: "350€",
    lineaOjosSuperior: "280€", 
    lineaOjosInferior: "350€",
    labiosCompletos: "360€"
  },
  duracion: "Según necesidad (tratamiento semipermanente)",
  descripcion: "Realza tu belleza natural con un acabado perfecto y duradero. Micropigmentación ideal para cejas, mirada intensa, labios rejuvenecidos o reconstrucción estética de areolas.",
  beneficios: [
    "Cejas: corrección forma, volumen, definición pelo a pelo o sombreado",
    "Eyeliner: delineado fino, clásico o difuminado",
    "Labios: perfilado natural o con volumen",
    "Areolas: restauración post cirugía o mastectomía"
  ],
  tecnicas: [
    "Técnica avanzada por especialista",
    "Resultados progresivos y personalizados en cada sesión",
    "Acabado perfecto y duradero",
    "Realza tu belleza natural"
  ],
  imagen: micropigmentacionImg,
  alt: "Micropigmentación profesional en Centro de Estética Lucy Lara"
};

const Micropigmentacion = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
  };

  return (
    <div className="font-inter text-textDark bg-neutral min-h-screen">
      <Helmet>
        <title>Micropigmentación - Centro de Estética Lucy Lara</title>
        <meta name="description" content="Micropigmentación profesional para cejas, ojos y labios. Técnica avanzada con resultados naturales y duraderos. Especialistas en belleza semipermanente." />
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
              Micropigmentación
            </h1>
            <p className="text-textLight max-w-3xl mx-auto text-lg">
              Realza tu belleza natural con nuestros tratamientos de micropigmentación profesional. Técnicas avanzadas para resultados perfectos y duraderos.
            </p>
          </motion.div>

          {/* Contenido principal */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto"
          >
            {/* Card principal del tratamiento */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12"
            >
              <div className="lg:flex">
                {/* Imagen */}
                <motion.div 
                  variants={imageVariants}
                  className="lg:w-1/2"
                >
                  <img 
                    src={tratamientoMicropigmentacion.imagen}
                    alt={tratamientoMicropigmentacion.alt}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                </motion.div>
                
                {/* Contenido */}
                <div className="lg:w-1/2 p-8 lg:p-12">
                  <h2 className="font-playfair text-3xl font-semibold mb-6 text-accent">
                    {tratamientoMicropigmentacion.nombre}
                  </h2>
                  
                  <p className="text-textLight mb-6 leading-relaxed">
                    {tratamientoMicropigmentacion.descripcion}
                  </p>
                  
                  {/* Información de duración */}
                  <div className="flex items-center mb-6 text-textDark">
                    <Clock size={20} className="text-accent mr-3" />
                    <span className="font-medium">{tratamientoMicropigmentacion.duracion}</span>
                  </div>

                  {/* Precios */}
                  <div className="mb-8">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <Euro size={20} className="text-accent mr-2" />
                      Precios por tratamiento
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span>Cejas</span>
                        <span className="font-semibold text-accent">{tratamientoMicropigmentacion.precios.cejas}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span>Línea ojos superior</span>
                        <span className="font-semibold text-accent">{tratamientoMicropigmentacion.precios.lineaOjosSuperior}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span>Línea ojos inferior</span>
                        <span className="font-semibold text-accent">{tratamientoMicropigmentacion.precios.lineaOjosInferior}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span>Labios completos</span>
                        <span className="font-semibold text-accent">{tratamientoMicropigmentacion.precios.labiosCompletos}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Secciones de información */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Beneficios */}
              <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h3 className="font-playfair text-2xl font-semibold mb-6 text-accent flex items-center">
                  <Info size={24} className="mr-3" />
                  Beneficios específicos
                </h3>
                <ul className="space-y-4">
                  {tratamientoMicropigmentacion.beneficios.map((beneficio, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-textLight leading-relaxed">{beneficio}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Técnicas */}
              <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h3 className="font-playfair text-2xl font-semibold mb-6 text-accent">
                  Nuestra técnica
                </h3>
                <ul className="space-y-4">
                  {tratamientoMicropigmentacion.tecnicas.map((tecnica, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-textLight leading-relaxed">{tecnica}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Galería de imágenes */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg p-8 mb-12"
            >
              <h3 className="font-playfair text-2xl font-semibold mb-8 text-center text-accent">
                Galería de resultados
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="rounded-lg overflow-hidden shadow-md"
                >
                  <img 
                    src={micropigmentacionImg}
                    alt="Micropigmentación de cejas"
                    className="w-full h-48 object-cover"
                  />
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="rounded-lg overflow-hidden shadow-md"
                >
                  <img 
                    src={micropigmentacion2Img}
                    alt="Micropigmentación de labios"
                    className="w-full h-48 object-cover"
                  />
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="rounded-lg overflow-hidden shadow-md"
                >
                  <img 
                    src={micropigmentacionTamaraImg}
                    alt="Micropigmentación profesional"
                    className="w-full h-48 object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Call to action */}
            <motion.div 
              variants={itemVariants}
              className="text-center bg-gradient-to-r from-accent to-accentDark rounded-xl p-8 text-white"
            >
              <h3 className="font-playfair text-2xl font-semibold mb-4">
                ¿Lista para realzar tu belleza natural?
              </h3>
              <p className="mb-6 text-white/90">
                Contacta con nosotros para una consulta personalizada y descubre cómo la micropigmentación puede transformar tu look.
              </p>
              <a 
                href="https://wa.me/34123456789" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white text-accent px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Reservar consulta
              </a>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Micropigmentacion;