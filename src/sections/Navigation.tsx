import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  scrollTo: (target: string) => void;
}

export default function Navigation({ scrollTo }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Expertise', target: '#stats' },
    { label: 'Skills', target: '#skills' },
    { label: 'Projects', target: '#projects' },
    { label: 'Experience', target: '#experience' },
    { label: 'Contact', target: '#terminal' },
  ];

  const handleClick = (target: string) => {
    scrollTo(target);
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-void/90 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => handleClick('#hero')}
          className="font-display text-lg tracking-wide hover:text-gold transition-colors duration-300"
        >
          VB.
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => handleClick(link.target)}
              className="font-body text-xs uppercase tracking-[0.2em] text-white/60 hover:text-gold transition-all duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        <button
          className="md:hidden text-white/60 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu with animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-void/95 backdrop-blur-lg border-b border-white/5 px-6 py-6 flex flex-col gap-4">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => handleClick(link.target)}
              className="font-body text-sm uppercase tracking-[0.15em] text-white/60 hover:text-gold transition-colors text-left"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
