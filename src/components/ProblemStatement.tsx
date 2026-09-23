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
  ArrowRight
} from 'lucide-react';

export interface ProblemStatementProps {
  onScrollToSolution?: () => void;
  onBookDemo?: () => void;
}

const PROBLEMS = [
  {
    number: '01',
    icon: Layers,
    tag: 'FRAGMENTATION',
    title: '5+ Disconnected Vendor Portals',
    stat: '5+ Subscriptions',
    statSub: 'Scattered student data & logins',
    pain: 'Institutions juggle separate, disjointed platforms for test creation, OMR scanning, CBT mock tests, ERP fees, and parent communication.',
    symptom: 'Double data entry, sync errors, and zero single-source-of-truth analytics.',
    borderColor: 'hover:border-rose-300',
    accentBg: 'bg-rose-50 text-rose-700 border-rose-200',
    iconBg: 'bg-rose-100/80 text-rose-700'
  },
  {
    number: '02',
    icon: Clock,
    tag: 'FACULTY FATIGUE',
    title: '15+ Hours Lost in Manual Exam Drafting',
    stat: '15+ Hours / Week',
    statSub: 'Wasted on manual typing & formatting',
    pain: 'Teachers spend late nights copy-pasting questions from PDFs, formatting mathematical formulas, and balancing marks distributions in MS Word.',
    symptom: 'Faculty burnout, inconsistent difficulty curves, and frequent paper typographical errors.',
    borderColor: 'hover:border-amber-300',
    accentBg: 'bg-amber-50 text-amber-800 border-amber-200',
    iconBg: 'bg-amber-100/80 text-amber-800'
  },
  {
    number: '03',
    icon: ScanLine,
    tag: 'EVALUATION BOTTLENECK',
    title: '4–7 Days Lag in Test Evaluation',
    stat: '4–7 Days',
    statSub: 'Delay in publishing student scorecards',
    pain: 'Physical test papers and traditional OMR sheets sit in evaluation queues for days or require expensive dedicated scanner hardware that breaks often.',
    symptom: 'Lost remedial learning momentum, delayed doubt-solving, and anxious parent follow-ups.',
    borderColor: 'hover:border-orange-300',
    accentBg: 'bg-orange-50 text-orange-800 border-orange-200',
    iconBg: 'bg-orange-100/80 text-orange-800'
  },
  {
    number: '04',
    icon: ShieldAlert,
    tag: 'BRAND DILUTION',
    title: 'Generic Software Diluting Your Brand',
    stat: '0% Brand Equity',
    statSub: 'Third-party logos displayed to students',
    pain: 'Off-the-shelf EdTech tools enforce their own branding on apps, watermarks, and reports—diverting student and parent trust away from your institute.',
    symptom: 'Inability to project your own premium standard or build long-term institutional prestige.',
    borderColor: 'hover:border-red-300',
    accentBg: 'bg-red-50 text-red-800 border-red-200',
    iconBg: 'bg-red-100/80 text-red-800'
  }
];

export const ProblemStatement: React.FC<ProblemStatementProps> = ({ 
  onScrollToSolution, 
  onBookDemo 
}) => {
  return (
    <section className="relative py-16 sm:py-24 bg-white overflow-hidden border-b border-slate-200/80">
      {/* Subtle architectural background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#800000 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================ */}
        {/* HEADER SECTION                                               */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-rose-50 text-rose-800 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full border border-rose-200"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span>THE OPERATIONAL BOTTLENECK</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-[1.15]"
          >
            Why Traditional Academic Operations{' '}
            <span className="text-[#800000] italic font-serif">Break at Scale.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-sans"
          >
            Educational leaders and faculties lose hundreds of hours every term battling fragmented tools, manual paper creation, and delayed evaluation cycles.
          </motion.p>
        </div>

        {/* ============================================================ */}
        {/* PROBLEMS GRID                                                */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-12 sm:mt-16">
          {PROBLEMS.map((problem, idx) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`relative bg-slate-50/70 hover:bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs transition-all duration-300 hover:shadow-lg flex flex-col justify-between group ${problem.borderColor}`}
              >
                {/* Top Badge & Number */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${problem.iconBg} transition-transform group-hover:scale-110 duration-200`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${problem.accentBg}`}>
                        {problem.tag}
                      </span>
                    </div>
                    <span className="text-xl font-serif font-bold text-slate-300 group-hover:text-[#800000]/40 transition-colors">
                      {problem.number}
                    </span>
                  </div>

                  {/* Stat highlight */}
                  <div className="mb-3.5 pb-3 border-b border-slate-200/70">
                    <div className="text-lg sm:text-xl font-black text-slate-900 leading-none">
                      {problem.stat}
                    </div>
                    <div className="text-[11px] font-medium text-slate-500 mt-1">
                      {problem.statSub}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug mb-2 font-sans">
                    {problem.title}
                  </h3>

                  {/* Pain Description */}
                  <p className="text-xs text-slate-600 leading-relaxed font-sans mb-3">
                    {problem.pain}
                  </p>
                </div>

                {/* Symptom / Cost box */}
                <div className="mt-2 pt-3 border-t border-slate-100 bg-white/80 rounded-xl p-2.5 border">
                  <div className="flex items-start gap-1.5 text-[11px] text-slate-600 leading-normal">
                    <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-800 font-semibold">Impact:</strong> {problem.symptom}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* SOLUTION TRANSITION BRIDGE                                   */}
        {/* ============================================================ */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 sm:mt-14 bg-gradient-to-r from-maroon-900 via-maroon-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden"
        >
          {/* Background decorative shine */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
          
          <div className="space-y-1.5 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 text-gold-300 font-mono text-[10px] uppercase font-bold tracking-widest">
              <span>THE ACADOS TRANSFORMATION</span>
            </div>
            <h4 className="text-lg sm:text-2xl font-serif font-bold text-white tracking-tight">
              One Unified OS Under Your Own Custom Brand.
            </h4>
            <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
              AcadOS replaces broken point solutions with 4 interconnected modules built specifically for test generation, CBT simulation, instant OMR grading, and institution operations.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 relative z-10">
            <button
              onClick={() => {
                const el = document.getElementById('platform-ecosystem-timeline');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else if (onScrollToSolution) {
                  onScrollToSolution();
                }
              }}
              className="bg-white text-maroon-900 hover:bg-slate-100 font-bold text-xs sm:text-sm py-2.5 px-5 sm:px-6 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-98"
            >
              Explore 4 Modules <ArrowDown className="w-4 h-4" />
            </button>
            {onBookDemo && (
              <button
                onClick={onBookDemo}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm py-2.5 px-5 rounded-xl transition-all flex items-center gap-2 cursor-pointer backdrop-blur-sm"
              >
                Book Demo <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ProblemStatement;
