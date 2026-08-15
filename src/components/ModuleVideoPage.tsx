import { motion } from 'motion/react';
import { ArrowLeft, Play, Phone } from 'lucide-react';

interface ModuleVideoPageProps {
  moduleId: string;
  onBack: () => void;
  onBookDemo: () => void;
}

const MODULE_DATA: Record<string, {
  label: string;
  tagline: string;
  desc: string;
  color: string;
  youtubeId: string | null; // set to YouTube video ID when ready
}> = {
  testmaker: {
    label: 'TestMaker',
    tagline: 'AI Paper Generator',
    desc: 'Generate balanced exam papers from 6 Lakh+ syllabus-aligned questions in minutes. Custom branding, difficulty mix, and downloadable PDFs.',
    color: '#800000',
    youtubeId: null,
  },
  'practice-cbt': {
    label: 'CBT Mock Tests',
    tagline: 'NTA-Style Exam Portal',
    desc: 'Live CBT portal with timers, instant analytics, and NTA-style interface for JEE, NEET & board exams. Real exam conditions, anywhere.',
    color: '#b45309',
    youtubeId: null,
  },
  'omr-evaluation': {
    label: 'OMR Scanning',
    tagline: 'Smartphone Grading',
    desc: 'Grade bubble answer sheets using any smartphone camera in seconds. 99.8% accuracy with instant result export.',
    color: '#b0813f',
    youtubeId: null,
  },
  'erp-crm': {
    label: 'Institute ERP',
    tagline: 'All-in-One Management',
    desc: 'Fee ledger, attendance, staff registers, enquiry CRM and academic schedule — all in one place. Saves 40% operational time.',
    color: '#9e1b1b',
    youtubeId: null,
  },
  'content-library': {
    label: 'Content Library',
    tagline: 'Curriculum Resources',
    desc: 'CBSE, IGCSE & IB aligned pre-loaded curriculum worksheets, notes, and 6 Lakh+ resources ready to assign.',
    color: '#150000',
    youtubeId: null,
  },
  'learners-hub': {
    label: 'Learners Hub',
    tagline: 'Digital Learning Portal',
    desc: 'Student-facing app with assignments, performance tracking, and curated content. Keeps learners engaged beyond the classroom.',
    color: '#1d4ed8',
    youtubeId: null,
  },
};

export default function ModuleVideoPage({ moduleId, onBack, onBookDemo }: ModuleVideoPageProps) {
  const mod = MODULE_DATA[moduleId] ?? MODULE_DATA['testmaker'];

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      {/* top bar */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <span className="text-slate-300">|</span>
        <span className="text-sm font-bold" style={{ color: mod.color }}>{mod.label}</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <span
            className="inline-block text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
            style={{ color: mod.color, background: `${mod.color}10`, borderColor: `${mod.color}25` }}
          >
            {mod.tagline}
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A0A0F] tracking-tight">
            {mod.label}
          </h1>
          <p className="text-slate-500 text-base leading-relaxed max-w-xl">{mod.desc}</p>
        </motion.div>

        {/* video embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg"
          style={{ aspectRatio: '16/9' }}
        >
          {mod.youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${mod.youtubeId}?rel=0&modestbranding=1&autoplay=0`}
              title={`${mod.label} — AcadOS Demo`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            /* placeholder until video is added */
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-4"
              style={{ background: `linear-gradient(135deg, ${mod.color}12 0%, ${mod.color}06 100%)` }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: `${mod.color}18`, border: `2px solid ${mod.color}30` }}
              >
                <Play className="w-7 h-7" style={{ color: mod.color }} />
              </div>
              <div className="text-center space-y-1">
                <p className="font-bold text-slate-700">{mod.label} — Demo Video</p>
                <p className="text-slate-400 text-sm">Video coming soon</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <button
            onClick={onBookDemo}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all hover:opacity-90"
            style={{ background: mod.color }}
          >
            Book a Free Demo
          </button>
          <a
            href="tel:+919876543210"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-sm px-6 py-3.5 rounded-xl transition-all"
          >
            <Phone className="w-4 h-4" /> Call Us
          </a>
        </motion.div>

      </div>
    </div>
  );
}
