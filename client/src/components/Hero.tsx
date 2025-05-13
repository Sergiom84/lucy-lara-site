import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Importación directa de imágenes
import imagen1 from "@assets/Entrada1.jpg";
import imagen2 from "@assets/Entrada2.jpg";
import imagen3 from "@assets/Mueble.jpg";
import imagen4 from "@assets/Cabina2.jpg";
import imagen5 from "@assets/Cabina3.jpg";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Imágenes del carrusel
  const carouselImages = [
    imagen1,
    imagen2,
    imagen3,
    imagen4,
    imagen5
  ];
  
  // Auto-rotación del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [carouselImages.length]);
  
  // Cambiar slide manualmente
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  return (
    <section id="inicio" className="relative h-[80vh] min-h-[600px] overflow-hidden">
      {/* Background Image Carousel with Overlay */}
      {carouselImages.map((image, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentSlide === index ? 1 : 0,
            zIndex: currentSlide === index ? 0 : -1
          }}
          transition={{ duration: 1 }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url('${image}')`,
              filter: "brightness(0.75)"
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </motion.div>
      ))}
      
      {/* Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-white/30 text-[150px] font-light tracking-widest">BELLEZA</h2>
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="font-serif text-6xl font-light text-white mb-4 tracking-wide uppercase">
            Belleza
          </h1>
          <div className="h-[1px] bg-white/50 w-full my-4"></div>
          <p className="text-xl text-white/90 uppercase tracking-wider font-light mb-8">
            Relájate y renueva tu belleza
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a 
            href="#tratamientos" 
            className="bg-[#8b2154] hover:bg-[#7a1c49] text-white px-8 py-3 rounded-none text-lg transition-colors"
          >
            Ver tratamientos
          </a>
          <a 
            href="#reserva" 
            className="bg-transparent border border-white hover:bg-white/10 text-white px-8 py-3 rounded-none text-lg transition-colors"
          >
            Reservar cita
          </a>
        </motion.div>
      </div>
      
      {/* Dot Indicators */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-2">
        {carouselImages.map((_, i) => (
          <button 
            key={i} 
            onClick={() => goToSlide(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-white scale-125' : 'bg-white/40'}`}
            aria-label={`Diapositiva ${i + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
