import React, { useState } from 'react';
import { 
  Users, Calendar, Clock, BookOpen, GraduationCap, Award, Video, FileText, 
  BookMarked, HelpCircle, Trophy, Share2, Clipboard, Settings, Building, 
  MapPin, Phone, Mail, ShieldAlert, CheckSquare, Plus, Edit, Trash2, Search, 
  UserPlus, MessageSquare, BarChart3, TrendingUp, Sparkles, Filter, Check, 
  X, AlertCircle, FileSpreadsheet, Send, HelpCircle as HelpIcon, Lock, 
  ShieldCheck, ArrowRight, DollarSign, Download, Upload, Copy, Briefcase, 
  UserCheck, AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Interfaces for our interactive simulator database
interface Student {
  id: string;
  studentId: string;
  rollNumber: string;
  fullName: string;
  gender: string;
  dob: string;
  bloodGroup: string;
  aadhaar: string;
  photoUrl: string;
  fatherName: string;
  motherName: string;
  mobile: string;
  email: string;
  occupation: string;
  branch: string;
  school: string;
  session: string;
  studentClass: string;
  batch: string;
  course: string;
  currentAddress: string;
  permanentAddress: string;
}

interface Lead {
  id: string;
  leadId: string;
  name: string;
  mobile: string;
  email: string;
  course: string;
  source: string;
  city: string;
  stage: 'New Lead' | 'Contacted' | 'Interested' | 'Demo Scheduled' | 'Follow Up' | 'Admission Confirmed' | 'Lost';
  counsellor: string;
  followUpDate: string;
  remarks: string;
}

interface Staff {
  id: string;
  name: string;
  role: 'CRM Admin' | 'Team Leader' | 'Counsellor' | 'Telecaller' | 'Teacher' | 'Super Admin';
  phone: string;
  attendanceToday: 'Present' | 'Absent' | 'Leave' | 'Not Checked-In';
  checkInTime?: string;
  checkOutTime?: string;
}

interface TimetableItem {
  id: string;
  subject: string;
  faculty: string;
  time: string;
  room: string;
  date: string;
  className: string;
}

interface TestMark {
  id: string;
  studentName: string;
  subject: string;
  testType: 'Unit Test' | 'Mock Test' | 'Practice Test';
  marksObtained: number;
  totalMarks: number;
}

export function ErpCrmPlayground() {
  // App-level state
  const [activeTab, setActiveTab] = useState<'Acad' | 'Ops' | 'Setup' | 'CRM'>('Acad');
  const [selectedSubMenu, setSelectedSubMenu] = useState<string>('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [selectedBranch, setSelectedBranch] = useState<string>('Vaishali Estate');
  const [selectedSession, setSelectedSession] = useState<string>('2026-27');
  
  // Alert logs (SMS/WhatsApp logs simulator)
  const [systemAlerts, setSystemAlerts] = useState<Array<{ id: string; type: 'sms' | 'whatsapp' | 'email'; message: string; timestamp: string }>>([
    { id: '1', type: 'whatsapp', message: 'Hi parent, Rajesh was present in 12th PCM today.', timestamp: '10:15 AM' },
    { id: '2', type: 'sms', message: 'Attendance alert: Sunita registered as Absent today.', timestamp: '09:45 AM' },
  ]);

  // Initial Mock Students
  const [students, setStudents] = useState<Student[]>([
    {
      id: 'S001',
      studentId: 'HABR-ST-01',
      rollNumber: '101',
      fullName: 'Aarav Sharma',
      gender: 'Male',
      dob: '2010-05-14',
      bloodGroup: 'O+',
      aadhaar: '9876-5432-1011',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      fatherName: 'Vijay Sharma',
      motherName: 'Sunita Sharma',
      mobile: '+91 9876543210',
      email: 'aarav.sharma@example.com',
      occupation: 'Business',
      branch: 'Vaishali Estate',
      school: 'Hodu Academy Sr Sec',
      session: '2026-27',
      studentClass: 'Class 12',
      batch: 'A1 - Prime',
      course: 'JEE Mains Assess Program',
      currentAddress: 'B-402, Royal Residency, Jaipur',
      permanentAddress: 'B-402, Royal Residency, Jaipur'
    },
    {
      id: 'S002',
      studentId: 'HABR-ST-02',
      rollNumber: '102',
      fullName: 'Ananya Iyer',
      gender: 'Female',
      dob: '2011-08-22',
      bloodGroup: 'A+',
      aadhaar: '1234-5678-9012',
      photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      fatherName: 'Ramachandran Iyer',
      motherName: 'Meenakshi Iyer',
      mobile: '+91 9444123456',
      email: 'ananya.iyer@example.com',
      occupation: 'Software Engineer',
      branch: 'Vaishali Estate',
      school: 'St. Xavier School',
      session: '2026-27',
      studentClass: 'Class 11',
      batch: 'B2 - Advanced',
      course: 'NEET Foundation Pro',
      currentAddress: 'Flat 12A, Vaishali Greens, Jaipur',
      permanentAddress: 'Flat 12A, Vaishali Greens, Jaipur'
    }
  ]);

  // Initial Mock Leads
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 'L001',
      leadId: 'HA-LD-101',
      name: 'Rohan Mehra',
      mobile: '+91 9549326982',
      email: 'rohan.mehra@gmail.com',
      course: 'JEE Mains & Advanced Prep',
      source: 'Google Ads',
      city: 'Jaipur',
      stage: 'New Lead',
      counsellor: 'Sharma Ji',
      followUpDate: '2026-06-20',
      remarks: 'Inquired about fee structure. Follow up scheduled.'
    },
    {
      id: 'L002',
      leadId: 'HA-LD-102',
      name: 'Priyanka Patel',
      mobile: '+91 9257879555',
      email: 'priyanka@gmail.com',
      course: 'NEET Premium Intensive',
      source: 'Instagram',
      city: 'Jaipur',
      stage: 'Interested',
      counsellor: 'Meena Sharma',
      followUpDate: '2026-06-18',
      remarks: 'Requires demo school slot on Saturday.'
    },
    {
      id: 'L003',
      leadId: 'HA-LD-103',
      name: 'Kabir Kapoor',
      mobile: '+91 9829012345',
      email: 'kabir.k@yahoo.com',
      course: 'Class 10 NTSE Integrated',
      source: 'Walk-in',
      city: 'Jaipur',
      stage: 'Demo Scheduled',
      counsellor: 'A. K. Mittal',
      followUpDate: '2026-06-19',
      remarks: 'Walk-in visit done, parents convinced. Demo class given on Sunday.'
    }
  ]);

  // Lead Funnel Setup Stages configuration
  const [funnelStages, setFunnelStages] = useState<string[]>([
    'New Lead', 'Contacted', 'Interested', 'Demo Scheduled', 'Follow Up', 'Admission Confirmed', 'Lost'
  ]);

  // Initial Staff List
  const [staff, setStaff] = useState<Staff[]>([
    { id: 'ST01', name: 'Alok K. Mittal', role: 'Team Leader', phone: '9257879555', attendanceToday: 'Present', checkInTime: '08:55 AM' },
    { id: 'ST02', name: 'Meena Sharma', role: 'Counsellor', phone: '9549326982', attendanceToday: 'Present', checkInTime: '09:12 AM' },
    { id: 'ST03', name: 'Vikram Singh', role: 'Teacher', phone: '9876543210', attendanceToday: 'Leave', checkInTime: undefined },
    { id: 'ST04', name: 'Ritu Sen', role: 'Telecaller', phone: '9887711223', attendanceToday: 'Not Checked-In' },
  ]);

  // Mock Timetable
  const [timetable, setTimetable] = useState<TimetableItem[]>([
    { id: 'TT01', subject: 'Physics (Mechanics)', faculty: 'Prof. J. C. Verma', time: '10:00 AM - 11:30 AM', room: 'Lecture Hall 102', date: '2026-06-17', className: 'Class 12' },
    { id: 'TT02', subject: 'Chemistry (Organic)', faculty: 'Dr. S. K. Gupta', time: '12:00 PM - 01:30 PM', room: 'Lecture Hall 104', date: '2026-06-17', className: 'Class 12' },
    { id: 'TT03', subject: 'Mathematics (Calculus)', faculty: 'M. S. Choudhary', time: '02:00 PM - 03:30 PM', room: 'Computer Lab B', date: '2026-06-17', className: 'Class 11' },
  ]);

  // Marks Database
  const [testMarks, setTestMarks] = useState<TestMark[]>([
    { id: 'M01', studentName: 'Aarav Sharma', subject: 'Physics', testType: 'Unit Test', marksObtained: 22, totalMarks: 25 },
    { id: 'M02', studentName: 'Aarav Sharma', subject: 'Chemistry', testType: 'Unit Test', marksObtained: 20, totalMarks: 25 },
    { id: 'M03', studentName: 'Aarav Sharma', subject: 'Mathematics', testType: 'Unit Test', marksObtained: 24, totalMarks: 25 },
    { id: 'M04', studentName: 'Ananya Iyer', subject: 'Physics', testType: 'Unit Test', marksObtained: 19, totalMarks: 25 },
  ]);

  // Active inputs
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);

  // Simple automated event logs builder
  const logEvent = (type: 'sms' | 'whatsapp' | 'email', message: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSystemAlerts(prev => [
      { id: Date.now().toString(), type, message, timestamp: time },
      ...prev
    ]);
  };

  // Student State form
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    fullName: '', studentClass: 'Class 12', batch: 'A1 - Prime', mobile: '', email: '', fatherName: '', school: 'Hodu Academy', currentAddress: '', gender: 'Male', bloodGroup: 'O+'
  });

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const studentId = `HABR-ST-${String(students.length + 1).padStart(2, '0')}`;
    const rollNo = String(100 + students.length + 1);
    const completedStudent: Student = {
      id: Date.now().toString(),
      studentId,
      rollNumber: rollNo,
      fullName: newStudent.fullName || 'Anonymous Student',
      gender: newStudent.gender || 'Male',
      dob: newStudent.dob || '2010-01-01',
      bloodGroup: newStudent.bloodGroup || 'O+',
      aadhaar: newStudent.aadhaar || '0000-0000-0000',
      photoUrl: newStudent.photoUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      fatherName: newStudent.fatherName || 'Father Name',
      motherName: newStudent.motherName || 'Mother Name',
      mobile: newStudent.mobile || '+91 ',
      email: newStudent.email || '',
      occupation: newStudent.occupation || 'Service',
      branch: selectedBranch,
      school: newStudent.school || 'Hodu Academy',
      session: selectedSession,
      studentClass: newStudent.studentClass || 'Class 12',
      batch: newStudent.batch || 'A1 - Prime',
      course: newStudent.course || 'Interactive Assess Model',
      currentAddress: newStudent.currentAddress || '',
      permanentAddress: newStudent.currentAddress || '',
    };

    setStudents([...students, completedStudent]);
    setShowAddStudentModal(false);
    logEvent('whatsapp', `Successfully registered student: ${completedStudent.fullName} [Roll ${completedStudent.rollNumber}]`);
    setNewStudent({ fullName: '', studentClass: 'Class 12', batch: 'A1 - Prime', mobile: '', email: '', fatherName: '', school: 'Hodu Academy', currentAddress: '', gender: 'Male', bloodGroup: 'O+' });
  };

  // Lead State form
  const [newLead, setNewLead] = useState<Partial<Lead>>({
    name: '', mobile: '', email: '', course: 'JEE Mains & Advanced Prep', source: 'Website', city: 'Jaipur', counsellor: 'Alok K. Mittal', remarks: ''
  });

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    const leadId = `HA-LD-${100 + leads.length + 1}`;
    const completedLead: Lead = {
      id: Date.now().toString(),
      leadId,
      name: newLead.name || 'Anonymous Inquiry',
      mobile: newLead.mobile || '',
      email: newLead.email || '',
      course: newLead.course || 'Admissions Stream',
      source: newLead.source || 'Website',
      city: newLead.city || 'Jaipur',
      stage: 'New Lead',
      counsellor: newLead.counsellor || 'Unassigned',
      followUpDate: new Date().toISOString().split('T')[0],
      remarks: newLead.remarks || 'No detailed log comments'
    };

    setLeads([...leads, completedLead]);
    setShowAddLeadModal(false);
    logEvent('sms', `New digital conversion lead mapped for ${completedLead.name} via ${completedLead.source}`);
    setNewLead({ name: '', mobile: '', email: '', course: 'JEE Mains & Advanced Prep', source: 'Website', city: 'Jaipur', counsellor: 'Alok K. Mittal', remarks: '' });
  };

  // Quick State Updates
  const handleUpdateLeadStage = (leadId: string, newStage: Lead['stage']) => {
    setLeads(leads.map(lead => lead.id === leadId ? { ...lead, stage: newStage } : lead));
    const targetLead = leads.find(l => l.id === leadId);
    if (targetLead) {
      logEvent('whatsapp', `Lead pipeline update: ${targetLead.name} changed status to ${newStage}`);
    }
  };

  // Single-Click Lead to Student Conv
  const convertLeadToStudent = (lead: Lead) => {
    const studentId = `HABR-ST-${String(students.length + 1).padStart(2, '0')}`;
    const rollNo = String(100 + students.length + 1);
    const converted: Student = {
      id: Date.now().toString(),
      studentId,
      rollNumber: rollNo,
      fullName: lead.name,
      gender: 'Male',
      dob: '2010-06-15',
      bloodGroup: 'B+',
      aadhaar: 'XXXX-XXXX-XXXX',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      fatherName: 'Mr. ' + lead.name.split(' ').slice(-1)[0] || 'Father Name',
      motherName: 'Mother Name',
      mobile: lead.mobile,
      email: lead.email,
      occupation: 'Retailer',
      branch: selectedBranch,
      school: 'Hodu Academy Senior Wing',
      session: selectedSession,
      studentClass: 'Class 11',
      batch: 'B1 - Regular',
      course: lead.course,
      currentAddress: 'Jaipur Residence Address',
      permanentAddress: 'Jaipur Residence Address'
    };

    setStudents([...students, converted]);
    setLeads(leads.map(l => l.id === lead.id ? { ...l, stage: 'Admission Confirmed' } : l));
    logEvent('email', `Inquiry [${lead.name}] successfully converted to permanent roll ID [${studentId}]. Welcome onboard!`);
  };

  // Trigger Bulk SMS / WhatsApp Alerts for absent students
  const [attendanceDate, setAttendanceDate] = useState('2026-06-17');
  const [attendanceRoster, setAttendanceRoster] = useState<Record<string, 'Present' | 'Absent' | 'Leave'>>({
    'S001': 'Present',
    'S002': 'Absent'
  });

  const handleSaveAttendance = () => {
    Object.entries(attendanceRoster).forEach(([stdId, status]) => {
      const studentObj = students.find(s => s.id === stdId);
      if (studentObj && status === 'Absent') {
        logEvent('whatsapp', `⚠️ WhatsApp Alert: Dear parent, your ward ${studentObj.fullName} is registered ABSENT from school on ${attendanceDate}. Please verify.`);
        logEvent('sms', `⚠️ SMS Sent: ${studentObj.fullName} was marked absent today in ${studentObj.studentClass}. Hodu Team`);
      } else if (studentObj) {
        logEvent('email', `Email Log: ${studentObj.fullName} attendance recorded as ${status} on ${attendanceDate}.`);
      }
    });
    alert('Attendance data finalized securely. Guardian alerts pushed automatically!');
  };

  // Render Sidebar Options depending on main selected tab
  const getSidebarConfig = () => {
    switch (activeTab) {
      case 'Ops':
        return [
          { group: 'HR Management', items: ['Staff Attendance', 'Biometric Devices', 'Holidays'] },
          { group: 'Payroll & Benefits', items: ['Payroll'] },
          { group: 'Performance', items: ['Performance Tracking', 'PIP & Warnings'] },
          { group: 'HR Operations', items: ['HR Mails', 'Assets Roster', 'Tasks Tracker', 'Daily Logs', 'Field Visits'] },
          { group: 'Recruitment', items: ['Recruitment ATS', 'Teacher Recruitment'] },
        ];
      case 'Setup':
        return [
          { group: 'Institution', items: ['Branches Configuration', 'Schools Board', 'Sessions Settings', 'Classes Roster'] },
          { group: 'Configuration', items: ['Users & Roles', 'Institute Settings', 'Branch Branding'] },
        ];
      case 'CRM':
        return [
          { group: 'Funnel Center', items: ['CRM Dashboard', 'Leads Inbox', 'Pipeline Stages', 'Lead Forms'] },
          { group: 'Database Operations', items: ['Raw Data Import', 'Lead Distribution', 'Counselling Team'] },
          { group: 'Engagement Flow', items: ['WhatsApp Bulk CRM', 'Referral Partners', 'Referral Payouts'] },
        ];
      case 'Acad':
      default:
        return [
          { group: 'Overview', items: ['Dashboard'] },
          { group: 'People Details', items: ['Students Register', 'Student Attendance', 'Counselling Module'] },
          { group: 'Academics Control', items: ['Class Schedules', 'Tests & Marks', 'School Exams Management', 'Report Cards'] },
          { group: 'Online Studio', items: ['Online Courses', 'Online Learners', 'Live Classes Roster', 'Video Management'] },
          { group: 'Resources Desk', items: ['Learning Resources', 'Library Records', 'Question Bank Desk', 'Practice Admin', 'Quick Share Portal'] },
          { group: 'Communication Channel', items: ['Events Calendar', 'Notices System', 'Push Notifications Hub'] },
        ];
    }
  };

  const handleMenuItemSelect = (menu: string) => {
    setSelectedSubMenu(menu);
  };

  return (
    <div className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-xl flex flex-col font-sans h-[780px]" id="erp-crm-simulator">
      {/* 1. ACAD-OS SYSTEM CHROME HEADER MATCHING HIGH FIDELITY GRAPHICS */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 flex-shrink-0">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-maroon-800 border border-maroon-600 flex items-center justify-center text-white text-xs font-black">
              HA
            </div>
            <div>
              <span className="font-serif text-slate-900 font-extrabold text-sm tracking-tight block">Hodu Academy</span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase font-semibold hidden sm:block">Academic Enterprise Suite</span>
            </div>
          </div>

          {/* Core Navigation Selector buttons */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button 
              onClick={() => { setActiveTab('Acad'); setSelectedSubMenu('Dashboard'); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${activeTab === 'Acad' ? 'bg-white text-maroon-805 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              🎓 Acad
            </button>
            <button 
              onClick={() => { setActiveTab('Ops'); setSelectedSubMenu('Staff Attendance'); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${activeTab === 'Ops' ? 'bg-white text-maroon-805 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              💼 Ops
            </button>
            <button 
              onClick={() => { setActiveTab('Setup'); setSelectedSubMenu('Branches Configuration'); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${activeTab === 'Setup' ? 'bg-white text-maroon-805 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              🔧 Setup
            </button>
            <button 
              onClick={() => { setActiveTab('CRM'); setSelectedSubMenu('CRM Dashboard'); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${activeTab === 'CRM' ? 'bg-white text-maroon-805 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              🎯 CRM
            </button>
          </div>
        </div>

        {/* Global Context Bar: Branch Selector and Active Session Settings */}
        <div className="flex items-center gap-3">
          {/* Branch Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
            <Building className="w-3.5 h-3.5 text-slate-400" />
            <select 
              value={selectedBranch} 
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="text-xs font-bold text-slate-700 bg-transparent border-none outline-none cursor-pointer"
            >
              <option value="Vaishali Estate">Vaishali Estate (HABR-01)</option>
              <option value="Malviya Nagar">Malviya Nagar (HAMN-02)</option>
              <option value="C-Scheme Head">C-Scheme Head (HACS-03)</option>
            </select>
          </div>

          {/* Session Year */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <select 
              value={selectedSession} 
              onChange={(e) => setSelectedSession(e.target.value)}
              className="text-xs font-bold text-slate-700 bg-transparent border-none outline-none cursor-pointer"
            >
              <option value="2026-27">2026-27</option>
              <option value="2025-26">2025-26</option>
            </select>
          </div>

          <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 border border-orange-200">
            <Users className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* 2. SPLIT LAYOUT PANEL (SIDEBAR + MAIN COMPONENT WORKSPACE) */}
      <div className="flex flex-1 overflow-hidden min-h-0 relative">

        {/* MOBILE: overlay backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-30 sm:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar — overlay on mobile, push on desktop */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
          ${sidebarOpen ? 'sm:w-56' : 'sm:w-0'}
          fixed sm:relative top-0 left-0 h-full sm:h-auto z-40 sm:z-auto
          w-64 bg-white border-r border-slate-200 flex flex-col justify-between flex-shrink-0
          transition-all duration-300 overflow-hidden
        `}>
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Navigation</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-maroon-700 hover:bg-maroon-50 transition-all"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-y-auto p-3 space-y-5 flex-1">
            {getSidebarConfig().map((section, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block px-2">
                  {section.group}
                </span>
                <div className="space-y-0.5">
                  {section.items.map((item, idy) => {
                    const isActive = selectedSubMenu.toLowerCase().replace(/[^a-z]/g, '') === item.toLowerCase().replace(/[^a-z]/g, '');
                    return (
                      <button
                        key={idy}
                        onClick={() => { handleMenuItemSelect(item); setSidebarOpen(false); }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium flex items-center justify-between transition-all ${isActive ? 'bg-maroon-50 text-maroon-800 font-bold border border-maroon-100' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                      >
                        <span>{item}</span>
                        {isActive && <div className="w-1 h-3 rounded bg-maroon-700" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="bg-slate-50 p-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-maroon-700 flex items-center justify-center text-[9px] font-extrabold text-white">ADM</div>
              <div>
                <span className="text-xs font-bold text-slate-900 block leading-none">admin access</span>
                <span className="text-[9px] text-slate-400 font-mono uppercase">Administrator</span>
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Work Area Console */}
        <div className="flex-1 bg-slate-50 overflow-y-auto min-h-0 relative">
          {/* Mobile top bar with menu button */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white border-b border-slate-100 sm:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:text-maroon-700 hover:border-maroon-200 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              Menu
            </button>
            <span className="text-xs font-bold text-slate-700">{selectedSubMenu}</span>
          </div>

          {/* Desktop: collapsed sidebar reopen button */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="hidden sm:flex absolute top-3 left-3 z-10 items-center gap-1.5 px-2.5 py-1.5 bg-white border border-slate-200 shadow-sm rounded-lg text-[10px] font-bold text-slate-600 hover:text-maroon-700 hover:border-maroon-200 transition-all"
            >
              <ArrowRight className="w-3 h-3" /> Menu
            </button>
          )}

          <div className="p-4 sm:p-6">
          {/* ======================= TABS AND WORKSPACE SUB-ROUTINGS ======================= */}

          {/* SECTION A: ACAD GRAPHICAL MODULE */}
          {activeTab === 'Acad' && (
            <>
              {/* SUBTAB 1.1: ACAD DASHBOARD */}
              {selectedSubMenu === 'Dashboard' && (
                <div className="space-y-6">
                  {/* Top KPIs Blocks */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[
                      { label: 'Total Students', value: students.length, suffix: 'Active', icon: Users, bg: 'bg-rose-50/70 border-rose-100 text-rose-700' },
                      { label: 'Active Classes', value: '14', suffix: 'Programs', icon: GraduationCap, bg: 'bg-amber-50/70 border-amber-100 text-amber-700' },
                      { label: "Today's Attendance", value: '78%', suffix: 'Average Present', icon: Calendar, bg: 'bg-emerald-50/70 border-emerald-100 text-emerald-700' },
                      { label: 'Total Teachers', value: '12', suffix: 'Educators', icon: UserCheck, bg: 'bg-blue-50/70 border-blue-100 text-blue-700' },
                      { label: 'Total Employees', value: '18', suffix: 'Staff members', icon: Briefcase, bg: 'bg-purple-50/70 border-purple-100 text-purple-700' },
                      { label: 'Pending Tasks', value: '5', suffix: 'Action required', icon: CheckSquare, bg: 'bg-slate-100 border-slate-200 text-slate-700' },
                    ].map((kpi, idx) => (
                      <div key={idx} className={`p-4 rounded-xl border ${kpi.bg} shadow-xs flex flex-col justify-between`}>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold opacity-80">{kpi.label}</span>
                          <kpi.icon className="w-4 h-4 opacity-75" />
                        </div>
                        <div>
                          <strong className="text-xl font-black block tracking-tight">{kpi.value}</strong>
                          <span className="text-[9px] opacity-75">{kpi.suffix}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Graph Grid block */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Attendance Last 7 day bar columns */}
                    <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                        <div>
                          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-maroon-800" />
                            Attendance - Last 7 Working Days
                          </h3>
                          <p className="text-[10px] text-slate-400">Average percentage of registered student population present</p>
                        </div>
                        <span className="bg-slate-50 text-[10px] font-mono px-2 py-1 rounded border border-slate-200 text-slate-500">2026-27 Stream</span>
                      </div>

                      {/* Bar charts container rendered in pristine pure CSS to ensure cross-platform fidelity */}
                      <div className="h-56 flex items-end justify-between pt-6 px-4">
                        {[
                          { day: 'Tue 9/6', percent: 65 },
                          { day: 'Wed 10/6', percent: 100 },
                          { day: 'Thu 11/6', percent: 60 },
                          { day: 'Fri 12/6', percent: 66 },
                          { day: 'Sat 13/6', percent: 66 },
                          { day: 'Tue 16/6', percent: 71 },
                          { day: 'Wed 17/6', percent: 78 },
                        ].map((bar, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-2 max-w-[50px] group">
                            <div className="w-full bg-slate-100 rounded-t-lg h-36 flex items-end overflow-hidden relative">
                              <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: `${bar.percent}%` }}
                                className="w-full bg-maroon-800 group-hover:bg-maroon-700 transition-colors"
                              />
                              <span className="absolute top-1 left-0 right-0 text-center font-mono text-[9px] font-bold text-slate-600 group-hover:text-amber-600 transition-colors">
                                {bar.percent}%
                              </span>
                            </div>
                            <span className="font-mono text-[9px] text-slate-400 text-center whitespace-nowrap">{bar.day}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Birthdays Widget Container precisely matching graphic */}
                    <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                      <div className="border-b border-slate-100 pb-2">
                        <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                          🎂 Upcoming Birthdays
                        </h3>
                        <p className="text-[10px] text-slate-400">Next 7 days • Students, Teachers & Employees</p>
                      </div>

                      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-3.5">
                        <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-150 flex items-center justify-center text-slate-350">
                          <Plus className="w-5 h-5 text-slate-300" />
                        </div>
                        <p className="text-xs text-slate-400 text-center font-mono">No birthdays in the next 7 days</p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 text-center">
                        <button className="text-[10px] text-maroon-800 hover:underline font-bold">
                          View Academic Calendar →
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Live communications events feed log */}
                  <div className="bg-slate-900 text-slate-300 rounded-2xl p-5 border border-slate-850 shadow-md">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
                      <span className="text-[10px] text-gold-500 font-mono uppercase font-bold tracking-widest flex items-center gap-1.5">
                        <CheckSquare className="w-3.5 h-3.5 text-gold-400" />
                        Real-time Guardian Alert Broadcast Center
                      </span>
                      <p className="text-[9px] text-slate-500">Live outbound SMS + WhatsApp API logs</p>
                    </div>

                    <div className="max-h-24 overflow-y-auto space-y-2 text-xs">
                      {systemAlerts.map(alert => (
                        <div key={alert.id} className="flex items-center justify-between bg-slate-950 px-3 py-1.5 rounded border border-slate-850">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded font-black tracking-widest bg-slate-800 text-slate-300">
                              {alert.type}
                            </span>
                            <span className="font-mono text-slate-350">{alert.message}</span>
                          </div>
                          <span className="text-[9px] text-slate-500 font-mono">{alert.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUBTAB 1.2: STUDENTS REGISTER */}
              {selectedSubMenu === 'Students Register' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-xl font-serif text-slate-900">Student Profiles & Enrollment Dossier</h2>
                      <p className="text-xs text-slate-500">Create, edit, search, and manage secure central student identity records</p>
                    </div>
                    <button 
                      onClick={() => setShowAddStudentModal(true)}
                      className="px-4 py-2 bg-maroon-800 hover:bg-maroon-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      Add New Student
                    </button>
                  </div>

                  {/* Search filter bar */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input 
                        type="text" 
                        placeholder="Search student by Name, Roll, or Class stream..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-205 rounded-lg outline-none focus:ring-1 focus:ring-maroon-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <select className="border border-slate-205 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-white">
                        <option>Class 12</option>
                        <option>Class 11</option>
                        <option>Class 10</option>
                      </select>
                      <select className="border border-slate-205 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-white">
                        <option>Batch A1 - Prime</option>
                        <option>Batch B2 - Advanced</option>
                      </select>
                    </div>
                  </div>

                  {/* Students Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {students.filter(s => s.fullName.toLowerCase().includes(searchQuery.toLowerCase())).map(student => (
                      <div key={student.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm hover:border-slate-300 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3.5">
                            <img src={student.photoUrl} alt={student.fullName} className="w-12 h-12 rounded-full cover border" />
                            <div>
                              <h4 className="text-sm font-bold text-slate-900">{student.fullName}</h4>
                              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">{student.studentId} • Roll {student.rollNumber}</p>
                              <span className="inline-block mt-1 bg-maroon-50 text-maroon-800 text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded border border-maroon-105">
                                {student.studentClass} • {student.batch}
                              </span>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => {
                              setStudents(students.filter(s => s.id !== student.id));
                              logEvent('sms', `Removed profile folder of student [${student.fullName}]`);
                            }}
                            className="p-1 px-2.5 rounded bg-rose-50 text-rose-700 border border-rose-100 text-[10px] hover:bg-rose-100 transition-colors"
                          >
                            Delete
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t pt-3 border-slate-100 text-xs">
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Father Name</span>
                            <span className="font-semibold text-slate-700">{student.fatherName}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Contact No</span>
                            <span className="font-semibold text-slate-700">{student.mobile}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Email Stream</span>
                            <span className="font-semibold text-slate-700 block truncate">{student.email}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Target Course Program</span>
                            <span className="font-semibold text-slate-700 break-words">{student.course}</span>
                          </div>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-150 text-[10px] text-slate-500 font-mono space-y-1">
                          <p>📍 <strong>School:</strong> {student.school}</p>
                          <p>📄 <strong>Aadhaar File:</strong> {student.aadhaar} (Verified ✅)</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUBTAB 1.3: STUDENT ATTENDANCE */}
              {selectedSubMenu === 'Student Attendance' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-serif text-slate-900">Guardian SMS/WhatsApp Student Attendance Engine</h2>
                    <p className="text-xs text-slate-500">Record daily classroom rolls, request bulk registers, and trigger direct notification flags</p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Assessment Date</label>
                          <input 
                            type="date" 
                            className="bg-slate-50 border border-slate-200 px-3 py-1 rounded text-xs outline-none" 
                            value={attendanceDate}
                            onChange={(e) => setAttendanceDate(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Class Select</label>
                          <select className="bg-slate-50 border border-slate-200 px-3 py-1 rounded text-xs outline-none">
                            <option>Class 12 - Science PCM</option>
                            <option>Class 11 - Science PCB</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            const newRoster = { ...attendanceRoster };
                            students.forEach(s => { newRoster[s.id] = 'Present'; });
                            setAttendanceRoster(newRoster);
                          }}
                          className="px-3 py-1.5 rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[11px] font-bold text-slate-600"
                        >
                          Mark All Present
                        </button>
                      </div>
                    </div>

                    {/* Student attendance list rows */}
                    <div className="space-y-3">
                      {students.map(student => {
                        const status = attendanceRoster[student.id] || 'Present';
                        return (
                          <div key={student.id} className="flex items-center justify-between bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                                <img src={student.photoUrl} alt={student.fullName} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-slate-800">{student.fullName}</h4>
                                <span className="font-mono text-[9px] text-slate-400">Roll: {student.rollNumber} • {student.batch}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1">
                              <button 
                                onClick={() => setAttendanceRoster({ ...attendanceRoster, [student.id]: 'Present' })}
                                className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all ${status === 'Present' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-white text-slate-400 border-slate-250'}`}
                              >
                                Present
                              </button>
                              <button 
                                onClick={() => setAttendanceRoster({ ...attendanceRoster, [student.id]: 'Absent' })}
                                className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all ${status === 'Absent' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-white text-slate-400 border-slate-250'}`}
                              >
                                Absent
                              </button>
                              <button 
                                onClick={() => setAttendanceRoster({ ...attendanceRoster, [student.id]: 'Leave' })}
                                className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all ${status === 'Leave' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-white text-slate-400 border-slate-250'}`}
                              >
                                Leave
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex justify-end pt-2 border-t text-sm">
                      <button 
                        onClick={handleSaveAttendance}
                        className="px-5 py-2.5 bg-maroon-800 hover:bg-maroon-900 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Finalize Roll Call & Send Absence Multi-alerts
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* OTHER ACAD VIEWS SIMULATED DESKTOP-STYLE FOR ERP COMPLETENESS */}
              {['Class Schedules', 'Tests & Marks', 'Counselling Module', 'School Exams Management', 'Report Cards', 'Online Courses', 'Online Learners', 'Live Classes Roster', 'Video Management', 'Learning Resources', 'Library Records', 'Question Bank Desk', 'Practice Admin', 'Quick Share Portal', 'Events Calendar', 'Notices System', 'Push Notifications Hub'].includes(selectedSubMenu) && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
                  <div className="flex border-b border-slate-100 pb-3 justify-between items-center">
                    <div>
                      <span className="text-[10px] font-extrabold text-maroon-800 uppercase tracking-widest font-mono">Module Detail View</span>
                      <h2 className="text-lg font-serif text-slate-900">{selectedSubMenu} Panel</h2>
                    </div>
                    <span className="bg-slate-50 text-[10px] border px-2 py-1.5 rounded font-mono text-slate-400 text-right">Vaishali Estate Workspace</span>
                  </div>

                  {selectedSubMenu === 'Class Schedules' && (
                    <div className="space-y-4">
                      <p className="text-xs text-slate-500">Assign faculty, room allocation settings, and schedule weekly batch lectures here.</p>
                      <div className="space-y-3">
                        {timetable.map(slot => (
                          <div key={slot.id} className="p-4 bg-slate-50 border rounded-xl flex justify-between items-center">
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono uppercase bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-bold">{slot.className}</span>
                              <h4 className="text-xs font-bold text-slate-800 mt-1">{slot.subject}</h4>
                              <p className="text-[10px] text-slate-500 font-mono">Room: {slot.room} • Faculty: {slot.faculty}</p>
                            </div>
                            <span className="text-xs font-bold text-slate-700 bg-white border px-3 py-1.5 rounded-lg shadow-xs">{slot.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedSubMenu === 'Tests & Marks' && (
                    <div className="space-y-4">
                      <p className="text-xs text-slate-500">Record unit assessment, mock results, and evaluate subject-wise rank grids.</p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b bg-slate-50 text-[10px] tracking-wider uppercase text-slate-500">
                              <th className="p-3 font-extrabold">Student Name</th>
                              <th className="p-3 font-extrabold">Subject stream</th>
                              <th className="p-3 font-extrabold">Test Type</th>
                              <th className="p-3 font-extrabold">Marks Obtained</th>
                              <th className="p-3 font-extrabold">Percentage</th>
                            </tr>
                          </thead>
                          <tbody>
                            {testMarks.map(mark => (
                              <tr key={mark.id} className="border-b hover:bg-slate-50">
                                <td className="p-3 font-bold text-slate-800">{mark.studentName}</td>
                                <td className="p-3 font-semibold text-slate-600">{mark.subject}</td>
                                <td className="p-3 text-slate-500">{mark.testType}</td>
                                <td className="p-3 font-mono text-slate-905 font-bold">{mark.marksObtained} / {mark.totalMarks}</td>
                                <td className="p-3 font-bold text-emerald-600">{Math.round((mark.marksObtained / mark.totalMarks) * 100)}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {selectedSubMenu === 'Counselling Module' && (
                    <div className="space-y-4">
                      <p className="text-xs text-slate-500">Interactive academic counseling dashboard for handling walk-in parental inquiries and mock suggestions.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { label: 'Parent Meetings Today', count: '4' },
                          { label: 'Course Suggestion Trials', count: '12' },
                          { label: 'Counselor Converted', count: '85%' },
                        ].map((stat, id) => (
                          <div key={id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <span className="text-[10px] text-slate-400 block font-mono uppercase">{stat.label}</span>
                            <strong className="text-lg font-black text-slate-800">{stat.count}</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedSubMenu === 'Report Cards' && (
                    <div className="space-y-4">
                      <p className="text-xs text-slate-500">Print secure terminal examination result templates or download in high-fidelity PDF formats.</p>
                      <div className="border border-slate-200 p-5 rounded-2xl space-y-4 bg-slate-50 max-w-md mx-auto">
                        <div className="text-center pb-3 border-b">
                          <h4 className="font-bold text-slate-800 text-sm">HODU ACADEMY ASSESSMENT CELL</h4>
                          <span className="text-[10px] text-slate-400 font-mono">Consolidated Academic Transcript</span>
                        </div>
                        <div className="space-y-1.5 text-xs text-slate-600">
                          <p><strong>Candidate Name:</strong> Aarav Sharma</p>
                          <p><strong>Roll Identifier:</strong> HABR-ST-01</p>
                          <p><strong>Program stream:</strong> 12th PCM JEE Core</p>
                          <p><strong>Overall Grade obtained:</strong> A+ (91%)</p>
                        </div>
                        <button 
                          onClick={() => {
                            alert('Connecting to PDF engine to construct Aarav_Sharma_Report_Card.pdf');
                            logEvent('email', 'Aarav_Sharma_Report_Card.pdf generated and pushed to father email');
                          }}
                          className="w-full py-2 bg-maroon-800 hover:bg-maroon-900 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download PDF Report Card
                        </button>
                      </div>
                    </div>
                  )}

                  {/* General Mock placeholder content fallback */}
                  {!['Class Schedules', 'Tests & Marks', 'Counselling Module', 'Report Cards'].includes(selectedSubMenu) && (
                    <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-xl space-y-3.5">
                      <GraduationCap className="w-10 h-10 text-slate-300 mx-auto" />
                      <div className="max-w-md mx-auto space-y-1">
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{selectedSubMenu} Module Simulator</h4>
                        <p className="text-[11px] text-slate-400 font-mono">This dashboard screen simulates the AcadOS database interface layout for school board integrations. Active database reads are populated under the branch codeHABR-01. Mock states configured correctly.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* SECTION B: OPS ENGINE */}
          {activeTab === 'Ops' && (
            <div className="space-y-6">
              <div className="flex border-b border-slate-200 pb-3 justify-between items-center">
                <div>
                  <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-widest font-mono">Operations & Employee Management</span>
                  <h2 className="text-xl font-serif text-slate-900">Academic operations Center ({selectedSubMenu})</h2>
                </div>
                <span className="bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-100 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">Ops Mode Active</span>
              </div>

              {selectedSubMenu === 'Staff Attendance' && (
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
                  <p className="text-xs text-slate-500">Track and filter daily biometric checks or smartphone entries for educators and non-teaching personnel.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {staff.map(member => (
                      <div key={member.id} className="p-4 bg-slate-50 border rounded-xl flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-extrabold text-slate-850">{member.name}</h4>
                          <span className="text-[10px] uppercase font-mono text-slate-40 block mt-1">{member.role} • {member.phone}</span>
                          <span className="text-[9px] text-slate-450 block mt-0.5">Biometric sync status: Verified ✓</span>
                        </div>

                        <div className="text-right">
                          <span className={`inline-block text-[9px] uppercase font-mono tracking-widest px-2.5 py-1 rounded border font-extrabold ${
                            member.attendanceToday === 'Present' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                            member.attendanceToday === 'Leave' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                            'bg-slate-100 text-slate-500 border-slate-200'
                          }`}>
                            {member.attendanceToday}
                          </span>
                          {member.checkInTime && (
                            <span className="block text-[9px] text-slate-400 font-mono mt-1">In: {member.checkInTime}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other fallback Ops routes rendering with high aesthetic polish */}
              {selectedSubMenu !== 'Staff Attendance' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3.5">
                  <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mx-auto border border-amber-100">
                    <CheckSquare className="w-6 h-6" />
                  </div>
                  <div className="max-w-md mx-auto space-y-1">
                    <h3 className="text-xs font-bold text-slate-850 uppercase tracking-widest">{selectedSubMenu} operations Portal</h3>
                    <p className="text-[11px] text-slate-400 font-mono leading-relaxed">This setup panel maps direct CRM assets, HR registers, performance scoring ratings, or GPS-logged teacher recruitment schedules to the active branch. Access controls secured.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECTION C: SETUP ENGINE */}
          {activeTab === 'Setup' && (
            <div className="space-y-6">
              <div className="flex border-b border-slate-200 pb-3 justify-between items-center">
                <div>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">System Config & Parameters</span>
                  <h2 className="text-xl font-serif text-slate-900">Institution Configuration Setup ({selectedSubMenu})</h2>
                </div>
                <span className="bg-slate-100 text-slate-650 text-[10px] font-bold border px-3 py-1 rounded font-mono">System Admin Level</span>
              </div>

              {selectedSubMenu === 'Branches Configuration' && (
                <div className="space-y-5">
                  <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
                    <p className="text-xs text-slate-500">Configure corporate branch hubs, geographical coordinates, physical hotline numbers, and master locations.</p>
                    <button className="px-3.5 py-1.5 bg-maroon-800 hover:bg-maroon-900 text-white rounded-lg text-[11px] font-bold">
                      + Add New Branch
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-2xl border-2 border-maroon-800 relative shadow-sm">
                      <div className="absolute top-4 right-4 bg-maroon-100 text-maroon-850 px-2 py-0.5 rounded text-[8px] font-mono tracking-widest uppercase font-extrabold border border-maroon-200 shadow-xs">
                        Default Hub
                      </div>

                      <div className="space-y-3.5">
                        <div className="flex items-center gap-2">
                          <Building className="w-5 h-5 text-maroon-800" />
                          <h4 className="text-sm font-bold text-slate-850">Vaishali Estate (HABR-01)</h4>
                        </div>

                        <div className="space-y-1.5 text-xs text-slate-600 font-mono">
                          <p>📍 <strong>Address:</strong> C-28, Vaishali Estate, Arcadia Greens Road, Gandhi Path Rd, Jaipur, Rajasthan, 302041</p>
                          <p>📞 <strong>Phone Hotline:</strong> +91 9257879555</p>
                          <p>✉️ <strong>Official Email ID:</strong> contact@hoduacademy.com</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 opacity-60 hover:opacity-100 transition-opacity">
                      <div className="space-y-3.5">
                        <div className="flex items-center gap-2">
                          <Building className="w-5 h-5 text-slate-400" />
                          <h4 className="text-sm font-bold text-slate-600">Malviya Nagar Hub (HAMN-02)</h4>
                        </div>

                        <div className="space-y-1.5 text-xs text-slate-500 font-mono">
                          <p>📍 <strong>Address:</strong> Sector 3, Malviya Nagar Main Commercial Block, Jaipur, Rajasthan</p>
                          <p>📞 <strong>Phone Hotline:</strong> +91 9549326982</p>
                          <p>✉️ <strong>Official Email ID:</strong> malviya@hoduacademy.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedSubMenu !== 'Branches Configuration' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3.5">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mx-auto border border-slate-200">
                    <Settings className="w-6 h-6" />
                  </div>
                  <div className="max-w-md mx-auto space-y-1">
                    <h3 className="text-xs font-bold text-slate-850 uppercase tracking-widest">{selectedSubMenu} Settings Table</h3>
                    <p className="text-[11px] text-slate-400 font-mono leading-relaxed">This configuration framework maps core SMS integration metrics, mail templates, classes, or fee payment structures to the central database. Modifiers enabled only for Super Admin permission folders.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECTION D: CRM ENGINE MATCHING PIPELINE STAGES & SALES FUNNEL */}
          {activeTab === 'CRM' && (
            <div className="space-y-6">
              {/* Top Title Bar */}
              <div className="flex border-b border-slate-200 pb-3 justify-between items-center">
                <div>
                  <span className="text-[10px] font-extrabold text-rose-500 uppercase tracking-widest font-mono">Enrollment Pipeline & Counselor Desk</span>
                  <h2 className="text-xl font-serif text-slate-900">Admissions CRM Funnel System ({selectedSubMenu})</h2>
                </div>
                <button 
                  onClick={() => setShowAddLeadModal(true)}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Capture New Lead
                </button>
              </div>

              {/* SUBTAB 4.1: CRM DASHBOARD */}
              {selectedSubMenu === 'CRM Dashboard' && (
                <div className="space-y-6">
                  {/* CRM KPIs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {[
                      { label: 'Total CRM Leads', value: leads.length, change: '+12% this week', icon: Users, color: 'text-rose-600' },
                      { label: 'Converted Admits', value: leads.filter(l => l.stage === 'Admission Confirmed').length, change: 'Highly qualified', icon: UserCheck, color: 'text-emerald-600' },
                      { label: 'New Lead Influx', value: leads.filter(l => l.stage === 'New Lead').length, change: 'Website & Walk-ins', icon: Sparkles, color: 'text-blue-600' },
                      { label: 'Avg Conversion %', value: `${Math.round((leads.filter(l => l.stage === 'Admission Confirmed').length / leads.length) * 100)}%`, change: 'Optimal funnel pace', icon: BarChart3, color: 'text-amber-600' },
                      { label: 'Reminders Due', value: '4', change: 'Call candidates', icon: Clock, color: 'text-purple-600' },
                    ].map((crmKpi, id) => (
                      <div key={id} className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between shadow-xs">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] uppercase font-mono font-extrabold text-slate-400">{crmKpi.label}</span>
                          <crmKpi.icon className={`w-4 h-4 ${crmKpi.color}`} />
                        </div>
                        <div className="mt-2 text-md sm:text-lg">
                          <strong className="text-slate-850 font-black tracking-tight block">{crmKpi.value}</strong>
                          <span className="text-[9px] text-slate-400 block font-semibold">{crmKpi.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sources pie chart block summary recreated elegantly */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                        📈 Enrollment Source Analytics
                      </h3>
                      
                      <div className="space-y-3.5">
                        {[
                          { source: 'Instagram Campaigns', count: 145, percentage: 40, barColor: 'bg-rose-500' },
                          { source: 'Google Ads Search', count: 110, percentage: 30, barColor: 'bg-indigo-500' },
                          { source: 'Walk-ins & Referrals', count: 90, percentage: 22, barColor: 'bg-emerald-500' },
                          { source: 'Facebook Lead Forms', count: 32, percentage: 8, barColor: 'bg-blue-500' },
                        ].map((src, id) => (
                          <div key={id} className="space-y-1">
                            <div className="flex justify-between font-mono text-[10px] font-bold text-slate-600">
                              <span>{src.source}</span>
                              <span>{src.count} enquiries ({src.percentage}%)</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className={`h-full ${src.barColor}`} style={{ width: `${src.percentage}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-805 uppercase tracking-wider mb-1">📞 Team Performance Metrics</h4>
                        <p className="text-[10px] text-slate-400">Calls logged & actual conversions mapped to counsellor names</p>
                      </div>

                      <div className="divide-y divide-slate-100">
                        {[
                          { name: 'Alok K. Mittal', role: 'Team Leader', conversions: '18 Admits', rate: '88% Conversion' },
                          { name: 'Meena Sharma', role: 'Senior Counsellor', conversions: '14 Admits', rate: '75% Conversion' },
                          { name: 'Sharma Ji', role: 'General Associate', conversions: '8 Admits', rate: '52% Conversion' },
                        ].map((couns, idx) => (
                          <div key={idx} className="py-2.5 flex justify-between items-center">
                            <div>
                              <span className="text-xs font-bold text-slate-800 block">{couns.name}</span>
                              <span className="text-[9px] uppercase font-mono text-slate-400 block">{couns.role}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-bold text-slate-700 block">{couns.conversions}</span>
                              <span className="text-[9px] font-mono text-emerald-600 font-extrabold">{couns.rate}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBTAB 4.2: LEADS INBOX */}
              {selectedSubMenu === 'Leads Inbox' && (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-205 flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input 
                        type="text" 
                        placeholder="Search leads by Candidate name, course stream or phone..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-205 rounded-lg outline-none"
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b bg-slate-50 text-[10px] tracking-wider uppercase text-slate-550">
                            <th className="p-3.5 font-black">Lead Details</th>
                            <th className="p-3.5 font-black">Course Target</th>
                            <th className="p-3.5 font-black">Source</th>
                            <th className="p-3.5 font-black">Counsellor</th>
                            <th className="p-3.5 font-black">Stage Status</th>
                            <th className="p-3.5 font-black text-right">Interactive Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leads.filter(l => l.name.toLowerCase().includes(searchQuery.toLowerCase())).map(lead => (
                            <tr key={lead.id} className="border-b hover:bg-rose-50/20 transition-colors">
                              <td className="p-3.5">
                                <div className="space-y-0.5">
                                  <strong className="text-sm text-slate-800 font-bold block">{lead.name}</strong>
                                  <span className="font-mono text-[10px] text-slate-400 block tracking-wider">{lead.leadId} • {lead.mobile}</span>
                                </div>
                              </td>
                              <td className="p-3.5 font-semibold text-slate-600">{lead.course}</td>
                              <td className="p-3.5">
                                <span className="bg-slate-100 text-slate-600 font-mono text-[9px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wide border border-slate-200">
                                  {lead.source}
                                </span>
                              </td>
                              <td className="p-3.5 font-medium text-slate-500">{lead.counsellor}</td>
                              <td className="p-3.5">
                                <select 
                                  value={lead.stage}
                                  onChange={(e) => handleUpdateLeadStage(lead.id, e.target.value as Lead['stage'])}
                                  className={`text-[10px] font-bold font-mono px-2 py-1.5 rounded-lg border focus:ring-1 focus:ring-rose-500 outline-none cursor-pointer ${
                                    lead.stage === 'Admission Confirmed' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                                    lead.stage === 'Demo Scheduled' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                                    lead.stage === 'Interested' ? 'bg-indigo-50 text-indigo-805 border-indigo-200' :
                                    lead.stage === 'Lost' ? 'bg-slate-100 text-slate-400 border-slate-200' :
                                    'bg-amber-50 text-amber-800 border-amber-200'
                                  }`}
                                >
                                  {funnelStages.map(stg => (
                                    <option key={stg} value={stg}>{stg}</option>
                                  ))}
                                </select>
                              </td>
                              <td className="p-3.5 text-right">
                                <div className="flex gap-1.5 justify-end">
                                  <button 
                                    onClick={() => alert(`Initiating direct outbound VoIP dialing log to candidate ${lead.name} at ${lead.mobile}...`)}
                                    className="px-2 py-1 rounded bg-slate-50 border border-slate-200 font-bold text-slate-600 text-[10px] hover:bg-slate-100 transition-all flex items-center gap-1"
                                    title="Simulate Call Dialing Log"
                                  >
                                    📞 Call
                                  </button>
                                  <button 
                                    onClick={() => logEvent('whatsapp', `Successfully sent automated WhatsApp prospectus links to candidate ${lead.name}`)}
                                    className="px-2 py-1 rounded bg-emerald-50 border border-emerald-200 font-bold text-emerald-700 text-[10px] hover:bg-emerald-100 transition-all flex items-center gap-1"
                                    title="Automated Follow up WhatsApp Template Prompt"
                                  >
                                    💬 WhatsApp
                                  </button>
                                  {lead.stage !== 'Admission Confirmed' && (
                                    <button 
                                      onClick={() => convertLeadToStudent(lead)}
                                      className="px-2.5 py-1 rounded bg-rose-600 font-extrabold text-white text-[10px] hover:bg-rose-700 transition-all flex items-center gap-1"
                                      title="Convert and Allocate permanent Academic ID Roll"
                                    >
                                      ✓ Convert
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBTAB 4.3: PIPELINE STAGES KANBAN BOARD VIEW */}
              {selectedSubMenu === 'Pipeline Stages' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500">Drag or map inquiries through your academy stages to lock down conversions.</p>
                  
                  {/* Kanban columns Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-auto pb-4">
                    {[
                      { status: 'New Lead', title: 'New Enquiries', bg: 'bg-blue-50 border-blue-150' },
                      { status: 'Interested', title: 'Nurturing & Trial', bg: 'bg-amber-50 border-amber-150' },
                      { status: 'Demo Scheduled', title: 'Demo Slot Trial', bg: 'bg-purple-50 border-purple-150' },
                      { status: 'Admission Confirmed', title: 'Enrollments!', bg: 'bg-emerald-50 border-emerald-150' },
                    ].map((col, idx) => {
                      const colLeads = leads.filter(l => l.stage === col.status);
                      return (
                        <div key={idx} className={`p-4 rounded-2xl border min-w-[200px] ${col.bg} flex flex-col space-y-3`}>
                          <div className="flex justify-between items-center border-b pb-2 mb-1">
                            <span className="text-[10px] uppercase font-black text-slate-600 tracking-wider block font-sans">{col.title}</span>
                            <span className="bg-white/80 border text-[9px] px-1.5 py-0.2 rounded-lg font-mono font-bold text-slate-500">
                              {colLeads.length}
                            </span>
                          </div>

                          <div className="space-y-2.5 flex-1 overflow-y-auto">
                            {colLeads.map(lead => (
                              <div key={lead.id} className="bg-white p-3.5 rounded-xl border border-slate-205 shadow-2xs space-y-2">
                                <div className="space-y-0.5">
                                  <h4 className="text-xs font-bold text-slate-850 block">{lead.name}</h4>
                                  <span className="text-[9px] text-slate-400 block font-mono">ID: {lead.leadId}</span>
                                </div>
                                <p className="text-[10px] text-slate-500 font-mono leading-relaxed truncate">{lead.course}</p>
                                
                                <div className="flex justify-between pt-1 border-t items-center gap-2">
                                  <span className="text-[9px] text-slate-405 font-mono">Source: {lead.source}</span>
                                  {col.status !== 'Admission Confirmed' && (
                                    <button 
                                      onClick={() => convertLeadToStudent(lead)}
                                      className="text-[9px] font-black text-rose-600 hover:underline"
                                    >
                                      Admit✓
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Dynamic fallbacks for database tools / bulk whatsapp panels */}
              {!['CRM Dashboard', 'Leads Inbox', 'Pipeline Stages'].includes(selectedSubMenu) && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-4">
                  <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-600 mx-auto border border-rose-100">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div className="max-w-md mx-auto space-y-1.5">
                    <h3 className="text-xs font-bold text-slate-850 uppercase tracking-widest">{selectedSubMenu} Module Suite</h3>
                    <p className="text-[11px] text-slate-400 font-mono leading-relaxed">This active CRM database interface lets you import spreadsheets, configure automated bulk WhatsApp follow-up templates, set round-robin distribution structures, or trace recruitment candidate checklists.</p>
                  </div>
                </div>
              )}
            </div>
          )}
          </div>{/* end p-4 sm:p-6 wrapper */}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. LIGHTBOX DIALOG WINDOWS FOR RECORD CREATIONS */}
      {/* ======================================================== */}
      
      {/* DIALOG 1: ADD STUDENT MODAL FORM */}
      <AnimatePresence>
        {showAddStudentModal && (
          <div className="fixed inset-0 z-[999] bg-slate-900/60 flex items-center justify-center p-4 backdrop-blur-xs">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl w-full max-w-xl flex flex-col max-h-[90vh]"
            >
              <div className="bg-slate-50 px-6 py-4 border-b flex justify-between items-center flex-shrink-0">
                <div>
                  <h3 className="font-serif text-slate-900 text-base font-bold">Add Student to National Registry</h3>
                  <p className="text-[10px] text-slate-400">Installs academic dossier, parent contact alerts, and target program map details</p>
                </div>
                <button 
                  onClick={() => setShowAddStudentModal(false)}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateStudent} className="p-6 overflow-y-auto space-y-4 text-xs">
                {/* Personal Information */}
                <div className="space-y-3">
                  <span className="text-[10px] font-extrabold text-maroon-800 uppercase tracking-widest block border-b pb-1">1. Personal Details</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Full Student Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Rajesh Kumar" 
                        value={newStudent.fullName}
                        onChange={(e) => setNewStudent({ ...newStudent, fullName: e.target.value })}
                        className="w-full bg-slate-50 border p-2 rounded-lg outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Gender Stream</label>
                      <select 
                        value={newStudent.gender}
                        onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
                        className="w-full bg-slate-50 border p-2 rounded-lg outline-none"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Parent Information */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-extrabold text-maroon-800 uppercase tracking-widest block border-b pb-1">2. Parent & Contact Details</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Father Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Anand Kumar" 
                        value={newStudent.fatherName}
                        onChange={(e) => setNewStudent({ ...newStudent, fatherName: e.target.value })}
                        className="w-full bg-slate-50 border p-2 rounded-lg outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">WhatsApp Cell *</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="e.g. +91 9257879555" 
                        value={newStudent.mobile}
                        onChange={(e) => setNewStudent({ ...newStudent, mobile: e.target.value })}
                        className="w-full bg-slate-50 border p-2 rounded-lg outline-none" 
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-extrabold text-maroon-800 uppercase tracking-widest block border-b pb-1">3. Academic Placement</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Placement Class</label>
                      <select 
                        value={newStudent.studentClass}
                        onChange={(e) => setNewStudent({ ...newStudent, studentClass: e.target.value })}
                        className="w-full bg-slate-50 border p-2 rounded-lg outline-none"
                      >
                        <option>Class 12</option>
                        <option>Class 11</option>
                        <option>Class 10</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Batch Assignment</label>
                      <select 
                        value={newStudent.batch}
                        onChange={(e) => setNewStudent({ ...newStudent, batch: e.target.value })}
                        className="w-full bg-slate-50 border p-2 rounded-lg outline-none"
                      >
                        <option>A1 - Prime</option>
                        <option>B2 - Advanced</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 bg-slate-50 p-4 border-t flex justify-end gap-2 text-xs">
                  <button 
                    type="button" 
                    onClick={() => setShowAddStudentModal(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-slate-100 font-bold text-slate-500"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2 bg-maroon-800 hover:bg-maroon-900 text-white font-bold rounded-lg"
                  >
                    Register Student ID✓
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DIALOG 2: ADD LEAD MODAL FORM */}
      <AnimatePresence>
        {showAddLeadModal && (
          <div className="fixed inset-0 z-[999] bg-slate-900/60 flex items-center justify-center p-4 backdrop-blur-xs">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]"
            >
              <div className="bg-slate-50 px-6 py-4 border-b flex justify-between items-center flex-shrink-0">
                <div>
                  <h3 className="font-serif text-slate-900 text-base font-bold text-rose-705">Capture Admissions Lead Prospect</h3>
                  <p className="text-[10px] text-slate-400 font-sans">Pins candidate to sales pipeline stages for direct counselor outreach</p>
                </div>
                <button 
                  onClick={() => setShowAddLeadModal(false)}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateLead} className="p-6 overflow-y-auto space-y-4 text-xs">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Candidate Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Sonal Mathur" 
                        value={newLead.name}
                        onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                        className="w-full bg-slate-50 border p-2 rounded-lg outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Contact Mobile *</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="e.g. +91 9549326982" 
                        value={newLead.mobile}
                        onChange={(e) => setNewLead({ ...newLead, mobile: e.target.value })}
                        className="w-full bg-slate-50 border p-2 rounded-lg outline-none" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Enquiry Course Target</label>
                      <select 
                        value={newLead.course}
                        onChange={(e) => setNewLead({ ...newLead, course: e.target.value })}
                        className="w-full bg-slate-50 border p-2 rounded-lg outline-none"
                      >
                        <option>JEE Mains & Advanced Prep</option>
                        <option>NEET Foundation Pro</option>
                        <option>Class 10 Board Excellence</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Lead Source Option</label>
                      <select 
                        value={newLead.source}
                        onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
                        className="w-full bg-slate-50 border p-2 rounded-lg outline-none"
                      >
                        <option>Website</option>
                        <option>Facebook Ads</option>
                        <option>Instagram</option>
                        <option>Walk-in</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Initial remarks / Counselor Logs</label>
                    <textarea 
                      placeholder="e.g. Wants trial lectures brochure. Contacted via call." 
                      value={newLead.remarks}
                      onChange={(e) => setNewLead({ ...newLead, remarks: e.target.value })}
                      className="w-full bg-slate-50 border p-2 rounded-lg outline-none h-20 resize-none"
                    />
                  </div>
                </div>

                <div className="flex-shrink-0 bg-slate-50 p-4 border-t flex justify-end gap-2 text-xs">
                  <button 
                    type="button" 
                    onClick={() => setShowAddLeadModal(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-slate-100 font-bold text-slate-500"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg"
                  >
                    Log Lead Prospect✓
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
