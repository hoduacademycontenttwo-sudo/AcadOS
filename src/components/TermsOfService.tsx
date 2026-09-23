import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  ShieldCheck, 
  Scale, 
  Server, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  ArrowRight,
  Database,
  Building,
  Mail
} from 'lucide-react';

interface TermsOfServiceProps {
  onNavigateToPrivacy?: () => void;
  onBookDemo?: () => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ 
  onNavigateToPrivacy, 
  onBookDemo 
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-slate-800">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-maroon-50 text-maroon-800 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full border border-maroon-200">
          <Scale className="w-4 h-4 text-maroon-700 shrink-0" />
          <span>STATUTORY TERMS & DATA PROCESSING AGREEMENT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Terms of Service & <span className="text-maroon-800 italic font-serif">Data Processing Addendum</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans max-w-2xl mx-auto">
          Master subscription agreement governing platform usage, 100% intellectual property ownership, and binding Data Processor obligations under the DPDP Act 2023.
        </p>
        <div className="flex items-center justify-center gap-4 text-xs font-mono text-slate-500 pt-2">
          <span>Effective Date: September 23, 2026</span>
          <span>&bull;</span>
          <span>Version: 3.2 (Commercial & DPA Edition)</span>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm space-y-10 text-sm leading-relaxed">

