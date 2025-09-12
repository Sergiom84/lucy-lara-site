// Centro de Estética Lucy Lara - Información del negocio
const BUSINESS_CONTEXT = `
Eres "LucyBot", el asistente virtual especializado EXCLUSIVAMENTE del Centro de Estética Lucy Lara.

🚫 RESTRICCIONES IMPORTANTES:
- SOLO respondes sobre: tratamientos, productos, horarios, ubicación, precios y reservas del centro
- NO respondes sobre: política, deportes, noticias, tiempo, cocina, tecnología, otros temas
- Si preguntan algo no relacionado con el centro, redirige siempre a los servicios

INFORMACIÓN DEL CENTRO:
- Nombre: Centro de Estética Lucy Lara
- Dirección: Calle Alegría de la Huerta 22, 28041 Madrid
- Teléfonos: 91 505 20 67 | 684203633
- Email: celucylar@gmail.com
- WhatsApp: 684203633
- Horarios: Lunes a viernes de 10:00-13:30 y 16:00-19:30
- Redes sociales: Facebook (@CBLUCYLARA) e Instagram (@esteticalucylara)

SERVICIOS COMPLETOS:

TRATAMIENTOS FACIALES (10 tipos):
- Renovación profunda - higiene facial completa
- Renovación de cristal - higiene facial con microdermoabrasión  
- Descanso y vitalidad - higiene facial con presoterapia ocular
- Equilibrio total - higiene facial con presoterapia
- Pureza y frescura - higiene facial
- Ice Skin - crioterapia facial
- Higiene Facial Suprema
- Eterna Juventud 2 en 1
- Lifting Lumínico
- La cápsula del tiempo

MICROPIGMENTACIÓN (4 tipos):
- Cejas
- Línea de ojos superior
- Línea de ojos inferior  
- Labios completos

ELIMINACIÓN DEL VELLO (3 métodos):
- Depilación eléctrica (definitiva)
- Fotodepilación SHR (láser avanzado)
- Cera chocolate (temporal)

OTROS TRATAMIENTOS:
- Masaje relajante - Un respiro para tu cuerpo y mente
- Masaje terapéutico - Manos que sanan
- Lifting y tinte de pestañas
- Hidrolinfa (drenaje linfático)
- Acupuntura

PRODUCTOS DISPONIBLES (8 tipos):
- Crema contorno de ojos
- Crema cuidado piel con manchas
- Crema despigmentante
- Crema efecto seda
- Crema hidratante oil free
- Espuma limpiadora
- Leche limpiadora facial
- Gel rosa mosqueta

INSTRUCCIONES:
- Mantén tono profesional y amigable con emojis
- Invita a reservar cita cuando sea apropiado
- Los precios se consultan directamente (varían según tratamiento)
- Edad mínima: 16 años
- Métodos de pago: efectivo y tarjeta
`;

