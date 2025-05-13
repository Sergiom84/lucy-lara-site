import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  MapPin, Phone, Mail, Clock, 
  Facebook, Instagram, Twitter, Dribbble
} from "lucide-react";

const Footer = () => {
  // Navigation categories
  const services = [
    { href: "#", label: "Tratamientos Faciales" },
    { href: "#", label: "Masajes Terapéuticos" },
    { href: "#", label: "Manicura y Pedicura" },
    { href: "#", label: "Tratamientos Capilares" },
    { href: "#", label: "Tratamientos Corporales" },
    { href: "#", label: "Maquillaje Profesional" }
  ];
  
  const quickLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#servicios", label: "Servicios" },
    { href: "#galeria", label: "Galería" },
    { href: "#testimonios", label: "Testimonios" },
    { href: "#reserva", label: "Reservar" },
    { href: "#contacto", label: "Contacto" }
  ];
  
  const contactInfo = [
    { 
      icon: <MapPin size={16} className="mt-1 text-accent" />, 
      text: "Calle Belleza 123, 28001 Madrid" 
    },
    { 
      icon: <Phone size={16} className="mt-1 text-accent" />, 
      text: "+34 912 345 678" 
    },
    { 
      icon: <Mail size={16} className="mt-1 text-accent" />, 
      text: "info@beautywellness.com" 
    },
    { 
      icon: <Clock size={16} className="mt-1 text-accent" />, 
      text: "Lun-Vie: 10:00 - 20:00\nSáb: 10:00 - 14:00" 
    }
  ];

  return (
    <footer className="bg-textDark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-playfair font-semibold mb-4">
              Beauty<span className="text-accent">&</span>Wellness
            </h3>
            <p className="text-gray-400 mb-4">
              Tu centro de belleza y bienestar donde cuidamos de ti con los tratamientos más avanzados.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                <Dribbble size={18} />
              </a>
            </div>
          </div>
          
          {/* Services Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Servicios</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.href} 
                    className="text-gray-400 hover:text-accent transition-colors"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium mb-4">Contacto</h4>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start gap-3">
                  {info.icon}
                  <span className="text-gray-400 whitespace-pre-line">{info.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Beauty&Wellness. Todos los derechos reservados.
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
