import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimationFrame } from "motion/react";
import {
  Check, X, ArrowRight, FileText, Users, ScanLine,
  MonitorPlay, GraduationCap, Library, Database,
  BookOpen, TrendingUp, Zap, Star, ArrowUpRight
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   ANIMATED HUB MODEL — reusable radial diagram
══════════════════════════════════════════════════════════════ */

interface HubNode {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  angle: number; // degrees
}

function OrbitDot({ cx1, cy1, cx2, cy2, delay }: { cx1:number; cy1:number; cx2:number; cy2:number; delay:number }) {
  const [t, setT] = useState(delay % 1);
  useAnimationFrame((_, delta) => {
    setT(p => (p + delta / 2800) % 1);
  });
  const x = cx1 + (cx2 - cx1) * t;
  const y = cy1 + (cy2 - cy1) * t;
  return <circle cx={x} cy={y} r={4} fill="#d4a017" opacity={0.9} />;
}

function HubDiagram({ nodes, title, subtitle, centerLabel, centerSub }: {
  nodes: HubNode[];
  title: string;
  subtitle: string;
  centerLabel: string;
  centerSub: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const cx = 260; const cy = 260; // SVG center
  const radius = 185;

  const pts = nodes.map(n => {
    const rad = (n.angle - 90) * Math.PI / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  });

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <motion.div
        initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight" style={{ fontFamily:"'Playfair Display',serif" }}>
          {title}
        </h2>
        <p className="mt-2 text-white/50 text-sm max-w-md mx-auto">{subtitle}</p>
      </motion.div>

      <motion.div
        initial={{ opacity:0, scale:0.92 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ duration:0.7, delay:0.1 }}
        className="relative w-full max-w-[520px] mx-auto"
      >
        <svg viewBox="0 0 520 520" className="w-full drop-shadow-xl">
          {/* glow bg */}
          <defs>
            <radialGradient id={`glow-${centerLabel}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#800000" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#800000" stopOpacity="0" />
            </radialGradient>
            <filter id="blur-glow">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <circle cx={cx} cy={cy} r={200} fill={`url(#glow-${centerLabel})`} />

          {/* connection lines */}
          {pts.map((p, i) => {
            const node = nodes[i];
            const isActive = active === node.id;
            return (
              <g key={node.id}>
                {/* base line */}
                <line
                  x1={cx} y1={cy} x2={p.x} y2={p.y}
                  stroke={isActive ? node.color : "#ffffff18"}
                  strokeWidth={isActive ? 2 : 1.5}
                  strokeDasharray={isActive ? "none" : "6 4"}
                  style={{ transition:"stroke 0.3s, strokeWidth 0.3s" }}
                />
                {/* animated orbit dot */}
                <OrbitDot cx1={cx} cy1={cy} cx2={p.x} cy2={p.y} delay={i * 0.14} />
              </g>
            );
          })}

          {/* node circles */}
          {nodes.map((n, i) => {
            const p = pts[i];
            const isActive = active === n.id;
            const Icon = n.icon;
            return (
              <g key={n.id} style={{ cursor:"pointer" }} onClick={() => setActive(a => a===n.id ? null : n.id)}>
                {/* glow ring on active */}
                {isActive && (
                  <circle cx={p.x} cy={p.y} r={54} fill={n.bg} opacity={0.5} />
                )}
                <circle cx={p.x} cy={p.y} r={42} fill="#12121a" stroke={isActive ? n.color : "#ffffff22"} strokeWidth={isActive ? 2.5 : 1.5} />
                {/* foreignObject for icon */}
                <foreignObject x={p.x-18} y={p.y-18} width={36} height={36}>
                  <div style={{ color: n.color, display:"flex", alignItems:"center", justifyContent:"center", width:"100%", height:"100%" }}>
                    <Icon size={24} />
                  </div>
                </foreignObject>
                {/* label */}
                <text
                  x={p.x} y={p.y + 62}
                  textAnchor="middle" fontSize={14} fontWeight={700}
                  fill={isActive ? "#ffffff" : "rgba(255,255,255,0.75)"}
                  fontFamily="Inter, sans-serif"
                >
                  {n.label}
                </text>
                {isActive && (
                  <text x={p.x} y={p.y + 80} textAnchor="middle" fontSize={11} fill={n.color} fontFamily="Inter, sans-serif">
                    {n.sublabel}
                  </text>
                )}
              </g>
            );
          })}

          {/* CENTER */}
          <circle cx={cx} cy={cy} r={62} fill="#800000" />
          <circle cx={cx} cy={cy} r={58} fill="none" stroke="#d4a017" strokeWidth={1.5} strokeDasharray="4 3" opacity={0.6}>
            <animateTransform attributeName="transform" type="rotate" from="0 260 260" to="360 260 260" dur="20s" repeatCount="indefinite" />
          </circle>
          <text x={cx} y={cy - 8} textAnchor="middle" fontSize={15} fontWeight={900} fill="white" fontFamily="Playfair Display, serif">{centerLabel}</text>
          <text x={cx} y={cy + 10} textAnchor="middle" fontSize={8} fill="rgba(255,255,255,0.7)" fontFamily="Inter, sans-serif">{centerSub}</text>
          {/* center pulse ring */}
          <circle cx={cx} cy={cy} r={68} fill="none" stroke="#800000" strokeWidth={1} opacity={0.3}>
            <animate attributeName="r" values="65;80;65" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* Active node detail card */}
        <AnimatePresence>
          {active && (() => {
            const n = nodes.find(n => n.id === active)!;
            const Icon = n.icon;
            return (
              <motion.div
                key={active}
                initial={{ opacity:0, y:10, scale:0.95 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:10, scale:0.95 }}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 flex items-center gap-3"
                style={{ zIndex:10 }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: n.bg }}>
                  <Icon size={18} style={{ color: n.color }} />
                </div>
                <div>
                  <p className="font-bold text-sm text-neutral-900">{n.label}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{n.sublabel}</p>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   3 MODELS DATA
══════════════════════════════════════════════════════════════ */

const MODEL_1: HubNode[] = [
  { id:"erp",       label:"Institute ERP",    sublabel:"Fees · Attendance · Schedule",  icon:Database,    color:"#2563eb", bg:"#eff6ff", angle:0   },
  { id:"crm",       label:"Admissions CRM",   sublabel:"Leads · WhatsApp · Funnel",     icon:TrendingUp,  color:"#7c3aed", bg:"#f5f3ff", angle:51  },
  { id:"testmaker", label:"TestMaker",         sublabel:"5L+ Questions · Branded PDFs",  icon:FileText,    color:"#d97706", bg:"#fffbeb", angle:103 },
  { id:"omr",       label:"OMR Scanner",       sublabel:"Camera · 200 sheets/hr",        icon:ScanLine,    color:"#059669", bg:"#ecfdf5", angle:154 },
  { id:"cbt",       label:"CBT Platform",      sublabel:"NTA-style · Real-time scores",  icon:MonitorPlay, color:"#dc2626", bg:"#fef2f2", angle:206 },
  { id:"hub",       label:"Learners Hub",      sublabel:"DPPs · Content · Portfolio",    icon:GraduationCap,color:"#0891b2",bg:"#ecfeff", angle:257 },
  { id:"content",   label:"Content Library",   sublabel:"CBSE · IB · IGCSE mapped",      icon:Library,     color:"#ea580c", bg:"#fff7ed", angle:309 },
];

const MODEL_2: HubNode[] = [
  { id:"student",   label:"Student Joins",     sublabel:"Admission via CRM",             icon:Users,       color:"#7c3aed", bg:"#f5f3ff", angle:0   },
  { id:"paper",     label:"Exam Paper",        sublabel:"TestMaker in 3 mins",           icon:FileText,    color:"#d97706", bg:"#fffbeb", angle:60  },
  { id:"practice",  label:"CBT Practice",      sublabel:"NTA mock under real timer",     icon:MonitorPlay, color:"#dc2626", bg:"#fef2f2", angle:120 },
  { id:"omr2",      label:"Answer Graded",     sublabel:"Smartphone OMR scan",           icon:ScanLine,    color:"#059669", bg:"#ecfdf5", angle:180 },
  { id:"result",    label:"Score Published",   sublabel:"Instant leaderboard dispatch",  icon:Star,        color:"#d97706", bg:"#fffbeb", angle:240 },
  { id:"parent",    label:"Parent Notified",   sublabel:"Auto WhatsApp + portal",        icon:Zap,         color:"#2563eb", bg:"#eff6ff", angle:300 },
];

const MODEL_3: HubNode[] = [
  { id:"principal", label:"Principal",         sublabel:"ERP · Fee · Approvals",         icon:BookOpen,    color:"#800000", bg:"#fdecec", angle:0   },
  { id:"teacher",   label:"Teacher",           sublabel:"TestMaker · DPPs · Attendance", icon:FileText,    color:"#d97706", bg:"#fffbeb", angle:72  },
  { id:"counselor", label:"Counselor",         sublabel:"CRM Funnel · Lead nurture",     icon:TrendingUp,  color:"#7c3aed", bg:"#f5f3ff", angle:144 },
  { id:"student2",  label:"Student",           sublabel:"Learners Hub · CBT · Scores",   icon:GraduationCap,color:"#059669",bg:"#ecfdf5", angle:216 },
  { id:"admin",     label:"Admin Staff",       sublabel:"OMR · Schedules · Reports",     icon:Database,    color:"#2563eb", bg:"#eff6ff", angle:288 },
];

/* ══════════════════════════════════════════════════════════════
   COMPARISON TABLE (kept as-is from before)
══════════════════════════════════════════════════════════════ */
const FEATURES = [
  "Exam Paper Generation","Branded Student Portal","Smartphone OMR Grading",
  "CRM + Admissions Funnel","CBT Mock Exam Platform","Institute ERP + Fees",
  "Content Library (CBSE)","White-label Branding","Mobile-First Design","Dedicated Onboarding",
];

function CompareRow({ feature, alt, idx }: { feature:string; alt:boolean; idx:number }) {
  const bg = alt ? "bg-white" : "bg-neutral-50/50";
  const manual = idx === 9 ? "partial" : "no";
  const generic = [0,5,8].includes(idx) ? "yes" : (idx===4||idx===7) ? "partial" : "no";
  const CellIcon = ({ state }: { state:string }) => (
    <div className={`${bg} border-t border-neutral-100 p-4 text-center`}>
      {state==="yes" ? <Check className="mx-auto h-5 w-5 text-emerald-500" /> :
       state==="partial" ? <span className="text-xs text-amber-600 font-medium">Partial</span> :
       <X className="mx-auto h-5 w-5 text-rose-300" />}
    </div>
  );
  return (
    <>
      <div className={`${bg} border-t border-neutral-100 p-4 text-sm font-medium text-neutral-700`}>{feature}</div>
      <CellIcon state={manual} />
      <CellIcon state={generic} />
      <div className="border-t border-[#800000]/15 bg-[#800000]/[0.03] p-4 text-center">
        <Check className="mx-auto h-5 w-5 text-emerald-500" strokeWidth={2.5} />
      </div>
    </>
  );
}

function Comparison({ onBookDemo }: { onBookDemo:()=>void }) {
  return (
    <motion.section
      initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
      className="bg-white px-6 py-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-4xl font-black tracking-tight text-neutral-900 sm:text-5xl" style={{ fontFamily:"'Playfair Display',serif" }}>
            One platform. Everything that matters.
          </h2>
          <p className="mt-4 text-neutral-500">Compare AcadOS to how most institutions operate today.</p>
        </div>
        <div className="overflow-x-auto rounded-3xl border border-black/5 bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.12)]">
          <div className="grid min-w-[480px] grid-cols-[1.5fr_1fr_1fr_1fr] text-sm">
            <div className="bg-neutral-50 p-4 text-[10px] font-bold uppercase tracking-wider text-neutral-400">Feature</div>
            <div className="bg-neutral-50 p-4 text-center text-[10px] font-bold uppercase tracking-wider text-neutral-400">Manual</div>
            <div className="bg-neutral-50 p-4 text-center text-[10px] font-bold uppercase tracking-wider text-neutral-400">Generic Software</div>
            <div className="bg-gradient-to-b from-[#800000] to-[#5a0000] p-4 text-center text-[10px] font-bold uppercase tracking-wider text-white">AcadOS</div>
            {FEATURES.map((f,i) => <CompareRow key={f} feature={f} alt={i%2===0} idx={i} />)}
            <div className="p-4" /><div className="p-4" /><div className="p-4" />
            <div className="bg-gradient-to-b from-[#5a0000] to-[#3d0000] p-5 text-center">
              <button onClick={onBookDemo} className="wa-shimmer inline-flex items-center gap-2 rounded-full bg-[#d4a017] px-5 py-2.5 text-sm font-bold text-[#3d0000] shadow-lg transition-transform hover:scale-105">
                Get AcadOS <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ══════════════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════════════ */
export default function WhyAcadOS({ onBookDemo }: { onBookDemo: () => void }) {
  return (
    <main className="text-neutral-900 antialiased overflow-x-hidden">

      {/* ══ DARK SCI-FI HERO + HUB DIAGRAMS ══ */}
      <div className="relative overflow-hidden" style={{ background: '#050508' }}>
        {/* Animated grid */}
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          backgroundImage:`linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)`,
          backgroundSize:'60px 60px',
          animation:'grid-scroll 3s linear infinite',
        }} />
        {/* Scan line */}
        <div style={{
          position:'absolute', left:0, right:0, height:'2px',
          background:'linear-gradient(90deg,transparent,#80000080,transparent)',
          animation:'scan-line 4s linear infinite',
          pointerEvents:'none',
        }} />
        {/* Ambient orbs */}
        <div style={{ position:'absolute', top:'-15%', left:'-10%', width:'600px', height:'600px', borderRadius:'50%', background:'radial-gradient(circle,#80000028 0%,transparent 70%)', animation:'orb-pulse 6s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-15%', right:'-10%', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle,#d4a01720 0%,transparent 70%)', animation:'orb-pulse 8s ease-in-out infinite 2s', pointerEvents:'none' }} />

        {/* PAGE HEADER */}
        <motion.section
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
          className="relative z-10 pt-16 pb-4 px-6 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#800000]/50 bg-[#800000]/20 px-4 py-1.5 text-xs font-semibold text-[#d4a017] backdrop-blur mb-4">
            Why AcadOS
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white" style={{ fontFamily:"'Playfair Display',serif", textShadow:'0 0 60px rgba(128,0,0,0.4)' }}>
            Everything your institution needs.{" "}
            <span style={{ background:"linear-gradient(110deg,#d4a017,#f0c75e)", WebkitBackgroundClip:"text", backgroundClip:"text", color:"transparent" }}>
              One OS.
            </span>
          </h1>
          <p className="mt-4 text-white/50 text-lg max-w-xl mx-auto">Tap any node to explore what each module does.</p>
        </motion.section>

        {/* ── 3 MODELS in a row on desktop ── */}
        <section className="relative z-10 py-16 px-4">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4 items-start">
          <HubDiagram
            nodes={MODEL_1}
            title="Full Ecosystem"
            subtitle="7 modules unified. Tap each node."
            centerLabel="AcadOS"
            centerSub="Academic OS"
          />
          <HubDiagram
            nodes={MODEL_2}
            title="Student Journey"
            subtitle="Admission to result — automated."
            centerLabel="AcadOS"
            centerSub="Student Engine"
          />
          <HubDiagram
            nodes={MODEL_3}
            title="Every Role"
            subtitle="Principal, teacher, student — connected."
            centerLabel="AcadOS"
            centerSub="Unified Platform"
          />
        </div>
        </section>
      </div>{/* end dark sci-fi wrapper */}

      {/* ── COMPARISON TABLE ── */}
      <Comparison onBookDemo={onBookDemo} />

    </main>
  );
}
