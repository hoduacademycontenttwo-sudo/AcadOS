import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  ScanLine, 
  Laptop, 
  Building2, 
  AlertTriangle,
  Clock,
  Layers,
  ArrowDownRight,
  TrendingDown,
  XCircle,
  HelpCircle
} from 'lucide-react';

export interface ProblemStatementProps {
  onScrollToModules?: () => void;
  onBookDemo?: () => void;
}

interface ProblemItem {
  id: string;
  index: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  impactBadge: string;
  icon: React.ComponentType<{ className?: string }>;
  frictionPoints: string[];
  image: string;
  imageAlt: string;
  mockBadge: string;
}

const PROBLEMS: ProblemItem[] = [
  {
    id: 'testmaker-problem',
    index: '01',
    category: 'EXAM PREPARATION & BLUEPRINTS',
    title: 'Manual Paper Setting & LaTeX Formatting Nightmares',
    subtitle: 'Faculty spending up to 4 hours per paper on Word formatting instead of teaching.',
    description: 'Teachers repeatedly hunt through physical textbooks, manually type complex math equations in MS Word, and struggle with broken diagram alignments and unverified answer keys.',
    impactBadge: '15+ Hours / Week Lost Per Teacher',
    icon: FileText,
    frictionPoints: [
      'Broken formulas & diagram misalignment in Word / PDF',
      'Zero difficulty mapping or Bloom taxonomy balance',
      'Manual bilingual typing without curated question banks'
    ],
    image: '/modules/testmaker.jpg',
    imageAlt: 'Manual question paper formatting friction',
    mockBadge: 'Paper Creation Lag'
  },
  {
    id: 'omr-problem',
    index: '02',
    category: 'OFFLINE OMR EVALUATION',
    title: 'Expensive Scanner Hardware & 4–7 Day Grading Queues',
    subtitle: 'Physical answer sheets pile up for days, destroying student feedback loops.',
    description: 'Traditional evaluation relies on delicate ₹50,000+ scanner machines with constant paper jams, or grueling manual faculty checking that delays rank lists by nearly a week.',
    impactBadge: '4–7 Days Result Latency',
    icon: ScanLine,
    frictionPoints: [
      'Proprietary hardware scanners prone to breakdowns',
      'Delayed score publication kills student learning momentum',
      'No instant WhatsApp scorecard delivery to parents'
    ],
    image: '/modules/omr.jpg',
    imageAlt: 'Delayed OMR evaluation backlog',
    mockBadge: 'Evaluation Bottleneck'
  },
  {
    id: 'cbt-problem',
    index: '03',
    category: 'CBT MOCK EXAM SIMULATION',
    title: 'Generic 3rd-Party Portals & Lost Institutional Branding',
    subtitle: 'Forcing students onto third-party portals with external vendor logos & server crashes.',
    description: 'Institutions rent off-the-shelf test portals that charge recurring per-student fees, display external vendor branding, and freeze during large concurrent mock tests.',
    impactBadge: '0% Institutional Brand Recall',
    icon: Laptop,
    frictionPoints: [
      'External vendor branding on every student screen',
      'Frequent portal lag during 1,000+ simultaneous mocks',
      'Disconnected offline test records and online CBT scores'
    ],
    image: '/modules/cbt.png',
    imageAlt: 'Generic 3rd party testing interface',
    mockBadge: 'Vendor Lock-in & Server Lag'
  },
  {
    id: 'erp-problem',
    index: '04',
    category: 'INSTITUTE OPERATIONS & ADMISSIONS',
    title: 'Scattered Registers, Fee Leakages & Missed Admissions',
    subtitle: 'Leads lost across unorganized registers and manual offline fee reconciliations.',
    description: 'Valuable student inquiries slip through cracks in unmonitored WhatsApp chats, while manual fee tracking creates payment delays, reconciliation errors, and revenue leakage.',
    impactBadge: '20%+ Revenue & Inquiry Leakage',
    icon: Building2,
    frictionPoints: [
      'Unorganized inquiry records lead to lost admissions',
      'Manual paper fee receipts & untracked overdue installments',
      'Fragmented tools with zero central operational visibility'
    ],
    image: '/modules/erp.jpg',
    imageAlt: 'Fragmented operational registers',
    mockBadge: 'Operational Disconnect'
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
    <section className="relative py-20 lg:py-28 bg-[#faf8f5] overflow-hidden border-b border-stone-200/80">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#800000 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================ */}
        {/* SECTION HEADER                                               */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-18">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/70 border border-rose-200 text-rose-900 text-[11px] font-mono font-bold uppercase tracking-widest"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
            <span>Operational Bottlenecks</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-stone-900 tracking-tight leading-[1.15]"
          >
            The Hidden Cost of Running on{' '}
            <span className="text-[#800000] italic font-serif">Fragmented Tools.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed"
          >
            Every day, top schools and coaching institutes lose hundreds of faculty hours and significant revenue to these 4 critical operational bottlenecks.
          </motion.p>
        </div>

        {/* ============================================================ */}
        {/* 4 PROBLEM CARDS GRID                                         */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-14">
          {PROBLEMS.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Top Alert accent bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-rose-500 via-red-500 to-amber-500" />

                <div className="p-6 sm:p-8 space-y-5">
                  
                  {/* Category & Index Header */}
                  <div className="flex items-center justify-between gap-3 border-b border-stone-100 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-700">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-rose-800">
                        {problem.category}
                      </span>
                    </div>

                    <span className="text-xl font-mono font-bold text-stone-300 group-hover:text-rose-600 transition-colors">
                      {problem.index}
                    </span>
                  </div>

                  {/* Problem Card Heading & Subheading */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-snug group-hover:text-[#800000] transition-colors">
                      {problem.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-stone-500 font-medium">
                      {problem.subtitle}
                    </p>
                  </div>

                  {/* Relevant Image Preview */}
                  <div className="relative rounded-xl overflow-hidden border border-stone-200/80 bg-stone-900/5 group-hover:border-rose-300 transition-colors">
                    <img 
                      src={problem.image} 
                      alt={problem.imageAlt}
                      className="w-full h-48 sm:h-52 object-cover object-top opacity-95 group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    
                    {/* Dark gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                    {/* Problem Badge on Image */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-sm border border-white/20 text-white text-[11px] font-mono font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        <span>{problem.mockBadge}</span>
                      </div>
                      
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-600/90 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        <TrendingDown className="w-3 h-3" />
                        <span>Friction</span>
                      </div>
                    </div>
                  </div>

                  {/* Core Friction Points List */}
                  <div className="space-y-2 pt-1">
                    <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-400">
                      Primary Pain Points:
                    </p>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                      {problem.frictionPoints.map((point, ptIdx) => (
                        <li key={ptIdx} className="flex items-start gap-2.5">
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span className="leading-snug">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Footer Impact Metric Pill */}
                <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-rose-700 text-xs font-mono font-semibold">
                    <Clock className="w-3.5 h-3.5 text-rose-500" />
                    <span>Cost / Loss Impact:</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-rose-100/90 border border-rose-200 text-rose-900 text-xs font-mono font-bold">
                    {problem.impactBadge}
                  </span>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* TRANSITION TO SOLUTION ACCORDION / MODULES                   */}
        {/* ============================================================ */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#800000]/10 text-[#800000] mb-1">
            <ArrowDownRight className="w-5 h-5" />
          </div>
          
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            Eliminate Every Operational Bottleneck With AcadOS
          </h3>
          
          <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Replace chaotic paper piles, hardware scanners, and generic vendor portals with one seamless, custom-branded operating system.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleScrollToSolution}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#800000] text-white text-xs sm:text-sm font-semibold hover:bg-[#660000] transition-all shadow-md active:scale-95"
            >
              <span>Explore The 4 Core Modules Below</span>
              <span className="text-rose-200">↓</span>
            </button>
            {onBookDemo && (
              <button
                onClick={onBookDemo}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-100 text-stone-800 text-xs sm:text-sm font-semibold hover:bg-stone-200 transition-all border border-stone-300 active:scale-95"
              >
                <span>Schedule Live Institution Demo</span>
              </button>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ProblemStatement;
