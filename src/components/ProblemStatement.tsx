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
    image: '/problems/manual-paper-formatting.jpg',
    imageAlt: 'Messy exam paper drafts and manual formatting friction'
  },
  {
    id: 'omr-problem',
    title: 'Slow OMR Evaluation & 4–7 Day Delays',
    subtitle: 'Physical answer sheets pile up, delaying student results and killing feedback momentum.',
    image: '/problems/omr-evaluation-delays.jpg',
    imageAlt: 'Stacks of un-evaluated OMR sheets causing long result delays'
  },
  {
    id: 'cbt-problem',
    title: 'Generic Portals & Lost Brand Equity',
    subtitle: 'Third-party mock test portals with external vendor logos, high fees, and server lag.',
    image: '/problems/generic-portal-crashes.jpg',
    imageAlt: 'Generic 3rd party mock test portal with error timeout and lost identity'
  },
  {
    id: 'erp-problem',
    title: 'Scattered Registers & Lost Admissions',
    subtitle: 'Student leads lost in paper registers and manual offline fee collection leakages.',
    image: '/problems/scattered-paper-registers.jpg',
    imageAlt: 'Cluttered paper registers, lost student admission logs, and manual fee slips'
  }
];

export const ProblemStatement: React.FC<ProblemStatementProps> = () => {
  return (
    <section className="relative py-12 md:py-16 bg-[#faf8f5] border-b border-stone-200/80 overflow-hidden">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#800000 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <style>{`
        .anim-container {
          width: 100%;
          min-height: 280px;
          background: transparent;
          position: relative;
          box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.07);
          overflow: hidden;
          border-radius: 14px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .anim-card {
          cursor: pointer;
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          padding: 1.25rem;
          gap: 0.85rem;
          color: #1e293b;
          background-color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.85);
          -webkit-backdrop-filter: blur(20px);
          backdrop-filter: blur(20px);
          border-radius: 14px;
          transition: all ease 0.3s;
        }

        .anim-container::after,
        .anim-container::before {
          width: 120px;
          height: 120px;
          content: "";
          position: absolute;
          border-radius: 50%;
          transition: 0.5s linear;
          pointer-events: none;
          z-index: 1;
        }

        .anim-container::after {
          top: -20px;
          left: -20px;
          background-color: rgba(0, 174, 169, 0.4);
          animation: animFirst 5s linear infinite;
        }

        .anim-container::before {
          background-color: rgba(0, 174, 169, 0.3);
          top: 70%;
          left: 70%;
          animation: animSecond 5s linear infinite;
          animation-delay: 3s;
        }

        .anim-container:hover {
          box-shadow: 0px 10px 28px rgba(0, 174, 169, 0.28);
          transform: translateY(-4px);
        }

        .anim-container:hover .anim-card {
          background-color: rgba(255, 255, 255, 0.65);
        }

        .anim-container:hover::after {
          left: calc(100% - 90px);
          transform: scale(1.25);
        }

        .anim-container:hover::before {
          left: -15px;
          transform: scale(1.25);
        }

        @keyframes animFirst {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(15px);
          }
        }

        @keyframes animSecond {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
      `}</style>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-8 md:mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold text-stone-900 tracking-tight leading-tight"
          >
            Operational Bottlenecks Holding Institutions Back
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-stone-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-sans leading-relaxed"
          >
            Fragmented tools, manual paperwork, and delayed evaluations drain faculty hours and weaken student trust.
          </motion.p>
        </div>

        {/* Animated Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {PROBLEMS.map((problem, index) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="flex"
            >
              <div className="anim-container group">
                <div className="anim-card">
                  
                  {/* Problem Image Preview */}
                  <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-stone-100 border border-stone-200/70 shadow-xs">
                    <img 
                      src={problem.image} 
                      alt={problem.imageAlt}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Problem Heading */}
                  <h3 className="text-base font-serif font-bold text-stone-900 leading-snug group-hover:text-teal-900 transition-colors">
                    {problem.title}
                  </h3>

                  {/* Subheading */}
                  <p className="text-xs sm:text-[13px] text-stone-600 font-sans leading-relaxed mt-auto">
                    {problem.subtitle}
                  </p>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProblemStatement;
