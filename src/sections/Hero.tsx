import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  scrollTo: (target: string) => void;
}

export default function Hero({ scrollTo }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationId: number = 0;
    let geometry: THREE.IcosahedronGeometry | null = null;
    let material: THREE.MeshBasicMaterial | null = null;
    let coreGeo: THREE.IcosahedronGeometry | null = null;
    let coreMat: THREE.MeshBasicMaterial | null = null;
    let particlesGeo: THREE.BufferGeometry | null = null;
    let particlesMat: THREE.PointsMaterial | null = null;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Wireframe icosahedron
      geometry = new THREE.IcosahedronGeometry(3, 1);
      material = new THREE.MeshBasicMaterial({
        color: 0xd4af37,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });
      const icosahedron = new THREE.Mesh(geometry, material);
      scene.add(icosahedron);

      // Inner glowing core
      coreGeo = new THREE.IcosahedronGeometry(1.5, 0);
      coreMat = new THREE.MeshBasicMaterial({
        color: 0xd4af37,
        transparent: true,
        opacity: 0.1,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      scene.add(core);

      // Particle field
      particlesGeo = new THREE.BufferGeometry();
      const particlesCount = 300;
      const posArray = new Float32Array(particlesCount * 3);
      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
      }
      particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      particlesMat = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xd4af37,
        transparent: true,
        opacity: 0.6,
      });
      const particles = new THREE.Points(particlesGeo, particlesMat);
      scene.add(particles);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);
      const rimLight = new THREE.DirectionalLight(0xd4af37, 2.0);
      rimLight.position.set(-5, -5, -5);
      scene.add(rimLight);

      camera.position.z = 8;

      let time = 0;

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        time += 0.005;

        icosahedron.rotation.x = time * 0.3;
        icosahedron.rotation.y = time * 0.5;
        core.rotation.x = time * 0.5;
        core.rotation.y = time * 0.3;
        particles.rotation.y = time * 0.1;

        // Breathing effect
        const scale = 1 + Math.sin(time * 2) * 0.05;
        icosahedron.scale.set(scale, scale, scale);

        renderer!.render(scene, camera);
      };
      animate();

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer!.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', onResize);
      };
    } catch (e) {
      // WebGL not available — skip canvas animation
      console.warn('WebGL not available, skipping 3D hero animation');
    }

    // Text entrance animation (runs regardless of WebGL)
    if (textRef.current) {
      const elements = textRef.current.querySelectorAll('.animate-in');
      gsap.fromTo(
        elements,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
      );
    }

    return () => {
      cancelAnimationFrame(animationId);
      renderer?.dispose();
      geometry?.dispose();
      material?.dispose();
      coreGeo?.dispose();
      coreMat?.dispose();
      particlesGeo?.dispose();
      particlesMat?.dispose();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      <div
        ref={textRef}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <p className="animate-in font-body text-xs uppercase tracking-[0.2em] text-white/40 mb-6">
          Backend Engineer · AI Systems · Distributed Infrastructure
        </p>

        <h1 className="animate-in font-display text-[14vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] font-bold leading-[0.9] tracking-tight mb-8">
          <span className="block">VASU</span>
          <span className="block text-gradient-gold">BHARDWAJ</span>
        </h1>

        <p className="animate-in font-body text-sm md:text-base text-white/50 max-w-xl mx-auto leading-relaxed mb-12">
          I design and ship backend systems for high-stakes environments. Currently
          building AI-driven operational tooling at Zenarate. Ranked Top 5% globally
          on LeetCode. I care about reliability, performance, and clean architecture.
        </p>

        <div className="animate-in flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollTo('#projects')}
            className="group relative px-8 py-3 bg-gold text-void font-body text-xs uppercase tracking-[0.2em] font-semibold hover:bg-gold-light transition-all duration-300"
          >
            <span className="relative z-10">View Projects</span>
          </button>
          <button
            onClick={() => scrollTo('#terminal')}
            className="group px-8 py-3 border border-white/10 text-white/60 font-body text-xs uppercase tracking-[0.2em] hover:border-gold/30 hover:text-gold transition-all duration-300 flex items-center gap-2"
          >
            <span>Get in Touch</span>
            <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-void to-transparent z-10" />
    </section>
  );
}
