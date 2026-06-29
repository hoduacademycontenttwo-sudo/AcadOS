import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface ModuleCtaBannerProps {
  module: 'testmaker' | 'erp-crm' | 'learners-hub' | 'practice-cbt' | 'omr-evaluation' | 'schools' | 'coaching' | 'content-library';
  onBookDemo: () => void;
}

export default function ModuleCtaBanner({ module, onBookDemo }: ModuleCtaBannerProps) {
  // Determine short text based on module
  const getContent = () => {
    switch (module) {
      case 'testmaker':
        return "Want to experience premium automated TestMaker workflows? Book a customized demo now.";
      case 'erp-crm':
        return "Ready to simplify your administrative ERP & admissions CRM? Book a customized demo now.";
      case 'learners-hub':
        return "Empower students with a white-labeled mobile Learners Hub? Book a customized demo now.";
      case 'practice-cbt':
        return "Ready to launch NTA-style computerized exam CBT panels? Book a customized demo now.";
      case 'omr-evaluation':
        return "Grade offline paper OMR bubble sheets in 10 seconds? Book a customized demo now.";
      case 'schools':
        return "Standardise K-12 school academics & administrative operations? Book a customized demo now.";
      case 'coaching':
        return "Boost coaching academy admissions and student analytics? Book a customized demo now.";
      case 'content-library':
      default:
        return "Integrate pre-mapped board syllabus & academic worksheet bundles? Book a customized demo now.";
    }
  };

  const text = getContent();

  return (
    <div className="bg-slate-50 border-l-4 border-maroon-700 border-y border-r border-slate-200 rounded-2xl p-5 md:py-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm my-6 select-none transition-all hover:shadow-md hover:border-maroon-200">
      <div className="flex items-center gap-3 text-center md:text-left">
        <span className="text-xl shrink-0">✨</span>
        <p className="text-slate-800 text-sm sm:text-base font-sans font-semibold leading-relaxed">
          {text}
        </p>
      </div>

      <div className="w-full md:w-auto shrink-0">
        <button
          onClick={onBookDemo}
          className="w-full md:w-auto bg-gradient-to-r from-maroon-700 to-maroon-800 hover:from-maroon-800 hover:to-maroon-900 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider py-2.5 px-5 rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Book Demo Now</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
