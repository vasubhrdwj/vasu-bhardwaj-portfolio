import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Briefcase, Calendar, MapPin, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: 'Zenarate',
    role: 'Software Engineer',
    period: 'July 2025 – Present',
    location: 'Remote',
    description:
      'Building core backend systems and AI-driven operational tooling. Shipped a real-time inference pipeline that reduced model latency by 40%. Designed a distributed task queue handling 10K+ jobs per day.',
    highlights: ['Distributed Systems', 'AI Tooling', 'Backend Architecture'],
  },
];

export default function Experience({ scrollTo }: { scrollTo: (target: string) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      const elements = content.querySelectorAll('.animate-experience');
      gsap.fromTo(
        elements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 px-6 lg:px-8 bg-void"
    >
      <div ref={contentRef} className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="animate-experience font-body text-xs uppercase tracking-[0.35em] text-gold mb-4">
            Professional Journey
          </p>
          <h2 className="animate-experience font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Experience
          </h2>
          <p className="animate-experience font-body text-sm text-white/40 max-w-xl mx-auto leading-relaxed">
            Engineering systems that matter. Every role has sharpened my ability
            to build software that performs under real-world constraints.
          </p>
        </div>

        {/* Featured Job Card */}
        <div className="animate-experience relative border border-white/10 bg-void-light/50 p-8 md:p-12 overflow-hidden">
          {/* Gold accent bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/40 via-gold/20 to-transparent" />
          
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-gold/30 bg-gold/10 mb-4">
                <Briefcase size={12} className="text-gold" />
                <span className="font-body text-xs text-gold uppercase tracking-wider font-medium">
                  {experiences[0].role}
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                {experiences[0].company}
              </h3>
              <div className="flex items-center gap-4 text-white/40">
                <span className="flex items-center gap-1.5 font-body text-xs">
                  <Calendar size={12} />
                  {experiences[0].period}
                </span>
                <span className="flex items-center gap-1.5 font-body text-xs">
                  <MapPin size={12} />
                  {experiences[0].location}
                </span>
              </div>
            </div>
          </div>

          <p className="font-body text-sm text-white/60 leading-relaxed mb-6">
            {experiences[0].description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {experiences[0].highlights.map((h) => (
              <span
                key={h}
                className="px-3 py-1 text-xs font-body text-white/50 border border-white/10 bg-white/5"
              >
                {h}
              </span>
            ))}
          </div>

          {/* Resume CTA */}
          <div className="pt-8 border-t border-white/10">
            <a
              href="/resume.pdf"
              download
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gold text-void font-body text-xs uppercase tracking-[0.2em] font-semibold hover:bg-gold-light transition-all duration-300"
            >
              <Download size={14} />
              <span>Download Resume</span>
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
            <p className="font-body text-xs text-white/30 mt-4">
              Full career history and references available on request
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
