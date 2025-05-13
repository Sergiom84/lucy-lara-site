import { useState, useRef, useEffect } from "react";
import { ArrowLeftRight } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  title?: string;
}

const BeforeAfterSlider = ({ 
  beforeImage, 
  afterImage, 
  beforeAlt = "Before image", 
  afterAlt = "After image",
  title
}: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const position = ((e.clientX - rect.left) / rect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, position)));
    };
    
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const position = ((touch.clientX - rect.left) / rect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, position)));
      
      // Prevent scrolling while dragging
      e.preventDefault();
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleMouseUp);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, []);
  
  const startDragging = () => {
    isDragging.current = true;
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-md">
      <div 
        className="relative overflow-hidden"
        ref={containerRef}
      >
        {/* Base image (before) */}
        <img 
          src={beforeImage} 
          alt={beforeAlt} 
          className="w-full"
        />
        
        {/* After image with dynamic width */}
        <div 
          className="absolute top-0 left-0 overflow-hidden h-full"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={afterImage} 
            alt={afterAlt} 
            className="w-full h-full object-cover"
            style={{ 
              width: `${100 / (sliderPosition / 100)}%`,
              maxWidth: "none"
            }}
          />
        </div>
        
        {/* Slider */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
          onMouseDown={startDragging}
          onTouchStart={startDragging}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
            <ArrowLeftRight className="text-accent" size={16} />
          </div>
        </div>
      </div>
      
      {/* Optional title */}
      {title && (
        <div className="p-4 bg-white">
          <h4 className="font-medium text-center">{title}</h4>
        </div>
      )}
    </div>
  );
};

export default BeforeAfterSlider;
