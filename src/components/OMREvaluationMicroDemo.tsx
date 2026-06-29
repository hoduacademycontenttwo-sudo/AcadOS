import React, { useState, useEffect } from 'react';
import { Smartphone, CheckCircle2, RefreshCw, BarChart2, Eye, Award, Sliders, Smartphone as ScanIcon, Send, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StudentOMR {
  name: string;
  answers: { [key: number]: string };
  scannedAnswers: { [key: number]: string };
  isEvaluated: boolean;
  score?: number;
  totalQuestions: number;
}

const SHIFT_STUDENTS_LIST = [
  { name: "Aarav Sharma", score: 18, mistakes: [4, 12] },
  { name: "Priya Patel", score: 20, mistakes: [] },
  { name: "Kabir Mehta", score: 14, mistakes: [2, 4, 11, 15, 18] },
  { name: "Ananya Iyer", score: 19, mistakes: [8] },
  { name: "Rahul Deshmukh", score: 15, mistakes: [5, 9, 13, 20] }
];

export default function OMREvaluationMicroDemo() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [markingPositive, setMarkingPositive] = useState<number>(1);
  const [markingNegative, setMarkingNegative] = useState<number>(0);
  
  // Scanning state
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [selectedStudent, setSelectedStudent] = useState<number>(0);
  const [answersFilled, setAnswersFilled] = useState<{ [key: number]: string }>({
    1: 'A', 2: 'B', 3: 'C', 4: 'A', 5: 'D',
    6: 'B', 7: 'C', 8: 'D', 9: 'A', 10: 'B',
    11: 'C', 12: 'D', 13: 'A', 14: 'B', 15: 'C',
    16: 'D', 17: 'A', 18: 'B', 19: 'C', 20: 'D'
  });

  // Evaluate scanned result
  const [evaluatedResult, setEvaluatedResult] = useState<any | null>(null);
  const [dispatchSuccess, setDispatchSuccess] = useState<boolean>(false);

  useEffect(() => {
    let interval: any;
    if (isScanning) {
      setScanProgress(0);
      interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            // Produce scanned results
            const student = SHIFT_STUDENTS_LIST[selectedStudent];
            const incorrectCount = student.mistakes.length;
            const correctCount = questionCount - incorrectCount;
            const finalScore = (correctCount * markingPositive) - (incorrectCount * markingNegative);
            setEvaluatedResult({
              name: student.name,
              score: finalScore,
              maxScore: questionCount * markingPositive,
              correct: correctCount,
              incorrect: incorrectCount,
              percentage: Math.round((correctCount / questionCount) * 100),
              missedList: student.mistakes
            });
            setActiveStep(3);
            return 100;
          }
          return prev + 8;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isScanning, selectedStudent, questionCount, markingPositive, markingNegative]);

  const triggerScan = () => {
    setIsScanning(true);
    setDispatchSuccess(false);
    setEvaluatedResult(null);
  };

  const handleReset = () => {
    setActiveStep(1);
    setIsScanning(false);
    setScanProgress(0);
    setEvaluatedResult(null);
    setDispatchSuccess(false);
  };

  const handleDispatchSMS = () => {
    setDispatchSuccess(true);
  };

  return (
    <div className="bg-white rounded-3xl border border-maroon-100 shadow-sm overflow-hidden" id="omr-evaluation-view">
      {/* Header bar */}
      <div className="bg-slate-900 px-6 sm:px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800">
        <div>
          <span className="text-gold-400 font-mono text-[9px] uppercase tracking-widest bg-gold-400/10 px-2.5 py-0.5 rounded border border-gold-400/20 inline-block font-semibold">
            60-Second Micro-Demo
          </span>
          <h4 className="text-xl sm:text-2xl font-serif text-white font-light tracking-tight mt-1">
            Smartphone <span className="italic text-gold-300">OMR Evaluation</span> Simulator
          </h4>
        </div>
        
        {/* Step indicators */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((step) => (
            <button
              key={step}
              onClick={() => {
                if (step <= activeStep || evaluatedResult) {
                  setActiveStep(step);
                }
              }}
              disabled={step > activeStep && !evaluatedResult}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all ${
                activeStep === step 
                  ? 'bg-maroon-700 border-maroon-600 text-white shadow-sm' 
                  : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              Step {step}: {step === 1 ? 'Configure' : step === 2 ? 'Camera Scan' : 'Analytics'}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8">
        
        {/* STEP 1: CONFIGURE GRID */}
        {activeStep === 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-maroon-800 font-mono text-[9px] uppercase font-semibold tracking-widest bg-maroon-50 px-2 ml-0.5">
                  Academic Set-Up
                </span>
                <h5 className="text-md sm:text-lg font-serif font-light text-slate-900">
                  Select Grid Length and Marking Weightkeys
                </h5>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  AcadOS automatically generates a companion watermarked OMR sheet corresponding with this exact length. Pick a positive and negative marking weight to test automatic scoring.
                </p>
              </div>

              <div className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                {/* Number of Questions */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex justify-between">
                    <span>Number of Questions:</span>
                    <span className="text-maroon-700 font-mono">{questionCount} MCQs</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[10, 20, 30].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          setQuestionCount(num);
                          // rebuild default filled answers
                          const answers: any = {};
                          for (let i = 1; i <= num; i++) {
                            answers[i] = ['A', 'B', 'C', 'D'][Math.floor(Math.sin(i) * 2 + 2) % 4];
                          }
                          setAnswersFilled(answers);
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-mono border transition-all ${
                          questionCount === num 
                            ? 'bg-maroon-50 border-maroon-300 text-maroon-800 font-bold' 
                            : 'bg-white border-slate-205 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {num} MCQs
                      </button>
                    ))}
                  </div>
                </div>

                {/* Score weights */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-widest block">
                      Positive Marks
                    </label>
                    <select
                      value={markingPositive}
                      onChange={(e) => setMarkingPositive(Number(e.target.value))}
                      className="w-full bg-white text-xs border border-slate-205 rounded-xl p-2.5 font-mono text-slate-700 focus:outline-none focus:ring-1 focus:ring-maroon-500"
                    >
                      <option value="1">+1 Mark</option>
                      <option value="2">+2 Marks</option>
                      <option value="4">+4 Marks</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-widest block">
                      Negative Penalty
                    </label>
                    <select
                      value={markingNegative}
                      onChange={(e) => setMarkingNegative(Number(e.target.value))}
                      className="w-full bg-white text-xs border border-slate-205 rounded-xl p-2.5 font-mono text-slate-700 focus:outline-none focus:ring-1 focus:ring-maroon-500"
                    >
                      <option value="0">0 (No Penalty)</option>
                      <option value="0.25">-0.25 Marks</option>
                      <option value="0.5">-0.5 Marks</option>
                      <option value="1">-1.00 Mark</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-500 font-sans block">• Generates standard bubble sizing compatible with poor camera resolutions.</span>
                <span className="text-[10px] text-slate-500 font-sans block">• Fits neatly alongside class assessment name banners.</span>
              </div>

              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="w-full bg-slate-900 hover:bg-slate-850 text-white text-xs font-extrabold uppercase py-3 rounded-xl shadow transition-colors flex items-center justify-center gap-2"
              >
                Assemble OMR Sheet & Scan <ArrowRight className="w-4 h-4 text-gold-400" />
              </button>
            </div>

            {/* Step 1 Visual preview */}
            <div className="lg:col-span-7 flex flex-col justify-between border border-slate-105 rounded-2xl p-6 bg-slate-50/50">
              <div className="border-b border-dashed border-slate-200 pb-4 mb-4">
                <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                  <span>TEMPLATE PREVIEW</span>
                  <span className="text-maroon-700">ACADOS-OMR-GRID-{questionCount}</span>
                </div>
                <h6 className="text-sm font-semibold tracking-tight text-slate-900 mt-2">
                  Mock Mid-Term Examination • Science Grid
                </h6>
              </div>

              <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4 shadow-inner max-h-[290px] overflow-y-auto space-y-2 select-none">
                {Array.from({ length: Math.min(questionCount, 15) }).map((_, index) => {
                  const qNum = index + 1;
                  return (
                    <div key={qNum} className="grid grid-cols-12 items-center text-xs py-1 border-b border-slate-50">
                      <div className="col-span-2 font-mono font-bold text-slate-400 text-center">
                        Q{qNum.toString().padStart(2, '0')}
                      </div>
                      <div className="col-span-10 flex gap-2 justify-center">
                        {['A', 'B', 'C', 'D'].map((option) => (
                          <div 
                            key={option} 
                            className="flex flex-col items-center gap-0.5"
                          >
                            <span className="text-[8px] text-slate-300 font-mono">{option}</span>
                            <div className="w-5 h-5 rounded-full border border-slate-350 flex items-center justify-center text-[9px] font-mono text-slate-400 hover:bg-slate-50 transition-colors">
                              {option}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                {questionCount > 15 && (
                  <p className="text-[10px] text-center text-slate-400 italic pt-1 font-mono">
                    + {questionCount - 15} additional questions mapped in the layout...
                  </p>
                )}
              </div>

              <div className="text-center text-[10px] text-slate-400 font-mono mt-4">
                Designed to operate on standard A4 paper without expensive specialized scanners.
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2: SCANNING SIMULATOR */}
        {activeStep === 2 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-maroon-800 font-mono text-[9px] uppercase font-semibold tracking-widest bg-maroon-50 px-2 ml-0.5">
                  Computer Vision Scan
                </span>
                <h5 className="text-md sm:text-lg font-serif font-light text-slate-900">
                  Point Camera and Read filled circles
                </h5>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  Watch our lightweight, client-side browser framework parse coordinate alignments in real-time. Pick a sample student to scan their unique card.
                </p>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-widest block">
                  Select Student Sheet to Scan:
                </span>
                <div className="space-y-2 max-h-[180px] overflow-y-auto">
                  {SHIFT_STUDENTS_LIST.map((student, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={isScanning}
                      onClick={() => {
                        setSelectedStudent(idx);
                        setEvaluatedResult(null);
                      }}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-sans flex items-center justify-between transition-all ${
                        isScanning ? 'opacity-50 cursor-not-allowed' : ''
                      } ${
                        selectedStudent === idx 
                          ? 'bg-maroon-50 border-maroon-200 text-maroon-900 font-semibold' 
                          : 'bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100/70'
                      }`}
                    >
                      <span className="truncate">{student.name}</span>
                      <span className="font-mono text-[10px] text-slate-400 bg-white border px-1.5 py-0.5 rounded">
                        {student.mistakes.length === 0 ? 'Full Perfect' : `${student.mistakes.length} errors expected`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  disabled={isScanning}
                  onClick={triggerScan}
                  className={`w-full py-3.5 rounded-xl uppercase tracking-wider text-xs font-bold shadow-md flex items-center justify-center gap-2.5 transition-all ${
                    isScanning 
                      ? 'bg-slate-350 text-slate-500 cursor-not-allowed' 
                      : 'bg-maroon-700 hover:bg-maroon-800 text-white cursor-pointer active:scale-98'
                  }`}
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-gold-400" />
                      Vision Processing... {scanProgress}%
                    </>
                  ) : (
                    <>
                      <Smartphone className="w-4.5 h-4.5 text-gold-400" />
                      Evaluate Student Card Now
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* SCANNING CANVAS VIEWPORT */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center border border-slate-200 rounded-2xl p-6 bg-slate-100 border-dashed relative overflow-hidden min-h-[360px]">
              {/* Outer smartphone frame */}
              <div className="w-[280px] h-[340px] bg-slate-900 rounded-[32px] p-2.5 shadow-2xl relative border-4 border-slate-800 relative z-10 flex flex-col overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-800 rounded-b-xl z-20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-slate-900 mr-2" />
                  <div className="w-8 h-1 bg-slate-900 rounded-full" />
                </div>

                <div className="flex-1 bg-white rounded-[24px] p-3 flex flex-col justify-between relative overflow-hidden text-[9px] font-sans text-slate-800">
                  
                  {/* Camera capture screen simulation overlay */}
                  <div className="absolute inset-0 z-10 pointer-events-none border-2 border-dashed border-emerald-500/80 m-4 rounded hover:scale-101 transition-transform">
                    {/* Corner Reticles */}
                    <div className="absolute top-1 left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-emerald-500" />
                    <div className="absolute top-1 right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-emerald-500" />
                    <div className="absolute bottom-1 left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-emerald-500" />
                    <div className="absolute bottom-1 right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-emerald-500" />
                    
                    {/* Align aid indicator red text/rings when inactive, emerald when progress */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full border-2 border-dashed flex items-center justify-center ${isScanning ? 'border-emerald-500 animate-ping' : 'border-red-400'}`} />
                      <span className={`text-[7px] font-mono mt-1 ${isScanning ? 'text-emerald-500' : 'text-slate-400'}`}>
                        {isScanning ? 'OMR TRACKING FIXED' : 'ALIGN TARGET CORNERS'}
                      </span>
                    </div>

                    {/* Scanline laser */}
                    {isScanning && (
                      <motion.div 
                        initial={{ top: '5%' }}
                        animate={{ top: '95%' }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                      />
                    )}
                  </div>

                  {/* Header page sheet within smartphone viewport */}
                  <div className="border-b pb-1.5 border-slate-100">
                    <div className="flex justify-between items-center text-[7px] font-mono text-slate-400">
                      <span>ACADOS SCANNER</span>
                      <span className="text-emerald-500 font-bold">100% CORNERS OK</span>
                    </div>
                    <strong className="text-slate-900 block text-[10px] truncate mt-0.5 mt-1.5">
                      {SHIFT_STUDENTS_LIST[selectedStudent].name}
                    </strong>
                  </div>

                  {/* Bubble lines inside smartphone */}
                  <div className="flex-1 overflow-y-auto space-y-1 py-2 select-none">
                    {Array.from({ length: questionCount }).map((_, i) => {
                      const qNum = i + 1;
                      const isCorrect = !SHIFT_STUDENTS_LIST[selectedStudent].mistakes.includes(qNum);
                      return (
                        <div key={qNum} className="grid grid-cols-12 items-center leading-none">
                          <div className="col-span-2 font-mono text-slate-350 text-[7px]">Q{qNum}</div>
                          <div className="col-span-10 flex gap-1 justify-center">
                            {['A', 'B', 'C', 'D'].map((opt) => {
                              // Simulate some filled bubble
                              const key = (qNum * 7) % 4;
                              const isThisFilled = ['A', 'B', 'C', 'D'][key] === opt;
                              return (
                                <div 
                                  key={opt}
                                  className={`w-3.5 h-3.5 rounded-full border text-[7px] font-mono flex items-center justify-center ${
                                    isThisFilled 
                                      ? 'bg-slate-800 text-white border-slate-850 font-bold' 
                                      : 'bg-white border-slate-200 text-slate-300'
                                  }`}
                                >
                                  {opt}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Loading overlay */}
                  {isScanning && (
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] flex items-center justify-center z-20">
                      <div className="bg-white/95 border border-slate-100 rounded-xl p-3 text-center shadow-lg mx-4">
                        <RefreshCw className="w-5 h-5 text-emerald-500 animate-spin mx-auto mb-1.5" />
                        <strong className="text-slate-900 block text-[9px]">COMPUTING CONTOUR CODES</strong>
                        <span className="text-[8px] text-slate-500 font-mono">GRID PARSE: {scanProgress}%</span>
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-1 border-slate-100 text-[6px] text-slate-400 font-mono flex justify-between items-center bg-slate-50 p-1">
                    <span>LENS: COMPACT RED CODES</span>
                    <span>W-LABEL: OK</span>
                  </div>
                </div>
              </div>

              {/* Faint ambient scan background hints */}
              <div className="absolute inset-0 bg-[radial-gradient(#800000_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
            </div>
          </motion.div>
        )}

        {/* STEP 3: ANALYTICS & RESULTS REPORT */}
        {activeStep === 3 && evaluatedResult && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Results Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-1">
                <span className="text-emerald-700 font-mono text-[9px] uppercase font-bold tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 inline-block">
                  ✓ Evaluation Transmitted
                </span>
                <h5 className="text-lg font-serif font-light text-slate-950">
                  Instant Student Analytics Scorecard
                </h5>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  The computed answers match against our answer templates instantly. All metrics are compiled without human grading delays.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-205 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <div>
                    <h6 className="font-mono font-bold text-xs uppercase text-slate-400 leading-none">STUDENT NAME</h6>
                    <span className="text-md font-bold text-slate-900 mt-1 block">{evaluatedResult.name}</span>
                  </div>
                  <div className="text-right">
                    <h6 className="font-mono font-bold text-xs uppercase text-slate-400 leading-none">SCORE ACCURACY</h6>
                    <span className="text-sm font-mono font-semibold text-emerald-600 mt-1 block">{evaluatedResult.percentage}% Perfect</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-105">
                    <span className="text-[9px] text-slate-400 block font-mono font-semibold">CORRECT</span>
                    <strong className="text-emerald-700 text-lg md:text-xl font-mono">{evaluatedResult.correct}</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-105">
                    <span className="text-[9px] text-slate-450 block font-mono font-semibold">INCORRECT</span>
                    <strong className="text-red-600 text-lg md:text-xl font-mono">{evaluatedResult.incorrect}</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-105">
                    <span className="text-[9px] text-slate-400 block font-mono font-semibold">TOTAL POINTS</span>
                    <strong className="text-slate-900 text-lg md:text-xl font-mono">
                      {evaluatedResult.score}/{evaluatedResult.maxScore}
                    </strong>
                  </div>
                </div>

                {/* Incorrect questions listing */}
                {evaluatedResult.incorrect > 0 ? (
                  <div className="bg-red-50/50 border border-red-100 rounded-xl p-3.5 space-y-1.5">
                    <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block font-mono">
                      CONCEPT ERROR DETECTOR:
                    </span>
                    <p className="text-slate-650 text-[11px]">
                      Student marked incorrect bubbles on questions: <strong className="font-mono">{evaluatedResult.missedList.map((m: any) => `Q${m}`).join(', ')}</strong>. Suggest immediate homework drill re-assignment.
                    </p>
                  </div>
                ) : (
                  <div className="bg-emerald-50/30 border border-emerald-100 rounded-xl p-3.5">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block font-mono">
                      PERFECT COMPILATION:
                    </span>
                    <p className="text-slate-650 text-[11px]">
                      100% correct matching. Concept maps indicates deep topic mastery across CBSE/Cambridge levels.
                    </p>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleDispatchSMS}
                  disabled={dispatchSuccess}
                  className={`w-full py-3 rounded-xl text-xs uppercase font-extrabold tracking-wider shadow transition-all flex items-center justify-center gap-2 ${
                    dispatchSuccess 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-900 hover:bg-slate-850 text-white cursor-pointer active:scale-98'
                  }`}
                >
                  {dispatchSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-gold-400" />
                      Mock Dispatch Completed Successfully
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-gold-400" />
                      Dispatch Direct Report to Parent App
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold uppercase py-2.5 rounded-xl border border-slate-205 transition-colors flex items-center justify-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                  Evaluate Another Sheet (Reset)
                </button>
              </div>
            </div>

            {/* Right Simulation visualization (Score card dispatch sms view) */}
            <div className="lg:col-span-7 flex flex-col justify-between border border-slate-105 rounded-2xl p-6 bg-slate-50/50">
              <div className="border-b border-slate-200 pb-3 mb-4">
                <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                  <span>DISPATCH SYSTEM SIMULATOR</span>
                  <span className="text-gold-500 font-bold">CORE ERP-CRM LINKED</span>
                </div>
                <h6 className="text-sm font-semibold tracking-tight text-slate-900 mt-1">
                  Automatic Score Delivery Preview
                </h6>
              </div>

              <div className="bg-slate-100 rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center flex-1 space-y-4 shadow-inner min-h-[220px]">
                {/* Mock phone notification */}
                <div className="w-[260px] bg-white rounded-2xl p-4 shadow-md border border-slate-205/60 space-y-2 font-sans relative">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <div className="w-6 h-6 rounded-full bg-maroon-700 flex items-center justify-center text-white text-[8px] font-bold">
                      HA
                    </div>
                    <div>
                      <strong className="text-[10px] text-slate-800 font-bold block leading-none">ACADOS SMS SENDER</strong>
                      <span className="text-[8px] text-slate-400 block mt-0.5 font-mono">1 minute ago via sandbox route</span>
                    </div>
                  </div>
                  <p className="text-[10px] leading-relaxed text-slate-650">
                    "Dear Parent, <strong>{evaluatedResult.name}</strong> secured <strong>{evaluatedResult.score} points</strong> in the Mid-Term Exam today ({evaluatedResult.percentage}% accuracy). To view the complete digital error analysis map, login to your AcadOS parent dashboard."
                  </p>
                  
                  {dispatchSuccess && (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute -top-3 -right-3 bg-emerald-600 text-white rounded-full p-1.5 shadow"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </motion.div>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed max-w-sm text-center">
                  When white-labeled, this notification is dispatched using your institution's custom SMS ID sender and instantly triggers push tokens on the dedicated parent-student companion app.
                </p>
              </div>

              <div className="text-center text-[10px] text-slate-400 font-mono mt-4">
                Reduces manual typing tasks for faculty members down to nearly zero.
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
