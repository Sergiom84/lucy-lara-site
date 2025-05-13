import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Tratamientos Faciales",
    description: "Rejuvenece tu piel con nuestros tratamientos personalizados que combinan técnicas avanzadas y productos naturales.",
    price: "Desde 45€",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    alt: "Tratamiento facial"
  },
  {
    id: 2,
    title: "Masajes Terapéuticos",
    description: "Alivia tensiones y relaja cuerpo y mente con nuestras técnicas de masaje adaptadas a tus necesidades.",
    price: "Desde 55€",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    alt: "Masaje terapéutico"
  },
  {
    id: 3,
    title: "Manicura y Pedicura",
    description: "Cuida tus manos y pies con nuestros tratamientos de belleza que incluyen las últimas tendencias en diseño de uñas.",
    price: "Desde 35€",
    image: "https://pixabay.com/get/g5279546a99e919619b7796977c2cb4b703ba8dc3b30b714c3c3825c12da98ff647fcf700602104137432628bdc545ae771e2ba2eba327b0e6426ad4f930359ea_1280.jpg",
    alt: "Manicura y pedicura"
  },
  {
    id: 4,
    title: "Tratamientos Capilares",
    description: "Recupera la salud y el brillo de tu cabello con nuestros tratamientos especializados para todo tipo de cabello.",
    price: "Desde 40€",
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    alt: "Tratamientos capilares"
  },
  {
    id: 5,
    title: "Tratamientos Corporales",
    description: "Mima tu cuerpo con nuestros tratamientos que combinan técnicas de relajación y productos revitalizantes.",
    price: "Desde 60€",
    image: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    alt: "Tratamientos corporales"
  },
  {
    id: 6,
    title: "Maquillaje Profesional",
    description: "Resalta tu belleza natural con nuestro servicio de maquillaje para ocasiones especiales o tu día a día.",
    price: "Desde 50€",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    alt: "Maquillaje profesional"
  }
];

const Services = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="servicios" className="bg-neutralDark py-16 md:py-24">
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
            Nuestros Servicios
          </h2>
          <p className="text-textLight max-w-2xl mx-auto">
            Descubre nuestra amplia gama de tratamientos diseñados para cuidar de tu belleza y bienestar
          </p>
        </motion.div>
        
        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)" }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={service.image} 
                alt={service.alt} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold mb-2">
                  {service.title}
                </h3>
                <p className="text-textLight mb-4">
                  {service.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-accent font-medium">
                    {service.price}
                  </span>
                  <a 
                    href="#reserva" 
                    className="text-accent hover:text-accentDark font-medium flex items-center gap-1 group"
                  >
                    Reservar 
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View All Button */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <a 
            href="#reserva" 
            className="inline-block bg-accent hover:bg-accentDark text-white px-8 py-3 rounded-full transition-colors"
          >
            Ver todos los servicios
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
