import { motion } from "framer-motion";
// Importar imágenes directamente
import centro1 from "../assets/images/centro1-small.jpg";
import centro2 from "../assets/images/centro2-small.jpg";
import centro3 from "../assets/images/centro3-small.jpg";

// Gallery images
const facilityImages = [
  {
    id: 1,
    src: centro1,
    alt: "Sala de tratamientos con equipamiento médico estético"
  },
  {
    id: 2,
    src: centro2,
    alt: "Espacio para tratamientos faciales con equipamiento avanzado"
  },
  {
    id: 3,
    src: centro3,
    alt: "Área de belleza con detalles elegantes en color burgundy"
  }
];

const Gallery = () => {
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
    <section id="galeria" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold mb-3">
            Nuestra Galería
          </h2>
          <p className="text-textLight max-w-2xl mx-auto">
            Explora nuestras modernas instalaciones diseñadas para tu confort
          </p>
        </motion.div>
        
        {/* Facility Images */}
        <motion.div 
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <motion.h3 
            className="font-playfair text-2xl font-medium mb-8 text-center"
            variants={itemVariants}
          >
            Nuestro Centro
          </motion.h3>
          <motion.p
            className="text-textLight max-w-3xl mx-auto text-center mb-8"
            variants={itemVariants}
          >
            Instalaciones modernas y elegantes diseñadas para tu comodidad y bienestar durante todos nuestros tratamientos.
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={containerVariants}
          >
            {facilityImages.map((image) => (
              <motion.div
                key={image.id}
                className="rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden h-64"
                variants={itemVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
