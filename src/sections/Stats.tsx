import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { assetUrl } from '@/lib/assets';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, GitBranch, Target, Award, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'LeetCode Rating', value: '1,890', sub: 'Knight Tier', icon: Trophy },
  { label: 'Codeforces Rating', value: '1,384', sub: 'Pupil', icon: Award },
  { label: 'Global Rank', value: 'Top 5%', sub: 'Problem Solving', icon: Target },
  { label: 'GitHub Repos', value: '41', sub: 'Open Source', icon: GitBranch },
  { label: 'Focus', value: 'Backend', sub: 'Systems & AI', icon: Layers },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const statsEl = statsRef.current;
    if (!section || !statsEl) return;

    const ctx = gsap.context(() => {
      const cards = statsEl.querySelectorAll('.stat-card');
      const profileImage = section.querySelector('.profile-image');

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

      if (profileImage) {
        gsap.fromTo(
          profileImage,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
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
          {/* LeetCode Profile */}
          <div className="relative">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy size={18} className="text-gold" />
                <span className="font-body text-sm text-white/60 uppercase tracking-wider">
                  Competitive Programming
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

            {/* Actual LeetCode Screenshot */}
            <div className="profile-image border border-white/5 bg-void-light/50 overflow-hidden">
              <img
                src={assetUrl('leetcode-profile.png')}
                alt="LeetCode Profile"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
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
                  1,890 rating · Top 5% globally
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
