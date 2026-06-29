import React, { useState, useEffect } from 'react';
import { Clock, RefreshCw, ChevronLeft, ChevronRight, CheckCircle2, Bookmark, Award, Sparkles, Send, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CBTQuestion {
  id: number;
  subject: string;
  chapter: string;
  questionText: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  studentAnswer?: number;
  status: 'unvisited' | 'not_answered' | 'answered' | 'marked_review' | 'answered_marked';
  marks: number;
}

const ASSESSMENT_DATABASE: CBTQuestion[] = [
  {
    id: 1,
    subject: 'Physics',
    chapter: 'Current Electricity',
    questionText: 'A wire of a certain material is stretched slowly by ten per cent. Its new resistance and specific resistance become respectively:',
    options: [
      '1.2 times, 1.3 times',
      '1.21 times, same',
      'both remain the same',
      '1.1 times, 1.1 times'
    ],
    correctAnswer: 1,
    status: 'not_answered', // Start first as Not Answered
    marks: 4
  },
  {
    id: 2,
    subject: 'Physics',
    chapter: 'Units & Dimensions',
    questionText: 'The density of a material, in the shape of a cube, is determined by measuring three sides of the cube and its mass. If the relative errors in measuring the mass and length are 1.5% and 1%, respectively, the maximum error in determining the density is:',
    options: [
      '6% maximum error',
      '2.5% maximum error',
      '3.5% maximum error',
      '4.5% maximum error'
    ],
    correctAnswer: 3,
    status: 'unvisited',
    marks: 4
  },
  {
    id: 3,
    subject: 'Physics',
    chapter: 'Units & Dimensions',
    questionText: 'If Z = (A² * B³) / C⁴, then the relative error ΔZ/Z will be:',
    options: [
      '2(ΔA/A) + 3(ΔB/B) + 4(ΔC/C)',
      '(ΔA/A) + (ΔB/B) + (ΔC/C)',
      '2(ΔA/A) + 3(ΔB/B) - 4(ΔC/C)',
      '(ΔA/A) + (ΔB/B) - (ΔC/C)'
    ],
    correctAnswer: 0,
    status: 'unvisited',
    marks: 4
  },
  {
    id: 4,
    subject: 'Physics',
    chapter: 'Units & Dimensions',
    questionText: 'A torque meter is calibrated to reference standards of mass, length and time each with 5% accuracy. After calibration, the measured torque with this torque meter will have a net accuracy of:',
    options: [
      '15% net accuracy',
      '25% net accuracy',
      '75% net accuracy',
      '5% net accuracy'
    ],
    correctAnswer: 1,
    status: 'unvisited',
    marks: 4
  },
  {
    id: 5,
    subject: 'Physics',
    chapter: 'Units & Dimensions',
    questionText: 'If the length of the pendulum in a pendulum clock increases by 0.1%, then the error in time per day (86400 seconds) is:',
    options: [
      '43.2 seconds',
      '8.64 seconds',
      '86.4 seconds',
      '4.32 seconds'
    ],
    correctAnswer: 0,
    status: 'unvisited',
    marks: 4
  },
  {
    id: 6,
    subject: 'Physics',
    chapter: 'Units & Dimensions',
    questionText: 'An experiment is performed to obtain the value of acceleration due to gravity g by using a simple pendulum of length L. In this experiment time for 100 oscillations is measured by using a watch of 1 second least count and the value is 90.0 seconds. The length L is measured as 20.0 cm by a scale with 1 mm least count. What is the determined error in g?',
    options: [
      '4.4%',
      '2.27%',
      '1.7%',
      '2.7%'
    ],
    correctAnswer: 3,
    status: 'unvisited',
    marks: 4
  },
  {
    id: 7,
    subject: 'Physics',
    chapter: 'Units & Dimensions',
    questionText: 'The relative error in the determination of the surface area of a sphere is α. The relative error in the determination of its volume is:',
    options: [
      '3/2 α',
      '2/3 α',
      'α',
      '5/2 α'
    ],
    correctAnswer: 0,
    status: 'unvisited',
    marks: 4
  },
  {
    id: 8,
    subject: 'Physics',
    chapter: 'Elasticity & Young Modulus',
    questionText: 'A student determined Youngs Modulus of elasticity using the formula Y = M*g*L³ / (4*b*d³*δ). If the least count of equipment is 1g for mass and 0.01mm for depression, the ultimate fractional error is closest to:',
    options: [
      '0.155 fractional error',
      '0.0083 fractional error',
      '0.083 fractional error',
      '0.0155 fractional error'
    ],
    correctAnswer: 3,
    status: 'unvisited',
    marks: 4
  },
  {
    id: 9,
    subject: 'Physics',
    chapter: 'Simple Harmonic Motion',
    questionText: 'A simple pendulum is being used to determine the value of gravitational acceleration g at a certain place. The length of the pendulum is 25.0 cm and a stopwatch with 1s resolution measures the time taken for 40 oscillations to be 50s. The accuracy in g is:',
    options: [
      '5.40%',
      '3.40%',
      '4.40%',
      '2.40%'
    ],
    correctAnswer: 2,
    status: 'unvisited',
    marks: 4
  },
  {
    id: 10,
    subject: 'Physics',
    chapter: 'Current-Voltage Diode',
    questionText: 'The current-voltage relation of a diode is given by I = (e^(1000V/T) - 1) mA. If a student makes an error measuring ±0.01V while measuring a current of 5mA at 300K, what will be the error in current?',
    options: [
      '0.2 mA error',
      '0.02 mA error',
      '0.5 mA error',
      '0.05 mA error'
    ],
    correctAnswer: 0,
    status: 'unvisited',
    marks: 4
  },
  {
    id: 11,
    subject: 'Physics',
    chapter: 'Errors & Measurement',
    questionText: 'In an experiment to measure focal length (f) of a convex lens, the least counts of the measuring scales for the object distance (u) and image distance (v) are Δu and Δv respectively. The error in focal length is modeled by:',
    options: [
      '2f [ Δu/u + Δv/v ]',
      'Δu/u + Δv/v',
      'f² [ Δu/u² + Δv/v² ]',
      'f [ Δu/u + Δv/v ]'
    ],
    correctAnswer: 2,
    status: 'unvisited',
    marks: 4
  },
  {
    id: 12,
    subject: 'Physics',
    chapter: 'Errors & Measurement',
    questionText: 'A physical quantity y is represented by y = m² * r⁻⁴ * g^x * l^(-3/2). If percentage errors in m, r, l and g are 18%, 1%, 0.5% and 4% respectively, and the cumulative error is zero, find x:',
    options: [
      'x = 5',
      'x = 4',
      'x = 8',
      'x = -2'
    ],
    correctAnswer: 1,
    status: 'unvisited',
    marks: 4
  },
  {
    id: 13,
    subject: 'Physics',
    chapter: 'Current Electricity',
    questionText: 'Three resistors of resistance 10 Ohm, 20 Ohm and 30 Ohm are connected in parallel. What is the equivalent resistance of this circuit?',
    options: [
      '5.45 Ohm',
      '60 Ohm',
      '6.0 Ohm',
      '0.18 Ohm'
    ],
    correctAnswer: 0,
    status: 'unvisited',
    marks: 4
  },
  {
    id: 14,
    subject: 'Physics',
    chapter: 'Current Electricity',
    questionText: 'A cell of internal resistance r and EMF E is connected across a variable external resistor R. The maximum power is delivered to R when:',
    options: [
      'R is infinite',
      'R = r',
      'R = r / 2',
      'R = 2r'
    ],
    correctAnswer: 1,
    status: 'unvisited',
    marks: 4
  },
  {
    id: 15,
    subject: 'Physics',
    chapter: 'Electrostatics',
    questionText: 'Two point charges of +2μC and +6μC repel each other with a force of 12 N. If a charge of -2μC is added to each, the new force between them will be:',
    options: [
      '4 N attractive',
      'Zero',
      '8 N repulsive',
      '6 N attractive'
    ],
    correctAnswer: 1,
    status: 'unvisited',
    marks: 4
  },
  {
    id: 16,
    subject: 'Physics',
    chapter: 'Magnetic Effects',
    questionText: 'A proton is moving along a circle of radius 1 m with a speed of 2.5 * 10⁶ m/s in a transverse magnetic field B. The magnetic force acting on the proton is:',
    options: [
      'Proportional to speed squared',
      'Perpendicular to velocity vector',
      'Zero',
      'Along the magnetic field direction'
    ],
    correctAnswer: 1,
    status: 'unvisited',
    marks: 4
  },
  {
    id: 17,
    subject: 'Physics',
    chapter: 'Current Electricity',
    questionText: 'In a potentiometer experiment, the balancing length with a cell is 560 cm. When an external resistance of 10 Ohm is connected parallel to the cell, the balance length shifts to 500 cm. Find the internal resistance of the cell.',
    options: [
      '1.2 Ohm',
      '2.0 Ohm',
      '0.5 Ohm',
      '1.5 Ohm'
    ],
    correctAnswer: 0,
    status: 'unvisited',
    marks: 4
  },
  {
    id: 18,
    subject: 'Physics',
    chapter: 'Current Electricity',
    questionText: 'A copper wire is stretched to double its initial length. Assuming that its density remains constant, the percentage change in its electrical resistance will be:',
    options: [
      '100% increase',
      '200% increase',
      '300% increase',
      '400% increase'
    ],
    correctAnswer: 2,
    status: 'unvisited',
    marks: 4
  },
  {
    id: 19,
    subject: 'Physics',
    chapter: 'Magnetism',
    questionText: 'A temporary magnet of high retentivity and low coercivity is suitable for making:',
    options: [
      'Permanent magnets',
      'Electromagnet cores',
      'Transformer stampings',
      'Loudspeaker magnets'
    ],
    correctAnswer: 1,
    status: 'unvisited',
    marks: 4
  },
  {
    id: 20,
    subject: 'Physics',
    chapter: 'Drift Velocity',
    questionText: 'If the electric field inside a copper wire conductor is doubled, the drift velocity of free conduction electrons will:',
    options: [
      'Become doubled',
      'Remain unchanged',
      'Gain four-fold magnitude',
      'Reduce to half value'
    ],
    correctAnswer: 0,
    status: 'unvisited',
    marks: 4
  }
];

export default function CBTPlayground() {
  const [questions, setQuestions] = useState<CBTQuestion[]>(ASSESSMENT_DATABASE);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [timerCount, setTimerCount] = useState<number>(3597); // 59 mins 57 secs mock countdown
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number | undefined>(undefined);

  // Sync chosen option when active index changes
  useEffect(() => {
    setSelectedOption(questions[activeIdx].studentAnswer);
  }, [activeIdx, questions]);

  // Timer simulation countdown
  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setTimerCount(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted]);

  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const activeQuestion = questions[activeIdx];

  // Action: Save & Next
  const handleSaveAndNext = () => {
    setQuestions(prev => {
      const updated = [...prev];
      if (selectedOption !== undefined) {
        updated[activeIdx].studentAnswer = selectedOption;
        updated[activeIdx].status = 'answered';
      } else {
        // If unvisited or not clicked, set as not answered
        updated[activeIdx].status = 'not_answered';
      }
      return updated;
    });

    // Advance index
    if (activeIdx < questions.length - 1) {
      const nextIdx = activeIdx + 1;
      setQuestions(prev => {
        const updated = [...prev];
        if (updated[nextIdx].status === 'unvisited') {
          updated[nextIdx].status = 'not_answered';
        }
        return updated;
      });
      setActiveIdx(nextIdx);
    }
  };

  // Action: Clear selection
  const handleClear = () => {
    setSelectedOption(undefined);
    setQuestions(prev => {
      const updated = [...prev];
      updated[activeIdx].studentAnswer = undefined;
      updated[activeIdx].status = 'not_answered';
      return updated;
    });
  };

  // Action: Mark for Review & Next
  const handleMarkReviewAndNext = () => {
    setQuestions(prev => {
      const updated = [...prev];
      // Cleans student answer first if only marked for review without choosing
      updated[activeIdx].studentAnswer = selectedOption;
      updated[activeIdx].status = selectedOption !== undefined ? 'answered_marked' : 'marked_review';
      return updated;
    });

    if (activeIdx < questions.length - 1) {
      const nextIdx = activeIdx + 1;
      setQuestions(prev => {
        const updated = [...prev];
        if (updated[nextIdx].status === 'unvisited') {
          updated[nextIdx].status = 'not_answered';
        }
        return updated;
      });
      setActiveIdx(nextIdx);
    }
  };

  // Action: Save & Mark for Review & Next
  const handleSaveMarkReviewAndNext = () => {
    if (selectedOption === undefined) {
      // Must have selected option to save and mark
      alert("Please select an option before saving and marking for review.");
      return;
    }
    setQuestions(prev => {
      const updated = [...prev];
      updated[activeIdx].studentAnswer = selectedOption;
      updated[activeIdx].status = 'answered_marked';
      return updated;
    });

    if (activeIdx < questions.length - 1) {
      const nextIdx = activeIdx + 1;
      setQuestions(prev => {
        const updated = [...prev];
        if (updated[nextIdx].status === 'unvisited') {
          updated[nextIdx].status = 'not_answered';
        }
        return updated;
      });
      setActiveIdx(nextIdx);
    }
  };

  // Direct jump from matrix
  const handleJumpQuestion = (targetIdx: number) => {
    // If current was unvisited, mark it as not answered when leaving
    setQuestions(prev => {
      const updated = [...prev];
      if (updated[activeIdx].status === 'unvisited') {
        updated[activeIdx].status = 'not_answered';
      }
      
      // Also mark target as not_answered if it was unvisited
      if (updated[targetIdx].status === 'unvisited') {
        updated[targetIdx].status = 'not_answered';
      }
      return updated;
    });
    setActiveIdx(targetIdx);
  };

  const handleBack = () => {
    if (activeIdx > 0) {
      setActiveIdx(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (activeIdx < questions.length - 1) {
      setActiveIdx(prev => prev + 1);
    }
  };

  const handleSubmitTest = () => {
    setIsCompleted(true);
  };

  const handleRestart = () => {
    setQuestions(ASSESSMENT_DATABASE.map(q => ({
      ...q,
      studentAnswer: undefined,
      status: q.id === 1 ? 'not_answered' : 'unvisited'
    })));
    setActiveIdx(0);
    setTimerCount(3597);
    setIsCompleted(false);
    setSelectedOption(undefined);
  };

  // Dynamically calculate counts
  const countNotVisited = questions.filter(q => q.status === 'unvisited').length;
  const countNotAnswered = questions.filter(q => q.status === 'not_answered').length;
  const countAnswered = questions.filter(q => q.status === 'answered').length;
  const countMarkedReview = questions.filter(q => q.status === 'marked_review').length;
  const countAnsweredMarked = questions.filter(q => q.status === 'answered_marked').length;

  const totalScore = questions.reduce((total, q) => {
    if (q.studentAnswer === undefined) return total;
    return q.studentAnswer === q.correctAnswer ? total + 4 : total - 1;
  }, 0);

  const correctAnswersCount = questions.filter(q => q.studentAnswer !== undefined && q.studentAnswer === q.correctAnswer).length;
  const wrongAnswersCount = questions.filter(q => q.studentAnswer !== undefined && q.studentAnswer !== q.correctAnswer).length;
  const answeredQuestionsCount = questions.filter(q => q.studentAnswer !== undefined).length;

  return (
    <div className="bg-slate-100 rounded-[28px] border border-maroon-100 shadow-2xl overflow-hidden font-sans select-none" id="cbt-simulator">
      
      {/* 1. TOP DEEP RED BURGUNDY BRANDING BAR */}
      <div className="bg-maroon-850 py-3 px-6 text-white flex justify-between items-center z-10 relative">
        <div className="space-y-0.5">
          <h2 className="text-sm md:text-md uppercase font-bold tracking-wider font-sans text-white">
            Current Electricity MOCK TEST (16.06.2026)
          </h2>
          <p className="text-[10px] md:text-xs text-maroon-200 font-light font-sans">
            Question {activeIdx + 1} of {questions.length}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Timer Display styled accurately like photo */}
          <div className="flex items-center gap-2 bg-maroon-900/50 border border-maroon-700/60 px-3.5 py-1.5 rounded-full text-white font-mono text-xs sm:text-sm font-bold shadow-inner">
            <Clock className="w-4 h-4 text-golden-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>{formatTimer(timerCount)}</span>
          </div>

          <button 
            onClick={handleSubmitTest}
            className="p-1 px-3 bg-red-850 hover:bg-red-900 border border-red-700 text-slate-100 text-[10px] font-bold rounded uppercase tracking-wider"
            title="Exit Test"
          >
            Exit
          </button>
        </div>
      </div>

      {!isCompleted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 bg-slate-50 min-h-[580px]">
          
          {/* LEFT: MAIN QUESTIONS SUB-SYSTEM (9 COLUMNS) */}
          <div className="lg:col-span-9 p-4 sm:p-6 flex flex-col justify-between bg-slate-50">
            <div>
              {/* Question card frame */}
              <div className="bg-white border border-slate-200 rounded-[20px] p-5 sm:p-6 shadow-sm relative">
                
                {/* Meta Question Info Row */}
                <div className="flex justify-between items-center pb-3 border-b border-dashed border-slate-200 mb-4 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 text-sm">Question {activeQuestion.id}:</span>
                    <span className="px-2 py-0.5 border border-slate-300 rounded font-bold text-slate-500 bg-slate-50 tracking-wider">
                      Single Choice
                    </span>
                  </div>
                  <span className="font-extrabold text-xs text-maroon-800 bg-maroon-50 border border-maroon-105 rounded px-3 py-1 font-mono">
                    {activeQuestion.marks} Marks
                  </span>
                </div>

                {/* Question Paragraph */}
                <p className="text-slate-800 text-sm sm:text-base font-medium leading-relaxed mb-6">
                  {activeQuestion.questionText}
                </p>

                {/* Option list */}
                <div className="space-y-3">
                  {activeQuestion.options.map((optionText, oIdx) => {
                    const charLabel = String.fromCharCode(65 + oIdx);
                    const isSelected = selectedOption === oIdx;

                    return (
                      <button
                        key={oIdx}
                        onClick={() => setSelectedOption(oIdx)}
                        className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all duration-150 flex items-center gap-4 ${
                          isSelected
                            ? 'bg-blue-50/60 border-blue-400 text-blue-900 shadow-sm ring-1 ring-blue-100'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        <span className={`w-8 h-8 rounded-full text-xs font-bold font-mono flex items-center justify-center border transition-all shrink-0 ${
                          isSelected
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'bg-slate-100 border-slate-250 text-slate-500'
                        }`}>
                          {charLabel}
                        </span>
                        <span className="font-medium">{optionText}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. FIRST BUTTON BAR: OPERATIONS ROW */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-6">
                <button
                  onClick={handleSaveAndNext}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-xs uppercase tracking-wider py-3 px-5 sm:px-6 rounded-lg transition-all shadow-sm"
                >
                  Save & Next
                </button>
                
                <button
                  onClick={handleClear}
                  className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-extrabold text-xs sm:text-xs uppercase tracking-wider py-3 px-5 sm:px-6 rounded-lg transition-all shadow-sm"
                >
                  Clear option
                </button>

                <button
                  onClick={handleMarkReviewAndNext}
                  className="bg-violet-750 hover:bg-violet-850 text-white font-extrabold text-xs sm:text-xs uppercase tracking-wider py-3 px-4 sm:px-5 rounded-lg transition-all shadow-sm"
                >
                  Mark for Review & Next
                </button>

                <button
                  onClick={handleSaveMarkReviewAndNext}
                  className="bg-blue-650 hover:bg-blue-750 text-white font-extrabold text-xs sm:text-xs uppercase tracking-wider py-3 px-4 sm:px-5 rounded-lg transition-all shadow-sm"
                >
                  Save & Mark for Review & Next
                </button>
              </div>
            </div>

            {/* 3. SECOND BUTTON BAR: NAVIGATION & SUBMIT */}
            <div className="border-t border-slate-200 mt-6 pt-4 flex justify-between items-center flex-wrap gap-4">
              <div className="flex gap-2">
                <button
                  onClick={handleBack}
                  disabled={activeIdx === 0}
                  className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold uppercase hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white flex items-center gap-1 text-slate-800"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeIdx === questions.length - 1}
                  className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold uppercase hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white flex items-center gap-1 text-slate-800"
                >
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleSubmitTest}
                className="bg-red-650 hover:bg-red-750 text-white font-bold text-xs sm:text-sm uppercase tracking-wide px-7 py-2.5 rounded-lg transition-all flex items-center gap-1.5 shadow-md"
              >
                <Send className="w-3.5 h-3.5" /> Submit Assessment
              </button>
            </div>
          </div>

          {/* RIGHT: QUESTION PALETTE SIDEBAR (3 COLUMNS) */}
          <div className="lg:col-span-3 p-4 sm:p-5 bg-white flex flex-col justify-between">
            <div className="space-y-4">
              {/* Sidebar Header */}
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest font-mono">
                  Question Palette
                </h3>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Status Color Summary Blocks Grid */}
              <div className="grid grid-cols-2 gap-2 text-[10px] sm:text-[11px] text-slate-600 font-sans border border-slate-100 p-2.5 rounded-xl bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-slate-150 border border-slate-250 flex items-center justify-center font-bold font-mono text-[10px] text-slate-600 shrink-0">
                    {countNotVisited}
                  </span>
                  <span className="truncate">Not Visited</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-red-600 border border-red-500 flex items-center justify-center font-bold font-mono text-[10px] text-white shrink-0">
                    {countNotAnswered}
                  </span>
                  <span className="truncate">Not Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-emerald-600 border border-emerald-500 flex items-center justify-center font-bold font-mono text-[10px] text-white shrink-0">
                    {countAnswered}
                  </span>
                  <span className="truncate">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-violet-750 border border-violet-650 flex items-center justify-center font-bold font-mono text-[10px] text-white shrink-0">
                    {countMarkedReview}
                  </span>
                  <span className="truncate">For Review</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <span className="w-6 h-6 rounded-md bg-blue-650 border border-blue-550 flex items-center justify-center font-bold font-mono font-black text-[10px] text-white shrink-0">
                    {countAnsweredMarked}
                  </span>
                  <span>Answered & Marked for Review</span>
                </div>
              </div>

              {/* Question Number Matrix Grid (columns aligned) */}
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2 font-mono">
                  Select Question to Navigate:
                </p>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 pt-1">
                  {questions.map((q, idx) => {
                    const isActive = idx === activeIdx;
                    let styleClass = 'bg-slate-100 border-slate-250 text-slate-700';

                    if (q.status === 'not_answered') {
                      styleClass = 'bg-red-600 border-red-500 text-white';
                    } else if (q.status === 'answered') {
                      styleClass = 'bg-emerald-600 border-emerald-500 text-white';
                    } else if (q.status === 'marked_review') {
                      styleClass = 'bg-violet-750 border-violet-650 text-white';
                    } else if (q.status === 'answered_marked') {
                      styleClass = 'bg-blue-650 border-blue-550 text-white font-bold';
                    }

                    if (isActive) {
                      styleClass += ' ring-2 ring-blue-500 ring-offset-2 ring-offset-white';
                    }

                    return (
                      <button
                        key={q.id}
                        onClick={() => handleJumpQuestion(idx)}
                        className={`w-10 h-10 rounded-lg border text-xs font-bold font-mono transition-all duration-150 flex items-center justify-center ${styleClass}`}
                      >
                        {q.id}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar bottom micro info */}
            <div className="mt-8 border-t border-slate-100 pt-3">
              <div className="bg-maroon-50 rounded-xl p-3 border border-maroon-105 text-[11px] leading-relaxed text-slate-600 text-center font-sans">
                <strong>AcadOS Exam Guard:</strong> All interactions logged securely on custom university dashboard.
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* COMPLETED STATE (DIAGNOSTIC REPORT OVERVIEW) */
        <div className="p-6 sm:p-8 bg-slate-50 text-slate-900 border-t border-slate-200">
          <div className="max-w-4xl mx-auto space-y-6">
            
            <div className="p-6 bg-gradient-to-br from-white to-slate-50 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left space-y-1.5">
                <span className="bg-gold-500 text-maroon-950 font-bold font-mono text-[9px] uppercase px-3 py-1 rounded-full border border-gold-600 inline-block">
                  INSTANT DIAGNOSIS COMPLETED
                </span>
                <h4 className="text-xl sm:text-2xl font-serif text-slate-900 font-light leading-tight">
                  CBT Scorecard Analysis
                </h4>
                <p className="text-xs sm:text-sm text-slate-550 max-w-md">
                  Report generated instantly under your white-labeled university platform. Scores are mapped to custom diagnostic student tracks.
                </p>
              </div>

              {/* Graphical score block */}
              <div className="relative w-32 h-32 flex items-center justify-center bg-white rounded-full shadow-inner border border-slate-100 shrink-0">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="54" fill="transparent" stroke="#f1f5f9" strokeWidth="10" />
                  <circle cx="64" cy="64" r="54" fill="transparent" stroke="#B03A2E" strokeWidth="10" 
                    strokeDasharray={2 * Math.PI * 54}
                    strokeDashoffset={2 * Math.PI * 54 * (1 - Math.max(0, totalScore) / 80)} // max possible score is 20 * 4 = 80
                  />
                </svg>
                <div className="absolute text-center flex flex-col">
                  <span className="text-2xl font-black text-slate-800 font-mono tracking-tighter">
                    {totalScore}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest font-mono">
                    / 80 Pts
                  </span>
                </div>
              </div>
            </div>

            {/* General metrics cards row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Answered</span>
                <span className="block text-xl font-black text-blue-600 font-mono">{answeredQuestionsCount} / 20</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Correct Fields</span>
                <span className="block text-xl font-black text-emerald-600 font-mono">{correctAnswersCount}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Incorrect Fields</span>
                <span className="block text-xl font-black text-red-500 font-mono">{wrongAnswersCount}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Accuracy Rate</span>
                <span className="block text-xl font-black text-indigo-600 font-mono">
                  {answeredQuestionsCount > 0 ? Math.round((correctAnswersCount / answeredQuestionsCount) * 100) : 0}%
                </span>
              </div>
            </div>

            {/* Custom diagnostic answers map */}
            <div className="space-y-3 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
              <h5 className="text-xs font-black text-slate-800 uppercase tracking-widest font-mono pb-2 border-b border-slate-100">
                Detailed Concept Diagnostics Map
              </h5>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {questions.map((q, idx) => {
                  const isCorrect = q.studentAnswer === q.correctAnswer;
                  const isNotAns = q.studentAnswer === undefined;
                  return (
                    <div key={q.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex justify-between items-center text-xs gap-4">
                      <div>
                        <span className="font-bold text-slate-700 block mb-0.5">
                          Q{idx + 1}. {q.chapter}
                        </span>
                        <span className="text-slate-500 font-sans block text-[11px] leading-relaxed">
                          {isNotAns 
                            ? 'Skipped / Unanswered' 
                            : isCorrect 
                              ? 'Correct answer submitted! Concept fully verified.' 
                              : `Incorrect answer. Selected Option key: ${String.fromCharCode(65 + (q.studentAnswer || 0))}, Correct Option key: ${String.fromCharCode(65 + q.correctAnswer)}`}
                        </span>
                      </div>

                      <span className={`shrink-0 text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded ${
                        isNotAns 
                          ? 'bg-slate-200 text-slate-500' 
                          : isCorrect 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                            : 'bg-red-100 text-red-800 border border-red-200'
                      }`}>
                        {isNotAns ? 'Unanswered' : isCorrect ? '+4 Marks' : '-1 Mark'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Restart panel */}
            <div className="flex justify-center">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 bg-maroon-800 hover:bg-maroon-900 text-white font-extrabold text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-all shadow-md active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5 text-gold-400" />
                <span>Restart CBT Mock Experience</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
