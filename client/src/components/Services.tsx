import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import eliminacionVello from "../assets/images/Eliminación_Vello_Tamara.jpg";
import micropigmentacion from "../assets/images/Micropigmentación_Alex.jpg";
import micropigmentacion2 from "../assets/images/micropigmentacion2.jpg";
import tratamientoFacial from "../assets/images/tratamiento 8.jpg";
import otrosTratamientosImg from "@assets/image_1751373288528.png";

const services = [
  {
    id: 1,
    title: "Tratamientos Faciales",
    description: "Rejuvenece tu piel con nuestros tratamientos personalizados que combinan técnicas avanzadas y productos naturales.",
    price: "Desde 55€",
    image: tratamientoFacial,
    alt: "Tratamiento facial profesional en Centro de Estética Lucy Lara",
    link: "/tratamientos-faciales",
    linkText: "Ver tratamientos"
  },
  {
    id: 2,
    title: "Tratamientos Corporales",
    description: "Mima tu cuerpo con nuestros tratamientos que combinan técnicas de relajación y productos revitalizantes.",
    price: "Desde 40€",
    image: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    alt: "Tratamientos corporales",
    link: "/tratamientos-corporales",
    linkText: "Ver tratamientos"
  },
  {
    id: 3,
    title: "Eliminación del Vello",
    description: "Disfruta de una piel suave y libre de vello con nuestros métodos efectivos, seguros y de larga duración.",
    price: "Desde 5€",
    image: eliminacionVello,
    alt: "Tratamiento profesional de eliminación de vello con láser en Centro de Estética Lucy Lara",
    link: "/eliminacion-vello",
    linkText: "Ver métodos"
  },
  {
    id: 4,
    title: "Micropigmentación",
    description: "Realza tus rasgos naturales con técnicas de pigmentación semi-permanente para cejas, labios y ojos.",
    price: "",
    image: micropigmentacion,
    alt: "Servicio de micropigmentación profesional para hombres y mujeres",
    link: "/micropigmentacion",
    linkText: "Ver micropigmentación"
  },
  {
    id: 5,
    title: "Otros Tratamientos",
    description: "Descubre nuestra gama completa de tratamientos personalizados para satisfacer todas tus necesidades de belleza.",
    price: "Desde 15€",
    image: otrosTratamientosImg,
    alt: "Otros tratamientos especializados",
    link: "/otros-tratamientos",
    linkText: "Ver tratamientos"
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
              <div className="h-48 w-full overflow-hidden" style={{ borderRadius: "8px 8px 0 0" }}>
                <img 
                  src={service.image} 
                  alt={service.alt} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
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
                  {service.link ? (
                    <Link 
                      href={service.link}
                      className="text-accent hover:text-accentDark font-medium flex items-center gap-1 group"
                    >
                      {service.linkText}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <a 
                      href="#booking" 
                      className="text-accent hover:text-accentDark font-medium flex items-center gap-1 group"
                    >
                      Reservar 
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Services;
