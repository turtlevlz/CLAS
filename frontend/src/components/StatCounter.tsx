import { useState, useEffect, useRef } from 'react';

interface Props {
  value: string; // Ejemplo: "150+"
}

export const StatCounter = ({ value }: Props) => {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  // Extraemos solo el número de la cadena (ej: de "150+" obtenemos 150)
  const targetNumber = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    // 1. Detectar cuando el elemento entra en pantalla
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.5 }); // Se activa cuando el 50% del componente es visible

    if (domRef.current) observer.observe(domRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // 2. Lógica de la animación de los números
    if (isVisible && current < targetNumber) {
      const duration = 1000; // 2 segundos que dura la animación
      const steps = 50; 
      const increment = targetNumber / (duration / steps);

      const timer = setInterval(() => {
        setCurrent((prev) => {
          const next = prev + increment;
          if (next >= targetNumber) {
            clearInterval(timer);
            return targetNumber;
          }
          return next;
        });
      }, steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, targetNumber]);

  return (
    <div ref={domRef} className="text-5xl font-black text-[rgb(68,111,182)] mb-2 tracking-tighter drop-shadow-lg">
      {Math.floor(current)}{suffix}
    </div>
  );
};