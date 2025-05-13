import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="inicio" className="relative h-[80vh] min-h-[600px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1470259078422-826894b933aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')", 
          filter: "brightness(0.85)" 
        }}
      />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
        <motion.h1 
          className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Descubre tu belleza natural
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-white/90 max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Bienvenido a nuestro exclusivo centro de belleza y bienestar donde cuidamos de ti con los tratamientos más avanzados.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a 
            href="#servicios" 
            className="bg-accent hover:bg-accentDark text-white px-8 py-3 rounded-full text-lg transition-colors"
          >
            Nuestros servicios
          </a>
          <a 
            href="#reserva" 
            className="bg-white hover:bg-gray-50 text-accent px-8 py-3 rounded-full text-lg transition-colors"
          >
            Reservar ahora
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
