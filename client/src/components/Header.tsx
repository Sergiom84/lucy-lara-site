import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, Facebook, Instagram, Search, ShoppingBag, User } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  // Navigation links (updated to match image)
  const navLinks = [
    { href: "#inicio", label: "Home" },
    { href: "#reserva", label: "Appointments" },
    { href: "#servicios", label: "Promotions" },
    { href: "#gift-cards", label: "Gift Cards" }
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
      {/* Top Info Bar */}
      <div className="bg-[#f2f2f2] text-gray-700 py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-1" /> 
              <span>91 505 20 67 | 684 203 633</span>
            </div>
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-1" /> 
              <span>centrodebeleza@centroesteticalucylara.es</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <a href="#" className="text-gray-700 hover:text-[#8b2154]">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-700 hover:text-[#8b2154]">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Promo Bar - Similar to the one in the image */}
      <div className="bg-[#f8e3cf] text-[#333] py-2 text-center font-medium">
        <span>10% OFF ALL GIFT CARDS</span>
      </div>
      
      {/* Main Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${scrolled ? "bg-white/90 shadow-sm" : "bg-white"}`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex flex-col items-center">
            <Link href="/" className="flex flex-col items-center">
              <img 
                src="/images/logo-lucylara.png" 
                alt="Lucy Lara" 
                className="h-24 w-auto"
              />
              <span className="mt-1 text-[#8b2154] text-sm font-medium">Centro de belleza y estética</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex space-x-8 items-center border-b-2 border-[#8b2154]">
              {navLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className={`text-gray-700 hover:text-[#8b2154] transition-colors relative py-2 px-2
                    ${location === link.href ? "text-[#8b2154] border-b-2 border-[#8b2154] -mb-[2px]" : ""}`}
                >
                  {link.label}
                </a>
              ))}
              <div className="relative px-2 py-2 group">
                <span className="flex items-center cursor-pointer text-gray-700 hover:text-[#8b2154]">
                  More <span className="ml-1">▼</span>
                </span>
              </div>
              
              {/* Divider */}
              <span className="text-gray-400 text-xl font-light">|</span>
              
              {/* Icons */}
              <div className="flex items-center space-x-4">
                <a href="#" className="text-gray-700 hover:text-[#8b2154]">
                  <Search className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-700 hover:text-[#8b2154]">
                  <ShoppingBag className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-700 hover:text-[#8b2154]">
                  <User className="h-5 w-5" />
                </a>
              </div>
            </div>
          </nav>
          
          {/* Mobile Navigation Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation Menu with Animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden bg-white absolute w-full shadow-md z-20"
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
                    className="text-gray-700 hover:text-[#8b2154] py-2 transition-colors"
                    onClick={handleLinkClick}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.div 
                  className="flex items-center space-x-4 py-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                >
                  <a href="#" className="text-gray-700 hover:text-[#8b2154]">
                    <Search className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-700 hover:text-[#8b2154]">
                    <ShoppingBag className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-700 hover:text-[#8b2154]">
                    <User className="h-5 w-5" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
