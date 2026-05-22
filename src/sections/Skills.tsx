import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Server,
  Brain,
  Database,
  Workflow,
  Layers,
  Code2,
  Cpu,
  Globe,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Languages',
    icon: Code2,
    skills: ['Python', 'TypeScript', 'Go', 'SQL'],
  },
  {
    title: 'Frameworks',
    icon: Layers,
    skills: ['FastAPI', 'React', 'Node.js', 'Django'],
  },
  {
    title: 'AI / ML',
    icon: Brain,
    skills: ['PyTorch', 'Transformers', 'RLHF', 'LLM Fine-tuning'],
  },
  {
    title: 'Infrastructure',
    icon: Server,
    skills: ['Docker', 'Kubernetes', 'HAProxy', 'AWS'],
  },
  {
    title: 'Data',
    icon: Database,
    skills: ['PostgreSQL', 'Redis', 'MongoDB', 'Kafka'],
  },
  {
    title: 'DevOps',
    icon: Workflow,
    skills: ['GitHub Actions', 'Terraform', 'CI/CD', 'Monitoring'],
  },
  {
    title: 'Systems',
    icon: Cpu,
    skills: ['Distributed Systems', 'Load Balancing', 'Caching', 'Microservices'],
  },
  {
    title: 'Protocols',
    icon: Globe,
    skills: ['REST', 'WebSocket', 'gRPC', 'GraphQL'],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const ctx = gsap.context(() => {
      const items = cards.querySelectorAll('.skill-card');
      gsap.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
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
      id="skills"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 px-6 lg:px-8 bg-void"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="font-body text-xs uppercase tracking-[0.35em] text-gold mb-4">
            Toolkit
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Technical Arsenal
          </h2>
          <p className="font-body text-sm text-white/40 max-w-xl mt-4 leading-relaxed">
            A curated stack built for shipping reliable, high-performance systems.
            Every tool here has been battle-tested in production.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {skillCategories.map((category, i) => (
            <div
              key={i}
              className="skill-card group p-5 border border-white/5 hover:border-gold/20 bg-void-light/30 hover:bg-void-light/50 transition-all duration-300"
            >
              <category.icon
                size={18}
                className="text-white/20 group-hover:text-gold/60 transition-colors duration-300 mb-4"
              />
              <p className="font-body text-xs text-white/40 uppercase tracking-wider mb-3">
                {category.title}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs font-body text-white/50 border border-white/5 bg-white/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
