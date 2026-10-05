import React from 'react';

interface ProblemIllustrationProps {
  id: string;
}

export const ProblemIllustration: React.FC<ProblemIllustrationProps> = ({ id }) => {
  switch (id) {
    case 'library-problem':
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full object-cover select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Dark Slate Canvas */}
          <rect width="320" height="200" fill="#0F172A" />
          <circle cx="160" cy="100" r="90" fill="#1E293B" opacity="0.6" />

          {/* Symmetrical Grid Dots Background */}
          <pattern id="grid-1" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="1" fill="#334155" opacity="0.5" />
          </pattern>
          <rect width="320" height="200" fill="url(#grid-1)" />

          {/* Left Flank: Unorganized WhatsApp PDF Chaos */}
          <g className="transition-transform duration-500 group-hover:-translate-y-1">
            <rect x="24" y="45" width="70" height="85" rx="6" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
            <rect x="32" y="55" width="38" height="6" rx="2" fill="#E2E8F0" opacity="0.7" />
            <rect x="32" y="67" width="54" height="4" rx="2" fill="#64748B" />
            <rect x="32" y="75" width="46" height="4" rx="2" fill="#64748B" />
            <rect x="32" y="83" width="50" height="4" rx="2" fill="#64748B" />
            {/* PDF Badge */}
            <rect x="32" y="97" width="28" height="16" rx="3" fill="#EF4444" />
            <text x="46" y="109" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">PDF</text>
          </g>

          {/* Left Floating WhatsApp Bubble */}
          <g className="transition-transform duration-500 group-hover:-translate-x-1">
            <circle cx="85" cy="42" r="18" fill="#22C55E" />
            <path d="M78 42C78 38.134 81.134 35 85 35C88.866 35 92 38.134 92 42C92 45.866 88.866 49 85 49C83.7 49 82.5 48.65 81.5 48L77 49L78.2 45.2C77.4 44.2 78 43.1 78 42Z" fill="white" />
            <circle cx="96" cy="30" r="7" fill="#EF4444" />
            <text x="96" y="33.5" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">99+</text>
          </g>

          {/* Center Smartphone Screen */}
          <g>
            <rect x="115" y="25" width="90" height="150" rx="14" fill="#020617" stroke="#38BDF8" strokeWidth="2" />
            {/* Speaker & Notch */}
            <rect x="145" y="31" width="30" height="4" rx="2" fill="#334155" />
            
            {/* Screen Content - Messy Chat Feed */}
            <rect x="123" y="42" width="74" height="116" rx="6" fill="#0F172A" />
            
            {/* Incoming PDF Bubble 1 */}
            <rect x="127" y="50" width="54" height="24" rx="5" fill="#1E293B" />
            <rect x="132" y="56" width="16" height="12" rx="2" fill="#EF4444" />
            <rect x="152" y="56" width="24" height="3" rx="1" fill="#94A3B8" />
            <rect x="152" y="62" width="18" height="3" rx="1" fill="#64748B" />

            {/* Outgoing Question Bubble */}
            <rect x="139" y="80" width="54" height="20" rx="5" fill="#0369A1" />
            <rect x="144" y="86" width="32" height="3" rx="1" fill="#E0F2FE" />

            {/* Incoming Warning Bubble */}
            <rect x="127" y="106" width="62" height="28" rx="5" fill="#78350F" stroke="#F59E0B" strokeWidth="1" />
            <text x="133" y="118" fill="#FCD34D" fontSize="7" fontWeight="bold" fontFamily="sans-serif">⚠️ File Expired</text>
            <rect x="133" y="122" width="48" height="3" rx="1" fill="#F59E0B" opacity="0.6" />
          </g>

          {/* Right Flank: Scattered Notes & Audio */}
          <g className="transition-transform duration-500 group-hover:translate-y-1">
            <rect x="226" y="45" width="70" height="85" rx="6" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
            <rect x="234" y="55" width="48" height="6" rx="2" fill="#E2E8F0" opacity="0.7" />
            <rect x="234" y="67" width="54" height="4" rx="2" fill="#64748B" />
            <rect x="234" y="75" width="40" height="4" rx="2" fill="#64748B" />
            <rect x="234" y="83" width="46" height="4" rx="2" fill="#64748B" />
            {/* Question Mark Badge */}
            <circle cx="272" cy="105" r="10" fill="#F59E0B" />
            <text x="272" y="109" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">?</text>
          </g>

          {/* Right Floating Audio Note Bubble */}
          <g className="transition-transform duration-500 group-hover:translate-x-1">
            <rect x="215" y="132" width="75" height="24" rx="12" fill="#1E293B" stroke="#38BDF8" strokeWidth="1" />
            <circle cx="227" cy="144" r="7" fill="#0EA5E9" />
            <path d="M225 141L230 144L225 147V141Z" fill="white" />
            <rect x="238" y="142" width="3" height="4" rx="1" fill="#38BDF8" />
            <rect x="243" y="140" width="3" height="8" rx="1" fill="#38BDF8" />
            <rect x="248" y="138" width="3" height="12" rx="1" fill="#38BDF8" />
            <rect x="253" y="141" width="3" height="6" rx="1" fill="#38BDF8" />
            <rect x="258" y="143" width="3" height="3" rx="1" fill="#38BDF8" />
            <rect x="263" y="140" width="3" height="8" rx="1" fill="#38BDF8" />
          </g>

          {/* Top Symmetrical Warning Header */}
          <g>
            <rect x="95" y="8" width="130" height="20" rx="10" fill="#451A03" stroke="#F59E0B" strokeWidth="1" />
            <circle cx="108" cy="18" r="4" fill="#EF4444" className="animate-pulse" />
            <text x="162" y="22" fill="#FDE68A" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">UNINDEXED PDF CHAOS</text>
          </g>
        </svg>
      );

    case 'testmaker-problem':
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full object-cover select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Dark Slate Canvas */}
          <rect width="320" height="200" fill="#0F172A" />
          <circle cx="160" cy="100" r="90" fill="#1E293B" opacity="0.6" />

          {/* Grid background */}
          <pattern id="grid-2" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="1" fill="#334155" opacity="0.5" />
          </pattern>
          <rect width="320" height="200" fill="url(#grid-2)" />

          {/* Main Paper Sheet - Symmetrical Center */}
          <g>
            <rect x="60" y="24" width="200" height="152" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
            {/* Header bar */}
            <rect x="74" y="36" width="172" height="14" rx="3" fill="#334155" />
            <rect x="80" y="41" width="80" height="4" rx="1" fill="#94A3B8" />
            <rect x="180" y="41" width="58" height="4" rx="1" fill="#0EA5E9" />

            {/* LaTeX Formula Box 1 - Broken Alignment */}
            <g className="transition-transform duration-500 group-hover:-translate-x-1">
              <rect x="74" y="60" width="172" height="32" rx="5" fill="#0F172A" stroke="#EF4444" strokeWidth="1" strokeDasharray="3 3" />
              <text x="84" y="76" fill="#F87171" fontSize="10" fontFamily="serif" fontWeight="bold">∫ (3x² + 2x) dx = ?</text>
              <rect x="180" y="68" width="58" height="16" rx="3" fill="#7F1D1D" />
              <text x="209" y="79" fill="#FCA5A5" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">FORMAT ERROR</text>
            </g>

            {/* LaTeX Formula Box 2 - MS Word Glitch */}
            <g className="transition-transform duration-500 group-hover:translate-x-1">
              <rect x="74" y="100" width="172" height="32" rx="5" fill="#0F172A" stroke="#F59E0B" strokeWidth="1" />
              <text x="84" y="117" fill="#FBBF24" fontSize="10" fontFamily="serif" fontWeight="bold">lim x→0 [sin(x)/x] = 1</text>
              <rect x="180" y="108" width="58" height="16" rx="3" fill="#78350F" />
              <text x="209" y="119" fill="#FDE68A" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">FONT CLASH</text>
            </g>

            {/* Scissor / Cut Icon */}
            <circle cx="48" cy="116" r="14" fill="#EF4444" stroke="#7F1D1D" strokeWidth="1" />
            <path d="M42 110L50 118M42 122L50 114" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="42" cy="110" r="2.5" stroke="white" strokeWidth="1.5" fill="none" />
            <circle cx="42" cy="122" r="2.5" stroke="white" strokeWidth="1.5" fill="none" />

            {/* Hours Wasted Timer Badge */}
            <g>
              <rect x="88" y="142" width="144" height="22" rx="11" fill="#451A03" stroke="#F59E0B" strokeWidth="1" />
              <circle cx="102" cy="153" r="6" fill="#F59E0B" />
              <path d="M102 149V153L105 155" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
              <text x="164" y="156" fill="#FDE68A" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3+ HOURS FORMATTING</text>
            </g>
          </g>

          {/* Symmetrical Top Banner */}
          <g>
            <rect x="90" y="8" width="140" height="20" rx="10" fill="#1E1B4B" stroke="#6366F1" strokeWidth="1" />
            <text x="160" y="21" fill="#C7D2FE" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">MANUAL MS WORD FRICTION</text>
          </g>
        </svg>
      );

    case 'omr-problem':
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full object-cover select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Dark Slate Canvas */}
          <rect width="320" height="200" fill="#0F172A" />
          <circle cx="160" cy="100" r="90" fill="#1E293B" opacity="0.6" />

          {/* Grid background */}
          <pattern id="grid-3" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="1" fill="#334155" opacity="0.5" />
          </pattern>
          <rect width="320" height="200" fill="url(#grid-3)" />

          {/* Symmetrical Stack of OMR Sheets - Left Pile */}
          <g className="transition-transform duration-500 group-hover:-translate-y-1">
            <rect x="30" y="70" width="80" height="95" rx="5" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
            <rect x="25" y="75" width="80" height="95" rx="5" fill="#334155" stroke="#475569" strokeWidth="1.5" />
            <rect x="20" y="80" width="80" height="95" rx="5" fill="#0F172A" stroke="#64748B" strokeWidth="1.5" />
            {/* OMR Bubble Grid Preview */}
            <circle cx="32" cy="95" r="3" fill="#0EA5E9" />
            <circle cx="42" cy="95" r="3" fill="#64748B" />
            <circle cx="52" cy="95" r="3" fill="#64748B" />
            <circle cx="62" cy="95" r="3" fill="#64748B" />

            <circle cx="32" cy="110" r="3" fill="#64748B" />
            <circle cx="42" cy="110" r="3" fill="#0EA5E9" />
            <circle cx="52" cy="110" r="3" fill="#64748B" />
            <circle cx="62" cy="110" r="3" fill="#64748B" />

            <circle cx="32" cy="125" r="3" fill="#64748B" />
            <circle cx="42" cy="125" r="3" fill="#64748B" />
            <circle cx="52" cy="125" r="3" fill="#EF4444" />
            <circle cx="62" cy="125" r="3" fill="#64748B" />
          </g>

          {/* Symmetrical Stack of OMR Sheets - Right Pile */}
          <g className="transition-transform duration-500 group-hover:-translate-y-1">
            <rect x="210" y="70" width="80" height="95" rx="5" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
            <rect x="215" y="75" width="80" height="95" rx="5" fill="#334155" stroke="#475569" strokeWidth="1.5" />
            <rect x="220" y="80" width="80" height="95" rx="5" fill="#0F172A" stroke="#64748B" strokeWidth="1.5" />
            {/* OMR Bubble Grid Preview */}
            <circle cx="232" cy="95" r="3" fill="#64748B" />
            <circle cx="242" cy="95" r="3" fill="#0EA5E9" />
            <circle cx="252" cy="95" r="3" fill="#64748B" />
            <circle cx="262" cy="95" r="3" fill="#64748B" />

            <circle cx="232" cy="110" r="3" fill="#64748B" />
            <circle cx="242" cy="110" r="3" fill="#64748B" />
            <circle cx="252" cy="110" r="3" fill="#64748B" />
            <circle cx="262" cy="110" r="3" fill="#0EA5E9" />
          </g>

          {/* Center Main OMR Sheet being scanned */}
          <g>
            <rect x="105" y="35" width="110" height="145" rx="6" fill="#1E293B" stroke="#0EA5E9" strokeWidth="2" />
            <rect x="115" y="45" width="90" height="12" rx="3" fill="#334155" />
            <text x="160" y="54" fill="#94A3B8" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">PHYSICAL OMR SHEET</text>

            {/* OMR Grid Lines */}
            {[70, 85, 100, 115].map((y, idx) => (
              <g key={idx}>
                <text x="117" y={y + 4} fill="#64748B" fontSize="7" fontFamily="sans-serif">{idx + 1}.</text>
                <circle cx="132" cy={y} r="4" fill={idx === 0 ? "#0EA5E9" : "#334155"} />
                <circle cx="147" cy={y} r="4" fill={idx === 1 ? "#0EA5E9" : "#334155"} />
                <circle cx="162" cy={y} r="4" fill={idx === 2 ? "#EF4444" : "#334155"} />
                <circle cx="177" cy={y} r="4" fill={idx === 3 ? "#0EA5E9" : "#334155"} />
              </g>
            ))}

            {/* Glowing Laser Scan Beam */}
            <line x1="105" y1="105" x2="215" y2="105" stroke="#38BDF8" strokeWidth="3" opacity="0.9" />
            <rect x="105" y="103" width="110" height="20" fill="url(#laser-glow)" opacity="0.3" />
            <linearGradient id="laser-glow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </linearGradient>
          </g>

          {/* Center Overlay - 4-7 Days Delay Hourglass */}
          <g className="transition-transform duration-500 group-hover:scale-105">
            <rect x="85" y="125" width="150" height="42" rx="10" fill="#451A03" stroke="#F59E0B" strokeWidth="1.5" />
            {/* Hourglass Icon */}
            <circle cx="108" cy="146" r="12" fill="#78350F" />
            <path d="M104 140H112L108 146L112 152H104L108 146L104 140Z" fill="#F59E0B" />

            <text x="172" y="143" fill="#FDE68A" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">4–7 DAYS DELAY</text>
            <text x="172" y="156" fill="#F59E0B" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Pending Manual Grading</text>
          </g>

          {/* Symmetrical Top Header */}
          <g>
            <rect x="90" y="8" width="140" height="20" rx="10" fill="#7F1D1D" stroke="#EF4444" strokeWidth="1" />
            <text x="160" y="21" fill="#FCA5A5" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SLOW PHYSICAL EVALUATION</text>
          </g>
        </svg>
      );

    case 'cbt-problem':
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full object-cover select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Dark Slate Canvas */}
          <rect width="320" height="200" fill="#0F172A" />
          <circle cx="160" cy="100" r="90" fill="#1E293B" opacity="0.6" />

          {/* Grid background */}
          <pattern id="grid-4" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="1" fill="#334155" opacity="0.5" />
          </pattern>
          <rect width="320" height="200" fill="url(#grid-4)" />

          {/* Monitor Casing */}
          <g>
            <rect x="50" y="24" width="220" height="136" rx="8" fill="#020617" stroke="#334155" strokeWidth="2" />
            {/* Monitor Stand */}
            <path d="M140 160L135 178H185L180 160H140Z" fill="#1E293B" stroke="#334155" strokeWidth="1" />
            <rect x="120" y="178" width="80" height="6" rx="3" fill="#334155" />

            {/* Screen Display */}
            <rect x="58" y="32" width="204" height="120" rx="4" fill="#0F172A" />

            {/* Mock Test Header Bar (Generic Vendor Logo glitch) */}
            <rect x="64" y="38" width="192" height="16" rx="3" fill="#1E293B" />
            <rect x="70" y="43" width="40" height="6" rx="2" fill="#64748B" />
            <text x="246" y="50" fill="#EF4444" fontSize="8" fontWeight="bold" textAnchor="end" fontFamily="sans-serif">TIMER: 00:00 (FROZEN)</text>

            {/* Error Overlay Modal */}
            <g className="transition-transform duration-500 group-hover:scale-105">
              <rect x="80" y="62" width="160" height="78" rx="8" fill="#451A03" stroke="#EF4444" strokeWidth="1.5" />
              
              {/* Alert Triangle */}
              <circle cx="160" cy="82" r="12" fill="#7F1D1D" />
              <path d="M160 75L168 89H152L160 75Z" fill="#F87171" />
              <text x="160" y="87" fill="#7F1D1D" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">!</text>

              <text x="160" y="106" fill="#FCA5A5" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">504 GATEWAY TIMEOUT</text>
              <text x="160" y="119" fill="#FDBA74" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Server crashed during live mock test</text>
              <rect x="120" y="127" width="80" height="6" rx="3" fill="#78350F" />
            </g>
          </g>

          {/* Left Flank Signal Crash Icon */}
          <g className="transition-transform duration-500 group-hover:-translate-x-1">
            <circle cx="32" cy="90" r="14" fill="#7F1D1D" stroke="#EF4444" strokeWidth="1" />
            <path d="M26 84L38 96M38 84L26 96" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Right Flank High Lag Spike Icon */}
          <g className="transition-transform duration-500 group-hover:translate-x-1">
            <rect x="274" y="74" width="32" height="42" rx="5" fill="#1E293B" stroke="#334155" strokeWidth="1" />
            <path d="M280 105L285 96L290 102L295 82L300 105" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="290" y="112" fill="#F87171" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">999ms</text>
          </g>

          {/* Top Symmetrical Header */}
          <g>
            <rect x="90" y="8" width="140" height="20" rx="10" fill="#7F1D1D" stroke="#EF4444" strokeWidth="1" />
            <text x="160" y="21" fill="#FCA5A5" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">UNSTABLE THIRD-PARTY CBT</text>
          </g>
        </svg>
      );

    case 'erp-problem':
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full object-cover select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Dark Slate Canvas */}
          <rect width="320" height="200" fill="#0F172A" />
          <circle cx="160" cy="100" r="90" fill="#1E293B" opacity="0.6" />

          {/* Grid background */}
          <pattern id="grid-5" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="1" fill="#334155" opacity="0.5" />
          </pattern>
          <rect width="320" height="200" fill="url(#grid-5)" />

          {/* Messy Register Binder Center */}
          <g>
            <rect x="65" y="30" width="190" height="140" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
            {/* Binder Rings Symmetrical */}
            {[45, 75, 105, 135, 155].map((y, idx) => (
              <circle key={idx} cx="75" cy={y} r="3" fill="#94A3B8" />
            ))}
            <line x1="82" y1="30" x2="82" y2="170" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Left Page: Messy Hand-written Admission Log */}
            <rect x="90" y="42" width="70" height="6" rx="2" fill="#E2E8F0" opacity="0.7" />
            <rect x="90" y="54" width="60" height="4" rx="1" fill="#64748B" />
            <rect x="90" y="62" width="65" height="4" rx="1" fill="#64748B" />
            <rect x="90" y="70" width="45" height="4" rx="1" fill="#EF4444" />
            <text x="138" y="74" fill="#F87171" fontSize="7" fontWeight="bold">LOST!</text>

            <rect x="90" y="82" width="68" height="4" rx="1" fill="#64748B" />
            <rect x="90" y="90" width="55" height="4" rx="1" fill="#64748B" />

            {/* Right Page: Offline Fee Slip with Leakage */}
            <rect x="170" y="42" width="70" height="6" rx="2" fill="#E2E8F0" opacity="0.7" />
            <rect x="170" y="54" width="65" height="4" rx="1" fill="#64748B" />
            <rect x="170" y="62" width="50" height="4" rx="1" fill="#F59E0B" />
            <rect x="170" y="70" width="60" height="4" rx="1" fill="#64748B" />

            {/* Fee Slip Badge */}
            <rect x="170" y="85" width="72" height="30" rx="4" fill="#78350F" stroke="#F59E0B" strokeWidth="1" />
            <text x="206" y="97" fill="#FDE68A" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">MANUAL FEE SLIP</text>
            <text x="206" y="108" fill="#EF4444" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Unrecorded Cash</text>
          </g>

          {/* Symmetrical Floating Card Left - Lost Admission Lead */}
          <g className="transition-transform duration-500 group-hover:-translate-x-1">
            <rect x="25" y="60" width="75" height="48" rx="6" fill="#0F172A" stroke="#EF4444" strokeWidth="1.5" />
            <circle cx="40" cy="76" r="7" fill="#7F1D1D" />
            <text x="40" y="79" fill="#FCA5A5" fontSize="8" fontWeight="bold" textAnchor="middle">?</text>
            <rect x="52" y="72" width="40" height="4" rx="1" fill="#94A3B8" />
            <rect x="52" y="78" width="30" height="3" rx="1" fill="#64748B" />
            <rect x="32" y="90" width="60" height="12" rx="3" fill="#7F1D1D" />
            <text x="62" y="99" fill="#FCA5A5" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">LEAD LOST</text>
          </g>

          {/* Symmetrical Floating Card Right - Paper Register Chaos */}
          <g className="transition-transform duration-500 group-hover:translate-x-1">
            <rect x="220" y="110" width="78" height="48" rx="6" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.5" />
            <text x="259" y="125" fill="#FCD34D" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">OFFLINE LOGS</text>
            <rect x="230" y="132" width="58" height="3" rx="1" fill="#64748B" />
            <rect x="230" y="138" width="48" height="3" rx="1" fill="#64748B" />
            <rect x="230" y="144" width="54" height="3" rx="1" fill="#EF4444" />
          </g>

          {/* Top Symmetrical Header */}
          <g>
            <rect x="85" y="8" width="150" height="20" rx="10" fill="#78350F" stroke="#F59E0B" strokeWidth="1" />
            <text x="160" y="21" fill="#FDE68A" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">PAPER REGISTERS & LOST LEADS</text>
          </g>
        </svg>
      );

    default:
      return null;
  }
};

export default ProblemIllustration;
