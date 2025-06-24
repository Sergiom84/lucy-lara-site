import { motion } from "framer-motion";
import { 
  MapPin, Phone, Mail, Clock, 
  Facebook, Instagram
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-textDark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
          {/* Centro Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-accent mb-4">Centro de Estética Lucy Lara</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Tu centro de belleza y bienestar donde cuidamos de ti con los tratamientos más avanzados y personalizados.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <motion.a
                href="https://www.facebook.com/CBLUCYLARA/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/esteticalucylara/?hl=es"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors"
              >
                <Instagram size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-accent mb-4">Contacto</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 text-accent" />
                <span className="text-sm leading-relaxed">
                  Calle Alegría de la Huerta 22, 28041 - Madrid
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="mt-1 text-accent" />
                <span className="text-sm leading-relaxed">
                  91 505 20 67 | 684 203 633
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="mt-1 text-accent" />
                <span className="text-sm leading-relaxed">
                  centrodebelleza@centroesteticalucylara.es
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={16} className="mt-1 text-accent" />
                <span className="text-sm leading-relaxed">
                  Lunes a viernes: 10:00 - 13:30<br />
                  16:00 - 19:30
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-accent text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Centro de Estética Lucy Lara. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-accent text-sm transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-accent text-sm transition-colors">
                Términos y Condiciones
              </a>
              <a href="#" className="text-gray-400 hover:text-accent text-sm transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
