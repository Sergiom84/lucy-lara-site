import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { ArrowLeft, Clock, Euro, Info, Zap, Star, Sparkles } from "lucide-react";
import { Link } from "wouter";
import Header from "../components/Header";
import Footer from "../components/Footer";
import eliminacionVelloImg from "../assets/images/Eliminación_Vello_Tamara.jpg";
import eliminacionVelloImg2 from "../assets/images/Eliminación_vello.png";

interface MetodoEliminacion {
  id: number;
  nombre: string;
  descripcion: string;
  beneficios: string[];
  caracteristicas: string[];
  precios: { [key: string]: string };
  icono: React.ReactNode;
  duracion: string;
  frecuencia: string;
}

const metodosEliminacion: MetodoEliminacion[] = [
  {
    id: 1,
    nombre: "Precisión y Resultados Definitivos - Dep. Eléctrica",
    descripcion: "Elimina el vello de forma progresiva y definitiva, en cualquier zona del cuerpo. La depilación eléctrica es la técnica más eficaz para eliminar el vello de manera definitiva. Mediante la aplicación de una microcorriente en cada folículo, se destruye la raíz del vello, impidiendo su crecimiento de forma progresiva.",
    beneficios: [
      "Elimina el vello de forma permanente, incluso canas o vello claro",
      "Tratamiento 100% personalizado y adaptable a cualquier zona",
      "Ideal para rematar zonas donde otros métodos no han sido efectivos",
      "Sesiones por minutos: pagas solo el tiempo que necesitas"
    ],
    caracteristicas: [
      "Este método es ideal para zonas pequeñas, vello rebelde, canas o vello fino que otros sistemas no eliminan",
      "Se trabaja por minutos, adaptándonos a las necesidades de cada persona",
      "Permitiendo tratar cualquier zona del cuerpo con precisión y seguridad",
      "Si buscas un método definitivo y preciso, la depilación eléctrica es tu mejor opción"
    ],
    precios: {
      "5 min": "11€",
      "10 min": "20€",
      "15 min": "25€",
      "20 min": "30€",
      "30 min": "42€",
      "60 min": "82€"
    },
    icono: <Zap className="w-8 h-8" />,
    duracion: "Precio por minutos",
    frecuencia: "Sesiones por minutos según necesidad"
  },
  {
    id: 2,
    nombre: "Tecnología Indolora y Eficaz Todo el Año - fotodepilación",
    descripcion: "Elimina el vello de forma progresiva, segura y sin molestias. La fotodepilación SHR es un sistema avanzado para ofrecer una depilación progresiva, segura y prácticamente indolora. A diferencia de otros métodos, este sistema es apto hasta fototipos de piel 5, permitiendo tratar una mayor variedad de tonos de piel con la máxima eficacia.",
    beneficios: [
      "Elimina el vello de forma progresiva y duradera",
      "Apto para pieles hasta fototipo 5",
      "Sesiones cómodas, rápidas e indoloras",
      "Posibilidad de realizarlo en verano con precaución",
      "Tratamiento para cualquier zona del cuerpo"
    ],
    caracteristicas: [
      "Gracias a su tecnología de barrido, se puede realizar incluso en verano",
      "Siempre con la debida protección solar",
      "Olvídate del vello y disfruta de una piel suave todo el año",
      "Con la última tecnología en fotodepilación"
    ],
    precios: {
      "Labio superior": "25€",
      "Entrecejo": "15€",
      "Mentón": "35€",
      "Patillas": "30€",
      "Axilas": "30€",
      "Medios brazos": "35€",
      "Brazos completos": "60€",
      "Pecho": "79€",
      "Hombros": "40€",
      "Nuca": "30€",
      "Espalda": "79€",
      "Línea alba": "29€",
      "Ingles": "59€",
      "Glúteos": "45€",
      "Perianal": "29€",
      "Medias piernas": "40€",
      "Piernas completas": "79€"
    },
    icono: <Star className="w-8 h-8" />,
    duracion: "Por sesión (ej. Labio superior: 25€, Entrecejo: 15€, Mentón: 25€)",
    frecuencia: "Según zona y necesidad"
  },
  {
    id: 3,
    nombre: "Piel suave, hidratada y libre de vello con un toque de placer - Depilación con Cera de Chocolate",
    descripcion: "La depilación con cera de chocolate es mucho más que una técnica de eliminación del vello: es un tratamiento de belleza que cuida y mima la piel. Gracias a su composición rica en cacao y mantecas naturales, esta cera hidrata, nutre y calma, reduciendo la irritación y dejando la piel suave y sedosa.",
    beneficios: [
      "Elimina el vello desde la raíz para un acabado duradero",
      "Hidratación y nutrición gracias a las propiedades del cacao",
      "Menos irritación, ideal para pieles sensibles",
      "Efecto exfoliante, dejando la piel más luminosa y renovada"
    ],
    caracteristicas: [
      "Ideal para todo tipo de pieles, incluso las más sensibles",
      "Su textura tibia y envolvente proporciona una experiencia relajante",
      "Minimizando la sensación de dolor y dejando un aroma delicioso en la piel",
      "Disfruta de una depilación eficaz y placentera que transforma el momento en una auténtica experiencia de bienestar"
    ],
    precios: {
      // Mujer
      "Cejas": "10€",
      "Labio": "10€",
      "Mentón": "9€",
      "Patillas": "10€",
      "Axilas": "10€",
      "Brazos": "20€",
      "Pubis": "23€",
      "Glúteos": "15€",
      "Ingles": "17€",
      "Lumbares": "10€",
      "Medias piernas": "18€",
      "Piernas completas": "20€",
      // Hombre
      "Cejas (H)": "10€",
      "Entrecejo (H)": "5€",
      "Espalda (H)": "25€",
      "Abdomen (H)": "15€",
      "Hombros (H)": "12€",
      "Lumbares (H)": "15€",
      "Torso (H)": "25€",
      "Axilas (H)": "12€",
      "Brazos completos (H)": "18€",
      "Piernas completas (H)": "27€",
      "Medias piernas (H)": "18€"
    },
    icono: <Sparkles className="w-8 h-8" />,
    duracion: "No especificado",
    frecuencia: "Según necesidad o rutina mensual"
  }
];

