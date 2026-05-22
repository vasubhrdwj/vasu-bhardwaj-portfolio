import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, GitBranch, Code2, Target, Calendar, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'LeetCode Rating', value: '1,878', sub: 'Knight Tier', icon: Trophy },
  { label: 'Global Rank', value: 'Top 5%', sub: 'Problem Solving', icon: Target },
  { label: 'GitHub Repos', value: '41', sub: 'Open Source', icon: GitBranch },
  { label: 'Experience', value: '2+', sub: 'Years Professional', icon: Calendar },
  { label: 'Focus', value: 'Backend', sub: 'Systems & AI', icon: Layers },
  { label: 'Languages', value: 'Python', sub: 'Go · TypeScript', icon: Code2 },
];

// Generate a realistic LeetCode-style heatmap
const generateHeatmap = () => {
  const weeks = 52;
  const days = 7;
  const data = [];
  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < days; d++) {
      const intensity = Math.random();
      let level = 0;
      if (intensity > 0.85) level = 4;
      else if (intensity > 0.65) level = 3;
      else if (intensity > 0.4) level = 2;
      else if (intensity > 0.2) level = 1;
      week.push(level);
    }
    data.push(week);
  }
  return data;
};

const heatmapData = generateHeatmap();

const getHeatmapColor = (level: number) => {
  const colors = [
    'rgba(212, 175, 55, 0.05)',
    'rgba(212, 175, 55, 0.2)',
    'rgba(212, 175, 55, 0.4)',
    'rgba(212, 175, 55, 0.6)',
    'rgba(212, 175, 55, 0.9)',
  ];
  return colors[level];
};

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const statsEl = statsRef.current;
    if (!section || !statsEl) return;

    const ctx = gsap.context(() => {
      const cards = statsEl.querySelectorAll('.stat-card');
      const heatmap = section.querySelectorAll('.heatmap-week');

      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        heatmap,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.02,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 px-6 lg:px-8 bg-void"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="font-body text-xs uppercase tracking-[0.35em] text-gold mb-4">
            Performance Metrics
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Quantified Expertise
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* LeetCode Heatmap */}
          <div className="relative">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Code2 size={18} className="text-gold" />
                <span className="font-body text-sm text-white/60 uppercase tracking-wider">
                  LeetCode Activity
                </span>
              </div>
              <a
                href="https://leetcode.com/u/vasubhrdwj/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs text-gold/60 hover:text-gold transition-colors underline underline-offset-4"
              >
                View Profile
              </a>
            </div>

            <div className="p-6 border border-white/5 bg-void-light/50">
              <div className="flex gap-[3px] overflow-x-auto pb-2 scrollbar-hide">
                {heatmapData.map((week, wi) => (
                  <div key={wi} className="heatmap-week flex flex-col gap-[3px]">
                    {week.map((day, di) => (
                      <div
                        key={di}
                        className="heatmap-cell w-3 h-3 rounded-sm"
                        style={{ backgroundColor: getHeatmapColor(day) }}
                        title={`Week ${wi + 1}, Day ${di + 1}`}
                      />
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="font-body text-xs text-white/30">
                  Less
                </span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: getHeatmapColor(level) }}
                    />
                  ))}
                </div>
                <span className="font-body text-xs text-white/30">
                  More
                </span>
              </div>
            </div>

            {/* Knight badge */}
            <div className="mt-6 flex items-center gap-4 p-4 border border-gold/20 bg-gold/5">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                <Trophy size={20} className="text-gold" />
              </div>
              <div>
                <p className="font-body text-sm text-white font-medium">
                  Knight Tier Achieved
                </p>
                <p className="font-body text-xs text-white/40">
                  1,878 rating · Top 5% globally
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div ref={statsRef} className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="stat-card group p-5 border border-white/5 hover:border-gold/20 bg-void-light/30 hover:bg-void-light/50 transition-all duration-300 h-full flex flex-col"
              >
                <stat.icon
                  size={16}
                  className="text-white/20 group-hover:text-gold/60 transition-colors duration-300 mb-3"
                />
                <p className="font-display text-2xl md:text-3xl font-bold text-white group-hover:text-gradient-gold transition-all duration-300">
                  {stat.value}
                </p>
                <p className="font-body text-xs text-white/40 uppercase tracking-wider mt-1">
                  {stat.label}
                </p>
                <p className="font-body text-xs text-white/20 mt-1">
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
