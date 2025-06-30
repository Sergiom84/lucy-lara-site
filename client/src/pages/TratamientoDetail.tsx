import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, CheckCircle } from "lucide-react";
import { Link, useParams } from "wouter";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Booking from "@/components/Booking";
import renovacionProfundaImg from "@assets/Renovación profunda - higiene facial completa_1751276942402.png";
import renovacionCristalImg from "@assets/Renovación de cristal - higiene facial completa con microdermoabrasion._1751276942401.jpg";
import purezaFrescuraImg from "@assets/Pureza y frescura - higiene facial_1751276942401.png";
import luzCalmanteImg from "@assets/Luz calmante - fotobioestimulación para la piel sensible._1751276942398.png";
import ritualSerenidadImg from "@assets/Ritual serenidad - hig. facial + fotobioestimulación + cuidado específico._1751276942391.png";
import stopAcneImg from "@assets/Stop acné - higiene facial completa + fotobioestimulación_1751276942392.png";
import descansoVitalidadImg from "@assets/Descanso y vitalidad - higiene facial completa con presoterapia ocular._1751276942394.png";
import equilibrioPuroImg from "@assets/Equilibrio puro - tratamiento cosmético regulador._1751276942396.png";
import luzAntiacneImg from "@assets/Luz antiacne - tratamiento intensivo bioestimulación._1751276942396.png";
import luzPuraImg from "@assets/Luz pura - hig. facial completa + microdermoabrasion + cosmética antimanchas._1751276942399.png";
import purezaEquilibranteImg from "@assets/Pureza equilibrante - higiene facial suave._1751276942400.png";
import descansoVitalidadSvg from "@/assets/svg/descanso-vitalidad.svg";
import equilibrioTotalSvg from "@/assets/svg/equilibrio-total.svg";
import tratamientosGeneralImg from "@assets/image_1750692562300.png";
import purezaCompletaSvg from "@/assets/svg/pureza-completa.svg";

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
    imagen: renovacionProfundaImg,
    alt: "Renovación profunda - higiene facial completa"
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
      "Eliminando las células muertas e imperfecciones",
      "Masaje relajante junto con una mascarilla acorde de las necesidades de la piel",
      "Acabamos el tratamiento con una crema finalizadora"
    ],
    beneficios: [
      "Exfoliación profunda y efectiva",
      "Suaviza la textura de la piel",
      "Aporta luminosidad",
      "Elimina células muertas e imperfecciones",
      "Hidrata, pule y oxigena la piel"
    ],
    imagen: renovacionCristalImg,
    alt: "Renovación de cristal con microdermoabrasión"
  },
  {
    id: 3,
    nombre: "Descanso y vitalidad - higiene facial completa con presoterapia ocular",
    precio: "71,00€",
    duracion: "70 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento de limpieza profunda que hidrata, revitaliza y equilibra la piel.",
    descripcionLarga: "Tratamiento de limpieza profunda que hidrata, revitaliza y equilibra la piel. Sus pasos son limpieza de la piel junto con su tonificación, exfoliación mecánica, extracción de comedones para una oxigenación y limpieza de la piel, finalizaremos el tratamiento con las gafas de presoterapia, que reducen bolsas, ojeras y fatiga ocular, dejando la mirada más luminosa y descansada.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Exfoliación mecánica",
      "Extracción de comedones para una oxigenación y limpieza de la piel",
      "Finalizaremos el tratamiento con las gafas de presoterapia",
      "Reducen bolsas, ojeras y fatiga ocular, dejando la mirada más luminosa y descansada"
    ],
    beneficios: [
      "Reduce bolsas y ojeras",
      "Elimina la fatiga ocular",
      "Deja la mirada más luminosa y descansada",
      "Hidrata y revitaliza la piel",
      "Oxigena y limpia los poros"
    ],
    imagen: descansoVitalidadImg,
    alt: "Descanso y vitalidad con presoterapia ocular"
  },
  {
    id: 4,
    nombre: "Equilibrio total - higiene facial con presoterapia",
    precio: "79€",
    duracion: "80 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento de limpieza profunda que hidrata, revitaliza la cara y el cuerpo.",
    descripcionLarga: "Tratamiento de limpieza profunda que hidrata, revitaliza la cara y el cuerpo. El tratamiento va acompañado de presoterapia en piernas, que activa la circulación, reduce la retención de líquidos y proporciona una sensación de ligereza y bienestar integral. La higiene consta en limpieza de la piel junto con su tonificación, exfoliación mecánica, extracción de comedones para una oxigenación y limpieza de la piel, masaje relajante junto con una mascarilla acorde de las necesidades de la piel y acabamos el tratamiento con una crema finalizadora.",
    pasos: [
      "El tratamiento va acompañado de presoterapia en piernas",
      "Activa la circulación, reduce la retención de líquidos y proporciona una sensación de ligereza y bienestar integral",
      "La higiene consta en limpieza de la piel junto con su tonificación",
      "Exfoliación mecánica, extracción de comedones para una oxigenación y limpieza de la piel",
      "Masaje relajante junto con una mascarilla acorde de las necesidades de la piel",
      "Acabamos el tratamiento con una crema finalizadora"
    ],
    beneficios: [
      "Activa la circulación",
      "Reduce la retención de líquidos",
      "Proporciona sensación de ligereza y bienestar integral",
      "Hidrata y revitaliza cara y cuerpo",
      "Oxigena y limpia la piel facial"
    ],
    imagen: equilibrioTotalSvg,
    alt: "Equilibrio total con presoterapia"
  },
  {
    id: 5,
    nombre: "Pureza y frescura - higiene facial",
    precio: "55€",
    duracion: "45 min",
    frecuencia: "Según necesidad",
    descripcion: "Higiene facial básica, hidratante y revitalizante.",
    descripcionLarga: "Higiene facial básica, hidratante y revitalizante. El ritual esencial para limpiar y revitalizar la piel sin extracción. Incluye limpieza profunda, tonificación, exfoliación mecánica, aplicación de ampolla hidratante, masaje relajante, mascarilla adaptada a tu piel y crema final para una hidratación duradera. Tratamiento para pieles que no necesiten una limpieza en profundidad.",
    pasos: [
      "El ritual esencial para limpiar y revitalizar la piel sin extracción",
      "Incluye limpieza profunda, tonificación",
      "Exfoliación mecánica, aplicación de ampolla hidratante",
      "Masaje relajante, mascarilla adaptada a tu piel",
      "Crema final para una hidratación duradera",
      "Tratamiento para pieles que no necesiten una limpieza en profundidad"
    ],
    beneficios: [
      "Limpia y revitaliza sin agresión",
      "Hidratación profunda y duradera",
      "Ideal para pieles sensibles",
      "No requiere extracción",
      "Aporta frescura y vitalidad"
    ],
    imagen: purezaFrescuraImg,
    alt: "Pureza y frescura - higiene facial"
  },
  {
    id: 6,
    nombre: "Pureza y frescura - higiene facial",
    precio: "89€",
    duracion: "75 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento de limpieza profunda que hidrata, revitaliza y equilibra la piel.",
    descripcionLarga: "Tratamiento de limpieza profunda que hidrata, revitaliza y equilibra la piel. Sus pasos son limpieza de la piel junto con su tonificación, exfoliación mecánica, extracción de comedones para una oxigenación y limpieza de la piel, realizando la higiene comenzaremos con el tratamiento de fotoestimulación Led, que activa la regeneración celular, mejora la hidratación y aporta un efecto calmante, dejando la piel revitalizada y luminosa, masaje relajante junto con una mascarilla acorde de las necesidades de la piel y acabamos el tratamiento con una crema finalizadora.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Exfoliación mecánica",
      "Extracción de comedones para una oxigenación y limpieza de la piel",
      "Realizando la higiene comenzaremos con el tratamiento de fotoestimulación Led",
      "Activa la regeneración celular, mejora la hidratación y aporta un efecto calmante",
      "Masaje relajante junto con una mascarilla acorde de las necesidades de la piel",
      "Acabamos el tratamiento con una crema finalizadora"
    ],
    beneficios: [
      "Estimula la regeneración celular",
      "Mejora la hidratación",
      "Aporta efecto calmante",
      "Deja la piel revitalizada y luminosa",
      "Limpieza profunda completa"
    ],
    imagen: purezaCompletaSvg,
    alt: "Pureza y frescura con LED"
  },
  {
    id: 7,
    nombre: "Brisa de seda - higiene facial suave",
    precio: "55,00€",
    duracion: "45 min",
    frecuencia: "1 vez al mes",
    descripcion: "Una limpieza delicada diseñada para pieles sensibles y reactivas.",
    descripcionLarga: "Una limpieza delicada diseñada para pieles sensibles y reactivas. Ayuda a eliminar impurezas sin agredir, manteniendo el natural de la piel y aportando frescura y suavidad. Sus pasos son limpieza de la piel junto con su tonificación, peeling enzimático, masaje relajante junto con una mascarilla calmante y finalizaremos el tratamiento con una crema refrescante y reparadora.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Peeling enzimático",
      "Masaje relajante junto con una mascarilla calmante",
      "Finalizaremos el tratamiento con una crema refrescante y reparadora"
    ],
    beneficios: [
      "Elimina impurezas sin agredir",
      "Mantiene el equilibrio natural de la piel",
      "Aporta frescura y suavidad",
      "Ideal para pieles sensibles y reactivas",
      "Efecto refrescante y reparador"
    ],
    imagen: purezaFrescuraImg,
    alt: "Brisa de seda - higiene facial suave"
  },
  {
    id: 8,
    nombre: "Calma profunda - higiene facial completa",
    precio: "61,00€",
    duracion: "60 min",
    frecuencia: "1 vez al mes",
    descripcion: "Un tratamiento de limpieza profunda adaptado a pieles sensibles.",
    descripcionLarga: "Un tratamiento de limpieza profunda adaptado a pieles sensibles. Sus pasos son limpieza de la piel junto con su tonificación, peeling enzimático, extracción cuidadosa para liberar los poros, seguido de un masaje relajante junto con una mascarilla calmante y finalizaremos el tratamiento con una crema refrescante y reparadora que calma, reduce las rojeces y fortalece la barrera cutánea.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Peeling enzimático",
      "Extracción cuidadosa para liberar los poros",
      "Masaje relajante junto con una mascarilla calmante",
      "Finalizaremos el tratamiento con una crema refrescante y reparadora",
      "Calma, reduce las rojeces y fortalece la barrera cutánea"
    ],
    beneficios: [
      "Adaptado especialmente para pieles sensibles",
      "Calma y reduce las rojeces",
      "Fortalece la barrera cutánea",
      "Extracción cuidadosa y no agresiva",
      "Efecto reparador profundo"
    ],
    imagen: descansoVitalidadSvg,
    alt: "Calma profunda - higiene facial completa"
  },
  {
    id: 9,
    nombre: "Ritual serenidad - hig. facial + fotobioestimulación + cuidado específico",
    precio: "89,00€",
    duracion: "75 min",
    frecuencia: "1 vez al mes",
    descripcion: "Una combinación perfecta para pieles sensibles que necesitan un tratamiento global.",
    descripcionLarga: "Una combinación perfecta para pieles sensibles que necesitan un tratamiento global. Incluye higiene facial suave sin agresión, cosmética especializada en calmar la piel y fotobioestimulación Led, que potencia la renovación celular y refuerza la barrera protectora de la piel. Ideal para pieles con rosácea, cuperosis, alergias o reactividad extrema.",
    pasos: [
      "Higiene facial suave sin agresión",
      "Cosmética especializada en calmar la piel",
      "Fotobioestimulación Led que potencia la renovación celular",
      "Refuerza la barrera protectora de la piel",
      "Tratamiento específico para pieles reactivas"
    ],
    beneficios: [
      "Ideal para pieles con rosácea, cuperosis, alergias",
      "Calma la reactividad extrema",
      "Potencia la renovación celular",
      "Refuerza la barrera protectora",
      "Tratamiento global sin agresión"
    ],
    imagen: purezaCompletaSvg,
    alt: "Ritual serenidad con fotobioestimulación"
  },
  {
    id: 10,
    nombre: "Luz calmante - fotobioestimulación para la piel sensible",
    precio: "89,00€",
    duracion: "60 min",
    frecuencia: "1 vez en semana",
    descripcion: "La fotobioestimulación trabaja en profundidad para regenerar y calmar la piel.",
    descripcionLarga: "La fotobioestimulación trabaja en profundidad para regenerar y calmar la piel, reduciendo rojeces y mejorando la tolerancia cutánea. Es perfecto para pieles con rosácea, cuperosis o sensibilidad extrema, aportando un efecto antiinflamatorio y reparador sin agresión.",
    pasos: [
      "Preparación específica para piel sensible",
      "Aplicación de fotobioestimulación Led",
      "Trabaja en profundidad para regenerar y calmar",
      "Reduce rojeces y mejora la tolerancia cutánea",
      "Efecto antiinflamatorio y reparador"
    ],
    beneficios: [
      "Perfecto para pieles con rosácea y cuperosis",
      "Reduce rojeces visiblemente",
      "Mejora la tolerancia cutánea",
      "Efecto antiinflamatorio",
      "Reparación sin agresión"
    ],
    imagen: luzCalmanteImg,
    alt: "Luz calmante - fotobioestimulación"
  },
  {
    id: 11,
    nombre: "Pureza equilibrante - higiene facial suave",
    precio: "55,00€",
    duracion: "45 min",
    frecuencia: "1 vez al mes",
    descripcion: "Limpieza profunda sin extracción para pieles grasas y mixtas.",
    descripcionLarga: "Limpieza profunda sin extracción para pieles grasas y mixtas, utilizando la línea que regula el exceso de grasa, afina el poro y deja la piel fresca y equilibrada, sin sensación de tirantez.",
    pasos: [
      "Limpieza profunda específica para pieles grasas",
      "Utilización de línea reguladora del exceso de grasa",
      "Afinamiento del poro",
      "Equilibrio sin sensación de tirantez",
      "Frescura y confort final"
    ],
    beneficios: [
      "Regula el exceso de grasa",
      "Afina el poro visiblemente",
      "Deja la piel fresca y equilibrada",
      "Sin sensación de tirantez",
      "Ideal para pieles grasas y mixtas"
    ],
    imagen: equilibrioTotalSvg,
    alt: "Pureza equilibrante - higiene facial suave"
  },
  {
    id: 12,
    nombre: "Equilibrio puro - tratamiento cosmético regulador",
    precio: "65,00€",
    duracion: "60 min",
    frecuencia: "1 vez por semana",
    descripcion: "Tratamiento sin aparatología que trabaja únicamente con la línea Dermo controle.",
    descripcionLarga: "Tratamiento sin aparatología que trabaja únicamente con la línea Dermo controle, regulando la producción de sebo, minimizando los poros y matificando la piel sin deshidratarla. Ideal para quienes prefieren una solución cosmética natural.",
    pasos: [
      "Aplicación de la línea Dermo controle",
      "Regulación de la producción de sebo",
      "Minimización de los poros",
      "Matificación sin deshidratación",
      "Solución cosmética natural"
    ],
    beneficios: [
      "Regula la producción de sebo",
      "Minimiza los poros",
      "Matifica sin deshidratar",
      "Solución natural sin aparatología",
      "Ideal para pieles grasas"
    ],
    imagen: equilibrioTotalSvg,
    alt: "Equilibrio puro - tratamiento cosmético"
  },
  {
    id: 13,
    nombre: "Luz antiacne - tratamiento intensivo bioestimulación",
    precio: "79,00€",
    duracion: "60 min",
    frecuencia: "1 vez por semana",
    descripcion: "Tratamiento enfocado en pieles con acné inflamatorio o brotes recurrentes.",
    descripcionLarga: "Tratamiento enfocado en pieles con acné inflamatorio o brotes recurrentes. Se realiza fotobioestimulación en varias sesiones, ayudando a reducir la inflamación, acelerar la cicatrización y prevenir nuevas imperfecciones.",
    pasos: [
      "Preparación específica para piel con acné",
      "Fotobioestimulación en múltiples sesiones",
      "Reducción de la inflamación",
      "Aceleración de la cicatrización",
      "Prevención de nuevas imperfecciones"
    ],
    beneficios: [
      "Reduce la inflamación del acné",
      "Acelera la cicatrización",
      "Previene nuevos brotes",
      "Tratamiento específico para acné",
      "Resultados progresivos"
    ],
    imagen: purezaCompletaSvg,
    alt: "Luz antiacne - bioestimulación"
  },
  {
    id: 14,
    nombre: "Renovación profunda - higiene facial completa",
    precio: "61,00€",
    duracion: "60 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento completo de limpieza profunda con extracción de impurezas.",
    descripcionLarga: "Tratamiento completo de limpieza profunda con extracción de impurezas, tonificación y exfoliación con productos específicos. Ideal para pieles con tendencia acneica o exceso de grasa que necesitan purificación y equilibrio. Sus pasos son limpieza de la piel junto con su tonificación, extracción de comedones para una oxigenación y limpieza de la piel, mascarilla astringente y purificante, acabamos el tratamiento con una crema refrescante.",
    pasos: [
      "Limpieza de la piel junto con su tonificación",
      "Extracción de comedones para una oxigenación y limpieza de la piel",
      "Mascarilla astringente y purificante",
      "Acabamos el tratamiento con una crema refrescante"
    ],
    beneficios: [
      "Purificación profunda",
      "Eliminación de impurezas y comedones",
      "Equilibrio de pieles grasas",
      "Oxigenación celular",
      "Efecto astringente y purificante"
    ],
    imagen: luzAntiacneImg,
    alt: "Renovación profunda - higiene facial completa"
  },
  {
    id: 15,
    nombre: "Stop acné - higiene facial completa + fotobioestimulación",
    precio: "89,00€",
    duracion: "75 min",
    frecuencia: "1 vez en semana",
    descripcion: "Higiene facial con extracción potenciada con fotobioestimulación.",
    descripcionLarga: "Higiene facial con extracción potenciada con fotobioestimulación, que reduce inflamaciones, acelera la regeneración y ayuda a cicatrizar marcas de acné. Perfecto para pieles con brotes activos o que buscan mejorar su textura.",
    pasos: [
      "Higiene facial completa con extracción",
      "Aplicación de fotobioestimulación específica",
      "Reducción de inflamaciones",
      "Aceleración de la regeneración",
      "Cicatrización de marcas de acné"
    ],
    beneficios: [
      "Reduce inflamaciones activas",
      "Acelera la regeneración celular",
      "Ayuda a cicatrizar marcas de acné",
      "Perfecto para brotes activos",
      "Mejora la textura de la piel"
    ],
    imagen: purezaCompletaSvg,
    alt: "Stop acné con fotobioestimulación"
  },
  {
    id: 16,
    nombre: "Luz pura - hig. facial completa + microdermoabrasión + cosmética antimanchas",
    precio: "71,00€",
    duracion: "70 min",
    frecuencia: "1 vez al mes",
    descripcion: "Recupera la claridad y uniformidad de tu piel con esta higiene diseñada para combatir las manchas.",
    descripcionLarga: "Recupera la claridad y uniformidad de tu piel con esta higiene diseñada para combatir las manchas y revelar un rostro radiante. Exfolia, renueva y unifica. Este tratamiento combina la precisión de la microdermoabrasión con punta de diamante y la potencia de activos despigmentantes para eliminar células muertas, atenuar manchas y mejorar la luminosidad. La piel se transforma en un lienzo limpio y preparado para absorber mejor los tratamientos posteriores. Ideal para quienes buscan un aspecto fresco, uniforme y rejuvenecido.",
    pasos: [
      "Recupera la claridad y uniformidad de tu piel",
      "Exfolia, renueva y unifica",
      "Microdermoabrasión con punta de diamante",
      "Aplicación de activos despigmentantes",
      "Eliminación de células muertas y atenuación de manchas",
      "Mejora de la luminosidad",
      "Preparación para tratamientos posteriores"
    ],
    beneficios: [
      "Atenúa manchas visiblemente",
      "Unifica el tono de la piel",
      "Mejora la luminosidad",
      "Elimina células muertas",
      "Prepara la piel para absorber mejor tratamientos",
      "Aspecto fresco y rejuvenecido"
    ],
    imagen: luzPuraImg,
    alt: "Luz pura - microdermoabrasión antimanchas"
  },
  {
    id: 17,
    nombre: "Luz renovada - Fotorejuvenecimiento antimanchas",
    precio: "89,00€",
    duracion: "60 min",
    frecuencia: "1 sesión cada 2 semanas (mínimo 6 sesiones)",
    descripcion: "Gracias a la tecnología de luz pulsada intensa (IPL), este tratamiento actúa directamente sobre la hiperpigmentación.",
    descripcionLarga: "Gracias a la tecnología de luz pulsada intensa (IPL), este tratamiento actúa directamente sobre la hiperpigmentación, descomponiendo las manchas y estimulando la producción de colágeno. Además de unificar el tono, mejora la textura y aporta firmeza, dejando la piel visiblemente rejuvenecida.",
    pasos: [
      "Aplicación de tecnología IPL (luz pulsada intensa)",
      "Actuación directa sobre la hiperpigmentación",
      "Descomposición de las manchas",
      "Estimulación de la producción de colágeno",
      "Unificación del tono",
      "Mejora de la textura y aporte de firmeza"
    ],
    beneficios: [
      "Elimina manchas de hiperpigmentación",
      "Estimula la producción de colágeno",
      "Unifica el tono de la piel",
      "Mejora la textura cutánea",
      "Aporta firmeza",
      "Piel visiblemente rejuvenecida"
    ],
    imagen: purezaCompletaSvg,
    alt: "Luz renovada - fotorejuvenecimiento IPL"
  },
  {
    id: 18,
    nombre: "Skin glow - dermapen antimanchas",
    precio: "99,00€",
    duracion: "75 min",
    frecuencia: "Cada 2 semanas",
    descripcion: "Tratamiento para pieles con hiperpigmentación, este tratamiento combina dermapen con activos despigmentantes.",
    descripcionLarga: "Tratamiento para pieles con hiperpigmentación, este tratamiento combina dermapen con activos despigmentantes para mejorar el tono de la piel y reducir manchas. Tratamiento adaptado a cada tipo de piel para lograr una corrección progresiva y visible. Atenúa las manchas y unifica el tono de la piel.",
    pasos: [
      "Evaluación del tipo de piel",
      "Aplicación de dermapen con activos despigmentantes",
      "Tratamiento adaptado y personalizado",
      "Corrección progresiva de la hiperpigmentación",
      "Unificación del tono de la piel"
    ],
    beneficios: [
      "Mejora el tono de la piel",
      "Reduce manchas de hiperpigmentación",
      "Atenúa las manchas progresivamente",
      "Unifica el tono",
      "Tratamiento personalizado"
    ],
    imagen: equilibrioPuroImg,
    alt: "Skin glow - dermapen antimanchas"
  },
  {
    id: 19,
    nombre: "Luz perfecta - Tratamiento facial cosmético despigmentante",
    precio: "65,00€",
    duracion: "60 min",
    frecuencia: "1 sesión semanal durante el primer mes, luego 1 cada 15 días",
    descripcion: "Este tratamiento es la opción perfecta para quienes buscan atenuar el tono desigual y devolver la vitalidad a su rostro sin recurrir a aparatología.",
    descripcionLarga: "Este tratamiento es la opción perfecta para quienes buscan atenuar el tono desigual y devolver la vitalidad a su rostro sin recurrir a aparatología. Un cóctel avanzado de vitamina C, ácido kójico y niacinamida trabaja en profundidad para aclarar la piel, reducir las manchas y aportar un resplandor saludable. Pauta del tratamiento: Limpieza con emulsión específica según el tipo de piel, aplicación de peeling enzimático con ácidos despigmentantes, masaje con cóctel despigmentante, mascarilla específica y crema + protector solar SPF 50. Recomendación en casa: uso diario de crema antimanchas + fotoprotector.",
    pasos: [
      "Limpieza con emulsión específica según el tipo de piel",
      "Aplicación de peeling enzimático con ácidos despigmentantes",
      "Masaje con cóctel despigmentante (vitamina C, ácido kójico y niacinamida)",
      "Mascarilla específica",
      "Crema + protector solar SPF 50"
    ],
    beneficios: [
      "Atenúa el tono desigual",
      "Devuelve vitalidad al rostro",
      "Aclara la piel naturalmente",
      "Reduce las manchas",
      "Aporta resplandor saludable",
      "Sin necesidad de aparatología"
    ],
    imagen: equilibrioTotalSvg,
    alt: "Luz perfecta - tratamiento despigmentante"
  },
  {
    id: 20,
    nombre: "Flash de juventud - Fotorejuvenecimiento",
    precio: "89,00€",
    duracion: "60 min",
    frecuencia: "1 vez cada 15 días",
    descripcion: "Fotorejuvenecimiento facial para una piel radiante. Utiliza la última tecnología en fotorejuvenecimiento para estimular la producción de colágeno, reducir arrugas y mejorar la elasticidad de la piel.",
    descripcionLarga: "Fotorejuvenecimiento facial para una piel radiante. Utiliza la última tecnología en fotorejuvenecimiento para estimular la producción de colágeno, reducir arrugas y mejorar la elasticidad de la piel. Ideal para pieles maduras. Protocolo 100% personalizado en cada sesión. Piel más firme, tersa y rejuvenecida.",
    pasos: [
      "Evaluación personalizada de la piel",
      "Aplicación de tecnología de fotorejuvenecimiento",
      "Estimulación de la producción de colágeno",
      "Reducción de arrugas",
      "Mejora de la elasticidad",
      "Protocolo 100% personalizado"
    ],
    beneficios: [
      "Estimula la producción de colágeno",
      "Reduce arrugas visiblemente",
      "Mejora la elasticidad de la piel",
      "Ideal para pieles maduras",
      "Piel más firme y tersa",
      "Rejuvenecimiento visible"
    ],
    imagen: purezaCompletaSvg,
    alt: "Flash de juventud - fotorejuvenecimiento"
  },
  {
    id: 21,
    nombre: "Higiene Facial Suprema",
    precio: "55,00€",
    duracion: "45 min",
    frecuencia: "1 vez al mes",
    descripcion: "Tratamiento de limpieza profunda sin extracción, diseñado para pieles que han perdido su luz.",
    descripcionLarga: "Tratamiento de limpieza profunda sin extracción, diseñado para pieles que han perdido su luz. Combinación de enzimas renovadoras, cócteles revitalizantes y masaje lifting que devuelve suavidad y frescura. Ideal para pieles envejecidas, tristes, apagadas y con falta de vitalidad.",
    pasos: [
      "Limpieza profunda sin extracción",
      "Aplicación de enzimas renovadoras",
      "Cócteles revitalizantes",
      "Masaje lifting",
      "Devolución de suavidad y frescura"
    ],
    beneficios: [
      "Devuelve la luz a la piel",
      "Renovación con enzimas",
      "Revitalización profunda",
      "Efecto lifting",
      "Ideal para pieles apagadas y envejecidas"
    ],
    imagen: ritualSerenidadImg,
    alt: "Higiene Facial Suprema"
  },
  {
    id: 22,
    nombre: "Eterna Juventud 2 en 1",
    precio: "89,00€",
    duracion: "75 min",
    frecuencia: "1 sesión personalizada",
    descripcion: "Higiene facial + rejuvenecimiento en un solo tratamiento.",
    descripcionLarga: "Higiene facial + rejuvenecimiento en un solo tratamiento. Combina extracción con activos de alta concentración y tecnología avanzada para reafirmar y alisar la piel. Ideal para quienes buscan resultados sin perder tiempo. Efecto flash inmediato y beneficios a largo plazo.",
    pasos: [
      "Higiene facial completa con extracción",
      "Aplicación de activos de alta concentración",
      "Tecnología avanzada para reafirmar",
      "Alisamiento de la piel",
      "Efecto flash inmediato"
    ],
    beneficios: [
      "Combina limpieza y rejuvenecimiento",
      "Resultados inmediatos",
      "Reafirma y alisa la piel",
      "Ahorra tiempo",
      "Beneficios a largo plazo"
    ],
    imagen: stopAcneImg,
    alt: "Eterna Juventud 2 en 1"
  },
  {
    id: 23,
    nombre: "Ice skin - crioterapia facial",
    precio: "89,00€",
    duracion: "60 min",
    frecuencia: "1 sesión semanal",
    descripcion: "Tratamiento de crioterapia facial para desinflamar, tonificar y redefinir la piel.",
    descripcionLarga: "Tratamiento de crioterapia facial para desinflamar, tonificar y redefinir la piel. Ideal para pieles cansadas, con flacidez o signos de fatiga. Proporciona efecto tensor, revitalizante y reafirmante desde la primera sesión.",
    pasos: [
      "Preparación de la piel",
      "Aplicación de crioterapia facial",
      "Desinflamación y tonificación",
      "Redefinición del óvalo facial",
      "Efecto tensor inmediato"
    ],
    beneficios: [
      "Desinflamación inmediata",
      "Tonificación de la piel",
      "Redefinición del óvalo facial",
      "Efecto tensor y revitalizante",
      "Ideal para pieles cansadas y con flacidez"
    ],
    imagen: luzCalmanteImg,
    alt: "Ice skin - crioterapia facial"
  },
  {
    id: 24,
    nombre: "Lifting Lumínico",
    precio: "89,00€",
    duracion: "60 min",
    frecuencia: "1 o 2 sesiones a la semana",
    descripcion: "Fotobioestimulación para un efecto lifting inmediato.",
    descripcionLarga: "Fotobioestimulación para un efecto lifting inmediato. Luz LED de alta intensidad que reafirma, redefine el óvalo facial y devuelve la jugosidad. Se adapta a cada tipo de piel y necesidad.",
    pasos: [
      "Evaluación del tipo de piel",
      "Aplicación de luz LED de alta intensidad",
      "Reafirmación de la piel",
      "Redefinición del óvalo facial",
      "Devolución de la jugosidad"
    ],
    beneficios: [
      "Efecto lifting inmediato",
      "Reafirma la piel",
      "Redefine el óvalo facial",
      "Devuelve la jugosidad",
      "Adaptable a cada tipo de piel"
    ],
    imagen: purezaCompletaSvg,
    alt: "Lifting Lumínico"
  },
  {
    id: 25,
    nombre: "Oxigenación profunda - higiene facial completa con extracción",
    precio: "61,00€",
    duracion: "60 min",
    frecuencia: "1 sesión al mes",
    descripcion: "Limpieza y oxigenación para pieles maduras.",
    descripcionLarga: "Limpieza y oxigenación para pieles maduras. Elimina impurezas, revitaliza e hidrata. Estimula la regeneración celular. Ideal para preparar la piel para tratamientos posteriores.",
    pasos: [
      "Limpieza profunda de la piel",
      "Extracción de impurezas",
      "Oxigenación celular",
      "Revitalización e hidratación",
      "Estimulación de la regeneración celular"
    ],
    beneficios: [
      "Elimina impurezas profundas",
      "Revitaliza e hidrata",
      "Estimula la regeneración celular",
      "Ideal para pieles maduras",
      "Prepara para tratamientos posteriores"
    ],
    imagen: purezaEquilibranteImg,
    alt: "Oxigenación profunda"
  },
  {
    id: 26,
    nombre: "La cápsula del tiempo",
    precio: "89,00€",
    duracion: "75 min",
    frecuencia: "Tratamiento personalizado",
    descripcion: "Tratamiento que fusiona aparatología, activos de alto rendimiento y masajes específicos para regeneración, reafirmación y rejuvenecimiento.",
    descripcionLarga: "Tratamiento que fusiona aparatología, activos de alto rendimiento y masajes específicos para regeneración, reafirmación y rejuvenecimiento. Efecto visible desde la primera sesión. Totalmente personalizado.",
    pasos: [
      "Evaluación personalizada",
      "Fusión de aparatología avanzada",
      "Aplicación de activos de alto rendimiento",
      "Masajes específicos",
      "Regeneración, reafirmación y rejuvenecimiento"
    ],
    beneficios: [
      "Efecto visible desde la primera sesión",
      "Totalmente personalizado",
      "Regeneración completa",
      "Reafirmación de la piel",
      "Rejuvenecimiento integral"
    ],
    imagen: purezaCompletaSvg,
    alt: "La cápsula del tiempo"
  },
  {
    id: 27,
    nombre: "Revitalización profunda con dermapen",
    precio: "99,00€",
    duracion: "75 min",
    frecuencia: "Según necesidad",
    descripcion: "Microneedling con Dermapen para potenciar la absorción de activos rejuvenecedores, estimular colágeno y elastina.",
    descripcionLarga: "Microneedling con Dermapen para potenciar la absorción de activos rejuvenecedores, estimular colágeno y elastina. Ideal para mejorar textura, firmeza y renovar sin procedimientos agresivos.",
    pasos: [
      "Preparación de la piel",
      "Microneedling con Dermapen",
      "Potenciación de la absorción de activos",
      "Estimulación de colágeno y elastina",
      "Mejora de textura y firmeza"
    ],
    beneficios: [
      "Estimula colágeno y elastina",
      "Mejora textura y firmeza",
      "Renovación sin procedimientos agresivos",
      "Potencia la absorción de activos",
      "Resultados progresivos"
    ],
    imagen: renovacionCristalImg,
    alt: "Revitalización profunda con dermapen"
  }
];

