import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Incident Commander',
    subtitle: 'Autonomous LLM Operations',
    description: `An LLM agent that takes on the on-call engineer role at a simulated fintech company. It receives incident alerts, investigates through tool calls (logs, metrics, runbooks), forms hypotheses, and either resolves or escalates with a coherent handoff.`,
    highlights: [
      'Built end-to-end in hackathon time: environment design, agent loop, tool surface, evaluation',
      'No tutorial scaffolding — shaped how I think about AI in production',
    ],
    image: '/incident-commander.png',
    tags: ['Python', 'Pydantic', 'WebSocket', 'TRL', 'Unsloth', 'GRPO'],
    github: 'https://github.com/vasubhrdwj/incident-commander-openenv',
  },
  {
    id: 2,
    title: 'L4 Load Balancer',
    subtitle: 'High-Availability Infrastructure',
    description:
      'A Layer 4 load balancer built with HAProxy for a FastAPI microservices cluster. Features active health checks, rate limiting, and automated failover — fully containerized with Docker Compose.',
    highlights: [],
    image: '/image-2.jpg',
    tags: ['HAProxy', 'Docker', 'FastAPI', 'DevOps', 'JavaScript', 'Python'],
    github: 'https://github.com/vasubhrdwj/l4-load-balancer',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        const image = card.querySelector('.project-image');
        const content = card.querySelector('.project-content');

        if (image) {
          gsap.fromTo(
            image,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        if (content) {
          gsap.fromTo(
            content,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              delay: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-void"
    >
      <div className="py-24 md:py-32 px-6 lg:px-8 max-w-7xl mx-auto">
        <p className="font-body text-xs uppercase tracking-[0.35em] text-gold mb-4">
          Selected Work
        </p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Featured Projects
        </h2>
        <p className="font-body text-sm text-white/40 max-w-xl">
          Production-grade systems that demonstrate systems thinking, AI integration,
          and disciplined engineering.
        </p>
      </div>

      <div className="relative">
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="relative w-full"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh] lg:min-h-[80vh]">
              {/* Image Side */}
              <div className={`project-image relative h-[50vh] lg:h-auto overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-void via-void/50 to-transparent lg:bg-gradient-to-r" />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent lg:hidden" />
                
                {/* Project number */}
                <div className="absolute top-8 left-8 lg:top-16 lg:left-16">
                  <span className="font-display text-[15vw] lg:text-[10vw] font-bold text-white/5 leading-none">
                    0{i + 1}
                  </span>
                </div>
              </div>

              {/* Content Side */}
              <div className={`project-content relative flex flex-col justify-center px-6 lg:px-16 py-12 lg:py-0 bg-void ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="max-w-lg">
                  <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-4">
                    {project.subtitle}
                  </p>
                  <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                    {project.title}
                  </h3>
                  <p className="font-body text-sm text-white/50 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  {project.highlights.length > 0 && (
                    <ul className="mb-6 space-y-2">
                      {project.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2 font-body text-xs text-white/40 leading-relaxed">
                          <span className="text-gold mt-0.5">—</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-body uppercase tracking-wider text-white/40 border border-white/10 bg-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 px-6 py-3 bg-gold text-void font-body text-xs uppercase tracking-[0.2em] font-semibold hover:bg-gold-light transition-all duration-300"
                    >
                      <Github size={14} />
                      <span>View Code</span>
                      <ArrowUpRight
                        size={14}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider between projects */}
            {i < projects.length - 1 && (
              <div className="hidden lg:block w-full h-px bg-white/5 my-0" />
            )}
          </div>
        ))}
      </div>

      {/* More on GitHub link */}
      <div className="py-16 text-center">
        <a
          href="https://github.com/vasubhrdwj"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-white/30 hover:text-gold font-body text-xs uppercase tracking-wider transition-colors duration-300"
        >
          <Github size={14} />
          <span>More projects on GitHub</span>
          <ArrowUpRight
            size={14}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </a>
      </div>
    </section>
  );
}
