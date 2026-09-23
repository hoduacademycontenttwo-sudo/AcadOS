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
    <section className="relative py-20 lg:py-28 bg-[#faf8f5] border-b border-stone-200/80 overflow-hidden">
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
          min-height: 290px;
          background: transparent;
          position: relative;
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          border-radius: 12px;
          transition: all 0.3s ease;
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
          gap: 0.75rem;
          color: #1e293b;
          background-color: rgba(255, 255, 255, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.8);
          -webkit-backdrop-filter: blur(20px);
          backdrop-filter: blur(20px);
          border-radius: 12px;
          transition: all ease 0.3s;
        }

        .anim-container::after,
        .anim-container::before {
          width: 110px;
          height: 110px;
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
          box-shadow: 0px 8px 25px rgba(0, 174, 169, 0.28);
          transform: translateY(-3px);
        }

        .anim-container:hover .anim-card {
          background-color: rgba(255, 255, 255, 0.6);
        }

        .anim-container:hover::after {
          left: calc(100% - 85px);
          transform: scale(1.2);
        }

        .anim-container:hover::before {
          left: -10px;
          transform: scale(1.2);
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
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14 lg:mb-18">
          <motion.h2 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-stone-900 tracking-tight"
          >
            Operational Bottlenecks Holding Institutions Back
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto font-sans"
          >
            Fragmented tools, manual paperwork, and delayed evaluations drain faculty hours and weaken student trust.
          </motion.p>
        </div>

        {/* Animated Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
                  <div className="relative rounded-lg overflow-hidden aspect-[16/10] bg-stone-100 border border-stone-200/70 shadow-sm">
                    <img 
                      src={problem.image} 
                      alt={problem.imageAlt}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Problem Heading */}
                  <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 leading-snug group-hover:text-teal-900 transition-colors">
                    {problem.title}
                  </h3>

                  {/* Subheading */}
                  <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed mt-auto">
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
