import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Quote, Star, Building2, GraduationCap } from 'lucide-react';

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
  image?: string; // path in /public/clients/
}

const CLIENTS: Client[] = [
  {
    id: 1, name: 'Scholars Foundation School', type: 'school', city: 'India',
    initials: 'SFS', color: '#800000',
    image: '/clients/scholars-foundation.jpg',
    feedback: 'AcadOS has completely transformed how we manage exams and student data. Everything from test creation to results is now seamless and professional.',
    person: 'Principal', role: 'Scholars Foundation School',
  },
  {
    id: 2, name: 'Scholars International School', type: 'school', city: 'India',
    initials: 'SIS', color: '#1d4ed8',
    image: '/clients/scholars-international.jpg',
    feedback: 'The platform is intuitive and the support team is exceptional. Our teachers spend less time on admin and more time teaching. Highly recommended.',
    person: 'Director', role: 'Scholars International School',
  },
  {
    id: 3, name: 'LectureWala', type: 'coaching', city: 'India',
    initials: 'LW', color: '#059669',
    image: '/clients/lecturewala.jpg',
    feedback: 'As an online coaching platform, AcadOS gave us the edge we needed — smart test delivery, analytics, and a learner app our students love.',
    person: 'Founder', role: 'LectureWala',
  },
  {
    id: 4, name: 'Samariya Classes', type: 'coaching', city: 'India',
    initials: 'SC', color: '#d97706',
    image: '/clients/samariya-classes.jpg',
    feedback: 'Our batch results improved significantly after switching to AcadOS. The CBT platform is fast, reliable, and our students find it easy to use.',
    person: 'Director', role: 'Samariya Classes',
  },
  {
    id: 5, name: 'B2E Learning', type: 'coaching', city: 'India',
    initials: 'B2E', color: '#7c3aed',
    image: '/clients/b2e-learning.jpg',
    feedback: 'From content library to OMR evaluation — we use AcadOS end-to-end. It replaced three different tools we were paying for separately.',
    person: 'Co-Founder', role: 'B2E Learning',
  },
  {
    id: 6, name: 'St. Xavier School', type: 'school', city: 'India',
    initials: 'SXS', color: '#0891b2',
    image: '/clients/st-xavier.jpg',
    feedback: 'AcadOS brought order to our exam process. Parents appreciate the transparency and students stay engaged through the learners hub.',
    person: 'Academic Coordinator', role: 'St. Xavier School',
  },
  {
    id: 7, name: 'Whizdom Institute', type: 'coaching', city: 'India',
    initials: 'WI', color: '#be185d',
    image: '/clients/whizdom.jpg',
    feedback: 'The ERP module alone saved us 10+ hours a week. Combined with the test platform, AcadOS is now the backbone of our institute.',
    person: 'Operations Head', role: 'Whizdom Institute',
  },
  {
    id: 8, name: 'Geeta Classes', type: 'coaching', city: 'India',
    initials: 'GC', color: '#ea580c',
    image: '/clients/geeta-classes.jpg',
    feedback: 'Simple to onboard, powerful in use. Our faculty adapted within days and our students were immediately comfortable with the interface.',
    person: 'Director', role: 'Geeta Classes',
  },
];

function CardImage({ client }: { client: Client }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const Icon = client.type === 'school' ? GraduationCap : Building2;

  return (
    <div className="relative h-36 w-full overflow-hidden rounded-t-2xl">
      {/* fallback gradient always underneath */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-2"
        style={{ background: `linear-gradient(135deg, ${client.color}18 0%, ${client.color}08 100%)` }}
      >
        <Icon className="w-8 h-8 opacity-20" style={{ color: client.color }} />
        <span className="text-2xl font-black opacity-20" style={{ color: client.color }}>{client.initials}</span>
      </div>

      {/* real image on top */}
      {client.image && !errored && (
        <img
          src={client.image}
          alt={client.name}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {/* color tint overlay */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.95) 100%)` }} />

      {/* type badge */}
      <span
        className="absolute top-3 left-3 text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
        style={{ background: `${client.color}18`, color: client.color, border: `1px solid ${client.color}35` }}
      >
        {client.type === 'school' ? 'School' : 'Coaching'}
      </span>
    </div>
  );
}

export default function ClientsSection() {
  const [active, setActive] = useState<Client | null>(null);

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[#F8F7F4] overflow-hidden">
      {/* subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.4]"
        style={{ backgroundImage: 'radial-gradient(circle, #00000010 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* heading */}
        <div className="text-center mb-12 space-y-3">
          <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-widest text-[#800000] bg-[#80000010] border border-[#80000025] px-3 py-1 rounded-full">
            Our Clients
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A0A0F] tracking-tight">
            Trusted by schools &amp; coaching institutes
          </h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Click any card to read what they have to say.
          </p>
        </div>

        {/* card grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {CLIENTS.map((c, i) => (
            <motion.button
              key={c.id}
              onClick={() => setActive(c)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              whileHover={{ y: -6, scale: 1.025 }}
              whileTap={{ scale: 0.97 }}
              className="group rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-slate-300 text-left focus:outline-none transition-colors duration-200"
              style={{
                boxShadow: `0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)`,
              }}
            >
              {/* image area */}
              <CardImage client={c} />

              {/* color accent bar */}
              <div className="h-[3px] w-full" style={{ background: c.color }} />

              {/* text body */}
              <div className="px-4 pb-4 pt-3 space-y-2">
                <p className="text-[#0A0A0F] font-bold text-sm leading-snug">{c.name}</p>
                <p className="text-slate-400 text-[11px] leading-snug line-clamp-2">
                  "{c.feedback.slice(0, 55)}…"
                </p>
                <p className="text-[11px] font-semibold" style={{ color: c.color }}>
                  Read feedback →
                </p>
              </div>

              {/* hover glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: `inset 0 0 0 1.5px ${c.color}30` }}
              />
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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setActive(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="fixed inset-x-4 bottom-4 sm:inset-auto sm:left-1/2 sm:-translate-x-1/2 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md z-50 bg-white border border-slate-200 rounded-3xl overflow-hidden"
              style={{ boxShadow: `0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px ${active.color}20` }}
            >
              <div className="h-1.5 w-full" style={{ background: active.color }} />

              <div className="p-7 space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
                      style={{ background: `${active.color}15`, border: `2px solid ${active.color}30`, color: active.color }}
                    >
                      {active.initials}
                    </div>
                    <div>
                      <p className="text-[#0A0A0F] font-bold text-sm leading-tight">{active.name}</p>
                      <span
                        className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                        style={{ background: `${active.color}12`, color: active.color, border: `1px solid ${active.color}25` }}
                      >
                        {active.type === 'school' ? 'School' : 'Coaching'}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => setActive(null)} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* quote */}
                <div className="relative pl-4 border-l-2" style={{ borderColor: active.color }}>
                  <Quote className="w-4 h-4 absolute -top-1 -left-2 rotate-180" style={{ color: active.color }} />
                  <p className="text-slate-700 text-sm leading-relaxed">{active.feedback}</p>
                </div>

                <p className="text-xs text-slate-400">
                  — <span className="text-slate-600 font-semibold">{active.person}</span>, {active.role}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
