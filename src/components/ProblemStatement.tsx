import React from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Clock, 
  ScanLine, 
  ShieldAlert, 
  ArrowDown, 
  XCircle, 
  AlertTriangle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export interface ProblemStatementProps {
  onScrollToModules?: () => void;
  onBookDemo?: () => void;
}

const PROBLEMS = [
  {
    icon: Layers,
    tag: 'VENDOR SPRAWL',
    title: '5+ Disconnected Portals',
    desc: 'Separate vendors for test making, OMR grading, CBT, and ERP cause scattered logins and sync errors.',
    metric: '5+ Subscriptions',
    metricLabel: 'Disjointed databases',
    color: 'rose'
  },
  {
    icon: Clock,
    tag: 'FACULTY FATIGUE',
    title: '15+ Hours Lost Weekly',
    desc: 'Teachers lose valuable teaching hours copy-pasting questions from PDFs and formatting Word docs.',
    metric: '15+ Hours / Wk',
    metricLabel: 'Wasted on manual typing',
    color: 'amber'
  },
  {
    icon: ScanLine,
    tag: 'EVALUATION LAG',
    title: '4–7 Days Grading Delays',
    desc: 'Manual evaluation and legacy OMR machines delay rank reports and remedial doubt-solving.',
    metric: '4–7 Days Lag',
    metricLabel: 'Slow student scorecards',
    color: 'orange'
  }
];

export const ProblemStatement: React.FC<ProblemStatementProps> = ({ 
  onScrollToModules, 
  onBookDemo 
}) => {
  const handleScrollToSolution = () => {
    const el = document.getElementById('platform-ecosystem-timeline');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onScrollToModules) {
      onScrollToModules();
    }
  };

  return (
    <section className="relative py-16 sm:py-20 bg-white overflow-hidden border-b border-slate-200/80 select-none">
      {/* Subtle geometric grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#800000 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================ */}
        {/* HEADER SECTION (Minimal, Centered, Punchy)                   */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-rose-50 text-rose-800 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full border border-rose-200"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span>THE OPERATIONAL CHALLENGE</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-serif font-extrabold text-slate-900 tracking-tight leading-tight"
          >
            Managing 5+ Disconnected Tools{' '}
            <span className="text-[#800000] italic font-serif">Slows Institutions Down.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto font-sans leading-relaxed"
          >
            Piecemeal software leads to teacher burnout, delayed evaluations, and scattered student analytics.
          </motion.p>
        </div>

        {/* ============================================================ */}
        {/* SPLIT BENTO: 3 Minimal Problem Cards + Visual Mockup Card    */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-10 items-stretch">
          
          {/* Left Side: 3 Problem Cards (6 Columns) */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            {PROBLEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-slate-50/90 hover:bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-100/70 text-rose-800 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-sm font-bold text-slate-900 font-sans">
                        {item.title}
                      </h3>
                      <span className="font-mono text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded shrink-0 uppercase">
                        {item.metric}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Side: Visual Solution Graphic Card (6 Columns) */}
          <motion.div 
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-6 bg-gradient-to-br from-slate-900 via-maroon-950 to-slate-950 rounded-3xl p-6 sm:p-7 text-white flex flex-col justify-between shadow-xl border border-maroon-900/40 relative overflow-hidden group"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-maroon-600/15 rounded-full blur-3xl pointer-events-none" />

            {/* Top Tag & Header */}
            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-emerald-500/30">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>The AcadOS Solution</span>
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white leading-snug">
                One Operating System.<br />Four Interconnected Modules.
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed max-w-md">
                TestMaker, CBT Simulator, Smartphone OMR & Institute ERP unified under your institution's custom brand.
              </p>
            </div>

            {/* Image Showcase with Device Frame */}
            <div className="relative z-10 my-4 rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950">
              <img 
                src="/modules/testmaker.jpg" 
                alt="AcadOS Unified Platform Interface" 
                className="w-full h-44 sm:h-48 object-cover object-top opacity-90 group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90">
                <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> 100% White-Labeled
                </span>
                <span className="text-slate-300 text-[10px]">Zero Vendor Silos</span>
              </div>
            </div>

            {/* Bottom CTA Action Bar */}
            <div className="relative z-10 pt-2 flex items-center justify-between gap-4 border-t border-white/10">
              <span className="text-[11px] text-slate-400 font-sans">
                Explore the connected ecosystem:
              </span>
              <button
                onClick={handleScrollToSolution}
                className="bg-white text-maroon-900 hover:bg-slate-100 font-extrabold text-xs py-2 px-4 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0 active:scale-95"
              >
                <span>See 4 Modules</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ProblemStatement;
