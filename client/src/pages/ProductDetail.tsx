import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

interface Producto {
  id: number;
  titulo: string;
  descripcion: string;
  descripcionLarga: string;
  beneficios: string[];
  ingredientes: string;
  presentacion?: string;
  modo_uso: string;
  precio: string;
  imagen: string;
  alt: string;
}

interface ProductosData {
  [key: string]: Producto;
}

// En un proyecto real, esta información vendría de una API o base de datos
// Productos ordenados alfabéticamente
const productosData: ProductosData = {
  "1": {
    id: 1,
    titulo: "Crema Contorno de Ojos",
    descripcion: "Lifting periocular. Reductor de bolsas.",
    descripcionLarga: "Trata los principales signos del envejecimiento del área periocular de todo tipo de pieles: arrugas finas, surcos. patas de galio, lineas de expresión, bolsas y ojeras. Relaja la musculatura periocular generando un efecto lifting.",
    beneficios: [
      "Cuidado antiarrugas",
      "Reducción de bolsas y ojeras"
    ],
    ingredientes: "Colágeno Natural 5%, Ácido Hialurónico de bajo peso molecular, Matrixyl 3000 2%. Rhamnosoft 1%, Argireline® 5%, Eyeseryl® 10%, Alfa-Bisabolol 0.5%, Aceite de Germen de Trigo y Aceite de Jojoba.",
    presentacion: "30 ml",
    modo_uso: "Aplicar a toques por la mañana y por la noche sobre el contorno de los ojos.",
    precio: "35€",
    imagen: cremaContornoOjos,
    alt: "Crema contorno de ojos Lucy Lara"
  },
  "2": {
    id: 2,
    titulo: "Crema Cuidado Piel con Manchas",
    descripcion: "Cuidado diario de la piel con tendencia pigmentaria",
    descripcionLarga: "Crema despigmentante de día para todo tipo de pieles. Exclusiva fórmula que combina agentes despigmentantes para manchas y discromías con activos antiarrugas. Se funde con la piel sin aportar grasa dejando un aspecto aterciopelado. Protección solar baja.",
    beneficios: [
      "Atenúa el tono de la piel",
      "Despigmentante",
      "Hidratante y antiedad"
    ],
    ingredientes: "Factor Natural de Hidratación 5%, Isoflavonas de Soja Liposomadas 2%, Moléculas señal derivadas de la leche activadas y estabilizadas 5%, Glicerol 3%, Lisado de Bifidobacterias 5%, Aloe Vera, Activos de Bellis Perennis 4%, Polipéptido Bioactivos (Citoquinas) 0.5%, Filtro solar",
    presentacion: "50 ml",
    modo_uso: "Aplicar por la mañana como crema de día sobre cara, cuello y escote. Repetir la aplicación en caso de exposición solar intensa. Recomendamos aplicar protección solar máxima a diario.",
    precio: "30€",
    imagen: cremaPielManchas,
    alt: "Crema cuidado piel con manchas Lucy Lara"
  },
  "3": {
    id: 3,
    titulo: "Crema Despigmentante",
    descripcion: "Acción Despigmentante",
    descripcionLarga: "Crema despigmentante de noche para todo tipo de pieles. Su amplia variedad de activos permite tratar cosmetológicamente las manchas tanto faciales como corporales, generando un efecto clarificante significativo.",
    beneficios: [
      "Despigmentación",
      "Aclara las manchas localizadas y atenúa el tono de la piel"
    ],
    ingredientes: "Ácido Kójico 4%, Fitico 2%, Glicólico 2%, Arbutina 3%, Nicotinamida 1%. Extracto de Regaliz 0.1% y Péptidos Despigmentantes.",
    presentacion: "30 ml",
    modo_uso: "Aplicar por la noche sobre la mancha específica a tratar o repartir cuatro gotas entre frente, mejillas y barbilla y extender sin frotar en exceso. Recomendamos aplicar protección solar máxima a diario y no lavar el rostro con jabón para evitar resecar la piel en exceso. En caso de irritación, suspender temporalmente el tratamiento e intentar repetir su uso probando con menos cantidad.",
    precio: "28€",
    imagen: cremaDespigmentante,
    alt: "Crema despigmentante Lucy Lara"
  },
  "4": {
    id: 4,
    titulo: "Crema Efecto Seda",
    descripcion: "Reafirmante facial",
    descripcionLarga: "Crema Efecto Seda genera un efecto lifting inmediato. Previene y trata la flacidez facial devolviendo a la piel su luminosidad, tonificación y elasticidad. Su especial textura efecto seda es ideal como base de maquillaje.",
    beneficios: [
      "Reafirmación",
      "Luminosidad"
    ],
    ingredientes: "DMAE, Vitamina C, Ácido Tióctico, Glicerol, Aloe Vera y Vitamina E.",
    presentacion: "50 ml",
    modo_uso: "Aplicar por la mañana y por la noche sobre cara, cuello y escote. Su contenido en Vitamina C puede producir irritación en pieles sensibles.",
    precio: "39€",
    imagen: cremaEfectoSeda,
    alt: "Crema efecto seda Lucy Lara"
  },
  "5": {
    id: 5,
    titulo: "Crema Hidratante Oil-Free",
    descripcion: "Hidratación Facial Oil-Free Piel Grasa",
    descripcionLarga: "Hidratacion y cuidado de las pieles mixtas-grasas con tendencia acnéica. Regula y controla el exceso de grasa caracteristico de estas pieles. Con protección solar baja.",
    beneficios: [
      "Regulación de la piel mixta",
      "Hidronutricion"
    ],
    ingredientes: "Acido Glicólico tamponado 2%, Factor Natural de Hidratación 1%, Aloe Vera, Filtro Solar, Mimosa 5%, Calendula 2%, Alfa-Bisabolol 0.5%, Derivado de Aguacate seborregulador 0.9% y Base oil-free.",
    presentacion: "50 ml",
    modo_uso: "Aplicar por la mañana y por la noche con un suave masaje. Podría imitar si se aplica sobre una piel excesivamente desengrasada con jabón o soluciones alcohólicas.",
    precio: "40€",
    imagen: cremaHidratanteOilFree,
    alt: "Crema hidratante oil-free Lucy Lara"
  },
  "6": {
    id: 6,
    titulo: "Espuma Limpiadora",
    descripcion: "Mousse Limpiadora",
    descripcionLarga: "Es una mousse que permite limpiar a diario todo tipo de las pieles. Emulsiona perfectamente los residuos de la superficie de la piel (maquillaje, grasa), limpiándola en profundidad.",
    beneficios: [
      "Limpieza profunda",
      "Elimina maquillaje y grasa",
      "Apta para todo tipo de pieles"
    ],
    ingredientes: "Ácido Glicólico, Avena, Manzanilla y base Foam de limpieza.",
    presentacion: "150 ml",
    modo_uso: "Con el rostro humedecido, extender con las manos con un suave masaje. Retirar con abundante agua y aplicar Tónico Facial.",
    precio: "41€",
    imagen: espumaLimpiadora,
    alt: "Espuma limpiadora Lucy Lara"
  },
  "7": {
    id: 7,
    titulo: "Gel Rosa Mosqueta",
    descripcion: "Regenerador Celular",
    descripcionLarga: "Su uso diario regenera, recupera, hidrata, renueva y mejora las pieles más estropeadas, con imperfecciones y marcas cutáneas.",
    beneficios: [
      "Regenerador de piel",
      "Cicatrices y marcas"
    ],
    ingredientes: "Aceite de Rosa Mosqueta.",
    presentacion: "30 ml",
    modo_uso: "Aplicar por la mañana y por la noche con un suave masaje. A continuación, aplicar su crema habitual.",
    precio: "23€",
    imagen: gelRosaMosqueta,
    alt: "Gel Rosa Mosqueta Lucy Lara"
  },
  "8": {
    id: 8,
    titulo: "Leche Limpiadora Facial",
    descripcion: "Limpieza Facial Hidratante",
    descripcionLarga: "Limpieza y desmaquillado diario de todo tipo de pieles, incluso de las más sensibles. Combina perfectamente la eliminación de todas las impurezas y residuos que hay en la superficie de la piel (maquillaje, polución....) con su hidronutrición, manteniendo su integridad y equilibrio cutáneo.",
    beneficios: [
      "Desmaquillante"
    ],
    ingredientes: "Aceite Almendras Dulces 10%, Emolientes de Cadena Media 6%, Glicerina 5%, Extractos de Avena 3%, Manzanilla 3%, Siliconas hidratantes y Excipiente emoliente facial exento de ceras.",
    presentacion: "200 ml",
    modo_uso: "Aplicar con un algodón o disco desmaquillador en cara y cuello. Retirar con un disco desmaquillador húmedo y aplicar Tónico Facial. Uso diario.",
    precio: "45€",
    imagen: lecheLimpiadoraFacial,
    alt: "Leche limpiadora facial Lucy Lara"
  },
  "9": {
    id: 9,
    titulo: "Protector Solar 50+",
    descripcion: "Hidratación con Protección Solar",
    descripcionLarga: "Protección solar muy alta con color a base de filtros orgánicos e inorgánicos que garantizan una protección de la piel sobre la radiación solar UVA y UVB y su amplio espectro. Indicado para todo tipo de piel, su contenido en Colágeno y Ácido Hialurónico aporta hidratación y un efecto maquillaje con un tacto aterciopelado no graso.",
    beneficios: [
      "Protección UVA y UVB",
      "Efecto maquillaje",
      "Hidratación profunda",
      "Textura no grasa"
    ],
    ingredientes: "Filtros físicos y químicos, Ácido Hialurónico, Colágeno y Pigmentos que aportan color.",
    presentacion: "50 ml",
    modo_uso: "Aplicar por la mañana o cada vez que se precise. Reaplicar cada 2 horas en caso de exposición solar intensa.",
    precio: "36€",
    imagen: protectorSolar,
    alt: "Protector solar 50+ Lucy Lara"
  },
  "10": {
    id: 10,
    titulo: "Protector Solar 50+ Color",
    descripcion: "Hidratación con Protección Solar",
    descripcionLarga: "Protección solar muy alta con color a base de filtros orgánicos e inorgánicos que garantizan una protección de la piel sobre la radiación solar UVA y UVB y su amplio espectro. Indicado para todo tipo de piel, su contenido en Colágeno y Ácido Hialurónico aporta hidratación y un efecto maquillaje con un tacto aterciopelado no graso.",
    beneficios: [
      "Protección UVA y UVB",
      "Efecto maquillaje",
      "Hidratación profunda",
      "Textura no grasa"
    ],
    ingredientes: "Filtros físicos y químicos, Ácido Hialurónico, Colágeno y Pigmentos que aportan color.",
    presentacion: "50 ml",
    modo_uso: "Aplicar por la mañana o cada vez que se precise. Reaplicar cada 2 horas en caso de exposición solar intensa.",
    precio: "37€",
    imagen: protectorSolarColor,
    alt: "Protector solar con color Lucy Lara"
  },
  "11": {
    id: 11,
    titulo: "Sérum Vitamina C",
    descripcion: "Sérum Efecto Lifting",
    descripcionLarga: "Sérum de día y de noche de efecto lifting inmediato para todo tipo de pieles. Previene y trata las arrugas y el envejecimiento. Recupera las pieles apagadas y fatigadas, devolviéndoles su luz natural.",
    beneficios: [
      "Efecto lifting",
      "Luminosidad",
      "Antiarrugas"
    ],
    ingredientes: "Vitamina C 4%, Ginkgo Biloba 1%, DMAE 2% y Phytoproteoglycanos 15%",
    presentacion: "30 ml",
    modo_uso: "Aplicar por la mañana y por la noche con un suave masaje. A continuación, aplicar su crema habitual.",
    precio: "28€",
    imagen: serumVitaminaC,
    alt: "Sérum Vitamina C Lucy Lara"
  },
  "12": {
    id: 12,
    titulo: "Tónico Facial",
    descripcion: "Tonifica y Equilibra el Cutis",
    descripcionLarga: "Es el complemento de limpieza facial diario para todo tipo de pieles que aportan un efecto fresco, descongestivo y de hidratación único.",
    beneficios: [
      "Reequilibra la piel",
      "Tonificación"
    ],
    ingredientes: "Extracto de Manzanilla 10%, Agua de Rosas 2,5%, Glicerol 5% y Agua Termal.",
    presentacion: "200 ml",
    modo_uso: "Aplicar con un algodón o disco desmaquillador dando ligeros toques por todo el rostro y cuello.",
    precio: "38€",
    imagen: protectorSolar, // Imagen temporal
    alt: "Tónico facial Lucy Lara"
  }
};

