import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
// Importar imágenes directamente
import centro1 from "../assets/images/Nuestro_centro1.jpg";
import centro2 from "../assets/images/Nuestro_centro2.jpg";
import centro3 from "../assets/images/Nuestro_centro3.jpg";
import cremaContornoOjos from "../assets/images/Crema_cortono_de_ojos.png";
import cremaPielManchas from "../assets/images/Crema_cuidado_Piel_con_Machas.png";
import cremaDespigmentante from "../assets/images/Crema_Despigmentación.png";
import cremaEfectoSeda from "../assets/images/Crema_Efecto_Seda.png";
import espumaLimpiadora from "../assets/images/Espuma_Limpiadora.png";
import lecheLimpiadoraFacial from "../assets/images/Leche_Limpiadora_Facial.png";
import protectorSolar from "../assets/images/Protector_Solar.png";
import protectorSolarColor from "../assets/images/Protector_Solar_Color.png";
import serumVitaminaC from "../assets/images/Serum_Vitamina_C.png";
import cremaHidratanteOilFree from "../assets/images/Crema_Hidratante_Oil.png";
import gelRosaMosqueta from "../assets/images/Gel_Rosa_Mosqueta.png";

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

// Producto temporal para tónico facial (sin imagen)
import defaultProductImage from "../assets/images/Protector_Solar.png"; // Usamos temporalmente otra imagen
// Nota: reemplazar esta imagen cuando tengamos la del Tónico Facial

// Productos (ordenados alfabéticamente)
const productos = [
  {
    id: 1,
    titulo: "Crema Contorno de Ojos",
    descripcion: "Lifting periocular. Reductor de bolsas.",
    precio: "46,70€",
    imagen: cremaContornoOjos,
    alt: "Crema contorno de ojos Lucy Lara"
  },
  {
    id: 2,
    titulo: "Crema Cuidado Piel con Manchas",
    descripcion: "Cuidado diario de la piel con tendencia pigmentaria",
    precio: "42,50€",
    imagen: cremaPielManchas,
    alt: "Crema cuidado piel con manchas Lucy Lara"
  },
  {
    id: 3,
    titulo: "Crema Despigmentante",
    descripcion: "Acción Despigmentante",
    precio: "52,58€",
    imagen: cremaDespigmentante,
    alt: "Crema despigmentante Lucy Lara"
  },
  {
    id: 4,
    titulo: "Crema Efecto Seda",
    descripcion: "Reafirmante facial",
    precio: "32,80€",
    imagen: cremaEfectoSeda,
    alt: "Crema efecto seda Lucy Lara"
  },
  {
    id: 5,
    titulo: "Crema Hidratante Oil-Free",
    descripcion: "Hidratación Facial Oil-Free Piel Grasa",
    precio: "34,20€",
    imagen: cremaHidratanteOilFree,
    alt: "Crema hidratante oil-free Lucy Lara"
  },
  {
    id: 6,
    titulo: "Espuma Limpiadora",
    descripcion: "Mousse Limpiadora",
    precio: "21,50€",
    imagen: espumaLimpiadora,
    alt: "Espuma limpiadora Lucy Lara"
  },
  {
    id: 7,
    titulo: "Gel Rosa Mosqueta",
    descripcion: "Regenerador Celular",
    precio: "29,55€",
    imagen: gelRosaMosqueta,
    alt: "Gel Rosa Mosqueta regenerador celular Lucy Lara"
  },
  {
    id: 8,
    titulo: "Leche Limpiadora Facial",
    descripcion: "Limpieza Facial Hidratante",
    precio: "16,50€",
    imagen: lecheLimpiadoraFacial,
    alt: "Leche limpiadora facial Lucy Lara"
  },
  {
    id: 9,
    titulo: "Protector Solar 50+",
    descripcion: "Hidratación con Protección Solar",
    precio: "28,30€",
    imagen: protectorSolar,
    alt: "Protector solar con hidratación Lucy Lara"
  },
  {
    id: 10,
    titulo: "Protector Solar 50+ Color",
    descripcion: "Hidratación con Protección Solar",
    precio: "27€",
    imagen: protectorSolarColor,
    alt: "Protector solar con color Lucy Lara"
  },
  {
    id: 11,
    titulo: "Sérum Vitamina C",
    descripcion: "Sérum Efecto Lifting",
    precio: "39,60€",
    imagen: serumVitaminaC,
    alt: "Sérum Vitamina C efecto lifting Lucy Lara"
  },
  {
    id: 12,
    titulo: "Tónico Facial",
    descripcion: "Tonifica y Equilibra el Cutis",
    precio: "38€",
    imagen: defaultProductImage, // Imagen temporal
    alt: "Tónico facial Lucy Lara"
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
              >
                <div onClick={() => window.location.href = `/productos/${producto.id}`}>
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