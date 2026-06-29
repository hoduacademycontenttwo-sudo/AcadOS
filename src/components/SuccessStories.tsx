import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShieldCheck, ChevronLeft, ChevronRight, Award, Quote, TrendingUp, Building2, GraduationCap, Globe } from 'lucide-react';

interface CaseStudy {
  id: string;
  institution: string;
  type: string;
  logoLetter: string;
  logoBg: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  metricValue: string;
  metricLabel: string;
  imageUrl: string;
  tag: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  institution: string;
  stars: number;
  initial: string;
  bg: string;
}

const CASE_STUDY_ICONS: Record<string, any> = {
  millennium: Building2,
  apex: GraduationCap,
  heritage: Globe,
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'millennium',
    institution: 'The Millennium School Group',
    type: 'Large School District · 12 Branches · 15,000+ Students',
    logoLetter: 'M',
    logoBg: 'bg-maroon-700',
    tag: 'K-12 Network',
    challenge: 'Managing syllabus and test blueprints synchronously across 12 campuses on paper/PDF resulted in 4-day delays and coordination silos.',
    solution: 'Centralized CBSE blueprint parameters with TestMaker. Coordinators now compile and secure assessments in under 10 minutes.',
    outcomes: [
      '85% compression in exam paper creation cycles',
      'Unified syllabus progress across 100% of campuses',
      '94% parent active engagement within AcadOS portal',
    ],
    metricValue: '85%',
    metricLabel: 'Exam compilation labor saved',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&h=500&fit=crop&q=80',
  },
  {
    id: 'apex',
    institution: 'Apex Academy for Competitive Prep',
    type: 'Specialized National Exam Prep · 5,000+ Aspirants',
    logoLetter: 'A',
    logoBg: 'bg-gold-600',
    tag: 'Coaching Institute',
    challenge: 'Manual red-pen correction of 5,000+ Sunday JEE/NEET bubble sheets delayed diagnostic rankings to midweek.',
    solution: 'Mobile camera OMR scanning. Grading completed in 20 minutes with automatic mistake review books auto-generated.',
    outcomes: [
      'OMR grading reduced from 72 hours to 20 minutes',
      'Instant parent SMS and scorecard dispatch automatically',
      '22% increase in year-over-year IIT-JEE selection ranks',
    ],
    metricValue: '20m',
    metricLabel: 'From scanning to rank list delivery',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=500&fit=crop&q=80',
  },
  {
    id: 'heritage',
    institution: 'Heritage Global International School',
    type: 'Elite IB & Cambridge School · 1,200+ Learners',
    logoLetter: 'H',
    logoBg: 'bg-slate-800',
    tag: 'International School',
    challenge: 'Teachers struggled with disjointed silos for portfolio logs, fee registers, and worksheets — confusing parent communications.',
    solution: 'Unified K-12 management, worksheet planning, and tuition ledger under a school-branded white-label portal.',
    outcomes: [
      'Eliminated 3 redundant SaaS tools, saving $14,000 yearly',
      'Cut admin manual tracking by 45 hours per week',
      'Zero parent notification leakage in three consecutive terms',
    ],
    metricValue: '100%',
    metricLabel: 'White-labeled brand cohesion',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=500&fit=crop&q=80',
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Centralizing our question bank across 12 CBSE schools under AcadOS was the single best operational decision we made. We reclaimed thousands of teacher hours in testing blueprints.",
    author: "Dr. Susan Matthews",
    role: "Academic Director",
    institution: "Millennium School Group",
    stars: 5, initial: 'S', bg: 'bg-maroon-700',
  },
  {
    quote: "Our JEE/NEET aspirants receive diagnostic scorecards on their smartphones before leaving the testing hall. The smartphone OMR camera evaluation works with astonishing accuracy.",
    author: "Kapoor Chand",
    role: "Managing Director",
    institution: "Apex Competitive Prep",
    stars: 5, initial: 'K', bg: 'bg-gold-600',
  },
  {
    quote: "We consolidated our global IB syllabus worksheets, past papers, and accounting ledgers under our custom branded domain. It unified our entire academic identity.",
    author: "Clara Vance",
    role: "Principal",
    institution: "Heritage Global School",
    stars: 5, initial: 'C', bg: 'bg-slate-700',
  },
  {
    quote: "Our administrative manual workload cleared. Instead of chasing spreadsheets and fee-defaulter alerts, custom circular paths execute everything backgrounded.",
    author: "S. Srinivasan",
    role: "Co-founder",
    institution: "SV Vidyalaya Group",
    stars: 5, initial: 'S', bg: 'bg-maroon-800',
  },
];

