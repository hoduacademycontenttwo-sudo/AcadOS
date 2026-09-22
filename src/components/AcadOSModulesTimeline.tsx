import React, { useEffect, useRef, useState } from 'react';
import { 
  BookOpenCheck, 
  Trophy, 
  Smartphone, 
  Database, 
  Users, 
  Compass, 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles,
  Zap,
  Clock,
  ShieldCheck,
  TrendingUp,
  Award,
  ChevronRight,
  Layers
} from 'lucide-react';

export interface AcadOSModulesTimelineProps {
  onExploreModule?: (moduleId: string) => void;
  onBookDemo?: () => void;
}

interface ModuleItem {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  keywords: string[];
  description: string;
  capabilities: string[];
  tag: string;
  color: string;
  badge: string;
  previewType: 'testmaker' | 'cbt' | 'omr' | 'erp' | 'crm' | 'learners-hub';
}

const MODULES_DATA: ModuleItem[] = [
  {
    id: 'testmaker',
    stepNumber: '01 —',
    title: 'TestMaker Engine',
    subtitle: 'AI-Powered Exam Paper & Blueprint Generator',
    keywords: ['QUESTION BANK', 'SMART PAPERS', 'BLUEPRINT'],
    description: 'Assemble balanced, syllabus-aligned test papers and question banks in under 2 minutes. Tap into 600K+ verified questions with automated Set A/B shuffling.',
    capabilities: [
      '6 Lakh+ curated CBSE, JEE, NEET & Olympiad questions',
      'Multi-set paper generator with automated answer keys',
      'Dual-column print-ready PDF & editable Word export',
      'Bloom taxonomy & cognitive difficulty distribution'
    ],
    tag: 'EXAM AUTOMATION',
    color: '#800000',
    badge: '600K+ Question Bank',
    previewType: 'testmaker'
  },
  {
    id: 'practice-cbt',
    stepNumber: '02 —',
    title: 'CBT Simulator',
    subtitle: 'NTA-Grade Computer Based Test Portal',
    keywords: ['NTA SIMULATION', 'LIVE TIMERS', 'REAL-TIME RANKS'],
    description: 'Deploy online tests replicating the exact NTA exam environment for JEE Main/Advanced, NEET, and Olympiads with sub-second latency and cheat protection.',
    capabilities: [
      'Exact NTA question palette with review & mark states',
      'Real-time live rank lists & multi-institute benchmarking',
      'Detailed subject, speed & negative-marking analytics',
      'Automated timer auto-submit with anti-tab switch detection'
    ],
    tag: 'EXAM SIMULATION',
    color: '#800000',
    badge: 'JEE / NEET Live Engine',
    previewType: 'cbt'
  },
  {
    id: 'omr-evaluation',
    stepNumber: '03 —',
    title: 'OMR Evaluation',
    subtitle: 'Instant Smartphone Camera OMR Scanner',
    keywords: ['MOBILE VISION', '99.8% ACCURACY', '1-CLICK SCORE'],
    description: 'Grade physical bubble sheets in seconds using standard smartphone cameras. Eliminate expensive hardware scanners with computer vision processing.',
    capabilities: [
      '99.8% optical accuracy under normal lighting & tilts',
      'Instant WhatsApp & SMS result scorecard distribution',
      'Batch-evaluates 100+ sheets in under 5 minutes',
      'Auto-generates student weakness & error heatmaps'
    ],
    tag: 'COMPUTER VISION',
    color: '#800000',
    badge: '99.8% AI Accuracy',
    previewType: 'omr'
  },
  {
    id: 'erp-crm',
    stepNumber: '04 —',
    title: 'School ERP',
    subtitle: 'Unified Academic & Administration Engine',
    keywords: ['FEE MANAGEMENT', 'ATTENDANCE', 'ACADEMICS'],
    description: 'Complete institutional administration suite unifying fee collection, attendance registers, timetable automation, and student report card generation.',
    capabilities: [
      'Fee ledger with installment plans & receipt generator',
      '1-tap RFID, biometric & app-based attendance tracker',
      'Class scheduling, teacher substitution & syllabus monitor',
      'Multi-branch administrative oversight dashboard'
    ],
    tag: 'INSTITUTE ERP',
    color: '#800000',
    badge: 'Saves 40% Admin Time',
    previewType: 'erp'
  },
  {
    id: 'admissions-crm',
    stepNumber: '05 —',
    title: 'Admissions CRM',
    subtitle: 'High-Conversion Student Enquiry Funnel',
    keywords: ['ENQUIRY FUNNEL', 'FOLLOW-UPS', 'WHATSAPP AUTOMATION'],
    description: 'Convert walk-ins, phone calls, and digital inquiries into confirmed enrollments with automated counseling stages and WhatsApp reminder triggers.',
    capabilities: [
      'Centralized lead ingestion from web, social & walk-ins',
      'Automated WhatsApp follow-up drip campaigns',
      'Counselor performance analytics & conversion rates',
      'Seat reservation, batch allocation & registration tracking'
    ],
    tag: 'LEAD MANAGEMENT',
    color: '#800000',
    badge: '3.2x Lead Conversion',
    previewType: 'crm'
  },
  {
    id: 'learners-hub',
    stepNumber: '06 —',
    title: 'Learners Hub',
    subtitle: 'Branded Student Learning & Content Portal',
    keywords: ['STUDENT APP', 'VIDEO LECTURES', 'PROGRESS TRACKER'],
    description: 'A 100% white-labelled mobile app & web LMS providing students continuous access to digital notes, recorded video lectures, and practice quizzes.',
    capabilities: [
      'Chapter-wise digital notes, formula cheat sheets & solutions',
      'Recorded video classes with playback speed controls',
      'Personalized adaptive practice tests & streak rewards',
      'Progressive Web App (PWA) with offline reading support'
    ],
    tag: 'STUDENT LEARNING',
    color: '#800000',
    badge: '24/7 Student Portal',
    previewType: 'learners-hub'
  }
];

