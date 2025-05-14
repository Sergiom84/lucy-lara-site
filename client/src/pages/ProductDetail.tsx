import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import cremaContornoOjos from "../assets/images/Crema_cortono_de_ojos.png";

interface Producto {
  id: number;
  titulo: string;
  descripcion: string;
  descripcionLarga: string;
  beneficios: string[];
  ingredientes: string;
  modo_uso: string;
  precio: string;
  imagen: string;
  alt: string;
}

interface ProductosData {
  [key: string]: Producto;
}

// En un proyecto real, esta información vendría de una API o base de datos
const productosData: ProductosData = {
  "1": {
    id: 1,
    titulo: "Crema Contorno de Ojos",
    descripcion: "Lifting periocular. Reductor de bolsas.",
    descripcionLarga: "Crema lifting periocular reductor de bolsas, formulada para el cuidado antiarrugas y la disminución de ojeras y bolsas. Trata los principales signos del envejecimiento del área periocular —arrugas finas, surcos, patas de gallo, líneas de expresión, bolsas y ojeras— relajando la musculatura y aportando un efecto lifting.",
    beneficios: [
      "Cuidado antiarrugas",
      "Reducción visible de bolsas y ojeras",
      "Efecto lifting inmediato",
      "Relaja y tonifica la zona periocular"
    ],
    ingredientes: "Colágeno Natural, Ácido Hialurónico de bajo peso molecular, Matrixyl 3000®, Rhamnosoft®, Argireline®, Eyeseryl®, Alfa-Bisabolol, Aceite de Germen de Trigo y Aceite. 30 ml",
    modo_uso: "Aplicar a toques por la mañana y por la noche sobre el contorno de los ojos.",
    precio: "35€",
    imagen: cremaContornoOjos,
    alt: "Crema contorno de ojos Lucy Lara"
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
          <Link href="/#productos" className="inline-flex items-center text-accent hover:text-accentDark mb-8 transition-colors">
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