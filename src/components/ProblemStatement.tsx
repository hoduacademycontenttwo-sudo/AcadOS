import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  ScanLine, 
  Laptop, 
  Building2, 
  XCircle, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Layers,
  Flame,
  Zap,
  ShieldAlert,
  ArrowDown
} from 'lucide-react';

export interface ProblemStatementProps {
  onScrollToModules?: () => void;
  onBookDemo?: () => void;
}

interface WorkflowItem {
  id: string;
  tabLabel: string;
  icon: any;
  category: string;
  role: string;
  legacy: {
    title: string;
    description: string;
    timeLoss: string;
    painList: string[];
    stat: string;
    statLabel: string;
  };
  acados: {
    title: string;
    description: string;
    timeGain: string;
    benefitsList: string[];
    stat: string;
    statLabel: string;
    imageSrc: string;
  };
}

const WORKFLOWS: WorkflowItem[] = [
  {
    id: 'testmaker',
    tabLabel: 'Assessment Creation',
    icon: FileText,
    category: 'EXAM CREATION & BLUEPRINTS',
    role: 'Faculty & Academic Heads',
    legacy: {
      title: 'Manual Word Formatting & PDF Copy-Pasting',
      description: 'Teachers spend 3–4 exhausting hours per paper hunting for questions across textbooks, typing LaTeX equations, and manually balancing marks blueprints.',
      timeLoss: '15+ Hours / Week Lost',
      painList: [
        'Formatting errors & misaligned math diagrams in MS Word',
        'Repetitive question copying without difficulty mapping',
        'Manual answer key drafting and zero blueprint analytics'
      ],
      stat: '3.5 Hours',
      statLabel: 'Average time per single paper'
    },
    acados: {
      title: 'Automated 1-Click Exam Blueprints from 6 Lakh+ Questions',
      description: 'Select board, grade, chapter, and difficulty curve. AcadOS compiles publication-ready question papers, answer keys, and matching OMR sheets in minutes.',
      timeGain: 'Saves 90% Faculty Time',
      benefitsList: [
        'Curated 600K+ Multilingual CBSE/ICSE/JEE/NEET question bank',
        'Instant LaTeX typesetting & watermarked PDF generation',
        '100% white-labeled with your institution’s logo & header'
      ],
      stat: '10 Mins',
      statLabel: 'Ready to print under your brand',
      imageSrc: '/modules/testmaker.jpg'
    }
  },
  {
    id: 'omr-evaluation',
    tabLabel: 'Evaluation & OMR',
    icon: ScanLine,
    category: 'EXAM EVALUATION & SCORECARDS',
    role: 'Examiners & Administration',
    legacy: {
      title: 'Bulky Scanner Hardware & 4–7 Day Grading Queues',
      description: 'Physical answer sheets pile up for days or require expensive proprietary scanner machines with frequent paper-jam errors and high maintenance costs.',
      timeLoss: '4–7 Days Result Delay',
      painList: [
        'Fragile hardware scanners costing ₹50,000+ per unit',
        'Delayed score publication kills student learning momentum',
        'Manual parent SMS dispatch and lost remedial insight'
      ],
      stat: '6 Days',
      statLabel: 'Score turnaround bottleneck'
    },
    acados: {
      title: 'Instant Smartphone Camera OMR Evaluation (99.8% Accuracy)',
      description: 'Teachers scan physical OMR sheets with any standard smartphone camera. System grades instant scores and dispatches WhatsApp analytics to parents.',
      timeGain: 'Instant Scorecards in 10s',
      benefitsList: [
        'Zero hardware cost — works on any budget smartphone',
        'Automated rank lists, negative marks & section analytics',
        '1-click parent scorecards via verified WhatsApp channels'
      ],
      stat: '10 Secs',
      statLabel: 'Per sheet evaluation & sync',
      imageSrc: '/modules/omr.jpg'
    }
  },
  {
    id: 'practice-cbt',
    tabLabel: 'CBT Mock Exams',
    icon: Laptop,
    category: 'COMPUTER BASED SIMULATION',
    role: 'Exam Coordinators & Students',
    legacy: {
      title: 'Clunky 3rd-Party Portals with Recurring Per-Test Fees',
      description: 'Institutions rent generic mock test tools that display external vendor logos, lack strict anti-cheat lockdowns, and charge unpredictable per-student fees.',
      timeLoss: 'Unpredictable Costs & Disjointed Data',
      painList: [
        'Off-the-shelf software carrying external branding',
        'Frequent server lag during large batch simultaneous mocks',
        'No unified sync between offline tests and online CBT'
      ],
      stat: '0% Brand Equity',
      statLabel: 'Third-party logos displayed'
    },
    acados: {
      title: 'In-House NTA-Grade CBT Portal Under Your Custom Domain',
      description: 'Deploy the exact JEE/NEET/CUET computerized exam simulator on your own institutional subdomain with full-screen lockdown and real-time national percentiles.',
      timeGain: '100% In-House Exam Control',
      benefitsList: [
        'Identical NTA color palette, question palettes & live timers',
        'Scales to 10,000+ simultaneous students with zero lag',
        'Unified student analytics combining offline OMR & CBT mocks'
      ],
      stat: '100%',
      statLabel: 'Your institution’s brand portal',
      imageSrc: '/modules/cbt.png'
    }
  },
  {
    id: 'erp-crm',
    tabLabel: 'ERP & Operations',
    icon: Building2,
    category: 'INSTITUTION OPERATIONS & CRM',
    role: 'Owners, Directors & Registrars',
    legacy: {
      title: 'Scattered Registers, Fee Leakages & Missed Admissions',
      description: 'Coaching centers and schools lose prospective leads in paper registers and struggle with manual offline fee accounting reconciliations.',
      timeLoss: '20%+ Revenue & Lead Leakage',
      painList: [
        'Missed inquiry follow-ups and unorganized lead data',
        'Manual fee receipt writing & overdue payment tracking',
        'Disconnected faculty attendance and batch schedules'
      ],
      stat: '5+ Tools',
      statLabel: 'Fragmented operational chaos'
    },
    acados: {
      title: 'Unified Educational ERP & Intelligent Admissions CRM',
      description: 'Consolidate lead counseling pipelines, installment fee ledgers, biometric attendance, and automated WhatsApp parent alerts into one operating system.',
      timeGain: '35% Higher Admission Conversion',
      benefitsList: [
        'Automated WhatsApp inquiry reminders & follow-up queues',
        'Online payment links, fee ledgers & GST-compliant receipts',
        'Single-pane dashboard for batches, attendance, and revenue'
      ],
      stat: '1 Single OS',
      statLabel: 'Zero fragmented vendor sprawl',
      imageSrc: '/modules/erp.jpg'
    }
  }
];

