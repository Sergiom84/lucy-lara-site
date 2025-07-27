import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, AlertCircle, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { z } from "zod";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Message validation schema
const messageSchema = z.object({
  message: z.string()
    .min(1, "El mensaje no puede estar vacío")
    .max(500, "El mensaje no puede exceder 500 caracteres")
    .trim()
});

const ChatbotImproved = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "¡Hola! Soy LucyBot 💅✨, tu asistente del Centro de Estética Lucy Lara. ¿En qué puedo ayudarte?", 
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");
  const [isRateLimited, setIsRateLimited] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Rate limiting
  const lastMessageTime = useRef<number>(0);
  const MESSAGE_COOLDOWN = 2000; // 2 seconds between messages

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      trackEvent('chatbot_opened', 'engagement', 'chatbot');
      setError(""); // Clear any previous errors
    }
  };

  // Validate message
  const validateMessage = (text: string): string | null => {
    try {
      messageSchema.parse({ message: text });
      return null;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0].message;
      }
      return "Mensaje inválido";
    }
  };

  // Check rate limiting
  const checkRateLimit = (): boolean => {
    const now = Date.now();
    if (now - lastMessageTime.current < MESSAGE_COOLDOWN) {
      setIsRateLimited(true);
      setError("Por favor, espera un momento antes de enviar otro mensaje");
      setTimeout(() => setIsRateLimited(false), MESSAGE_COOLDOWN);
      return false;
    }
    lastMessageTime.current = now;
    return true;
  };

  // Send a message
  const sendMessage = async () => {
    // Clear previous errors
    setError("");

    // Validate input
    const validationError = validateMessage(inputText);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Check rate limiting
    if (!checkRateLimit()) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText.trim();
    setInputText("");
    setIsTyping(true);
    
    trackEvent('chatbot_message_sent', 'engagement', 'chatbot');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Demasiadas consultas. Por favor, espera un momento.');
        } else if (response.status >= 500) {
          throw new Error('Error del servidor. Por favor, intenta más tarde.');
        } else {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      }

      const data = await response.json();
      
      if (!data.response) {
        throw new Error('Respuesta vacía del servidor');
      }

      const botResponse: Message = {
        id: Date.now() + 1,
        text: data.response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      
    } catch (error) {
      console.error('Error getting bot response:', error);
      
      let errorMessage = "Lo siento, no puedo procesar tu consulta en este momento.";
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = "La consulta tardó demasiado. Por favor, intenta con una pregunta más específica.";
        } else {
          errorMessage = error.message;
        }
      }

      const botErrorResponse: Message = {
        id: Date.now() + 1,
        text: `${errorMessage} \n\nPuedes contactarnos directamente al 91 505 20 67 o por WhatsApp.`,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botErrorResponse]);
      setError("Hubo un problema con tu consulta. Verifica tu conexión e intenta de nuevo.");
      
    } finally {
      setIsTyping(false);
    }
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    if (error && e.target.value.trim()) {
      setError(""); // Clear error when user starts typing
    }
  };

  // Format timestamp
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Chatbot Button */}
      <motion.button
        onClick={toggleChatbot}
        className="fixed bottom-8 left-8 w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-lg hover:bg-accentDark transition-colors z-20 group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 1.7
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Abrir chat de asistencia"
      >
        <MessageSquare className="text-white" size={24} />
        
        {/* Notification badge */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2 }}
          />
        )}
      </motion.button>

      {/* Chatbot Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-28 left-4 sm:left-8 w-[90%] max-w-sm bg-white rounded-2xl shadow-xl z-30 overflow-hidden border border-gray-200"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-accent text-white p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="font-medium">LucyBot 💅✨</span>
              </div>
              <button 
                onClick={toggleChatbot} 
                className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                aria-label="Cerrar chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-50 border-b border-red-200 p-3"
              >
                <div className="flex items-center text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              </motion.div>
            )}

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] ${message.isUser ? "text-right" : "text-left"}`}>
                    <div 
                      className={`p-3 rounded-2xl ${
                        message.isUser 
                          ? "bg-accent text-white rounded-br-none" 
                          : "bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100"
                      }`}
                    >
                      {message.text}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 px-1">
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white text-gray-800 rounded-2xl rounded-bl-none p-3 shadow-sm border border-gray-100">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t bg-white p-3 flex gap-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="Escribe tu mensaje..."
                className={`flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors ${
                  error ? 'border-red-300' : 'border-gray-300'
                }`}
                value={inputText}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                disabled={isTyping || isRateLimited}
                maxLength={500}
              />
              <button
                onClick={sendMessage}
                disabled={isTyping || isRateLimited || !inputText.trim()}
                className="bg-accent hover:bg-accentDark text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Enviar mensaje"
              >
                {isTyping ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>

            {/* Character counter */}
            <div className="px-3 pb-2 text-xs text-gray-500 text-right">
              {inputText.length}/500
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotImproved;
