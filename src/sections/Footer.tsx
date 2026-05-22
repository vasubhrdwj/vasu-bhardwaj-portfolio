import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

interface FooterProps {
  scrollTo: (target: string) => void;
}

export default function Footer({ scrollTo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socials = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/vasubhrdwj' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/vasubhrdwj' },
    { icon: Mail, label: 'Email', href: 'mailto:vasubhrdwj@gmail.com' },
    { icon: ExternalLink, label: 'LeetCode', href: 'https://leetcode.com/u/vasubhrdwj/' },
  ];

  return (
    <footer className="relative w-full py-16 px-6 lg:px-8 bg-void border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <button
              onClick={() => scrollTo('#hero')}
              className="font-display text-2xl text-white hover:text-gold transition-colors duration-300 mb-4 block"
            >
              VB.
            </button>
            <p className="font-body text-sm text-white/30 leading-relaxed max-w-xs">
              Software Engineer specializing in backend systems, AI infrastructure,
              and distributed architecture.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-white/30 mb-4">
              Navigation
            </p>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Expertise', target: '#stats' },
                { label: 'Skills', target: '#skills' },
                { label: 'Projects', target: '#projects' },
                { label: 'Experience', target: '#experience' },
                { label: 'Contact', target: '#terminal' },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.target)}
                  className="font-body text-sm text-white/40 hover:text-gold transition-colors duration-300 text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-white/30 mb-4">
              Connect
            </p>
            <div className="flex flex-col gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-body text-sm text-white/40 hover:text-gold transition-colors duration-300"
                >
                  <social.icon size={14} className="group-hover:scale-110 transition-transform" />
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/20">
            {currentYear} Vasu Bhardwaj. Crafted with care.
          </p>
          <p className="font-body text-xs text-white/20">
            Built with React, Tailwind CSS, and obsessive attention to detail.
          </p>
        </div>
      </div>
    </footer>
  );
}
