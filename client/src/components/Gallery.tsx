import { motion } from "framer-motion";
import BeforeAfterSlider from "./BeforeAfterSlider";

// Gallery images
const facilityImages = [
  {
    id: 1,
    src: "/images/centro1.jpg",
    alt: "Sala de tratamientos con equipamiento médico estético"
  },
  {
    id: 2,
    src: "/images/centro2.jpg",
    alt: "Espacio para tratamientos faciales con equipamiento avanzado"
  },
  {
    id: 3,
    src: "/images/centro3.jpg",
    alt: "Área de belleza con detalles elegantes en color burgundy"
  }
];

// Before/After images
const beforeAfterImages = [
  {
    id: 1,
    beforeSrc: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    afterSrc: "https://images.unsplash.com/photo-1519165816461-3ea9d99e97a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    beforeAlt: "Antes del tratamiento facial",
    afterAlt: "Después del tratamiento facial",
    title: "Tratamiento Facial Rejuvenecedor"
  },
  {
    id: 2,
    beforeSrc: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    afterSrc: "https://images.unsplash.com/photo-1562898963-e1dceb7bdc6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    beforeAlt: "Antes del tratamiento capilar",
    afterAlt: "Después del tratamiento capilar",
    title: "Tratamiento Capilar Intensivo"
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
            Explora nuestras instalaciones y conoce los resultados que hemos conseguido
          </p>
        </motion.div>
        
        {/* Facility Images */}
        <motion.div 
          className="mb-16"
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
        
        {/* Before/After Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <motion.h3 
            className="font-playfair text-2xl font-medium mb-8 text-center"
            variants={itemVariants}
          >
            Antes y Después
          </motion.h3>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
          >
            {beforeAfterImages.map((image) => (
              <motion.div key={image.id} variants={itemVariants}>
                <BeforeAfterSlider
                  beforeImage={image.beforeSrc}
                  afterImage={image.afterSrc}
                  beforeAlt={image.beforeAlt}
                  afterAlt={image.afterAlt}
                  title={image.title}
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
