import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  autoPlay = true,
  interval = 3000, // 3 seconds for each slide
  className
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Separate goToNext for auto-play and for user navigation
  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // New: autoPlayGoToNext ignores isAnimating
  const autoPlayGoToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Setup auto-play timer - fixed to cycle through all images
  useEffect(() => {
    if (autoPlay && images.length > 1) {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
      // Use autoPlayGoToNext for timer
      autoPlayTimerRef.current = setTimeout(autoPlayGoToNext, interval);
    }
    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [currentIndex, autoPlay, interval, images.length]);

  const handleGoToNext = () => {
    goToNext();
  };

  const handleGoToPrev = () => {
    goToPrev();
  };

  const handleGoToIndex = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    
    setIsAnimating(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handleGoToPrev();
      } else if (e.key === 'ArrowRight') {
        handleGoToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Only render if we have images
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div 
      className={cn(
        "relative w-full h-full overflow-hidden rounded-xl", 
        className
      )}
      aria-live="polite"
    >
      {images.map((image, index) => (
        <div
          key={index}
          ref={el => slidesRef.current[index] = el}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-1000",
            index === currentIndex ? "opacity-100" : "opacity-0"
          )}
          aria-hidden={index !== currentIndex}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="carousel-image w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Only show navigation controls if we have more than one image */}
      {images.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-background/50 backdrop-blur-sm text-foreground hover:bg-background/80 transition-all duration-300"
            onClick={handleGoToPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-background/50 backdrop-blur-sm text-foreground hover:bg-background/80 transition-all duration-300"
            onClick={handleGoToNext}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
          
          {/* Indicator dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "transition-all duration-300 rounded-full",
                  index === currentIndex 
                    ? "bg-white w-8 h-3" 
                    : "bg-white/50 w-3 h-3 hover:bg-white/80"
                )}
                onClick={() => handleGoToIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex ? "true" : "false"}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
