// Chatbot responses dictionary
const botResponses: Record<string, string> = {
  'hola': '¡Hola! ¿En qué puedo ayudarte hoy?',
  'servicios': 'Ofrecemos tratamientos faciales, masajes, manicura y pedicura, tratamientos capilares y corporales, y maquillaje profesional. ¿Te interesa alguno en particular?',
  'precios': 'Los precios varían según el tratamiento. Los faciales comienzan en 45€, masajes desde 55€, manicura desde 35€. ¿Deseas información sobre algún servicio específico?',
  'cita': 'Puedes reservar una cita a través de nuestro formulario en la web, llamando al +34 912 345 678 o escribiéndonos por WhatsApp. ¿Prefieres que te ayude a hacerlo ahora?',
  'horario': 'Estamos abiertos de lunes a viernes de 10:00 a 20:00 y los sábados de 10:00 a 14:00. Los domingos permanecemos cerrados.',
  'ubicacion': 'Nos encontramos en Calle Belleza 123, 28001 Madrid. ¿Necesitas indicaciones para llegar?',
  'contacto': 'Puedes contactarnos por teléfono al +34 912 345 678, por email a info@beautywellness.com o a través de nuestras redes sociales.',
  'facial': 'Nuestros tratamientos faciales incluyen limpieza profunda, hidratación, rejuvenecimiento y tratamientos anti-edad. ¿Hay alguno que te interese especialmente?',
  'masaje': 'Ofrecemos masajes relajantes, descontracturantes, deportivos y terapéuticos. Cada sesión se personaliza según tus necesidades específicas.',
  'pelo': 'Nuestros tratamientos capilares incluyen corte, color, tratamientos de hidratación, reconstrucción y alisado. ¿Qué problemas específicos tienes con tu cabello?',
  'cabello': 'Nuestros tratamientos capilares incluyen corte, color, tratamientos de hidratación, reconstrucción y alisado. ¿Qué problemas específicos tienes con tu cabello?',
  'uñas': 'En nuestro servicio de manicura y pedicura ofrecemos tratamientos básicos, semipermanentes, acrílicas y diseños personalizados. ¿Qué estilo prefieres?',
  'maquillaje': 'Ofrecemos servicios de maquillaje para eventos especiales, bodas, sesiones de fotos o enseñanza de técnicas para tu día a día. ¿Para qué ocasión necesitas el maquillaje?',
  'productos': 'Trabajamos con marcas de alta gama y productos naturales seleccionados por su calidad y resultados. Todos los productos están testados dermatológicamente.',
  'gracias': '¡De nada! Estoy aquí para ayudarte. Si tienes más preguntas, no dudes en consultarme.'
};

// Get bot response based on user message
export const getBotResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Check for keyword matches
  for (const [key, response] of Object.entries(botResponses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  
  // Default response if no keyword matches
  return 'Lo siento, no entiendo tu pregunta. ¿Podrías reformularla? Puedes preguntar sobre nuestros servicios, precios, citas, horario, ubicación o contacto.';
};
