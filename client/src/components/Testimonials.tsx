import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "Los tratamientos faciales son increíbles. Mi piel nunca ha lucido tan bien y el ambiente es realmente relajante. El personal es muy profesional y atento.",
    name: "María Sánchez",
    initials: "MS",
    since: "Cliente desde 2021",
    color: "primary",
    stars: 5
  },
  {
    id: 2,
    text: "He probado varios centros de belleza, pero ninguno como este. Los masajes son terapéuticos y el personal realmente entiende lo que necesitas. Totalmente recomendado.",
    name: "Carlos López",
    initials: "CL",
    since: "Cliente desde 2022",
    color: "secondary",
    stars: 5
  },
  {
    id: 3,
    text: "Llevo viniendo desde que abrieron y la calidad nunca ha bajado. Los tratamientos capilares han transformado mi cabello y el ambiente siempre es acogedor.",
    name: "Laura García",
    initials: "LG",
    since: "Cliente desde 2020",
    color: "primary",
    stars: 4.5
  },
  {
    id: 4,
    text: "El servicio de manicura y pedicura es excelente. Los diseños son preciosos y duran muchísimo. Además, el personal es muy amable y las instalaciones muy limpias.",
    name: "Ana Martínez",
    initials: "AM",
    since: "Cliente desde 2022",
    color: "secondary",
    stars: 5
  }
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideWidth, setSlideWidth] = useState(100);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update slide width on window resize
  useEffect(() => {
    const handleResize = () => {
      setSlideWidth(window.innerWidth >= 1024 ? 33.333 : 100);
    };
    
    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  // Handle navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="testimonios" className="bg-neutralDark py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold mb-3">
            Testimonios
          </h2>
          <p className="text-textLight max-w-2xl mx-auto">
            Lo que nuestros clientes opinan sobre nosotros
          </p>
        </motion.div>
        
        {/* Testimonials Slider */}
        <motion.div 
          className="relative px-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="overflow-hidden" ref={containerRef}>
            <motion.div 
              className="flex transition-all duration-500"
              style={{ transform: `translateX(-${currentSlide * slideWidth}%)` }}
              variants={containerVariants}
            >
              {testimonials.map((testimonial) => (
                <motion.div 
                  key={testimonial.id}
                  className={`min-w-full lg:min-w-[33.333%] px-4`}
                  variants={itemVariants}
                >
                  <div className="bg-white p-6 rounded-xl shadow-md h-full">
                    <div className="flex items-center mb-4">
                      <div className="text-accent flex">
                        {[...Array(Math.floor(testimonial.stars))].map((_, i) => (
                          <Star key={i} fill="currentColor" className="text-accent" size={18} />
                        ))}
                        {testimonial.stars % 1 !== 0 && (
                          <div className="relative">
                            <Star className="text-accent/30" size={18} />
                            <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
                              <Star fill="currentColor" className="text-accent" size={18} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-textLight italic mb-4">"{testimonial.text}"</p>
                    <div className="flex items-center">
                      <div className={`w-12 h-12 bg-${testimonial.color} rounded-full flex items-center justify-center text-accent font-medium`}>
                        {testimonial.initials}
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-textLight">{testimonial.since}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Navigation Buttons */}
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors"
            onClick={prevSlide}
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors"
            onClick={nextSlide}
          >
            <ChevronRight size={20} />
          </button>
        </motion.div>
        
        {/* Navigation Dots */}
        <motion.div 
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-accent" : "bg-primary/50"
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
