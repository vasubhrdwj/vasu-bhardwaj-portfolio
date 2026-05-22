import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { Terminal as TerminalIcon, X, ArrowRight, Check, Download, ArrowUpRight } from 'lucide-react';
import { assetUrl } from '@/lib/assets';

interface TerminalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const COMMANDS: Record<string, string[]> = {
  help: [
    'Available commands:',
    '  github     → Open GitHub profile',
    '  leetcode   → Open LeetCode profile',
    '  email      → Copy email address',
    '  resume     → Download resume',
    '  project-1  → Incident Commander details',
    '  project-2  → L4 Load Balancer details',
    '  clear      → Clear terminal',
    '  exit       → Close terminal',
  ],
  'project-1': [
    'Incident Commander — Autonomous LLM Operations',
    '─────────────────────────────────────────────',
    'Stack:     Python, Pydantic, WebSocket, TRL, Unsloth',
    'Model:     7B parameter base with GRPO fine-tuning',
    'Domain:    Multi-agent OpenEnv for SRE simulation',
    'Status:    Production-ready training pipeline',
    '',
    '→ https://github.com/vasubhrdwj/incident-commander-openenv',
  ],
  'project-2': [
    'L4 Load Balancer — High-Availability Infrastructure',
    '──────────────────────────────────────────────────',
    'Stack:     HAProxy, Docker, FastAPI, JavaScript',
    'Features:  Active health checks, rate limiting, failover',
    'Domain:    Layer 4 traffic distribution',
    'Status:    Complete with docker-compose orchestration',
    '',
    '→ https://github.com/vasubhrdwj/l4-load-balancer',
  ],
  github: [
    'Opening GitHub profile...',
    '→ https://github.com/vasubhrdwj',
  ],
  leetcode: [
    'Opening LeetCode profile...',
    '→ https://leetcode.com/u/vasubhrdwj/',
  ],
  email: [
    'Email: vasubhrdwj@gmail.com',
    'Copied to clipboard!',
  ],
  resume: [
    'Downloading resume...',
    '→ /resume.pdf',
  ],
};

export default function Terminal({ isOpen, onOpen, onClose }: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<{ type: 'input' | 'output'; content: string[] }[]>([
    { type: 'output', content: [
      'Vasu Bhardwaj — Software Engineer',
      '─────────────────────────────────────────────',
      'Type "help" to see available commands.',
      '',
    ]},
  ]);
  const [input, setInput] = useState('');
  const [commandIndex, setCommandIndex] = useState(-1);
  const [showToast, setShowToast] = useState(false);
  const commandHistory = useRef<string[]>([]);

  const addOutput = useCallback((lines: string[]) => {
    setHistory((prev) => [...prev, { type: 'output', content: lines }]);
  }, []);

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    commandHistory.current.push(trimmed);
    setCommandIndex(commandHistory.current.length);
    setHistory((prev) => [...prev, { type: 'input', content: [`$ ${cmd}`] }]);

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    if (trimmed === 'exit') {
      addOutput(['Closing terminal...']);
      setTimeout(onClose, 500);
      return;
    }

    if (trimmed === 'github') {
      window.open('https://github.com/vasubhrdwj', '_blank');
    }
    if (trimmed === 'leetcode') {
      window.open('https://leetcode.com/u/vasubhrdwj/', '_blank');
    }
    if (trimmed === 'email') {
      navigator.clipboard.writeText('vasubhrdwj@gmail.com').then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      });
    }
    if (trimmed === 'resume') {
      const link = document.createElement('a');
      link.href = assetUrl('resume.pdf');
      link.download = 'VasuBhardwaj_Resume.pdf';
      link.click();
    }

    const response = COMMANDS[trimmed] || ['Command not found. Type "help" for available commands.'];
    addOutput(response);
  }, [addOutput, onClose]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.current.length > 0) {
        const newIndex = Math.max(0, commandIndex - 1);
        setCommandIndex(newIndex);
        setInput(commandHistory.current[newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.current.length > 0) {
        const newIndex = Math.min(commandHistory.current.length, commandIndex + 1);
        setCommandIndex(newIndex);
        setInput(newIndex === commandHistory.current.length ? '' : commandHistory.current[newIndex] || '');
      }
    }
  };

  // Entrance animation
  useEffect(() => {
    if (isOpen && terminalRef.current) {
      gsap.fromTo(
        terminalRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  return (
    <>
      {/* Trigger Section */}
      <section
        id="terminal"
        ref={containerRef}
        className="relative w-full py-24 md:py-32 px-6 lg:px-8 bg-void"
      >
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="font-body text-xs uppercase tracking-[0.35em] text-gold mb-4">
            Get in Touch
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Let&apos;s Build Together
          </h2>
          <p className="font-body text-sm text-white/40 max-w-lg mx-auto leading-relaxed mb-10">
            I am currently open to opportunities in systems engineering, AI infrastructure,
            and backend architecture. If you are building something ambitious,
            I want to hear about it.
          </p>

          <button
            onClick={onOpen}
            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gold text-void font-body text-xs uppercase tracking-[0.2em] font-semibold hover:bg-gold-light transition-colors duration-300 overflow-hidden mb-10"
          >
            <TerminalIcon size={16} />
            <span>Open Terminal</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

          {/* Resume CTA */}
          <div className="pt-8 border-t border-white/5">
            <a
              href={assetUrl('resume.pdf')}
              download
              className="group inline-flex items-center gap-3 px-8 py-4 border border-gold/30 text-gold font-body text-xs uppercase tracking-[0.2em] hover:bg-gold/10 transition-all duration-300"
            >
              <Download size={14} />
              <span>Download Resume</span>
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Terminal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div
            className="absolute inset-0 bg-void/95 backdrop-blur-sm"
            onClick={onClose}
          />
          <div
            ref={terminalRef}
            className="relative w-full max-w-2xl bg-void-light border border-white/10 shadow-gold-lg"
            style={{ boxShadow: 'inset 0 0 100px rgba(212, 175, 55, 0.05)' }}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="font-body text-xs text-white/30 uppercase tracking-wider">
                vasubhrdwj@portfolio ~ bash
              </span>
              <button
                onClick={onClose}
                className="text-white/30 hover:text-white/60 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Terminal Output */}
            <div
              ref={outputRef}
              className="h-[50vh] md:h-[400px] overflow-y-auto p-4 font-mono text-xs md:text-sm"
            >
              {history.map((entry, i) => (
                <div key={i} className="mb-2">
                  {entry.content.map((line, j) => (
                    <div
                      key={j}
                      className={`${
                        entry.type === 'input'
                          ? 'text-gold'
                          : line.startsWith('→')
                          ? 'text-white/50'
                          : line.includes('─')
                          ? 'text-white/20'
                          : 'text-white/70'
                      }`}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Terminal Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-4 py-3 border-t border-white/5 bg-white/5"
            >
              <span className="text-gold font-mono text-sm">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-white/80 font-mono text-sm placeholder:text-white/20"
                placeholder="Type 'help' for commands..."
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </form>

            {/* Clipboard Toast */}
            {showToast && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-gold text-void font-body text-xs font-semibold">
                <Check size={14} />
                <span>Email copied to clipboard</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
