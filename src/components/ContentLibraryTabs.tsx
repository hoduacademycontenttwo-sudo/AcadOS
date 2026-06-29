import React, { useState } from 'react';
import { BookOpen, FolderOpen, Tag, Star, Layout, Library, Layers, Search, Sparkles, CheckSquare, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WorksheetPreview {
  code: string;
  title: string;
  subject: string;
  grade: string;
  questionsCount: number;
  hasDPP: boolean;
  topics: string[];
}

const BOARD_DATA = {
  CBSE: {
    title: 'Central Board of Secondary Education',
    subtitle: 'Class 1 to 12 • Standard Curriculum Mapping',
    tagline: 'Fully aligned with NCERT schematics, customized for modern continuous evaluation metrics.',
    features: [
      'Full curriculum textbook chapter mapping',
      'Chapter-wise Past Year questions (PYQs) & practice sets',
      'Worksheets, Daily Practice Problems (DPPs) & solutions',
      'Smart board customized classroom lecture resources'
    ],
    sampleWorksheets: [
      { code: 'CH_P10_LIGHT', title: 'Mirror Formula & Light Refraction Exercises', subject: 'Physics', grade: 'Class 10', questionsCount: 45, hasDPP: true, topics: ['Lens Formula', 'Refractive Index', 'Spherical Mirrors'] },
      { code: 'CH_M10_QUAD', title: 'Quadratic Polynomial Roots & Roots Nature', subject: 'Mathematics', grade: 'Class 10', questionsCount: 60, hasDPP: true, topics: ['Discriminant Formula', 'Roots Nature', 'Completing Square'] },
      { code: 'CH_C12_KINETICS', title: 'Integral Rate Constants & Half Life Kinetics', subject: 'Chemistry', grade: 'Class 12', questionsCount: 35, hasDPP: true, topics: ['Rate Constant', 'Collision Theory', 'First Order Reactions'] }
    ]
  },
  IGCSE: {
    title: 'Cambridge International Secondary GCE',
    subtitle: 'Grades 1 to 12 • Analytical & Global Syllabi',
    tagline: 'Engineered for Cambridge checkpoint levels, matching IGCSE structural exam objectives.',
    features: [
      'Strictly aligned with Cambridge 0625 & 0580 syllabi code',
      'International topic-wise extensive question banks',
      'Extended notes, vocabulary lists, and concise concept explanations',
      'Exam-ready structured modules with structural answers'
    ],
    sampleWorksheets: [
      { code: 'CAM_M09_TRIG', title: 'Right Angle SohCahToa & Circular Trigonometry Checkpoints', subject: 'Mathematics', grade: 'Grade 9', questionsCount: 50, hasDPP: false, topics: ['SohCahToa', 'Sine Rule', 'Bearing coordinates'] },
      { code: 'CAM_P10_WAVES', title: 'Electromagnetic Wave Characteristics & Radiations', subject: 'Physics', grade: 'Grade 10', questionsCount: 40, hasDPP: true, topics: ['Frequency Wave', 'Reflection Waves', 'Snells Law'] },
      { code: 'CAM_C11_MOLE', title: 'Stoichiometry Ratios & Avogadro Gas Volumes', subject: 'Chemistry', grade: 'Grade 11', questionsCount: 30, hasDPP: true, topics: ['Mole Calculation', 'Yield Percentage', 'Empirical Formula'] }
    ]
  },
  IB: {
    title: 'International Baccalaureate (IB DP/MYP)',
    subtitle: 'Grades 1 to 12 • Inquiry-Based Context Modules',
    tagline: 'Comprehensive DP & MYP ready academic worksheets matching global inquiry lines.',
    features: [
      'Inquiry-based extensive subject portfolio chapters',
      'Analytical & question sets provoking conceptual reasoning',
      'MYP and DP ready assessment prep templates',
      'Interdisciplinary inquiry learning packs and guidelines'
    ],
    sampleWorksheets: [
      { code: 'IB_M12_CALC', title: 'Differential Calculus & Limits Integration DP', subject: 'Mathematics', grade: 'Grade 12', questionsCount: 55, hasDPP: true, topics: ['Derivative Limits', 'Tangent Equation', 'Chain Rule'] },
      { code: 'IB_P11_THERMO', title: 'Gas Laws, Ideal Entropy & Thermal Kinetics', subject: 'Physics', grade: 'Grade 11', questionsCount: 38, hasDPP: true, topics: ['Work Done Gas', 'Specific Heat', 'Entropy'] },
      { code: 'IB_B12_GENETICS', title: 'Chromosomes Meiosis & Bio-Genetic Sequence Codes', subject: 'Biology', grade: 'Grade 12', questionsCount: 42, hasDPP: false, topics: ['DNA Mapping', 'Meiosis Phase', 'Transcription Factors'] }
    ]
  }
};

const ENTRANCE_EXAMS = [
  { id: 'jee-adv', name: 'JEE Advanced', category: 'Engineering' },
  { id: 'jee-main', name: 'JEE Mains', category: 'Engineering' },
  { id: 'neet', name: 'NEET', category: 'Medical' },
  { id: 'bitsat', name: 'BITSAT', category: 'Engineering' },
  { id: 'cuet', name: 'CUET', category: 'Undergrad' },
  { id: 'viteee', name: 'VITEEE', category: 'Engineering' },
  { id: 'imo', name: 'IMO (Olympiad)', category: 'Olympiad' },
  { id: 'smc', name: 'SMC Olympiad', category: 'Olympiad' },
  { id: 'ca-found', name: 'CA Foundation', category: 'Professional' },
  { id: 'ipmat', name: 'IPMAT', category: 'Management' },
  { id: 'clat', name: 'CLAT', category: 'Law' }
];

export default function ContentLibraryTabs() {
  const [activeBoard, setActiveBoard] = useState<'CBSE' | 'IGCSE' | 'IB'>('CBSE');
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadSuccessCode, setDownloadSuccessCode] = useState<string | null>(null);

  const activeBoardData = BOARD_DATA[activeBoard];

  // Search logic on worksheets
  const filteredWorksheets = activeBoardData.sampleWorksheets.filter(w =>
    w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSimulateDownload = (code: string) => {
    setDownloadSuccessCode(code);
    setTimeout(() => {
      setDownloadSuccessCode(null);
    }, 2500);
  };

  return (
    <div className="bg-white rounded-3xl border border-maroon-105 p-6 md:p-8 shadow-sm overflow-hidden" id="content-library-preview">
      {/* Search and Tag Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-105 pb-6 mb-8">
        <div className="space-y-1">
          <span className="text-maroon-800 font-mono text-[10px] uppercase font-semibold tracking-widest bg-maroon-50 px-3 py-1 rounded-full border border-maroon-100 inline-block">
            Content IP Repository
          </span>
          <h4 className="text-2xl sm:text-3xl font-serif font-light text-slate-900 mt-2 leading-tight">
            Comprehensive <span className="italic text-maroon-700">Digital Academic</span> Library
          </h4>
          <p className="text-slate-650 text-xs mt-1 font-sans">
            Preview our standard resources index across CBSE, Cambridge, and IB. Search chapters or mock papers.
          </p>
        </div>

        {/* Search Input bar */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-3.5 top-3.5 text-slate-400 w-4.5 h-4.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search core concepts, worksheets..."
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-maroon-600 focus:bg-white transition-all font-sans"
          />
        </div>
      </div>

      {/* Primary Board-Specific Toggle Tabs */}
      <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200 mb-6">
        {(['CBSE', 'IGCSE', 'IB'] as const).map(board => (
          <button
            key={board}
            onClick={() => {
              setActiveBoard(board);
              setSearchQuery('');
            }}
            className={`py-3.5 sm:py-4 rounded-xl text-xs font-bold font-sans transition-all uppercase tracking-wider ${
              activeBoard === board
                ? 'bg-gradient-to-r from-maroon-600 to-maroon-800 text-white shadow-md'
                : 'text-slate-655 hover:text-slate-900'
            }`}
          >
            {board === 'CBSE' ? 'CBSE K-12' : board === 'IGCSE' ? 'Cambridge IGCSE' : 'IB DP/MYP'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Category Specs & features list (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl space-y-4">
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-gold-600 uppercase tracking-widest font-mono">
                BOARD PROFILE
              </span>
              <h5 className="text-lg font-serif font-light text-slate-900 tracking-tight">
                {activeBoardData.title}
              </h5>
              <p className="text-xs text-slate-500 font-sans font-medium">{activeBoardData.subtitle}</p>
            </div>

            <p className="text-xs text-slate-650 leading-relaxed font-sans italic border-l-2 border-maroon-600 pl-3">
              "{activeBoardData.tagline}"
            </p>

            {/* Checklist of characteristics */}
            <div className="space-y-3 pt-2">
              {activeBoardData.features.map((feat, idx) => (
                <div key={idx} className="flex gap-2.5 items-start text-xs font-sans text-slate-700">
                  <CheckSquare className="w-4 h-4 text-maroon-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core IP metrics banner */}
          <div className="bg-gradient-to-br from-maroon-900 to-maroon-950 p-5 rounded-2xl border border-maroon-800 text-white text-center sm:text-left shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-gold-400 font-bold uppercase tracking-wider block">
                  CUMULATIVE DATABASE SIZE
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white block leading-tight">
                  5 Lakh+ Questions
                </span>
                <span className="text-xs text-maroon-150 block">
                  And over 1000+ ready Worksheets & DPP handouts
                </span>
              </div>
              <Sparkles className="w-10 h-10 text-gold-500 opacity-80 shrink-0 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Right Side: Preview Sample worksheets grid directory (7 Columns) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-450 uppercase tracking-widest font-mono flex items-center gap-1.5">
              <FolderOpen className="w-4 h-4 text-maroon-600 block" />
              Syllabus Worksheets Index (Live Filter)
            </span>
            <span className="text-[10px] text-slate-400 font-mono font-bold">
              Showing {filteredWorksheets.length} files
            </span>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredWorksheets.length > 0 ? (
              <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory scrollbar-thin md:flex-col md:overflow-visible md:pb-0 md:space-y-3">
                {filteredWorksheets.map((sheet) => (
                  <motion.div
                    layout
                    key={sheet.code}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-white border border-slate-202 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-maroon-200 hover:shadow-md transition-all group w-[280px] min-w-[280px] max-w-[280px] md:w-full md:min-w-0 md:max-w-none snap-start shrink-0"
                  >
                    <div className="space-y-2.5 flex-1 w-full truncate">
                      <div className="flex items-center gap-2 flex-wrap text-[10px] font-mono">
                        <span className="bg-maroon-50 text-maroon-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                          {sheet.code}
                        </span>
                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                          {sheet.subject}
                        </span>
                        <span className="text-slate-500 font-semibold">{sheet.grade}</span>
                      </div>

                      <div className="space-y-1">
                        <h6 className="text-slate-905 font-bold text-xs sm:text-sm font-sans truncate group-hover:text-maroon-758 transition-colors">
                          {sheet.title}
                        </h6>
                        
                        {/* Topic subpills */}
                        <div className="flex flex-wrap gap-1">
                          {sheet.topics.map(t => (
                            <span key={t} className="text-[9px] bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded font-sans">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center shrink-0 w-full md:w-auto border-t md:border-0 pt-3 md:pt-0 border-slate-100 gap-2">
                      <span className="text-[10px] font-mono text-slate-450 block">REF: {sheet.questionsCount} Standard Qs</span>
                      
                      {downloadSuccessCode === sheet.code ? (
                        <span className="text-success-green font-bold text-[10px] tracking-wide font-mono flex items-center gap-1 bg-green-50 px-2 py-1 rounded border border-green-200">
                          ✓ File Generated
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSimulateDownload(sheet.code)}
                          className="text-maroon-700 hover:bg-maroon-100 hover:text-maroon-900 bg-maroon-50 border border-maroon-150 px-3 py-1.5 rounded-xl text-[10px] font-bold font-sans uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all w-full md:w-auto justify-center"
                        >
                          <Download className="w-3 h-3" />
                          <span>Download Sample</span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <Search className="w-8 h-8 text-slate-300 block mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-550">No worksheet archives match your search query.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-maroon-705 font-bold mt-2 hover:underline"
                >
                  Clear search filters
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Horizontal List of Secondary Competitive exams */}
      <div className="mt-10 pt-6 border-t border-slate-100">
        <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono tracking-widest text-center mb-4">
          Entrance Exams & competitive Olympiad Content Portability:
        </label>
        
        <div className="flex flex-wrap gap-2 justify-center">
          {ENTRANCE_EXAMS.map(exam => (
            <button
              key={exam.id}
              onClick={() => setSelectedExam(selectedExam === exam.id ? null : exam.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedExam === exam.id
                  ? 'bg-maroon-700 text-white shadow-sm ring-2 ring-maroon-100'
                  : 'bg-white border border-slate-205 text-slate-700 hover:border-slate-350 hover:bg-slate-50'
              }`}
            >
              <Tag className="w-3.5 h-3.5 text-gold-500" />
              <span>{exam.name}</span>
            </button>
          ))}
        </div>

        <AnimatePresence>
          {selectedExam && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-slate-50 border border-slate-200 p-4 rounded-xl mt-4 max-w-xl mx-auto text-xs text-slate-705 leading-relaxed font-sans text-center"
            >
              <strong className="text-slate-900 block font-sans text-xs uppercase mb-1">
                {ENTRANCE_EXAMS.find(e => e.id === selectedExam)?.name} Syllabus Module Integration
              </strong>
              Our comprehensive database features fully structured past year questions (PYQs) and adaptive CBT mock modules for {ENTRANCE_EXAMS.find(e => e.id === selectedExam)?.name}. All tests can be branded beautifully with your institutional theme for competitive exam prep batches.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
