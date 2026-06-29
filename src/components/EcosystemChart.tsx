import React, { useState, useEffect, useRef } from 'react';
import { Search, FileText, Smartphone, Trophy, Database, BarChart3, ArrowRight, Star, Pause, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EcosystemNode {
  id: string;
  label: string;
  short: string;
  icon: any;
  x: number;
  y: number;
  description: string;
  metrics: string;
  features: string[];
  accentColor: string;
}

const ECOSYSTEM_NODES: EcosystemNode[] = [
  {
    id: 'learners', label: 'Learners Hub', short: 'Academic Library', icon: Search,
    x: -32, y: -30,
    description: 'A "Google-like Search" inside your classroom. Connects teachers and students to standard study notes, worksheets, past questions, and smartboard modules instantly.',
    metrics: '#1 for Classroom Engagement', features: ['Chapter-wise standard notes', 'CBSE, IGCSE & IB mapping', '3D interactive explanations'],
    accentColor: '#800000',
  },
  {
    id: 'testmaker', label: 'TestMaker Engine', short: 'Blueprint Exam Creator', icon: FileText,
    x: 32, y: -30,
    description: 'Auto-select from 5 Lakh+ verified questions based on your custom Blueprint. Generates print-ready papers with complete step-by-step marking schemes.',
    metrics: 'Saves 5 Hours/Week', features: ['Auto-generates blueprints', 'Custom marks weightage', 'Print-to-PDF white-labeled'],
    accentColor: '#9e1b1b',
  },
  {
    id: 'omr', label: 'OMR Evaluation', short: 'Instant Scanning', icon: Smartphone,
    x: -35, y: 15,
    description: 'Teachers use smartphones to scan custom OMR sheets. Calculates ranks, generates scorecards, and uploads mistake track records instantly to the cloud.',
    metrics: '99.8% Scanner Accuracy', features: ['No specialised hardware needed', 'Instant mobile scoring', 'Cohort ranking matrix'],
    accentColor: '#b0813f',
  },
  {
    id: 'cbt', label: 'CBT Simulator', short: 'Computer Mock Exam', icon: Trophy,
    x: 35, y: 15,
    description: 'Gives students JEE/NEET/Olympiad standard practice interfaces. Supports real-time timers, adaptive progress systems, and error tracking bookmarks.',
    metrics: 'Improves Score by 23%', features: ['Adaptive difficulty algorithms', 'Error tracking logs', 'Gamified study habit streaks'],
    accentColor: '#c99a55',
  },
  {
    id: 'erp', label: 'School ERP', short: 'Operational Portal', icon: Database,
    x: -15, y: 35,
    description: 'Streamline school administration: records, fees management, HR, automated attendances, multi-branch control logs, and automated notice bulletins.',
    metrics: 'Reduces Overhead by 40%', features: ['Centralized fee collection', 'Automated SMS notices', 'Comprehensive report cards'],
    accentColor: '#600000',
  },
  {
    id: 'crm', label: 'Admissions CRM', short: 'Lead Prospect Tracker', icon: BarChart3,
    x: 15, y: 35,
    description: 'Empower counselling teams to log student leads, set follow-up reminders, categorize inquiries, and monitor admissions pipeline conversion.',
    metrics: 'Increases Conversions by 35%', features: ['Counselor-wise allocation', 'Follow-up prompt calendar', 'Admissions diagnostic chart'],
    accentColor: '#800000',
  },
];

const INTERVAL_MS = 2800;

export default function EcosystemChart() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const selectedNode = ECOSYSTEM_NODES[activeIdx];

  const startCycle = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);

    timerRef.current = setInterval(() => {
      setActiveIdx(i => (i + 1) % ECOSYSTEM_NODES.length);
      setProgress(0);
    }, INTERVAL_MS);

    progressRef.current = setInterval(() => {
      setProgress(p => Math.min(p + (100 / (INTERVAL_MS / 50)), 100));
    }, 50);
  };

  const stopCycle = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  useEffect(() => {
    if (!paused) startCycle();
    else stopCycle();
    return stopCycle;
  }, [paused, activeIdx]);

  const handleNodeClick = (idx: number) => {
    setActiveIdx(idx);
    setProgress(0);
    if (!paused) {
      stopCycle();
      setTimeout(() => {
        if (!paused) startCycle();
      }, 50);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-150 shadow-sm overflow-hidden" id="ecosystem-view">
      {/* Header */}
      <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-maroon-600 bg-maroon-50 border border-maroon-100 px-2.5 py-1 rounded-full">
            Platform Overview
          </span>
          <h4 className="text-lg sm:text-xl font-serif font-extrabold text-slate-900 mt-1 leading-tight">
            One OS. Six Modules. Zero Silos.
          </h4>
        </div>
        <button
          onClick={() => setPaused(p => !p)}
          className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-maroon-300 hover:text-maroon-700 transition-all shrink-0"
          title={paused ? 'Resume auto-cycle' : 'Pause auto-cycle'}
        >
          {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-[2px] bg-slate-100 relative overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-maroon-700 to-gold-500"
          style={{ width: `${progress}%` }}
          transition={{ ease: 'linear' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: orbit map */}
        <div className="lg:col-span-7 flex justify-center items-center relative min-h-[320px] sm:min-h-[380px] p-4 border-b lg:border-b-0 lg:border-r border-slate-100">

          {/* Dashed orbit rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-52 h-52 rounded-full border border-dashed border-maroon-200/40" />
            <div className="w-72 h-72 rounded-full border border-dashed border-slate-200/60 absolute" />
          </div>

          {/* Connector lines from center to each node */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
            {ECOSYSTEM_NODES.map((node, idx) => {
              const isActive = idx === activeIdx;
              return (
                <line
                  key={node.id}
                  x1="50%" y1="50%"
                  x2={`calc(50% + ${node.x}%)`}
                  y2={`calc(50% + ${node.y}%)`}
                  stroke={isActive ? '#800000' : '#e2ddd6'}
                  strokeWidth={isActive ? 1.5 : 1}
                  strokeDasharray={isActive ? '0' : '4 4'}
                  style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }}
                />
              );
            })}
          </svg>

          {/* Center hub */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-maroon-600 to-maroon-950 shadow-2xl border-4 border-gold-400 flex flex-col items-center justify-center gap-0.5"
            >
              <span className="text-white text-[11px] sm:text-xs font-black uppercase tracking-widest leading-none">AcadOS</span>
              <div className="w-8 h-[1px] bg-gold-400/50 my-0.5" />
              <span className="text-gold-400 text-[8px] sm:text-[9px] font-bold tracking-wider uppercase leading-none">Operating System</span>
            </motion.div>
          </div>

          {/* Module nodes */}
          {ECOSYSTEM_NODES.map((node, idx) => {
            const isActive = idx === activeIdx;
            const Icon = node.icon;
            return (
              <div
                key={node.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `calc(50% + ${node.x}%)`, top: `calc(50% + ${node.y}%)` }}
              >
                <div className="flex flex-col items-center gap-1">
                  {isActive && (
                    <motion.div
                      className="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 border-maroon-400"
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                  <button
                    onClick={() => handleNodeClick(idx)}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-md border-2 outline-none transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-br from-maroon-700 to-maroon-900 border-gold-400 text-white scale-115 shadow-[0_4px_20px_rgba(128,0,0,0.35)]'
                        : 'bg-white border-slate-200 text-maroon-600 hover:scale-105 hover:border-maroon-300 hover:shadow-md'
                    }`}
                  >
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-gold-400' : 'text-maroon-600'}`} />
                  </button>
                  <span className={`text-[9px] font-bold tracking-tight text-center leading-tight max-w-[60px] ${
                    isActive ? 'text-maroon-700' : 'text-slate-500'
                  }`}>
                    {node.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: detail panel */}
        <div className="lg:col-span-5 p-5 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-maroon-700 bg-maroon-50 border border-maroon-100 px-2.5 py-1 rounded-full">
                  {selectedNode.label}
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg border border-slate-150">
                  {selectedNode.metrics}
                </span>
              </div>

              <div>
                <h5 className="font-serif font-extrabold text-slate-900 text-xl leading-tight mb-1.5">
                  {selectedNode.short}
                </h5>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Capabilities</p>
                {selectedNode.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                    <Star className="w-3 h-3 text-gold-500 fill-gold-500 shrink-0" />
                    {feat}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2">
                {ECOSYSTEM_NODES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleNodeClick(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeIdx ? 'w-5 h-1.5 bg-maroon-700' : 'w-1.5 h-1.5 bg-slate-300 hover:bg-maroon-300'
                    }`}
                  />
                ))}
                <button
                  onClick={() => {
                    document.getElementById('modules-container')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="ml-auto text-maroon-700 hover:text-maroon-900 text-[11px] font-bold flex items-center gap-1 transition-all"
                >
                  Explore Modules <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
