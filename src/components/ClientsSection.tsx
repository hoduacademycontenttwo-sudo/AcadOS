import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Quote, Star } from 'lucide-react';

interface Client {
  id: number;
  name: string;
  type: 'school' | 'coaching';
  city: string;
  initials: string;
  color: string;
  feedback: string;
  person: string;
  role: string;
}

const CLIENTS: Client[] = [
  {
    id: 1, name: 'Scholars Foundation School', type: 'school', city: 'India',
    initials: 'SFS', color: '#800000',
    feedback: 'AcadOS has completely transformed how we manage exams and student data. Everything from test creation to results is now seamless and professional.',
    person: 'Principal', role: 'Scholars Foundation School',
  },
  {
    id: 2, name: 'Scholars International School', type: 'school', city: 'India',
    initials: 'SIS', color: '#1d4ed8',
    feedback: 'The platform is intuitive and the support team is exceptional. Our teachers spend less time on admin and more time teaching. Highly recommended.',
    person: 'Director', role: 'Scholars International School',
  },
  {
    id: 3, name: 'LectureWala', type: 'coaching', city: 'India',
    initials: 'LW', color: '#059669',
    feedback: 'As an online coaching platform, AcadOS gave us the edge we needed — smart test delivery, analytics, and a learner app our students love.',
    person: 'Founder', role: 'LectureWala',
  },
  {
    id: 4, name: 'Samariya Classes', type: 'coaching', city: 'India',
    initials: 'SC', color: '#d97706',
    feedback: 'Our batch results improved significantly after switching to AcadOS. The CBT platform is fast, reliable, and our students find it easy to use.',
    person: 'Director', role: 'Samariya Classes',
  },
  {
    id: 5, name: 'B2E Learning', type: 'coaching', city: 'India',
    initials: 'B2E', color: '#7c3aed',
    feedback: 'From content library to OMR evaluation — we use AcadOS end-to-end. It replaced three different tools we were paying for separately.',
    person: 'Co-Founder', role: 'B2E Learning',
  },
  {
    id: 6, name: 'St. Xavier School', type: 'school', city: 'India',
    initials: 'SXS', color: '#0891b2',
    feedback: 'AcadOS brought order to our exam process. Parents appreciate the transparency and students stay engaged through the learners hub.',
    person: 'Academic Coordinator', role: 'St. Xavier School',
  },
  {
    id: 7, name: 'Whizdom Institute', type: 'coaching', city: 'India',
    initials: 'WI', color: '#be185d',
    feedback: 'The ERP module alone saved us 10+ hours a week. Combined with the test platform, AcadOS is now the backbone of our institute.',
    person: 'Operations Head', role: 'Whizdom Institute',
  },
  {
    id: 8, name: 'Geeta Classes', type: 'coaching', city: 'India',
    initials: 'GC', color: '#ea580c',
    feedback: 'Simple to onboard, powerful in use. Our faculty adapted within days and our students were immediately comfortable with the interface.',
    person: 'Director', role: 'Geeta Classes',
  },
];

export default function ClientsSection() {
  const [active, setActive] = useState<Client | null>(null);

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 overflow-hidden">
      {/* subtle grid bg */}
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)',backgroundSize:'48px 48px'}} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-[radial-gradient(ellipse,rgba(128,0,0,0.12),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* heading */}
        <div className="text-center mb-12 space-y-3">
          <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-widest text-gold-400 bg-gold-400/10 border border-gold-400/20 px-3 py-1 rounded-full">
            Our Clients
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-white tracking-tight">
            Trusted by schools &amp; coaching institutes
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Click any card to read what they have to say.
          </p>
        </div>

        {/* 3D card grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CLIENTS.map((c, i) => (
            <motion.button
              key={c.id}
              onClick={() => setActive(c)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                transformStyle: 'preserve-3d',
                boxShadow: `0 8px 32px ${c.color}28, 0 2px 8px rgba(0,0,0,0.4)`,
              }}
              className="relative group rounded-2xl overflow-hidden bg-slate-800 border border-white/8 hover:border-white/20 transition-colors duration-300 text-left focus:outline-none"
            >
              {/* color top bar */}
              <div className="h-1.5 w-full" style={{ background: c.color }} />

              <div className="p-5 space-y-3">
                {/* avatar */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-sm"
                  style={{ background: `${c.color}22`, border: `2px solid ${c.color}44`, color: c.color }}
                >
                  {c.initials}
                </div>

                <div>
                  <p className="text-white font-bold text-sm leading-snug">{c.name}</p>
                  <span
                    className="mt-1 inline-block text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{ background: `${c.color}18`, color: c.color, border: `1px solid ${c.color}30` }}
                  >
                    {c.type === 'school' ? 'School' : 'Coaching'}
                  </span>
                </div>

                <p className="text-slate-500 text-[10px] leading-snug line-clamp-2 group-hover:text-slate-400 transition-colors">
                  "{c.feedback.slice(0, 60)}…"
                </p>

                <p className="text-[10px] font-semibold" style={{ color: c.color }}>
                  Read feedback →
                </p>
              </div>

              {/* 3d shine */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)' }} />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Feedback modal */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              onClick={() => setActive(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="fixed inset-x-4 bottom-4 sm:inset-auto sm:left-1/2 sm:-translate-x-1/2 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md z-50 bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
              style={{ boxShadow: `0 24px 80px ${active.color}30` }}
            >
              <div className="h-1.5 w-full" style={{ background: active.color }} />

              <div className="p-7 space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
                      style={{ background: `${active.color}22`, border: `2px solid ${active.color}44`, color: active.color }}
                    >
                      {active.initials}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{active.name}</p>
                      <span
                        className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                        style={{ background: `${active.color}18`, color: active.color, border: `1px solid ${active.color}30` }}
                      >
                        {active.type === 'school' ? 'School' : 'Coaching'}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => setActive(null)} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/8 transition-colors shrink-0">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                  ))}
                </div>

                {/* quote */}
                <div className="relative pl-4 border-l-2" style={{ borderColor: active.color }}>
                  <Quote className="w-4 h-4 absolute -top-1 -left-2 rotate-180" style={{ color: active.color }} />
                  <p className="text-slate-200 text-sm leading-relaxed">{active.feedback}</p>
                </div>

                <p className="text-xs text-slate-500">
                  — <span className="text-slate-400 font-semibold">{active.person}</span>, {active.role}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
