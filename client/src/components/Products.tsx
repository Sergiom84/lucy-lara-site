import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
// Importar imágenes directamente
import centro1 from "../assets/images/centro1-small.jpg";
import centro2 from "../assets/images/centro2-small.jpg";
import centro3 from "../assets/images/centro3-small.jpg";
import cremaContornoOjos from "../assets/images/crema-contorno-ojos.png";

// Nuestro Centro images
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

// Productos
const productos = [
  {
    id: 1,
    titulo: "Crema Contorno de Ojos",
    descripcion: "Lifting periocular. Reductor de bolsas.",
    precio: "35€",
    imagen: cremaContornoOjos,
    alt: "Crema contorno de ojos Lucy Lara"
  }
];

const Products = () => {
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

  const handleProductClick = (id: number) => {
    // Aquí podríamos implementar la navegación a la página de detalle del producto
    window.open(`/productos/${id}`, '_blank');
  };

  return (
    <section id="productos" className="bg-white py-16 md:py-24">
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
            Nuestros Productos
          </h2>
          <p className="text-textLight max-w-2xl mx-auto">
            Descubre nuestra línea exclusiva de productos desarrollados para el cuidado de tu piel
          </p>
        </motion.div>
        
        {/* Productos */}
        <motion.div 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {productos.map((producto) => (
              <motion.div 
                key={producto.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)" }}
                transition={{ duration: 0.3 }}
                onClick={() => handleProductClick(producto.id)}
              >
                <div className="h-64 w-full overflow-hidden" style={{ borderRadius: "8px 8px 0 0" }}>
                  <img 
                    src={producto.imagen} 
                    alt={producto.alt} 
                    className="w-full h-full object-contain object-center p-4"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-semibold mb-2">
                    {producto.titulo}
                  </h3>
                  <p className="text-textLight mb-4">
                    {producto.descripcion}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-accent font-medium">
                      {producto.precio}
                    </span>
                    <span 
                      className="text-accent hover:text-accentDark font-medium flex items-center gap-1 group"
                    >
                      Ver detalle 
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Nuestro Centro */}
        <motion.div 
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <motion.h2
            className="font-playfair text-3xl md:text-4xl font-semibold mb-8 text-center"
            variants={itemVariants}
          >
            Nuestro Centro
          </motion.h2>
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

export default Products;