const ProductDetail = () => {
  const [, params] = useRoute("/productos/:id");
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params && params.id) {
      // Simulamos una carga de datos
      setTimeout(() => {
        setProducto(productosData[params.id]);
        setLoading(false);
      }, 500);
    }
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-semibold mb-4">Producto no encontrado</h1>
        <p className="mb-6">Lo sentimos, el producto que buscas no está disponible.</p>
        <Link href="/#productos" className="bg-accent hover:bg-accentDark text-white px-6 py-2 rounded-full transition-colors inline-flex items-center">
          <ArrowLeft size={16} className="mr-2" />
          Volver a productos
        </Link>
      </div>
    );
  }

  return (
    <div className="font-inter text-textDark bg-neutral min-h-screen">
      <Helmet>
        <title>{producto.titulo} - Centro de Estética Lucy Lara</title>
        <meta name="description" content={producto.descripcionLarga.substring(0, 160)} />
      </Helmet>
      
      <Header />
      
      <main className="pt-32 pb-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Navegación de regreso */}
          <Link 
            href="/#productos" 
            className="inline-flex items-center text-accent hover:text-accentDark mb-8 transition-colors" 
            onClick={(e) => {
              // Esto asegura que volvamos a la página principal y luego nos desplacemos a la sección de productos
              window.location.href = "/#productos";
              e.preventDefault(); // Prevenir comportamiento predeterminado de Link
            }}
          >
            <ArrowLeft size={16} className="mr-2" />
            Volver a productos
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Imagen del producto */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8 flex items-center justify-center"
            >
              <img 
                src={producto.imagen} 
                alt={producto.alt} 
                className="max-w-full max-h-[500px] object-contain"
              />
            </motion.div>
            
            {/* Información del producto */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="font-playfair text-3xl md:text-4xl font-semibold mb-4">
                {producto.titulo}
              </h1>
              
              <p className="text-accent text-2xl font-medium mb-6">{producto.precio}</p>
              
              <div className="mb-8">
                <h2 className="font-medium text-lg mb-3">Descripción</h2>
                <p className="text-textLight">{producto.descripcionLarga}</p>
              </div>
              
              <div className="mb-8">
                <h2 className="font-medium text-lg mb-3">Beneficios</h2>
                <ul className="list-disc pl-5 text-textLight space-y-1">
                  {producto.beneficios.map((beneficio: string, index: number) => (
                    <li key={index}>{beneficio}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-8">
                <h2 className="font-medium text-lg mb-3">Ingredientes activos</h2>
                <p className="text-textLight">{producto.ingredientes}</p>
              </div>
              
              {producto.presentacion && (
                <div className="mb-8">
                  <h2 className="font-medium text-lg mb-3">Presentación</h2>
                  <p className="text-textLight">{producto.presentacion}</p>
                </div>
              )}
              
              <div className="mb-8">
                <h2 className="font-medium text-lg mb-3">Modo de uso</h2>
                <p className="text-textLight">{producto.modo_uso}</p>
              </div>
              
              <button className="bg-accent hover:bg-accentDark text-white px-8 py-3 rounded-full transition-colors inline-flex items-center">
                <ShoppingCart size={18} className="mr-2" />
                Añadir al carrito
              </button>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;