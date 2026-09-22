import React, { useEffect, useRef, useState } from 'react';
import { 
  ArrowUpRight, 
  ChevronRight
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
    tag: 'EXAM AUTOMATION',
    badge: '600K+ Question Bank',
    imageSrc: '/modules/testmaker.jpg',
    imageAlt: 'TestMaker Paper Generator'
  },
  {
    id: 'practice-cbt',
    stepNumber: '02 —',
    title: 'CBT Mock Exam Platform',
    subtitle: 'NTA-Grade Computer Based Test Portal',
    keywords: ['NTA SIMULATION', 'LIVE TIMERS', 'REAL-TIME RANKS'],
    tag: 'EXAM SIMULATION',
    badge: 'JEE / NEET Live Engine',
    imageSrc: '/modules/cbt.png',
    imageAlt: 'CBT Mock Exam Platform'
  },
  {
    id: 'omr-evaluation',
    stepNumber: '03 —',
    title: 'OMR SmartPhone Evaluation',
    subtitle: 'Instant Smartphone Camera OMR Scanner',
    keywords: ['MOBILE VISION', '99.8% ACCURACY', '1-CLICK SCORE'],
    tag: 'COMPUTER VISION',
    badge: '99.8% AI Accuracy',
    imageSrc: '/modules/omr.jpg',
    imageAlt: 'Smartphone OMR Evaluation'
  },
  {
    id: 'erp-crm',
    stepNumber: '04 —',
    title: 'Institute ERP and CRM Suite',
    subtitle: 'Unified Campus Management & Admissions Funnel',
    keywords: ['FEE MANAGEMENT', 'ATTENDANCE', 'ADMISSIONS CRM'],
    tag: 'ERP + CRM SUITE',
    badge: 'All-in-One Campus OS',
    imageSrc: '/modules/erp.jpg',
    imageAlt: 'Institute ERP and CRM Suite'
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
        {/* HEADER SECTION (Center Aligned)                              */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto pb-14 md:pb-20 border-b border-slate-200/80 space-y-3">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2">
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
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-1 max-w-2xl mx-auto">
            Explore the interconnected educational operating system powering exams, ERP, admissions, and evaluation.
          </p>
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
                    style={{ top: '24px' }}
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
                              className="text-xs lg:text-sm font-mono font-extrabold text-slate-700 tracking-wider bg-white border border-slate-200 px-3 py-1 rounded-lg shadow-xs"
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
                        isActive={isActive}
                        onExplore={() => onExploreModule && onExploreModule(module.id)}
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
                        isActive={isActive}
                        onExplore={() => onExploreModule && onExploreModule(module.id)}
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
                              className="text-xs lg:text-sm font-mono font-extrabold text-slate-700 tracking-wider bg-white border border-slate-200 px-3 py-1 rounded-lg shadow-xs"
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
// CLEAN BORDERLESS MODULE CARD (ONLY TITLE, IMAGE & EXPLORE BUTTON)
// ======================================================================
interface ModuleCardProps {
  module: ModuleItem;
  isActive: boolean;
  onExplore?: () => void;
}

function ModuleCard({ module, isActive, onExplore }: ModuleCardProps) {
  return (
    <div className="relative text-left space-y-4 group">
      {/* Step Title & Category */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl sm:text-3xl font-mono font-black text-[#800000] tracking-tighter">
            {module.stepNumber}
          </span>
          <div>
            <h4 className="text-lg sm:text-xl font-serif font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-[#800000] transition-colors">
              {module.title}
            </h4>
            <p className="text-xs text-slate-500 font-sans font-medium">
              {module.subtitle}
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-block text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
          {module.tag}
        </span>
      </div>

      {/* Clean Laptop Mockup Image (Without inner border box) */}
      <div 
        onClick={onExplore}
        className="relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1"
      >
        <img 
          src={module.imageSrc} 
          alt={module.imageAlt}
          className="w-full h-auto object-cover rounded-2xl"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />
      </div>

      {/* Explore Button */}
      <div className="pt-1 flex items-center justify-start">
        <button
          onClick={onExplore}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#800000] hover:bg-[#660000] text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow transition-all active:scale-[0.98] cursor-pointer group/btn"
        >
          <span>Explore {module.title}</span>
          <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
