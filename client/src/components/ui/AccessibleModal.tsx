import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

const AccessibleModal: React.FC<AccessibleModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  description,
  className,
  size = 'md',
  showCloseButton = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const [trapElements, setTrapElements] = useState<HTMLElement[]>([]);

  // Size variants
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  // Handle focus trap
  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Store the previously focused element
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement;

      // Get all focusable elements within the modal
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;

      setTrapElements(Array.from(focusableElements));

      // Focus the first focusable element
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }

      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      return () => {
        // Restore body scroll
        document.body.style.overflow = 'unset';
        
        // Return focus to previously focused element
        if (previouslyFocusedElementRef.current) {
          previouslyFocusedElementRef.current.focus();
        }
      };
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        if (trapElements.length === 0) return;

        const currentIndex = trapElements.indexOf(document.activeElement as HTMLElement);
        
        if (e.shiftKey) {
          // Shift + Tab - go to previous element
          e.preventDefault();
          const previousIndex = currentIndex - 1;
          const targetIndex = previousIndex < 0 ? trapElements.length - 1 : previousIndex;
          trapElements[targetIndex]?.focus();
        } else {
          // Tab - go to next element
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % trapElements.length;
          trapElements[nextIndex]?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, trapElements, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={cn(
                'relative w-full bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-hidden',
                sizeClasses[size],
                className
              )}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? 'modal-title' : undefined}
              aria-describedby={description ? 'modal-description' : undefined}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  {title && (
                    <h2
                      id="modal-title"
                      className="text-xl font-semibold text-gray-900"
                    >
                      {title}
                    </h2>
                  )}
                  
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8b2154] focus:ring-offset-2 rounded-lg transition-colors"
                      aria-label="Cerrar modal"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              )}

              {/* Description */}
              {description && (
                <div className="px-6 py-2">
                  <p id="modal-description" className="text-sm text-gray-600">
                    {description}
                  </p>
                </div>
              )}

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AccessibleModal;