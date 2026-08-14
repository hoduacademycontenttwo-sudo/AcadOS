import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, MapPin, Users, BookOpen, Trophy, Smartphone, Database, ChevronRight, Phone } from 'lucide-react';

const MODULE_ICONS: Record<string, React.ReactNode> = {
  'TestMaker':    <BookOpen  className="w-3 h-3" />,
  'CBT Platform': <Trophy    className="w-3 h-3" />,
  'OMR Scanning': <Smartphone className="w-3 h-3" />,
  'ERP + CRM':    <Database  className="w-3 h-3" />,
  'Learners Hub': <BookOpen  className="w-3 h-3" />,
};

interface Client {
  id: number;
  name: string;
  type: 'school' | 'coaching';
  city: string;
  state: string;
  since: string;
  students: string;
  modules: string[];
  contact: string;
  quote: string;
  result: string;
  resultLabel: string;
  color: string;
  initials: string;
}

const CLIENTS: Client[] = [
  {
    id: 1,
    name: 'St. Xavier\'s High School',
    type: 'school',
    city: 'Jaipur', state: 'Rajasthan',
    since: '2023',
    students: '1,200+',
    modules: ['TestMaker', 'OMR Scanning', 'ERP + CRM'],
    contact: 'Mrs. Priya Sharma, Principal',
    quote: 'AcadOS transformed how we run exams. What used to take our staff an entire day — setting papers, printing, grading — now happens in under an hour. Parents get results on WhatsApp the same evening.',
    result: '68%',
    resultLabel: 'Reduction in exam ops time',
    color: '#800000',
    initials: 'SX',
  },
  {
    id: 2,
    name: 'Apex IIT-JEE Academy',
    type: 'coaching',
    city: 'Kota', state: 'Rajasthan',
    since: '2022',
    students: '850+',
    modules: ['TestMaker', 'CBT Platform', 'OMR Scanning'],
    contact: 'Mr. Rajesh Kumar, Director',
    quote: 'Our students\' JEE Main scores improved by an average of 23 percentile after we started weekly CBT mocks on AcadOS. The interface is identical to NTA — there\'s zero adaptation time on exam day.',
    result: '+23',
    resultLabel: 'Percentile improvement avg.',
    color: '#b45309',
    initials: 'AI',
  },
  {
    id: 3,
    name: 'Delhi Public School — Sector 12',
    type: 'school',
    city: 'Noida', state: 'UP',
    since: '2023',
    students: '2,100+',
    modules: ['Learners Hub', 'TestMaker', 'OMR Scanning', 'ERP + CRM'],
    contact: 'Mr. Arun Mehta, Vice Principal',
    quote: 'The white-label setup means students open our portal — not some third-party app. That trust matters. AcadOS gave us enterprise-grade technology under our own brand without the enterprise price tag.',
    result: '100%',
    resultLabel: 'White-label, zero AcadOS branding',
    color: '#1d4ed8',
    initials: 'DP',
  },
  {
    id: 4,
    name: 'Vidya Mandir Coaching Centre',
    type: 'coaching',
    city: 'Lucknow', state: 'UP',
    since: '2023',
    students: '400+',
    modules: ['TestMaker', 'OMR Scanning', 'ERP + CRM'],
    contact: 'Mr. Sanjay Tiwari, Founder',
    quote: 'Honestly, I was skeptical about smartphone OMR — I thought you needed a proper scanner. But it works flawlessly on a ₹8,000 Android phone. We scan 120 sheets in 4 minutes. The team loved it from day one.',
    result: '4 min',
    resultLabel: '120 OMR sheets graded',
    color: '#065f46',
    initials: 'VM',
  },
  {
    id: 5,
    name: 'Shree Ram Coaching Academy',
    type: 'coaching',
    city: 'Bhopal', state: 'MP',
    since: '2024',
    students: '300+',
    modules: ['TestMaker', 'CBT Platform'],
    contact: 'Mrs. Kavita Singh, Director',
    quote: 'Setting up took less than a week. The onboarding team helped us import our existing question bank and configure everything. By day 7 we were running live mock tests for NEET students. That speed impressed us.',
    result: '7 days',
    resultLabel: 'From sign-up to first live exam',
    color: '#7c3aed',
    initials: 'SR',
  },
  {
    id: 6,
    name: 'Sunrise International School',
    type: 'school',
    city: 'Pune', state: 'Maharashtra',
    since: '2024',
    students: '950+',
    modules: ['Learners Hub', 'TestMaker', 'OMR Scanning'],
    contact: 'Ms. Deepa Nair, Academic Head',
    quote: 'The Learners Hub is our most-used feature. Teachers assign chapter worksheets directly to batches and students complete them on their phones. It cut our printing cost by 40% in the first semester alone.',
    result: '40%',
    resultLabel: 'Drop in printing costs',
    color: '#0e7490',
    initials: 'SI',
  },
];

