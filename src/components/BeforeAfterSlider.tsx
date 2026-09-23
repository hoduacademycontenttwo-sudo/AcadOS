import React, { useEffect, useRef, useState } from 'react';
import { XCircle, CheckCircle2, Sparkles, ArrowRight, MoveVertical } from 'lucide-react';

interface ComparisonItem {
  category: string;
  traditional: string;
  acados: string;
  role: string;
}

const COMPARISON_ITEMS: ComparisonItem[] = [
  {
    category: 'Academic Planning',
    traditional: 'Manual planning on Word docs with scattered PDF templates.',
    acados: 'Standardized smart chapters and instant board-mapped resources.',
    role: 'Faculty'
  },
  {
    category: 'Assessment Creation',
    traditional: 'Hours of manual typesetting, copying math formulas, and aligning layouts.',
    acados: '10-minute automated test generation from 6 Lakh+ question blueprints.',
    role: 'Faculty'
  },
  {
    category: 'Evaluation Speed',
    traditional: 'Days of tedious manual checking and delayed scorecard reporting.',
    acados: 'Instant mobile camera OMR evaluation with 1-click WhatsApp scorecard dispatch.',
    role: 'Admin'
  },
  {
    category: 'CBT Mock Simulations',
    traditional: 'Third-party portals with clunky UIs and recurring per-test server bills.',
    acados: 'In-house NTA-grade computer based test engine with anti-cheat timers.',
    role: 'Exam Head'
  },
  {
    category: 'Student Study Habits',
    traditional: 'Unstructured and passive worksheet drills without performance analytics.',
    acados: 'Gamified interactive practice LMS, study streaks, and smart error binders.',
    role: 'Student'
  },
  {
    category: 'Academic Intelligence',
    traditional: 'Only raw test marks available; student conceptual weaknesses stay hidden.',
    acados: 'Concept-by-concept diagnostic graphs mapping exact remedial needs.',
    role: 'Director'
  },
  {
    category: 'Admissions & CRM',
    traditional: 'Missed inquiry desk phone calls and loose paper counseling registers.',
    acados: 'Centralized lead CRM with automated WhatsApp follow-up reminders.',
    role: 'Counselor'
  },
  {
    category: 'Fee Management',
    traditional: 'Physical receipt books, manual reconciliations, and overdue fee leakages.',
    acados: 'Automated installment ledgers, online payment links, and instant receipts.',
    role: 'Accounts'
  }
];

