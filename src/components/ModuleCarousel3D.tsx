import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Smartphone, Database, Globe, ChevronRight } from 'lucide-react';
import { PageId } from '../types';

const MODULES: { id: PageId; icon: any; label: string; desc: string; stat: string; color: string }[] = [
  { id: 'practice-cbt',    icon: Trophy,     label: 'CBT Mock Tests',   desc: 'NTA-style exam portal for JEE, NEET & boards. Live timers, instant analytics.', stat: 'Score ↑23%',         color: '128, 0, 0' },
  { id: 'omr-evaluation',  icon: Smartphone, label: 'OMR Scanning',     desc: 'Grade bubble answer sheets with any smartphone camera in seconds.',              stat: '99.8% Accuracy',     color: '176, 129, 63' },
  { id: 'erp-crm',         icon: Database,   label: 'Institute ERP',    desc: 'Fee ledger, attendance, staff registers and academic schedule in one place.',     stat: 'Saves 40% Ops',      color: '158, 27, 27' },
  { id: 'content-library', icon: Globe,      label: 'Content Library',  desc: 'CBSE, IGCSE & IB aligned pre-loaded curriculum worksheets and notes.',           stat: '5 Lakh+ Resources',  color: '96, 0, 0' },
];

const QUANTITY = MODULES.length;
const W = 200;
const H = 260;
const TRANSLATE_Z = 280;
const AUTO_SPEED = 0.4; // degrees per frame

interface Props {
  onNavigate: (id: PageId) => void;
}

export default function ModuleCarousel3D({ onNavigate }: Props) {
  const [angle, setAngle] = useState(0);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef<number>();
  const lastAngleRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-rotate
  useEffect(() => {
    const step = () => {
      if (!paused) {
        lastAngleRef.current += AUTO_SPEED;
        setAngle(lastAngleRef.current);
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [paused]);

  // Scroll to rotate
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      lastAngleRef.current += e.deltaY * 0.2;
      setAngle(lastAngleRef.current);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <>
      <style>{`
        .carousel-inner {
          transform-style: preserve-3d;
          animation: none;
        }
        .carousel-card {
          position: absolute;
          border-radius: 16px;
          overflow: hidden;
          inset: 0;
          cursor: pointer;
          transition: box-shadow 0.3s;
        }
        .carousel-card:hover {
          box-shadow: 0 0 40px rgba(var(--cc), 0.5);
        }
        .carousel-card-inner {
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 30% 30%, rgba(var(--cc), 0.18) 0%, rgba(var(--cc), 0.55) 70%, rgba(var(--cc), 0.85) 100%);
          border: 1.5px solid rgba(var(--cc), 0.7);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 20px 18px 18px;
          backdrop-filter: blur(8px);
        }
      `}</style>

      <div
        ref={containerRef}
        className="relative flex items-center justify-center"
        style={{ width: '100%', height: `${H + 120}px`, perspective: '1000px' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Hint text */}
        <p className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-mono uppercase tracking-widest whitespace-nowrap select-none">
          Scroll to rotate · Click to explore
        </p>

        <div
          className="carousel-inner"
          style={{
            position: 'absolute',
            width: W,
            height: H,
            top: '50%',
            left: '50%',
            marginLeft: -W / 2,
            marginTop: -H / 2,
            transform: `perspective(1000px) rotateX(-12deg) rotateY(${angle}deg)`,
            transition: paused ? 'transform 0.1s' : 'none',
          }}
        >
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                className="carousel-card"
                style={{
                  '--cc': mod.color,
                  transform: `rotateY(${(360 / QUANTITY) * i}deg) translateZ(${TRANSLATE_Z}px)`,
                } as React.CSSProperties}
                onClick={() => onNavigate(mod.id)}
              >
                <div className="carousel-card-inner">
                  {/* Top: icon + stat */}
                  <div className="flex items-start justify-between">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `rgba(${mod.color}, 0.2)`, border: `1px solid rgba(${mod.color}, 0.4)` }}
                    >
                      <Icon style={{ color: `rgb(${mod.color})`, width: 20, height: 20 }} />
                    </div>
                    <span
                      className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full"
                      style={{ background: `rgba(${mod.color}, 0.15)`, color: `rgb(${mod.color})`, border: `1px solid rgba(${mod.color}, 0.3)` }}
                    >
                      {mod.stat}
                    </span>
                  </div>

                  {/* Middle: title + desc */}
                  <div className="space-y-1.5 mt-3 flex-1">
                    <h5 className="font-serif font-extrabold text-slate-900 text-sm leading-snug">{mod.label}</h5>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{mod.desc}</p>
                  </div>

                  {/* Bottom: CTA */}
                  <div
                    className="flex items-center gap-1 text-[11px] font-bold mt-4"
                    style={{ color: `rgb(${mod.color})` }}
                  >
                    Explore <ChevronRight style={{ width: 13, height: 13 }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