        {/* Section 1: Agreement Overview */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="font-mono text-xs font-bold text-maroon-800 bg-maroon-50 px-2 py-0.5 rounded">01</span>
            <h2 className="text-lg font-bold text-slate-900 uppercase font-sans tracking-wide">Subscription Agreement & Parties</h2>
          </div>
          <p className="text-slate-700">
            These Terms of Service ("Agreement") are entered into between <strong>Hoducation Technologies Pvt. Ltd.</strong> ("Hoducation", "AcadOS", "Vendor") and the educational institution, school board, coaching center, or academic enterprise ("Client", "Institution", "Data Fiduciary") subscribing to the AcadOS platform suite.
          </p>
          <p className="text-slate-700">
            By accessing or using any module of AcadOS (including TestMaker, CBT Engine, Smartphone OMR, ERP, CRM, or Learners Hub), the Client agrees to be legally bound by this Agreement and the embedded Data Processing Addendum (DPA).
          </p>
        </section>

        {/* Section 2: 100% IP & Question Bank Ownership */}
        <section className="space-y-4 bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <span className="font-mono text-xs font-bold text-maroon-800 bg-maroon-100 px-2 py-0.5 rounded">02</span>
            <h2 className="text-lg font-bold text-slate-900 uppercase font-sans tracking-wide">
              100% Intellectual Property & Proprietary Question Ownership
            </h2>
          </div>
          <div className="space-y-3 text-slate-700 text-xs sm:text-sm">
            <p>
              <strong>Exclusive Client Ownership:</strong> The Client retains sole, exclusive, and unencumbered ownership of all intellectual property, proprietary questions, test blueprints, student records, custom answer keys, and branding collateral uploaded or generated on the AcadOS platform.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs"><strong>No Public AI Training:</strong> AcadOS will NEVER use institutional question banks, tests, or student responses to train public generative AI or third-party foundation models.</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs"><strong>White-Label Exclusivity:</strong> All student-facing portals, test papers, and reports are rendered strictly under the Client’s brand, colors, and logos.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Data Processing Addendum (DPA) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="font-mono text-xs font-bold text-maroon-800 bg-maroon-50 px-2 py-0.5 rounded">03</span>
            <h2 className="text-lg font-bold text-slate-900 uppercase font-sans tracking-wide">
              Data Processing Addendum (DPA) under DPDP Act 2023
            </h2>
          </div>
          <p className="text-slate-700">
            In accordance with Section 8(2) of the Digital Personal Data Protection Act, 2023, this DPA governs all personal data processed by AcadOS on behalf of the Client:
          </p>
          <ul className="space-y-2.5 list-disc pl-5 text-slate-700 text-xs sm:text-sm">
            <li>
              <strong>Processing by Instruction:</strong> AcadOS shall process personal data solely in accordance with documented instructions from the Client and for the legitimate provision of the educational operating system.
            </li>
            <li>
              <strong>Confidentiality:</strong> All personnel with access to personal data are bound by strict statutory non-disclosure obligations.
            </li>
            <li>
              <strong>Assistance to Data Fiduciary:</strong> AcadOS provides tools and APIs enabling the Client to fulfill Data Principal requests under Sections 11, 12, 13, and 14 of the DPDP Act (access, correction, erasure, and grievances).
            </li>
            <li>
              <strong>Data Breach Notification:</strong> In the unlikely event of a confirmed security incident impacting personal data, AcadOS shall notify the Client within 24 hours to enable statutory reporting to the Data Protection Board of India (DPBI).
            </li>
          </ul>
        </section>

        {/* Section 4: Authorized Sub-processors */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="font-mono text-xs font-bold text-maroon-800 bg-maroon-50 px-2 py-0.5 rounded">04</span>
            <h2 className="text-lg font-bold text-slate-900 uppercase font-sans tracking-wide">
              Authorized Sub-processors & Infrastructure Partners
            </h2>
          </div>
          <p className="text-slate-700 text-xs">
            To provide high-availability cloud infrastructure, AcadOS utilizes vetted enterprise sub-processors adhering to stringent data protection standards:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-slate-200 text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-mono">
                  <th className="p-3 border border-slate-200">Sub-processor</th>
                  <th className="p-3 border border-slate-200">Service Category</th>
                  <th className="p-3 border border-slate-200">Data Transferred</th>
                  <th className="p-3 border border-slate-200">Security Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="p-3 font-semibold bg-slate-50 border border-slate-200">Supabase / AWS India</td>
                  <td className="p-3 border border-slate-200">Encrypted Database & Storage Hosting</td>
                  <td className="p-3 border border-slate-200">Encrypted database records, OMR images, audit logs</td>
                  <td className="p-3 border border-slate-200">SOC 2 Type II, ISO 27001, AES-256</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold bg-slate-50 border border-slate-200">Resend Inc.</td>
                  <td className="p-3 border border-slate-200">Transactional Email Infrastructure</td>
                  <td className="p-3 border border-slate-200">Institutional email addresses, system notifications</td>
                  <td className="p-3 border border-slate-200">TLS 1.3, GDPR & DPDP Compliant</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold bg-slate-50 border border-slate-200">Meta (WhatsApp Cloud API)</td>
                  <td className="p-3 border border-slate-200">Parental Progress & OTP Notifications</td>
                  <td className="p-3 border border-slate-200">Parent mobile numbers, score summary templates</td>
                  <td className="p-3 border border-slate-200">End-to-End Transport Security</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold bg-slate-50 border border-slate-200">Vercel & Cloudflare</td>
                  <td className="p-3 border border-slate-200">Edge Network & DDoS Shield</td>
                  <td className="p-3 border border-slate-200">Transient encrypted web traffic & telemetry</td>
                  <td className="p-3 border border-slate-200">SOC 2 Type II, Enterprise DDoS Shield</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Service Levels, Availability & SLAs */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="font-mono text-xs font-bold text-maroon-800 bg-maroon-50 px-2 py-0.5 rounded">05</span>
            <h2 className="text-lg font-bold text-slate-900 uppercase font-sans tracking-wide">
              Service Levels, Backups & Uptime Commitments
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 font-mono text-sm">99.9% Uptime</div>
              <div className="text-slate-600 mt-1">High-availability cloud architecture with automated load balancing.</div>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 font-mono text-sm">Daily Backups</div>
              <div className="text-slate-600 mt-1">Encrypted automated snapshots with point-in-time recovery.</div>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 font-mono text-sm">Priority Support</div>
              <div className="text-slate-600 mt-1">Dedicated academic engineers via hotline and WhatsApp desk.</div>
            </div>
          </div>
        </section>

        {/* Section 6: Termination & 30-Day Complete Data Purge */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="font-mono text-xs font-bold text-maroon-800 bg-maroon-50 px-2 py-0.5 rounded">06</span>
            <h2 className="text-lg font-bold text-slate-900 uppercase font-sans tracking-wide">
              Subscription Termination & 30-Day Data Purge
            </h2>
          </div>
          <p className="text-slate-700 text-xs sm:text-sm">
            Upon contract expiration or cancellation:
          </p>
          <ul className="space-y-2 list-disc pl-5 text-slate-700 text-xs">
            <li><strong>30-Day Data Export Window:</strong> The Client has thirty (30) days to export all question repositories, student grades, attendance logs, and fee ledgers via standard CSV/PDF formats.</li>
            <li><strong>Permanent Cryptographic Erasure:</strong> Upon the conclusion of the 30-day grace period, all Client data in production databases and backup volumes is irreversibly deleted in compliance with DPDP Act Section 12.</li>
          </ul>
        </section>

        {/* Section 7: Governing Law & Jurisdiction */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="font-mono text-xs font-bold text-maroon-800 bg-maroon-50 px-2 py-0.5 rounded">07</span>
            <h2 className="text-lg font-bold text-slate-900 uppercase font-sans tracking-wide">
              Governing Law & Legal Jurisdiction
            </h2>
          </div>
          <p className="text-slate-700 text-xs sm:text-sm">
            This Agreement and DPA are governed by the laws of the Republic of India, including the <strong>Digital Personal Data Protection Act, 2023</strong> and the <strong>Information Technology Act, 2000</strong>. Any disputes arising out of this Agreement shall be subject to the exclusive jurisdiction of the competent courts in <strong>Jaipur, Rajasthan, India</strong>.
          </p>
        </section>

      </div>

      {/* Bottom Cross-Navigation Links */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs">
        <div className="text-slate-500 font-mono">
          Hoducation Technologies Pvt. Ltd. &bull; CIN / Corporate Registry
        </div>
        <div className="flex items-center gap-3">
          {onNavigateToPrivacy && (
            <button
              onClick={onNavigateToPrivacy}
              className="text-maroon-800 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>View Privacy Policy Charter &rarr;</span>
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

export default TermsOfService;
