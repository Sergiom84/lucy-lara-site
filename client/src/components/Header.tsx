import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, Facebook, Instagram, Search } from "lucide-react";
import LogoTransparent from "../assets/images/nuevo-logo.webp";
import logoFigura from "../assets/images/logo-figura.webp";


const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  // Determine if we're on the home page or a product page
  const isHomePage = location === "/";
  
  // Navigation links (updated based on user request)
  const navLinks = [
    { href: isHomePage ? "#productos" : "/#productos", label: "Productos" },
    { href: isHomePage ? "#promociones" : "/#promociones", label: "Promociones" },
    { href: isHomePage ? "#booking" : "/#booking", label: "Contacto" }
  ];

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Promo Bar with contact info */}
      <div className="bg-[#f8e3cf] text-[#333] py-2 flex justify-center items-center gap-8 sticky top-0 z-50">
        <div className="flex items-center text-sm">
          <Phone className="h-4 w-4 mr-1 text-[#8b2154]" /> 
          <span>91 505 20 67 | 684 203 633</span>
        </div>
        <div className="flex items-center text-sm">
          <Mail className="h-4 w-4 mr-1 text-[#8b2154]" /> 
          <span>centrodebelleza@centroesteticalucylara.es</span>
        </div>
        <div className="flex items-center space-x-3">
          <a 
            href="https://www.facebook.com/CBLUCYLARA/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-[#8b2154]"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a 
            href="https://www.instagram.com/esteticalucylara/?hl=es" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-[#8b2154]"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </div>
      </div>
      
      {/* Main Header - More Translucent */}
      <header className={`sticky top-[2.5rem] z-50 bg-[#3a3a3a]/35 backdrop-blur-[1px] text-white transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}>
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          {/* Logo Image - Using transparent logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="flex items-center">
                <img 
                  src={logoFigura} 
                  alt="Logo Lucy Lara" 
                  className="h-12 w-auto" 
                />
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex space-x-6 items-center">
              {navLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className={`text-white hover:text-[#8b2154] transition-colors relative py-2 px-1 uppercase text-sm tracking-wide
                    ${location === link.href ? "border-b border-[#8b2154]" : ""}`}
                >
                  {link.label}
                </a>
              ))}

              

            </div>
          </nav>
          
          {/* Mobile Navigation Button */}
          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation Menu with Animation - More translucent */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden bg-[#3a3a3a]/35 backdrop-blur-[1px] absolute w-full shadow-md z-20"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
                {navLinks.map((link, index) => (
                  <motion.a 
                    key={index}
                    href={link.href}
                    className="text-white hover:text-[#8b2154] py-2 transition-colors uppercase text-sm tracking-wide"
                    onClick={handleLinkClick}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {link.label}
                  </motion.a>
                ))}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
