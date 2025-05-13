import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="inicio" className="relative h-[80vh] min-h-[600px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1470259078422-826894b933aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')", 
          filter: "brightness(0.75)" 
        }}
      />
      
      {/* Overlay Text SPA */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-white/30 text-[150px] font-light tracking-widest">SPA</h2>
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
            Spa & Belleza
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
            className="bg-[#66d1bd] hover:bg-[#55c1ad] text-white px-8 py-3 rounded-none text-lg transition-colors"
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
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/40'}`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
