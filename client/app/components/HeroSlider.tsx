import React, { FC, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Slide {
  id: number;
  url: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

interface HeroSliderProps {
  slides: Slide[];
  autoPlayInterval?: number;
  className?: string;
}

const HeroSlider: FC<HeroSliderProps> = ({
  slides,
  autoPlayInterval = 6000,
  className = "",
}) => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slides.length <= 1) return;
    timeoutRef.current && clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(
      () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1)),
      autoPlayInterval
    );

    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [current, slides.length, autoPlayInterval]);

  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStart(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || dragStart === null) return;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || dragStart === null) {
      setIsDragging(false);
      setDragStart(null);
      return;
    }

    const dragEnd = e.clientX;
    const dragDistance = dragStart - dragEnd;
    const threshold = 50; // Minimum drag distance to trigger slide change

    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0) {
        // Dragged left, show next slide
        nextSlide();
      } else {
        // Dragged right, show previous slide
        prevSlide();
      }
    }

    setIsDragging(false);
    setDragStart(null);
  };

  return (
    <section
      ref={sliderRef}
      className={`relative w-full mx-auto overflow-hidden h-[300px] md:h-[500px] lg:h-[500px] md:mt-6 cursor-grab active:cursor-grabbing ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Slides */}
      <div className="relative h-full flex items-center justify-center">
        <AnimatePresence initial={false}>
          <motion.div
            key={slides[current].id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 flex justify-center"
          >
            {/* Peek effect */}
            <div className="w-[90%] md:w-[90%] lg:w-[80%] h-full overflow-hidden relative">
              <img
                src={slides[current].url}
                alt={slides[current].title}
                className="w-full h-[90%] object-cover select-none"
                draggable={false}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrow Controls */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="hidden md:block lg:block absolute left-4 top-1/2 -translate-y-1/2 text-black text-4xl p-3 rounded-full transition cursor-pointer"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="hidden md:block lg:block absolute right-4 top-1/2 -translate-y-1/2 text-black text-4xl p-3 rounded-full transition cursor-pointer"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition ${idx === current ? "bg-white" : "bg-gray-400"
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;

