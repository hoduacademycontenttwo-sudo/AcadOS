import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Sparkles, Trophy, Database, Phone, Mail, MapPin, 
  ArrowRight, ShieldCheck, CheckCircle2, ChevronDown, Menu, X, 
  Zap, Compass, UserCheck, ShieldAlert, Cpu, Layers, HelpCircle, 
  Sliders, Calendar, Star, Network, Globe, Smartphone, BarChart3, 
  ChevronRight, ArrowUpRight, GraduationCap, School, BookOpenCheck 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId, DemoBooking } from './types';

// Components
import TestMakerPlayground from './components/TestMakerPlayground';
import CBTPlayground from './components/CBTPlayground';
import DemoModal from './components/DemoModal';
import EcosystemChart from './components/EcosystemChart';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import ContentLibraryTabs from './components/ContentLibraryTabs';
import OMREvaluationMicroDemo from './components/OMREvaluationMicroDemo';
import LearnersHubMicroDemo from './components/LearnersHubMicroDemo';
import SuccessStories from './components/SuccessStories';
import { ErpCrmPlayground } from './components/ErpCrmPlayground';
import ModuleCtaBanner from './components/ModuleCtaBanner';
import { SchoolsSolutionHub, CoachingSolutionHub } from './components/SolutionHubs';
import HTLogo from './components/HTLogo';
import WhyAcadOS from './components/WhyAcadOS';
import vpSinghPic from './assets/vp-singh.jpg';
import htLogo from './assets/HT.jpg';
import Loader from './components/Loader';
import ModulePreviewPage from './components/ModulePreviewPage';
import AcadBot from './components/AcadBot';

