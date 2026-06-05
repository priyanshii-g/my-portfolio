import { useEffect, useRef } from 'react';

export function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 1. ADD the class when it enters the screen
          entry.target.classList.add('is-visible');
          
          // WE DELETED THE "unobserve" LINE HERE!
        } else {
          // 2. REMOVE the class when you scroll away so it resets!
          entry.target.classList.remove('is-visible');
        }
      },
      { threshold: 0.05 } 
    );

    if (ref.current) {
      setTimeout(() => {
        observer.observe(ref.current);
      }, 100);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}