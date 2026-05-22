import { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import Stats from './sections/Stats';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Terminal from './sections/Terminal';
import Navigation from './sections/Navigation';
import CustomCursor from './sections/CustomCursor';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as any);
    };
  }, []);

  const scrollTo = useCallback((target: string) => {
    lenisRef.current?.scrollTo(target, { duration: 1.5 });
  }, []);

  return (
    <div className="relative bg-void text-white min-h-screen overflow-x-hidden">
      <CustomCursor />
      <Navigation scrollTo={scrollTo} />
      
      <main>
        <Hero scrollTo={scrollTo} />
        <Stats />
        <Skills />
        <Projects />
        <Experience scrollTo={scrollTo} />
        <Terminal 
          isOpen={terminalOpen} 
          onOpen={() => setTerminalOpen(true)} 
          onClose={() => setTerminalOpen(false)} 
        />
      </main>
      
      <Footer scrollTo={scrollTo} />
    </div>
  );
}

export default App;
