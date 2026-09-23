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
    <section className="relative py-16 lg:py-24 bg-[#faf8f5] border-b border-stone-200/80 overflow-hidden">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#800000 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 lg:mb-16">

          <motion.h2 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-stone-900 tracking-tight"
          >
            Operational Bottlenecks Holding Institutions Back
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto font-sans"
          >
            Fragmented tools, manual paperwork, and delayed evaluations drain faculty hours and weaken student trust.
          </motion.p>
        </div>

        {/* Minimal Problem Cards Grid: Heading + Image + Subheading only */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROBLEMS.map((problem, index) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col space-y-4"
            >
              {/* Image */}
              <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-stone-100 border border-stone-200/60">
                <img 
                  src={problem.image} 
                  alt={problem.imageAlt}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>

              {/* Heading & Subheading */}
              <div className="space-y-1.5 flex-1">
                <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 leading-snug">
                  {problem.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
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
