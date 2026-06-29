import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, XCircle, CheckCircle2, Star, Sparkles, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ComparisonItem {
  category: string;
  traditional: string;
  acados: string;
  role: 'owner' | 'teacher' | 'student' | 'all';
}

const COMPARISON_ITEMS: ComparisonItem[] = [
  {
    category: 'Academic Planning',
    traditional: 'Manual planning on Word docs with scattered PDF templates.',
    acados: 'Standardized smart chapters and instant board-mapped resources.',
    role: 'teacher'
  },
  {
    category: 'Assessment Creation',
    traditional: 'Hours manual typesetting, copying formulas, and aligning layouts.',
    acados: '10-minute generation from 5 Lakh+ question template blueprints.',
    role: 'teacher'
  },
  {
    category: 'Evaluation Speed',
    traditional: 'Days of manual checking and delayed scorecard reporting.',
    acados: 'Instant mobile camera OMR evaluation and auto WhatsApp dispatch.',
    role: 'owner'
  },
  {
    category: 'Student Study Habits',
    traditional: 'Unstructured and passive worksheet drills without tracking.',
    acados: 'Gamified interactive practice sheets, streaks, and mistake binders.',
    role: 'student'
  },
  {
    category: 'Academic Intelligence',
    traditional: 'Only raw test marks available; weak topic areas stay hidden.',
    acados: 'Concept-by-concept diagnostic graphs mapping exact remedial needs.',
    role: 'owner'
  },
  {
    category: 'Admissions & CRM',
    traditional: 'Missed inquiry desk calls and loose paper counseling logs.',
    acados: 'Centralized lead pipeline with automated alerts and callbacks.',
    role: 'owner'
  }
];

export default function BeforeAfterSlider() {
  const [activeRoleFilter, setActiveRoleFilter] = useState<'all' | 'owner' | 'teacher' | 'student'>('all');

  const filteredItems = COMPARISON_ITEMS.filter(
    item => activeRoleFilter === 'all' || item.role === activeRoleFilter || item.role === 'all'
  );

  return (
    <div className="bg-white rounded-3xl border border-maroon-100 p-6 md:p-8 shadow-sm overflow-hidden" id="before-after-view">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
        <div>
          <span className="text-maroon-800 font-mono text-[10px] uppercase font-semibold tracking-widest bg-maroon-50 px-3 py-1 rounded-full border border-maroon-100 inline-block">
            AcadOS Operational Shift
          </span>
          <h4 className="text-2xl sm:text-3xl font-serif font-light text-slate-900 mt-2 leading-tight">
            Streamlining <span className="italic text-maroon-700">Administrative & Academic</span> Bottlenecks
          </h4>
        </div>

        {/* Perspective Filters */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-center">
          {(['all', 'owner', 'teacher', 'student'] as const).map(role => (
            <button
              key={role}
              onClick={() => setActiveRoleFilter(role)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans uppercase tracking-tight transition-all ${
                activeRoleFilter === role
                  ? 'bg-gradient-to-r from-maroon-600 to-maroon-700 text-white shadow-sm'
                  : 'text-slate-550 hover:text-slate-900'
              }`}
            >
              {role === 'all' ? 'All Roles' : role}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Comparison Headers */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-center font-mono text-xs uppercase tracking-widest font-extrabold text-slate-500 mb-2.5 hidden md:grid select-none">
        <div className="col-span-3 text-left pl-3">Institution Channel</div>
        <div className="col-span-4 bg-slate-50 py-1 rounded border border-slate-200 text-slate-500 uppercase">Legacy System (Traditional)</div>
        <div className="col-span-5 bg-maroon-50/50 py-1 rounded border border-maroon-105 text-maroon-800 uppercase">Operating System (With AcadOS)</div>
      </div>

      {/* Comparison Grid rows */}
      <div className="flex overflow-x-auto pb-4 gap-5 snap-x snap-mandatory scrollbar-thin md:flex-col md:overflow-visible md:pb-0 md:space-y-4 md:gap-0 select-none">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              key={item.category}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-[285px] min-w-[285px] max-w-[285px] snap-start shrink-0 border border-slate-150 p-5 rounded-2xl bg-slate-50/45 flex flex-col gap-4 md:w-full md:min-w-0 md:max-w-none md:p-0 md:bg-transparent md:border-0 md:border-b md:border-slate-100 md:pb-4 md:last:border-0 md:grid md:grid-cols-12 md:gap-4 md:items-stretch"
            >
              {/* Category */}
              <div className="md:col-span-3 flex flex-col justify-center pl-1">
                <span className="text-slate-900 font-extrabold text-sm sm:text-base font-sans flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-gold-500 shrink-0" />
                  {item.category}
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">
                  Target context: {item.role === 'owner' ? 'Institution admin' : item.role === 'teacher' ? 'Faculty' : 'Student'}
                </span>
              </div>

              {/* Legacy card */}
              <div className="md:col-span-4 bg-white md:bg-slate-50 border border-slate-200 md:border-slate-205 rounded-xl md:rounded-2xl p-4 flex gap-3 text-xs leading-relaxed text-slate-600 font-sans flex-1 md:flex-none">
                <XCircle className="w-5 h-5 text-red-500 block shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest block md:hidden mb-0.5">Traditional Legacy</span>
                  <p>{item.traditional}</p>
                </div>
              </div>

              {/* AcadOS card */}
              <div className="md:col-span-5 bg-gradient-to-br from-maroon-50/70 to-white border border-maroon-200 rounded-xl md:rounded-2xl p-4 flex gap-3 text-xs leading-relaxed text-slate-800 font-sans shadow-sm relative overflow-hidden group flex-1 md:flex-none">
                {/* Glow detail */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold-400/5 blur-xl group-hover:scale-125 transition-transform duration-300 rounded-full" />
                
                <CheckCircle2 className="w-5 h-5 text-success-green block shrink-0 mt-0.5" />
                <div className="space-y-1 w-full">
                  <span className="text-[9px] font-bold text-maroon-700 uppercase tracking-widest block md:hidden mb-0.5">With AcadOS</span>
                  <p className="font-semibold text-slate-900 font-sans">{item.acados}</p>
                  
                  {/* Positive micro-badges */}
                  <div className="pt-2 flex items-center gap-1.5 flex-wrap">
                    <span className="bg-success-green/10 text-success-green font-bold text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-success-green/15 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      Automatic
                    </span>
                    <span className="bg-gold-50/80 text-gold-600 font-bold text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-gold-300/30">
                      White-labeled
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Action panel underneath */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center bg-slate-50/50 p-4 rounded-2xl gap-4">
        <p className="text-xs text-slate-600 text-center sm:text-left max-w-md font-sans">
          Eliminate redundant multi-vendor overhead and scattered login screens. AcadOS deploys a single premium platform under your own brand and logo.
        </p>
        
        <button
          onClick={() => {
            const selector = 'demo-booking-section';
            const contactEl = document.getElementById(selector);
            if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-maroon-700 hover:bg-maroon-800 text-white font-extrabold px-5 py-3 rounded-xl text-xs uppercase tracking-wider shrink-0 shadow-md active:scale-[0.98] cursor-pointer"
        >
          Begin Institutional Upgrade
        </button>
      </div>
    </div>
  );
}