export const ProblemStatement: React.FC<ProblemStatementProps> = ({ 
  onScrollToModules,
  onBookDemo 
}) => {
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState<number>(0);
  const current = WORKFLOWS[activeWorkflowIndex];

  const handleScrollToSolution = () => {
    const el = document.getElementById('platform-ecosystem-timeline');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onScrollToModules) {
      onScrollToModules();
    }
  };

  return (
    <section className="relative py-20 lg:py-28 bg-[#faf9f6] overflow-hidden border-b border-slate-200 select-none">
      {/* Background architectural grid */}
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
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-red-800 text-[11px] font-mono font-bold uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>The Operational Paradigm Shift</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-[1.15]"
          >
            From Fragmented Legacy Friction{' '}
            <span className="text-[#800000] italic font-serif">To Autonomous Flow.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed"
          >
            Compare how traditional institutions waste hundreds of faculty hours on disconnected tools versus deploying AcadOS as a unified operating system.
          </motion.p>
        </div>

        {/* ============================================================ */}
        {/* INTERACTIVE WORKFLOW CHANNEL SELECTOR TABS                   */}
        {/* ============================================================ */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 sm:pb-6 no-scrollbar">
          {WORKFLOWS.map((wf, idx) => {
            const Icon = wf.icon;
            const isActive = activeWorkflowIndex === idx;
            return (
              <button
                key={wf.id}
                onClick={() => setActiveWorkflowIndex(idx)}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl font-sans text-xs sm:text-sm font-bold tracking-tight transition-all duration-300 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#800000] text-white shadow-lg shadow-maroon-900/20 scale-[1.02]'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-slate-500'}`} />
                <span>{wf.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* DYNAMIC SIDE-BY-SIDE TRANSFORMATION COCKPIT                  */}
        {/* ============================================================ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-4 items-stretch"
          >

            {/* -------------------------------------------------------- */}
            {/* LEFT CARD: THE LEGACY FRICTION (THE PROBLEM)             */}
            {/* -------------------------------------------------------- */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-red-200/90 shadow-sm flex flex-col justify-between relative overflow-hidden group">
              {/* Subtle top indicator */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 to-rose-400" />
              
              <div className="space-y-5">
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-red-700">
                      The Legacy Bottleneck
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400">
                    Role: {current.role}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans tracking-tight mb-2">
                    {current.legacy.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {current.legacy.description}
                  </p>
                </div>

                {/* Pain Points Checklist */}
                <div className="bg-red-50/70 border border-red-200/80 rounded-2xl p-4 sm:p-5 space-y-3">
                  <div className="text-[10px] font-mono font-bold text-red-800 uppercase tracking-wider">
                    Operational Friction Points:
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {current.legacy.painList.map((pain, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{pain}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Legacy Stat Bar */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-red-600 leading-none">
                    {current.legacy.stat}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 mt-1 block">
                    {current.legacy.statLabel}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-3 py-1.5 rounded-xl">
                  {current.legacy.timeLoss}
                </span>
              </div>
            </div>

            {/* -------------------------------------------------------- */}
            {/* RIGHT CARD: THE ACADOS OPERATING SYSTEM (THE RESOLUTION) */}
            {/* -------------------------------------------------------- */}
            <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 via-maroon-950 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-maroon-900/50 flex flex-col justify-between relative overflow-hidden group">
              {/* Subtle top indicator */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-gold-400 to-emerald-500" />
              {/* Ambient Glow */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-maroon-600/20 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-5 relative z-10">
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-300">
                      The AcadOS Transformation
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-gold-400">
                    100% Your Brand
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight leading-snug mb-2">
                    {current.acados.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {current.acados.description}
                  </p>
                </div>

                {/* Live Interface Preview */}
                <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-slate-950 my-2">
                  <img 
                    src={current.acados.imageSrc} 
                    alt={current.acados.title} 
                    className="w-full h-40 sm:h-44 object-cover object-top opacity-90 group-hover:scale-102 transition-transform duration-500"
                  />
                </div>

                {/* Benefits Checklist */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2.5 backdrop-blur-sm">
                  <ul className="space-y-2 text-xs text-slate-200">
                    {current.acados.benefitsList.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Stat & Action Bar */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-emerald-400 leading-none">
                    {current.acados.stat}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400 mt-1 block">
                    {current.acados.statLabel}
                  </span>
                </div>
                
                <button
                  onClick={handleScrollToSolution}
                  className="bg-white text-maroon-950 hover:bg-slate-100 font-extrabold text-xs sm:text-sm py-2.5 px-4 sm:px-5 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Explore Modules</span>
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default ProblemStatement;