export default function BeforeAfterSlider() {
  // Triple the items for perfectly seamless infinite wrap-around dragging & scrolling
  const infiniteItems = [...COMPARISON_ITEMS, ...COMPARISON_ITEMS, ...COMPARISON_ITEMS];
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dragStartYRef = useRef(0);
  const dragStartScrollTopRef = useRef(0);

  // High-performance Auto-Scroll & Infinite Wrap Loop
  useEffect(() => {
    let animId: number;
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollSpeed = 0.65; // px per frame

    const step = () => {
      if (container && !isDragging && !isHovered) {
        container.scrollTop += scrollSpeed;
        
        // When scroll reaches 2/3 of total content, loop smoothly back to 1/3
        const singleSetHeight = container.scrollHeight / 3;
        if (container.scrollTop >= singleSetHeight * 2) {
          container.scrollTop -= singleSetHeight;
        } else if (container.scrollTop <= 0) {
          container.scrollTop += singleSetHeight;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isDragging, isHovered]);

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setIsDragging(true);
    dragStartYRef.current = e.pageY - container.offsetTop;
    dragStartScrollTopRef.current = container.scrollTop;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    e.preventDefault();
    const currentY = e.pageY - container.offsetTop;
    const walk = (currentY - dragStartYRef.current) * 1.3;
    container.scrollTop = dragStartScrollTopRef.current - walk;

    // Boundary wrap during drag
    const singleSetHeight = container.scrollHeight / 3;
    if (container.scrollTop >= singleSetHeight * 2) {
      container.scrollTop -= singleSetHeight;
      dragStartScrollTopRef.current -= singleSetHeight;
    } else if (container.scrollTop <= 0) {
      container.scrollTop += singleSetHeight;
      dragStartScrollTopRef.current += singleSetHeight;
    }
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Touch Handlers for Mobile Grab & Drag
  const handleTouchStart = (e: React.TouchEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setIsDragging(true);
    dragStartYRef.current = e.touches[0].pageY - container.offsetTop;
    dragStartScrollTopRef.current = container.scrollTop;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    const currentY = e.touches[0].pageY - container.offsetTop;
    const walk = (currentY - dragStartYRef.current) * 1.2;
    container.scrollTop = dragStartScrollTopRef.current - walk;

    const singleSetHeight = container.scrollHeight / 3;
    if (container.scrollTop >= singleSetHeight * 2) {
      container.scrollTop -= singleSetHeight;
      dragStartScrollTopRef.current -= singleSetHeight;
    } else if (container.scrollTop <= 0) {
      container.scrollTop += singleSetHeight;
      dragStartScrollTopRef.current += singleSetHeight;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-sm overflow-hidden" id="before-after-view">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
        <div>
          <span className="text-[#800000] font-mono text-[10px] uppercase font-bold tracking-widest bg-[#800000]/10 px-3 py-1 rounded-full border border-[#800000]/20 inline-block">
            AcadOS Operational Shift
          </span>
          <h4 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900 mt-2 leading-tight">
            Streamlining <span className="italic text-[#800000]">Administrative & Academic</span> Bottlenecks
          </h4>
        </div>
        
        {/* Grab & Scroll Badge Hint */}
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 shrink-0 self-start sm:self-auto select-none">
          <MoveVertical className="w-3.5 h-3.5 text-[#800000] animate-bounce" />
          <span>Grab & Drag to Scroll</span>
        </div>
      </div>

      {/* Grid Comparison Headers (Desktop) */}
      <div className="grid grid-cols-12 gap-4 text-center font-mono text-[11px] uppercase tracking-widest font-extrabold text-slate-500 mb-3 hidden md:grid select-none px-2">
        <div className="col-span-3 text-left pl-2">Institution Channel</div>
        <div className="col-span-4 bg-slate-100 py-1.5 rounded-lg border border-slate-200 text-slate-600 uppercase">
          Legacy System (Traditional)
        </div>
        <div className="col-span-5 bg-[#800000]/10 py-1.5 rounded-lg border border-[#800000]/20 text-[#800000] uppercase">
          Operating System (With AcadOS)
        </div>
      </div>

      {/* Auto-scrolling & Drag-to-Scroll Container */}
      <div 
        className="relative h-[480px] sm:h-[540px] overflow-hidden rounded-2xl select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseUpOrLeave();
        }}
      >
        {/* Top Gradient Fade Mask */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white via-white/80 to-transparent z-10 pointer-events-none" />
        
        {/* Bottom Gradient Fade Mask */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Grab & Scroll Track */}
        <div 
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`h-full overflow-y-auto no-scrollbar py-2 space-y-4 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {infiniteItems.map((item, idx) => (
            <div
              key={`${item.category}-${idx}`}
              className="border border-slate-200/80 p-4 sm:p-5 rounded-2xl bg-white shadow-2xs hover:shadow-md transition-shadow flex flex-col gap-3 md:grid md:grid-cols-12 md:gap-4 md:items-center"
            >
              {/* Category */}
              <div className="md:col-span-3 flex flex-col justify-center pl-1">
                <span className="text-slate-900 font-extrabold text-sm sm:text-base font-sans flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#800000] shrink-0" />
                  {item.category}
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mt-0.5 block">
                  Target: {item.role}
                </span>
              </div>

              {/* Legacy Card */}
              <div className="md:col-span-4 bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 flex gap-3 text-xs leading-relaxed text-slate-600 font-sans">
                <XCircle className="w-4 h-4 text-red-500 block shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[9px] font-mono font-bold text-red-500 uppercase tracking-wider block md:hidden">
                    Traditional Legacy
                  </span>
                  <p>{item.traditional}</p>
                </div>
              </div>

              {/* AcadOS Card */}
              <div className="md:col-span-5 bg-gradient-to-br from-[#800000]/5 to-white border border-[#800000]/25 rounded-xl p-3.5 flex gap-3 text-xs leading-relaxed text-slate-800 font-sans shadow-2xs relative overflow-hidden">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 block shrink-0 mt-0.5" />
                <div className="space-y-1 w-full">
                  <span className="text-[9px] font-mono font-bold text-[#800000] uppercase tracking-wider block md:hidden">
                    With AcadOS
                  </span>
                  <p className="font-semibold text-slate-900">{item.acados}</p>
                  
                  {/* Positive Badges */}
                  <div className="pt-1.5 flex items-center gap-1.5 flex-wrap">
                    <span className="bg-emerald-50 text-emerald-700 font-bold text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                      Automatic
                    </span>
                    <span className="bg-amber-50 text-amber-800 font-bold text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-amber-200">
                      White-Labeled
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action panel underneath */}
      <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center bg-slate-50 p-4 sm:p-5 rounded-2xl gap-4">
        <p className="text-xs text-slate-600 text-center sm:text-left max-w-md">
          Eliminate redundant multi-vendor overhead and scattered logins. AcadOS deploys a single premium platform under your own institution brand.
        </p>
        
        <button
          onClick={() => {
            const contactEl = document.getElementById('demo-booking-section');
            if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-[#800000] hover:bg-[#660000] text-white font-extrabold px-5 py-3 rounded-xl text-xs uppercase tracking-wider shrink-0 shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Begin Institutional Upgrade</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
