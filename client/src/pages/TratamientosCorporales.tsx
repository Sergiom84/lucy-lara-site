import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { ArrowLeft, Clock, Euro, Info, Heart, Hand } from "lucide-react";
import { Link } from "wouter";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Booking from "../components/Booking";
import manosQueSananImg from "@assets/Manos que sanan_1750678840064.png";

interface TratamientoCorporal {
  id: number;
  nombre: string;
  precio: string;
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

const tratamientosCorporales: TratamientoCorporal[] = [
  {
    id: 1,
    nombre: "Un Respiro para tu Cuerpo y Mente - masaje relajante",
    precio: "60,00€",
    duracion: "60 min",
    frecuencia: "Según necesidad o sesiones regulares",
    descripcion: "El masaje relajante es la pausa perfecta para desconectar del estrés y la rutina.",
    descripcionLarga: "El masaje relajante es la pausa perfecta para desconectar del estrés y la rutina. Libera tensiones, alivia fatiga muscular, mejora sueño y armoniza mente y cuerpo.",
    beneficios: [
      "Libera tensiones y contracturas leves",
      "Reduce el estrés y la ansiedad",
      "Mejora la circulación y oxigenación de la piel",
      "Favorece el descanso y bienestar emocional"
    ],
    caracteristicas: [
      "Técnicas suaves y envolventes",
      "Ambiente relajante con aromaterapia",
      "Presión adaptada a cada persona",
      "Ideal para desconectar de la rutina diaria"
    ],
    imagen: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    alt: "Masaje relajante profesional",
    icono: <Heart className="w-8 h-8" />
  },
  {
    id: 2,
    nombre: "Manos que sanan",
    precio: "40,00€",
    duracion: "45 min",
    frecuencia: "Según necesidad",
    descripcion: "¿Dolor de espalda? ¿Cervicales cargadas? ¿Piernas pesadas?",
    descripcionLarga: "Tratamiento especializado para aliviar dolores específicos de espalda, cervicales cargadas y piernas pesadas. Técnicas terapéuticas dirigidas a zonas problemáticas para proporcionar alivio inmediato y duradero.",
    beneficios: [
      "Alivia dolores de espalda específicos",
      "Descontractura cervicales cargadas",
      "Mejora la circulación en piernas pesadas",
      "Reduce la tensión muscular acumulada",
      "Proporciona alivio inmediato"
    ],
    caracteristicas: [
      "Técnicas terapéuticas especializadas",
      "Enfoque en zonas problemáticas",
      "Presión terapéutica dirigida",
      "Evaluación personalizada de dolencias"
    ],
    imagen: manosQueSananImg,
    alt: "Masaje terapéutico especializado",
    icono: <Hand className="w-8 h-8" />
  }
];

const TratamientosCorporales = () => {
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
        <title>Tratamientos Corporales - Centro de Estética Lucy Lara</title>
        <meta name="description" content="Masajes relajantes y terapéuticos para el bienestar del cuerpo y mente. Alivia tensiones, reduce estrés y mejora tu bienestar general con nuestros tratamientos profesionales." />
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
              Tratamientos Corporales
            </h1>
            <p className="text-textLight max-w-3xl mx-auto text-lg">
              Mima tu cuerpo con nuestros tratamientos que combinan técnicas de relajación y productos revitalizantes para tu bienestar integral.
            </p>
          </motion.div>

          {/* Tratamientos */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {tratamientosCorporales.map((tratamiento, index) => (
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
                    
                    {/* Precio */}
                    <div className="flex items-center mb-6">
                      <Euro size={20} className="text-accent mr-2" />
                      <span className="text-2xl font-bold text-accent">{tratamiento.precio}</span>
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
              ¿Por qué elegir nuestros tratamientos corporales?
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-accent/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-semibold mb-2">Bienestar integral</h4>
                <p className="text-textLight text-sm">Cuidamos tu cuerpo y mente de forma holística</p>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Hand className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-semibold mb-2">Técnicas profesionales</h4>
                <p className="text-textLight text-sm">Masajistas especializados en técnicas terapéuticas</p>
              </div>
              <div className="text-center md:col-span-2 lg:col-span-1">
                <div className="bg-accent/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Info className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-semibold mb-2">Tratamiento personalizado</h4>
                <p className="text-textLight text-sm">Adaptamos cada sesión a tus necesidades específicas</p>
              </div>
            </div>
          </motion.div>

          {/* Call to action */}
          <motion.div 
            variants={itemVariants}
            className="text-center bg-gradient-to-r from-accent to-accentDark rounded-xl p-8 text-white mt-12"
          >
            <h3 className="font-playfair text-2xl font-semibold mb-4">
              ¿Necesitas un momento de relajación?
            </h3>
            <p className="mb-6 text-white/90">
              Reserva tu sesión de masaje y desconecta del estrés diario. Tu cuerpo y mente te lo agradecerán.
            </p>
            <a 
              href="#reserva"
              className="inline-flex items-center bg-white text-accent px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Solicitar información
            </a>
          </motion.div>
        </div>
      </main>
      
      <Booking />
      <Footer />
    </div>
  );
};

export default TratamientosCorporales;