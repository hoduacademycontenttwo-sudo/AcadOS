import React from "react";

interface HTLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function HTLogo({
  className = "w-10 h-10",
  size = 40,
  showText = false,
}: HTLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Background circle of the logo badge */}
        <circle cx="250" cy="250" r="240" fill="#000000" />

        {/* Red portion of the outer ring & 'T' shape */}
        {/* Deep maroon red matching the high-fidelity logo image */}
        <path
          d="M 370 170 C 340 100, 260 90, 180 120 C 130 140, 100 180, 95 240 C 90 280, 105 320, 130 350 C 150 375, 180 395, 188 395 C 190 395, 195 350, 202 295 L 210 240 L 255 240 L 250 295 C 245 330, 240 370, 240 380 Q 240 390, 255 390 C 275 390, 285 360, 290 310 L 295 260 L 325 260 Q 355 260, 360 250 C 365 240, 375 220, 370 170 Z font"
          fill="#8C1D24"
        />

        {/* Refined SVG Geometry representing the actual monogram */}
        {/* Red outer arc (Red Ring) */}
        <path
          d="M 382 170 A 185 185 0 0 0 160 410 C 160 410, 172 380, 185 335 L 205 250 L 250 250 L 245 295 Q 240 340, 240 382 Q 240 400, 260 400 C 285 400, 298 370, 305 315 L 312 260 L 372 260 C 390 260, 395 240, 390 205 Q 388 185, 382 170 Z"
          fill="#8C1D24"
        />

        {/* The White 'H' Left Pillar and connection */}
        <path
          d="M 175 160 C 160 160, 150 175, 145 195 L 125 295 C 120 320, 130 330, 145 330 C 160 330, 170 315, 175 295 L 195 195 C 200 170, 190 160, 175 160 Z"
          fill="#FFFFFF"
        />

        {/* The White Crossbar & Right Pillar linking to the right-side white arc */}
        <path
          d="M 160 245 H 220 L 210 295 Q 200 345, 188 385 C 190 390, 203 394, 218 394 C 275 394, 325 365, 365 315 C 395 275, 403 234, 401 210 Q 401 210, 372 210 C 372 230, 360 265, 335 295 C 300 340, 255 360, 222 360 C 208 360, 212 345, 218 320 L 228 270 H 165 Z"
          fill="#FFFFFF"
        />

        {/* Clean precise stroke overlays to match the crisp contrast of the uploaded logo */}
        {/* White Outer Arc representing the lower-right wrap */}
        <path
          d="M 183 390 A 185 185 0 0 0 394 212"
          stroke="#FFFFFF"
          strokeWidth="32"
          strokeLinecap="round"
        />

        {/* Red Outer Arc representing the upper-left wrap */}
        <path
          d="M 394 212 A 185 185 0 0 0 183 390"
          stroke="#8C1D24"
          strokeWidth="32"
          strokeLinecap="round"
        />

        {/* Left white stem of H */}
        <line
          x1="160"
          y1="180"
          x2="135"
          y2="330"
          stroke="#FFFFFF"
          strokeWidth="34"
          strokeLinecap="round"
        />

        {/* Right white stem of H which joins of the outer arc */}
        <path
          d="M 215 180 Q 200 240, 190 310 Q 183 350, 183 390"
          stroke="#FFFFFF"
          strokeWidth="34"
          strokeLinecap="round"
          fill="none"
        />

        {/* Horizontal H cross-bar */}
        <line
          x1="147"
          y1="255"
          x2="202"
          y2="255"
          stroke="#FFFFFF"
          strokeWidth="30"
          strokeLinecap="round"
        />

        {/* Red 'T' bar & stem that overlays the center-right section */}
        {/* T-bar connected to outer red ring */}
        <path
          d="M 230 195 Q 260 195, 385 200"
          stroke="#8C1D24"
          strokeWidth="34"
          strokeLinecap="round"
        />
        {/* T-stem */}
        <line
          x1="285"
          y1="200"
          x2="270"
          y2="315"
          stroke="#8C1D24"
          strokeWidth="34"
          strokeLinecap="round"
        />
      </svg>
      {showText && (
        <span className="text-[11px] font-bold text-slate-400 normal-case hidden sm:inline">
          Hoducation Technologies
        </span>
      )}
    </div>
  );
}
