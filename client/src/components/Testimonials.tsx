import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "Experiencia muy agradable. El peeling dejó mi piel renovada y con una sensación de frescura increíble. Tamara es una muy buena profesional y persona, me asesoró muchísimo con el cuidado en casa. Volveré sin duda con el tratamiento por el que iba. Tenemos mucha suerte de tener un sitio que está a este nivel de calidad en la Ciudad de Los Ángeles. Gracias por todo",
    name: "Victoria Navarrete",
    initials: "VN",
    since: "Hace 2 meses",
    color: "primary",
    stars: 5
  },
  {
    id: 2,
    text: "Como clienta habitual desde hace años, solo puedo decir que, los tratamientos que ofrecen, no solo destacan por su calidad y resultados. (Además, siempre cuentan con nuevos tratamientos y tecnologías). Pero para mí, lo que realmente diferencia a este centro de otros, es el seguimiento y el mimo con el que nos cuidan a cada una de nosotras, porque siempre se aseguran y supervisan, que el tratamiento funcione y ¡haya buenos resultados! ¡Merece la pena conocer este centro y a su maravilloso equipo chicas! 😊",
    name: "Ana Herreros",
    initials: "AH",
    since: "Hace 3 meses",
    color: "secondary",
    stars: 5
  },
  {
    id: 3,
    text: "La atención personalizada y muy profesional genera máxima confianza y efectividad con los tratamientos. Altamente recomendable. En trato inmejorable",
    name: "Pilar Losada",
    initials: "PL",
    since: "Hace 2 semanas",
    color: "primary",
    stars: 5
  },
  {
    id: 4,
    text: "Muy buena experiencia con la depilación. Además, Tamara me ha asesorado y aconsejado desde la sinceridad y profesionalidad. Se agradece una atención tan empática. Totalmente recomendable 😊",
    name: "Victoria Serna Villaverde",
    initials: "VS",
    since: "Hace 3 semanas",
    color: "secondary",
    stars: 5
  },
  {
    id: 5,
    text: "Hace unos meses que voy hacerme el láser y la eléctrica, y desde el primer día me han aconsejado qué tipo de depilación hacerme y cada vez que voy son un encanto, tanto Lucy como Tamara. Os lo recomiendo.",
    name: "María Luisa Romeo",
    initials: "MR",
    since: "Hace 1 mes",
    color: "primary",
    stars: 5
  },
  {
    id: 6,
    text: "Me hice un masaje descontracturante y noté mucha mejoría en la zona de espalda y cuello. Muy buen trato y ambiente tranquilo.",
    name: "Luisma Garrote Manjón",
    initials: "LG",
    since: "Hace 2 meses",
    color: "secondary",
    stars: 5
  },
  {
    id: 7,
    text: "El trato es excelente te asesoran personalmente sobre el tratamiento que necesitas en mi caso para depilación con láser, muy contenta con la experiencia 😊",
    name: "María Robles",
    initials: "MR",
    since: "Hace 5 meses",
    color: "primary",
    stars: 5
  },
  {
    id: 8,
    text: "En mi experiencia con la depilación eléctrica, he tenido unos resultados muy satisfactorios. He probado en diferentes centros, y aún este es el mejor. Hacen un trabajo de calidad además de tener un trato inmejorable con el cliente. Realizan su trabajo con mucha profesionalidad y cariño además de recomendarte de manera especial tratamientos más acordes para ti. Eficacia y buenos resultados.",
    name: "María Finez",
    initials: "MF",
    since: "Hace 4 años",
    color: "secondary",
    stars: 5
  },
  {
    id: 9,
    text: "Después de haber ido varias sesiones, le doy un máximo de ⭐, ya que estoy reduciendo el vello canoso, tan difícil de erradicar, y el trato es buenísimo, y los costes del tratamiento me parecen asequibles. Lo recomiendo 100%.",
    name: "Eva Fernández",
    initials: "EF",
    since: "Hace 2 años",
    color: "primary",
    stars: 5
  }
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideWidth, setSlideWidth] = useState(100);
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to get avatar background color
  const getAvatarColorClass = (color: string) => {
    switch (color) {
      case 'primary':
        return 'bg-primary';
      case 'secondary':
        return 'bg-secondary';
      default:
        return 'bg-accent';
    }
  };

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
                      <div className={`w-12 h-12 ${getAvatarColorClass(testimonial.color)} rounded-full flex items-center justify-center text-white font-medium`}>
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
