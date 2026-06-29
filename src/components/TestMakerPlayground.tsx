import React, { useState, useEffect } from 'react';
import { Sparkles, Printer, Eye, ClipboardCheck, ArrowRight, Settings, CheckCircle2, RotateCcw, FileText, HelpCircle, Layers, Smartphone, Send, Sliders, Edit, Trash2, Plus, ChevronRight, ChevronLeft, Undo, Redo, Layout, Download, ChevronDown, BookOpen, RefreshCw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface MockQuestion {
  id: string;
  qNo: string;
  type: string;
  marks: number;
  year?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questionText: string;
  options: string[];
  correctAnswer: string;
  solution?: string;
}

const SAMPLE_GENERATED_QUESTIONS: MockQuestion[] = [
  {
    id: 'M1',
    qNo: 'Q1',
    type: 'MCQ',
    marks: 1,
    year: '2018',
    difficulty: 'Easy',
    questionText: 'The density of a material, in the shape of a cube, is determined by measuring three sides of the cube and its mass. If the relative errors in measuring the mass and length are 1.5% and 1%, respectively, the maximum error in determining the density is:',
    options: ['6%', '2.5%', '3.5%', '4.5%'],
    correctAnswer: 'D. 4.5%',
    solution: 'Relative error in density (ρ = M/L³) is: Δρ/ρ = ΔM/M + 3(ΔL/L) = 1.5% + 3(1%) = 1.5% + 3% = 4.5%.'
  },
  {
    id: 'M2',
    qNo: 'Q2',
    type: 'MCQ',
    marks: 1,
    year: '2022',
    difficulty: 'Easy',
    questionText: 'If Z = (A² * B³) / C⁴, then the relative error in Z will be:',
    options: [
      '(2ΔA / A) + (3ΔB / B) + (4ΔC / C)',
      '(ΔA / A) + (ΔB / B) + (ΔC / C)',
      '(2ΔA / A) + (3ΔB / B) - (4ΔC / C)',
      '(ΔA / A) + (ΔB / B) - (ΔC / C)'
    ],
    correctAnswer: 'A. (2ΔA / A) + (3ΔB / B) + (4ΔC / C)',
    solution: 'Relative errors always add up to compute maximum worst-case error. Powers act as multiplying factors.'
  },
  {
    id: 'M3',
    qNo: 'Q3',
    type: 'MCQ',
    marks: 1,
    year: '2022',
    difficulty: 'Easy',
    questionText: 'A torque meter is calibrated to reference standards of mass, length and time each with 5% accuracy. After calibration, the measured torque with this torque meter will have net accuracy of:',
    options: ['15%', '25%', '75%', '5%'],
    correctAnswer: 'B. 25%',
    solution: 'Torque = r * m * a = r * m * d / t². Max relative error is Δr/r + Δm/m + Δd/d + 2(Δt/t) = 5% + 5% + 5% + 2(5%) = 25%.'
  },
  {
    id: 'M4',
    qNo: 'Q4',
    type: 'MCQ',
    marks: 1,
    year: '2021',
    difficulty: 'Easy',
    questionText: 'If the length of the pendulum in pendulum clock increases by 0.1%, then the error in time per day is:',
    options: ['43.2s', '8.64s', '86.4s', '4.32s'],
    correctAnswer: 'A. 43.2s',
    solution: 'Time period T is proportional to L^(1/2). Relative error is ΔT/T = 0.5 * ΔL/L = 0.5 * 0.1% = 0.05%. Secure error in a day is 86400 * 0.0005 = 43.2s.'
  },
  {
    id: 'M5',
    qNo: 'Q5',
    type: 'MCQ',
    marks: 1,
    year: '2020',
    difficulty: 'Easy',
    questionText: 'An experiment is performed to obtain the value of acceleration due to gravity g by using a simple pendulum of length L. In this experiment time for 100 oscillations is measured by using a watch of 1 second least count and the value is 90.0 seconds. The length L is measured by using a meter scale of least count 1 mm and the value is 20.0 cm. The error in the determination of g would be:',
    options: ['4.4%', '2.27%', '1.7%', '2.7%'],
    correctAnswer: 'D. 2.7%',
    solution: 'Δg/g = ΔL/L + 2ΔT/T = 0.1/20 + 2*(1/90) = 0.5% + 2.22% = 2.72%.'
  },
  {
    id: 'M6',
    qNo: 'Q6',
    type: 'MCQ',
    marks: 1,
    year: '2019',
    difficulty: 'Easy',
    questionText: 'The relative error in the determination of the surface area of a sphere is α. The relative error in region volume is:',
    options: ['3/2 α', '2/3 α', 'α', '5/2 α'],
    correctAnswer: 'A. 3/2 α',
    solution: 'Area is proportional to r², so ΔA/A = 2Δr/r = α => Δr/r = α/2. Volume is proportional to r³, so ΔV/V = 3Δr/r = 3/2 α.'
  }
];

// Dynamic question bank mapping
const CHAPTERS_BY_SUBJECT: Record<string, string[]> = {
  'Physics': [
    'Units, Dimensions & Errors of Measurement',
    'Kinematics (Motion in 1D & 2D)',
    'Laws of Motion',
    'Work, Power & Energy'
  ],
  'Chemistry': [
    'Some Basic Concepts of Chemistry (Stoichiometry)',
    'Structure of Atom',
    'Chemical Bonding & Molecular Structure',
    'Thermodynamics & Enthalpy'
  ],
  'Mathematics': [
    'Sets, Relations & Functions',
    'Quadratic Equations',
    'Complex Numbers & Trigonometry',
    'Limits, Continuity and Differentiability'
  ],
  'Biology': [
    'The Living World & Biological Classification',
    'Plant Kingdom',
    'Animal Kingdom',
    'Cell: The Unit of Life'
  ]
};

// Precise mathematical details helper
function molar_formula(moles: number, volL: number) {
  return `${moles.toFixed(3)} moles / ${volL.toFixed(3)} L`;
}

// Generate exactly 30 high-quality unique questions per chapter
function getQuestionsForChapter(subject: string, chapter: string): MockQuestion[] {
  const list: MockQuestion[] = [];
  for (let i = 1; i <= 30; i++) {
    let questionText = '';
    let options: string[] = [];
    let correctAnswer = '';
    let solution = '';
    let type = 'MCQ';
    let difficulty: 'Easy' | 'Medium' | 'Hard' = 'Medium';
    
    if (i % 3 === 1) difficulty = 'Easy';
    else if (i % 3 === 2) difficulty = 'Medium';
    else difficulty = 'Hard';

    const cleanCh = chapter.replace(/[^a-zA-Z0-9]/g, '');
    const qId = `${subject}-${cleanCh}-${i}`;
    const yearNum = 2016 + (i % 10);
    const marks = subject === 'Biology' ? 1 : 4;
    
    if (subject === 'Physics') {
      if (chapter.includes('Units') || chapter.includes('Errors')) {
        const index = i % 3;
        if (index === 0) {
          questionText = `In a vernier caliper, ${10 + (i % 5)} divisions of vernier scale coincide with ${9 + (i % 5)} divisions of main scale. If 1 division of main scale is ${i % 2 === 0 ? '1 mm' : '0.5 mm'}, the least count of the instrument is:`;
          const lcVal = (i % 2 === 0 ? 1 : 0.5) / (10 + (i % 5));
          options = [`${lcVal.toFixed(3)} mm`, `${(lcVal * 2).toFixed(3)} mm`, `${(lcVal / 2).toFixed(3)} mm`, `None of these`];
          correctAnswer = `A. ${lcVal.toFixed(3)} mm`;
          solution = `Least Count = 1 MSD - 1 VSD = 1 MSD - ((N-1)/N) MSD = (1/N) MSD. N = ${10 + (i % 5)} and MSD = ${i % 2 === 0 ? '1 mm' : '0.5 mm'}. Hence, LC = ${lcVal.toFixed(3)} mm.`;
        } else if (index === 1) {
          const errM = 1.5 + (i % 3);
          const errV = 1.0 + (i % 4);
          questionText = `The percentage error in the measurement of mass and speed are ${errM}% and ${errV}% respectively. What is the maximum percentage error in the estimation of kinetic energy?`;
          const ansVal = errM + 2 * errV;
          options = [`${ansVal.toFixed(1)}%`, `${(errM + errV).toFixed(1)}%`, `${(errM * errV).toFixed(1)}%`, `${(errM + 3 * errV).toFixed(1)}%`];
          correctAnswer = `A. ${ansVal.toFixed(1)}%`;
          solution = `Kinetic Energy, KE = 0.5 * m * v². The percentage error in KE is ΔKE/KE% = Δm/m% + 2 * Δv/v% = ${errM}% + 2 * ${errV}% = ${ansVal.toFixed(1)}%.`;
        } else {
          questionText = `A physical quantity X is given by A^${(i % 2) + 2} * B^${(i % 2) + 1}. If percentage errors in A and B are ${(1.0 + (i % 2)).toFixed(1)}% and ${(2.0 + (i % 3)).toFixed(1)}% respectively, find the worst-case maximum relative error in X.`;
          const expA = (i % 2) + 2;
          const expB = (i % 2) + 1;
          const errA = 1.0 + (i % 2);
          const errB = 2.0 + (i % 3);
          const ansVal = expA * errA + expB * errB;
          options = [`${ansVal.toFixed(1)}%`, `${(ansVal / 2).toFixed(1)}%`, `${(ansVal * 1.5).toFixed(1)}%`, `${(ansVal + 1.2).toFixed(1)}%`];
          correctAnswer = `A. ${ansVal.toFixed(1)}%`;
          solution = `Worst-case error combines fractional errors weighted by exponents linearly: ΔX/X = ${expA}*(ΔA/A) + ${expB}*(ΔB/B) = ${expA}*${errA}% + ${expB}*${errB}% = ${ansVal.toFixed(1)}%.`;
        }
      } else if (chapter.includes('Kinematics')) {
        const speed = 20 + i;
        questionText = `A projectile is projected with initial speed of ${speed} m/s at an angle of ${i % 2 === 0 ? '45°' : '30°'} to the horizontal. The maximum horizontal range achieved is (take g = 10 m/s²):`;
        const angleRad = (i % 2 === 0 ? 45 : 30) * Math.PI / 180;
        const range = (speed * speed * Math.sin(2 * angleRad)) / 10;
        options = [`${range.toFixed(2)} m`, `${(range * 1.2).toFixed(2)} m`, `${(range / 1.5).toFixed(2)} m`, `${(range * 2).toFixed(2)} m`];
        correctAnswer = `A. ${range.toFixed(2)} m`;
        solution = `Horizontal range R = u²sin(2θ)/g. Here u = ${speed} m/s, θ = ${i % 2 === 0 ? '45°' : '30°'}, sin(2θ) = ${Math.sin(2 * angleRad).toFixed(3)}. R = ${range.toFixed(2)} meters.`;
      } else if (chapter.includes('Laws')) {
        questionText = `A block of mass ${2 + i} kg lies on a rough inclined plane of inclination 30°. If the coefficient of static friction is ${(0.15 + (i * 0.01)).toFixed(2)}, find the minimum force parallel to the incline required to pull it upwards (g = 10 m/s²):`;
        options = [`F = mg(sin 30° + μ cos 30°)`, `F = mg(sin 30° - μ cos 30°)`, `F = μ mg cos 30°`, `None of these`];
        correctAnswer = `A. F = mg(sin 30° + μ cos 30°)`;
        solution = `To pull the body upwards, the pull force must balance both gravity parallel force and limiting static friction down the incline: F = mg sin θ + f_s = mg(sin θ + μ cos θ).`;
      } else {
        questionText = `A force F = (${i}x + 2) N is applied on a particle of mass 1 kg causing it to move along the x-axis. The total work done by this force from x = 0 to x = ${(i % 4) + 2} meters is:`;
        const limitCount = (i % 4) + 2;
        const workDone = (i * limitCount * limitCount) / 2 + 2 * limitCount;
        options = [`${workDone} Joules`, `${workDone + 10} Joules`, `${workDone / 2} Joules`, `${workDone * 1.5} Joules`];
        correctAnswer = `A. ${workDone} Joules`;
        solution = `Work done is the definite integral: Work = ∫ F dx from 0 to ${limitCount} = [(${i}/2)*x² + 2x] = ${workDone} J.`;
      }
    } else if (subject === 'Chemistry') {
      if (chapter.includes('Stoichiometry') || chapter.includes('Concepts')) {
        const grams = 5.0 + i;
        const molesVal = grams / 40;
        const volLitre = (200 + i * 10) / 1000;
        const molarityValue = molesVal / volLitre;
        questionText = `Determine the molarity of a solution prepared by dissolving ${grams.toFixed(1)} grams of pure NaOH (Mwt = 40 g/mol) in distilled water to form a total volume of ${200 + i * 10} mL of solution.`;
        options = [`${molarityValue.toFixed(3)} M`, `${(molarityValue * 1.5).toFixed(3)} M`, `${(molarityValue / 2).toFixed(3)} M`, `${(molarityValue + 0.1).toFixed(3)} M`];
        correctAnswer = `A. ${molarityValue.toFixed(3)} M`;
        solution = `Molarity, M = Moles / Liters. Moles = ${grams} / 40 = ${molesVal.toFixed(3)}, Liters = ${volLitre} L. Molarity = ${molar_formula(molesVal, volLitre)} = ${molarityValue.toFixed(3)} M.`;
      } else if (chapter.includes('Atom')) {
        const stateN = 2 + (i % 3);
        const stateL = i % 3;
        const numberOrbitals = 2 * stateL + 1;
        questionText = `What is the maximum number of orbital representations associated with principal quantum number n = ${stateN} and angular momentum quantum number l = ${stateL}?`;
        options = [`${numberOrbitals} orbitals`, `${numberOrbitals * 2} orbitals`, `${stateN + stateL} orbitals`, `None of these`];
        correctAnswer = `A. ${numberOrbitals} orbitals`;
        solution = `For any sublevel, the number of degenerate orbitals is (2l + 1). For l = ${stateL}, we have 2(${stateL}) + 1 = ${numberOrbitals} orbitals.`;
      } else if (chapter.includes('Bonding')) {
        options = [
          i % 3 === 0 ? 'sp³d² - Octahedral' : (i % 3 === 1 ? 'sp³d - Trigonal Bipyramidal' : 'sp³d² - Square Planar'),
          'sp³ - Tetrahedral',
          'sp² - Trigonal Planar',
          'dsp² - Square Planar'
        ];
        questionText = `Identify the hybridisation state of the central atom and molecular geometry in ${i % 3 === 0 ? 'SF₆' : (i % 3 === 1 ? 'PCl₅' : 'XeF₄')} central atom:`;
        correctAnswer = `A. ${options[0]}`;
        solution = `Steric numbers are: ${i % 3 === 0 ? 'SF6 central S steric count is 6(bp) + 0(lp) = 6 => sp³d² geometry is Octahedral.' : (i % 3 === 1 ? 'PCl5 central P steric count is 5(bp) + 0(lp) = 5 => sp³d geometry is Trigonal Bipyramidal.' : 'XeF4 central Xe steric count is 4(bp) + 2(lp) = 6 => sp³d² geometry is Square Planar.')}`;
      } else {
        const heatEnt = 40 + i;
        const netEntropy = 100 + i * 2;
        const transTemp = (heatEnt * 1000) / netEntropy;
        questionText = `For a chemical reaction, the standard reaction enthalpy is ${heatEnt} kJ/mol and entropy change is ${netEntropy} J/(mol·K). Find the transition temperature above which the reaction is spontaneous.`;
        options = [`${transTemp.toFixed(1)} K`, `${(transTemp + 100).toFixed(1)} K`, `${(transTemp - 50).toFixed(1)} K`, `${(transTemp * 1.5).toFixed(1)} K`];
        correctAnswer = `A. ${transTemp.toFixed(1)} K`;
        solution = `Spontaneity condition is ΔG° = ΔH° - TΔS° < 0 => T > ΔH°/ΔS°. Threshold temperature T = (${heatEnt} * 1000) / ${netEntropy} = ${transTemp.toFixed(1)} Kelvin.`;
      }
    } else if (subject === 'Mathematics') {
      if (chapter.includes('Sets')) {
        const valA = 12 + i;
        const valB = 8 + i;
        const intersectionCount = (i % 4) + 1;
        const unionCount = valA + valB - intersectionCount;
        questionText = `If set A has ${valA} elements, set B has ${valB} elements and A ∩ B contains ${intersectionCount} elements, compute the total number of elements in A ∪ B.`;
        options = [`${unionCount}`, `${unionCount - 2}`, `${unionCount + 4}`, `${unionCount * 2}`];
        correctAnswer = `A. ${unionCount}`;
        solution = `Using principal intersection logic: n(A ∪ B) = n(A) + n(B) - n(A ∩ B) = ${valA} + ${valB} - ${intersectionCount} = ${unionCount}.`;
      } else if (chapter.includes('Quadratic')) {
        const coefB = i + 4;
        const coefC = (i % 3) + 1;
        const pValue = (coefB * coefB) / (4 * coefC);
        questionText = `Find the value of parameter 'p' for which the quadratic equation py² - ${coefB}y + ${coefC} = 0 has two real and equal roots.`;
        options = [`${pValue.toFixed(2)}`, `${(pValue / 2).toFixed(2)}`, `${(pValue + 2).toFixed(2)}`, `None of these`];
        correctAnswer = `A. ${pValue.toFixed(2)}`;
        solution = `For real and equal roots, the discriminant D = b² - 4ac = 0. In py² - ${coefB}y + ${coefC} = 0, D = (-${coefB})² - 4*p*${coefC} = 0 => p = ${coefB * coefB}/${4 * coefC} = ${pValue.toFixed(2)}.`;
      } else if (chapter.includes('Complex')) {
        questionText = `Identify the principal argument (amplitude) of the complex number Z = ${i} + ${i}i in polar representation:`;
        options = [`π/4 (45 degrees)`, `π/3 (60 degrees)`, `π/6 (30 degrees)`, `π/2 (90 degrees)`];
        correctAnswer = `A. π/4 (45 degrees)`;
        solution = `The argument of a complex number x + iy is θ = tan⁻¹(y/x). Here x = ${i}, y = ${i}. This leaves tan⁻¹(${i}/${i}) = tan⁻¹(1) = π/4 (or 45°).`;
      } else {
        const denominatorMult = i % 2 === 0 ? 2 : 3;
        const limitRes = i / denominatorMult;
        questionText = `Compute the limit as variable x approaches zero for the expression [sin(${i}x)] / [tan(${denominatorMult}x)]:`;
        options = [`${limitRes.toFixed(3)}`, `${(limitRes * 1.5).toFixed(3)}`, `0`, `Limit does not exist`];
        correctAnswer = `A. ${limitRes.toFixed(3)}`;
        solution = `Divide both by x. lim_{x->0} sin(${i}x)/x = ${i} & lim_{x->0} tan(${denominatorMult}x)/x = ${denominatorMult}. Net limit value = ${i}/${denominatorMult} = ${limitRes.toFixed(3)}.`;
      }
    } else {
      // Biology
      if (chapter.includes('Living') || chapter.includes('Classification')) {
        questionText = `Arrange the Taxonomic Categories in ascending order hierarchical alignment:`;
        options = [
          'Species < Genus < Family < Order < Class < Phylum < Kingdom',
          'Kingdom < Phylum < Class < Order < Family < Genus < Species',
          'Species < Family < Genus < Class < Order < Phylum < Kingdom',
          'Genus < Species < Family < Order < Class < Phylum < Kingdom'
        ];
        correctAnswer = `A. Species < Genus < Family < Order < Class < Phylum < Kingdom`;
        solution = `Taxonomic categories in ascending hierarchy: Species, Genus, Family, Order, Class, Phylum, Kingdom.`;
      } else if (chapter.includes('Plant')) {
        questionText = `The dominant self-dependent photosynthetic phase in the life cycle of ${i % 2 === 0 ? 'Bryophytes' : 'Pteridophytes'} is representing:`;
        options = [
          i % 2 === 0 ? 'Haploid Gametophyte dominant' : 'Diploid Sporophyte dominant',
          'Dependent Sporophyte stage only',
          'Isomorphic Alternation',
          'None of these'
        ];
        correctAnswer = `A. ${options[0]}`;
        solution = `In Bryophytes, the dominant photosynthetic generation is gametophyte (haploid). In Pteridophytes, the dominant phase is the diploid sporophyte.`;
      } else if (chapter.includes('Animal')) {
        questionText = `Choose the Animal Phylum which exhibits bilateral symmetry, triploblastic tissue, and pseudocoelomate body arrangement:`;
        options = ['Aschelminthes (Nematoda)', 'Platyhelminthes', 'Annelida', 'Arthropoda'];
        correctAnswer = `A. Aschelminthes (Nematoda)`;
        solution = `Aschelminthes (roundworms) possess bilateral symmetry, triploblastic cellular rows, and pseudocoelom where the body cavity has mesoderm in scattered packets.`;
      } else {
        questionText = `In the cellular organelle ${i % 2 === 0 ? 'Mitochondria' : 'Chloroplast'}, the folded inner membrane projections are technically identified as:`;
        options = [
          i % 2 === 0 ? 'Cristae' : 'Thylakoid discs',
          'Stroma',
          'Cisternae',
          'Grana matrix'
        ];
        correctAnswer = `A. ${options[0]}`;
        solution = `The inner membrane of mitochondria increases metabolic space by bending inwards as cristae. In chloroplasts, flat circular discs are thylakoids.`;
      }
    }

    list.push({
      id: qId,
      qNo: `Q${i}`,
      type,
      marks,
      year: `${yearNum}`,
      difficulty,
      questionText,
      options,
      correctAnswer,
      solution
    });
  }
  return list;
}

export default function TestMakerPlayground() {
  // Wizard steps: 1 (Setup), 2 (Select Questions), 3 (Review & Create), 4 (Created Test Preview Dashboard)
  const [activeStep, setActiveStep] = useState<number>(1);
  
  // Custom template state
  const [creationMode, setCreationMode] = useState<string>('Swift');
  const [paperType, setPaperType] = useState<string>('Question Paper (PDF/Word)');
  const [testTitle, setTestTitle] = useState<string>('Term Exam Practice Paper');
  const [totalMarksInput, setTotalMarksInput] = useState<string>('40');
  const [durationInput, setDurationInput] = useState<string>('60');

  // Step 2 selections (Initially empty for Requirement 1 & 2!)
  const [moduleBoard, setModuleBoard] = useState<string>('');
  const [courseClass, setCourseClass] = useState<string>('');
  const [subjectStream, setSubjectStream] = useState<string>('');

  // Chapter expandables details
  const [expandedChapter, setExpandedChapter] = useState<string>('');
  
  // Hand-picked question queue
  const [selectedQuestions, setSelectedQuestions] = useState<MockQuestion[]>([]);

  // Advanced metadata fields (Review step 3)
  const [examDate, setExamDate] = useState<string>('');
  const [instructionsText, setInstructionsText] = useState<string>('1. All questions are compulsory. 2. Read each slide thoroughly. 3. Manage time with diligence.');

  // Preview options
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [previewTab, setPreviewTab] = useState<'editor' | 'pdf' | 'omr'>('editor');
  const [questions, setQuestions] = useState<MockQuestion[]>([]);

  // Success panel trigger
  const [showPublishSuccess, setShowPublishSuccess] = useState<boolean>(false);

  // Custom question add triggers (Requirement 11)
  const [isAddingQuestion, setIsAddingQuestion] = useState<boolean>(false);
  const [customQText, setCustomQText] = useState<string>('');
  const [customOptA, setCustomOptA] = useState<string>('');
  const [customOptB, setCustomOptB] = useState<string>('');
  const [customOptC, setCustomOptC] = useState<string>('');
  const [customOptD, setCustomOptD] = useState<string>('');
  const [customAnswer, setCustomAnswer] = useState<string>('A');
  const [customSolution, setCustomSolution] = useState<string>('');
  const [customDifficulty, setCustomDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [customMarks, setCustomMarks] = useState<number>(4);
  const [customYear, setCustomYear] = useState<string>('2026');

  // Course dropdown mapper based on selected module
  const getCourseOptions = (board: string) => {
    if (board === 'CBSE') {
      return ['Class 10', 'Class 11', 'Class 12'];
    }
    if (board === 'Entrance Exams') {
      return ['JEE Main', 'JEE Advanced', 'NEET', 'NDA', 'BITSAT'];
    }
    if (board === 'Olympiad') {
      return ['NSEP (Physics)', 'NSEC (Chemistry)', 'RMO (Mathematics)'];
    }
    if (board === 'Foundation') {
      return ['Class 8 NTSE', 'Class 9 Foundation', 'Class 10 Foundation'];
    }
    return [];
  };

  // Helper bindings for counting selected items per chapter
  const getChapterSelectedCount = (chapterName: string) => {
    const cleanCh = chapterName.replace(/[^a-zA-Z0-9]/g, '');
    const prefix = `${subjectStream}-${cleanCh}-`;
    return selectedQuestions.filter(q => q.id.startsWith(prefix)).length;
  };

  const setChapterSelectedCount = (chapterName: string, count: number) => {
    const targetCount = Math.min(30, Math.max(0, count));
    const allChapterQ = getQuestionsForChapter(subjectStream, chapterName);
    
    // Filter away other segments
    const cleanCh = chapterName.replace(/[^a-zA-Z0-9]/g, '');
    const otherSelected = selectedQuestions.filter(q => !q.id.startsWith(`${subjectStream}-${cleanCh}-`));
    
    // Choose first N questions
    const chosenSlice = allChapterQ.slice(0, targetCount);
    setSelectedQuestions([...otherSelected, ...chosenSlice]);
  };

  const toggleQuestionSelect = (q: MockQuestion) => {
    if (selectedQuestions.some(item => item.id === q.id)) {
      setSelectedQuestions(selectedQuestions.filter(item => item.id !== q.id));
    } else {
      setSelectedQuestions([...selectedQuestions, q]);
    }
  };

  // Navigation handlers
  const handleNextStep = () => {
    if (activeStep === 1) {
      setActiveStep(2);
    } else if (activeStep === 2) {
      if (selectedQuestions.length === 0) {
        alert("Please select at least 1 question from the syllabus chapters below to proceed!");
        return;
      }
      setActiveStep(3);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleCreateTestPaper = () => {
    if (selectedQuestions.length === 0) {
      alert("Please select at least one question first!");
      return;
    }
    
    setIsCompiling(true);
    setTimeout(() => {
      setIsCompiling(false);
      setQuestions([...selectedQuestions]); // Bind current handpicked queue!
      setActiveStep(4);
      setPreviewTab('editor');
    }, 1500);
  };

  const handleReset = () => {
    setActiveStep(1);
    setCreationMode('Swift');
    setPaperType('Question Paper (PDF/Word)');
    setTestTitle('Term Exam Practice Paper');
    setTotalMarksInput('40');
    setDurationInput('60');
    setModuleBoard('');
    setCourseClass('');
    setSubjectStream('');
    setSelectedQuestions([]);
    setQuestions([]);
    setExpandedChapter('');
    setIsAddingQuestion(false);
  };

  const handleSaveCustomQuestion = () => {
    if (!customQText.trim()) {
      alert("Please fill in the question text!");
      return;
    }
    if (!customOptA.trim() || !customOptB.trim() || !customOptC.trim() || !customOptD.trim()) {
      alert("Please fill in all options!");
      return;
    }

    const nextId = 'Custom-' + Date.now();
    const nextQNo = `Q${questions.length + 1}`;
    
    // Pick mapped selected option index
    const pickOptText = [customOptA, customOptB, customOptC, customOptD]['ABCD'.indexOf(customAnswer)] || customOptA;
    const newQ: MockQuestion = {
      id: nextId,
      qNo: nextQNo,
      type: 'MCQ',
      marks: customMarks,
      difficulty: customDifficulty,
      year: customYear || '2026',
      questionText: customQText,
      options: [customOptA, customOptB, customOptC, customOptD],
      correctAnswer: `${customAnswer}. ${pickOptText}`,
      solution: customSolution || 'Direct answer evaluation.'
    };

    setQuestions([...questions, newQ]);
    setSelectedQuestions([...selectedQuestions, newQ]);

    // Reset custom inputs
    setCustomQText('');
    setCustomOptA('');
    setCustomOptB('');
    setCustomOptC('');
    setCustomOptD('');
    setCustomAnswer('A');
    setCustomSolution('');
    setCustomDifficulty('Medium');
    setCustomMarks(4);
    setCustomYear('2026');
    
    setIsAddingQuestion(false);
  };

  const handleDeleteQuestion = (id: string) => {
    const updated = questions.filter(q => q.id !== id);
    setQuestions(updated);
    setSelectedQuestions(selectedQuestions.filter(q => q.id !== id));
  };

  const handleDownloadPDF = async () => {
    // 1. Create a clean offscreen container with exact A4 proportions (840px is perfect for sharp A4 rendering)
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0px';
    container.style.width = '840px';
    container.style.backgroundColor = '#ffffff';
    container.style.color = '#0f172a';
    container.style.padding = '50px 60px';
    container.style.fontFamily = 'Georgia, serif, system-ui';
    container.style.boxSizing = 'border-box';

    // 2. Add diagonal elegant rotated background watermark "HODU ACADEMY"
    const watermark = document.createElement('div');
    watermark.style.position = 'absolute';
    watermark.style.inset = '0';
    watermark.style.display = 'flex';
    watermark.style.alignItems = 'center';
    watermark.style.justifyContent = 'center';
    watermark.style.pointerEvents = 'none';
    watermark.style.zIndex = '0';
    watermark.style.transform = 'rotate(-30deg)';
    watermark.style.opacity = '0.045';
    watermark.innerHTML = `
      <div style="font-family: sans-serif; font-size: 75px; font-weight: 900; line-height: 1.15; letter-spacing: 0.12em; text-transform: uppercase; text-align: center; color: #800000;">
        HODU ACADEMY<br/>STUDY CIRCLE
      </div>
    `;
    container.appendChild(watermark);

    // 3. Header Container with high-fidelity branding
    const header = document.createElement('div');
    header.style.position = 'relative';
    header.style.zIndex = '10';
    header.style.borderBottom = '4px solid #800000';
    header.style.paddingBottom = '18px';
    header.style.marginBottom = '22px';
    header.innerHTML = `
      <div style="display: flex; align-items: center; gap: 18px;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background-color: #800000; border: 1.5px solid #a81c1c; display: flex; align-items: center; justify-content: center; color: #ffffff; flex-shrink: 0;">
          <span style="font-family: sans-serif; font-size: 26px; font-weight: 900; letter-spacing: -0.05em; line-height: 1;">HA</span>
        </div>
        <div>
          <h1 style="font-family: sans-serif; font-size: 34px; font-weight: 900; color: #800000; margin: 0; line-height: 1; text-transform: uppercase; letter-spacing: -0.02em;">
            HODU ACADEMY
          </h1>
          <p style="font-family: sans-serif; font-size: 10px; font-weight: 800; text-transform: uppercase; color: #64748b; margin: 5px 0 0 0; letter-spacing: 0.12em;">
            Excellence in Board Exams & Competitive Assessment Prep
          </p>
        </div>
      </div>
      
      <div style="text-align: center; padding-top: 18px; margin-top: 14px; border-top: 1.5px solid #cbd5e1;">
        <h2 style="font-family: sans-serif; font-size: 18px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin: 0; letter-spacing: 0.02em;">
          ${testTitle || 'UNTITLED TEST PAPER'}
        </h2>
        <div style="font-family: sans-serif; font-size: 11.5px; color: #475569; font-weight: 600; display: flex; justify-content: center; align-items: center; gap: 20px; margin-top: 5px; flex-wrap: wrap;">
          <span><strong>Total Marks:</strong> ${questions.reduce((acc, q) => acc + q.marks, 0)} Pts</span>
          <span>•</span>
          <span><strong>Duration Limit:</strong> ${durationInput} Minutes</span>
          <span>•</span>
          <span><strong>Subject Stream:</strong> ${subjectStream}</span>
          ${examDate ? `<span>•</span><span><strong>Exam Date:</strong> ${examDate}</span>` : ''}
        </div>
      </div>
    `;
    container.appendChild(header);

    // 4. Double bordered Banner
    const banner = document.createElement('div');
    banner.style.position = 'relative';
    banner.style.zIndex = '10';
    banner.style.borderTop = '1.5px solid #0f172a';
    banner.style.borderBottom = '1.5px dashed #0f172a';
    banner.style.padding = '5px 0';
    banner.style.marginBottom = '25px';
    banner.style.textAlign = 'center';
    banner.innerHTML = `
      <span style="font-family: sans-serif; font-weight: 900; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #1e293b;">
        Section A - Multiple Choice Question (1m)
      </span>
    `;
    container.appendChild(banner);

    // 5. Grid for Columns
    const grid = document.createElement('div');
    grid.style.position = 'relative';
    grid.style.zIndex = '10';
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = '1fr 1fr';
    grid.style.gap = '35px';
    grid.style.color = '#1e293b';

    const halfLen = Math.ceil(questions.length / 2);
    const leftQuestions = questions.slice(0, halfLen);
    const rightQuestions = questions.slice(halfLen);

    // Left column creation
    const leftColumn = document.createElement('div');
    leftColumn.style.display = 'flex';
    leftColumn.style.flexDirection = 'column';
    leftColumn.style.gap = '20px';

    leftQuestions.forEach((q, idx) => {
      const block = document.createElement('div');
      block.style.borderBottom = '1px solid #f1f5f9';
      block.style.paddingBottom = '14px';
      
      const qText = document.createElement('p');
      qText.style.fontFamily = 'sans-serif';
      qText.style.fontWeight = '700';
      qText.style.fontSize = '12px';
      qText.style.lineHeight = '1.45';
      qText.style.margin = '0 0 10px 0';
      qText.innerHTML = `<span style="font-weight: 900; color: #000; margin-right: 5px;">Q${idx + 1}.</span> ${q.questionText}`;
      block.appendChild(qText);

      const opGrid = document.createElement('div');
      opGrid.style.display = 'grid';
      opGrid.style.gridTemplateColumns = '1fr 1fr';
      opGrid.style.gap = '6px';
      opGrid.style.fontFamily = 'sans-serif';
      opGrid.style.fontSize = '11px';
      opGrid.style.fontWeight = '500';
      opGrid.style.color = '#334155';
      opGrid.style.paddingLeft = '5px';
      
      opGrid.innerHTML = `
        <div><strong>(A)</strong> ${q.options[0]}</div>
        <div><strong>(B)</strong> ${q.options[1]}</div>
        <div><strong>(C)</strong> ${q.options[2]}</div>
        <div><strong>(D)</strong> ${q.options[3]}</div>
      `;
      block.appendChild(opGrid);

      const mTag = document.createElement('span');
      mTag.style.display = 'block';
      mTag.style.fontFamily = 'sans-serif';
      mTag.style.fontSize = '9px';
      mTag.style.textAlign = 'right';
      mTag.style.color = '#94a3b8';
      mTag.style.fontStyle = 'italic';
      mTag.style.marginTop = '6px';
      mTag.style.marginRight = '8px';
      mTag.textContent = `[${q.marks} mark]`;
      block.appendChild(mTag);

      leftColumn.appendChild(block);
    });

    // Right column creation
    const rightColumn = document.createElement('div');
    rightColumn.style.display = 'flex';
    rightColumn.style.flexDirection = 'column';
    rightColumn.style.gap = '20px';
    rightColumn.style.borderLeft = '1.5px solid #e2e8f0';
    rightColumn.style.paddingLeft = '24px';

    rightQuestions.forEach((q, idx) => {
      const overallIdx = halfLen + idx;
      const block = document.createElement('div');
      block.style.borderBottom = '1px solid #f1f5f9';
      block.style.paddingBottom = '14px';

      const qText = document.createElement('p');
      qText.style.fontFamily = 'sans-serif';
      qText.style.fontWeight = '700';
      qText.style.fontSize = '12px';
      qText.style.lineHeight = '1.45';
      qText.style.margin = '0 0 10px 0';
      qText.innerHTML = `<span style="font-weight: 900; color: #000; margin-right: 5px;">Q${overallIdx + 1}.</span> ${q.questionText}`;
      block.appendChild(qText);

      const opGrid = document.createElement('div');
      opGrid.style.display = 'grid';
      opGrid.style.gridTemplateColumns = '1fr 1fr';
      opGrid.style.gap = '6px';
      opGrid.style.fontFamily = 'sans-serif';
      opGrid.style.fontSize = '11px';
      opGrid.style.fontWeight = '500';
      opGrid.style.color = '#334155';
      opGrid.style.paddingLeft = '5px';
      
      opGrid.innerHTML = `
        <div><strong>(A)</strong> ${q.options[0]}</div>
        <div><strong>(B)</strong> ${q.options[1]}</div>
        <div><strong>(C)</strong> ${q.options[2]}</div>
        <div><strong>(D)</strong> ${q.options[3]}</div>
      `;
      block.appendChild(opGrid);

      const mTag = document.createElement('span');
      mTag.style.display = 'block';
      mTag.style.fontFamily = 'sans-serif';
      mTag.style.fontSize = '9px';
      mTag.style.textAlign = 'right';
      mTag.style.color = '#94a3b8';
      mTag.style.fontStyle = 'italic';
      mTag.style.marginTop = '6px';
      mTag.style.marginRight = '8px';
      mTag.textContent = `[${q.marks} mark]`;
      block.appendChild(mTag);

      rightColumn.appendChild(block);
    });

    grid.appendChild(leftColumn);
    grid.appendChild(rightColumn);
    container.appendChild(grid);

    // 6. Solid Maroon Footer Block
    const footer = document.createElement('div');
    footer.style.position = 'relative';
    footer.style.zIndex = '10';
    footer.style.marginTop = '40px';
    footer.style.paddingTop = '15px';
    footer.style.borderTop = '1.5px solid #cbd5e1';
    footer.innerHTML = `
      <div style="background-color: #800000; padding: 12px 18px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; color: #ffffff; font-family: sans-serif; font-size: 11px;">
        <div style="display: flex; align-items: center; gap: 5px;">
          <span style="background-color: rgba(255,255,255,0.15); padding: 3px 7px; border-radius: 4px; font-weight: bold; font-family: monospace;">+91 9257879555</span>
        </div>
        <div style="font-style: italic; font-weight: 500; opacity: 0.95;">
          www.hoduacademy.com
        </div>
        <div style="font-size: 10px; opacity: 0.9;">
          C-28, Vaishali Estate, Gandhi Path (W)
        </div>
      </div>
    `;
    container.appendChild(footer);

    // Append temporarily to the document to allow rendering
    document.body.appendChild(container);

    try {
      const canvas = await html2canvas(container, {
        scale: 2, // High resolution anti-aliasing
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const imgWidth = 210; // A4 layout width in mm
      const pageHeight = 297; // A4 layout height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add image to PDF document natively
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;
      }

      pdf.save(`${testTitle.replace(/\s+/g, '_')}_Question_Paper.pdf`);
    } catch (err) {
      console.error('PDF compiler exception:', err);
      alert('Failed to generate high-fidelity PDF. Downloading standard text file instead!');
      
      // Fallback: download as text format plain file
      const plainText = `HODU ACADEMY STUDY CIRCLE\n\nTest Paper: ${testTitle}\n${questions.map((q, i) => `Q${i + 1}. ${q.questionText}\n`).join('\n')}`;
      const blob = new Blob([plainText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${testTitle.replace(/\s+/g, '_')}_Question_Paper.txt`;
      link.click();
      URL.revokeObjectURL(url);
    } finally {
      // Clean up DOM node
      document.body.removeChild(container);
    }
  };

  const handleDownloadOMR = () => {
    const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
    const lm = 20; // left margin
    let y = 20;

    // Header
    pdf.setFillColor(128, 0, 0);
    pdf.rect(0, 0, 210, 28, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.setTextColor(255, 255, 255);
    pdf.text('HODU ACADEMY — OMR RESPONSE SHEET', 105, 12, { align: 'center' });
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text('AcadOS TestMaker Engine  •  acados_omr_v2', 105, 20, { align: 'center' });

    y = 38;
    pdf.setTextColor(30, 30, 30);

    // Meta info box
    pdf.setDrawColor(200, 200, 200);
    pdf.setFillColor(248, 247, 244);
    pdf.roundedRect(lm, y, 170, 28, 3, 3, 'FD');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.text(`TEST: ${testTitle}`, lm + 4, y + 7);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Subject: ${subjectStream}   |   Course: ${courseClass}   |   Date: ${examDate || new Date().toISOString().slice(0,10)}`, lm + 4, y + 14);
    pdf.text('Student Name: ___________________________________   Roll No: ________________', lm + 4, y + 21);

    y += 36;

    // Bubble sheet header
    pdf.setFillColor(212, 160, 23);
    pdf.rect(lm, y, 170, 7, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8.5);
    pdf.setTextColor(255, 255, 255);
    pdf.text('Q.NO', lm + 6, y + 4.8);
    pdf.text('(A)', lm + 35, y + 4.8);
    pdf.text('(B)', lm + 65, y + 4.8);
    pdf.text('(C)', lm + 95, y + 4.8);
    pdf.text('(D)', lm + 125, y + 4.8);
    pdf.text('TYPE', lm + 152, y + 4.8);

    y += 10;
    pdf.setTextColor(30, 30, 30);

    questions.forEach((q, idx) => {
      if (y > 270) { pdf.addPage(); y = 20; }
      const alt = idx % 2 === 0;
      if (alt) {
        pdf.setFillColor(250, 249, 246);
        pdf.rect(lm, y - 3, 170, 8, 'F');
      }
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8.5);
      pdf.text(`Q${String(idx + 1).padStart(2, '0')}`, lm + 4, y + 2);
      pdf.setFont('helvetica', 'normal');
      // Draw bubbles
      [35, 65, 95, 125].forEach(x => {
        pdf.setDrawColor(128, 0, 0);
        pdf.circle(lm + x + 4, y + 1, 3.5);
      });
      pdf.setFontSize(7.5);
      pdf.setTextColor(100, 100, 100);
      pdf.text(q.type, lm + 152, y + 2);
      pdf.setTextColor(30, 30, 30);
      y += 9;
    });

    // Footer
    y += 6;
    pdf.setDrawColor(200, 200, 200);
    pdf.line(lm, y, 190, y);
    y += 5;
    pdf.setFontSize(7);
    pdf.setTextColor(150, 150, 150);
    pdf.text(`OMR Scan Code: acados_omr_v2_108  •  Generated by AcadOS TestMaker  •  Hoducation Technologies Pvt. Ltd.`, 105, y, { align: 'center' });

    pdf.save(`${testTitle.replace(/\s+/g, '_')}_OMR_Sheet.pdf`);
  };

  return (
    <div className="bg-white rounded-[26px] border border-maroon-105 shadow-2xl overflow-hidden font-sans text-slate-800" id="testmaker-playground">
      
      {/* HEADER SECTION METADATA */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 sm:px-8 py-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-serif text-slate-900 font-extralight tracking-tight">
              Create New Test <span className="normal-case italic text-maroon-700 font-serif">Paper Wizards</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Assemble mock exam archives using responsive multi-step blueprint triggers.
            </p>
          </div>

          {activeStep < 4 && (
            <button 
              onClick={handleReset}
              className="flex items-center gap-1 bg-slate-200 hover:bg-slate-300 px-3.5 py-1.5 rounded-lg text-xs font-bold font-sans text-slate-700 transition"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
              <span>Reset Wizard</span>
            </button>
          )}
        </div>

        {/* STEPPER PROGRESS INDICATOR (Exact screenshot styles) */}
        {activeStep < 4 && (
          <div className="flex items-center gap-6 mt-6 border-t border-slate-100 pt-4 flex-wrap text-sm">
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border transition ${
                activeStep >= 1 ? 'bg-maroon-800 border-maroon-700 text-white shadow-sm' : 'border-slate-300 text-slate-400 bg-white'
              }`}>
                1
              </span>
              <span className={`font-medium ${activeStep === 1 ? 'text-maroon-800 font-semibold' : 'text-slate-500'}`}>Setup</span>
            </div>
            
            <ChevronRight className="w-4 h-4 text-slate-300" />
            
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border transition ${
                activeStep >= 2 ? 'bg-maroon-800 border-maroon-700 text-white shadow-sm' : 'border-slate-300 text-slate-400 bg-white'
              }`}>
                2
              </span>
              <span className={`font-medium ${activeStep === 2 ? 'text-maroon-800 font-semibold' : 'text-slate-500'}`}>Select Questions</span>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-300" />

            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border transition ${
                activeStep >= 3 ? 'bg-maroon-800 border-maroon-700 text-white shadow-sm' : 'border-slate-300 text-slate-400 bg-white'
              }`}>
                3
              </span>
              <span className={`font-medium ${activeStep === 3 ? 'text-maroon-800 font-semibold' : 'text-slate-500'}`}>Review & Create</span>
            </div>
          </div>
        )}
      </div>

      {/* LOADER OVERLAY */}
      {isCompiling && (
        <div className="p-16 text-center space-y-4">
          <div className="w-12 h-12 border-4 border-maroon-700 border-t-transparent rounded-full animate-spin mx-auto" />
          <h4 className="text-md sm:text-lg font-serif italic text-maroon-850">Assembling AcadOS Digital Catalog Questions...</h4>
          <p className="text-xs text-slate-550 max-w-sm mx-auto font-light font-sans">
            Filtering database questions, building solution keys, and preparing vector-grade OMR cards dynamically.
          </p>
        </div>
      )}

      {/* MAIN STEPPING SCREEN MODULE VIEWPORT */}
      {!isCompiling && (
        <div className="p-5 sm:p-8">
          
          {/* ============================================================ */}
          {/* ================ STEP 1: SETUP PHASE WINDOW ================ */}
          {/* ============================================================ */}
          {activeStep === 1 && (
            <div className="space-y-6">
              
              {/* SECTION: Choose Creation Mode */}
              <div className="space-y-3">
                <h4 className="text-md sm:text-base font-bold text-slate-900 font-sans tracking-wide">
                  Choose Creation Mode
                </h4>
                <p className="text-xs text-slate-500 leading-tight">
                  How would you like to build your test paper?
                </p>

                {/* 4 Cards selector */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-1">
                  
                  {/* Option 1: Swift */}
                  <button 
                    onClick={() => setCreationMode('Swift')}
                    className={`text-left p-4 rounded-2xl border transition-all ${
                      creationMode === 'Swift' 
                        ? 'border-maroon-800 bg-maroon-50/20 shadow-md ring-1 ring-maroon-600' 
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`p-2 rounded-lg ${creationMode === 'Swift' ? 'bg-maroon-100 text-maroon-800' : 'bg-slate-100 text-slate-500'}`}>
                        <Sparkles className="w-4 h-4" />
                      </span>
                      <span className="font-bold text-sm text-slate-900">Swift</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-655 font-light">
                      Pick chapters and topics, specify how many questions of each type you need. Questions are auto-selected.
                    </p>
                  </button>

                  {/* Option 2: Architect */}
                  <button 
                    onClick={() => setCreationMode('Architect')}
                    className={`text-left p-4 rounded-2xl border transition-all ${
                      creationMode === 'Architect' 
                        ? 'border-maroon-800 bg-maroon-50/20 shadow-md ring-1 ring-maroon-600' 
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`p-2 rounded-lg ${creationMode === 'Architect' ? 'bg-maroon-100 text-maroon-800' : 'bg-slate-100 text-slate-500'}`}>
                        <Sliders className="w-4 h-4" />
                      </span>
                      <span className="font-bold text-sm text-slate-900">Architect</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-655 font-light">
                      Design sections with detailed blueprint categories - type, weightage, difficulty, and marks per section.
                    </p>
                  </button>

                  {/* Option 3: Picker */}
                  <button 
                    onClick={() => setCreationMode('Picker')}
                    className={`text-left p-4 rounded-2xl border transition-all ${
                      creationMode === 'Picker' 
                        ? 'border-maroon-800 bg-maroon-50/20 shadow-md ring-1 ring-maroon-600' 
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`p-2 rounded-lg ${creationMode === 'Picker' ? 'bg-maroon-100 text-maroon-800' : 'bg-slate-100 text-slate-500'}`}>
                        <Eye className="w-4 h-4" />
                      </span>
                      <span className="font-bold text-sm text-slate-900">Picker</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-655 font-light">
                      Create an empty paper and manually browse the question bank to add questions one by one.
                    </p>
                  </button>

                  {/* Option 4: Pattern */}
                  <button 
                    onClick={() => setCreationMode('Pattern')}
                    className={`text-left p-4 rounded-2xl border transition-all ${
                      creationMode === 'Pattern' 
                        ? 'border-maroon-800 bg-maroon-50/20 shadow-md ring-1 ring-maroon-600' 
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`p-2 rounded-lg ${creationMode === 'Pattern' ? 'bg-maroon-100 text-maroon-800' : 'bg-slate-100 text-slate-500'}`}>
                        <Layers className="w-4 h-4" />
                      </span>
                      <span className="font-bold text-sm text-slate-900">Pattern</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-655 font-light">
                      Start from a saved pattern. Pick chapters & topics, tweak difficulty, and auto-fill the paper.
                    </p>
                  </button>

                </div>
              </div>

              {/* SECTION: Paper Type Dropdown */}
              <div className="space-y-2 border-t border-slate-100 pt-5">
                <label className="block text-xs sm:text-sm font-semibold text-slate-800 uppercase tracking-wider">
                  Paper Type
                </label>
                <p className="text-xs text-slate-400">What type of paper are you creating?</p>
                
                <div className="max-w-md pt-1 relative">
                  <select 
                    value={paperType} 
                    onChange={(e) => setPaperType(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-maroon-700 transition"
                  >
                    <option value="Question Paper (PDF/Word)">Question Paper (PDF/Word)</option>
                    <option value="Worksheet (PDF/Word)">Worksheet (PDF/Word)</option>
                  </select>
                </div>
              </div>

              {/* SECTION: Test Paper Setup */}
              <div className="space-y-4 border-t border-slate-100 pt-5">
                <h4 className="text-md sm:text-base font-bold text-slate-900 font-sans tracking-wide">
                  Test Paper Setup
                </h4>
                <p className="text-xs text-slate-500 leading-tight">
                  Set the title and basic details for your paper.
                </p>

                <div className="space-y-4">
                  {/* Title Field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-widest mb-1">
                      Test Title *
                    </label>
                    <input 
                      type="text" 
                      value={testTitle} 
                      onChange={(e) => setTestTitle(e.target.value)}
                      placeholder="e.g., Class 12 Physics Mid-Term 2025"
                      className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-maroon-700 focus:outline-none focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Grid for Marks & Duration */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-widest mb-1 font-mono">
                        Total Marks
                      </label>
                      <input 
                        type="text" 
                        value={totalMarksInput} 
                        onChange={(e) => setTotalMarksInput(e.target.value)}
                        placeholder="e.g. 100"
                        className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-maroon-700 focus:outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-widest mb-1 font-mono">
                        Duration (minutes)
                      </label>
                      <input 
                        type="text" 
                        value={durationInput} 
                        onChange={(e) => setDurationInput(e.target.value)}
                        placeholder="e.g. 180"
                        className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-maroon-700 focus:outline-none transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTION ROW BAR STEP 1 */}
              <div className="flex justify-end pt-6 border-t border-slate-100">
                <button
                  onClick={handleNextStep}
                  className="bg-maroon-750 hover:bg-maroon-850 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-6 rounded-xl transition flex items-center gap-1.5 shadow"
                >
                  <span>Next: Select Questions</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* ============================================================ */}
          {/* ================ STEP 2: SELECT QUESTIONS ================= */}
          {/* ============================================================ */}
          {activeStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="space-y-1">
                <h4 className="text-md sm:text-base font-bold text-slate-900 font-sans tracking-wide">
                  Select Questions by Chapter & Topic
                </h4>
                <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
                  Pick a subject below, then expand chapters and topics to specify question counts. You can switch subjects to combine questions from multiple subjects into one paper.
                </p>
              </div>

              {/* THREE DROPDOWN MENUS (Initially empty for Requirement 1!) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-slate-100 p-4.5 rounded-2xl bg-slate-50/50">
                
                {/* Board */}
                <div>
                  <label className="block text-xs font-bold text-slate-750 uppercase mb-1">
                    Module (Board)
                  </label>
                  <select 
                    value={moduleBoard} 
                    onChange={(e) => {
                      setModuleBoard(e.target.value);
                      setCourseClass('');
                      setSubjectStream('');
                      setSelectedQuestions([]);
                    }}
                    className="w-full bg-white border border-slate-250 text-slate-800 rounded-lg px-3 py-2 text-xs font-medium focus:ring-1 focus:ring-maroon-700 focus:outline-none"
                  >
                    <option value="">Select module</option>
                    <option value="CBSE">CBSE</option>
                    <option value="Entrance Exams">Entrance Exams</option>
                    <option value="Olympiad">Olympiad</option>
                    <option value="Foundation">Foundation</option>
                  </select>
                </div>

                {/* Course (Class) */}
                <div>
                  <label className="block text-xs font-bold text-slate-750 uppercase mb-1">
                    Course (Class)
                  </label>
                  <select 
                    value={courseClass} 
                    onChange={(e) => {
                      setCourseClass(e.target.value);
                      setSubjectStream('');
                      setSelectedQuestions([]);
                    }}
                    disabled={!moduleBoard}
                    className="w-full bg-white border border-slate-250 text-slate-800 rounded-lg px-3 py-2 text-xs font-medium focus:ring-1 focus:ring-maroon-700 focus:outline-none disabled:opacity-60 disabled:bg-slate-100"
                  >
                    <option value="">{moduleBoard ? 'Select course' : 'Select module first'}</option>
                    {getCourseOptions(moduleBoard).map((crs) => (
                      <option key={crs} value={crs}>{crs}</option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold text-slate-750 uppercase mb-1">
                    Subject
                  </label>
                  <select 
                    value={subjectStream} 
                    onChange={(e) => {
                      setSubjectStream(e.target.value);
                      setSelectedQuestions([]);
                    }}
                    disabled={!courseClass}
                    className="w-full bg-white border border-slate-250 text-slate-800 rounded-lg px-3 py-2 text-xs font-medium focus:ring-1 focus:ring-maroon-700 focus:outline-none disabled:opacity-60 disabled:bg-slate-100"
                  >
                    <option value="">{courseClass ? 'Select subject' : 'Select course first'}</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Biology">Biology</option>
                  </select>
                </div>

              </div>

              {/* LIST OF CHAPTERS COLLAPSIBLE GROUPS (Requirement 1 & 3: Blank/Empty when not selected) */}
              {(!moduleBoard || !courseClass || !subjectStream) ? (
                <div className="text-center py-16 text-slate-400 font-sans border border-dashed border-slate-250 rounded-2xl bg-white space-y-3.5 shadow-sm">
                  <HelpCircle className="w-10 h-10 text-slate-300 mx-auto animate-pulse" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-700">Blank State Preview</p>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                      Select a module, course, and subject above to browse available questions.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-150 rounded-xl px-4 py-2 text-xs text-slate-500">
                    <span>Syllabus Chapter Listing ({subjectStream})</span>
                    <span className="font-mono text-slate-800">Total hand-picked: <strong className="text-maroon-800">{selectedQuestions.length}</strong></span>
                  </div>

                  {CHAPTERS_BY_SUBJECT[subjectStream]?.map((chapterName) => {
                    const isExpanded = expandedChapter === chapterName;
                    const countSelected = getChapterSelectedCount(chapterName);
                    return (
                      <div key={chapterName} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:border-slate-300 transition-colors">
                        <button 
                          type="button"
                          onClick={() => setExpandedChapter(isExpanded ? '' : chapterName)}
                          className="w-full flex justify-between items-center px-4 py-3 bg-slate-50 border-b border-slate-100 hover:bg-slate-100/50"
                        >
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-slate-650" />
                            <span className="font-bold text-xs sm:text-sm text-slate-900 text-left">{chapterName}</span>
                            <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold font-mono">30 available</span>
                            {countSelected > 0 && (
                              <span className="bg-maroon-100 text-maroon-800 px-2 py-0.5 rounded text-[10px] font-bold font-mono">
                                {countSelected} selected
                              </span>
                            )}
                          </div>
                          <ChevronDown className={`w-4 h-4 transition-all text-slate-500 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="p-4 space-y-4 border-t border-slate-100 bg-white"
                            >
                              {/* Selection count Quick Fill Bar */}
                              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                                <div className="text-xs text-slate-600">
                                  <span className="font-semibold text-slate-800">Quick Selection:</span> Input a question count to auto-select, or use the checkboxes manually below.
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <span className="text-[11px] text-slate-500 font-mono">Select Count:</span>
                                  <div className="flex items-center gap-1 bg-white border border-slate-300 rounded px-1.5 py-0.5">
                                    <input 
                                      type="number" 
                                      value={countSelected}
                                      onChange={(e) => {
                                        const c = parseInt(e.target.value) || 0;
                                        setChapterSelectedCount(chapterName, c);
                                      }}
                                      className="w-10 text-center text-xs font-bold focus:outline-none" 
                                      min="0" 
                                      max="30" 
                                    />
                                    <span className="text-xs text-slate-400 font-mono">/30</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => setChapterSelectedCount(chapterName, 10)}
                                    className="px-2 py-1 bg-slate-200 text-slate-700 font-bold rounded text-[10px] hover:bg-slate-300 transition"
                                  >
                                    10 Q
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setChapterSelectedCount(chapterName, 30)}
                                    className="px-2 py-1 bg-maroon-800 text-white font-bold rounded text-[10px] hover:bg-maroon-900 transition font-sans"
                                  >
                                    All 30
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setChapterSelectedCount(chapterName, 0)}
                                    className="px-2 py-1 bg-slate-100 text-slate-600 font-medium rounded text-[10px] hover:bg-slate-200 transition"
                                  >
                                    Clear
                                  </button>
                                </div>
                              </div>

                              {/* Question List view */}
                              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 divide-y divide-slate-100">
                                {getQuestionsForChapter(subjectStream, chapterName).map((q, qidx) => {
                                  const isSelected = selectedQuestions.some(item => item.id === q.id);
                                  return (
                                    <label 
                                      key={q.id} 
                                      className={`pt-3 first:pt-0 flex items-start gap-3 cursor-pointer select-none transition-all ${
                                        isSelected ? 'bg-maroon-50/10 -mx-2 px-2 rounded-lg' : 'hover:bg-slate-50/50'
                                      }`}
                                    >
                                      <input 
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => toggleQuestionSelect(q)}
                                        className="mt-1 w-4 h-4 rounded text-maroon-800 border-slate-350 focus:ring-maroon-600 focus:ring-1 shrink-0 accent-maroon-800 cursor-pointer"
                                      />
                                      <div className="flex-1 space-y-2">
                                        <div className="flex justify-between items-start gap-4">
                                          <p className="text-xs font-semibold text-slate-800 leading-normal font-sans">
                                            <span className="font-bold text-slate-900 font-mono mr-1">Q{qidx + 1}.</span>
                                            {q.questionText}
                                          </p>
                                          <span className="bg-slate-100 border border-slate-200 text-slate-700 text-[9px] px-1.5 py-0.5 rounded shrink-0 font-mono tracking-wider">
                                            {q.difficulty}
                                          </span>
                                        </div>

                                        {/* Grid Options list */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2 text-[11px] text-slate-655 leading-relaxed font-sans">
                                          <div><span className="font-bold text-slate-400">A)</span> {q.options[0]}</div>
                                          <div><span className="font-bold text-slate-400">B)</span> {q.options[1]}</div>
                                          <div><span className="font-bold text-slate-400">C)</span> {q.options[2]}</div>
                                          <div><span className="font-bold text-slate-400">D)</span> {q.options[3]}</div>
                                        </div>

                                        <div className="flex items-center gap-3 pt-1 text-[10px] text-slate-450 font-mono">
                                          <span>Verified MCQ</span>
                                          <span>•</span>
                                          <span>Target: {q.year} Board</span>
                                          <span>•</span>
                                          <span>Weightage: {q.marks} Marks</span>
                                          <span>•</span>
                                          <span className="text-emerald-700 bg-emerald-55/40 px-1.5 py-0.5 rounded font-bold font-sans">Correct: Option {q.correctAnswer.charAt(0)}</span>
                                        </div>
                                      </div>
                                    </label>
                                  );
                                })}
                              </div>

                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ACTION BUTTON ROW STEP 2 */}
              <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-4">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-700 uppercase flex items-center gap-1 transition"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={selectedQuestions.length === 0}
                  className="bg-maroon-750 hover:bg-maroon-850 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-6 rounded-xl transition flex items-center gap-1.5 shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Next: Review Selected ({selectedQuestions.length})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* ============================================================ */}
          {/* ================ STEP 3: REVIEW & CREATE ================== */}
          {/* ============================================================ */}
          {activeStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="space-y-1">
                <h4 className="text-md sm:text-base font-bold text-slate-900 font-sans tracking-wide">
                  Review & Create
                </h4>
                <p className="text-xs text-slate-550 leading-tight">
                  Review your settings, verify total weightage, set duration, and build your compiled paper.
                </p>
              </div>

              {/* Summary table box with selections breakdown */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 border-b border-slate-150">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Title</span>
                    <p className="text-sm font-semibold text-slate-800 font-sans">{testTitle || 'Untitled Practice Paper'}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Module / Course Context</span>
                    <p className="text-sm font-semibold text-slate-800 font-sans">{creationMode} Mode • {courseClass} ({subjectStream})</p>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <span className="text-[10px] uppercase font-bold text-slate-450 tracking-wider font-mono block">
                    Syllabus Selection Count
                  </span>
                  
                  {CHAPTERS_BY_SUBJECT[subjectStream]?.map((chName) => {
                    const count = getChapterSelectedCount(chName);
                    if (count === 0) return null;
                    const marksSum = count * (subjectStream === 'Biology' ? 1 : 4);
                    return (
                      <div key={chName} className="flex justify-between items-center text-xs sm:text-sm text-slate-800 py-2 border-b border-slate-100 last:border-0 font-sans">
                        <span className="font-medium text-slate-700">
                          {chName}
                        </span>
                        <span className="font-bold shrink-0 font-mono text-slate-900 bg-slate-100/80 px-2.5 py-1 rounded">
                          {count} Questions • {marksSum} Marks
                        </span>
                      </div>
                    );
                  })}

                  {/* Summary counter bars */}
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-200/80 p-3.5 rounded-xl text-xs sm:text-sm font-mono mt-4 text-slate-800">
                    <span className="font-bold text-maroon-850">{selectedQuestions.length} Questions overall</span>
                    <span className="font-bold text-maroon-850">
                      {selectedQuestions.reduce((acc, q) => acc + q.marks, 0)} Points total
                    </span>
                  </div>
                </div>
              </div>

              {/* Hand-picked Questions Review Card */}
              <div className="border border-slate-200 rounded-2xl bg-white p-4.5 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-150 pb-2">
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Hand-Picked Questions List ({selectedQuestions.length})
                  </h5>
                  <span className="text-[10.5px] text-slate-450 font-mono italic">Editable queue</span>
                </div>
                
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 divide-y divide-slate-100">
                  {selectedQuestions.map((q, idx) => (
                    <div key={q.id} className="pt-3 first:pt-0 flex justify-between items-start gap-4 text-xs font-sans">
                      <div className="space-y-1">
                        <p className="font-medium text-slate-800 leading-normal">
                          <strong className="font-mono text-slate-400 mr-1">{idx + 1}.</strong>
                          {q.questionText}
                        </p>
                        <div className="text-[10px] text-slate-400 flex gap-2 font-mono">
                          <span>{q.type}</span>
                          <span>•</span>
                          <span>{q.difficulty}</span>
                          <span>•</span>
                          <span className="text-maroon-700 font-semibold">{q.marks} Marks</span>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => toggleQuestionSelect(q)}
                        className="text-slate-400 hover:text-red-700 transition p-1.5 shrink-0 hover:bg-red-50 rounded"
                        title="Remove question from paper"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Editable Setup Forms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5 font-mono">
                    Total Marks (Calibrated)
                  </label>
                  <input 
                    type="text" 
                    value={selectedQuestions.reduce((acc, q) => acc + q.marks, 0)} 
                    disabled 
                    className="w-full bg-slate-100 border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 text-xs font-bold" 
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Value reflects weights of hand-picked questions.</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5 font-mono">
                    Duration (minutes)
                  </label>
                  <input 
                    type="text" 
                    value={durationInput} 
                    onChange={(e) => setDurationInput(e.target.value)}
                    className="w-full bg-white border border-slate-250 text-slate-800 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-maroon-700 focus:outline-none" 
                    placeholder="e.g., 60"
                  />
                </div>
              </div>

              {/* Exam Date & Instructions */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 font-mono">
                    Exam Date (optional)
                  </label>
                  <input 
                    type="date" 
                    value={examDate} 
                    onChange={(e) => setExamDate(e.target.value)}
                    className="w-full max-w-sm bg-white border border-slate-250 text-slate-800 rounded-xl px-4 py-2.5 text-xs font-medium focus:ring-1 focus:ring-maroon-700 focus:outline-none" 
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">If set, styles automatically on top of the A4 printable sheet.</span>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 uppercase font-mono">
                    Instructions
                  </label>
                  <div className="border border-slate-350 rounded-xl overflow-hidden bg-white">
                    <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap gap-1.5 text-xs text-slate-650 select-none">
                      <button type="button" className="p-1 hover:bg-slate-200 rounded font-bold">B</button>
                      <button type="button" className="p-1 hover:bg-slate-200 rounded italic">I</button>
                      <button type="button" className="p-1 hover:bg-slate-200 rounded underline">U</button>
                      <button type="button" className="p-1 hover:bg-slate-200 rounded">Code</button>
                    </div>
                    <textarea 
                      value={instructionsText}
                      onChange={(e) => setInstructionsText(e.target.value)}
                      className="w-full p-3 text-xs focus:outline-none min-h-[90px] text-slate-850 leading-relaxed font-sans"
                    />
                  </div>
                </div>

                {/* Templates Selector */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 uppercase font-mono">
                    Paper Template
                  </label>
                  <select className="w-full max-w-md bg-white border border-slate-250 text-slate-800 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-maroon-700 focus:outline-none">
                    <option>Hodu Academy Professional (Header, Footer, Watermark)</option>
                    <option>Standard Plain (No watermark)</option>
                  </select>
                </div>
              </div>

              {/* ACTION BUTTON ROW STEP 3 */}
              <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-4">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-700 uppercase flex items-center gap-1 transition"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Back
                </button>
                
                <button
                  type="button"
                  onClick={handleCreateTestPaper}
                  className="bg-red-850 hover:bg-red-900 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-7 rounded-xl transition flex items-center gap-1.5 shadow"
                >
                  <span>Create Test Paper</span>
                </button>
              </div>

            </div>
          )}

          {/* ============================================================ */}
          {/* ============ STEP 4: CREATED TEST PREVIEW MODULE =========== */}
          {/* ============================================================ */}
          {activeStep === 4 && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Draft Header Strip (Matches Screenshot 7) */}
              <div className="p-5 bg-slate-50/50 border border-slate-200 rounded-2xl flex flex-wrap justify-between items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-sans tracking-tight">
                      {testTitle} 
                    </h3>
                    <span className="bg-slate-200/80 text-slate-700 text-[9px] uppercase font-bold px-2 py-0.5 rounded tracking-wide font-mono">
                      Draft
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {questions.length} questions • {questions.length} marks total
                  </p>
                </div>

                {/* Top action keys array */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button 
                    onClick={() => setPreviewTab('editor')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                      previewTab === 'editor' ? 'bg-maroon-800 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Interactive Editor</span>
                  </button>

                  <button 
                    onClick={() => setPreviewTab('pdf')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                      previewTab === 'pdf' ? 'bg-maroon-800 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Double-Column PDF</span>
                  </button>

                  <button 
                    onClick={() => setPreviewTab('omr')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                      previewTab === 'omr' ? 'bg-maroon-800 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Scan OMR Sheet</span>
                  </button>

                  <button 
                    onClick={handleDownloadPDF}
                    className="p-2 px-3 bg-white border border-slate-250 rounded-lg text-slate-750 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                    title="Download Generated PDF Question Paper"
                  >
                    <Download className="w-3.5 h-3.5 text-maroon-850" />
                    <span>Download Paper</span>
                  </button>

                  <button 
                    onClick={handleDownloadOMR}
                    className="p-2 px-3 bg-white border border-slate-250 rounded-lg text-slate-750 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                    title="Download Vector Scan OMR Sheets"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Download OMR Sheet</span>
                  </button>

                  <button 
                    onClick={() => alert("AcadOS AI Assessment verification completed. Marking matches CBSE NEET guidelines!")}
                    className="p-2 px-3.5 bg-violet-650 hover:bg-violet-750 text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-sm transition"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Verify with AI</span>
                  </button>

                  <button 
                    onClick={() => {
                      setShowPublishSuccess(true);
                      setTimeout(() => setShowPublishSuccess(false), 5000);
                    }}
                    className="p-2 px-4.5 bg-maroon-850 hover:bg-maroon-900 text-white text-xs font-black rounded-lg transition shadow-sm"
                  >
                    Publish Test
                  </button>
                </div>
              </div>

              {/* VIEW SWITCHER CONTENT VIEWS */}
              <div className="pt-2">
                
                {/* 1. INTERACTIVE DESIGNER/EDITOR VIEW (Screenshot 7) */}
                {previewTab === 'editor' && (
                  <div className="space-y-6">
                    
                    {/* Section banner */}
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-xs flex-wrap gap-2 font-mono">
                      <span className="font-bold text-slate-800 uppercase">
                        Section A - Multiple Choice Question (1m)
                      </span>
                      <div className="flex items-center gap-4">
                        <span>Marks/Q: <strong className="text-slate-900 border border-slate-300 bg-white px-2 py-0.5 rounded font-bold">1</strong></span>
                        <span>Neg/wrong: <strong className="text-slate-900 border border-slate-300 bg-white px-2 py-0.5 rounded font-bold">0</strong></span>
                        <button 
                          onClick={() => setIsAddingQuestion(true)}
                          className="bg-maroon-800 hover:bg-maroon-900 text-white text-[10px] font-bold px-3 py-1 rounded flex items-center gap-1 uppercase transition-all"
                        >
                          <Plus className="w-3 h-3" /> Add Question
                        </button>
                      </div>
                    </div>

                    {/* Questions cards lists */}
                    <div className="space-y-4">
                      {questions.map((q, idx) => (
                        <div key={q.id} className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-sm hover:shadow-md transition-all flex gap-3 relative">
                          
                          {/* Drag index symbol */}
                          <div className="flex flex-col items-center justify-between py-1 text-slate-400 shrink-0">
                            <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[11px] text-slate-600 font-mono">
                              {idx + 1}
                            </span>
                          </div>

                          <div className="flex-1 space-y-3">
                            <p className="text-xs sm:text-sm text-slate-800 font-sans leading-relaxed">
                              {q.questionText}
                            </p>

                            {/* Option lists preview inside editor */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2 pt-1 text-xs text-slate-700">
                              {q.options.map((opt, oIdx) => (
                                <div key={oIdx} className="flex items-center gap-1.5">
                                  <span className="font-bold font-mono text-[10px] text-slate-450 uppercase">
                                    ({String.fromCharCode(97 + oIdx)})
                                  </span>
                                  <span>{opt}</span>
                                </div>
                              ))}
                            </div>

                            {/* Badges and tags */}
                            <div className="flex flex-wrap gap-2 pt-2 items-center text-[10px]">
                              <span className="bg-slate-100 border border-slate-205 text-slate-650 rounded px-2 py-0.5 font-bold uppercase tracking-wider font-mono">
                                {q.type}
                              </span>
                              <span className="bg-slate-100 border border-slate-205 text-slate-650 rounded px-2 py-0.5 font-bold uppercase tracking-wider font-mono">
                                {q.marks} marks
                              </span>
                              {q.year && (
                                <span className="bg-amber-50 border border-amber-200 text-amber-700 rounded px-2 py-0.5 font-bold font-mono">
                                  {q.year}
                                </span>
                              )}
                              <span className="bg-slate-100 border border-slate-205 text-slate-650 rounded px-2 py-0.5 font-bold uppercase">
                                {q.difficulty}
                              </span>

                              {/* Correct answer indicator */}
                              <span className="text-emerald-700 font-mono ml-auto font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                                Answer: {q.correctAnswer}
                              </span>
                            </div>
                          </div>

                          {/* Quick Right utility operations bar */}
                          <div className="flex flex-col gap-2 border-l border-slate-100 pl-3 justify-center shrink-0">
                            <button className="p-1 text-slate-400 hover:text-maroon-700 rounded transition" title="Edit text">
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1 text-slate-400 hover:text-maroon-700 rounded transition" title="Swap random replacement">
                              <RefreshCw className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteQuestion(q.id)}
                              className="p-1 text-slate-400 hover:text-red-600 rounded transition" 
                              title="Delete Question"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                        </div>
                      ))}
                    </div>

                    <div className="text-center pt-2">
                      <button 
                        onClick={() => setIsAddingQuestion(true)}
                        className="p-3 bg-white border border-dashed border-slate-300 hover:border-slate-500 rounded-xl font-sans font-bold text-xs text-slate-600 flex items-center gap-1.5 mx-auto transition"
                      >
                        <Plus className="w-4 h-4 text-slate-500" />
                        <span>Add New Custom Question</span>
                      </button>
                    </div>

                  </div>
                )}

                {/* 2. PRINTED TWO COLUMN PDF SHEET (Exact layout replica of Page 1) */}
                {previewTab === 'pdf' && (
                  <div className="bg-slate-300/60 p-4 sm:p-8 rounded-[24px] max-w-5xl mx-auto overflow-x-auto shadow-inner">
                    
                    {/* Simulated A4 Page Card */}
                    <div className="bg-white p-6 sm:p-10 rounded-lg shadow-2xl relative max-w-4xl mx-auto border border-slate-400/50 text-slate-900 font-serif min-h-[1050px]">
                      
                      {/* GIANT CENTER WATERMARK BRAND "HODU ACADEMY" ROTATED 45 DEGREE */}
                      <div className="absolute inset-x-0 top-1/3 flex items-center justify-center opacity-[0.035] pointer-events-none select-none z-0 transform rotate-35">
                        <span className="text-6xl sm:text-8xl font-black font-sans uppercase tracking-widest leading-none text-maroon-900 text-center">
                          HODU ACADEMY<br/>STUDY CIRCLE
                        </span>
                      </div>

                      {/* PDF TOP BANNERS GRID */}
                      <div className="border-b-4 border-maroon-850 pb-5 mb-5 relative z-10">
                        <div className="flex items-center gap-5 justify-center md:justify-start">
                          
                          {/* Circular Red HA Emblem on Left */}
                          <div className="w-16 h-16 rounded-full bg-maroon-850 flex items-center justify-center text-white shrink-0 shadow-sm border border-maroon-700">
                            <span className="text-2xl font-black font-sans leading-none tracking-tight">HA</span>
                          </div>

                          {/* Bold text */}
                          <div>
                            <h1 className="text-3xl sm:text-4xl font-black font-sans tracking-tight text-maroon-850 uppercase leading-none">
                              HODU ACADEMY
                            </h1>
                            <p className="text-[10px] tracking-widest font-black uppercase font-sans text-slate-500 pt-1.5">
                              Excellence in Board Exams & Competitive Assessment Prep
                            </p>
                          </div>
                        </div>

                        {/* Mid Meta Title line */}
                        <div className="text-center pt-5 mt-4 border-t border-slate-200">
                          <h2 className="text-lg font-bold font-sans tracking-wide text-slate-900 uppercase">
                            {testTitle}
                          </h2>
                          <div className="text-xs text-slate-600 font-medium font-sans flex justify-center items-center gap-6 mt-1 flex-wrap">
                            <span><strong>Total Marks:</strong> {totalMarksInput} pts</span>
                            <span>•</span>
                            <span><strong>Duration Limit:</strong> {durationInput} Minutes</span>
                            <span>•</span>
                            <span><strong>Subject Stream:</strong> {subjectStream}</span>
                          </div>
                        </div>
                      </div>

                      {/* Category double bordered banner line */}
                      <div className="border-t border-b border-double border-slate-900 py-1 mb-6 text-center z-10 relative">
                        <span className="font-sans font-bold text-xs uppercase tracking-widest text-slate-800">
                          Section A - Multiple Choice Question (1m)
                        </span>
                      </div>

                      {/* DOUBLE COLUMN LAYOUT BLOCK SPLIT (Like Screenshot Page 1) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 text-xs leading-relaxed text-slate-900 z-10 relative text-justify pr-1 font-sans">
                        
                        {/* LEFT COLUMN FIELDS */}
                        <div className="space-y-6 divide-y divide-slate-100">
                          {questions.slice(0, Math.ceil(questions.length / 2)).map((q, idx) => (
                            <div key={q.id} className={`space-y-2.5 ${idx > 0 ? 'pt-5' : ''}`}>
                              <p className="font-bold">
                                <span className="font-sans font-black mr-1 text-slate-900">Q{idx + 1}.</span>
                                {q.questionText}
                              </p>
                              <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[11px] font-medium text-slate-700 pl-1">
                                <div><strong>(A)</strong> {q.options[0]}</div>
                                <div><strong>(B)</strong> {q.options[1]}</div>
                                <div><strong>(C)</strong> {q.options[2]}</div>
                                <div><strong>(D)</strong> {q.options[3]}</div>
                              </div>
                              <span className="block text-[10px] text-right text-slate-400 mr-2 italic font-sans">[{q.marks} mark]</span>
                            </div>
                          ))}
                        </div>

                        {/* RIGHT COLUMN FIELDS */}
                        <div className="space-y-6 divide-y divide-slate-100 md:border-l md:border-slate-205 md:pl-6">
                          {questions.slice(Math.ceil(questions.length / 2)).map((q, idx) => {
                            const overallIdx = Math.ceil(questions.length / 2) + idx;
                            return (
                              <div key={q.id} className={`space-y-2.5 ${idx > 0 ? 'pt-5' : ''}`}>
                                <p className="font-bold">
                                  <span className="font-sans font-black mr-1 text-slate-900">Q{overallIdx + 1}.</span>
                                  {q.questionText}
                                </p>
                                <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[11px] font-medium text-slate-700 pl-1">
                                  <div><strong>(A)</strong> {q.options[0]}</div>
                                  <div><strong>(B)</strong> {q.options[1]}</div>
                                  <div><strong>(C)</strong> {q.options[2]}</div>
                                  <div><strong>(D)</strong> {q.options[3]}</div>
                                </div>
                                <span className="block text-[10px] text-right text-slate-400 mr-2 italic font-sans">[{q.marks} mark]</span>
                              </div>
                            );
                          })}
                        </div>

                      </div>

                      {/* PDF PRINT BRANDED SOLID FOOTER (Exact replica of lower row) */}
                      <div className="mt-16 pt-3 border-t border-slate-350 z-10 relative">
                        <div className="bg-maroon-850 px-4 py-2.5 rounded-lg flex flex-col md:flex-row justify-between items-center text-white text-[11px] font-sans gap-2">
                          
                          {/* Left: Phone */}
                          <div className="flex items-center gap-1">
                            <span className="bg-white/10 p-1 rounded font-bold font-mono">9257879555</span>
                          </div>

                          {/* Center: Web */}
                          <div className="flex items-center gap-1 italic text-slate-100 font-medium">
                            <span>www.hoduacademy.com</span>
                          </div>

                          {/* Right: Address */}
                          <div className="flex items-center gap-1 opacity-90 text-[10px] text-center">
                            <span>Address: C-28, Vaishali Estate, Gandhi Path (W)</span>
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 3. DIGITAL OMR TEMPLATE PREVIEW VIEW */}
                {previewTab === 'omr' && (
                  <div className="bg-white p-6 sm:p-8 rounded-[24px] border border-slate-200 shadow-xl max-w-md mx-auto">
                    <div className="text-center pb-4 mb-4 border-b border-slate-300">
                      <h4 className="text-sm font-bold uppercase tracking-tight text-slate-900 font-sans">
                        HODU ACADEMY STUDY CIRCLE
                      </h4>
                      <h5 className="text-[10px] text-slate-500 uppercase tracking-widest font-black mt-1">
                        Vector-Grade Digital OMR Sheet Catalog
                      </h5>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono border border-slate-300 p-2.5 rounded mb-4 text-slate-800">
                      <div><strong>STUDENT NAME:</strong> ________________</div>
                      <div><strong>ID ROLL NO:</strong> ________________</div>
                      <div><strong>DATE:</strong> 16.06.2026</div>
                      <div><strong>SUBJECT:</strong> {subjectStream}</div>
                    </div>

                    <div className="text-[9px] text-slate-600 text-center mb-4 leading-normal bg-amber-50 border border-amber-200 p-2 rounded">
                      <strong>BUBBLE GUIDE:</strong> Use deep dark pen. Fill the circles completely. Partial ticks cannot be evaluated by the smartphone scanner app.
                    </div>

                    <div className="space-y-3 pt-2">
                      {questions.map((q, idx) => (
                        <div key={idx} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0 text-xs">
                          <span className="font-mono font-bold text-slate-900 w-8">
                            Q{idx + 1}
                          </span>
                          
                          <div className="flex gap-4">
                            {['A', 'B', 'C', 'D'].map((char) => (
                              <div key={char} className="flex flex-col items-center gap-1">
                                <span className="w-6 h-6 rounded-full border border-slate-300 hover:border-slate-600 text-[11px] font-bold font-mono flex items-center justify-center transition-all">
                                  {char}
                                </span>
                              </div>
                            ))}
                          </div>

                          <span className="text-[9px] font-mono font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase">
                            {q.type}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center border-t border-slate-350 pt-4 mt-6">
                      <span className="text-[8px] text-slate-400 font-mono">TEMPLATE KEY: acados_omr_v2_108</span>
                      <div className="flex gap-1 select-none">
                        <span className="w-2.5 h-2.5 bg-black" />
                        <span className="w-2.5 h-2.5 bg-black" />
                        <span className="w-2.5 h-2.5 bg-black" />
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </div>
          )}

        </div>
      )}

      {/* ADD CUSTOM QUESTION MODAL OVERLAY */}
      {isAddingQuestion && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex justify-between items-center border-b border-slate-150 pb-3">
              <h3 className="text-md sm:text-lg font-bold text-slate-900 font-sans tracking-tight">
                Add New Custom Question to Paper
              </h3>
              <button 
                type="button" 
                onClick={() => setIsAddingQuestion(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm font-sans">
              {/* Question Text */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">Question Text *</label>
                <textarea
                  value={customQText}
                  onChange={(e) => setCustomQText(e.target.value)}
                  placeholder="Write your custom exam question here..."
                  className="w-full bg-white border border-slate-250 text-slate-800 rounded-xl p-3 focus:ring-1 focus:ring-maroon-700 focus:outline-none min-h-[70px] text-xs leading-relaxed"
                />
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">Option A *</label>
                  <input
                    type="text"
                    value={customOptA}
                    onChange={(e) => setCustomOptA(e.target.value)}
                    placeholder="First option value"
                    className="w-full bg-white border border-slate-250 text-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-maroon-700 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">Option B *</label>
                  <input
                    type="text"
                    value={customOptB}
                    onChange={(e) => setCustomOptB(e.target.value)}
                    placeholder="Second option value"
                    className="w-full bg-white border border-slate-250 text-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-maroon-700 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">Option C *</label>
                  <input
                    type="text"
                    value={customOptC}
                    onChange={(e) => setCustomOptC(e.target.value)}
                    placeholder="Third option value"
                    className="w-full bg-white border border-slate-250 text-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-maroon-700 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">Option D *</label>
                  <input
                    type="text"
                    value={customOptD}
                    onChange={(e) => setCustomOptD(e.target.value)}
                    placeholder="Fourth option value"
                    className="w-full bg-white border border-slate-250 text-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-maroon-705 focus:outline-none"
                  />
                </div>
              </div>

              {/* Selected Answer option & marks */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">Correct Choice</label>
                  <select
                    value={customAnswer}
                    onChange={(e) => setCustomAnswer(e.target.value)}
                    className="w-full bg-white border border-slate-250 text-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-maroon-705 focus:outline-none"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">Marks Weightage</label>
                  <input
                    type="number"
                    value={customMarks}
                    onChange={(e) => setCustomMarks(parseInt(e.target.value) || 4)}
                    min="1"
                    max="20"
                    className="w-full bg-white border border-slate-250 text-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-maroon-705 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">Difficulty</label>
                  <select
                    value={customDifficulty}
                    onChange={(e) => setCustomDifficulty(e.target.value as any)}
                    className="w-full bg-white border border-slate-250 text-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-maroon-705 focus:outline-none"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">Target Year</label>
                  <input
                    type="text"
                    value={customYear}
                    onChange={(e) => setCustomYear(e.target.value)}
                    placeholder="e.g. 2026"
                    className="w-full bg-white border border-slate-250 text-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-maroon-705 focus:outline-none"
                  />
                </div>
              </div>

              {/* Explain Solution */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">Solution Explanation (Optional)</label>
                <textarea
                  value={customSolution}
                  onChange={(e) => setCustomSolution(e.target.value)}
                  placeholder="Provide step-by-step resolution details..."
                  className="w-full bg-white border border-slate-250 text-slate-800 rounded-xl p-3 focus:ring-1 focus:ring-maroon-700 focus:outline-none min-h-[50px] text-xs leading-relaxed"
                />
              </div>
            </div>

            <div className="flex justify-end items-center gap-3 border-t border-slate-150 pt-3 select-none">
              <button 
                type="button" 
                onClick={() => setIsAddingQuestion(false)}
                className="px-4 py-2 text-xs font-bold font-sans text-slate-650 hover:bg-slate-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={handleSaveCustomQuestion}
                className="px-4 py-2.5 text-xs font-sans font-bold text-white bg-maroon-800 hover:bg-maroon-900 rounded-xl transition shadow"
              >
                Save Question
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING SUCCESS PUBLISHED NOTIFICATION */}
      {showPublishSuccess && (
        <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 bg-emerald-600 text-white rounded-2xl px-5 py-4 shadow-2xl border border-emerald-500 flex items-center gap-3.5 z-50 animate-slideUp font-sans max-w-sm">
          <div className="bg-white/20 p-2 rounded-xl">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-0.5">
            <p className="text-sm font-extrabold tracking-wide">Published Successfully!</p>
            <p className="text-[11px] text-emerald-100 leading-tight">
              Test paper "{testTitle}" has been whitelabeled and synchronised to student dashboards.
            </p>
          </div>
          <button 
            type="button" 
            onClick={() => setShowPublishSuccess(false)}
            className="text-white/70 hover:text-white ml-auto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
