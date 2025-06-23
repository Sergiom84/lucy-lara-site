import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, CheckCircle } from "lucide-react";
import { Link, useParams } from "wouter";
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
  descripcionLarga: string;
  pasos: string[];
  beneficios: string[];
  imagen: string;
  alt: string;
}

const tratamientosFaciales: TratamientoFacial[] = [
  {
    id: 1,
    nombre: "Renovación profunda - higiene facial completa",
    precio: "61,00€",
    duracion: "60 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento de limpieza profunda que hidrata, revitaliza y equilibra la piel.",
    descripcionLarga: "Tratamiento de limpieza profunda que hidrata, revitaliza y equilibra la piel. Sus pasos son limpieza de la piel junto con su tonificación, exfoliación mecánica, extracción de comedones para una oxigenación y limpieza de la piel, masaje relajante junto con una mascarilla acorde de las necesidades de la piel y acabamos el tratamiento con una crema finalizadora.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Exfoliación mecánica",
      "Extracción de comedones para una oxigenación y limpieza de la piel",
      "Masaje relajante junto con una mascarilla acorde de las necesidades de la piel",
      "Acabamos el tratamiento con una crema finalizadora"
    ],
    beneficios: [
      "Hidrata la piel en profundidad",
      "Revitaliza y equilibra la piel",
      "Oxigena y limpia los poros",
      "Elimina impurezas y comedones",
      "Proporciona nutrición específica según tipo de piel"
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
    descripcionLarga: "Tratamiento de limpieza profunda que hidrata, pule y oxigena. Sus pasos son limpieza de la piel junto con su tonificación, extracción de comedones para una oxigenación y limpieza de la piel, microdermoabrasión que exfolia en profundidad, suaviza la textura de la piel y aporta luminosidad, eliminando las células muertas e imperfecciones, finalizando este paso llegamos al momento más deseado, masaje relajante junto con una mascarilla acorde de las necesidades de la piel y acabamos el tratamiento con una crema finalizadora.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Extracción de comedones para una oxigenación y limpieza de la piel",
      "Microdermoabrasión que exfolia en profundidad, suaviza la textura de la piel y aporta luminosidad",
      "Eliminación de células muertas e imperfecciones",
      "Masaje relajante junto con una mascarilla acorde de las necesidades de la piel",
      "Acabamos el tratamiento con una crema finalizadora"
    ],
    beneficios: [
      "Exfolia en profundidad eliminando células muertas",
      "Suaviza la textura de la piel",
      "Aporta luminosidad y brillo natural",
      "Elimina imperfecciones superficiales",
      "Estimula la renovación celular"
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
    descripcionLarga: "Tratamiento de limpieza profunda que hidrata, revitaliza y equilibra la piel. Sus pasos son limpieza de la piel junto con su tonificación, exfoliación mecánica, extracción de comedones para una oxigenación y limpieza de la piel, gafas de presoterapia que reducen bolsas, ojeras y fatiga ocular con un masaje que ayuda a relajar y descongestionar esta zona tan sensible, masaje relajante junto con una mascarilla acorde de las necesidades de la piel y acabamos el tratamiento con una crema finalizadora.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Exfoliación mecánica",
      "Extracción de comedones para una oxigenación y limpieza de la piel",
      "Gafas de presoterapia que reducen bolsas, ojeras y fatiga ocular",
      "Masaje que ayuda a relajar y descongestionar esta zona tan sensible",
      "Masaje relajante junto con una mascarilla acorde de las necesidades de la piel",
      "Acabamos el tratamiento con una crema finalizadora"
    ],
    beneficios: [
      "Reduce bolsas y ojeras",
      "Alivia la fatiga ocular",
      "Mejora la circulación en la zona del contorno de ojos",
      "Proporciona un efecto relajante",
      "Hidrata y revitaliza la piel facial"
    ],
    imagen: luzCalmanteImg,
    alt: "Luz calmante - fotoestimulación para la piel sensible"
  },
  {
    id: 4,
    nombre: "Equilibrio total - higiene facial con presoterapia",
    precio: "79,00€",
    duracion: "80 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento de limpieza profunda que hidrata, revitaliza la cara y el cuerpo.",
    descripcionLarga: "Tratamiento de limpieza profunda que hidrata, revitaliza la cara y el cuerpo. Sus pasos son presoterapia en piernas que activa la circulación, ayuda a eliminar líquidos y toxinas proporcionando un efecto relajante, limpieza de la piel junto con su tonificación, exfoliación mecánica, extracción de comedones para una oxigenación y limpieza de la piel, masaje relajante junto con una mascarilla acorde de las necesidades de la piel y acabamos el tratamiento con una crema finalizadora.",
    pasos: [
      "Presoterapia en piernas que activa la circulación",
      "Ayuda a eliminar líquidos y toxinas proporcionando un efecto relajante",
      "Limpieza de la piel junto con su tonificación",
      "Exfoliación mecánica",
      "Extracción de comedones para una oxigenación y limpieza de la piel",
      "Masaje relajante junto con una mascarilla acorde de las necesidades de la piel",
      "Acabamos el tratamiento con una crema finalizadora"
    ],
    beneficios: [
      "Activa la circulación sanguínea y linfática",
      "Ayuda a eliminar líquidos y toxinas",
      "Combina relajación facial y corporal",
      "Proporciona bienestar integral",
      "Revitaliza tanto el rostro como las piernas"
    ],
    imagen: eternaJuventudImg,
    alt: "Eterna Juventud 2 en 1"
  },
  {
    id: 5,
    nombre: "Pureza y frescura - higiene facial",
    precio: "55,00€",
    duracion: "45 min",
    frecuencia: "Según necesidad",
    descripcion: "Higiene facial básica, hidratante y revitalizante.",
    descripcionLarga: "Higiene facial básica, hidratante y revitalizante. Este tratamiento incluye una limpieza profunda y tonificación de la piel, seguida de una exfoliación mecánica suave que elimina las células muertas. Finalizamos con un masaje relajante y una mascarilla adaptada al tipo de piel, terminando con una crema hidratante que proporciona frescura y vitalidad duradera.",
    pasos: [
      "Limpieza profunda, tonificación",
      "Exfoliación mecánica",
      "Masaje relajante, mascarilla adaptada",
      "Crema final para hidratación duradera"
    ],
    beneficios: [
      "Limpia e hidrata la piel",
      "Aporta frescura y luminosidad",
      "Hidratación profunda y duradera",
      "Ideal para pieles sensibles",
      "No requiere extracción",
      "Aporta frescura y vitalidad"
    ],
    imagen: higieneSupremaImg,
    alt: "Higiene Facial Suprema"
  },
  {
    id: 6,
    nombre: "Pureza y frescura - higiene facial",
    precio: "89,00€",
    duracion: "75 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento de limpieza profunda que hidrata, revitaliza y equilibra la piel.",
    descripcionLarga: "Tratamiento de limpieza profunda que hidrata, revitaliza y equilibra la piel. Sus pasos son limpieza de la piel junto con su tonificación, exfoliación mecánica, extracción de comedones para una oxigenación y limpieza de la piel, realizando la higiene comenzaremos con el tratamiento de fotoestimulación Led, que activa la regeneración celular, mejora la hidratación y aporta un efecto calmante, dejando la piel revitalizada y luminosa, masaje relajante junto con una mascarilla acorde de las necesidades de la piel y acabamos el tratamiento con una crema finalizadora.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Exfoliación mecánica",
      "Extracción de comedones para una oxigenación y limpieza de la piel",
      "Realizando la higiene comenzaremos con el tratamiento de fotoestimulación Led",
      "Que activa la regeneración celular, mejora la hidratación y aporta un efecto calmante",
      "Dejando la piel revitalizada y luminosa",
      "Masaje relajante junto con una mascarilla acorde de las necesidades de la piel",
      "Acabamos el tratamiento con una crema finalizadora"
    ],
    beneficios: [
      "Regeneración celular acelerada",
      "Reducción de líneas de expresión",
      "Mejora significativa de la luminosidad",
      "Hidratación profunda y duradera",
      "Efecto anti-edad y revitalizante",
      "Piel visiblemente más joven y saludable"
    ],
    imagen: luzCalmanteImg,
    alt: "Luz calmante - fotoestimulación para la piel sensible"
  },
  {
    id: 7,
    nombre: "Brisa de seda - higiene facial suave",
    precio: "55,00€",
    duracion: "45 min",
    frecuencia: "Según necesidad",
    descripcion: "Higiene facial sin extracción que hidrata, suaviza y regenera la piel sensible.",
    descripcionLarga: "Higiene facial sin extracción especialmente diseñada para pieles sensibles que necesitan cuidado delicado. Este tratamiento hidrata, suaviza y regenera la piel sin agredir, proporcionando una sensación de seda y máximo confort.",
    pasos: [
      "Limpieza suave y tonificación adaptada",
      "Peeling enzimático que elimina células muertas sin agredir",
      "Aplicación de ampolla regeneradora específica",
      "Masaje ultra suave que estimula la microcirculación",
      "Mascarilla calmante y reparadora",
      "Crema final con efecto seda para máxima suavidad"
    ],
    beneficios: [
      "Limpieza suave sin irritación",
      "Hidratación intensa para pieles sensibles",
      "Regeneración celular sin agresión",
      "Elimina impurezas sin agredir",
      "Mantiene el equilibrio natural de la piel",
      "Aporta frescura y suavidad",
      "Ideal para pieles sensibles y reactivas",
      "Efecto refrescante y reparador"
    ],
    imagen: higieneSupremaImg,
    alt: "Higiene Facial Suprema"
  },
  {
    id: 8,
    nombre: "Calma profunda - higiene facial completa",
    precio: "61,00€",
    duracion: "60 min",
    frecuencia: "1 vez al mes",
    descripcion: "Un tratamiento de limpieza profunda adaptado a pieles sensibles.",
    descripcionLarga: "Un tratamiento de limpieza profunda especialmente adaptado a pieles sensibles. Sus pasos son limpieza de la piel junto con su tonificación, peeling enzimático, extracción cuidadosa para liberar los poros, seguido de un masaje relajante junto con una mascarilla calmante y finalizaremos el tratamiento con una crema refrescante y reparadora que calma, reduce las rojeces y fortalece la barrera cutánea.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Peeling enzimático",
      "Extracción cuidadosa para liberar los poros",
      "Seguido de un masaje relajante junto con una mascarilla calmante",
      "Finalizaremos el tratamiento con una crema refrescante y reparadora",
      "Que calma, reduce las rojeces y fortalece la barrera cutánea"
    ],
    beneficios: [
      "Limpieza profunda adaptada a pieles sensibles",
      "Reducción de rojeces e irritaciones",
      "Fortalecimiento de la barrera cutánea",
      "Efecto calmante y reparador",
      "Hidratación específica para pieles reactivas",
      "Mejora la tolerancia de la piel"
    ],
    imagen: higieneSupremaImg,
    alt: "Higiene Facial Suprema"
  },
  {
    id: 9,
    nombre: "Higiene Facial Suprema",
    precio: "71,00€",
    duracion: "70 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento de limpieza profunda que hidrata, revitaliza y equilibra la piel.",
    descripcionLarga: "Tratamiento de limpieza profunda que hidrata, revitaliza y equilibra la piel. Sus pasos son limpieza de la piel junto con su tonificación, exfoliación mecánica, extracción de comedones para una oxigenación y limpieza de la piel, ampolla con principios activos específicos según tipo de piel, aparatología de electroestimulación que tonifica y reafirma, masaje relajante junto con una mascarilla acorde de las necesidades de la piel y acabamos el tratamiento con una crema finalizadora.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Exfoliación mecánica",
      "Extracción de comedones para una oxigenación y limpieza de la piel",
      "Ampolla con principios activos específicos según tipo de piel",
      "Aparatología de electroestimulación que tonifica y reafirma",
      "Masaje relajante junto con una mascarilla acorde de las necesidades de la piel",
      "Acabamos el tratamiento con una crema finalizadora"
    ],
    beneficios: [
      "Limpieza profunda completa",
      "Tonificación y reafirmación facial",
      "Nutrición específica según tipo de piel",
      "Estimulación de la microcirculación",
      "Mejora del tono y elasticidad",
      "Hidratación profunda y equilibrio cutáneo"
    ],
    imagen: higieneSupremaImg,
    alt: "Higiene Facial Suprema"
  },
  {
    id: 10,
    nombre: "Luz calmante - fotoestimulación para la piel sensible",
    precio: "79,00€",
    duracion: "80 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento avanzado que combina higiene facial con fotoestimulación LED.",
    descripcionLarga: "Tratamiento avanzado que combina higiene facial con fotoestimulación LED. Sus pasos son limpieza de la piel junto con su tonificación, exfoliación mecánica suave, extracción cuidadosa adaptada a pieles sensibles, aplicación de fotoestimulación LED que calma y regenera, reduce rojeces y proporciona un efecto antiinflamatorio, masaje ultra relajante con productos específicos, mascarilla calmante de última generación y acabamos con una crema reparadora y protectora.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Exfoliación mecánica suave",
      "Extracción cuidadosa adaptada a pieles sensibles",
      "Aplicación de fotoestimulación LED que calma y regenera",
      "Reduce rojeces y proporciona un efecto antiinflamatorio",
      "Masaje ultra relajante con productos específicos",
      "Mascarilla calmante de última generación",
      "Acabamos con una crema reparadora y protectora"
    ],
    beneficios: [
      "Fotoestimulación LED terapéutica",
      "Reducción de rojeces e inflamación",
      "Regeneración celular acelerada",
      "Efecto calmante inmediato",
      "Ideal para pieles sensibles y reactivas",
      "Mejora la textura y luminosidad"
    ],
    imagen: luzCalmanteImg,
    alt: "Luz calmante - fotoestimulación para la piel sensible"
  },
  {
    id: 11,
    nombre: "Ice Skin - crioterapia facial",
    precio: "89,00€",
    duracion: "90 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento revolucionario de crioterapia que reafirma, tonifica y rejuvenece.",
    descripcionLarga: "Tratamiento revolucionario de crioterapia que reafirma, tonifica y rejuvenece. Sus pasos son limpieza profunda y análisis de la piel, preparación de la piel con productos específicos, aplicación controlada de crioterapia facial, que estimula la producción de colágeno y elastina, reafirma los tejidos y reduce la flacidez, masaje revitalizante post-tratamiento, mascarilla nutritiva intensiva y protección final con cremas de alta gama.",
    pasos: [
      "Limpieza profunda y análisis de la piel",
      "Preparación de la piel con productos específicos",
      "Aplicación controlada de crioterapia facial",
      "Que estimula la producción de colágeno y elastina",
      "Reafirma los tejidos y reduce la flacidez",
      "Masaje revitalizante post-tratamiento",
      "Mascarilla nutritiva intensiva",
      "Protección final con cremas de alta gama"
    ],
    beneficios: [
      "Estimulación natural del colágeno",
      "Reafirmación visible de los tejidos",
      "Reducción de la flacidez facial",
      "Mejora del tono y elasticidad",
      "Efecto lifting inmediato",
      "Rejuvenecimiento integral"
    ],
    imagen: iceSkinImg,
    alt: "Ice Skin - crioterapia facial"
  },
  {
    id: 12,
    nombre: "Eterna Juventud 2 en 1",
    precio: "99,00€",
    duracion: "90 min",
    frecuencia: "1 vez al mes",
    descripcion: "El tratamiento más completo que combina tecnología avanzada y técnicas manuales.",
    descripcionLarga: "El tratamiento más completo que combina tecnología avanzada y técnicas manuales. Sus pasos son análisis completo de la piel, limpieza profunda con productos premium, doble exfoliación: mecánica y química, extracción profesional con técnicas avanzadas, aplicación de tecnología de radiofrecuencia, fotoestimulación LED personalizada, masaje antienvejecimiento con técnicas orientales, mascarilla de oro o caviar según necesidades, aplicación de sérum con ácido hialurónico y finalización con crema antiedad de lujo.",
    pasos: [
      "Análisis completo de la piel",
      "Limpieza profunda con productos premium",
      "Doble exfoliación: mecánica y química",
      "Extracción profesional con técnicas avanzadas",
      "Aplicación de tecnología de radiofrecuencia",
      "Fotoestimulación LED personalizada",
      "Masaje antienvejecimiento con técnicas orientales",
      "Mascarilla de oro o caviar según necesidades",
      "Aplicación de sérum con ácido hialurónico",
      "Finalización con crema antiedad de lujo"
    ],
    beneficios: [
      "Combinación de múltiples tecnologías",
      "Resultados antienvejecimiento visibles",
      "Hidratación profunda con ácido hialurónico",
      "Estimulación del colágeno y elastina",
      "Experiencia de lujo y relajación",
      "Tratamiento integral cara y cuello"
    ],
    imagen: eternaJuventudImg,
    alt: "Eterna Juventud 2 en 1"
  },
  {
    id: 2,
    nombre: "Renovación de cristal - higiene facial completa con microdermoabrasión",
    precio: "71,00€",
    duracion: "70 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento de limpieza profunda que hidrata, pule y oxigena.",
    descripcionLarga: "Tratamiento de limpieza profunda que hidrata, pule y oxigena. Sus pasos son limpieza de la piel junto con su tonificación, extracción de comedones para una oxigenación y limpieza de la piel, microdermoabrasión que exfolia en profundidad, suaviza la textura de la piel y aporta luminosidad, eliminando las células muertas e imperfecciones, finalizando este paso llegamos al momento más deseado, masaje relajante junto con una mascarilla acorde de las necesidades de la piel y acabamos el tratamiento con una crema finalizadora.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Extracción de comedones para una oxigenación y limpieza de la piel",
      "Microdermoabrasión que exfolia en profundidad",
      "Masaje relajante junto con una mascarilla",
      "Acabamos el tratamiento con una crema finalizadora"
    ],
    beneficios: [
      "Exfolia en profundidad eliminando células muertas",
      "Suaviza la textura de la piel",
      "Aporta luminosidad y brillo natural",
      "Elimina imperfecciones superficiales",
      "Estimula la renovación celular"
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
    descripcionLarga: "Tratamiento de limpieza profunda que hidrata, revitaliza y equilibra la piel. Sus pasos son limpieza de la piel junto con su tonificación, exfoliación mecánica, extracción de comedones para una oxigenación y limpieza de la piel, gafas de presoterapia que reducen bolsas, ojeras y fatiga ocular con un masaje que ayuda a relajar y descongestionar esta zona tan sensible, masaje relajante junto con una mascarilla acorde de las necesidades de la piel y acabamos el tratamiento con una crema finalizadora.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Exfoliación mecánica",
      "Extracción de comedones",
      "Gafas de presoterapia que reducen bolsas, ojeras y fatiga ocular"
    ],
    beneficios: [
      "Reduce bolsas y ojeras",
      "Alivia la fatiga ocular",
      "Mejora la circulación en la zona del contorno de ojos",
      "Proporciona un efecto relajante",
      "Hidrata y revitaliza la piel facial"
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
    descripcionLarga: "Tratamiento de limpieza profunda que hidrata, revitaliza la cara y el cuerpo. Sus pasos son presoterapia en piernas que activa la circulación, ayuda a eliminar líquidos y toxinas proporcionando un efecto relajante, limpieza de la piel junto con su tonificación, exfoliación mecánica, extracción de comedones para una oxigenación y limpieza de la piel, masaje relajante junto con una mascarilla acorde de las necesidades de la piel y acabamos el tratamiento con una crema finalizadora.",
    pasos: [
      "Presoterapia en piernas que activa la circulación",
      "Higiene facial completa",
      "Masaje relajante con mascarilla",
      "Acabamos con crema finalizadora"
    ],
    beneficios: [
      "Activa la circulación sanguínea y linfática",
      "Ayuda a eliminar líquidos y toxinas",
      "Combina relajación facial y corporal",
      "Proporciona bienestar integral",
      "Revitaliza tanto el rostro como las piernas"
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
    descripcionLarga: "Higiene facial básica, hidratante y revitalizante. Este tratamiento incluye una limpieza profunda y tonificación de la piel, seguida de una exfoliación mecánica suave que elimina las células muertas. Finalizamos con un masaje relajante y una mascarilla adaptada al tipo de piel, terminando con una crema hidratante que proporciona frescura y vitalidad duradera.",
    pasos: [
      "Limpieza profunda, tonificación",
      "Exfoliación mecánica",
      "Masaje relajante, mascarilla adaptada",
      "Crema final para hidratación duradera"
    ],
    beneficios: [
      "Limpia e hidrata la piel",
      "Aporta frescura y luminosidad",
      "Hidratación profunda y duradera",
      "Ideal para pieles sensibles",
      "No requiere extracción",
      "Aporta frescura y vitalidad"
    ],
    imagen: higieneSupremaImg,
    alt: "Higiene Facial Suprema"
  }
];

