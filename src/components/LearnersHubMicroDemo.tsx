import React, { useState } from 'react';
import { Compass, BookOpen, ChevronRight, FileText, Download, CheckCircle2, Award, ClipboardList, Send, Smile, Plus, Search, ArrowRight, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MaterialItem {
  name: string;
  type: 'Worksheet' | 'Notes' | 'Syllabus' | 'Exam';
  pages: number;
  assigned: boolean;
}

const SYLLABUS_COURSES = [
  { 
    id: 'math-cbse', 
    board: 'CBSE', 
    grade: 'Grade 10', 
    subject: 'Mathematics', 
    chapters: ['Quadratic Equations', 'Real Numbers', 'Triangles', 'Introduction to Trigonometry'],
    materials: [
      { name: 'Standard Algebra Homework Worksheet v1', type: 'Worksheet', pages: 4, assigned: false },
      { name: 'Comprehensive Formula Cheat Sheet & Reference Pack', type: 'Notes', pages: 2, assigned: false },
      { name: 'CBSE 10-Yr Past board-exam papers parsed (2015-2025)', type: 'Exam', pages: 18, assigned: false },
    ]
  },
  { 
    id: 'phy-cambridge', 
    board: 'Cambridge IGCSE', 
    grade: 'CIE A-Levels', 
    subject: 'Physics', 
    chapters: ['Light - Refraction & Lenses', 'Electromagnetism', 'Atomic Structure & Fusion', 'Thermal Dynamics'],
    materials: [
      { name: 'Optics Ray-diagram Drawing practice drill test', type: 'Worksheet', pages: 5, assigned: false },
      { name: 'Concise Revision Handout - Waves Properties', type: 'Notes', pages: 3, assigned: false },
      { name: 'CIE A-Level Topical Multiple-Choice banks', type: 'Exam', pages: 12, assigned: false },
    ]
  },
  { 
    id: 'chem-ib', 
    board: 'IB Diploma Programme', 
    grade: 'IB Grade 12', 
    subject: 'Chemistry', 
    chapters: ['Stoichiometric Relationships', 'Chemical Bonding & Structure', 'Thermodynamics & Enthalpy', 'Redox Operations'],
    materials: [
      { name: 'Balanced Redox Reactions Worksheet with Marking Guide', type: 'Worksheet', pages: 6, assigned: false },
      { name: 'HL Core Topic Summary notes for revision', type: 'Notes', pages: 4, assigned: false },
      { name: 'IB Chemistry HL Paper 2 Mock questions set', type: 'Exam', pages: 14, assigned: false },
    ]
  }
];

export default function LearnersHubMicroDemo() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedCourseIdx, setSelectedCourseIdx] = useState<number>(0);
  const [selectedChapterIdx, setSelectedChapterIdx] = useState<number>(0);
  const [materialList, setMaterialList] = useState<MaterialItem[]>(SYLLABUS_COURSES[0].materials as MaterialItem[]);
  const [activeMaterialIdx, setActiveMaterialIdx] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Simulation interactions
  const [isAssigning, setIsAssigning] = useState<boolean>(false);
  const [assignSuccess, setAssignSuccess] = useState<boolean>(false);
  const [assignedClassesCount, setAssignedClassesCount] = useState<number>(0);
  const [downloadProgress, setDownloadProgress] = useState<boolean>(false);

  // When course shifts, reset dependent values
  const handleCourseSelect = (index: number) => {
    setSelectedCourseIdx(index);
    setSelectedChapterIdx(0);
    setMaterialList(SYLLABUS_COURSES[index].materials as MaterialItem[]);
    setActiveMaterialIdx(0);
    setSearchTerm('');
    setAssignSuccess(false);
  };

  const startAssignSimulation = (idx: number) => {
    setActiveMaterialIdx(idx);
    setIsAssigning(true);
    setAssignSuccess(false);
    setTimeout(() => {
      setIsAssigning(false);
      setAssignSuccess(true);
      setAssignedClassesCount(prev => prev + 1);
    }, 1200);
  };

  const triggerDownloadSimulation = () => {
    setDownloadProgress(true);
    setTimeout(() => {
      setDownloadProgress(false);
    }, 1500);
  };

  const filteredChapters = SYLLABUS_COURSES[selectedCourseIdx].chapters.filter(ch => 
    ch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl border border-maroon-100 shadow-sm overflow-hidden" id="learners-hub-view">
      {/* Header bar */}
      <div className="bg-slate-900 px-6 sm:px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-850">
        <div>
          <span className="text-gold-400 font-mono text-[9px] uppercase tracking-widest bg-gold-400/10 px-2.5 py-0.5 rounded border border-gold-400/20 inline-block font-semibold">
            60-Second Micro-Demo
          </span>
          <h4 className="text-xl sm:text-2xl font-serif text-white font-light tracking-tight mt-1">
            Learners Hub <span className="italic text-gold-300">Digital Catalog & Class Action</span>
          </h4>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((step) => (
            <button
              key={step}
              type="button"
              onClick={() => {
                if (step <= currentStep || assignSuccess) {
                  setCurrentStep(step);
                }
              }}
              disabled={step > currentStep && !assignSuccess}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all ${
                currentStep === step 
                  ? 'bg-maroon-700 border-maroon-600 text-white shadow-sm' 
                  : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              Step {step}: {step === 1 ? 'Target Board' : step === 2 ? 'Pull Materials' : 'Dispatch Assignment'}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8">
        
        {/* STEP 1: TARGET BOARD */}
        {currentStep === 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-maroon-800 font-mono text-[9px] uppercase font-semibold tracking-widest bg-maroon-50 px-2">
                  Unified Search Index
                </span>
                <h5 className="text-md sm:text-lg font-serif font-light text-slate-900 leading-tight">
                  Pre-configured Curriculums Mapped Under Your Institution's White-Label
                </h5>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  AcadOS comes loaded with thousands of verified chapters, syllabus blueprints, and practice banks. Pick a board profile to begin scanning resources instantly.
                </p>
              </div>

              {/* Board selectors */}
              <div className="space-y-2.5">
                {SYLLABUS_COURSES.map((course, idx) => (
                  <button
                    key={course.id}
                    type="button"
                    onClick={() => handleCourseSelect(idx)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                      selectedCourseIdx === idx 
                        ? 'bg-maroon-50 border-maroon-250 text-maroon-900 shadow-sm' 
                        : 'bg-slate-50 border-slate-205 text-slate-650 hover:bg-slate-100/50'
                    }`}
                  >
                    <BookOpen className={`w-5 h-5 mt-0.5 ${selectedCourseIdx === idx ? 'text-maroon-700' : 'text-slate-400'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono tracking-wider font-bold text-gold-600 block uppercase">
                          {course.board}
                        </span>
                        <span className="text-[9px] text-slate-400 font-sans block bg-white px-1.5 py-0.5 rounded border border-slate-200">
                          {course.grade}
                        </span>
                      </div>
                      <strong className="text-sm mt-1 block tracking-tight font-serif text-slate-900">
                        {course.subject} Full Syllabus
                      </strong>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 self-center" />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="w-full bg-slate-900 hover:bg-slate-850 text-white text-xs font-extrabold uppercase py-3 rounded-xl shadow transition-colors flex items-center justify-center gap-2"
              >
                Scan Available Syllabus Materials <ArrowRight className="w-4 h-4 text-gold-400" />
              </button>
            </div>

            {/* Step 1 Preview details */}
            <div className="lg:col-span-7 flex flex-col justify-between border border-slate-105 rounded-2xl p-6 bg-slate-50/50">
              <div className="space-y-4">
                <div className="border-b border-dashed border-slate-250 pb-3 flex justify-between items-center text-xs text-slate-400 font-mono">
                  <span>ACTIVE REPOSITORY OUTLET</span>
                  <span>STATUS: READY</span>
                </div>
                
                <h6 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                  CHAPTER LISTING ({SYLLABUS_COURSES[selectedCourseIdx].chapters.length} CHAPTERS)
                </h6>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-inner space-y-2">
                  <div className="flex items-center border border-slate-200 bg-slate-50 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 gap-2 mb-3">
                    <Search className="w-3.5 h-3.5 text-slate-405" />
                    <input
                      type="text"
                      placeholder="Search syllabus chapters..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-transparent focus:outline-none flex-1 font-sans text-xs"
                    />
                  </div>

                  <div className="space-y-1 max-h-[160px] overflow-y-auto">
                    {filteredChapters.map((chapter, index) => (
                      <div 
                        key={index}
                        onClick={() => setSelectedChapterIdx(index)}
                        className={`p-2.5 rounded-lg text-xs font-sans text-slate-700 cursor-pointer transition-colors flex items-center justify-between ${
                          selectedChapterIdx === index 
                            ? 'bg-maroon-50 text-maroon-900 font-medium' 
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate">Chapter {index+1}: {chapter}</span>
                        {selectedChapterIdx === index && <CheckCircle2 className="w-3.5 h-3.5 text-maroon-700 shrink-0" />}
                      </div>
                    ))}
                    {filteredChapters.length === 0 && (
                      <p className="text-center text-xs text-slate-400 py-3 italic font-sans">
                        No chapters match search criteria.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-center text-[10px] text-slate-400 font-mono mt-4">
                Saves teachers hours scouring third-party textbooks and manuals.
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2: PULL MATERIALS */}
        {currentStep === 2 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-12 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div className="space-y-1">
                  <span className="text-maroon-850 font-mono text-[9px] uppercase font-bold tracking-widest bg-maroon-50 px-2 rounded-full border border-maroon-105 inline-block">
                    {SYLLABUS_COURSES[selectedCourseIdx].board} • {SYLLABUS_COURSES[selectedCourseIdx].subject}
                  </span>
                  <h5 className="text-lg font-serif font-light text-slate-900 tracking-tight leading-tight">
                    Chapter Handouts & Worksheet Assemblies Available
                  </h5>
                </div>
                
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs font-bold font-mono text-maroon-700 hover:underline flex items-center gap-1 text-left"
                >
                  ← Select Variant Core
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Available outputs list */}
                <div className="lg:col-span-5 space-y-2.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono block mb-1">
                    INDEXED RESOURCES
                  </span>

                  {materialList.map((material, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-colors ${
                        activeMaterialIdx === idx 
                          ? 'bg-maroon-50 border-maroon-250 text-maroon-950' 
                          : 'bg-white border-slate-205 text-slate-650 hover:bg-slate-50/70'
                      }`}
                    >
                      <FileText className={`w-5 h-5 shrink-0 mt-0.5 ${activeMaterialIdx === idx ? 'text-maroon-758' : 'text-slate-400'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded uppercase font-semibold ${
                            material.type === 'Worksheet' 
                              ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                              : material.type === 'Notes' 
                              ? 'bg-amber-50 text-amber-700 border border-amber-100' 
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          }`}>
                            {material.type}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {material.pages} Pages
                          </span>
                        </div>
                        <strong className="text-xs mt-1 block font-sans font-semibold text-slate-900">
                          {material.name}
                        </strong>

                        {/* Interactive Simulations */}
                        <div className="mt-3.5 flex gap-2">
                          <button
                            type="button"
                            onClick={() => startAssignSimulation(idx)}
                            disabled={isAssigning}
                            className="bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-mono leading-none tracking-wide py-1.5 px-3 rounded-lg flex items-center gap-1"
                          >
                            {isAssigning && activeMaterialIdx === idx ? (
                              'Sending...'
                            ) : (
                              <>
                                <Send className="w-2.5 h-2.5 text-gold-400" />
                                Assign to Class
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setActiveMaterialIdx(idx);
                              triggerDownloadSimulation();
                            }}
                            className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-205 text-[10px] font-mono leading-none tracking-wide py-1.5 px-2.5 rounded-lg flex items-center gap-1"
                          >
                            <Download className="w-2.5 h-2.5 text-slate-400" />
                            PDF Preview
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Interactive result simulation preview */}
                <div className="lg:col-span-7 bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#800000_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
                  
                  <div className="relative z-10 space-y-4">
                    <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                      <span>DIGITAL PORTAL OUTPUT PREVIEW</span>
                      <span className="text-gold-500 font-bold">PDF GENERATOR ENGINE</span>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow min-h-[180px] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-3">
                          <div className="w-7 h-7 rounded bg-maroon-100 flex items-center justify-center text-maroon-800 font-extrabold text-[10px]">
                            PDF
                          </div>
                          <div className="truncate">
                            <span className="text-[9px] font-mono text-slate-405 block uppercase">SELECTED FILE</span>
                            <strong className="text-xs text-slate-800 font-bold max-w-sm block truncate">
                              {materialList[activeMaterialIdx]?.name}
                            </strong>
                          </div>
                        </div>

                        {downloadProgress ? (
                          <div className="py-8 text-center space-y-2">
                            <RefreshCw className="w-6 h-6 text-maroon-700 animate-spin mx-auto" />
                            <p className="text-xs text-slate-500 font-mono">Bypassing local watermarks & compiling pdf assets...</p>
                          </div>
                        ) : assignSuccess ? (
                          <div className="py-4 space-y-3">
                            <div className="flex gap-2 items-center text-emerald-800 text-xs font-semibold bg-emerald-50 border border-emerald-100 p-3 rounded-lg">
                              <CheckCircle2 className="w-4.5 h-4.5 shrink-0 text-emerald-600" />
                              <div>
                                <strong className="block">Asset Successfully Dispatched!</strong>
                                <span className="text-[10px] text-slate-550 leading-none block font-medium mt-0.5">
                                  Students logged into their custom portals have been notified.
                                </span>
                              </div>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-normal">
                              Parents get a push report advising that homework <em>"{materialList[activeMaterialIdx]?.name}"</em> is pending, complete with due timestamps.
                            </p>
                          </div>
                        ) : (
                          <div className="text-xs text-slate-600 space-y-2 py-2">
                            <p className="font-bold">✓ Watermarked layout under your school's local name.</p>
                            <p className="font-bold">✓ Fully print-ready, vectorized formatting.</p>
                            <p className="text-slate-450 text-[10px] leading-relaxed">
                              Click "Assign to Class" or "PDF Preview" to watch this catalog dispatch simulation trigger!
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 bg-slate-50/50 p-2 rounded-lg border border-slate-100 self-stretch">
                        <span>PAGES: {materialList[activeMaterialIdx]?.pages}</span>
                        <span>WATERMARK: ACTIVE</span>
                      </div>
                    </div>
                  </div>

                  {assignSuccess && (
                    <div className="pt-4 text-center">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="bg-maroon-700 hover:bg-maroon-800 text-white text-xs font-bold uppercase py-2 px-6 rounded-xl shadow transition-colors inline-flex items-center gap-1.5"
                      >
                        Examine Analytics & Ranks <ArrowRight className="w-4 h-4 text-gold-400" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: ANALYTICS PROGRESS SCREEN */}
        {currentStep === 3 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-emerald-700 font-mono text-[9px] uppercase font-bold tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 inline-block">
                  ✓ Assignments Live
                </span>
                <h5 className="text-lg font-serif font-light text-slate-950 leading-tight">
                  Centralized Homework Intake Tracker
                </h5>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  The moment students complete their drills on standard worksheets or companion OMRs, cohort-wide competency graphics are updated inside Academic Offices.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-205 space-y-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono block">
                  PENDING QUEUE • ACTIVE MONITORS
                </span>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-sans p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="truncate">
                      <strong className="text-slate-800 block truncate">Class 10-A Algebra</strong>
                      <span className="text-[9px] text-slate-400 font-mono block">CBSE Syllabus Tracker</span>
                    </div>
                    <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-100 font-bold px-2 py-0.5 rounded font-mono">
                      14/28 Submitted
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-sans p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="truncate">
                      <strong className="text-slate-800 block truncate">Grade 12 Optics A</strong>
                      <span className="text-[9px] text-slate-400 font-mono block">CIE Physics Syllabus</span>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-150 font-bold px-2 py-0.5 rounded font-mono">
                      24/25 Completed
                    </span>
                  </div>
                </div>

                <div className="bg-maroon-50 border border-maroon-100 rounded-xl p-3.5 space-y-1 text-xs">
                  <span className="font-bold text-maroon-800 block font-sans">Automatic Remedial Logic:</span>
                  <p className="text-slate-650 text-[11px] leading-relaxed">
                    Students scoring under 60% on digital worksheets are automatically assigned sub-chapter backup notes in their study lockers to correct weak chapters.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCurrentStep(1);
                  setAssignSuccess(false);
                }}
                className="w-full bg-slate-900 hover:bg-slate-850 text-white text-xs font-extrabold uppercase py-3 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                Restart Syllabus Search Simulator
              </button>
            </div>

            {/* Right side analytics graphic simulation */}
            <div className="lg:col-span-7 flex flex-col justify-between border border-slate-105 rounded-2xl p-6 bg-slate-50/50">
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-3 flex justify-between items-center text-xs text-slate-405 font-mono">
                  <span>ANALYTICS ENGINE PANEL</span>
                  <span className="text-emerald-600 font-semibold">COHORT PROGRESS REALTIME</span>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow space-y-4">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono block">
                    COHORT DRILL BREAKDOWN ACCURACY
                  </span>

                  <div className="space-y-3">
                    {/* Visual progress bar 1 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-serif">Topic Masters (Algebra Basics)</span>
                        <span className="font-mono text-[10px] text-slate-400">82% Mastery</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-maroon-700 h-full rounded-full" style={{ width: '82%' }} />
                      </div>
                    </div>

                    {/* Visual progress bar 2 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-serif">Critical Areas (Complex Complex Roots)</span>
                        <span className="font-mono text-[10px] text-rose-500">41% Priority Remedial</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-rose-500 h-full rounded-full" style={{ width: '41%' }} />
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 italic font-mono text-center pt-2">
                    Visual diagnostic indices are broadcast directly onto teacher portal profiles.
                  </p>
                </div>
              </div>

              <div className="text-center text-[10px] text-slate-400 font-mono mt-4">
                Simplifies curriculum audit tracking processes across standard education boards.
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