const STATS = [
  { value: '100+', label: 'Institutes trust AcadOS' },
  { value: '1.2L+', label: 'Students on platform' },
  { value: '6', label: 'States active' },
  { value: '98%', label: 'Renewal rate' },
];

type FilterType = 'all' | 'school' | 'coaching';

export default function Testimonials({ onBookDemo }: { onBookDemo: () => void }) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [active, setActive] = useState<Client | null>(null);

  const visible = filter === 'all' ? CLIENTS : CLIENTS.filter(c => c.type === filter);

  return (
    <div className="min-h-screen bg-[#faf9f7]">

      {/* ── HERO BAND ── */}
      <div className="relative overflow-hidden bg-[#800000] pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-[0.06]" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)',backgroundSize:'48px 48px'}} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06),transparent_70%)]" />
        <div className="max-w-4xl mx-auto text-center space-y-5 relative z-10">
          <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-widest text-white/60 bg-white/10 border border-white/15 px-3 py-1 rounded-full">
            Client Stories
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-white leading-tight tracking-tight">
            Schools & institutes<br className="hidden sm:block" /> that made the switch.
          </h1>
          <p className="text-white/65 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Real results from real educators — from Kota coaching centres to Delhi Public Schools.
          </p>

          {/* Stat strip */}
          <div className="flex justify-center gap-8 sm:gap-16 pt-4 border-t border-white/10 mt-6">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <span className="block text-2xl sm:text-3xl font-black text-white">{s.value}</span>
                <span className="block text-[10px] text-white/50 font-medium mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FILTER TABS ── */}
      <div className="sticky top-16 z-20 bg-[#faf9f7]/95 backdrop-blur border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 py-3 overflow-x-auto">
          {(['all', 'school', 'coaching'] as FilterType[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full transition-all ${
                filter === f
                  ? 'bg-[#800000] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-[#800000]/30 hover:text-[#800000]'
              }`}
            >
              {f === 'all' ? 'All Clients' : f === 'school' ? 'Schools' : 'Coaching'}
            </button>
          ))}
          <span className="ml-auto text-[10px] text-slate-400 font-mono shrink-0">{visible.length} results</span>
        </div>
      </div>

      {/* ── CLIENT GRID ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map(client => (
              <motion.article
                key={client.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActive(client)}
                className="group bg-white border border-slate-150 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col"
              >
                {/* Color band */}
                <div className="h-1.5 w-full" style={{ background: client.color }} />

                <div className="p-5 flex flex-col gap-4 flex-1">
                  {/* Top row: avatar + name */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0"
                      style={{ background: client.color }}
                    >
                      {client.initials}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-serif font-bold text-slate-900 text-sm leading-snug group-hover:text-[#800000] transition-colors">
                        {client.name}
                      </h3>
                      <p className="flex items-center gap-1 text-[10px] text-slate-400 font-medium mt-0.5">
                        <MapPin className="w-2.5 h-2.5" />
                        {client.city}, {client.state}
                      </p>
                    </div>
                    <span className={`ml-auto shrink-0 text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                      client.type === 'school'
                        ? 'bg-blue-50 text-blue-600 border-blue-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {client.type}
                    </span>
                  </div>

                  {/* Result stat */}
                  <div className="bg-slate-50 rounded-xl px-4 py-3 flex items-center gap-3 border border-slate-100">
                    <span className="text-2xl font-black" style={{ color: client.color }}>{client.result}</span>
                    <span className="text-[11px] text-slate-500 leading-snug">{client.resultLabel}</span>
                  </div>

                  {/* Quote preview */}
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 flex-1">
                    <Quote className="w-3 h-3 inline-block mr-1 text-slate-300" />
                    {client.quote}
                  </p>

                  {/* Modules used */}
                  <div className="flex flex-wrap gap-1.5">
                    {client.modules.map(m => (
                      <span key={m} className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wide bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                        {MODULE_ICONS[m]}
                        {m}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Users className="w-2.5 h-2.5" /> {client.students} students
                    </span>
                    <span className="text-[10px] text-[#800000] font-bold flex items-center gap-0.5 group-hover:gap-1 transition-all">
                      Read story <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── DETAIL MODAL ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setActive(null)}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              onClick={e => e.stopPropagation()}
              className="relative bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto"
            >
              {/* Color accent top */}
              <div className="h-2 w-full" style={{ background: active.color }} />

              <div className="p-6 space-y-5">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg shrink-0"
                    style={{ background: active.color }}
                  >
                    {active.initials}
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-slate-900 text-lg leading-snug">{active.name}</h2>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> {active.city}, {active.state}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">On AcadOS since {active.since} · {active.students} students</p>
                  </div>
                </div>

                {/* Big result */}
                <div className="rounded-2xl px-5 py-4 border" style={{ borderColor: active.color + '30', background: active.color + '08' }}>
                  <span className="text-4xl font-black" style={{ color: active.color }}>{active.result}</span>
                  <p className="text-xs text-slate-600 mt-1">{active.resultLabel}</p>
                </div>

                {/* Full quote */}
                <blockquote className="relative">
                  <Quote className="w-6 h-6 text-slate-200 absolute -top-1 -left-1" />
                  <p className="text-slate-700 text-sm leading-relaxed pl-5 italic">"{active.quote}"</p>
                  <footer className="mt-3 pl-5 text-[11px] font-bold text-slate-500">— {active.contact}</footer>
                </blockquote>

                {/* Star rating */}
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  <span className="text-[10px] text-slate-400 ml-2 self-center">5.0 · Verified client</span>
                </div>

                {/* Modules */}
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-2">Modules Used</p>
                  <div className="flex flex-wrap gap-2">
                    {active.modules.map(m => (
                      <span key={m} className="flex items-center gap-1.5 text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200">
                        {MODULE_ICONS[m]} {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => { setActive(null); onBookDemo(); }}
                  className="w-full py-3.5 rounded-xl text-white text-sm font-bold tracking-wide transition-all active:scale-[0.98]"
                  style={{ background: active.color }}
                >
                  Get the same results — Book a Free Demo
                </button>

                <button onClick={() => setActive(null)} className="w-full text-center text-xs text-slate-400 hover:text-slate-600 py-1 transition-colors">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BOTTOM CTA ── */}
      <div className="bg-slate-900 py-14 px-4 sm:px-6 lg:px-8 mt-6">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-white leading-tight">
            Ready to join them?
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Free demo, no commitment. We'll walk you through every module live and set up a sandbox with your branding.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onBookDemo}
              className="bg-[#800000] hover:bg-[#6b0000] text-white font-bold text-sm py-3.5 px-8 rounded-xl transition-all active:scale-[0.98] shadow-lg"
            >
              Book Free Demo
            </button>
            <a
              href="tel:+919660034117"
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-sm py-3.5 px-8 rounded-xl transition-all"
            >
              <Phone className="w-4 h-4" /> +91 9660034117
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