const TratamientoDetail = () => {
  const params = useParams();
  const id = Number(params.id);
  const tratamiento = tratamientosFaciales.find(t => t.id === id);

  if (!tratamiento) {
    return (
      <>
        <Header />
        <main className="pt-[8rem] pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Tratamiento no encontrado</h1>
            <Link href="/tratamientos-faciales">
              <button className="bg-accent text-white px-6 py-3 rounded-lg">
                Volver a tratamientos
              </button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{tratamiento.nombre} - Centro de Estética Lucy Lara</title>
        <meta name="description" content={tratamiento.descripcion} />
        <meta name="keywords" content={`${tratamiento.nombre}, tratamiento facial, Madrid, Centro Lucy Lara`} />
      </Helmet>
      
      <Header />
      
      <main className="pt-[8rem] pb-16 bg-gradient-to-br from-neutral via-white to-neutral">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link href="/tratamientos-faciales" className="inline-flex items-center text-textLight hover:text-accent transition-colors">
              <ArrowLeft className="mr-2" size={16} />
              Volver a tratamientos faciales
            </Link>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={tratamiento.imagen} 
                  alt={tratamiento.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h1 className="font-playfair text-3xl md:text-4xl font-semibold mb-4 text-accent">
                  {tratamiento.nombre}
                </h1>
                <p className="text-textLight text-lg leading-relaxed">
                  {tratamiento.descripcionLarga}
                </p>
              </div>

              {/* Price and Details */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-1">{tratamiento.precio}</div>
                    <div className="text-sm text-textLight">Precio</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-textDark mb-1">
                      <Clock size={20} className="mr-2 text-accent" />
                      {tratamiento.duracion || "60 min"}
                    </div>
                    <div className="text-sm text-textLight">Duración</div>
                  </div>
                </div>
                <div className="text-center pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-center text-textDark mb-1">
                    <Calendar size={20} className="mr-2 text-accent" />
                    {tratamiento.frecuencia}
                  </div>
                  <div className="text-sm text-textLight">Frecuencia recomendada</div>
                </div>
              </div>

              {/* CTA Button */}
              <Link href="/#reserva">
                <button className="w-full bg-accent hover:bg-accentDark text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-300">
                  Reservar este tratamiento
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Steps and Benefits */}
          <div className="grid md:grid-cols-2 gap-12 mt-16">
            {/* Steps */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="font-playfair text-2xl font-semibold mb-6 text-accent">
                Pasos del tratamiento
              </h2>
              <div className="space-y-4">
                {tratamiento.pasos.map((paso, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                      {index + 1}
                    </div>
                    <p className="text-textDark leading-relaxed">{paso}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="font-playfair text-2xl font-semibold mb-6 text-accent">
                Beneficios
              </h2>
              <div className="space-y-3">
                {tratamiento.beneficios.map((beneficio, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle size={20} className="text-accent mr-3 mt-1 flex-shrink-0" />
                    <p className="text-textDark leading-relaxed">{beneficio}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div 
            className="mt-16 text-center bg-accent/5 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="font-playfair text-2xl font-semibold mb-4 text-accent">
              ¿Te interesa este tratamiento?
            </h2>
            <p className="text-textLight mb-6 max-w-2xl mx-auto">
              Reserva tu cita y déjanos cuidar de tu piel con nuestros tratamientos profesionales.
              Nuestro equipo estará encantado de asesorarte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#reserva">
                <button className="bg-accent hover:bg-accentDark text-white py-3 px-8 rounded-lg font-semibold transition-colors duration-300">
                  Reservar cita
                </button>
              </Link>
              <Link href="/tratamientos-faciales">
                <button className="border border-accent text-accent hover:bg-accent hover:text-white py-3 px-8 rounded-lg font-semibold transition-colors duration-300">
                  Ver más tratamientos
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default TratamientoDetail;