const TratamientoDetail = () => {
  const { id } = useParams();
  const tratamiento = tratamientosFaciales.find(t => t.id === parseInt(id || '0'));

  if (!tratamiento) {
    return (
      <div className="font-inter text-textDark bg-neutral min-h-screen">
        <Header />
        <main className="pt-32 pb-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-3xl md:text-4xl font-semibold mb-6">
              Tratamiento no encontrado
            </h1>
            <Link href="/tratamientos-faciales" className="text-accent hover:text-accentDark">
              Volver a tratamientos faciales
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-inter text-textDark bg-neutral min-h-screen">
      <Helmet>
        <title>{tratamiento.nombre} - Centro de Estética Lucy Lara</title>
        <meta name="description" content={tratamiento.descripcionLarga} />
      </Helmet>
      
      <Header />
      
      <main className="pt-32 pb-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Navegación de regreso */}
          <Link 
            href="/tratamientos-faciales" 
            className="inline-flex items-center text-accent hover:text-accentDark mb-8 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Volver a tratamientos faciales
          </Link>
          
          {/* Header del tratamiento */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Imagen */}
            <div className="lg:order-1">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src={tratamiento.imagen} 
                    alt={tratamiento.alt} 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
            
            {/* Información principal */}
            <div className="lg:order-2">
              <h1 className="font-playfair text-4xl md:text-5xl font-semibold mb-6">
                {tratamiento.nombre}
              </h1>
              
              <div className="flex items-center gap-6 mb-6 text-textLight">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{tratamiento.duracion}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{tratamiento.frecuencia}</span>
                </div>
              </div>
              
              <div className="text-3xl font-semibold text-accent mb-6">
                {tratamiento.precio}
              </div>
              
              <p className="text-lg text-textLight mb-8 leading-relaxed">
                {tratamiento.descripcionLarga}
              </p>
              
              <a 
                href="#reserva"
                className="bg-accent hover:bg-accentDark text-white px-8 py-3 rounded-full transition-colors font-medium text-lg inline-block"
              >
                Solicitar información
              </a>
            </div>
          </motion.div>
          
          {/* Pasos del tratamiento */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-playfair text-3xl font-semibold mb-8 text-center">
              Pasos del Tratamiento
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="space-y-4">
                {tratamiento.pasos.map((paso, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-textLight leading-relaxed">{paso}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Beneficios */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="font-playfair text-3xl font-semibold mb-8 text-center">
              Beneficios
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tratamiento.beneficios.map((beneficio, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-accent flex-shrink-0" />
                    <span className="text-textLight">{beneficio}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Call to action final */}
          <motion.div 
            className="text-center bg-white rounded-xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="font-playfair text-2xl font-semibold mb-4">
              ¿Listo para transformar tu piel?
            </h3>
            <p className="text-textLight mb-6 max-w-2xl mx-auto">
              Reserva tu cita ahora y experimenta los beneficios de nuestro tratamiento {tratamiento.nombre}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#reserva"
                className="bg-accent hover:bg-accentDark text-white px-8 py-3 rounded-full transition-colors font-medium inline-block"
              >
                Solicitar información
              </a>
              <Link 
                href="/tratamientos-faciales"
                className="border border-accent text-accent hover:bg-accent hover:text-white px-8 py-3 rounded-full transition-colors font-medium"
              >
                Ver otros tratamientos
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Booking />
      <Footer />
    </div>
  );
};

export default TratamientoDetail;