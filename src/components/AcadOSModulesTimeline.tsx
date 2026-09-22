import React, { useEffect, useRef, useState } from 'react';
import { 
  CheckCircle2, 
  ArrowUpRight, 
  ChevronRight,
  Layers,
  Sparkles
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
  badge: string;
  imageSrc: string;
  imageAlt: string;
}

const MODULES_DATA: ModuleItem[] = [
  {
    id: 'testmaker',
    stepNumber: '01 —',
    title: 'TestMaker Paper Generator',
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
    badge: '600K+ Question Bank',
    imageSrc: '/modules/testmaker.jpg',
    imageAlt: 'TestMaker Paper Generator Dashboard'
  },
  {
    id: 'practice-cbt',
    stepNumber: '02 —',
    title: 'CBT Mock Exam Platform',
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
    badge: 'JEE / NEET Live Engine',
    imageSrc: '/modules/cbt.png',
    imageAlt: 'CBT Mock Exam Platform Test Environment'
  },
  {
    id: 'omr-evaluation',
    stepNumber: '03 —',
    title: 'OMR SmartPhone Evaluation',
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
    badge: '99.8% AI Accuracy',
    imageSrc: '/modules/omr.jpg',
    imageAlt: 'Smartphone OMR Evaluation Simulator'
  },
  {
    id: 'erp-crm',
    stepNumber: '04 —',
    title: 'Institute ERP and CRM Suite',
    subtitle: 'Unified Campus Management & Admissions Funnel',
    keywords: ['FEE MANAGEMENT', 'ATTENDANCE', 'ADMISSIONS CRM'],
    description: 'Complete institutional administration suite unifying fee collection, attendance registers, timetable automation, and high-conversion admissions CRM.',
    capabilities: [
      'Centralized admissions CRM with WhatsApp automated follow-ups',
      'Fee ledger with installment plans & instant receipt generator',
      '1-tap RFID, biometric & app-based attendance tracker',
      'Multi-branch administrative oversight & executive analytics'
    ],
    tag: 'ERP + CRM SUITE',
    badge: 'All-in-One Campus OS',
    imageSrc: '/modules/erp.jpg',
    imageAlt: 'Institute ERP and CRM Suite Management Console'
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
              One OS. Four Modules.{' '}
              <span className="relative inline-block text-[#800000]">
                Zero Silos.
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-[#800000]/25" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 0 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-1">
              Explore the interconnected educational operating system powering exams, ERP, admissions, and evaluation.
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
              Interactive 01 → 04 Journey
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

          {/* 4 Alternating Steps */}
          <div className="space-y-16 md:space-y-28">
            {MODULES_DATA.map((module, index) => {
              const isEven = index % 2 === 1; // Step 02, 04 on desktop right
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
                      /* DESKTOP LEFT: Keyword tags for steps 02, 04 */
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
                      /* DESKTOP & MOBILE: Module Card for steps 01, 03 */
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
                      /* DESKTOP & MOBILE: Module Card for steps 02, 04 */
                      <ModuleCard 
                        module={module}
                        isRightSide={true}
                        isActive={isActive}
                        onExplore={() => onExploreModule && onExploreModule(module.id)}
                        onDemo={onBookDemo}
                      />
                    ) : (
                      /* DESKTOP RIGHT: Keyword tags for steps 01, 03 */
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
              Ready to experience all 4 modules configured for your institute?
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
// MODULE CARD COMPONENT WITH REAL LAPTOP MOCKUP IMAGE
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

      {/* High-Resolution Laptop Mockup Image Area */}
      <div className="p-3 sm:p-4 bg-slate-50/70 border-b border-slate-100 overflow-hidden">
        <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-inner group/img">
          <img 
            src={module.imageSrc} 
            alt={module.imageAlt}
            className="w-full h-auto object-cover transform group-hover/img:scale-[1.02] transition-transform duration-500 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none" />
        </div>
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
