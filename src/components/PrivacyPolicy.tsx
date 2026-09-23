import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  UserCheck, 
  Scale, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Database, 
  ShieldAlert,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface PrivacyPolicyProps {
  onNavigateToTerms?: () => void;
  onBookDemo?: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ 
  onNavigateToTerms, 
  onBookDemo 
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-slate-800">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>DPDP ACT, 2023 STATUTORY COMPLIANCE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Privacy Policy & <span className="text-maroon-800 italic font-serif">Data Protection Charter</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans max-w-2xl mx-auto">
          Comprehensive compliance declaration under the Digital Personal Data Protection Act, 2023 (India) and Data Protection Board of India (DPBI) regulatory standards.
        </p>
        <div className="flex items-center justify-center gap-4 text-xs font-mono text-slate-500 pt-2">
          <span>Effective Date: September 23, 2026</span>
          <span>&bull;</span>
          <span>Version: 3.2 (Statutory Edition)</span>
        </div>
      </div>

      {/* Quick Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-maroon-50 border border-maroon-100 flex items-center justify-center text-maroon-800">
            <Scale className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">Fiduciary vs Processor</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your Institution is the <strong>Data Fiduciary</strong>; AcadOS operates strictly as a <strong>Data Processor</strong> under contract.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
            <UserCheck className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">Section 9: Children's Data</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong>Zero student profiling, zero targeted ads, zero selling of records.</strong> Strict minor safety safeguards.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-800">
            <Lock className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">Encryption & Erasure</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            AES-256 at rest, TLS 1.3 in transit. Guaranteed <strong>30-day complete data erasure</strong> upon subscription termination.
          </p>
        </div>
      </div>

      {/* Main Legal Content Container */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm space-y-10 text-sm leading-relaxed">

        {/* Section 1: Introduction & Scope */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="font-mono text-xs font-bold text-maroon-800 bg-maroon-50 px-2 py-0.5 rounded">01</span>
            <h2 className="text-lg font-bold text-slate-900 uppercase font-sans tracking-wide">Scope & Ecosystem Modules</h2>
          </div>
          <p className="text-slate-700">
            This Privacy Policy governs the processing of digital personal data across all services and applications operated by <strong>Hoducation Technologies Pvt. Ltd.</strong> ("Hoducation", "AcadOS", "we", "us", or "our"), including:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {[
              { name: 'TestMaker Engine', desc: 'Curriculum question authoring, blueprint compilation, and paper generation.' },
              { name: 'CBT Simulator', desc: 'Computer-based mock examinations mimicking NTA/JEE/NEET testing environments.' },
              { name: 'OMR Smartphone Evaluation', desc: 'Optical mark recognition computer vision scoring of paper answer sheets.' },
              { name: 'Learners Hub', desc: 'Personalized digital student LMS, study materials, and performance dashboards.' },
              { name: 'Institute ERP & Fees', desc: 'Student admissions, fee accounting, attendance, and batch operations.' },
              { name: 'Admissions CRM Tracker', desc: 'Inquiry management, parent follow-ups, and enrollment pipelines.' },
            ].map((mod, i) => (
              <div key={i} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                <div className="font-bold text-slate-900 text-xs font-mono">{mod.name}</div>
                <div className="text-slate-600 text-xs mt-1">{mod.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Data Fiduciary vs Data Processor */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="font-mono text-xs font-bold text-maroon-800 bg-maroon-50 px-2 py-0.5 rounded">02</span>
            <h2 className="text-lg font-bold text-slate-900 uppercase font-sans tracking-wide">Legal Roles: Fiduciary vs. Processor (Section 8)</h2>
          </div>
          <p className="text-slate-700">
            Under Section 8 of India’s <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>:
          </p>
          <ul className="space-y-2.5 list-disc pl-5 text-slate-700">
            <li>
              <strong>Institutional Client as Data Fiduciary:</strong> The contracting educational institution (School, Coaching Institute, College, or EdTech franchise) is the Data Fiduciary. The institution determines the purpose and means of collecting student, teacher, and parent data.
            </li>
            <li>
              <strong>AcadOS as Data Processor:</strong> Hoducation Technologies Pvt. Ltd. acts solely as a Data Processor. We process personal data exclusively under the instructions of the Data Fiduciary, codified in our binding Data Processing Addendum (DPA).
            </li>
          </ul>
        </section>

        {/* Section 3: Categories of Data Collected */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="font-mono text-xs font-bold text-maroon-800 bg-maroon-50 px-2 py-0.5 rounded">03</span>
            <h2 className="text-lg font-bold text-slate-900 uppercase font-sans tracking-wide">Categories of Digital Personal Data Collected</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-slate-200 text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-mono">
                  <th className="p-3 border border-slate-200">Category</th>
                  <th className="p-3 border border-slate-200">Data Fields</th>
                  <th className="p-3 border border-slate-200">Statutory Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="p-3 font-semibold bg-slate-50 border border-slate-200">Institutional Leads & Admins</td>
                  <td className="p-3 border border-slate-200">Name, institutional email, mobile number, designation, school name, cohort size.</td>
                  <td className="p-3 border border-slate-200">Demo scheduling, account onboarding, service notifications, customer support.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold bg-slate-50 border border-slate-200">Student Examination Data</td>
                  <td className="p-3 border border-slate-200">Roll number, batch/class, test responses, scorecards, percentile ranks, OMR scan images.</td>
                  <td className="p-3 border border-slate-200">Automated grading, CBT mock testing, diagnostic analytics reports.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold bg-slate-50 border border-slate-200">Administrative Records</td>
                  <td className="p-3 border border-slate-200">Attendance timestamps, fee status receipts, parent contact details for SMS/WhatsApp alerts.</td>
                  <td className="p-3 border border-slate-200">ERP operational functions, dispatching automated parental progress updates.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold bg-slate-50 border border-slate-200">Audit & Security Telemetry</td>
                  <td className="p-3 border border-slate-200">IP address, browser user-agent, session tokens, exam integrity logs.</td>
                  <td className="p-3 border border-slate-200">Preventing exam malpractice, DDoS defense, maintaining system integrity.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Children & Minor Protection (Section 9) */}
        <section className="space-y-4 bg-amber-50/70 border border-amber-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 pb-2 border-b border-amber-200">
            <span className="font-mono text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">04</span>
            <h2 className="text-lg font-bold text-amber-950 uppercase font-sans tracking-wide">
              Mandatory Protection of Children & Minor Students (Section 9)
            </h2>
          </div>
          <p className="text-amber-900 font-medium">
            In strict compliance with Section 9 of the DPDP Act 2023, AcadOS enforces rigorous safeguards for all data pertaining to minor students (under 18 years of age):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-amber-950">
            <div className="flex items-start gap-2 bg-white/80 p-3 rounded-xl border border-amber-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Zero Behavioral Tracking:</strong> We never track students' browsing habits across web services or construct psychographic profiles.</span>
            </div>
            <div className="flex items-start gap-2 bg-white/80 p-3 rounded-xl border border-amber-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Zero Targeted Advertising:</strong> AcadOS is completely ad-free. Student data is never monetized, leased, or transmitted to third-party ad networks.</span>
            </div>
            <div className="flex items-start gap-2 bg-white/80 p-3 rounded-xl border border-amber-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Verifiable Parental Consent:</strong> The Data Fiduciary (School/Institute) confirms it has obtained parental or legal guardian authorization before enrolling students.</span>
            </div>
            <div className="flex items-start gap-2 bg-white/80 p-3 rounded-xl border border-amber-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Zero Public AI Model Training:</strong> Institutional test questions, student submissions, and OMR images are NEVER used to train public generative AI foundation models.</span>
            </div>
          </div>
        </section>

        {/* Section 5: Security Safeguards & Technical Measures */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="font-mono text-xs font-bold text-maroon-800 bg-maroon-50 px-2 py-0.5 rounded">05</span>
            <h2 className="text-lg font-bold text-slate-900 uppercase font-sans tracking-wide">Technical & Security Safeguards (Section 8)</h2>
          </div>
          <p className="text-slate-700">
            Hoducation Technologies employs enterprise-grade security controls to prevent unauthorized access, alteration, or disclosure:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
            <li className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <strong>Encryption at Rest & In Transit:</strong> AES-256 encryption for database volumes and TLS 1.3 protocol encryption for all data in motion.
            </li>
            <li className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <strong>Tenant Isolation:</strong> Logical multi-tenant separation ensuring no cross-institution data exposure.
            </li>
            <li className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <strong>Role-Based Access Control (RBAC):</strong> Granular permissions for Admins, Teachers, Students, and Operators.
            </li>
            <li className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <strong>Disaster Recovery & Redundancy:</strong> Automated encrypted off-site backups with point-in-time recovery capabilities.
            </li>
          </ul>
        </section>

        {/* Section 6: Data Principal Rights */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="font-mono text-xs font-bold text-maroon-800 bg-maroon-50 px-2 py-0.5 rounded">06</span>
            <h2 className="text-lg font-bold text-slate-900 uppercase font-sans tracking-wide">Rights of Data Principals (Sections 11, 12, 13, 14)</h2>
          </div>
          <p className="text-slate-700">
            Under Chapter III of the DPDP Act, data principals (educators, students, and parents via the Data Fiduciary) are guaranteed:
          </p>
          <div className="space-y-2 text-xs text-slate-700">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <strong>Right to Access & Summary (Section 11):</strong> The right to obtain a readable summary of personal data processed by AcadOS.
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <strong>Right to Correction & Erasure (Section 12):</strong> The right to rectify inaccurate records or request complete deletion when processing is no longer necessary.
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <strong>Right of Grievance Redressal (Section 13):</strong> Direct escalation channel to our statutory Grievance Redressal Officer with a statutory 30-day resolution timeline.
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <strong>Right to Nominate (Section 14):</strong> The right to nominate an individual to exercise data principal rights in the event of death or incapacity.
            </div>
          </div>
        </section>

        {/* Section 7: Data Retention & Decommissioning */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="font-mono text-xs font-bold text-maroon-800 bg-maroon-50 px-2 py-0.5 rounded">07</span>
            <h2 className="text-lg font-bold text-slate-900 uppercase font-sans tracking-wide">Data Retention & 30-Day Complete Decommissioning</h2>
          </div>
          <p className="text-slate-700">
            Personal data is retained only for the duration of the active subscription agreement with the Data Fiduciary.
          </p>
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-xs text-rose-900 space-y-1">
            <div className="font-bold font-mono uppercase">30-Day Statutory Erasure Policy:</div>
            <p>
              Upon termination or non-renewal of an institutional subscription, the institution may export all question banks, student marks, and administrative data within 30 days. Following this window, all institutional production databases, backups, and media artifacts are permanently and irreversibly purged from our servers.
            </p>
          </div>
        </section>

        {/* Section 8: Statutory Grievance Redressal Officer */}
        <section className="space-y-4 bg-slate-900 text-white rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <span className="font-mono text-xs font-bold text-gold-400 bg-white/10 px-2 py-0.5 rounded">08</span>
            <h2 className="text-lg font-bold text-white uppercase font-sans tracking-wide">
              Statutory Grievance Redressal Officer (Section 13)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            In compliance with Section 13 of the DPDP Act 2023, data principals or institutional fiduciaries may register concerns, consent withdrawals, or data access requests directly with our appointed Grievance Cell:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs font-sans">
            <div className="space-y-2 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
              <div className="font-bold text-gold-300 font-mono text-sm">Grievance & Legal Compliance Cell</div>
              <div className="text-slate-300">Hoducation Technologies Pvt. Ltd.</div>
              <div className="flex items-center gap-2 text-slate-300 pt-1">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
                <span>C-28, Vaishali Estate, Gandhi Path (W), Jaipur, Rajasthan 302021, India</span>
              </div>
            </div>

            <div className="space-y-2 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span><strong>Email:</strong> <a href="mailto:hoducationtechnologies@gmail.com" className="text-gold-300 hover:underline">hoducationtechnologies@gmail.com</a></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span><strong>Telephone / WhatsApp:</strong> +91 96600 34117</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-gold-400 shrink-0" />
                <span><strong>Statutory Resolution SLA:</strong> Within 30 calendar days</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 pt-2">
            If a grievance is not resolved satisfactorily within 30 days, Data Principals possess the statutory right to escalate the matter to the <strong>Data Protection Board of India (DPBI)</strong> in the prescribed digital manner.
          </p>
        </section>

      </div>

      {/* Bottom Cross-Navigation Links */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs">
        <div className="text-slate-500 font-mono">
          Last Reviewed: Q3 2026 Statutory Release
        </div>
        <div className="flex items-center gap-3">
          {onNavigateToTerms && (
            <button
              onClick={onNavigateToTerms}
              className="text-maroon-800 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Terms of Service & DPA &rarr;</span>
            </button>
          )}
          {onBookDemo && (
            <button
              onClick={onBookDemo}
              className="bg-maroon-800 text-white font-bold py-2 px-4 rounded-xl hover:bg-maroon-900 transition-all cursor-pointer"
            >
              Book Platform Demo
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default PrivacyPolicy;
