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
    <section className="relative py-20 lg:py-28 bg-[#121214] border-b border-zinc-800/80 overflow-hidden text-white">
      {/* Background ambient lighting */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#800000]/15 rounded-full blur-3xl pointer-events-none" />

      <style>{`
        .anim-container {
          width: 100%;
          min-height: 290px;
          background: #18181b;
          position: relative;
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
          overflow: hidden;
          border-radius: 16px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .anim-card {
          cursor: pointer;
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 2;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          background-color: rgba(24, 24, 27, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.12);
          -webkit-backdrop-filter: blur(20px);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          transition: all ease 0.3s;
        }

        .anim-container::after,
        .anim-container::before {
          width: 120px;
          height: 120px;
          content: "";
          position: absolute;
          border-radius: 50%;
          transition: 0.5s ease-in-out;
          pointer-events: none;
          z-index: 1;
        }

        .anim-container::after {
          top: -20px;
          left: -20px;
          background-color: rgba(128, 0, 0, 0.65);
          animation: animFirst 6s ease-in-out infinite;
        }

        .anim-container::before {
          background-color: rgba(225, 29, 72, 0.45);
          top: 65%;
          left: 65%;
          animation: animSecond 6s ease-in-out infinite;
          animation-delay: 2.5s;
        }

        .anim-container:hover {
          box-shadow: 0px 10px 30px rgba(128, 0, 0, 0.45);
          transform: translateY(-4px);
        }

        .anim-container:hover .anim-card {
          background-color: rgba(24, 24, 27, 0.55);
          border-color: rgba(255, 255, 255, 0.25);
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
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(20px) scale(1.15);
          }
        }

        @keyframes animSecond {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.15);
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

        {/* Animated Glass Orb Cards Grid */}
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
                  <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-black/50 border border-white/10 shadow-inner">
                    <img 
                      src={problem.image} 
                      alt={problem.imageAlt}
                      className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Problem Heading */}
                  <h3 className="text-base sm:text-lg font-serif font-bold text-white leading-snug group-hover:text-rose-100 transition-colors">
                    {problem.title}
                  </h3>

                  {/* Subheading */}
                  <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed mt-auto">
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
