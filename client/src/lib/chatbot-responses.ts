// Centro de Estética Lucy Lara - Información del negocio
const BUSINESS_CONTEXT = `
Eres el asistente virtual del Centro de Estética Lucy Lara, un centro de belleza ubicado en Madrid.

INFORMACIÓN DEL CENTRO:
- Nombre: Centro de Estética Lucy Lara
- Dirección: Calle Alegría de la Huerta 22, 28041 Madrid
- Teléfonos: 91 505 20 67 | 684 203 633
- Email: celucylar@gmail.com
- Horarios: Lunes a viernes de 10:00-13:30 y 16:00-19:30
- Redes sociales: Facebook (@CBLUCYLARA) e Instagram (@esteticalucylara)

SERVICIOS DISPONIBLES:

TRATAMIENTOS FACIALES:
- Renovación profunda - higiene facial completa
- Renovación de cristal - higiene facial con microdermoabrasión  
- Descanso y vitalidad - higiene facial con presoterapia ocular
- Equilibrio total - higiene facial con presoterapia
- Pureza y frescura - higiene facial

MICROPIGMENTACIÓN:
- Cejas
- Línea de ojos superior
- Línea de ojos inferior  
- Labios completos

ELIMINACIÓN DEL VELLO:
- Depilación eléctrica
- Fotodepilación SHR
- Cera chocolate

OTROS TRATAMIENTOS:
- Masaje relajante - Un respiro para tu cuerpo y mente
- Masaje terapéutico - Manos que sanan
- Lifting y tinte de pestañas
- Hidrolinfa
- Acupuntura

PRODUCTOS DISPONIBLES:
- Crema contorno de ojos
- Crema cuidado piel con manchas
- Crema despigmentante
- Crema efecto seda
- Espuma limpiadora
- Leche limpiadora facial
- Protector solar 50+
- Protector solar 50+ con color
- Sérum vitamina C
- Crema hidratante oil free
- Gel rosa mosqueta

INSTRUCCIONES IMPORTANTES:
- Solo responde sobre el Centro de Estética Lucy Lara y sus servicios
- Si te preguntan sobre otros temas, redirige amablemente hacia los servicios del centro
- Siempre mantén un tono profesional y amigable
- Invita a reservar cita cuando sea apropiado
- No inventes precios, solo menciona que están disponibles bajo consulta
`;

// Respuestas predefinidas del chatbot
const botResponses: Record<string, string> = {
  'hola': '¡Hola! ¿En qué puedo ayudarte hoy? Puedo informarte sobre nuestros tratamientos faciales, micropigmentación, eliminación del vello, masajes y productos.',
  'servicios': 'Ofrecemos tratamientos faciales, micropigmentación, eliminación del vello, masajes terapéuticos, lifting de pestañas, hidrolinfa y acupuntura. También contamos con una línea de productos para el cuidado de la piel. ¿Te interesa alguno en particular?',
  'tratamientos': 'Nuestros tratamientos incluyen: faciales (renovación profunda, con microdermoabrasión, presoterapia), micropigmentación (cejas, ojos, labios), eliminación del vello (eléctrica, SHR, cera), masajes y acupuntura. ¿Sobre cuál quieres saber más?',
  'facial': 'Tenemos varios tratamientos faciales: Renovación profunda, Renovación de cristal con microdermoabrasión, Descanso y vitalidad con presoterapia ocular, Equilibrio total con presoterapia, y Pureza y frescura. Todos están diseñados para diferentes necesidades de la piel.',
  'micropigmentacion': 'Realizamos micropigmentación en cejas, línea de ojos superior e inferior, y labios completos. Es una técnica que realza tus facciones de forma natural y duradera.',
  'depilacion': 'Ofrecemos tres métodos de eliminación del vello: depilación eléctrica, fotodepilación SHR y cera chocolate. Cada método se adapta a diferentes tipos de piel y necesidades.',
  'masaje': 'Tenemos masajes relajantes "Un respiro para tu cuerpo y mente" y masajes terapéuticos "Manos que sanan". Ambos están diseñados para tu bienestar físico y mental.',
  'productos': 'Contamos con una línea completa de productos: cremas para contorno de ojos y manchas, protector solar, sérum de vitamina C, limpiadores faciales y más. Todos son de alta calidad para el cuidado de tu piel.',
  'cita': 'Puedes reservar tu cita de varias maneras: completando el formulario en nuestra web, llamando al 91 505 20 67 o 684 203 633, o escribiéndonos por WhatsApp. ¿Prefieres alguna forma en particular?',
  'horario': 'Estamos abiertos de lunes a viernes en dos horarios: mañanas de 10:00 a 13:30 y tardes de 16:00 a 19:30. ¿En qué horario te viene mejor?',
  'ubicacion': 'Nos encontramos en Calle Alegría de la Huerta 22, 28041 Madrid. Es una zona muy accesible. ¿Necesitas indicaciones para llegar?',
  'contacto': 'Puedes contactarnos por teléfono al 91 505 20 67 o 684 203 633, por email a celucylar@gmail.com, o síguenos en Facebook (@CBLUCYLARA) e Instagram (@esteticalucylara).',
  'precios': 'Los precios de nuestros tratamientos varían según el servicio específico. Te recomiendo contactarnos directamente para obtener información detallada sobre el tratamiento que te interesa.',
  'acupuntura': 'Ofrecemos sesiones de acupuntura como parte de nuestros tratamientos de bienestar. Es una técnica tradicional muy efectiva para el equilibrio y la relajación.',
  'hidrolinfa': 'La hidrolinfa es un tratamiento corporal que ayuda a mejorar la circulación y reducir la retención de líquidos. Es muy relajante y beneficioso para tu bienestar.',
  'pestañas': 'Realizamos lifting y tinte de pestañas para realzar tu mirada de forma natural. Es un tratamiento que aporta volumen y color a tus pestañas.',
  'gracias': '¡De nada! Estoy aquí para ayudarte con cualquier consulta sobre nuestros servicios. Si deseas reservar una cita, será un placer atenderte.',
  'adios': '¡Hasta pronto! Esperamos verte en el Centro de Estética Lucy Lara. Si necesitas algo más, no dudes en consultarme.'
};

// Función para obtener respuesta del bot
export const getBotResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Detectar temas no relacionados con el centro de estética
  const unrelatedTopics = [
    'política', 'deportes', 'noticias', 'tiempo', 'cocina', 'recetas', 
    'programación', 'matemáticas', 'historia', 'geografía', 'música',
    'películas', 'libros', 'juegos', 'tecnología', 'coches', 'viajes'
  ];
  
  for (const topic of unrelatedTopics) {
    if (lowerMessage.includes(topic)) {
      return 'Lo siento, soy el asistente especializado del Centro de Estética Lucy Lara. Solo puedo ayudarte con consultas sobre nuestros tratamientos, servicios y reservas. ¿Te gustaría saber algo sobre nuestros servicios de belleza?';
    }
  }
  
  // Buscar coincidencias con palabras clave
  for (const [key, response] of Object.entries(botResponses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  
  // Respuesta por defecto si no hay coincidencias
  return 'No estoy seguro de cómo ayudarte con eso. Puedo informarte sobre nuestros tratamientos faciales, micropigmentación, eliminación del vello, masajes, productos o ayudarte a reservar una cita. ¿Sobre qué te gustaría saber?';
};

// Para integración futura con DeepSeek
export const getDeepSeekResponse = async (message: string, apiKey: string): Promise<string> => {
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: BUSINESS_CONTEXT
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error('Error en la API de DeepSeek');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    // Fallback to local responses
    return getBotResponse(message);
  }
};