export default function SuccessStories() {
  const [activeTab, setActiveTab] = useState<string>('millennium');
  const [testimonialIdx, setTestimonialIdx] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const currentCase = CASE_STUDIES.find(cs => cs.id === activeTab) || CASE_STUDIES[0];
  const t = TESTIMONIALS[testimonialIdx];

  return (
    <section className="space-y-12 py-8" id="success-stories-section">

      {/* Section header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto px-4">
        <span className="text-maroon-800 font-mono text-[9px] uppercase font-bold tracking-widest bg-maroon-50 px-3 py-1.5 rounded-full border border-maroon-100 inline-block">
          Institutional Success Stories
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-slate-900 tracking-tight leading-tight" style={{ textWrap: 'balance' }}>
          Validated Outcomes for{' '}
          <span className="italic text-maroon-700">Modern Educational Leaders</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl mx-auto">
          How diverse institutions use AcadOS to eliminate bottlenecks, save hundreds of hours, and strengthen academic reputations.
        </p>
      </div>

      {/* Case studies panel */}
      <div className="bg-white rounded-3xl border border-slate-150 shadow-sm overflow-hidden">

        {/* Tab selector */}
        <div className="grid grid-cols-3 border-b border-slate-100">
          {CASE_STUDIES.map((cs) => {
            const isActive = activeTab === cs.id;
            const Icon = CASE_STUDY_ICONS[cs.id];
            return (
              <button
                key={cs.id}
                onClick={() => setActiveTab(cs.id)}
                className={`py-4 px-3 sm:px-5 text-left border-b-2 transition-all flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 ${
                  isActive
                    ? 'border-maroon-700 bg-white'
                    : 'border-transparent bg-slate-50/60 hover:bg-white/80'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                  isActive ? 'bg-maroon-700 text-white shadow-md' : 'bg-slate-100 text-slate-500'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 text-center sm:text-left">
                  <p className={`text-[11px] sm:text-xs font-bold leading-tight ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                    {cs.institution}
                  </p>
                  <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wide mt-0.5 hidden sm:block">{cs.tag}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCase.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
          >
            {/* Hero image strip */}
            <div className="relative h-48 sm:h-64 md:h-72 overflow-hidden">
              <img
                src={currentCase.imageUrl}
                alt={currentCase.institution}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                <span className="text-gold-400 font-mono text-[9px] uppercase tracking-widest font-bold mb-1">{currentCase.type}</span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-white leading-tight">
                  {currentCase.institution}
                </h3>
              </div>
              {/* Metric badge */}
              <div className="absolute top-5 right-5 sm:top-6 sm:right-6 bg-maroon-800/90 backdrop-blur-sm border border-maroon-600/50 rounded-2xl px-4 py-3 text-center">
                <p className="text-2xl sm:text-3xl font-serif font-light text-white leading-none">{currentCase.metricValue}</p>
                <p className="text-[8px] sm:text-[9px] font-mono text-maroon-200 uppercase tracking-wider mt-1 max-w-[80px] sm:max-w-[100px] leading-tight">{currentCase.metricLabel}</p>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">

              {/* Challenge */}
              <div className="space-y-2 bg-red-50/40 border border-red-100/60 rounded-2xl p-4">
                <h4 className="text-[9px] font-mono font-bold uppercase tracking-widest text-red-700 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                  Operational Bottleneck
                </h4>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">{currentCase.challenge}</p>
              </div>

              {/* Solution */}
              <div className="space-y-2 bg-emerald-50/40 border border-emerald-100/60 rounded-2xl p-4">
                <h4 className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-700 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  AcadOS Remedy
                </h4>
                <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-semibold">{currentCase.solution}</p>
              </div>

              {/* Outcomes */}
              <div className="space-y-2 bg-slate-50 border border-slate-150 rounded-2xl p-4 md:col-span-2 lg:col-span-1">
                <h4 className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                  <Award className="w-3 h-3 text-gold-500 shrink-0" />
                  Quantified Outcomes
                </h4>
                <ul className="space-y-2">
                  {currentCase.outcomes.map((o, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <TrendingUp className="w-3.5 h-3.5 text-maroon-600 mt-0.5 shrink-0" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer strip */}
            <div className="border-t border-slate-100 px-5 sm:px-8 py-3 flex items-center gap-2 bg-slate-50/50">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-500 shrink-0" />
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Verified Audit Standard</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Testimonials */}
      <div className="bg-[#0A0A0F] rounded-3xl p-7 sm:p-10 md:p-14 relative overflow-hidden">
        {/* bg texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-maroon-900/30 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center">

          {/* Quote block */}
          <div className="flex-1 space-y-6">
            <div className="flex gap-1">
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
              ))}
            </div>

            <div className="min-h-[100px] sm:min-h-[120px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={testimonialIdx}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg sm:text-xl md:text-2xl font-serif font-light text-white/90 leading-snug italic"
                >
                  "{t.quote}"
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-4 pt-2 border-t border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIdx + '-author'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-3"
                >
                  <div className={`w-9 h-9 rounded-full ${t.bg} text-white font-bold text-sm flex items-center justify-center shrink-0`}>
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">{t.author}</p>
                    <p className="text-white/50 text-[10px] font-mono uppercase tracking-wide">{t.role} · {t.institution}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setTestimonialIdx((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  className="w-8 h-8 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/30 flex items-center justify-center transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTestimonialIdx((p) => (p + 1) % TESTIMONIALS.length)}
                  className="w-8 h-8 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/30 flex items-center justify-center transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Dots */}
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIdx(i)}
                  className={`rounded-full transition-all duration-300 ${i === testimonialIdx ? 'w-5 h-1.5 bg-gold-500' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
          </div>

          {/* Trust panel */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 w-full md:w-56 shrink-0 space-y-4 hidden sm:block">
            <Quote className="w-7 h-7 text-gold-500" />
            <p className="text-white/70 text-xs leading-relaxed">
              Serving leading education brands across CBSE, Cambridge CIE, and IB portfolios in India.
            </p>
            <div className="space-y-2 pt-2 border-t border-white/10">
              {['CBSE Certified', 'IB Compatible', 'Cambridge CIE'].map((label) => (
                <div key={label} className="flex items-center gap-2 text-[10px] font-mono text-white/50 uppercase tracking-wide">
                  <div className="w-1 h-1 rounded-full bg-gold-500" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