export default function App() {
  const [page, setPage] = useState<PageId>('home');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState<boolean>(false);
  const [mobileModulesOpen, setMobileModulesOpen] = useState<boolean>(false);
  const [recentLead, setRecentLead] = useState<DemoBooking | null>(null);
  const [refreshLeadsCounter, setRefreshLeadsCounter] = useState<number>(0);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [fullScreenModule, setFullScreenModule] = useState<null | 'learners-hub' | 'testmaker' | 'practice-cbt' | 'omr-evaluation' | 'erp-crm'>(null);
  const [previewModule, setPreviewModule] = useState<null | 'learners-hub' | 'testmaker' | 'practice-cbt' | 'omr-evaluation' | 'erp-crm'>(null);

  // Show loader only on initial page load / refresh
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  // Active solution tab inside solutions section
  const [activeAudienceSegment, setActiveAudienceSegment] = useState<'schools' | 'coaching'>('schools');

  // Monitor scroll for sticky header elevation shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic SEO Page Title and Description Updates to optimize search relevance
  useEffect(() => {
    let title = 'AcadOS — Ultimate Academic Operating System | Powered by Hodu Academy';
    let description = 'AcadOS is a comprehensive academic operating system providing digital library resources, question banks, online CBT testing, OMR scanning, and educational ERP tools for schools and coaching institutes.';

    switch (page) {
      case 'home':
        title = 'AcadOS — The Academic Operating System by Hodu Academy';
        description = 'Empower schools & coaching institutes with premium educational technology. High-quality TestMaker, digital learning tools, ERP & mock CBT exam systems.';
        break;
      case 'schools':
        title = 'School Academic Solutions — AcadOS by Hodu Academy';
        description = 'Standardise, benchmark, and scale academic excellence across K-12 school systems. Unified syllabus trackers, digital content, and structured question papers.';
        break;
      case 'coaching':
        title = 'Coaching Institutes Test Prep Solutions — AcadOS';
        description = 'Accelerate JEE, NEET, and Olympiad exam preparations. Deploy test paper generator systems, comprehensive analytics, and digital learner hubs.';
        break;
      case 'testmaker':
        title = 'TestMaker Automated Exam Paper Generator — AcadOS';
        description = 'Create balanced assessments in under 2 minutes. Tap into a curated question bank with multi-lingual questions, detailed cognitive maps, and solutions.';
        break;
      case 'learners-hub':
        title = 'Learners Hub Digital Library & LMS — AcadOS';
        description = 'Interactive online study materials, class guides, structured notes, video solutions, and standard textbook mapping on a modern LMS dashboard.';
        break;
      case 'practice-cbt':
        title = 'Practice CBT Online Mock Test Platform — AcadOS';
        description = 'Simulate real JEE, NEET, and board exams with high-fidelity computer-based testing, full detailed analytical reports, and real-time score analytics.';
        break;
      case 'omr-evaluation':
        title = 'SMART OMR Evaluation & Instant Processing — AcadOS';
        description = 'Grade physical OMR sheets in seconds with any smartphone camera. Reduce errors, automate results distribution, and provide detailed section analytics.';
        break;
      case 'erp-crm':
        title = 'Integrated Educational ERP & Student CRM — AcadOS';
        description = 'Streamline coaching center and school operations, student admissions, fee tracking, enquiry follow-ups, and academic schedules in one ERP suite.';
        break;
      case 'content-library':
        title = 'Curated Curriculum & Content Library — AcadOS';
        description = 'Explore high-quality, pre-loaded educational content and textbooks designed to align with core pedagogical standards and curricula.';
        break;
      case 'about':
        title = 'About Hodu Academy & AcadOS Vision';
        description = 'Learn about our mission to revolutionize global academic administrative processes with scalable, state-of-the-art educational operating systems.';
        break;
      case 'contact':
        title = 'Contact Hodu Academy — Book your AcadOS Demo';
        description = 'Get in touch with educational technology experts. Request a personalized live platform demo for your K-12 schools or coaching institutes.';
        break;
      default:
        break;
    }

    document.title = title;

    // Update Meta Description dynamically
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
  }, [page]);

  // Hash-based router
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#/solutions/schools') setPage('schools');
      else if (hash === '#/solutions/coaching-institutes') setPage('coaching');
      else if (hash === '#/modules/testmaker') setPage('testmaker');
      else if (hash === '#/modules/learners-hub') setPage('learners-hub');
      else if (hash === '#/modules/practice-cbt') setPage('practice-cbt');
      else if (hash === '#/modules/erp-crm') setPage('erp-crm');
      else if (hash === '#/modules/omr-evaluation') setPage('omr-evaluation');
      else if (hash === '#/content-library') setPage('content-library');
      else if (hash === '#/about') setPage('about');
      else if (hash === '#/contact') setPage('contact');
      else if (hash === '#/why-acados') setPage('why-acados');
      else setPage('home');
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Router dispatcher
  const navigateTo = (pageId: PageId) => {
    if (pageId === 'home') window.location.hash = '#/';
    else if (pageId === 'schools') window.location.hash = '#/solutions/schools';
    else if (pageId === 'coaching') window.location.hash = '#/solutions/coaching-institutes';
    else if (pageId === 'testmaker') window.location.hash = '#/modules/testmaker';
    else if (pageId === 'learners-hub') window.location.hash = '#/modules/learners-hub';
    else if (pageId === 'practice-cbt') window.location.hash = '#/modules/practice-cbt';
    else if (pageId === 'erp-crm') window.location.hash = '#/modules/erp-crm';
    else if (pageId === 'content-library') window.location.hash = '#/content-library';
    else if (pageId === 'about') window.location.hash = '#/about';
    else if (pageId === 'contact') window.location.hash = '#/contact';
    else if (pageId === 'omr-evaluation') window.location.hash = '#/modules/omr-evaluation';
    else if (pageId === 'why-acados') window.location.hash = '#/why-acados';
  };

  const handleLeadSaved = (lead: DemoBooking) => {
    setRecentLead(lead);
    setRefreshLeadsCounter(prev => prev + 1);
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none antialiased">

      {/* 1. STICKY BRAND HEADER */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-maroon-100 py-3' 
            : 'bg-white py-4'
        }`}
        id="navbar-sticky-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
            <img src={htLogo} alt="HT Logo" className="w-10 h-10 rounded-full object-cover shrink-0" />
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-maroon-700 font-sans uppercase">
                AcadOS
              </span>
              <span className="bg-gold-500/10 text-gold-600 font-bold font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-gold-400/20">
                v2.0
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-800">
            {/* Solutions Dropdown Menu */}
            <div className="relative group p-2">
              <button className={`flex items-center gap-1 hover:text-maroon-700 transition-colors cursor-pointer uppercase ${
                (page === 'schools' || page === 'coaching') ? 'text-maroon-700 font-extrabold' : 'text-slate-700'
              }`}>
                <span>Solutions</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full left-0 bg-white border border-slate-100 rounded-xl shadow-xl p-4 w-64 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200">
                <div className="space-y-4 text-xs font-bold uppercase">
                  <button 
                    onClick={() => navigateTo('schools')}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-maroon-50 text-slate-700 hover:text-maroon-850 flex items-center gap-2"
                  >
                    <School className="w-4 h-4 text-maroon-600" />
                    <div>
                      <p className="leading-none text-[11px]">Solutions for Schools</p>
                      <span className="text-[9px] text-slate-450 normal-case block mt-1 font-medium">Standardise K-12 Academics</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => navigateTo('coaching')}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-maroon-50 text-slate-700 hover:text-maroon-850 flex items-center gap-2"
                  >
                    <GraduationCap className="w-4 h-4 text-maroon-600" />
                    <div>
                      <p className="leading-none text-[11px]">Coaching Institutes</p>
                      <span className="text-[9px] text-slate-450 normal-case block mt-1 font-medium">JEE, NEET & Olympiads Prep</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Modules Dropdown */}
            <div className="relative group p-2">
              <button className={`flex items-center gap-1 hover:text-maroon-700 transition-colors cursor-pointer uppercase ${
                (page === 'testmaker' || page === 'learners-hub' || page === 'practice-cbt' || page === 'erp-crm' || page === 'omr-evaluation') ? 'text-maroon-700 font-extrabold' : 'text-slate-700'
              }`}>
                <span>Modules</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white border border-slate-100 rounded-xl shadow-xl p-4 w-72 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 grid grid-cols-1 gap-1.5 text-[11px]">
                <button onClick={() => setPreviewModule('learners-hub')} className="text-left p-2 rounded-lg hover:bg-slate-50 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-maroon-600" />
                  <span className="text-slate-800">Learners Hub Digital Library</span>
                </button>
                <button onClick={() => setPreviewModule('testmaker')} className="text-left p-2 rounded-lg hover:bg-slate-50 flex items-center gap-2">
                  <BookOpenCheck className="w-4 h-4 text-maroon-600" />
                  <span className="text-slate-800">TestMaker Paper Generator</span>
                </button>
                <button onClick={() => setPreviewModule('practice-cbt')} className="text-left p-2 rounded-lg hover:bg-slate-50 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-maroon-600" />
                  <span className="text-slate-800">CBT Mock Exam Platform</span>
                </button>
                <button onClick={() => setPreviewModule('omr-evaluation')} className="text-left p-2 rounded-lg hover:bg-slate-50 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-maroon-600" />
                  <span className="text-slate-800">OMR Smartphone Evaluation</span>
                </button>
                <button onClick={() => setPreviewModule('erp-crm')} className="text-left p-2 rounded-lg hover:bg-slate-50 flex items-center gap-2">
                  <Database className="w-4 h-4 text-maroon-600" />
                  <span className="text-slate-800">Institute ERP + CRM Suite</span>
                </button>
              </div>
            </div>

            <button onClick={() => navigateTo('content-library')} className={`p-2 hover:text-maroon-700 transition-colors uppercase ${page === 'content-library' ? 'text-maroon-700 font-extrabold' : 'text-slate-700'}`}>
              Content Library
            </button>

            <button
              onClick={() => navigateTo('why-acados')}
              className={`p-2 hover:text-maroon-700 transition-colors uppercase ${page === 'why-acados' ? 'text-maroon-700 font-extrabold' : 'text-slate-705'}`}
            >
              Why AcadOS
            </button>

            <button onClick={() => navigateTo('about')} className={`p-2 hover:text-maroon-700 transition-colors uppercase ${page === 'about' ? 'text-maroon-700 font-extrabold' : 'text-slate-700'}`}>
              About Leaders
            </button>

            <button onClick={() => navigateTo('contact')} className={`p-2 hover:text-maroon-700 transition-colors uppercase ${page === 'contact' ? 'text-maroon-700 font-extrabold' : 'text-slate-700'}`}>
              Contact
            </button>
          </nav>

          {/* Schedule Demo CTA triggers */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="bg-gradient-to-r from-maroon-600 to-maroon-800 hover:from-maroon-700 hover:to-maroon-900 text-white text-xs font-extrabold uppercase tracking-wider py-2.5 px-5 rounded-xl border border-maroon-700 shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
            >
              Schedule Demo Slot
            </button>
          </div>

          {/* Mobile responsive toggles */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="lg:hidden p-2 text-slate-600 hover:text-maroon-700 transition-colors"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {/* Mobile Navigation Dropdown list */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-slate-100 text-xs font-bold uppercase tracking-wide text-slate-705"
            >
              <div className="p-4 space-y-3.5 flex flex-col max-h-[80vh] overflow-y-auto">
                <button 
                  onClick={() => { navigateTo('home'); setMenuOpen(false); }} 
                  className={`text-left py-2.5 border-b border-slate-50 hover:text-maroon-750 uppercase flex items-center justify-between font-extrabold ${
                    page === 'home' ? 'text-maroon-700' : 'text-slate-800'
                  }`}
                >
                  <span>Home</span>
                </button>

                {/* SOLUTIONS DROP-DOWN */}
                <div className="border-b border-slate-50 py-1">
                  <button 
                    onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                    className={`w-full text-left py-2 hover:text-maroon-750 uppercase flex items-center justify-between font-extrabold ${
                      (page === 'schools' || page === 'coaching') ? 'text-maroon-700 font-extrabold' : 'text-slate-800'
                    }`}
                  >
                    <span>Solutions</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 text-slate-500 ${mobileSolutionsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileSolutionsOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden bg-slate-50/70 rounded-xl px-2.5 py-1.5 my-1.5 flex flex-col space-y-1.5 border border-slate-100/60"
                      >
                        <button 
                          onClick={() => { navigateTo('schools'); setMenuOpen(false); }} 
                          className="text-left py-2 hover:bg-white text-slate-700 hover:text-maroon-800 rounded-lg px-2 flex items-center gap-2.5 transition-all text-xs"
                        >
                          <School className="w-4 h-4 text-maroon-600 shrink-0" />
                          <div>
                            <p className="font-extrabold leading-none text-[11px]">Solutions for Schools</p>
                            <span className="text-[9px] text-slate-500 normal-case block mt-0.5 font-medium">Standardise K-12 Academics</span>
                          </div>
                        </button>
                        <button 
                          onClick={() => { navigateTo('coaching'); setMenuOpen(false); }} 
                          className="text-left py-2 hover:bg-white text-slate-700 hover:text-maroon-800 rounded-lg px-2 flex items-center gap-2.5 transition-all text-xs"
                        >
                          <GraduationCap className="w-4 h-4 text-maroon-600 shrink-0" />
                          <div>
                            <p className="font-extrabold leading-none text-[11px]">Coaching Institutes</p>
                            <span className="text-[9px] text-slate-500 normal-case block mt-0.5 font-medium">JEE, NEET & Olympiads Prep</span>
                          </div>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* MODULES DROP-DOWN */}
                <div className="border-b border-slate-50 py-1">
                  <button 
                    onClick={() => setMobileModulesOpen(!mobileModulesOpen)}
                    className={`w-full text-left py-2 hover:text-maroon-750 uppercase flex items-center justify-between font-extrabold ${
                      (page === 'testmaker' || page === 'learners-hub' || page === 'practice-cbt' || page === 'erp-crm' || page === 'omr-evaluation') ? 'text-maroon-700' : 'text-slate-800'
                    }`}
                  >
                    <span>Modules</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 text-slate-500 ${mobileModulesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileModulesOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden bg-slate-50/70 rounded-xl px-2.5 py-1.5 my-1.5 flex flex-col space-y-1 text-xs"
                      >
                        <button 
                          onClick={() => { setPreviewModule('learners-hub'); setMenuOpen(false); }}
                          className="text-left p-2.5 hover:bg-white rounded-lg flex items-center gap-2.5 transition-all text-xs text-slate-700"
                        >
                          <Compass className="w-4 h-4 text-maroon-600 shrink-0" />
                          <span>Learners Hub Digital Library</span>
                        </button>
                        <button
                          onClick={() => { setPreviewModule('testmaker'); setMenuOpen(false); }}
                          className="text-left p-2.5 hover:bg-white rounded-lg flex items-center gap-2.5 transition-all text-xs text-slate-700"
                        >
                          <BookOpenCheck className="w-4 h-4 text-maroon-600 shrink-0" />
                          <span>TestMaker Paper Generator</span>
                        </button>
                        <button
                          onClick={() => { setPreviewModule('practice-cbt'); setMenuOpen(false); }}
                          className="text-left p-2.5 hover:bg-white rounded-lg flex items-center gap-2.5 transition-all text-xs text-slate-700"
                        >
                          <Trophy className="w-4 h-4 text-maroon-600 shrink-0" />
                          <span>CBT Mock Exam Platform</span>
                        </button>
                        <button
                          onClick={() => { setPreviewModule('omr-evaluation'); setMenuOpen(false); }}
                          className="text-left p-2.5 hover:bg-white rounded-lg flex items-center gap-2.5 transition-all text-xs text-slate-700"
                        >
                          <Smartphone className="w-4 h-4 text-maroon-600 shrink-0" />
                          <span>OMR Smartphone Evaluation</span>
                        </button>
                        <button
                          onClick={() => { setPreviewModule('erp-crm'); setMenuOpen(false); }}
                          className="text-left p-2.5 hover:bg-white rounded-lg flex items-center gap-2.5 transition-all text-xs text-slate-700"
                        >
                          <Database className="w-4 h-4 text-maroon-600 shrink-0" />
                          <span>Institute ERP + CRM Suite</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button 
                  onClick={() => { navigateTo('content-library'); setMenuOpen(false); }} 
                  className={`text-left py-2.5 border-b border-slate-50 hover:text-maroon-750 uppercase font-extrabold ${
                    page === 'content-library' ? 'text-maroon-700' : 'text-slate-800'
                  }`}
                >
                  Library Catalog
                </button>
                
                <button
                  onClick={() => { navigateTo('why-acados'); setMenuOpen(false); }}
                  className={`text-left py-2.5 border-b border-slate-50 hover:text-maroon-750 uppercase font-extrabold ${page === 'why-acados' ? 'text-maroon-700' : 'text-slate-800'}`}
                >
                  Why AcadOS
                </button>

                <button 
                  onClick={() => { navigateTo('about'); setMenuOpen(false); }} 
                  className={`text-left py-2.5 border-b border-slate-50 hover:text-maroon-750 uppercase font-extrabold ${
                    page === 'about' ? 'text-maroon-700' : 'text-slate-800'
                  }`}
                >
                  About Leaders
                </button>
                
                <button 
                  onClick={() => { navigateTo('contact'); setMenuOpen(false); }} 
                  className={`text-left py-2.5 border-b border-slate-50 hover:text-maroon-750 uppercase font-extrabold ${
                    page === 'contact' ? 'text-maroon-700' : 'text-slate-800'
                  }`}
                >
                  Contact & Info
                </button>
                
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setIsDemoModalOpen(true);
                  }}
                  className="bg-maroon-700 text-white w-full py-3 rounded-xl uppercase tracking-widest text-[11px] font-extrabold text-center mt-2 shadow-sm hover:bg-maroon-800 transition-colors"
                >
                  Schedule Demo Slot
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacing Offset for floating header */}
      <div className="pt-20 sm:pt-24 flex-1">
        
        {/* Router Render Outlet */}
        <AnimatePresence mode="wait">
          
          {/* ==================================== */}
          {/* HOME PAGE CANVAS                     */}
          {/* ==================================== */}
          {page === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16 md:space-y-24 pb-16"
            >
              
              {/* HERO SECTION */}
              <section className="relative overflow-hidden" id="hero-block">
                {/* Full-bleed light maroon bg */}
                <div className="absolute inset-0 bg-maroon-700" />
                {/* Lighter maroon glow left */}
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_top_left,rgba(158,27,27,0.5),transparent_70%)] pointer-events-none" />
                {/* Gold shimmer right */}
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(223,178,113,0.12),transparent_70%)] pointer-events-none" />
                {/* Subtle grid texture */}
                <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '60px 60px'}} />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-28 lg:py-32">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

                    {/* LEFT: Copy */}
                    <div className="lg:col-span-6 space-y-5 sm:space-y-8">
                      {/* Trust badge */}
                      <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                        <span className="text-[11px] text-slate-300 font-medium">Trusted by schools & coaching institutes across India</span>
                      </div>

                      <h1 className="text-4xl sm:text-6xl lg:text-[4.5rem] font-serif font-extrabold text-white tracking-tight leading-[1.08]">
                        The Academic OS <span className="text-maroon-400">built for India.</span>
                      </h1>

                      <p className="text-white/75 text-sm sm:text-lg max-w-lg leading-relaxed">
                        White-label your institution's exams, OMR grading, CBT mocks, content library and ERP — one platform, your brand.
                      </p>

                      {/* CTA row — horizontal on all sizes */}
                      <div className="flex flex-row gap-2 sm:gap-3">
                        <button
                          onClick={() => setIsDemoModalOpen(true)}
                          className="flex-1 sm:flex-none bg-white text-maroon-800 hover:bg-slate-100 font-bold text-xs sm:text-sm py-3 sm:py-3.5 px-4 sm:px-7 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg"
                        >
                          Book Demo <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                        <button
                          onClick={() => {
                            const el = document.getElementById('modules-container');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="flex-1 sm:flex-none bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-xs sm:text-sm py-3 sm:py-3.5 px-4 sm:px-7 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                          Explore Modules
                        </button>
                      </div>

                      {/* Proof strip */}
                      <div className="flex items-center gap-5 sm:gap-8 pt-4 sm:pt-6 border-t border-white/10">
                        {[
                          { num: '5 Lakh+', label: 'Questions' },
                          { num: '15+', label: 'Exams Mapped' },
                          { num: '100%', label: 'White-Labeled' },
                        ].map((stat, i) => (
                          <div key={i} className={i > 0 ? 'pl-5 sm:pl-8 border-l border-white/10' : ''}>
                            <span className="block text-xl sm:text-2xl font-black text-white leading-none">{stat.num}</span>
                            <span className="text-[10px] sm:text-xs text-white/60 font-medium mt-1 block">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* RIGHT: Dashboard Mockup — hidden on mobile, shown sm+ */}
                    <div className="hidden sm:block lg:col-span-6 relative">
                      {/* Glow behind card */}
                      <div className="absolute -inset-4 bg-maroon-800/20 rounded-3xl blur-2xl" />
                      <div className="relative bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
                        {/* Browser chrome */}
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-950">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                          <div className="ml-3 flex-1 bg-slate-800 rounded-md px-3 py-1 text-[10px] text-slate-500 font-mono">
                            portal.acados.app — St. Xaviers High School
                          </div>
                          <div className="flex items-center gap-1.5 text-[9px] text-emerald-400 font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            LIVE
                          </div>
                        </div>

                        <div className="p-5 space-y-4">
                          {/* Header row */}
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-slate-500 font-medium">Assessment</p>
                              <h3 className="text-white font-bold text-sm">Grade X-A · Mathematics</h3>
                            </div>
                            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full">Auto-Generated ✓</span>
                          </div>

                          {/* Question distribution */}
                          <div className="bg-slate-800/60 rounded-xl p-4 space-y-3 border border-slate-700/50">
                            <div className="flex justify-between text-xs text-slate-400">
                              <span>Question Distribution</span>
                              <span className="text-white font-semibold">48 Questions</span>
                            </div>
                            <div className="h-2 bg-slate-700 rounded-full overflow-hidden flex gap-0.5">
                              <div className="h-full bg-maroon-500 rounded-l-full" style={{width:'40%'}} />
                              <div className="h-full bg-gold-500" style={{width:'25%'}} />
                              <div className="h-full bg-emerald-500 rounded-r-full" style={{width:'35%'}} />
                            </div>
                            <div className="flex justify-between text-[10px] text-slate-500">
                              <span>Physics 40%</span><span>Chemistry 25%</span><span>Math 35%</span>
                            </div>
                          </div>

                          {/* Stat cards */}
                          <div className="grid grid-cols-3 gap-3">
                            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3">
                              <p className="text-[10px] text-slate-500 mb-1">OMR Scanned</p>
                              <p className="text-xl font-black text-white">127</p>
                              <p className="text-[10px] text-emerald-400 mt-0.5">98.4% accuracy</p>
                            </div>
                            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3">
                              <p className="text-[10px] text-slate-500 mb-1">Class Avg</p>
                              <p className="text-xl font-black text-gold-400">76.3%</p>
                              <p className="text-[10px] text-emerald-400 mt-0.5">↑ from 68.1%</p>
                            </div>
                            <div className="bg-maroon-800/40 border border-maroon-700/40 rounded-xl p-3">
                              <p className="text-[10px] text-maroon-300 mb-1">Top Score</p>
                              <p className="text-xl font-black text-white">96%</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">Riya Sharma</p>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-maroon-700 flex items-center justify-center">
                                <GraduationCap className="w-3.5 h-3.5 text-white" />
                              </div>
                              <span className="text-xs text-slate-400">Your Brand · Powered by AcadOS</span>
                            </div>
                            <span className="text-[10px] text-slate-600">Reports auto-sent to parents</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </section>


              {/* HE-4: ECOSYSTEM MAP */}
              <motion.section
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="bg-slate-100/50 py-12 border-y border-slate-200"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <EcosystemChart />
                </div>
              </motion.section>

              {/* MODULES SECTION */}
              <motion.section
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                id="modules-container"
              >
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                  <div className="space-y-2 max-w-xl">
                    <h3 className="text-4xl sm:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-[1.05]" style={{textWrap:'balance'}}>
                      Everything your institution needs
                    </h3>
                    <p className="text-slate-500 text-base">Five integrated modules. One platform. Your brand.</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-maroon-600 bg-maroon-50 border border-maroon-100 px-3 py-1.5 rounded-full shrink-0 self-start sm:self-auto">
                    All Modules
                  </span>
                </div>

                {/* Module cards — horizontal scroll on mobile, 4-col grid on desktop */}
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
                  {[
                    { id: 'practice-cbt' as const,    icon: Trophy,     label: 'CBT Mock Tests',   desc: 'NTA-style exam portal for JEE, NEET & boards. Live timers, instant analytics.', stat: 'Score ↑23%',        color: '#800000', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=280&fit=crop&q=80' },
                    { id: 'omr-evaluation' as const,  icon: Smartphone, label: 'OMR Scanning',     desc: 'Grade bubble answer sheets with any smartphone camera in seconds.',             stat: '99.8% Accuracy',    color: '#b0813f', img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=280&fit=crop&q=80' },
                    { id: 'erp-crm' as const,         icon: Database,   label: 'Institute ERP',    desc: 'Fee ledger, attendance, staff registers and academic schedule in one place.',    stat: 'Saves 40% Ops',     color: '#9e1b1b', img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=280&fit=crop&q=80' },
                    { id: 'content-library' as const, icon: Globe,      label: 'Content Library',  desc: 'CBSE, IGCSE & IB aligned pre-loaded curriculum worksheets and notes.',          stat: '5 Lakh+ Resources', color: '#150000', img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=280&fit=crop&q=80' },
                  ].map((mod) => {
                    const Icon = mod.icon;
                    return (
                      <button
                        key={mod.id}
                        onClick={() => navigateTo(mod.id)}
                        className="flex-none w-[78vw] snap-start sm:w-auto group bg-white border border-slate-150 rounded-2xl overflow-hidden flex flex-col text-left hover:border-maroon-200 hover:shadow-lg transition-all duration-300"
                      >
                        {/* Card image */}
                        <div className="relative h-36 overflow-hidden">
                          <img
                            src={mod.img}
                            alt={mod.label}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${mod.color}22 0%, ${mod.color}55 100%)` }} />
                          {/* Stat badge over image */}
                          <span className="absolute top-3 right-3 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm" style={{ color: mod.color }}>
                            {mod.stat}
                          </span>
                          {/* Icon over image */}
                          <div className="absolute bottom-3 left-3 w-9 h-9 rounded-xl flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-sm">
                            <Icon style={{ color: mod.color, width: 16, height: 16 }} />
                          </div>
                        </div>

                        {/* Card body */}
                        <div className="p-4 flex flex-col gap-3 flex-1">
                          <div className="space-y-1 flex-1">
                            <h5 className="font-serif font-extrabold text-slate-900 text-base leading-snug">{mod.label}</h5>
                            <p className="text-slate-500 text-xs leading-relaxed">{mod.desc}</p>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] font-bold" style={{ color: mod.color }}>
                            Explore <ChevronRight className="w-3 h-3" />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.section>

              {/* HE-9: BEFORE / AFTER REVOLUTION */}
              <motion.section
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                <BeforeAfterSlider />
              </motion.section>

              {/* LEADERSHIP SECTION */}
              <motion.section
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="relative overflow-hidden"
                id="about-us-block"
              >
                {/* Dark editorial bg */}
                <div className="absolute inset-0 bg-slate-900" />
                <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)',backgroundSize:'48px 48px'}} />
                <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(128,0,0,0.15),transparent_70%)] pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div className="space-y-2 max-w-lg">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-400 bg-gold-400/10 border border-gold-400/20 px-3 py-1 rounded-full inline-block">
                        Leadership
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-white tracking-tight leading-tight" style={{textWrap:'balance'}}>
                        Built by educators who've been in the classroom.
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                        25+ years of teaching experience combined with enterprise-grade software engineering.
                      </p>
                    </div>
                    <button onClick={() => navigateTo('about')} className="shrink-0 inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-400/30 text-gold-400 hover:text-gold-300 font-bold text-xs px-4 py-2 rounded-xl transition-all">
                      Meet the team <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Cards — horizontal scroll on mobile, 3-col on desktop */}
                  {/* Mobile: vertical stack | Desktop: horizontal 3-col row */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {[
                      { name: 'V. P. Singh', title: 'Senior Physics Educator', detail: '10,000+ students mentored for JEE & NEET', tag: 'Physics · IIT-JEE', pic: vpSinghPic, pos: 'center 20%' },
                      { name: 'Rohit Jain', title: 'Curriculum Architect', detail: 'CBSE, IGCSE & IB specialist, 6,000+ students', tag: 'Curriculum · IB', pic: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=700&fit=crop&q=80', pos: 'center 15%' },
                      { name: 'Abhishek Agarwal', title: 'Tech Lead & Architect', detail: 'IIIT Hyderabad · Ex-Palantir, Qualcomm', tag: 'Engineering', pic: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=700&fit=crop&q=80', pos: 'center 10%' },
                    ].map((lead, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: idx * 0.08 }}
                        className="group flex-1 rounded-xl overflow-hidden border border-white/10 hover:border-gold-400/30 transition-all duration-300 cursor-pointer bg-white/5 hover:bg-white/8"
                      >
                        {/* Mobile: row layout (photo left, text right) */}
                        {/* Desktop: column layout (photo top, text bottom) */}
                        <div className="flex sm:flex-col items-center sm:items-stretch gap-0">
                          {/* Photo */}
                          <div className="w-20 h-20 sm:w-full sm:h-52 shrink-0 overflow-hidden">
                            <img
                              src={lead.pic}
                              alt={lead.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              style={{ objectPosition: lead.pos }}
                            />
                          </div>

                          {/* Text */}
                          <div className="flex-1 px-4 py-3 sm:py-4 space-y-0.5 min-w-0">
                            <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-gold-400 bg-gold-400/10 border border-gold-400/20 px-2 py-0.5 rounded-full inline-block mb-1">
                              {lead.tag}
                            </span>
                            <h4 className="font-serif font-bold text-white text-sm sm:text-base leading-tight">{lead.name}</h4>
                            <p className="text-gold-400 text-[10px] font-bold font-mono uppercase tracking-wide">{lead.title}</p>
                            <p className="text-slate-400 text-xs leading-relaxed mt-1 hidden sm:block">{lead.detail}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                </div>
              </motion.section>

              {/* SUCCESS STORIES SECTION */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SuccessStories />
              </section>

              {/* HE-12: DEMO SCHEDULER FORM SEC */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="demo-booking-section">
                <div className="bg-white border border-maroon-100 rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">

                  {/* Pitch Side (5 Columns) */}
                  <div className="lg:col-span-5 bg-gradient-to-br from-maroon-700 via-maroon-800 to-maroon-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
                    <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />

                    <div className="space-y-4 relative z-10">
                      <span className="bg-gold-500/20 text-gold-300 font-mono text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full border border-gold-500/15 inline-block">
                        Ready to transform academics?
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black tracking-tight font-sans text-white leading-tight">
                        Let's Build It<br />White-Labeled.
                      </h3>
                      <p className="text-maroon-100 text-xs sm:text-sm leading-relaxed font-sans">
                        Fill out our short questionnaire. Access sandbox accounts and let us mock up worksheets, reports, and portal views custom-tailored with your school's color theme and logo.
                      </p>
                      <ul className="space-y-1.5 text-maroon-100 text-xs font-medium">
                        {['Custom branded student portal', 'Live TestMaker sandbox access', 'OMR + CBT demo walkthrough'].map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2 pt-6 border-t border-maroon-600 text-xs text-maroon-200 relative z-10">
                      <p className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                        <strong>+91 9660034117</strong>
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                        <strong>hoduacademycontenttwo@gmail.com</strong>
                      </p>
                    </div>
                  </div>

                  {/* Form Trigger (7 Columns) */}
                  <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center items-center text-center space-y-6 bg-slate-50">
                    <div className="w-16 h-16 rounded-2xl bg-maroon-50 border border-maroon-100 flex items-center justify-center shadow-sm">
                      <Calendar className="w-8 h-8 text-maroon-700" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl sm:text-2xl font-serif font-light text-slate-905 tracking-tight">
                        Book Your <span className="italic text-maroon-700">Free Demo Slot</span>
                      </h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                        We collect your roles, student cap, and module interests to prepare a sandbox tailored to your institution before the call.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsDemoModalOpen(true)}
                      className="btn-shine text-white font-extrabold uppercase py-4 px-10 rounded-xl text-xs tracking-wider shadow-lg active:scale-[0.98] cursor-pointer flex items-center gap-2 shrink-0"
                    >
                      <Calendar className="w-4 h-4 text-gold-300" />
                      <span>Book Walkthrough Slot Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <p className="text-[10px] text-slate-400 uppercase font-mono font-bold tracking-wider">
                      Completely free · No credit card required
                    </p>
                  </div>

                </div>
              </section>

            </motion.div>
          )}

          {/* ==================================== */}
          {/* SOLUTIONS: SCHOOLS PAGE              */}
          {/* ==================================== */}
          {page === 'schools' && (
            <motion.div 
              key="schools"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16"
            >
              <div className="bg-gradient-to-br from-maroon-800 to-maroon-900 rounded-3xl p-8 md:p-12 text-white border border-maroon-700 shadow-xl space-y-4">
                <span className="text-gold-400 font-mono text-xs tracking-widest font-extrabold uppercase">
                  AcadOS for K-12 Academics
                </span>
                <h1 className="text-2xl sm:text-4xl font-serif font-light text-white leading-tight">
                  Strengthen Academics. <span className="italic text-gold-300">Simplify Operations.</span>
                </h1>
                <p className="text-maroon-100 text-sm sm:text-base max-w-2xl leading-relaxed font-sans font-medium">
                  Standardize operations with pre-mapped syllabus and fast OMR grading.
                </p>
                <div className="pt-2">
                  <button onClick={() => setIsDemoModalOpen(true)} className="bg-gold-500 hover:bg-gold-600 text-maroon-950 font-extrabold py-3 px-6 rounded-xl text-sm uppercase cursor-pointer transition-all">
                    Custom School Demo Call
                  </button>
                </div>
              </div>

              {/* Core schools value checklist layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-serif font-light text-slate-905 tracking-tight leading-tight">
                    Unified K-12 <span className="italic text-maroon-700">Digital Systems</span>
                  </h3>
                  
                  <ul className="space-y-2 text-slate-700 text-sm sm:text-base leading-relaxed font-sans font-medium">
                    <li className="flex items-start gap-1.5">
                      <span className="text-maroon-700">✓</span>
                      <span>Automated exam paper blueprints.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-maroon-700">✓</span>
                      <span>Mapped syllabus worksheets.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-maroon-750">✓</span>
                      <span>Instant parent scorecard dispatch.</span>
                    </li>
                  </ul>

                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600" 
                    alt="AcadOS unified schools admin and exam management database panel dashboard mockup" 
                    className="rounded-2xl border border-slate-205 shadow-sm h-40 w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Detailed checklist cards on the right (7-column span) */}
                <div className="lg:col-span-7 flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory scrollbar-thin sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:gap-4">
                  {[
                    {
                      title: 'Question Banks',
                      subheading: 'Syllabus aligned questions database.',
                      imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=450',
                      icon: '📚'
                    },
                    {
                      title: 'Pre-configured Handouts',
                      subheading: 'Lesson notes & printable worksheets.',
                      imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=450',
                      icon: '📝'
                    },
                    {
                      title: 'Smartphone OMR Scanner',
                      subheading: 'Grade bubble sheets in 10 seconds.',
                      imageUrl: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=450',
                      icon: '📱'
                    },
                    {
                      title: 'School ERP',
                      subheading: 'Fee ledgers, reports & automatic alerts.',
                      imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=450',
                      icon: '🏫'
                    }
                  ].map((item, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white p-5 rounded-2xl border border-slate-150 space-y-3 shadow-sm hover:border-maroon-200 hover:shadow-md transition-all flex flex-col justify-between w-[280px] min-w-[280px] max-w-[280px] sm:w-full sm:min-w-0 sm:max-w-none snap-start shrink-0"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 pb-1 border-b border-slate-50">
                          <span className="text-xl shrink-0">{item.icon}</span>
                          <h4 className="text-xs sm:text-sm font-sans font-extrabold text-slate-900 uppercase tracking-tight leading-snug">{item.title}</h4>
                        </div>
                        
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                          {item.subheading}
                        </p>
                      </div>

                      <div className="rounded-xl overflow-hidden border border-slate-100 h-24 w-full bg-slate-50 relative mt-3 shrink-0">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expanded full-page-width Live Digital Academic Library & Syllabus Index */}
              <div className="border-t border-slate-150 pt-12 space-y-6">
                <div className="text-center space-y-2 max-w-3xl mx-auto">
                  <span className="text-maroon-800 font-mono text-xs uppercase font-bold tracking-widest bg-maroon-50 px-2.5 py-1 rounded-full border border-maroon-105 inline-block">
                    Interactive Preview Suite
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-light text-slate-900 tracking-tight leading-tight">
                    AcadOS K-12 School <span className="italic text-maroon-700">Enterprise Stack</span>
                  </h3>
                  <p className="text-sm text-slate-550 leading-relaxed font-sans">
                    Toggle through all modules below to see how AcadOS handles every administrative and academic challenge your school faces.
                  </p>
                </div>
                
                <SchoolsSolutionHub />
              </div>

              <ModuleCtaBanner module="schools" onBookDemo={() => setIsDemoModalOpen(true)} />

              <div className="pt-4 max-w-xs mx-auto">
                <button onClick={() => navigateTo('home')} className="text-maroon-700 hover:text-maroon-900 font-extrabold text-xs uppercase tracking-wide flex items-center gap-1.5 transition-all w-full justify-center underline">
                  ← Back to Homepage Panel
                </button>
              </div>

            </motion.div>
          )}

          {/* ==================================== */}
          {/* SOLUTIONS: COACHING PAGE             */}
          {/* ==================================== */}
          {page === 'coaching' && (
            <motion.div 
              key="coaching"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16"
            >
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-8 md:p-12 text-white border border-slate-850 shadow-xl space-y-4">
                <span className="text-gold-400 font-mono text-xs tracking-widest font-extrabold uppercase">
                  AcadOS for Coaching Academies
                </span>
                <h1 className="text-2xl sm:text-4xl font-serif font-light text-white leading-tight">
                  Maximize Admissions. <span className="italic text-gold-300">Automate OMR & CBT Scorecards.</span>
                </h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
                  Manage leads, draft MCQ blueprints, and deploy interactive NTA-style mock tests.
                </p>
                <div className="pt-2">
                  <button onClick={() => setIsDemoModalOpen(true)} className="bg-gold-500 hover:bg-gold-600 text-maroon-950 font-extrabold py-3 px-6 rounded-xl text-sm uppercase cursor-pointer transition-all">
                    Custom Coaching Demo Call
                  </button>
                </div>
              </div>

              {/* Core coaching value checklist */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-serif font-light text-slate-905 tracking-tight leading-tight">
                    Speed & Trust for <span className="italic text-maroon-700">Coaching Brands</span>
                  </h3>
                  
                  <ul className="space-y-2 text-slate-700 text-sm sm:text-base leading-relaxed font-sans font-medium">
                    <li className="flex items-start gap-1.5">
                      <span className="text-maroon-700">✓</span>
                      <span>Instant smartphone OMR grading.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-maroon-700">✓</span>
                      <span>Error and mistake tracking diagnostics.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-maroon-700">✓</span>
                      <span>Unified leads intake management.</span>
                    </li>
                  </ul>

                  <img 
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=600" 
                    alt="Students preparing in coaching institute using AcadOS digital test and cbt test paper maker tools" 
                    className="rounded-2xl border border-slate-205 shadow-sm h-40 w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Detailed checklist cards on the right (7-column span) with swipeable mobile horizontal scroll */}
                <div className="lg:col-span-7 flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory scrollbar-thin sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:gap-4">
                  {[
                    {
                      title: 'TestMaker Engine',
                      subheading: 'Print JEE, NEET & board tests in 5 mins.',
                      imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=450',
                      icon: '⚡'
                    },
                    {
                      title: 'NTA CBT Simulator',
                      subheading: 'NTA layout mock CBT exams.',
                      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=450',
                      icon: '💻'
                    },
                    {
                      title: 'Funnel CRM',
                      subheading: 'Track lead pipelines and automations.',
                      imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=450',
                      icon: '📊'
                    },
                    {
                      title: 'OMR Scanner',
                      subheading: 'Phone OMR camera grading scorecards.',
                      imageUrl: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=450',
                      icon: '🔍'
                    }
                  ].map((item, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white p-5 rounded-2xl border border-slate-150 space-y-3 shadow-sm hover:border-maroon-200 hover:shadow-md transition-all flex flex-col justify-between w-[280px] min-w-[280px] max-w-[280px] sm:w-full sm:min-w-0 sm:max-w-none snap-start shrink-0"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 pb-1 border-b border-slate-50">
                          <span className="text-xl shrink-0">{item.icon}</span>
                          <h4 className="text-xs sm:text-sm font-sans font-extrabold text-slate-900 uppercase tracking-tight leading-snug">{item.title}</h4>
                        </div>
                        
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                          {item.subheading}
                        </p>
                      </div>

                      <div className="rounded-xl overflow-hidden border border-slate-100 h-24 w-full bg-slate-50 relative mt-3 shrink-0">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expanded full-page-width Live CBT Simulator Arena */}
              <div className="border-t border-slate-150 pt-12 space-y-6">
                <div className="text-center space-y-2 max-w-3xl mx-auto">
                  <span className="text-maroon-850 font-mono text-[9px] uppercase font-bold tracking-widest bg-maroon-50 px-2.5 py-1 rounded-full border border-maroon-105 inline-block">
                    Interactive Simulation Deck
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-light text-slate-900 tracking-tight leading-tight">
                    AcadOS Coaching <span className="italic text-maroon-700">Enterprise Suite</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-550 leading-relaxed font-sans">
                    Toggle through all modules below to see how AcadOS handles every operational, administrative, and academic challenge your coaching institute faces.
                  </p>
                </div>
                
                <CoachingSolutionHub />
              </div>

              <ModuleCtaBanner module="coaching" onBookDemo={() => setIsDemoModalOpen(true)} />

              <div className="pt-4 max-w-xs mx-auto">
                <button onClick={() => navigateTo('home')} className="text-maroon-700 hover:text-maroon-900 font-extrabold text-xs uppercase tracking-wide flex items-center gap-1.5 transition-all w-full justify-center underline text-center">
                  ← Back to Homepage Panel
                </button>
              </div>

            </motion.div>
          )}

          {/* ==================================== */}
          {/* CORE MODULES FOCUS: TESTMAKER        */}
          {/* ==================================== */}
          {page === 'testmaker' && (
            <motion.div 
              key="testmaker"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
            >
              <div className="text-center space-y-2 max-w-3xl mx-auto">
                <span className="text-maroon-850 font-mono text-[9px] uppercase font-bold tracking-widest bg-maroon-50 px-2.5 py-1 rounded-full border border-maroon-105 inline-block">
                  Module Spotlight: Testmaker
                </span>
                <h1 className="text-3xl sm:text-4xl font-serif font-light text-slate-900 tracking-tight leading-tight">
                  Instantly Generate <span className="italic text-maroon-700">Aligned Exam Papers</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-550 max-w-2xl mx-auto leading-relaxed font-sans">
                  5 Lakh+ syllabus questions with custom branding, section difficulty guidelines, and downloadable PDFs.
                </p>
              </div>

              <TestMakerPlayground />

              <ModuleCtaBanner module="testmaker" onBookDemo={() => setIsDemoModalOpen(true)} />

              <div className="pt-4 max-w-xs mx-auto">
                <button onClick={() => navigateTo('home')} className="text-maroon-700 hover:text-maroon-900 font-extrabold text-xs uppercase tracking-wide flex items-center gap-1.5 transition-all w-full justify-center underline text-center">
                  ← Back to Homepage Panel
                </button>
              </div>
            </motion.div>
          )}

          {/* ==================================== */}
          {/* CORE MODULES FOCUS: LEARNERS HUB     */}
          {/* ==================================== */}
          {page === 'learners-hub' && (
            <motion.div 
              key="learners-hub"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
            >
              <div className="text-center space-y-2 max-w-3xl mx-auto">
                <span className="text-maroon-850 font-mono text-[9px] uppercase font-bold tracking-widest bg-maroon-50 px-2.5 py-1 rounded-full border border-maroon-105 inline-block">
                  Module Spotlight: Learners Hub
                </span>
                <h1 className="text-3xl sm:text-4xl font-serif font-light text-slate-900 tracking-tight leading-tight">
                  The Complete Classroom <span className="italic text-maroon-700">Digital Library</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-550 max-w-2xl mx-auto leading-relaxed font-sans">
                  Pre-mapped daily homework worksheets, chapter lecture notes, and question guides.
                </p>
              </div>

              <div className="space-y-6">
                <div className="border border-maroon-100 p-2 bg-gradient-to-r from-maroon-50/40 to-white rounded-[24px]">
                  <LearnersHubMicroDemo />
                </div>
              </div>

              <div className="border-t border-slate-200 pt-12 space-y-4">
                <h4 className="text-xl sm:text-2xl font-serif text-slate-800 text-center font-light leading-tight">
                  Browse the Live <span className="italic text-maroon-700">Digital Library Catalog</span>
                </h4>
                <ContentLibraryTabs />
              </div>

              <ModuleCtaBanner module="learners-hub" onBookDemo={() => setIsDemoModalOpen(true)} />

              <div className="pt-4 max-w-xs mx-auto">
                <button onClick={() => navigateTo('home')} className="text-maroon-700 hover:text-maroon-900 font-extrabold text-xs uppercase tracking-wide flex items-center gap-1.5 transition-all w-full justify-center underline text-center">
                  ← Back to Homepage Panel
                </button>
              </div>
            </motion.div>
          )}

          {/* ==================================== */}
          {/* CORE MODULES FOCUS: PRACTICE & CBT   */}
          {/* ==================================== */}
          {page === 'practice-cbt' && (
            <motion.div 
              key="practice-cbt"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
            >
              <div className="text-center space-y-2 max-w-3xl mx-auto">
                <span className="text-maroon-850 font-mono text-[9px] uppercase font-bold tracking-widest bg-maroon-50 px-2.5 py-1 rounded-full border border-maroon-105 inline-block">
                  Module Spotlight: Student Practice & CBTs
                </span>
                <h1 className="text-3xl sm:text-4xl font-serif font-light text-slate-900 tracking-tight leading-tight">
                  Adaptive Drills with <span className="italic text-maroon-700">High-Stakes CBT Interfaces</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-550 max-w-2xl mx-auto leading-relaxed font-sans">
                  Simulate JEE, NEET and board online exam formats with automated diagnostic trackers.
                </p>
              </div>

              <CBTPlayground />

              <ModuleCtaBanner module="practice-cbt" onBookDemo={() => setIsDemoModalOpen(true)} />

              <div className="pt-4 max-w-xs mx-auto">
                <button onClick={() => navigateTo('home')} className="text-maroon-700 hover:text-maroon-900 font-extrabold text-xs uppercase tracking-wide flex items-center gap-1.5 transition-all w-full justify-center underline text-center">
                  ← Back to Homepage Panel
                </button>
              </div>
            </motion.div>
          )}

          {/* ==================================== */}
          {/* CORE MODULES FOCUS: ERP & CRM        */}
          {/* ==================================== */}
          {page === 'erp-crm' && (
            <motion.div 
              key="erp-crm"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10"
            >
              <div className="text-center space-y-2 max-w-3xl mx-auto">
                <span className="text-maroon-850 font-mono text-[9px] uppercase font-bold tracking-widest bg-maroon-50 px-2.5 py-1 rounded-full border border-maroon-105 inline-block">
                  Interactive Simulator: Admin ERP & Admissions CRM
                </span>
                <h1 className="text-3xl sm:text-4xl font-serif font-light text-slate-900 tracking-tight leading-tight">
                  Experience AcadOS <span className="italic text-maroon-700">Enterprise Stack</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-550 max-w-2xl mx-auto leading-relaxed font-sans">
                  Counselor callback pipeline management, billing, biometric schedules, and multi-branch setup tabs.
                </p>
              </div>

              {/* HIGH FIDELITY INTERACTIVE SYSTEM ENGINE */}
              <ErpCrmPlayground />

              <ModuleCtaBanner module="erp-crm" onBookDemo={() => setIsDemoModalOpen(true)} />

              <div className="pt-4 max-w-xs mx-auto">
                <button onClick={() => navigateTo('home')} className="text-maroon-700 hover:text-maroon-900 font-extrabold text-xs uppercase tracking-wide flex items-center gap-1.5 transition-all w-full justify-center underline text-center">
                  ← Back to Homepage Panel
                </button>
              </div>
            </motion.div>
          )}

          {/* ==================================== */}
          {/* CONTENT LIBRARY DIRECT CATALOG       */}
          {/* ==================================== */}
          {page === 'content-library' && (
            <motion.div 
              key="content-library-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
            >
              <ContentLibraryTabs />

              <ModuleCtaBanner module="content-library" onBookDemo={() => setIsDemoModalOpen(true)} />

              <div className="pt-4 max-w-xs mx-auto">
                <button onClick={() => navigateTo('home')} className="text-maroon-700 hover:text-maroon-900 font-extrabold text-xs uppercase tracking-wide flex items-center gap-1.5 transition-all w-full justify-center underline text-center">
                  ← Back to Homepage Panel
                </button>
              </div>
            </motion.div>
          )}

          {/* ==================================== */}
          {/* WHY ACADOS PAGE                      */}
          {/* ==================================== */}
          {page === 'why-acados' && (
            <motion.div
              key="why-acados-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <WhyAcadOS onBookDemo={() => setIsDemoModalOpen(true)} />
            </motion.div>
          )}

          {/* ==================================== */}
          {/* ABOUT BOARD PAGE                     */}
          {/* ==================================== */}
          {page === 'about' && (
            <motion.div 
              key="about-page"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16"
            >
              <div className="bg-gradient-to-br from-maroon-800 to-maroon-950 text-white rounded-3xl p-8 md:p-12 border border-maroon-705 shadow-xl space-y-3 text-center md:text-left">
                <span className="text-gold-400 font-mono text-[10px] tracking-widest font-bold uppercase">
                  AcadOS Vision & Leadership
                </span>
                <h1 className="text-2xl sm:text-4xl font-serif font-light text-white leading-tight">
                  Combining Deep Academic Insight with <span className="italic text-gold-300">Modern Infrastructure</span>
                </h1>
                <p className="text-maroon-100 text-xs sm:text-sm max-w-2xl leading-relaxed mx-auto md:mx-0">
                  We are veteran educators and global systems architects focused on eliminating admin workloads.
                </p>
              </div>

              {/* Grid biography */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: 'Mr. V. P. Singh',
                    role: 'Senior Physics Educator | 25+ Years in Education',
                    desc: 'Physics veteran who coached 10,000+ students for JEE, NEET and boards.'
                  },
                  {
                    name: 'Mr. Rohit Jain',
                    role: 'Expert Physics Educator | Curriculum Mentor',
                    desc: 'Curriculum expert with 6,000+ students mentored across CBSE, IGCSE and IB boards.'
                  },
                  {
                    name: 'Mr. Abhishek Agarwal',
                    role: 'Technologist | IIIT Hyderabad Alumni',
                    desc: 'SaaS systems engineer (IIIT Hyderabad Alumni | Ex-Palantir, Qualcomm).'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-205 p-6 hover:border-maroon-200 transition-all space-y-3 shadow-sm select-none">
                    <span className="w-8 h-8 rounded-full bg-maroon-100 flex items-center justify-center text-maroon-850 font-bold font-sans text-xs">
                      {idx + 1}
                    </span>
                    <h4 className="text-md font-bold text-slate-900 font-sans tracking-tight">{item.name}</h4>
                    <p className="text-[10px] text-maroon-800 font-mono font-bold uppercase tracking-wide">{item.role}</p>
                    <p className="text-slate-600 text-xs leading-relaxed font-sans mt-2">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 max-w-xs mx-auto">
                <button onClick={() => navigateTo('home')} className="text-maroon-700 hover:text-maroon-900 font-extrabold text-xs uppercase tracking-wide flex items-center gap-1.5 transition-all w-full justify-center underline text-center">
                  ← Back to Homepage Panel
                </button>
              </div>
            </motion.div>
          )}

          {/* ==================================== */}
          {/* CONTACT & DEMO PAGE                  */}
          {/* ==================================== */}
          {page === 'contact' && (
            <motion.div 
              key="contact-page"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
            >
              <div className="text-center space-y-2 max-w-3xl mx-auto">
                <span className="text-maroon-850 font-mono text-[9px] uppercase font-bold tracking-widest bg-maroon-50 px-2.5 py-1 rounded-full border border-maroon-105 inline-block">
                  Platform booking
                </span>
                <h1 className="text-2xl sm:text-3xl font-serif font-light text-slate-905 tracking-tight leading-tight">
                  Let’s Deploy Your <span className="italic text-maroon-700">White-Labeled Portal Sandbox</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-550 max-w-2xl mx-auto leading-relaxed font-sans">
                  Select your school caps and interested module lists. Our academic architects will reach out within 1 business hour with customized worksheets.
                </p>
              </div>

              {/* Interactive Contact cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border border-maroon-100 rounded-3xl p-8 md:p-12 shadow-xl">
                
                {/* Contact Coordinates */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 uppercase font-sans tracking-wide">
                      Hoducation Technologies Pvt Ltd
                    </h3>
                    <p className="text-xs text-slate-500 font-sans mt-1">Joint technology initiative with Edunotion Learning Pvt. Ltd.</p>
                  </div>

                  <div className="space-y-4 text-xs font-sans text-slate-650">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-maroon-600 shrink-0 mt-0.5" />
                      <p>
                        <strong>Physical Campus Address:</strong><br />
                        C-28, Vaishali Estate, Gandhi Path (W),<br />
                        Jaipur, Rajasthan, Pin 302021
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-maroon-600 shrink-0 mt-0.5" />
                      <p>
                        <strong>Direct Telephone Numbers:</strong><br />
                        +91 9660034117
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-maroon-600 shrink-0 mt-0.5" />
                      <p>
                        <strong>Academic Inquiry Emails:</strong><br />
                        hoduacademycontenttwo@gmail.com<br />
                        support@acados.app / support@acados.co
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form portal triggers */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-205 flex flex-col justify-center items-center text-center space-y-4">
                  <Star className="w-10 h-10 text-gold-500 fill-gold-500 animate-pulse block" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm uppercase">Launch Live Demo Slot Scheduler</h4>
                    <p className="text-xs text-slate-500">We book slots instantly, aligning available mock sandboxes.</p>
                  </div>

                  <button
                    onClick={() => setIsDemoModalOpen(true)}
                    className="bg-maroon-700 hover:bg-maroon-800 text-white font-extrabold uppercase py-3.5 px-6 rounded-xl text-xs tracking-wider cursor-pointer transition-all border border-maroon-600"
                  >
                    Launch Scheduler Wizard
                  </button>
                </div>
              </div>

              <div className="pt-4 max-w-xs mx-auto">
                <button onClick={() => navigateTo('home')} className="text-maroon-700 hover:text-maroon-900 font-extrabold text-xs uppercase tracking-wide flex items-center gap-1.5 transition-all w-full justify-center underline text-center">
                  ← Back to Homepage Panel
                </button>
              </div>
            </motion.div>
          )}

          {/* ==================================== */}
          {/* SANDBOX SECURE OMR EVAL SYSTEM       */}
          {/* ==================================== */}
          {page === 'omr-evaluation' && (
            <motion.div 
              key="omr-evaluation-page"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
            >
              <div className="text-center space-y-2 max-w-3xl mx-auto mb-10">
                <span className="text-maroon-850 font-mono text-[9px] uppercase font-bold tracking-widest bg-maroon-50 px-2.5 py-1 rounded-full border border-maroon-105 inline-block">
                  Module Spotlight: OMR evaluation
                </span>
                <h1 className="text-3xl sm:text-4xl font-serif font-light text-slate-900 tracking-tight leading-tight">
                  High-Precision Smartphone <span className="italic text-maroon-700">OMR Scanning</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-550 max-w-2xl mx-auto leading-relaxed font-sans">
                  Scan standard student answer templates with high precision using any base smartphone camera.
                </p>
              </div>

              <OMREvaluationMicroDemo />

              <ModuleCtaBanner module="omr-evaluation" onBookDemo={() => setIsDemoModalOpen(true)} />

              <div className="pt-8 max-w-xs mx-auto">
                <button onClick={() => navigateTo('home')} className="text-maroon-700 hover:text-maroon-900 font-extrabold text-xs uppercase tracking-wide flex items-center gap-1.5 transition-all w-full justify-center underline text-center">
                  ← Back to Homepage Panel
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ==================================== */}
      {/* 13. COMPREHENSIVE FOOTER             */}
      {/* ==================================== */}
      <footer className="bg-slate-950 text-slate-350 border-t border-slate-850 pt-16 pb-8" id="footer-coordinates">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 text-xs font-sans pb-12 border-b border-slate-900">
          
          {/* Company Brief block (4 columns) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigateTo('home')}>
              <img src={htLogo} alt="HT Logo" className="w-9 h-9 rounded-full object-cover shrink-0" />
              <span className="text-md font-black tracking-widest text-white uppercase font-sans">
                AcadOS
              </span>
            </div>

            <p className="text-slate-500 leading-relaxed text-[11px] max-w-xs">
              A technology initiative of Hoducation Technologies Pvt. Ltd. Deploying premium academic operating systems for schools and coaching academies under their brand logo.
            </p>

            <p className="font-mono text-[9px] text-slate-600 block">
              Jaipur Branch: C-28, Vaishali Estate, Gandhi Path (W), India
            </p>
          </div>

          {/* Solutions & modules links (4 Columns) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4 uppercase font-bold text-[10px] tracking-wider text-slate-500">
            <div className="space-y-2.5">
              <span className="text-slate-400 font-bold block pb-1 border-b border-slate-900">Solutions</span>
              <button onClick={() => navigateTo('schools')} className="hover:text-white block text-left">For K-12 Schools</button>
              <button onClick={() => navigateTo('coaching')} className="hover:text-white block text-left">For Coachings</button>
              <button onClick={() => setIsDemoModalOpen(true)} className="hover:text-white block text-left">White-label OS</button>
            </div>
            <div className="space-y-2.5">
              <span className="text-slate-400 font-bold block pb-1 border-b border-slate-900">Platform Modules</span>
              <button onClick={() => navigateTo('learners-hub')} className="hover:text-white block text-left">Learners Hub</button>
              <button onClick={() => navigateTo('testmaker')} className="hover:text-white block text-left">TestMaker Engine</button>
              <button onClick={() => navigateTo('practice-cbt')} className="hover:text-white block text-left">Mock CBT simulator</button>
              <button onClick={() => navigateTo('erp-crm')} className="hover:text-white block text-left">ERP + Lead CRM</button>
            </div>
          </div>

          {/* Quick contact / Support coords (4 columns) */}
          <div className="md:col-span-4 space-y-3 font-mono text-[11px]">
            <span className="text-slate-400 font-sans font-bold uppercase block pb-1 border-b border-slate-900 text-[10px]">
              Direct Contact Support
            </span>
            <div className="space-y-1.5 text-slate-500 font-sans">
              <p className="flex items-center gap-2">
                <span>📞 Hotline:</span> <strong>+91 9660034117</strong>
              </p>
              <p className="flex items-center gap-2 text-slate-500">
                <span>📧 E-mail:</span> <strong className="break-all">hoduacademycontenttwo@gmail.com</strong>
              </p>
              <p className="flex items-center gap-2 text-slate-550">
                <span>🌐 Portals:</span> <strong>www.acados.app / www.acados.co</strong>
              </p>
            </div>
          </div>

        </div>

        {/* Legal copyrights strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-slate-600 font-sans uppercase tracking-widest font-bold">
          <span>© 2026 Hoducation Technologies Pvt Ltd. All Rights Reserved.</span>
          <div className="flex gap-4">
            <button onClick={() => navigateTo('omr-evaluation')} className="hover:text-slate-400">OMR Scanning Demo</button>
            <span>•</span>
            <span className="normal-case font-medium">Developed by Edunotion & Hoducation Technologies</span>
          </div>
        </div>
      </footer>

      {/* Booking Form Dialog Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSuccess={handleLeadSaved}
      />

      {/* Module Preview Page — shown before full interactive demo */}
      <AnimatePresence>
        {previewModule && !fullScreenModule && (
          <ModulePreviewPage
            module={previewModule}
            onExplore={() => { setFullScreenModule(previewModule); setPreviewModule(null); }}
            onClose={() => setPreviewModule(null)}
            onBookDemo={() => setIsDemoModalOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* Full-Screen Module Modal */}
      <AnimatePresence>
        {fullScreenModule && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[9999] bg-white flex flex-col"
            style={{ touchAction: 'none' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-800">
                  {fullScreenModule === 'learners-hub' && 'Learners Hub Digital Library'}
                  {fullScreenModule === 'testmaker' && 'TestMaker Paper Generator'}
                  {fullScreenModule === 'practice-cbt' && 'CBT Mock Exam Platform'}
                  {fullScreenModule === 'omr-evaluation' && 'OMR Smartphone Evaluation'}
                  {fullScreenModule === 'erp-crm' && 'Institute ERP + CRM Suite'}
                </span>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wide">· Live</span>
              </div>
              <button
                onClick={() => setFullScreenModule(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* Content */}
            <div className="flex-1 overflow-auto">
              {fullScreenModule === 'learners-hub' && <LearnersHubMicroDemo />}
              {fullScreenModule === 'testmaker' && <TestMakerPlayground />}
              {fullScreenModule === 'practice-cbt' && <CBTPlayground />}
              {fullScreenModule === 'omr-evaluation' && <OMREvaluationMicroDemo />}
              {fullScreenModule === 'erp-crm' && <ErpCrmPlayground />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AcadBot — floating AI assistant */}
      <AcadBot />

    </div>
  );
}
