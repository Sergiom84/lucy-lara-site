import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import higieneSupremaImg from "../../../attached_assets/Higiene Facial Suprema_1750665963558.jpg";
import luzCalmanteImg from "../../../attached_assets/Luz calmante - fotoestimulación para la piel sensible_1750665963555.jpg";
import iceSkinImg from "../../../attached_assets/Ice Skin - crioterapia facial_1750665963556.jpg";
import eternaJuventudImg from "../../../attached_assets/Eterna Juventud 2 en 1_1750665963559.jpg";

interface TratamientoFacial {
  id: number;
  nombre: string;
  precio: string;
  duracion?: string;
  frecuencia: string;
  descripcion: string;
  pasos: string[];
  imagen: string;
  alt: string;
}

// Datos de tratamientos faciales actualizados según información del Excel
const tratamientosFaciales: TratamientoFacial[] = [
  {
    id: 1,
    nombre: "Renovación profunda - higiene facial completa",
    precio: "61,00€",
    duracion: "60 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento de limpieza profunda que hidrata, revitaliza y equilibra la piel.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Exfoliación mecánica",
      "Extracción de comedones para una oxigenación y limpieza de la piel",
      "Masaje relajante junto con una mascarilla acorde de las necesidades de la piel",
      "Acabamos el tratamiento con una crema finalizadora"
    ],
    imagen: higieneSupremaImg,
    alt: "Higiene Facial Suprema"
  },
  {
    id: 2,
    nombre: "Renovación de cristal - higiene facial completa con microdermoabrasión",
    precio: "71,00€",
    duracion: "70 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento de limpieza profunda que hidrata, pule y oxigena.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Extracción de comedones para una oxigenación y limpieza de la piel",
      "Microdermoabrasión que exfolia en profundidad",
      "Masaje relajante junto con una mascarilla",
      "Acabamos el tratamiento con una crema finalizadora"
    ],
    imagen: iceSkinImg,
    alt: "Ice Skin - crioterapia facial"
  },
  {
    id: 3,
    nombre: "Descanso y vitalidad - higiene facial completa con presoterapia ocular",
    precio: "71,00€",
    duracion: "70 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento de limpieza profunda que hidrata, revitaliza y equilibra la piel.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Exfoliación mecánica",
      "Extracción de comedones",
      "Gafas de presoterapia que reducen bolsas, ojeras y fatiga ocular"
    ],
    imagen: luzCalmanteImg,
    alt: "Luz calmante - fotoestimulación para la piel sensible"
  },
  {
    id: 4,
    nombre: "Equilibrio total - higiene facial con presoterapia",
    precio: "79€",
    duracion: "80 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento de limpieza profunda que hidrata, revitaliza la cara y el cuerpo.",
    pasos: [
      "Presoterapia en piernas que activa la circulación",
      "Higiene facial completa",
      "Masaje relajante con mascarilla",
      "Acabamos con crema finalizadora"
    ],
    imagen: eternaJuventudImg,
    alt: "Eterna Juventud 2 en 1"
  },
  {
    id: 5,
    nombre: "Pureza y frescura - higiene facial",
    precio: "55€",
    duracion: "45 min",
    frecuencia: "Según necesidad",
    descripcion: "Higiene facial básica, hidratante y revitalizante.",
    pasos: [
      "Limpieza profunda, tonificación",
      "Exfoliación mecánica",
      "Masaje relajante, mascarilla adaptada",
      "Crema final para hidratación duradera"
    ],
    imagen: higieneSupremaImg,
    alt: "Higiene Facial Suprema"
  }
];

const TratamientosFaciales = () => {
  return (
    <>
      <Helmet>
        <title>Tratamientos Faciales - Centro de Estética Lucy Lara</title>
        <meta name="description" content="Descubre nuestros tratamientos faciales profesionales: renovación profunda, microdermoabrasión, presoterapia ocular y más. Reserva tu cita." />
        <meta name="keywords" content="tratamientos faciales Madrid, higiene facial, microdermoabrasión, presoterapia, Centro Lucy Lara" />
        <link rel="canonical" href="https://centroesteticalucylara.es/tratamientos-faciales" />
      </Helmet>
      
      <Header />
      
      <main className="pt-[8rem] pb-16 bg-gradient-to-br from-neutral via-white to-neutral">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link href="/" className="inline-flex items-center text-textLight hover:text-accent transition-colors">
              <ArrowLeft className="mr-2" size={16} />
              Volver al inicio
            </Link>
          </nav>

          {/* Page Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-playfair text-4xl md:text-5xl font-semibold mb-6 text-accent">
              Tratamientos Faciales
            </h1>
            <p className="text-textLight text-lg max-w-2xl mx-auto leading-relaxed">
              Descubre nuestros tratamientos faciales profesionales diseñados para cuidar y revitalizar tu piel.
              Cada tratamiento está personalizado según las necesidades específicas de tu tipo de piel.
            </p>
          </motion.div>

          {/* Treatments Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tratamientosFaciales.map((tratamiento, index) => (
              <motion.div
                key={tratamiento.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={tratamiento.imagen} 
                    alt={tratamiento.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-semibold mb-3 text-accent">
                    {tratamiento.nombre}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-accent">{tratamiento.precio}</span>
                    <div className="text-sm text-textLight">
                      {tratamiento.duracion && <span>{tratamiento.duracion} • </span>}
                      <span>{tratamiento.frecuencia}</span>
                    </div>
                  </div>
                  
                  <p className="text-textLight mb-4 text-sm leading-relaxed">
                    {tratamiento.descripcion}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-textDark mb-2 text-sm">Pasos del tratamiento:</h4>
                    <ul className="text-xs text-textLight space-y-1">
                      {tratamiento.pasos.slice(0, 3).map((paso, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-accent mr-2">•</span>
                          {paso}
                        </li>
                      ))}
                      {tratamiento.pasos.length > 3 && (
                        <li className="text-accent">+ {tratamiento.pasos.length - 3} pasos más</li>
                      )}
                    </ul>
                  </div>
                  
                  <Link href={`/tratamiento/${tratamiento.id}`}>
                    <button className="w-full bg-accent hover:bg-accentDark text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300">
                      Ver detalles
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div 
            className="mt-16 text-center bg-accent/5 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="font-playfair text-2xl font-semibold mb-4 text-accent">
              ¿No sabes qué tratamiento es mejor para ti?
            </h2>
            <p className="text-textLight mb-6 max-w-2xl mx-auto">
              Nuestro equipo de profesionales estará encantado de asesorarte y recomendarte 
              el tratamiento facial más adecuado para tu tipo de piel y objetivos.
            </p>
            <Link href="/#reserva">
              <button className="bg-accent hover:bg-accentDark text-white py-3 px-8 rounded-lg font-semibold transition-colors duration-300">
                Reservar consulta gratuita
              </button>
            </Link>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default TratamientosFaciales;