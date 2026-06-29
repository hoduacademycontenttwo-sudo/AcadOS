import React, { useState } from 'react';
import { Mail, Phone, School, User, Calendar, CheckSquare, Layers, Send, X, Star, CalendarDays, CheckCircle2, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DemoBooking } from '../types';
import { supabase } from '../lib/supabase';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newLead: DemoBooking) => void;
}

const AVAILABLE_MODULES = [
  { id: 'learners-hub', label: 'Learners Hub (Digital Library)' },
  { id: 'testmaker', label: 'TestMaker (Exam Studio)' },
  { id: 'omr', label: 'OMR Automatic Evaluation' },
  { id: 'cbt', label: 'Online Mock Tests / CBTs' },
  { id: 'practice', label: 'Online Practice Platform' },
  { id: 'erp', label: 'Institute ERP System' },
  { id: 'crm', label: 'Admissions CRM Tracker' },
  { id: 'content-ip', label: 'CBSE / IGCSE Branded Content IP' }
];

export default function DemoModal({ isOpen, onClose, onSuccess }: DemoModalProps) {
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const [institutionName, setInstitutionName] = useState<string>('');
  const [role, setRole] = useState<string>('Principal');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [institutionType, setInstitutionType] = useState<string>('School');
  const [studentsCount, setStudentsCount] = useState<string>('100-500');
  const [interestedModules, setInterestedModules] = useState<string[]>([]);
  const [preferredTime, setPreferredTime] = useState<string>('Morning (10:00 AM - 1:00 PM)');

  const [formError, setFormError] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Toggle checklist module selection
  const handleToggleModule = (id: string) => {
    setInterestedModules(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!name || !institutionName || !email || !phone) {
        setFormError('Please complete all contact identity details first.');
        return;
      }
      setFormError('');
      setStep(2);
    }
  };

  const handleBackStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (interestedModules.length === 0) {
      setFormError('Please select at least one module of interest.');
      return;
    }

    const newBooking: DemoBooking = {
      id: 'ACC_' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      name,
      institutionName,
      role,
      phone,
      email,
      institutionType,
      studentsCount,
      interestedModules,
      preferredTime,
      createdAt: new Date().toISOString()
    };

    // Save to Supabase
    await supabase.from('demo_leads').insert({
      id: newBooking.id,
      name: newBooking.name,
      institution_name: newBooking.institutionName,
      role: newBooking.role,
      phone: newBooking.phone,
      email: newBooking.email,
      institution_type: newBooking.institutionType,
      students_count: newBooking.studentsCount,
      interested_modules: newBooking.interestedModules,
      preferred_time: newBooking.preferredTime,
      created_at: newBooking.createdAt,
    });

    // Also save to localStorage as backup
    const existing = localStorage.getItem('acados_demo_leads');
    const leadsList = existing ? JSON.parse(existing) : [];
    leadsList.unshift(newBooking);
    localStorage.setItem('acados_demo_leads', JSON.stringify(leadsList));

    // Send welcome email (fire and forget)
    fetch('https://bgaidfuzvcrjbxmpfvym.supabase.co/functions/v1/send-welcome-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newBooking.name,
        email: newBooking.email,
        institutionName: newBooking.institutionName,
        institutionType: newBooking.institutionType,
        interestedModules: newBooking.interestedModules,
      }),
    }).catch(() => {}); // silent fail if email service not configured

    onSuccess(newBooking);
    setIsSubmitted(true);
    setFormError('');
  };

  const handleResetForm = () => {
    setName('');
    setInstitutionName('');
    setRole('Principal');
    setPhone('');
    setEmail('');
    setInstitutionType('School');
    setStudentsCount('100-500');
    setInterestedModules([]);
    setPreferredTime('Morning (10:00 AM - 1:00 PM)');
    setStep(1);
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-maroon-100 flex flex-col my-8"
      >
        {/* Close Button Anchor */}
        <button
          onClick={handleResetForm}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-50 p-1.5 rounded-full z-10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Left Banner + Right Form Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Accent Side bar (4 Columns) */}
          <div className="md:col-span-4 bg-maroon-700 text-white p-6 md:p-8 flex flex-col justify-between min-h-[160px] md:min-h-[480px]">
            <div>
              <span className="text-gold-400 font-mono text-[10px] tracking-widest uppercase font-semibold">
                AcadOS Demo Space
              </span>
              <h4 className="text-xl md:text-2xl font-extrabold tracking-tight mt-1 font-sans">
                Book a Platform Walkthrough
              </h4>
              <p className="text-maroon-150 text-xs mt-3 leading-relaxed">
                Connect with our academic architects. Witness how we white-label portals, TestMakers, ERP, and worksheets under your own custom school brand.
              </p>
            </div>

            <div className="hidden md:block pt-8 border-t border-maroon-600 space-y-3.5 text-xs">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4.5 h-4.5 text-gold-400 shrink-0" />
                <span className="text-maroon-100">Live 1-on-1 walkthrough</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4.5 h-4.5 text-gold-400 shrink-0" />
                <span className="text-maroon-100">Custom branded sample PDF</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4.5 h-4.5 text-gold-400 shrink-0" />
                <span className="text-maroon-100">Direct sandbox access</span>
              </div>
            </div>
          </div>

          {/* Form Side (8 Columns) */}
          <div className="md:col-span-8 p-6 md:p-8 flex flex-col">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
                {/* Step indicator */}
                <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-widest text-slate-550 mb-1">
                  <span>Step {step} of 2</span>
                  <span>{step === 1 ? 'Contact & Institution' : 'Syllabus & Targets'}</span>
                </div>

                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-maroon-600 h-full transition-all duration-300"
                    style={{ width: step === 1 ? '50%' : '100%' }}
                  />
                </div>

                {formError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2">
                    <Star className="w-4.5 h-4.5 text-red-500 fill-red-500" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* STEP 1: CONTACT INFO */}
                {step === 1 && (
                  <div className="space-y-3.5 py-2">
                    <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                      Share your contact details
                    </h5>

                    {/* Name */}
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 text-slate-400 w-4.5 h-4.5" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Full Name"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-850 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-600 focus:bg-white transition-all"
                      />
                    </div>

                    {/* Institution Name */}
                    <div className="relative">
                      <School className="absolute left-3.5 top-3.5 text-slate-400 w-4.5 h-4.5" />
                      <input
                        type="text"
                        required
                        value={institutionName}
                        onChange={(e) => setInstitutionName(e.target.value)}
                        placeholder="Institution/School/Coaching Name"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-850 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-600 focus:bg-white transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 text-slate-400 w-4.5 h-4.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Principal/Academic Email Address"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-850 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-600 focus:bg-white transition-all"
                      />
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 text-slate-400 w-4.5 h-4.5" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone / WhatsApp Number (+91...)"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-850 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-600 focus:bg-white transition-all"
                      />
                    </div>

                    {/* Role selector dropdown */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                          Your Academic Role
                        </label>
                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-maroon-600"
                        >
                          <option value="Principal">School Principal</option>
                          <option value="Coaching Owner">Coaching Institute Owner</option>
                          <option value="Academic Head">Academic Coordinator</option>
                          <option value="Teacher">Subject Teacher / Faculty</option>
                          <option value="Administrator">Administrator / Registrar</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                          Institution Type
                        </label>
                        <select
                          value={institutionType}
                          onChange={(e) => setInstitutionType(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-maroon-600"
                        >
                          <option value="School">K-12 School</option>
                          <option value="Coaching Institute">Coaching Center / Academy</option>
                          <option value="Edtech Partner">Edtech Platform / Franchise</option>
                          <option value="College">College / University</option>
                        </select>
                      </div>
                    </div>

                    {/* Next step CTA */}
                    <div className="pt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="bg-maroon-600 hover:bg-maroon-700 text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer"
                      >
                        <span>Syllabus & Modules Info</span>
                        <Star className="w-3.5 h-3.5 text-gold-400" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: DETAILS & MODULE INTERST */}
                {step === 2 && (
                  <div className="space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <h5 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                        Target Scope & Modules
                      </h5>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wide mb-1">
                            Student Cohort Size
                          </label>
                          <select
                            value={studentsCount}
                            onChange={(e) => setStudentsCount(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-maroon-600"
                          >
                            <option value="&lt;100">Less than 100 Students</option>
                            <option value="100-500">100 - 500 Students</option>
                            <option value="500-2000">500 - 2,000 Students</option>
                            <option value="2000+">More than 2,000 Students</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wide mb-1">
                            Preferred Time Slot
                          </label>
                          <select
                            value={preferredTime}
                            onChange={(e) => setPreferredTime(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-maroon-600"
                          >
                            <option value="Morning">Morning (10 AM - 1 PM)</option>
                            <option value="Afternoon">Afternoon (1 PM - 4 PM)</option>
                            <option value="Evening">Evening (4 PM - 7 PM)</option>
                          </select>
                        </div>
                      </div>

                      {/* Checkboxes modules */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-505 uppercase tracking-wide mb-1">
                          Select AcadOS Modules to See (Select Multiple)
                        </label>
                        
                        <div className="grid grid-cols-2 gap-2 mt-1 max-h-[140px] overflow-y-auto border border-slate-100 p-2 rounded-xl bg-slate-50/50">
                          {AVAILABLE_MODULES.map(m => {
                            const isChecked = interestedModules.includes(m.id);
                            return (
                              <button
                                key={m.id}
                                type="button"
                                onClick={() => handleToggleModule(m.id)}
                                className={`text-left p-2 rounded-lg border text-[10px] font-bold tracking-tight transition-all flex items-center gap-2 ${
                                  isChecked
                                    ? 'bg-maroon-50 border-maroon-300 text-maroon-800'
                                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-350'
                                }`}
                              >
                                <span className={`w-3.5 h-3.5 rounded shrink-0 border flex items-center justify-center ${
                                  isChecked ? 'bg-maroon-700 border-maroon-600 text-white' : 'border-slate-300 bg-white'
                                }`}>
                                  {isChecked && <Star className="w-2.5 h-2.5 fill-gold-400 stroke-gold-400" />}
                                </span>
                                <span className="truncate">{m.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Step Actions */}
                    <div className="pt-4 flex justify-between items-center border-t border-slate-100 mt-2">
                      <button
                        type="button"
                        onClick={handleBackStep}
                        className="text-slate-500 hover:text-slate-800 text-xs font-bold font-mono tracking-wide"
                      >
                        ← Back
                      </button>

                      <button
                        type="submit"
                        className="bg-gradient-to-r from-maroon-600 to-maroon-800 text-white hover:from-maroon-700 hover:to-maroon-900 font-extrabold py-3 px-6 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all active:scale-[0.98] shadow-md cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5 text-gold-400" />
                        <span>Confirm Slot booking</span>
                      </button>
                    </div>
                  </div>
                )}
              </form>
            ) : (
              // SUBMITTED SUCCESS FLOW
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6 flex-1 flex flex-col justify-center items-center"
              >
                <div className="bg-green-50 p-4 rounded-full border border-green-200 text-green-600">
                  <CheckCircle2 className="w-12 h-12 block mx-auto" />
                </div>
                
                <div className="space-y-1.5">
                  <h4 className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                    Walkthrough Scheduled!
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Excellent! Your representative slot has been booked. Academic engineer will reach out on your email: <strong>{email}</strong> within 1 hour.
                  </p>
                </div>

                {/* Pre-filled conversion links (Current behavior opens an Email / WhatsApp prefilled link) */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-2.5 w-full font-mono max-w-md">
                  <span className="text-[9px] text-slate-500 font-mono block uppercase tracking-widest leading-none">
                    Instant Communication Anchors
                  </span>
                  
                  {/* WhatsApp Pre-filled link */}
                  <a
                    href={`https://wa.me/919660034117?text=${encodeURIComponent(`Hi AcadOS team, I'm ${name} from ${institutionName}. I've submitted a platform demo request for our ${institutionType}. Please connect.`)}`}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center justify-between p-2.5 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 text-green-800 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-green-600 block" />
                      <strong>Talk on WhatsApp Instantly</strong>
                    </span>
                    <span>→</span>
                  </a>

                  {/* Mail pre-fill */}
                  <a
                    href={`mailto:hoduacademycontenttwo@gmail.com?subject=AcadOS%20Walkthrough%20Request%20-%20${encodeURIComponent(institutionName)}&body=Dear%20AcadOS%20Team,%0A%0AI%20would%20like%20to%20request%20a%20walkthrough%20of%20the%20AcadOS%20platform%20as%20configured%20on%20the%20website.%0A%0AInstitution:%2520${encodeURIComponent(institutionName)}%0AContact:%2520${encodeURIComponent(phone)}%0AModules%2520of%2520interest:%2520${encodeURIComponent(interestedModules.join(',%20'))}%0A%0ABest%20Regards,%0A${encodeURIComponent(name)}`}
                    className="flex items-center justify-between p-2.5 bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200 text-slate-800 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-600 block" />
                      <strong>Send Pre-filled Request E-mail</strong>
                    </span>
                    <span>→</span>
                  </a>
                </div>

                <button
                  onClick={handleResetForm}
                  className="bg-maroon-700 hover:bg-maroon-800 text-white font-bold py-2.5 px-6 rounded-xl text-xs uppercase cursor-pointer transition-all"
                >
                  Close Window
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