export default function AcadOSModulesTimeline({ onExploreModule, onBookDemo }: AcadOSModulesTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spineTrackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  // High-performance scroll tracking via requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate progress through container
            const totalDistance = rect.height - windowHeight * 0.5;
            const currentProgress = (windowHeight * 0.5 - rect.top) / totalDistance;
            const clamped = Math.max(0, Math.min(1, currentProgress));
            setScrollProgress(clamped);

            // Determine active step based on card positions
            let closestIndex = 0;
            let minDistance = Infinity;
            cardRefs.current.forEach((card, idx) => {
              if (card) {
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.top + cardRect.height / 2;
                const distance = Math.abs(cardCenter - windowHeight / 2);
                if (distance < minDistance) {
                  minDistance = distance;
                  closestIndex = idx;
                }
              }
            });
            setActiveStep(closestIndex);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToStep = (index: number) => {
    const targetCard = cardRefs.current[index];
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-20 lg:py-28 bg-[#faf9f6] overflow-hidden select-none"
      id="platform-ecosystem-timeline"
    >
      {/* Subtle architectural background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.45] pointer-events-none"
        style={{ 
          backgroundImage: 'radial-gradient(circle, #80000014 1px, transparent 1px)', 
          backgroundSize: '32px 32px' 
        }} 
      />
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================ */}
        {/* HEADER SECTION                                               */}
        {/* ============================================================ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 md:pb-24 border-b border-slate-200/80">
          <div className="space-y-3 max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#800000] animate-pulse" />
              <span className="text-[11px] font-mono font-black uppercase tracking-[0.25em] text-[#800000]">
                PLATFORM ECOSYSTEM —
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              One OS. Six Modules.{' '}
              <span className="relative inline-block text-[#800000]">
                Zero Silos.
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-[#800000]/25" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 0 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-1">
              Explore the interconnected educational operating system powering exams, ERP, admissions, and learning.
            </p>
          </div>

          {/* Top-right corner metadata badge */}
          <div className="flex flex-col md:items-end gap-2 shrink-0">
            <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs">
              <Layers className="w-3.5 h-3.5 text-[#800000]" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-700 uppercase">
                MODULES / REAL-TIME ARCHITECTURE
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Interactive 01 → 06 Journey
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* VERTICAL TIMELINE CONTAINER                                  */}
        {/* ============================================================ */}
        <div className="relative pt-12 md:pt-16">
          
          {/* Central Animated Timeline Spine */}
          {/* Desktop: Center aligned | Mobile (<768px): Left aligned at 24px */}
          <div 
            ref={spineTrackRef}
            className="absolute top-12 bottom-12 left-6 md:left-1/2 -translate-x-1/2 w-[3px] bg-slate-200 rounded-full z-0"
          >
            {/* Active Progress Line */}
            <div 
              className="absolute top-0 left-0 w-full bg-[#800000] rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_#80000080]"
              style={{ height: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>

          {/* 6 Alternating Steps */}
          <div className="space-y-16 md:space-y-28">
            {MODULES_DATA.map((module, index) => {
              const isEven = index % 2 === 1; // Step 02, 04, 06 on desktop right
              const isActive = activeStep === index;
              const isPassed = activeStep > index;

              return (
                <div
                  key={module.id}
                  ref={(el) => { cardRefs.current[index] = el; }}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
                >
                  {/* Central Node Dot (Absolute on spine) */}
                  <button
                    onClick={() => scrollToStep(index)}
                    aria-label={`Scroll to ${module.title}`}
                    className={`absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center cursor-pointer transition-all duration-300 focus:outline-none ${
                      isActive ? 'scale-125' : 'hover:scale-110'
                    }`}
                    style={{ top: '32px' }}
                  >
                    {/* Glowing outer ring when active */}
                    <div 
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#800000]/15 ring-4 ring-[#800000]/25 shadow-lg' 
                          : isPassed 
                            ? 'bg-[#800000]/10' 
                            : 'bg-white border-2 border-slate-300 shadow-xs'
                      }`}
                    >
                      {/* Inner core circle */}
                      <div 
                        className={`w-4 h-4 rounded-full transition-all duration-300 flex items-center justify-center ${
                          isActive || isPassed 
                            ? 'bg-[#800000]' 
                            : 'bg-slate-300'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                    </div>
                  </button>

                  {/* LEFT SIDE (Desktop) */}
                  {/* If Even: Shows Keywords on Left | If Odd: Shows Card on Left */}
                  <div className={`pl-16 md:pl-0 ${isEven ? 'md:order-1' : 'md:order-1'}`}>
                    {isEven ? (
                      /* DESKTOP LEFT: Keyword tags for steps 02, 04, 06 */
                      <div className="hidden md:flex flex-col items-end text-right pr-8 lg:pr-12 space-y-3">
                        <div className="inline-flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold text-[#800000] tracking-widest uppercase">
                            KEYWORD ARCHITECTURE
                          </span>
                          <span className="w-6 h-[2px] bg-[#800000]" />
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          {module.keywords.map((kw, ki) => (
                            <span 
                              key={ki}
                              className="text-xs lg:text-sm font-mono font-extrabold text-slate-700 tracking-wider bg-white/80 border border-slate-200/90 px-3 py-1 rounded-lg shadow-2xs"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest pt-1">
                          {module.badge}
                        </span>
                      </div>
                    ) : (
                      /* DESKTOP & MOBILE: Module Card for steps 01, 03, 05 */
                      <ModuleCard 
                        module={module}
                        isRightSide={false}
                        isActive={isActive}
                        onExplore={() => onExploreModule && onExploreModule(module.id)}
                        onDemo={onBookDemo}
                      />
                    )}
                  </div>

                  {/* RIGHT SIDE (Desktop) */}
                  {/* If Even: Shows Card on Right | If Odd: Shows Keywords on Right */}
                  <div className={`pl-16 md:pl-0 ${isEven ? 'md:order-2' : 'md:order-2'}`}>
                    {isEven ? (
                      /* DESKTOP & MOBILE: Module Card for steps 02, 04, 06 */
                      <ModuleCard 
                        module={module}
                        isRightSide={true}
                        isActive={isActive}
                        onExplore={() => onExploreModule && onExploreModule(module.id)}
                        onDemo={onBookDemo}
                      />
                    ) : (
                      /* DESKTOP RIGHT: Keyword tags for steps 01, 03, 05 */
                      <div className="hidden md:flex flex-col items-start text-left pl-8 lg:pl-12 space-y-3">
                        <div className="inline-flex items-center gap-2">
                          <span className="w-6 h-[2px] bg-[#800000]" />
                          <span className="text-[11px] font-mono font-bold text-[#800000] tracking-widest uppercase">
                            KEYWORD ARCHITECTURE
                          </span>
                        </div>
                        <div className="flex flex-col items-start gap-1.5">
                          {module.keywords.map((kw, ki) => (
                            <span 
                              key={ki}
                              className="text-xs lg:text-sm font-mono font-extrabold text-slate-700 tracking-wider bg-white/80 border border-slate-200/90 px-3 py-1 rounded-lg shadow-2xs"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest pt-1">
                          {module.badge}
                        </span>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* ============================================================ */}
        {/* BOTTOM TIMELINE BANNER                                       */}
        {/* ============================================================ */}
        <div className="mt-20 lg:mt-28 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#800000]/8 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#800000]/10 text-[#800000] border border-[#800000]/20">
              UNIFIED DEPLOYMENT
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-slate-900 tracking-tight">
              Ready to experience all 6 modules configured for your institute?
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Book a live 1-on-1 walkthrough. We'll set up your white-labelled portal with your logo and syllabus in 48 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={onBookDemo}
              className="bg-[#800000] hover:bg-[#660000] text-white text-xs font-extrabold uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Schedule Live Walkthrough</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

// ======================================================================
// MODULE CARD COMPONENT
// ======================================================================
interface ModuleCardProps {
  module: ModuleItem;
  isRightSide: boolean;
  isActive: boolean;
  onExplore?: () => void;
  onDemo?: () => void;
}

function ModuleCard({ module, isRightSide, isActive, onExplore, onDemo }: ModuleCardProps) {
  return (
    <div 
      className={`group relative bg-white rounded-3xl border transition-all duration-300 overflow-hidden text-left ${
        isActive 
          ? 'border-[#800000]/40 shadow-xl ring-1 ring-[#800000]/20 -translate-y-1' 
          : 'border-slate-200/90 hover:border-slate-300 hover:shadow-lg shadow-sm'
      }`}
    >
      {/* Speech-bubble notch pointing toward central timeline on desktop */}
      <div 
        className={`hidden md:block absolute top-7 w-3.5 h-3.5 bg-white transform rotate-45 border transition-colors ${
          isActive ? 'border-[#800000]/30' : 'border-slate-200'
        } ${
          isRightSide 
            ? '-left-[8px] border-b-0 border-r-0' 
            : '-right-[8px] border-t-0 border-l-0'
        }`}
      />

      {/* Top Header Row with Step Number & Tag */}
      <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-xl sm:text-2xl font-mono font-black text-[#800000] tracking-tighter">
            {module.stepNumber}
          </span>
          <div>
            <h4 className="text-lg sm:text-xl font-serif font-extrabold text-slate-900 tracking-tight leading-snug">
              {module.title}
            </h4>
            <p className="text-[11px] text-slate-500 font-sans leading-tight font-medium">
              {module.subtitle}
            </p>
          </div>
        </div>

        {/* Category tag */}
        <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
          {module.tag}
        </span>
      </div>

      {/* High-Contrast Interactive Visual Mockup Area */}
      <div className="p-4 sm:p-5 bg-slate-50/70 border-b border-slate-100">
        <ModuleVisualPreview type={module.previewType} />
      </div>

      {/* Card Content & Capabilities List */}
      <div className="p-6 space-y-4">
        {/* Description */}
        <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
          {module.description}
        </p>

        {/* Capabilities Checklist */}
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 block pt-1">
            KEY CAPABILITIES
          </span>
          <ul className="space-y-2">
            {module.capabilities.map((cap, ci) => (
              <li key={ci} className="flex items-start gap-2.5 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#800000] shrink-0 mt-0.5" />
                <span className="leading-snug">{cap}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Keyword tags (visible only on small screens) */}
        <div className="md:hidden flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
          {module.keywords.map((kw, ki) => (
            <span 
              key={ki}
              className="text-[9px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
            >
              {kw}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <button
            onClick={onExplore}
            className="text-xs font-bold text-[#800000] hover:text-[#550000] flex items-center gap-1 group/btn transition-colors cursor-pointer"
          >
            <span>Explore {module.title}</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={onDemo}
            className="text-[11px] font-mono font-bold text-slate-500 hover:text-slate-900 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Try Demo
          </button>
        </div>
      </div>

    </div>
  );
}

// ======================================================================
// INTERACTIVE HIGH-CONTRAST VISUAL MOCKUP COMPONENT
// ======================================================================
function ModuleVisualPreview({ type }: { type: ModuleItem['previewType'] }) {
  switch (type) {
    case 'testmaker':
      return (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3 font-sans">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-slate-800">TestMaker Blueprint Config</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#800000] bg-[#800000]/10 px-2 py-0.5 rounded">
              CBSE Class 12 Physics
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[9px] text-slate-400 font-mono block">EASY (30%)</span>
              <span className="text-sm font-black text-slate-800">12 Qs</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[9px] text-slate-400 font-mono block">MED (50%)</span>
              <span className="text-sm font-black text-slate-800">20 Qs</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[9px] text-slate-400 font-mono block">HARD (20%)</span>
              <span className="text-sm font-black text-slate-800">8 Qs</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 text-white flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>40 Qs Generated in 1.4s</span>
            </div>
            <span className="text-emerald-400 font-bold">PDF Ready ⎙</span>
          </div>
        </div>
      );

    case 'cbt':
      return (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3 font-sans">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#800000] animate-pulse" />
              <span className="font-bold text-slate-800">JEE Advanced Mock Test</span>
            </div>
            <span className="text-[11px] font-mono font-black text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
              ⏱ 02:45:18
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
            <p className="font-bold text-slate-900 leading-tight">Q.14 The magnetic field in a region is given by...</p>
            <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
              <span className="bg-white border border-slate-200 p-1.5 rounded text-slate-700 font-medium">A) B₀ (x/L) k̂</span>
              <span className="bg-emerald-50 border border-emerald-300 p-1.5 rounded text-emerald-800 font-bold">B) 2B₀ (y/L) î ✓</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-slate-500">
            <span>Palette: 28 Answered • 4 Flagged</span>
            <span className="text-emerald-600 font-bold">Sub-second Latency</span>
          </div>
        </div>
      );

    case 'omr':
      return (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3 font-sans">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 text-xs">
            <div className="flex items-center gap-2">
              <Smartphone className="w-3.5 h-3.5 text-[#800000]" />
              <span className="font-bold text-slate-800">Vision Scanner Active</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              99.8% AI Match
            </span>
          </div>

          <div className="relative p-3 rounded-xl bg-slate-900 text-white flex items-center justify-between overflow-hidden">
            <div className="space-y-0.5 z-10">
              <span className="text-[9px] font-mono text-slate-400 block">ROLL: 2026-NEET-042</span>
              <p className="text-xs font-bold text-emerald-400">Score: 680 / 720 (Rank #2)</p>
            </div>
            <div className="flex gap-1.5 z-10">
              {['A','B','C','D'].map((opt, i) => (
                <span 
                  key={opt}
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                    i === 2 ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-300' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {opt}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>Scan Time: 0.8s</span>
            <span className="text-[#800000] font-bold">WhatsApp Report Sent ✓</span>
          </div>
        </div>
      );

    case 'erp':
      return (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3 font-sans">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 text-xs">
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-[#800000]" />
              <span className="font-bold text-slate-800">Institutional ERP Dashboard</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
              Academic Year 2026-27
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[9px] text-slate-400 font-mono block">TODAY ATTENDANCE</span>
              <span className="text-base font-black text-emerald-600">96.4%</span>
              <span className="text-[9px] text-slate-500 block">1,420 / 1,473 Present</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[9px] text-slate-400 font-mono block">FEE COLLECTION</span>
              <span className="text-base font-black text-slate-900">₹ 84.2 L</span>
              <span className="text-[9px] text-slate-500 block">Q1 Target: 92% Met</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-0.5">
            <span>Automated Timetable: Active</span>
            <span className="text-blue-600 font-bold">Instant SMS Sync</span>
          </div>
        </div>
      );

    case 'crm':
      return (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3 font-sans">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 text-xs">
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-[#800000]" />
              <span className="font-bold text-slate-800">Admissions Pipeline</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
              342 Inquiries
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-mono">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-[8px]">LEAD</span>
              <span className="font-bold text-slate-800">184</span>
            </div>
            <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
              <span className="text-blue-600 block text-[8px]">DEMO</span>
              <span className="font-bold text-blue-900">86</span>
            </div>
            <div className="p-2 rounded-lg bg-amber-50 border border-amber-200">
              <span className="text-amber-600 block text-[8px]">COUNSEL</span>
              <span className="font-bold text-amber-900">48</span>
            </div>
            <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="text-emerald-600 block text-[8px]">PAID</span>
              <span className="font-bold text-emerald-900">24</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>WhatsApp Drip: 94% Opened</span>
            <span className="text-purple-700 font-bold">Auto Follow-up ⚡</span>
          </div>
        </div>
      );

    case 'learners-hub':
      return (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3 font-sans">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 text-xs">
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#800000]" />
              <span className="font-bold text-slate-800">Learners Hub App (PWA)</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              🔥 14-Day Streak
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
            <div className="flex justify-between items-center text-[11px] font-medium text-slate-700">
              <span>Chapter 4: Rotational Motion</span>
              <span className="font-bold text-[#800000]">85% Done</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#800000] rounded-full w-[85%]" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono pt-0.5">
              <span>12 Video Lectures</span>
              <span>4 Notes & 2 Quizzes</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>Offline Downloads: Enabled</span>
            <span className="text-[#800000] font-bold">Institute White-Label</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}
