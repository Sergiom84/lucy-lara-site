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
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // Imágenes del carrusel
  const carouselImages = [imagen1, imagen2, imagen3, imagen4, imagen5];
  
  // Pre-carga de imágenes para evitar destellos
  useEffect(() => {
    // Precargar todas las imágenes para evitar destellos
    const loadImages = async () => {
      // Crear promesas para cargar cada imagen
      const imagePromises = carouselImages.map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve; // Resolver incluso si hay error
        });
      });
      
      // Esperar a que se carguen todas las imágenes
      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };
    
    loadImages();
  }, []);
  
  // Auto-rotación del carrusel
  useEffect(() => {
    if (imagesLoaded) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % carouselImages.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [imagesLoaded, carouselImages.length]);
  
  // Cambiar slide manualmente
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  return (
    <section id="inicio" className="relative h-[85vh] min-h-[650px] overflow-hidden bg-gray-800 -mt-[8rem]">
      {/* Precarga de imágenes - invisible pero ayuda a evitar destellos */}
      <div className="hidden">
        {carouselImages.map((src, i) => (
          <img key={`preload-${i}`} src={src} alt="" />
        ))}
      </div>
      
      {/* Slides (fondo) */}
      <div className="absolute inset-0">
        {carouselImages.map((src, index) => (
          <div
            key={index}
            className="absolute inset-0"
            style={{
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
              zIndex: currentSlide === index ? 10 : 0,
            }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${src})`,
                filter: 'brightness(0.85)',
              }}
            />
            {/* Overlay para mejorar la visibilidad del texto y crear gradiente superior */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#3a3a3a]/90 to-transparent h-64" />
            <div className="absolute inset-0 bg-black opacity-20" />
          </div>
        ))}
      </div>
      
      {/* Contenido del slider */}
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center mt-16">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-playfair font-light text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Centro de Estética Lucy Lara
          </motion.h1>
          <div className="h-[1px] bg-white/60 w-full my-6"></div>
          <p className="text-xl md:text-2xl text-white uppercase tracking-wider font-light mb-8">
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
            href="#servicios" 
            className="bg-[#8b2154] hover:bg-[#7a1c49] text-white px-8 py-3 rounded-none text-lg transition-colors"
          >
            Nuestros servicios
          </a>
          <a 
            href="#reserva" 
            className="bg-transparent border border-white hover:bg-white/10 text-white px-8 py-3 rounded-none text-lg transition-colors"
          >
            Reservar cita
          </a>
        </motion.div>
      </div>
      
      {/* Indicadores (puntos) */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-3 z-20">
        {carouselImages.map((_, i) => (
          <button 
            key={i} 
            onClick={() => goToSlide(i)}
            className={`w-2 h-2 rounded-full ${i === currentSlide ? 'bg-white' : 'bg-white/40'}`}
            aria-label={`Diapositiva ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
