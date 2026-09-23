import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Clock, 
  ScanLine, 
  ShieldAlert, 
  AlertCircle, 
  XCircle, 
  ArrowDown, 
  Sparkles, 
  CheckCircle2, 
  Unlink, 
  FileX2, 
  Hourglass, 
  Laptop,
  Smartphone,
  School,
  ArrowRight
} from 'lucide-react';

export interface ProblemStatementProps {
  onScrollToModules?: () => void;
  onBookDemo?: () => void;
}

export const ProblemStatement: React.FC<ProblemStatementProps> = ({ 
  onScrollToModules,
  onBookDemo 
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleScrollToSolution = () => {
    const el = document.getElementById('platform-ecosystem-timeline');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onScrollToModules) {
      onScrollToModules();
    }
  };

  const PAIN_POINTS = [
    {
      id: 'fragmentation',
      number: '01',
      title: '5+ Disconnected Vendor Portals',
      headline: 'Tool Chaos & Scattered Logins',
      description: 'Schools and coaching centers subscribe to separate vendors for exam papers, OMR evaluation, CBT portals, ERP, and parent messaging.',
      impact: 'Zero unified student analytics, constant sync errors, and massive multi-vendor billing.',
      visualType: 'vendors',
      color: 'rose'
    },
    {
      id: 'faculty-burnout',
      number: '02',
      title: '15+ Hours Lost in Exam Drafting',
      headline: 'Exhausting Faculty Typesetting',
      description: 'Teachers spend late nights copy-pasting questions from PDFs, formatting mathematical formulas in MS Word, and manually balancing blueprints.',
      impact: 'Severe faculty fatigue, frequent paper typos, and inconsistent exam difficulty curves.',
      visualType: 'paper-drafting',
      color: 'amber'
    },
    {
      id: 'evaluation-lag',
      number: '03',
      title: '4–7 Days Lag in Evaluation',
      headline: 'Slow Grading & Delayed Scorecards',
      description: 'Manual paper checking and legacy OMR scanner machines bottleneck results. Students receive feedback days after the exam when momentum is lost.',
      impact: 'Delayed doubt clearance, frustrated students, and anxious parent inquiries.',
      visualType: 'delayed-grading',
      color: 'orange'
    },
    {
      id: 'brand-dilution',
      number: '04',
      title: 'Generic Unbranded Portals',
      headline: 'Lost Institutional Prestige',
      description: 'Off-the-shelf software places third-party EdTech logos in front of students and parents instead of promoting your institution’s own standard.',
      impact: 'Zero white-label brand equity and missed opportunities to establish your proprietary identity.',
      visualType: 'brand-dilution',
      color: 'red'
    }
  ];

  return (
    <section className="relative py-20 lg:py-28 bg-[#faf9f6] overflow-hidden border-b border-slate-200 select-none">
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
        {/* SECTION HEADER                                               */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-red-800 text-[11px] font-mono font-bold uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>The Academic Bottleneck</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-[1.15]"
          >
            Why Traditional Academic Operations{' '}
            <span className="text-[#800000] italic font-serif">Break at Scale.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed"
          >
            Managing an institution across fragmented point solutions creates administrative chaos, teacher burnout, and delayed student performance data.
          </motion.p>
        </div>

        {/* ============================================================ */}
        {/* 4-CARD VISUAL BENTO GRID                                     */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* ---------------------------------------------------------- */}
          {/* CARD 1: 5-VENDOR TOOL CHAOS                                */}
          {/* ---------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-400" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-700">
                  <Unlink className="w-5 h-5" />
                </div>
                <span className="text-2xl font-serif font-extrabold text-slate-200 group-hover:text-rose-200 transition-colors">
                  01
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-sans tracking-tight mb-2">
                5+ Disconnected Vendor Portals
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-5">
                Institutions juggle separate tools for test creation, OMR checking, CBT exams, ERP fees, and parent alerts.
              </p>

              {/* Interactive Visual: Disconnected Apps Diagram */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 my-2">
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Current Fragmented Reality
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="bg-white p-2.5 rounded-xl border border-red-200 text-red-700 shadow-xs flex flex-col items-center gap-1">
                    <XCircle className="w-3.5 h-3.5 text-red-500" />
                    <span className="font-bold text-[11px]">Vendor 1: TestMaker</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-red-200 text-red-700 shadow-xs flex flex-col items-center gap-1">
                    <XCircle className="w-3.5 h-3.5 text-red-500" />
                    <span className="font-bold text-[11px]">Vendor 2: OMR App</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-red-200 text-red-700 shadow-xs flex flex-col items-center gap-1">
                    <XCircle className="w-3.5 h-3.5 text-red-500" />
                    <span className="font-bold text-[11px]">Vendor 3: CBT Portal</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-red-200 text-red-700 shadow-xs flex flex-col items-center gap-1">
                    <XCircle className="w-3.5 h-3.5 text-red-500" />
                    <span className="font-bold text-[11px]">Vendor 4: ERP / Fees</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-red-200 text-red-700 shadow-xs flex flex-col items-center gap-1 col-span-2 sm:col-span-2">
                    <XCircle className="w-3.5 h-3.5 text-red-500" />
                    <span className="font-bold text-[11px]">Vendor 5: Parent SMS Gateway</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Cost Indicator */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium text-slate-700">Cost: 5 separate subscriptions</span>
              <span className="font-bold text-red-600 font-mono text-[11px]">Sync Errors & Data Silos</span>
            </div>
          </motion.div>

          {/* ---------------------------------------------------------- */}
          {/* CARD 2: 15+ HOURS MANUAL TYPESETTING                       */}
          {/* ---------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-400" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
                  <FileX2 className="w-5 h-5" />
                </div>
                <span className="text-2xl font-serif font-extrabold text-slate-200 group-hover:text-amber-200 transition-colors">
                  02
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-sans tracking-tight mb-2">
                15+ Hours Lost in Manual Exam Drafting
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-5">
                Faculties waste full working days typing equations, copy-pasting from PDFs, and aligning Word paper blueprints.
              </p>

              {/* Visual: Time Wasted Breakdown */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 my-2 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>Weekly Faculty Time Breakdown:</span>
                  <span className="text-amber-700 font-mono font-bold">15.5 Hours / Wk Wasted</span>
                </div>
                
                {/* Progress bar visual */}
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-amber-500 h-full w-[65%]" title="Manual Paper Formatting (65%)" />
                  <div className="bg-rose-500 h-full w-[25%]" title="Fixing Word LaTeX Errors (25%)" />
                  <div className="bg-slate-400 h-full w-[10%]" title="Actual Teaching (10%)" />
                </div>

                <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-slate-500 pt-1">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Typesetting (10h)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>Fixing Typos (4h)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    <span>Teaching (1.5h)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Cost Indicator */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium text-slate-700">Impact: Severe teacher burnout</span>
              <span className="font-bold text-amber-700 font-mono text-[11px]">Inconsistent Exam Standards</span>
            </div>
          </motion.div>

          {/* ---------------------------------------------------------- */}
          {/* CARD 3: 4–7 DAYS EVALUATION LAG                            */}
          {/* ---------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-400" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-700">
                  <Hourglass className="w-5 h-5" />
                </div>
                <span className="text-2xl font-serif font-extrabold text-slate-200 group-hover:text-orange-200 transition-colors">
                  03
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-sans tracking-tight mb-2">
                4–7 Days Lag in Test Evaluation
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-5">
                Traditional paper checking and fragile OMR scanner machines hold student test scores hostage for nearly a week.
              </p>

              {/* Visual: Evaluation Timeline Delay */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 my-2 space-y-3">
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  The Evaluation Turnaround Delay
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="text-center">
                    <div className="font-bold text-slate-800">Day 1 (Mon)</div>
                    <div className="text-[10px] text-slate-500">Test Conducted</div>
                  </div>
                  <div className="flex-1 px-2">
                    <div className="h-0.5 bg-red-300 relative">
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-red-100 text-red-800 font-bold px-1.5 py-0.5 rounded text-[9px]">
                        6 Days In Evaluation Queue
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-red-700">Day 7 (Sun)</div>
                    <div className="text-[10px] text-red-600">Scores Released</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Cost Indicator */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium text-slate-700">Loss: Remedial feedback momentum</span>
              <span className="font-bold text-orange-700 font-mono text-[11px]">Parent Inquiries & Anxiety</span>
            </div>
          </motion.div>

          {/* ---------------------------------------------------------- */}
          {/* CARD 4: GENERIC UNBRANDED EDTECH                           */}
          {/* ---------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-maroon-600" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-800">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <span className="text-2xl font-serif font-extrabold text-slate-200 group-hover:text-red-200 transition-colors">
                  04
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-sans tracking-tight mb-2">
                Generic Software Diluting Your Brand
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-5">
                Most EdTech software forces external company logos onto student mock tests, report cards, and parent dashboards.
              </p>

              {/* Visual: Brand Dilution Comparison */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 my-2">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-red-200 text-center">
                    <span className="text-[10px] font-mono uppercase text-red-600 font-bold block mb-1">❌ Typical Edtech</span>
                    <span className="text-slate-800 font-bold text-xs block">Promotes 3rd-Party Vendor</span>
                    <span className="text-[10px] text-slate-400 block mt-1">Zero school equity</span>
                  </div>
                  <div className="bg-maroon-50 p-3 rounded-xl border border-maroon-200 text-center">
                    <span className="text-[10px] font-mono uppercase text-maroon-800 font-bold block mb-1">✓ AcadOS Operating System</span>
                    <span className="text-maroon-950 font-bold text-xs block">100% Under Your Brand</span>
                    <span className="text-[10px] text-maroon-700 block mt-1">Your logo, colors & domain</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Cost Indicator */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium text-slate-700">Risk: Diminished institutional authority</span>
              <span className="font-bold text-maroon-800 font-mono text-[11px]">Loss of Student Loyalty</span>
            </div>
          </motion.div>

        </div>

        {/* ============================================================ */}
        {/* TRANSITION BANNER: CHAOS -> ACADOS UNIFIED OS               */}
        {/* ============================================================ */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 sm:mt-16 bg-gradient-to-br from-slate-900 via-maroon-950 to-slate-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-maroon-900/40 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-maroon-600/25 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 text-center md:text-left relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-gold-300 font-mono text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>The AcadOS Solution</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-extrabold text-white leading-tight">
              One Unified Academic OS. Zero Silos.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              TestMaker, CBT Simulator, Smartphone OMR & ERP interconnected seamlessly into a single platform deployed under your school or coaching brand.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 relative z-10">
            <button
              onClick={handleScrollToSolution}
              className="bg-white text-maroon-950 hover:bg-slate-100 font-black text-xs sm:text-sm py-3 px-6 rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Explore 4 Core Modules</span>
              <ArrowDown className="w-4 h-4" />
            </button>
            {onBookDemo && (
              <button
                onClick={onBookDemo}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
              >
                Book Live Demo <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ProblemStatement;
