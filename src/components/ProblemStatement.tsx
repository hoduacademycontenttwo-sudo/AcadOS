import React from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Clock, 
  ScanLine, 
  ArrowDown
} from 'lucide-react';

export interface ProblemStatementProps {
  onScrollToModules?: () => void;
  onBookDemo?: () => void;
}

const PROBLEMS = [
  {
    num: '01',
    icon: Layers,
    title: 'Fragmented Vendor Sprawl',
    desc: 'Juggling 5+ separate software vendors for exam papers, OMR scanning, CBT, and ERP leads to scattered student data and endless logins.'
  },
  {
    num: '02',
    icon: Clock,
    title: 'Exhausting Faculty Workload',
    desc: 'Teachers lose 15+ hours every week manually copy-pasting questions, typesetting complex formulas in Word, and balancing paper blueprints.'
  },
  {
    num: '03',
    icon: ScanLine,
    title: 'Delayed Test Evaluation Cycles',
    desc: 'Physical paper checking and legacy OMR hardware take 4–7 days to release results, stalling student doubt clearance and parent updates.'
  }
];

export const ProblemStatement: React.FC<ProblemStatementProps> = ({ 
  onScrollToModules 
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
    <section className="relative py-16 sm:py-24 bg-white overflow-hidden border-b border-slate-200/80 select-none">
      {/* Background architectural grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#800000 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================ */}
        {/* HEADER SECTION (Label-Free, Premium Typography)              */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-[1.15]"
          >
            Managing 5+ Disconnected Tools{' '}
            <span className="text-[#800000] italic font-serif">Slows Institutions Down.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed"
          >
            Fragmented portals, manual question typesetting, and delayed exam grading create operational chaos for teachers and leadership.
          </motion.p>
        </div>

        {/* ============================================================ */}
        {/* SPLIT BENTO: 3 Clean Problem Cards + Visual Showcase Card    */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Side: 3 Problem Cards (6 Columns) */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            {PROBLEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-slate-50/80 hover:bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-4 sm:gap-5 group"
                >
                  {/* Number & Icon Badge */}
                  <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-200/60 text-slate-800 flex items-center justify-center group-hover:bg-[#800000] group-hover:text-white transition-all duration-300 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-[#800000] transition-colors">
                      {item.num}
                    </span>
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-sans tracking-tight mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Side: Visual Solution Graphic Card (6 Columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-6 bg-gradient-to-br from-slate-900 via-slate-950 to-maroon-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-xl border border-white/10 relative overflow-hidden group"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-maroon-600/20 rounded-full blur-3xl pointer-events-none" />

            {/* Header Content */}
            <div className="relative z-10 space-y-2">
              <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-white leading-tight">
                One Connected Platform.<br />
                <span className="text-maroon-200 font-serif italic">Zero Tool Fatigue.</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed max-w-md">
                TestMaker, CBT Simulator, Smartphone OMR, and ERP engineered to work as a unified system under your own brand.
              </p>
            </div>

            {/* Image Showcase */}
            <div className="relative z-10 my-5 rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-slate-950">
              <img 
                src="/modules/testmaker.jpg" 
                alt="AcadOS Unified Platform Interface" 
                className="w-full h-44 sm:h-52 object-cover object-top opacity-95 group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Bottom Action Row */}
            <div className="relative z-10 pt-3 flex items-center justify-between gap-4 border-t border-white/10">
              <span className="text-xs text-slate-300 font-sans font-medium">
                Explore the 4 core modules:
              </span>
              <button
                onClick={handleScrollToSolution}
                className="bg-white text-maroon-950 hover:bg-slate-100 font-extrabold text-xs sm:text-sm py-2.5 px-5 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0 active:scale-95"
              >
                <span>Explore Modules</span>
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ProblemStatement;
