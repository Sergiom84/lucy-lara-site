import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, Facebook, Instagram, Search } from "lucide-react";
import OptimizedImage from "./ui/OptimizedImage";
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
      <div className="bg-[#f8e3cf] text-[#333] py-2 px-4 sticky top-0 z-50">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-8 text-xs sm:text-sm">
          <div className="flex items-center">
            <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-[#8b2154]" /> 
            <span className="whitespace-nowrap">91 505 20 67 | 684203633</span>
          </div>
          <div className="hidden sm:flex items-center">
            <Mail className="h-4 w-4 mr-1 text-[#8b2154]" /> 
            <span className="truncate max-w-[200px] md:max-w-none">centrodebelleza@centroesteticalucylara.es</span>
          </div>
          <div className="flex items-center space-x-3">
            <a 
              href="https://www.facebook.com/CBLUCYLARA/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[#8b2154] transition-colors"
            >
              <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            <a 
              href="https://www.instagram.com/esteticalucylara/?hl=es" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[#8b2154] transition-colors"
            >
              <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Main Header - More Translucent */}
      <header className={`sticky top-[2rem] sm:top-[2.5rem] z-50 bg-[#3a3a3a]/35 backdrop-blur-[1px] text-white transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}>
        <div className="container mx-auto px-4 py-2 flex justify-between items-center min-h-[3rem]">
          {/* Logo Image - Using transparent logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="flex items-center">
                <OptimizedImage
                  src={logoFigura} 
                  alt="Logo Lucy Lara" 
                  className="h-10 w-auto sm:h-12"
                  priority={true}
                  width={48}
                  height={48}
                />
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex space-x-4 lg:space-x-6 items-center">
              {navLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className={`text-white hover:text-[#8b2154] transition-colors relative py-2 px-1 uppercase text-xs lg:text-sm tracking-wide whitespace-nowrap
                    ${location === link.href ? "border-b border-[#8b2154]" : ""}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
          
          {/* Mobile Navigation Button */}
          <button 
            className="md:hidden text-white focus:outline-none p-2 rounded-md hover:bg-white/10 transition-colors" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        {/* Mobile Navigation Menu with Animation - More translucent */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden bg-[#3a3a3a]/95 backdrop-blur-sm absolute w-full shadow-lg z-20 border-t border-white/10"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                {navLinks.map((link, index) => (
                  <motion.a 
                    key={index}
                    href={link.href}
                    className="text-white hover:text-[#8b2154] py-3 px-2 transition-colors uppercase text-sm tracking-wide border-b border-white/10 last:border-b-0"
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
