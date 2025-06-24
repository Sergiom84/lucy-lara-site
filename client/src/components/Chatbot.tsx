import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import { getBotResponse, getDeepSeekResponse } from "@/lib/chatbot-responses";
import { trackEvent } from "@/lib/analytics";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "¡Hola! Soy LucyBot 💅✨, tu asistente del Centro de Estética Lucy Lara. ¿Te ayudo con información sobre tratamientos faciales?", 
      isUser: false 
    }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      trackEvent('chatbot_opened', 'engagement', 'chatbot');
    }
  };

  // Send a message
  const sendMessage = async () => {
    if (inputText.trim() === "") return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      isUser: true
    };
    setMessages(prev => [...prev, userMessage]);
    
    const currentInput = inputText;
    setInputText("");
    
    trackEvent('chatbot_message_sent', 'engagement', 'chatbot');

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = {
        id: messages.length + 2,
        text: data.response,
        isUser: false
      };
      setMessages(prev => [...prev, botResponse]);
      
    } catch (error) {
      console.error('Error getting bot response:', error);
      const botResponse = {
        id: messages.length + 2,
        text: "Lo siento, no puedo procesar tu consulta. Contacta al 91 505 20 67.",
        isUser: false
      };
      setMessages(prev => [...prev, botResponse]);
    }
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Button */}
      <motion.button
        onClick={toggleChatbot}
        className="fixed bottom-8 left-8 w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-lg hover:bg-accentDark transition-colors z-20"
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
      >
        <MessageSquare className="text-white" size={24} />
      </motion.button>

      {/* Chatbot Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-28 left-4 sm:left-8 w-[90%] max-w-sm bg-white rounded-2xl shadow-xl z-30 overflow-hidden"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-accent text-white p-4 flex justify-between items-center">
              <span className="font-medium">LucyBot 💅✨</span>
              <button onClick={toggleChatbot} className="text-white">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isUser 
                        ? "bg-accent text-white rounded-br-none" 
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} /> {/* Auto-scroll anchor */}
            </div>

            {/* Input Area */}
            <div className="border-t p-3 flex gap-2">
              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={sendMessage}
                className="bg-accent hover:bg-accentDark text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
