import React from 'react';
import { motion } from 'framer-motion';

export interface ProblemStatementProps {
  onScrollToModules?: () => void;
  onBookDemo?: () => void;
}

interface ProblemItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
}

const PROBLEMS: ProblemItem[] = [
  {
    id: 'testmaker-problem',
    title: 'Manual Paper Setting & Formatting',
    subtitle: 'Hours wasted hunting questions and formatting complex LaTeX math equations in MS Word.',
    image: '/modules/testmaker.jpg',
    imageAlt: 'Manual paper setting bottleneck'
  },
  {
    id: 'omr-problem',
    title: 'Slow OMR Evaluation & 4–7 Day Delays',
    subtitle: 'Physical answer sheets pile up, delaying student results and killing feedback momentum.',
    image: '/modules/omr.jpg',
    imageAlt: 'OMR evaluation delay'
  },
  {
    id: 'cbt-problem',
    title: 'Generic Portals & Lost Brand Equity',
    subtitle: 'Third-party mock test portals with external vendor logos, high fees, and server lag.',
    image: '/modules/cbt.png',
    imageAlt: 'Generic 3rd party test portal'
  },
  {
    id: 'erp-problem',
    title: 'Scattered Registers & Lost Admissions',
    subtitle: 'Student leads lost in paper registers and manual offline fee collection leakages.',
    image: '/modules/erp.jpg',
    imageAlt: 'Scattered registers and lost leads'
  }
];

export const ProblemStatement: React.FC<ProblemStatementProps> = () => {
  return (
    <section className="relative py-20 lg:py-28 bg-[#18181b] border-b border-zinc-800 overflow-hidden text-white">
      {/* Background radial glow */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-900/15 rounded-full blur-3xl pointer-events-none" />

      <style>{`
        .problem-skew-card {
          width: 100%;
          min-height: 240px;
          padding: 1.25rem;
          background: rgba(39, 39, 42, 0.65);
          border-radius: 16px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          border-bottom: 3px solid rgba(255, 255, 255, 0.12);
          border-left: 2px solid rgba(255, 255, 255, 0.2);
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: -20px 30px 30px rgba(0, 0, 0, 0.45);
          transform: skewX(6deg);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          color: white;
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 640px) {
          .problem-skew-card {
            transform: skewX(3deg);
          }
        }

        .problem-skew-card:hover {
          transform: skew(0deg) translateY(-8px);
          background: rgba(45, 45, 50, 0.9);
          box-shadow: 0px 25px 40px rgba(0, 0, 0, 0.6);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .traffic-dots {
          display: flex;
          flex-direction: row;
          gap: 6px;
          align-items: center;
          margin-bottom: 0.85rem;
        }

        .dot-red {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #ff605c;
          box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.4);
        }

        .dot-yellow {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #ffbd44;
          box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.4);
        }

        .dot-green {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #00ca4e;
          box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.4);
        }

        .problem-card-title {
          font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
          font-size: 1.125rem;
          font-weight: 700;
          color: rgb(244, 244, 245);
          text-shadow: -2px 2px 8px rgba(0, 0, 0, 0.6);
          line-height: 1.35;
          margin-bottom: 0.75rem;
        }
      `}</style>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14 lg:mb-18">
          <motion.h2 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-white tracking-tight"
          >
            Operational Bottlenecks Holding Institutions Back
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto font-sans"
          >
            Fragmented tools, manual paperwork, and delayed evaluations drain faculty hours and weaken student trust.
          </motion.p>
        </div>

        {/* 4 Skewed Glassmorphic Problem Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pt-4 pb-8">
          {PROBLEMS.map((problem, index) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="flex justify-center"
            >
              <div className="problem-skew-card group cursor-pointer">
                {/* Traffic lights dots */}
                <div className="traffic-dots">
                  <span className="dot-red" />
                  <span className="dot-yellow" />
                  <span className="dot-green" />
                </div>

                {/* Problem Heading */}
                <h3 className="problem-card-title">
                  {problem.title}
                </h3>

                {/* Problem Image Preview */}
                <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-black/40 border border-white/10 mb-3 shadow-inner">
                  <img 
                    src={problem.image} 
                    alt={problem.imageAlt}
                    className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Subheading / Description */}
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed mt-auto">
                  {problem.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProblemStatement;