const EliminacionVello = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } }
  };

  return (
    <div className="font-inter text-textDark bg-neutral min-h-screen">
      <Helmet>
        <title>Eliminación del Vello - Centro de Estética Lucy Lara</title>
        <meta name="description" content="Servicios profesionales de eliminación del vello: depilación eléctrica definitiva, fotodepilación SHR indolora y depilación con cera de chocolate. Resultados duraderos y tratamientos personalizados." />
      </Helmet>
      
      <Header />
      
      <main className="pt-32 pb-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Navegación de regreso */}
          <Link 
            href="/#promociones" 
            className="inline-flex items-center text-accent hover:text-accentDark mb-8 transition-colors"
            onClick={(e) => {
              window.location.href = "/#promociones";
              e.preventDefault();
            }}
          >
            <ArrowLeft size={16} className="mr-2" />
            Volver a servicios
          </Link>
          
          {/* Header de la página */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-playfair text-4xl md:text-5xl font-semibold mb-6">
              Eliminación del Vello
            </h1>
            <p className="text-textLight max-w-3xl mx-auto text-lg">
              Disfruta de una piel suave y libre de vello con nuestros métodos efectivos, seguros y de larga duración. Tres tecnologías diferentes para adaptarse a tus necesidades.
            </p>
          </motion.div>

          {/* Imagen principal */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={eliminacionVelloImg}
              alt="Tratamiento de eliminación de vello profesional"
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl"
            />
          </motion.div>

          {/* Métodos de eliminación */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {metodosEliminacion.map((metodo, index) => (
              <motion.div 
                key={metodo.id}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="p-8 lg:p-12">
                  {/* Header del método */}
                  <div className="flex items-center mb-6">
                    <div className="bg-accent/10 p-3 rounded-full mr-4 text-accent">
                      {metodo.icono}
                    </div>
                    <div>
                      <h2 className="font-playfair text-2xl lg:text-3xl font-semibold text-accent">
                        {metodo.nombre}
                      </h2>
                      <div className="flex items-center mt-2 text-textDark">
                        <Clock size={16} className="text-accent mr-2" />
                        <span className="text-sm">{metodo.duracion}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Descripción */}
                  <p className="text-textLight mb-8 leading-relaxed">
                    {metodo.descripcion}
                  </p>
                  
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Beneficios */}
                    <div>
                      <h3 className="font-semibold text-lg mb-4 flex items-center text-accent">
                        <Info size={20} className="mr-2" />
                        Beneficios
                      </h3>
                      <ul className="space-y-3">
                        {metodo.beneficios.map((beneficio, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-textLight text-sm leading-relaxed">{beneficio}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Características adicionales */}
                      <div className="mt-6">
                        <h4 className="font-medium mb-3 text-textDark">Características adicionales:</h4>
                        <ul className="space-y-2">
                          {metodo.caracteristicas.map((caracteristica, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-1.5 h-1.5 bg-accent/60 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-textLight text-sm leading-relaxed">{caracteristica}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Precios */}
                    <div>
                      <h3 className="font-semibold text-lg mb-4 flex items-center text-accent">
                        <Euro size={20} className="mr-2" />
                        Precios
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                        {Object.entries(metodo.precios).map(([zona, precio]) => (
                          <div key={zona} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium">{zona}</span>
                            <span className="text-sm font-semibold text-accent">{precio}</span>
                          </div>
                        ))}
                      </div>
                      
                      {metodo.id === 3 && (
                        <div className="mt-4 p-3 bg-accent/5 rounded-lg">
                          <p className="text-xs text-textLight">
                            <strong>Mujer y Hombre:</strong> Precios diferenciados según zona y género
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EliminacionVello;