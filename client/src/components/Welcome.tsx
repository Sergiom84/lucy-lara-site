import { motion } from "framer-motion";
import { IdCard, UserRound, Flower } from "lucide-react";
import recepcionTamara from "../assets/images/recepcion-tamara.jpg";

const Welcome = () => {
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image */}
          <motion.div 
            className="md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
          >
            <img 
              src={recepcionTamara} 
              alt="Recepción del Centro de Estética Lucy Lara" 
              className="rounded-2xl shadow-lg w-full h-auto object-cover"
            />
          </motion.div>
          
          {/* Content */}
          <motion.div 
            className="md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2 
              className="font-playfair text-3xl md:text-4xl font-semibold mb-6"
              variants={itemVariants}
            >
              Bienvenido a nuestro refugio de belleza
            </motion.h2>
            
            <motion.p 
              className="text-textLight mb-6"
              variants={itemVariants}
            >
              En nuestro centro, combinamos las técnicas más avanzadas con productos naturales de la más alta calidad para ofrecerte una experiencia única. Nuestro equipo de profesionales está dedicado a realzar tu belleza natural y mejorar tu bienestar.
            </motion.p>
            
            <motion.p 
              className="text-textLight mb-8"
              variants={itemVariants}
            >
              Desde tratamientos faciales rejuvenecedores hasta terapias corporales relajantes, te invitamos a descubrir un oasis de tranquilidad donde podrás desconectar y renovarte.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-6"
              variants={containerVariants}
            >
              <motion.div 
                className="flex items-center gap-3"
                variants={itemVariants}
              >
                <div className="w-12 h-12 bg-primary/30 rounded-full flex items-center justify-center">
                  <IdCard className="text-accent" size={22} />
                </div>
                <span className="font-medium">Productos Premium</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3"
                variants={itemVariants}
              >
                <div className="w-12 h-12 bg-primary/30 rounded-full flex items-center justify-center">
                  <UserRound className="text-accent" size={22} />
                </div>
                <span className="font-medium">Profesionales Certificados</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3"
                variants={itemVariants}
              >
                <div className="w-12 h-12 bg-primary/30 rounded-full flex items-center justify-center">
                  <Flower className="text-accent" size={22} />
                </div>
                <span className="font-medium">Ambiente Relajante</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
