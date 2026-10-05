import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProblemIllustration } from './ProblemIllustration';

export interface ProblemStatementProps {
  onScrollToModules?: () => void;
  onBookDemo?: () => void;
}

interface ProblemItem {
  id: string;
  num: string;
  category: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  featured?: boolean;
}

const PROBLEMS: ProblemItem[] = [
  {
    id: 'library-problem',
    num: '01',
    category: 'CONTENT & STUDY MATERIAL',
    badge: '⚠️ Unindexed PDFs & Chat Chaos',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200/80',
    title: 'Scattered Notes & WhatsApp PDF Chaos',
    subtitle: 'Students drown in unorganized WhatsApp groups, pirated PDFs, and zero trackable study analytics.',
    featured: true
  },
  {
    id: 'testmaker-problem',
    num: '02',
    category: 'EXAM CREATION',
    badge: '⏳ 3+ Hours/Paper Wasted',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/80',
    title: 'Manual Paper Setting & Formatting Friction',
    subtitle: 'Hours wasted hunting questions and formatting complex LaTeX math equations in MS Word.',
    featured: true
  },
  {
    id: 'omr-problem',
    num: '03',
    category: 'EVALUATION & RESULTS',
    badge: '🚨 4–7 Days Grading Lag',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200/80',
    title: 'Slow OMR Evaluation & Delayed Results',
    subtitle: 'Physical answer sheets pile up, delaying student results and killing feedback momentum.'
  },
  {
    id: 'cbt-problem',
    num: '04',
    category: 'ONLINE INFRASTRUCTURE',
    badge: '⚡ 504 Timeout Crashes',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/80',
    title: 'Unstable CBT Mock Exams & Server Lag',
    subtitle: 'Generic 3rd party CBT portals with vendor logos, server timeouts, and high per-test fees.'
  },
  {
    id: 'erp-problem',
    num: '05',
    category: 'ADMINISTRATION & FEES',
    badge: '💸 Uncollected Fee Leakage',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200/80',
    title: 'Scattered Registers & Lost Admissions',
    subtitle: 'Student leads lost in paper registers and manual offline fee collection leakages.'
  }
];

export const ProblemStatement: React.FC<ProblemStatementProps> = () => {
  const [activeTab, setActiveTab] = useState<'grid' | 'focus'>('grid');
  const [selectedId, setSelectedId] = useState<string>('library-problem');

  const selectedProblem = PROBLEMS.find(p => p.id === selectedId) || PROBLEMS[0];

  return (
    <section className="relative py-16 md:py-24 bg-[#faf8f5] border-b border-stone-200/80 overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#800000 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-200/60 border border-stone-300/70 text-xs font-semibold uppercase tracking-wider text-stone-700"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            Institutional Friction Points
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-stone-900 tracking-tight leading-tight"
          >
            Operational Bottlenecks Holding Institutions Back
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-stone-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed"
          >
            Fragmented tools, manual paperwork, and delayed evaluations drain faculty hours and weaken student trust.
          </motion.p>

          {/* View Mode Selector Pills */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="pt-2 flex justify-center"
          >
            <div className="inline-flex p-1 rounded-xl bg-stone-200/70 border border-stone-300/80 shadow-inner">
              <button
                onClick={() => setActiveTab('grid')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  activeTab === 'grid'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                📊 Bento Grid View
              </button>
              <button
                onClick={() => setActiveTab('focus')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  activeTab === 'focus'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                🔍 Spotlight View
              </button>
            </div>
          </motion.div>
        </div>

        {/* --- VIEW 1: BENTO GRID LAYOUT --- */}
        {activeTab === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {PROBLEMS.map((problem, index) => {
              const isLarge = problem.featured;
              const gridSpanClass = isLarge ? 'lg:col-span-3 md:col-span-2' : 'lg:col-span-2 md:col-span-1';

              return (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className={`${gridSpanClass} flex`}
                >
                  <div className="group relative w-full flex flex-col justify-between bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs hover:shadow-xl hover:border-teal-500/40 transition-all duration-300">
                    
                    {/* Top Accent Line on Hover */}
                    <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-teal-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-full" />

                    <div>
                      {/* Card Header: Category & Badge */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="text-[11px] font-mono font-bold text-stone-400 tracking-wider">
                          {problem.num} • {problem.category}
                        </span>
                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${problem.badgeColor}`}>
                          {problem.badge}
                        </span>
                      </div>

                      {/* Vector Illustration Container */}
                      <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner group-hover:scale-[1.01] transition-transform duration-300 mb-5 aspect-[16/9]">
                        <ProblemIllustration id={problem.id} />
                      </div>

                      {/* Card Title */}
                      <h3 className="text-lg md:text-xl font-serif font-bold text-stone-900 group-hover:text-teal-950 transition-colors leading-snug mb-2">
                        {problem.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                        {problem.subtitle}
                      </p>
                    </div>

                    {/* Bottom Micro Footer */}
                    <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-500 group-hover:text-teal-700 transition-colors">
                      <span>AcadOS Fix Available</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* --- VIEW 2: SPOTLIGHT FOCUS SHOWCASE --- */}
        {activeTab === 'focus' && (
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden p-6 md:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Selector Menu */}
              <div className="lg:col-span-5 space-y-3">
                <h4 className="text-xs font-mono uppercase font-bold tracking-wider text-stone-400 mb-4">
                  Select Bottleneck to Inspect
                </h4>
                {PROBLEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-start gap-3 border ${
                      selectedId === item.id
                        ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                        : 'bg-stone-50/70 text-stone-700 border-stone-200/70 hover:bg-stone-100'
                    }`}
                  >
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      selectedId === item.id ? 'bg-teal-500 text-stone-950' : 'bg-stone-200 text-stone-600'
                    }`}>
                      {item.num}
                    </span>
                    <div>
                      <h5 className="font-serif font-bold text-sm md:text-base leading-snug">
                        {item.title}
                      </h5>
                      <p className={`text-xs mt-1 line-clamp-1 ${
                        selectedId === item.id ? 'text-stone-300' : 'text-stone-500'
                      }`}>
                        {item.subtitle}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right Big Showcase Display */}
              <div className="lg:col-span-7 bg-stone-950 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden border border-stone-800 shadow-2xl flex flex-col justify-between min-h-[380px]">
                
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-teal-400 font-semibold tracking-wide">
                    {selectedProblem.num} // {selectedProblem.category}
                  </span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${selectedProblem.badgeColor}`}>
                    {selectedProblem.badge}
                  </span>
                </div>

                {/* Big Illustration Display */}
                <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-slate-900 border border-slate-700/80 mb-6 shadow-inner">
                  <ProblemIllustration id={selectedProblem.id} />
                </div>

                {/* Detailed Title & Subtitle */}
                <div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-2">
                    {selectedProblem.title}
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm font-sans leading-relaxed">
                    {selectedProblem.subtitle}
                  </p>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ProblemStatement;
