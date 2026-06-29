import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

type ModuleId = 'learners-hub' | 'testmaker' | 'practice-cbt' | 'omr-evaluation' | 'erp-crm';

const MODULE_META: Record<ModuleId, { name: string; tagline: string; color: string }> = {
  'learners-hub':   { name: 'Learners Hub',          tagline: 'Digital Library & Student Portal',   color: '#6366f1' },
  'testmaker':      { name: 'TestMaker Engine',       tagline: 'AI-Powered Paper Generator',         color: '#f59e0b' },
  'practice-cbt':   { name: 'CBT Mock Platform',      tagline: 'Online Exam Simulator',              color: '#10b981' },
  'omr-evaluation': { name: 'OMR Evaluation',         tagline: 'Smartphone OMR Scanning & Grading',  color: '#ec4899' },
  'erp-crm':        { name: 'Institute ERP + CRM',    tagline: 'Full Suite Operations & Admissions', color: '#3b82f6' },
};

interface Props {
  module: ModuleId;
  onExplore: () => void;
  onClose: () => void;
  onBookDemo: () => void;
}

export default function ModulePreviewPage({ module, onExplore, onClose, onBookDemo }: Props) {
  const meta = MODULE_META[module];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[9990] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#050508' }}
    >
      <style>{`
        @keyframes grid-scroll {
          0%   { transform: translateY(0); }
          100% { transform: translateY(60px); }
        }
        @keyframes orb-pulse {
          0%, 100% { opacity: 0.18; transform: scale(1); }
          50%       { opacity: 0.32; transform: scale(1.12); }
        }
        @keyframes float-badge {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes scan-line {
          0%   { top: -4px; }
          100% { top: 100%; }
        }
        @keyframes explore-spin {
          to { transform: rotate(250deg); }
        }
        .explore-btn .svg-icon {
          height: 25px;
          transition: transform 1.5s ease;
        }
        .explore-btn:hover .svg-icon {
          transform: rotate(250deg);
        }
        .explore-btn {
          width: 130px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 10px;
          background-color: rgb(161, 255, 20);
          border-radius: 30px;
          color: rgb(19, 19, 19);
          font-weight: 700;
          font-size: 15px;
          border: none;
          cursor: pointer;
          transition: background-color 0.5s, transform 0.2s;
          box-shadow: 0 0 24px rgba(161,255,20,0.35), 5px 5px 10px rgba(0,0,0,0.3);
          padding-left: 10px;
          font-family: 'Manrope', sans-serif;
        }
        .explore-btn:hover { background-color: rgb(192,255,20); }
        .explore-btn:active { transform: scale(0.97); }
      `}</style>

      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'grid-scroll 3s linear infinite',
          }}
        />
        {/* Scan line */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, transparent, ${meta.color}60, transparent)`,
          animation: 'scan-line 4s linear infinite',
        }} />
      </div>

      {/* Ambient orbs */}
      <div style={{
        position: 'absolute', top: '-20%', left: '-10%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: `radial-gradient(circle, ${meta.color}22 0%, transparent 70%)`,
        animation: 'orb-pulse 6s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-20%', right: '-10%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, #80000033 0%, transparent 70%)',
        animation: 'orb-pulse 8s ease-in-out infinite 2s',
        pointerEvents: 'none',
      }} />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60 backdrop-blur hover:bg-white/10 hover:text-white transition-colors"
      >
        <X className="w-3.5 h-3.5" /> Close
      </button>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">

        {/* Module badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{ animation: 'float-badge 4s ease-in-out infinite' }}
          className="mb-6"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest backdrop-blur"
            style={{
              border: `1px solid ${meta.color}50`,
              background: `${meta.color}15`,
              color: meta.color,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: meta.color }} />
            {meta.tagline}
          </span>
        </motion.div>

        {/* Module name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-4"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif", textShadow: `0 0 60px ${meta.color}40` }}
        >
          {meta.name}
        </motion.h1>

        {/* Prototype notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-white/40 text-sm font-mono tracking-widest uppercase mb-3">
            ⚠ &nbsp;Interactive Prototype
          </p>
          <p className="text-white/70 text-lg leading-relaxed max-w-lg">
            What you're about to explore is a <span className="text-white font-semibold">live interactive demo</span> — not the full product.
            Book a consultation to see the complete{' '}
            <span style={{ color: meta.color }} className="font-semibold">{meta.name}</span> built for your institution.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button className="explore-btn" onClick={onExplore}>
            <svg className="svg-icon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" fill="rgb(19,19,19)" />
            </svg>
            Explore
          </button>

          <button
            onClick={() => { onClose(); onBookDemo(); }}
            className="inline-flex items-center gap-2 rounded-full border border-[#800000]/40 bg-[#800000]/10 px-6 py-2.5 text-sm font-semibold text-white/80 backdrop-blur hover:bg-[#800000]/25 hover:text-white transition-colors"
          >
            Book a Demo Instead →
          </button>
        </motion.div>

        {/* Corner decorations */}
        <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 opacity-30 pointer-events-none" style={{ borderColor: meta.color }} />
        <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 opacity-30 pointer-events-none" style={{ borderColor: meta.color }} />
      </div>
    </motion.div>
  );
}
