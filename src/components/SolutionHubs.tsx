import React, { useState } from 'react';
import { 
  Database, 
  BookOpen, 
  FileText, 
  Smartphone, 
  Award, 
  Trophy, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  Bookmark,
  TrendingUp,
  Cpu,
  BookmarkCheck,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import all sub-playgrounds
import { ErpCrmPlayground } from './ErpCrmPlayground';
import ContentLibraryTabs from './ContentLibraryTabs';
import TestMakerPlayground from './TestMakerPlayground';
import OMREvaluationMicroDemo from './OMREvaluationMicroDemo';
import LearnersHubMicroDemo from './LearnersHubMicroDemo';
import CBTPlayground from './CBTPlayground';

export function SchoolsSolutionHub() {
  const [activeTab, setActiveTab] = useState<'erp' | 'library' | 'testmaker' | 'omr' | 'hub'>('erp');
  const [isMobileDemoExpanded, setIsMobileDemoExpanded] = useState(false);
  
  // click-and-drag horizontal scroll state
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [dragged, setDragged] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 4) {
      setDragged(true);
    }
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const tabsConfig = [
    {
      id: 'erp' as const,
      label: '1. Administrative ERP & Ops',
      shortLabel: 'Admin ERP',
      icon: Database,
      problem: 'Administrative manual load, slow paperwork, and fee management errors.',
      solution: 'Consolidated system for student fee collection, lead funnel, and automatic parent alerts.',
      badge: 'Institution Management',
      component: <ErpCrmPlayground />
    },
    {
      id: 'library' as const,
      label: '2. Academic Syllabus IP & Study Notes',
      shortLabel: 'Syllabus Library',
      icon: BookOpen,
      problem: 'Difficulty standardizing daily handouts, past papers, and board curriculum worksheets.',
      solution: 'Direct access to CBSE, IB, and IGCSE pre-mapped learning content libraries.',
      badge: 'Curriculum & Worksheets',
      component: <ContentLibraryTabs />
    },
    {
      id: 'testmaker' as const,
      label: '3. Automated TestMaker Pro',
      shortLabel: 'Test Generation',
      icon: FileText,
      problem: 'Hours wasted formatting paper blueprints, math formulas, and question layouts.',
      solution: 'Instantly generate watermarked exams from a 5 Lakh+ question database in minutes.',
      badge: 'Print Assessment Suite',
      component: <TestMakerPlayground />
    },
    {
      id: 'omr' as const,
      label: '4. Smartphone OMR Scans',
      shortLabel: 'OMR Scanning',
      icon: Smartphone,
      problem: 'Days/weeks spent manually grading offline bubble answer sheets.',
      solution: 'Instant grading and leaderboard dispatch using camera scanning from basic smartphones.',
      badge: 'High-Precision OMR',
      component: <OMREvaluationMicroDemo />
    },
    {
      id: 'hub' as const,
      label: '5. Student Learners Hub App',
      shortLabel: 'Learners App',
      icon: Users,
      problem: 'Disjointed study notes and disconnected student progress tracking.',
      solution: 'White-labeled portal for daily homework sheets (DPPs) and performance portfolios.',
      badge: 'Digital Student Portal',
      component: <LearnersHubMicroDemo />
    }
  ];

  const currentTabInfo = tabsConfig.find(tab => tab.id === activeTab) || tabsConfig[0];
  const mobileIndex = tabsConfig.findIndex((t) => t.id === activeTab);
  const setMobileIndex = (index: number) => {
    const nextIndex = (index + tabsConfig.length) % tabsConfig.length;
    setActiveTab(tabsConfig[nextIndex].id);
  };

  return (
    <div className="space-y-8 select-none">
      {/* Overview relief note banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="space-y-2 max-w-3xl text-left">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-maroon-700 bg-maroon-50 border border-maroon-100">
            <ShieldCheck className="w-3.5 h-3.5 text-maroon-700 animate-pulse" />
            Complete K-12 Institution Solution
          </span>
          <h4 className="text-xl font-serif text-slate-900 leading-snug">
            Tired of managing multiple disconnected software vendors?
          </h4>
          <p className="text-xs text-slate-550 leading-relaxed font-sans">
            Unify administrative accounting, parental alerts, lesson design, and grading in one white-labeled dashboard.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center shrink-0 w-full md:w-auto">
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm min-w-[120px]">
            <span className="block text-xl font-extrabold text-maroon-700 font-mono">100%</span>
            <span className="block text-xs text-slate-550 font-sans uppercase font-bold tracking-tight">Admin Unified</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm min-w-[120px]">
            <span className="block text-xl font-extrabold text-maroon-700 font-mono">5 Lakh+</span>
            <span className="block text-xs text-slate-550 font-sans uppercase font-bold tracking-tight">Questions Bank</span>
          </div>
        </div>
      </div>

      {/* Desktop View: Tabs & Content split */}
      <div className="hidden md:block bg-white rounded-3xl border border-slate-205 shadow-xl overflow-hidden">
        {/* Navigation bar: responsive tabs with drag cursor support */}
        <div className="relative bg-slate-900 border-b border-slate-800">
          <div 
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`p-2.5 sm:p-3 overflow-x-auto solutions-scrollbar flex gap-1.5 scroll-smooth select-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {tabsConfig.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={(e) => {
                    if (dragged) {
                      e.preventDefault();
                      return;
                    }
                    setActiveTab(tab.id);
                  }}
                  className={`py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shrink-0 font-sans text-xs uppercase font-extrabold tracking-wide transition-all select-none ${
                    isSelected 
                      ? 'bg-gradient-to-r from-maroon-700 to-maroon-800 text-white shadow' 
                      : 'text-slate-450 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-gold-300' : 'text-slate-500'}`} />
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden">{tab.shortLabel}</span>
                </button>
              );
            })}
          </div>
          <div className="bg-slate-950 px-4 py-1.5 flex justify-between items-center text-[8px] sm:text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest border-t border-slate-800/50">
            <span className="flex items-center gap-1 text-gold-400">💡 Pro-Tip: Hold, click & drag to scroll modules</span>
            <span className="animate-pulse text-slate-400">← Grab & Drag horizontally →</span>
          </div>
        </div>

        {/* Diagnostic header mapping problem and solution clearly */}
        <div className="bg-slate-50 border-b border-slate-150 p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-left">
          <div className="md:col-span-3">
            <div className="inline-flex items-center gap-1.5 bg-maroon-50 text-maroon-850 font-mono text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border border-maroon-105">
              <Sparkles className="w-3 h-3 text-maroon-700" />
              <span>{currentTabInfo.badge}</span>
            </div>
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight font-sans mt-2">
              Problems Resolved
            </h4>
          </div>

          <div className="md:col-span-4 border-l border-slate-200 md:pl-5 space-y-1">
            <span className="text-[10px] uppercase font-mono font-black text-rose-600 tracking-wider">
              ✖ Academic Frustration
            </span>
            <p className="text-slate-600 text-xs leading-relaxed font-sans">
              {currentTabInfo.problem}
            </p>
          </div>

          <div className="md:col-span-5 border-l border-slate-200 md:pl-5 space-y-1">
            <span className="text-[10px] uppercase font-mono font-black text-emerald-600 tracking-wider">
              ✔ AcadOS Relief
            </span>
            <p className="text-slate-800 text-xs leading-relaxed font-sans font-medium">
              {currentTabInfo.solution}
            </p>
          </div>
        </div>

        {/* Live Simulator Viewport */}
        <div className="p-4 sm:p-6 md:p-8 bg-slate-102 min-h-[400px]">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-6">
            <div className="border-b border-slate-100 pb-3 mb-6 flex justify-between items-center text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">
              <span>ACTIVE SANDBOX SIMULATION SYSTEM</span>
              <span className="text-emerald-500 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" /> Live Active
              </span>
            </div>
            
            {/* Component mount */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                {currentTabInfo.component}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile View: Swipeable Flashcard Interactive Deck */}
      <div className="block md:hidden space-y-6">
        {/* Swipe instruction strip */}
        <div className="bg-gradient-to-r from-maroon-700 to-maroon-950 rounded-2xl p-4 text-white text-center shadow-md select-none space-y-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider text-gold-300 bg-slate-950 border border-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-gold-300 animate-pulse" />
            Adaptive K-12 Mobile Deck
          </span>
          <p className="text-[10px] text-slate-300 uppercase tracking-widest font-black flex items-center justify-center gap-1.5 leading-none animate-pulse">
            ← swipe left / right or tap dots →
          </p>
        </div>

        <div className="relative overflow-visible">
          {/* Swipeable Card container */}
          <motion.div
            key={activeTab}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(e, info) => {
              const swipeThreshold = 50;
              if (info.offset.x < -swipeThreshold) {
                setMobileIndex(mobileIndex + 1);
              } else if (info.offset.x > swipeThreshold) {
                setMobileIndex(mobileIndex - 1);
              }
            }}
            className="bg-white border border-slate-205 rounded-3xl shadow-xl p-5 select-none space-y-6 cursor-grab active:cursor-grabbing relative overflow-hidden text-left"
          >
            {/* Top micro status bar */}
            <div className="flex justify-between items-center border-b border-rose-50 pb-3">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-mono font-extrabold text-maroon-800 tracking-widest uppercase bg-maroon-50 px-2.5 py-0.5 rounded-full border border-maroon-100">
                {currentTabInfo.badge}
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-bold">
                {mobileIndex + 1} OF {tabsConfig.length}
              </span>
            </div>

            {/* Progress timeline bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((mobileIndex + 1) / tabsConfig.length) * 100}%` }}
                className="bg-gradient-to-r from-maroon-700 to-gold-400 h-full rounded-full"
              />
            </div>

            {/* Main Section Title */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <currentTabInfo.icon className="w-5 h-5 text-maroon-700" />
                </div>
                <h4 className="text-sm font-sans font-black uppercase text-slate-905 tracking-tight leading-snug">
                  {currentTabInfo.label}
                </h4>
              </div>
            </div>

            {/* Tab Problem & Relief panels grouped as a real Flashcard */}
            <div className="space-y-4">
              {/* PROBLEM card */}
              <div className="bg-rose-50/50 border border-rose-100/70 p-3.5 rounded-2xl space-y-1">
                <div className="flex items-center gap-1 text-[9px] font-mono font-black text-rose-600 tracking-wider">
                  <span>✖</span>
                  <span>ACADEMIC COMPLAINT</span>
                </div>
                <p className="text-slate-650 text-xs leading-relaxed font-sans font-medium">
                  {currentTabInfo.problem}
                </p>
              </div>

              {/* SOLUTION card */}
              <div className="bg-emerald-50/50 border border-emerald-100/70 p-3.5 rounded-2xl space-y-1">
                <div className="flex items-center gap-1 text-[9px] font-mono font-black text-emerald-600 tracking-wider">
                  <span>✔</span>
                  <span>ACADOS ABSOLUTE RELIEF</span>
                </div>
                <p className="text-slate-800 text-xs leading-relaxed font-sans font-bold">
                  {currentTabInfo.solution}
                </p>
              </div>
            </div>

            {/* Explore button */}
            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsMobileDemoExpanded(true)}
                className="w-full px-4 py-3 bg-maroon-700 hover:bg-maroon-800 text-white rounded-xl flex items-center justify-between text-xs font-bold transition-all cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
                  Explore Interactive Simulator
                </span>
                <ChevronRight className="w-4 h-4 text-white/70" />
              </button>

              {/* FULL-SCREEN MODAL on mobile */}
              <AnimatePresence>
                {isMobileDemoExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: '100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: '100%' }}
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    className="fixed inset-0 z-[999] bg-white flex flex-col"
                    style={{ touchAction: 'none' }}
                  >
                    {/* Modal header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 shrink-0">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-slate-800">Interactive Simulator</span>
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wide">· Live</span>
                      </div>
                      <button
                        onClick={() => setIsMobileDemoExpanded(false)}
                        className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {/* Simulator content — scrollable */}
                    <div className="flex-1 overflow-auto">
                      {currentTabInfo.component}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Elegant Dot Indicators & manual navigation keys */}
          <div className="flex items-center justify-between px-2 pt-4 select-none">
            <button 
              onClick={() => setMobileIndex(mobileIndex - 1)}
              className="px-3 py-1.5 bg-white border border-slate-202 hover:bg-slate-50 rounded-lg text-slate-700 shadow-sm text-[11px] font-extrabold cursor-pointer"
            >
              ← Prev
            </button>

            <div className="flex gap-1.5">
              {tabsConfig.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setMobileIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === mobileIndex 
                      ? 'w-6 bg-maroon-700' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={() => setMobileIndex(mobileIndex + 1)}
              className="px-3 py-1.5 bg-white border border-slate-202 hover:bg-slate-50 rounded-lg text-slate-700 shadow-sm text-[11px] font-extrabold cursor-pointer"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CoachingSolutionHub() {
  const [activeTab, setActiveTab] = useState<'cbt' | 'crm' | 'testmaker' | 'omr' | 'hub'>('cbt');
  const [isMobileDemoExpanded, setIsMobileDemoExpanded] = useState(false);

  // click-and-drag horizontal scroll state
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [dragged, setDragged] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 4) {
      setDragged(true);
    }
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const tabsConfig = [
    {
      id: 'cbt' as const,
      label: '1. National Standard CBT Simulator',
      shortLabel: 'CBT Simulator',
      icon: Trophy,
      problem: 'Students freeze during offline JEE/NEET entrance exams due to unfamiliarity with test timers.',
      solution: 'Deploy mock PC exams styled like standard national portals (NTA) under your brand.',
      badge: 'Interactive CBT Suite',
      component: <CBTPlayground />
    },
    {
      id: 'crm' as const,
      label: '2. Admissions CRM & Leads Funnel',
      shortLabel: 'Counselor CRM',
      icon: TrendingUp,
      problem: 'Valuable student leads and counselor callbacks are lost in messy lists or sheets.',
      solution: 'Unified admissions pipeline with direct WhatsApp follow-up reminders and routing maps.',
      badge: 'Institution Operations',
      component: <ErpCrmPlayground />
    },
    {
      id: 'testmaker' as const,
      label: '3. TestMaker MCQ Generator',
      shortLabel: 'Test Maker',
      icon: Zap,
      problem: 'Coaching teams spend hours typesetting complex equations and drafting chapter assessments.',
      solution: 'Instant paper blueprints generated from a database of 5 Lakh+ questions by difficulty levels.',
      badge: 'Paper Blueprint Engine',
      component: <TestMakerPlayground />
    },
    {
      id: 'omr' as const,
      label: '4. Immediate Classroom OMR scanning',
      shortLabel: 'Instant OMR',
      icon: Award,
      problem: 'Compilation of mock rankings and analytical scorecards takes several days.',
      solution: 'Smartphone-based camera OMR grading provides classroom reports instantly.',
      badge: 'High-Speed Grading',
      component: <OMREvaluationMicroDemo />
    },
    {
      id: 'hub' as const,
      label: '5. Student Study App & Doubt Store',
      shortLabel: 'Student App',
      icon: BookmarkCheck,
      problem: 'Unorganized distribution of daily practice sheets (DPPs) over chat channels.',
      solution: 'Sleek custom student dashboard for instant homework tracking and digital references.',
      badge: 'Self-Study Module',
      component: <LearnersHubMicroDemo />
    }
  ];

  const currentTabInfo = tabsConfig.find(tab => tab.id === activeTab) || tabsConfig[0];
  const mobileIndex = tabsConfig.findIndex((t) => t.id === activeTab);
  const setMobileIndex = (index: number) => {
    const nextIndex = (index + tabsConfig.length) % tabsConfig.length;
    setActiveTab(tabsConfig[nextIndex].id);
  };

  return (
    <div className="space-y-8 select-none">
      {/* Overview relief note banner */}
      <div className="bg-slate-900 text-slate-100 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="space-y-2 max-w-3xl text-left">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-gold-400 bg-slate-950 border border-slate-800">
            <Cpu className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
            Competitive Coaching Enterprise Deck
          </span>
          <h4 className="text-lg font-serif text-white leading-snug">
            Are you worried about getting just a CBT simulator?
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Get a complete system combining counselor funnels, TestMaker exam blueprints, and immediate classroom OMR diagnostics.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center shrink-0 w-full md:w-auto">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="block text-[18px] font-extrabold text-gold-400 font-mono">100%</span>
            <span className="block text-[9px] text-slate-500 font-sans uppercase font-bold tracking-tight">Full Lifecycle</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="block text-[18px] font-extrabold text-gold-400 font-mono">JEE/NEET</span>
            <span className="block text-[9px] text-slate-500 font-sans uppercase font-bold tracking-tight">Optimised</span>
          </div>
        </div>
      </div>

      {/* Desktop View: Tabs & Content split */}
      <div className="hidden md:block bg-white rounded-3xl border border-slate-205 shadow-xl overflow-hidden">
        {/* Navigation bar: responsive tabs with drag cursor support */}
        <div className="relative bg-slate-950 border-b border-slate-850">
          <div 
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`p-2.5 sm:p-3 overflow-x-auto solutions-scrollbar flex gap-1.5 scroll-smooth select-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {tabsConfig.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={(e) => {
                    if (dragged) {
                      e.preventDefault();
                      return;
                    }
                    setActiveTab(tab.id);
                  }}
                  className={`py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shrink-0 font-sans text-xs uppercase font-extrabold tracking-wide transition-all select-none ${
                    isSelected 
                      ? 'bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 text-white shadow' 
                      : 'text-slate-500 hover:bg-slate-900 hover:text-slate-300'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-gold-400' : 'text-slate-650'}`} />
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden">{tab.shortLabel}</span>
                </button>
              );
            })}
          </div>
          <div className="bg-slate-950 px-4 py-1.5 flex justify-between items-center text-[8px] sm:text-[9px] font-mono font-bold text-slate-550 uppercase tracking-widest border-t border-slate-900">
            <span className="flex items-center gap-1 text-gold-400">💡 Pro-Tip: Hold, click & drag to scroll modules</span>
            <span className="animate-pulse text-slate-500">← Grab & Drag horizontally →</span>
          </div>
        </div>

        {/* Diagnostic header mapping problem and solution clearly */}
        <div className="bg-slate-50 border-b border-slate-150 p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-left">
          <div className="md:col-span-3">
            <div className="inline-flex items-center gap-1.5 bg-slate-900 text-white font-mono text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border border-slate-800">
              <Sparkles className="w-3 h-3 text-gold-400" />
              <span>{currentTabInfo.badge}</span>
            </div>
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight font-sans mt-2">
              Coaching Challenges
            </h4>
          </div>

          <div className="md:col-span-4 border-l border-slate-200 md:pl-5 space-y-1">
            <span className="text-[10px] uppercase font-mono font-black text-rose-600 tracking-wider">
              ✖ Practice Bottlenecks
            </span>
            <p className="text-slate-650 text-xs leading-relaxed font-sans font-normal">
              {currentTabInfo.problem}
            </p>
          </div>

          <div className="md:col-span-5 border-l border-slate-200 md:pl-5 space-y-1">
            <span className="text-[10px] uppercase font-mono font-black text-emerald-600 tracking-wider">
              ✔ AcadOS Relief
            </span>
            <p className="text-slate-850 text-xs leading-relaxed font-sans font-medium">
              {currentTabInfo.solution}
            </p>
          </div>
        </div>

        {/* Live Simulator Viewport */}
        <div className="p-4 sm:p-6 md:p-8 bg-slate-102 min-h-[400px]">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-6">
            <div className="border-b border-slate-100 pb-3 mb-6 flex justify-between items-center text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">
              <span>ACTIVE COHORT SANDBOX SIMULATOR</span>
              <span className="text-emerald-500 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" /> Connection Active
              </span>
            </div>
            
            {/* Component mount */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                {currentTabInfo.component}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile View: Swipeable Flashcard Interactive Deck */}
      <div className="block md:hidden space-y-6">
        {/* Swipe instruction strip */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-950 rounded-2xl p-4 text-white text-center shadow-md select-none space-y-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider text-gold-450 bg-black border border-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
            Adaptive Coaching Mobile Deck
          </span>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black flex items-center justify-center gap-1.5 leading-none animate-pulse">
            ← swipe left / right or tap dots →
          </p>
        </div>

        <div className="relative overflow-visible">
          {/* Swipeable Card container */}
          <motion.div
            key={activeTab}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(e, info) => {
              const swipeThreshold = 50;
              if (info.offset.x < -swipeThreshold) {
                setMobileIndex(mobileIndex + 1);
              } else if (info.offset.x > swipeThreshold) {
                setMobileIndex(mobileIndex - 1);
              }
            }}
            className="bg-white border border-slate-205 rounded-3xl shadow-xl p-5 select-none space-y-6 cursor-grab active:cursor-grabbing relative overflow-hidden text-left"
          >
            {/* Top micro status bar */}
            <div className="flex justify-between items-center border-b border-rose-50 pb-3">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-mono font-extrabold text-gold-600 tracking-widest uppercase bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100">
                {currentTabInfo.badge}
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-bold">
                {mobileIndex + 1} OF {tabsConfig.length}
              </span>
            </div>

            {/* Progress timeline bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((mobileIndex + 1) / tabsConfig.length) * 100}%` }}
                className="bg-gradient-to-r from-slate-900 to-amber-500 h-full rounded-full"
              />
            </div>

            {/* Main Section Title */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                  <currentTabInfo.icon className="w-5 h-5 text-slate-800" />
                </div>
                <h4 className="text-sm font-sans font-black uppercase text-slate-905 tracking-tight leading-snug">
                  {currentTabInfo.label}
                </h4>
              </div>
            </div>

            {/* Tab Problem & Relief panels grouped as a real Flashcard */}
            <div className="space-y-4">
              {/* PROBLEM card */}
              <div className="bg-rose-50/50 border border-rose-100/70 p-3.5 rounded-2xl space-y-1">
                <div className="flex items-center gap-1 text-[9px] font-mono font-black text-rose-600 tracking-wider">
                  <span>✖</span>
                  <span>MOCK EXAM BOTTLENECK</span>
                </div>
                <p className="text-slate-650 text-xs leading-relaxed font-sans font-medium">
                  {currentTabInfo.problem}
                </p>
              </div>

              {/* SOLUTION card */}
              <div className="bg-emerald-50/50 border border-emerald-100/70 p-3.5 rounded-2xl space-y-1">
                <div className="flex items-center gap-1 text-[9px] font-mono font-black text-emerald-600 tracking-wider">
                  <span>✔</span>
                  <span>ACADOS INTEGRATED RELIEF</span>
                </div>
                <p className="text-slate-800 text-xs leading-relaxed font-sans font-bold">
                  {currentTabInfo.solution}
                </p>
              </div>
            </div>

            {/* Explore button */}
            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsMobileDemoExpanded(true)}
                className="w-full px-4 py-3 bg-maroon-700 hover:bg-maroon-800 text-white rounded-xl flex items-center justify-between text-xs font-bold transition-all cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
                  Explore Interactive Simulator
                </span>
                <ChevronRight className="w-4 h-4 text-white/70" />
              </button>

              {/* FULL-SCREEN MODAL */}
              <AnimatePresence>
                {isMobileDemoExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: '100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: '100%' }}
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    className="fixed inset-0 z-[999] bg-white flex flex-col"
                    style={{ touchAction: 'none' }}
                  >
                    {/* Modal header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 shrink-0">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-slate-800">Interactive Simulator</span>
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wide">· Live</span>
                      </div>
                      <button
                        onClick={() => setIsMobileDemoExpanded(false)}
                        className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {/* Simulator content */}
                    <div className="flex-1 overflow-auto">
                      {currentTabInfo.component}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Elegant Dot Indicators & manual navigation keys */}
          <div className="flex items-center justify-between px-2 pt-4 select-none">
            <button 
              onClick={() => setMobileIndex(mobileIndex - 1)}
              className="px-3 py-1.5 bg-white border border-slate-202 hover:bg-slate-50 rounded-lg text-slate-700 shadow-sm text-[11px] font-extrabold cursor-pointer"
            >
              ← Prev
            </button>

            <div className="flex gap-1.5">
              {tabsConfig.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setMobileIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === mobileIndex 
                      ? 'w-6 bg-slate-900' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={() => setMobileIndex(mobileIndex + 1)}
              className="px-3 py-1.5 bg-white border border-slate-202 hover:bg-slate-50 rounded-lg text-slate-700 shadow-sm text-[11px] font-extrabold cursor-pointer"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