// Respuestas predefinidas del chatbot
const botResponses: Record<string, string> = {
  'hola': '¡Hola! 👋💖 Soy LucyBot, tu asistente del Centro de Estética Lucy Lara. ¿En qué puedo ayudarte hoy? Puedo informarte sobre nuestros 10 tratamientos faciales, micropigmentación, eliminación del vello, masajes y productos ✨',
  'hi': '¡Hello! 👋 Soy LucyBot del Centro de Estética Lucy Lara. ¿En qué puedo ayudarte? (Respondo en español sobre nuestros tratamientos) 💄✨',
  'servicios': '🌟 Ofrecemos: \n💆‍♀️ 10 tratamientos faciales diferentes\n💉 Micropigmentación (cejas, ojos, labios)\n🚫 Eliminación del vello (láser SHR, eléctrica, cera)\n💆‍♀️ Masajes relajantes y terapéuticos\n👁️ Lifting de pestañas\n🌿 Acupuntura e Hidrolinfa\n🧴 Productos cosméticos\n¿Te interesa alguno en particular?',
  'tratamientos': '✨ Nuestros tratamientos incluyen:\n\n🌟 FACIALES: Renovación profunda, Renovación de cristal, Descanso y vitalidad, Equilibrio total, Ice Skin, Higiene Suprema, Eterna Juventud 2en1, Lifting Lumínico, La cápsula del tiempo, Pureza y frescura\n\n💉 MICROPIGMENTACIÓN: Cejas, líneas de ojos, labios completos\n\n🚫 ELIMINACIÓN VELLO: Láser SHR, eléctrica, cera chocolate\n\n💆‍♀️ CORPORALES: Masajes, hidrolinfa, acupuntura\n\n¿Sobre cuál quieres saber más? 💖',
  'facial': '💆‍♀️ Tenemos 10 tratamientos faciales:\n\n🌟 Renovación profunda (60-75min)\n💎 Renovación de cristal con microdermoabrasión (70-90min)\n👁️ Descanso y vitalidad con presoterapia ocular (75-90min)\n⚖️ Equilibrio total con presoterapia (80-90min)\n🧊 Ice Skin crioterapia (50-60min)\n👑 Higiene Facial Suprema (90-120min)\n✨ Eterna Juventud 2en1 (90-105min)\n💡 Lifting Lumínico (75-90min)\n⏰ La cápsula del tiempo (100-120min)\n🌸 Pureza y frescura (45-60min)\n\n¿Cuál te interesa más? 😊',
  'micropigmentacion': '💉✨ Realizamos micropigmentación en:\n\n🏹 CEJAS: Definición natural 24/7 (2-3h, dura 1-2 años)\n👁️ LÍNEA OJOS SUPERIOR: Delineado permanente (1.5-2h)\n👁️ LÍNEA OJOS INFERIOR: Delineado sutil (1-1.5h)\n💋 LABIOS COMPLETOS: Color permanente (2-3h)\n\n✅ Incluye anestesia tópica\n✅ Molestia mínima\n✅ Resultados naturales y duraderos\n\n¿Te interesa alguna zona en particular? 💖',
  'depilacion': '🚫 Ofrecemos 3 métodos de eliminación del vello:\n\n⚡ ELÉCTRICA: Definitiva, apta para todo tipo de vello\n💫 FOTODEPILACIÓN SHR: Láser avanzado (6-8 sesiones), menos doloroso\n🍫 CERA CHOCOLATE: Temporal (3-4 semanas), hidrata la piel\n\nTodas las zonas corporales disponibles. ¿Qué zona te interesa tratar? 😊✨',
  'masaje': '💆‍♀️ Tenemos dos tipos de masajes:\n\n🌸 RELAJANTE "Un respiro para tu cuerpo y mente" (60-90min)\n- Reduce estrés\n- Mejora circulación\n- Bienestar general\n\n🙌 TERAPÉUTICO "Manos que sanan" (60-75min)\n- Alivia contracturas\n- Problemas musculares\n- Mejora movilidad\n\nAmbos con aceites esenciales en ambiente relajante 🕯️ ¿Cuál prefieres?',
  'productos': '🧴✨ Contamos con productos de alta calidad:\n\n💄 CREMAS: Contorno ojos, antimanchas, despigmentante, efecto seda, hidratante oil-free\n🧼 LIMPIADORES: Espuma limpiadora, leche limpiadora\n🌹 ESPECIALES: Gel rosa mosqueta regenerador\n\nTodos disponibles en recepción. ¿Buscas algo específico para tu tipo de piel? 💖',
  'cita': '📅 Puedes reservar tu cita de 3 formas:\n\n📞 Teléfono: 91 505 20 67 o 684203633\n💬 WhatsApp: 684203633\n🌐 Formulario en nuestra web\n\n⏰ Horarios: Lunes a viernes 10:00-13:30 y 16:00-19:30\n\n✅ Cancelaciones con 24h antelación\n💳 Aceptamos efectivo y tarjeta\n\n¿Prefieres algún método en particular? 😊',
  'horario': '⏰ Nuestros horarios son:\n\n📅 LUNES A VIERNES:\n🌅 Mañanas: 10:00 - 13:30\n🌆 Tardes: 16:00 - 19:30\n\n🚫 Sábados y domingos: CERRADO\n\n¿En qué horario te viene mejor para tu cita? 💖',
  'ubicacion': '📍 Nos encontramos en:\n\nC. de la Alegría de la Huerta, 22\nVillaverde, 28041 Madrid\n\n🚇 TRANSPORTE:\n• Metro L3: Villaverde Alto\n• Bus: Líneas 78, 79, 123\n\n¡Es una zona muy accesible! ¿Necesitas más indicaciones para llegar? 😊',
  'contacto': '📞 CONTACTO:\n\n☎️ Teléfonos: 91 505 20 67 | 684203633\n💬 WhatsApp: 684203633\n📧 Email: celucylar@gmail.com\n\n📱 REDES SOCIALES:\n• Facebook: @CBLUCYLARA\n• Instagram: @esteticalucylara\n\n¿Por cuál prefieres contactarnos? ✨',
  'precios': '💰 Los precios varían según:\n\n🎯 Tipo de tratamiento\n📏 Zona a tratar\n🔢 Número de sesiones\n🎁 Promociones vigentes\n\n📞 Para información detallada: 91 505 20 67\n💬 WhatsApp: 684203633\n\n¡También tenemos promociones y paquetes especiales! 💖✨',
  'acupuntura': '🌿 Ofrecemos ACUPUNTURA (45-60min):\n\n✅ Técnica milenaria\n✅ Alivia dolores\n✅ Reduce estrés y ansiedad\n✅ Mejora circulación\n✅ Equilibrio general\n\nIncluye consulta + tratamiento personalizado. Muy efectiva para el bienestar 🧘‍♀️💖',
  'hidrolinfa': '💧 HIDROLINFA (45-60min):\n\n✅ Drenaje linfático avanzado\n✅ Reduce retención de líquidos\n✅ Mejora circulación\n✅ Piernas más ligeras\n✅ Efecto relajante\n\nIdeal para piernas cansadas y hinchazón. ¿Sufres de retención de líquidos? 💖',
  'pestañas': '👁️✨ LIFTING Y TINTE DE PESTAÑAS (45-60min):\n\n✅ Curvado permanente\n✅ Tinte del color que elijas\n✅ Sin necesidad de rímel\n✅ Dura 6-8 semanas\n✅ Mirada más expresiva\n\n¡Despierta con pestañas perfectas! 💖 ¿Te interesa? 😊',
  'gracias': '¡De nada! 💖✨ Estoy aquí para ayudarte con cualquier consulta sobre nuestros servicios. Si deseas reservar una cita, será un placer atenderte en el Centro de Estética Lucy Lara 🏃‍♀️💄',
  'adios': '¡Hasta pronto! 👋💖 Esperamos verte en el Centro de Estética Lucy Lara. Si necesitas algo más, no dudes en consultarme. ¡Que tengas un día maravilloso! ✨😊',
  'edad': '👥 EDAD MÍNIMA: 16 años\n\n🔞 Menores de edad necesitan autorización parental\n👶 Para algunos tratamientos evaluamos caso por caso\n🤰 Embarazo: Algunos tratamientos no recomendados\n\n¿Tienes alguna duda específica sobre requisitos? 💖',
  'promociones': '🎁 ¡Tenemos ofertas especiales!\n\n✨ Paquetes de tratamientos faciales\n🚫 Descuentos en sesiones múltiples de depilación\n🌸 Promociones estacionales\n🎓 Descuentos para estudiantes\n💖 Programa de fidelización\n\n📞 Consulta ofertas vigentes: 91 505 20 67 💫'
};

// Función para obtener respuesta del bot
export const getBotResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Lista ampliada de temas NO relacionados con el centro de estética
  const unrelatedTopics = [
    'política', 'deportes', 'fútbol', 'baloncesto', 'noticias', 'tiempo', 'clima', 
    'cocina', 'recetas', 'comida', 'programación', 'código', 'matemáticas', 
    'historia', 'geografía', 'música', 'canciones', 'películas', 'series', 
    'libros', 'novelas', 'juegos', 'videojuegos', 'tecnología', 'móviles', 
    'coches', 'viajes', 'turismo', 'religión', 'filosofía', 'economía', 
    'bolsa', 'inversiones', 'bitcoin', 'criptomonedas', 'medicina', 'salud',
    'medicamentos', 'enfermedad', 'covid', 'vacunas', 'educación', 'universidad',
    'trabajo', 'empleo', 'entrevista', 'animales', 'mascotas', 'plantas',
    'jardinería', 'bricolaje', 'construcción', 'moda', 'ropa', 'zapatos'
  ];
  
  // Detectar preguntas sobre temas no relacionados
  for (const topic of unrelatedTopics) {
    if (lowerMessage.includes(topic)) {
      return '🚫 Lo siento, soy LucyBot, el asistente especializado del Centro de Estética Lucy Lara. Solo puedo ayudarte con información sobre nuestros tratamientos faciales, micropigmentación, eliminación del vello, masajes, productos y reservas 💄✨ ¿Te interesa conocer alguno de nuestros servicios?';
    }
  }
  
  // Detectar saludos generales o preguntas sobre el bot
  if (lowerMessage.includes('quien eres') || lowerMessage.includes('qué eres') || lowerMessage.includes('que eres')) {
    return '¡Hola! 👋 Soy LucyBot, el asistente virtual del Centro de Estética Lucy Lara 💅✨ Estoy aquí para ayudarte con información sobre nuestros tratamientos, productos y servicios. ¿En qué puedo ayudarte hoy? 😊';
  }
  
  // Buscar coincidencias con palabras clave específicas del centro
  for (const [key, response] of Object.entries(botResponses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  
  // Respuesta por defecto más restrictiva
  return '🤔 No estoy seguro de cómo ayudarte con eso. Recuerda que solo puedo informarte sobre el Centro de Estética Lucy Lara: tratamientos faciales, micropigmentación, eliminación del vello, masajes, productos y reservas 💖 ¿Hay algún servicio específico que te interese? ✨';
};

// Integración con OpenAI para respuestas inteligentes
export const getOpenAIResponse = async (message: string): Promise<string> => {
  try {
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Error en la API del chatbot');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    // Fallback to local responses
    return getBotResponse(message);
  }
};

// Mantenemos compatibilidad con el nombre anterior por si acaso
export const getDeepSeekResponse = getOpenAIResponse;