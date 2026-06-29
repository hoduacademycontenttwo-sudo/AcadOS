import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, RotateCcw } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

/* ══════════════════════════════════════════════════════
   ACADOS COMPLETE KNOWLEDGE BASE
   Every topic → keywords (for scoring) + full answer
   ══════════════════════════════════════════════════════ */
interface KBEntry { keywords: string[]; answer: string; }

const KNOWLEDGE: KBEntry[] = [
  // ── OVERVIEW ──
  {
    keywords: ['what','acados','about','overview','explain','tell','introduce','platform','product','system','software'],
    answer: `**AcadOS** (Academic Operating System) is India's most complete white-label ed-tech platform built by **Hoducation Technologies Pvt. Ltd.** for schools and coaching institutes.\n\n🎯 **What it does:** Combines 5 powerful modules — content library, paper generation, online exams, OMR grading, and institute ERP — all under **your brand and domain**.\n\n🏆 **Who it's for:** K-12 schools, JEE/NEET coaching, State Board institutes, Government exam coaching centres\n\n📊 **Key stats:**\n• 5 Lakh+ questions mapped\n• 15+ boards & exams covered\n• Classes 1–12 + competitive exams\n• 100% white-labelled\n• Works on ₹5,000 Android phones\n\n📞 **Get started:** +91 9660034117 | www.acados.app`,
  },
  // ── WHY / VALUE ──
  {
    keywords: ['why','worth','benefit','advantage','reason','good','useful','helpful','value','recommend','should','use','better','best'],
    answer: `**Why 100+ institutes trust AcadOS:**\n\n✅ **Your brand, not ours** — White-label on your own domain. Students never see "AcadOS"\n✅ **All-in-one** — No juggling 5 tools. Content + Tests + CBT + OMR + ERP in one login\n✅ **Saves 10+ hours/week** — Auto-generate papers, grade OMR, automate admissions\n✅ **India-first content** — 5 Lakh+ questions for CBSE, NEET, JEE, 15 State Boards\n✅ **Works anywhere** — 2G connections, ₹5,000 phones, rural institutes\n✅ **30–40% better retention** — Structured tests + analytics keep students engaged\n✅ **Fast setup** — Live in 1 week. No IT team needed\n✅ **Affordable** — Often cheaper than one part-time staff member\n\n📞 **Book a free demo:** +91 9660034117`,
  },
  // ── MODULES LIST ──
  {
    keywords: ['module','feature','list','all','five','five modules','capabilities','what can','include','has'],
    answer: `AcadOS has **5 integrated modules**:\n\n📚 **1. Learners Hub** — Digital content library (5 Lakh+ questions, worksheets, notes)\n📝 **2. TestMaker** — AI paper generator with answer keys in 10 minutes\n💻 **3. Practice CBT** — Online mock exam platform (JEE/NEET/CUET interface)\n📷 **4. OMR Evaluation** — Scan 100 answer sheets in 5 mins with a smartphone\n🏫 **5. ERP + Lead CRM** — Complete institute management (admissions, fees, CRM)\n\nAll modules run **under your brand** on your domain. You choose which to activate.\n\n📞 Demo: +91 9660034117`,
  },
  // ── LEARNERS HUB ──
  {
    keywords: ['learners','hub','content','library','digital','question','worksheet','note','chapter','study','material','resource','book','pdf'],
    answer: `**Learners Hub** — AcadOS Digital Content Library\n\n📚 **5 Lakh+ questions** organised by board, class, subject & chapter\n\n**Boards covered:**\n• CBSE, ICSE, IGCSE\n• MP, UP, Rajasthan, Maharashtra, Karnataka & 10+ State Boards\n\n**Exams covered:**\n• JEE Main & Advanced, NEET UG, CUET\n• UPSC CSE, SSC CGL/CHSL, Banking (IBPS/SBI)\n• NDA, CLAT, CAT, GATE\n\n**What's inside:**\n• Chapter-wise notes & concept summaries\n• Difficulty-sorted practice sets (Easy/Medium/Hard)\n• Printable PDF worksheets with answer keys\n• Past year question papers (PYQP)\n• Formula sheets & quick revision notes\n• SmartBoard-ready modules for classroom projection\n\n**Classes:** 1 to 12 + Dropper batches\n\nAll content carries **your institute's branding** on PDFs.`,
  },
  // ── TESTMAKER ──
  {
    keywords: ['testmaker','test maker','paper','generate','generator','question paper','exam paper','create test','make test','print','set paper','paper setting'],
    answer: `**TestMaker** — AI-Powered Paper Generator\n\n⏱️ **Generate a complete exam paper in under 10 minutes:**\n\n**How it works:**\n1. Select Board → Class → Subject → Chapter(s)\n2. Set difficulty ratio (Easy / Medium / Hard)\n3. Choose number of questions & marks per question\n4. Hit Generate → Instant paper + answer key\n\n**Output formats:**\n• PDF ready to print\n• OMR-compatible bubble sheet format\n• Section-wise (Physics/Chem/Math for JEE style)\n• Custom header: your institute name, logo, date, roll number field\n\n**Advanced features:**\n• Mix chapters for unit tests or half-yearly exams\n• Shuffle questions (auto-generates Set A / Set B)\n• Add custom questions manually alongside AI-generated ones\n• Include passage-based & case-study questions\n• Save paper templates for reuse\n\n**Time saved:** Teachers report saving 2–3 hours per paper.`,
  },
  // ── CBT ──
  {
    keywords: ['cbt','computer','based','test','online','mock','exam','nta','jee','neet','cuet','interface','lockdown','timer','rank','percentile','score','attempt'],
    answer: `**Practice CBT** — Computer-Based Test Platform\n\n💻 **Replicates the exact JEE/NEET/CUET exam interface** so students feel zero nervousness on the real exam day.\n\n**Exam interfaces available:**\n• JEE Main (NTA-style)\n• NEET UG (NTA-style)\n• CUET UG & PG\n• UPSC CSAT / Prelims\n• Custom (for institute's own tests)\n\n**Features:**\n• Full-screen lockdown mode\n• Section-wise navigation with individual timers\n• Mark for Review, Clear Response, Question Palette\n• Negative marking support\n• Multi-language (Hindi + English)\n• Image-based & passage-based questions\n• Auto-submit when time ends\n\n**After the test:**\n• Instant score & correct answers\n• Percentile rank vs national pool\n• Topic-wise performance breakdown\n• Time spent per question analysis\n• Attempted vs correct vs wrong report\n• WhatsApp result card to parents\n\n**Devices:** Works on phones, tablets, PCs — any browser.`,
  },
  // ── OMR ──
  {
    keywords: ['omr','scan','scanning','answer sheet','bubble','optical','mark','recognition','smartphone','camera','grade','grading','evaluate','check','result'],
    answer: `**OMR Evaluation** — Smartphone-Based Answer Sheet Grading\n\n📷 **Grade 100 answer sheets in under 5 minutes. No hardware needed.**\n\n**How it works:**\n1. Students fill OMR bubble sheets (A/B/C/D)\n2. Teacher opens AcadOS on any Android phone\n3. Photographs the sheet → AI reads bubbles instantly\n4. Results appear within 2–3 seconds per sheet\n5. Class report auto-generated\n\n**Sheet formats supported:**\n• 30, 60, 90, 120, 150, 200 question formats\n• Custom formats (configurable)\n• Single & double-sided sheets\n\n**Output:**\n• Individual score for each student\n• Class average & topper list\n• Question-wise correct/wrong analysis\n• Excel & PDF report download\n• WhatsApp result dispatch to parents\n• Rank list generation\n\n**Works on:** Android 8+ phones (even ₹5,000 devices)\n**Accuracy:** 99.7%+ in normal lighting\n**Hardware needed:** None — just a smartphone camera`,
  },
  // ── ERP ──
  {
    keywords: ['erp','crm','management','admin','administration','admission','fee','collect','attendance','payroll','salary','batch','schedule','timetable','staff','faculty','lead','enquiry','enrol'],
    answer: `**ERP + Lead CRM** — Complete Institute Management\n\n🏫 **ERP Module (Operations):**\n• Student admissions with document upload\n• Fee collection — cash, online, EMI plans\n• Fee reminder automation via WhatsApp & SMS\n• Attendance marking (teacher app — one tap)\n• Batch & timetable scheduling\n• Faculty payroll & leave management\n• Exam schedule & result management\n• Certificate & ID card generation\n• Parent app access to child's data\n\n📈 **CRM Module (Leads & Sales):**\n• Capture enquiries from website, phone, walk-in\n• Lead pipeline: New → Contacted → Demo → Enrolled\n• Follow-up reminders & task assignments\n• WhatsApp drip campaigns to unconverted leads\n• Conversion rate analytics\n• Source tracking (which ad/channel brings most leads)\n• Staff-wise lead performance dashboard\n\n**Result:** Institutes report 40% fewer lead leakages and 3x faster admission processing.`,
  },
  // ── WHITE LABEL ──
  {
    keywords: ['white','label','brand','branding','domain','custom','logo','own','identity','resell','rebrand','portal'],
    answer: `**AcadOS is 100% White-Labelled**\n\nThis means:\n\n🏷️ **Your domain** — e.g. \`app.stxaviers.com\` or \`portal.akashcoaching.in\`\n🏷️ **Your logo** — appears everywhere students see the app\n🏷️ **Your institute name** — on every page, PDF, result card, email\n🏷️ **No AcadOS branding** — students never know what platform powers it\n🏷️ **Your colours** — UI themed to match your institute palette\n\n**Mobile app (PWA):**\n• Students can "install" it like a native app from their browser\n• App icon is your logo on their phone homescreen\n• No Google Play / App Store submission needed\n\n**Why this matters:**\n• Students build loyalty to YOUR brand\n• You control the relationship\n• Competitors can't tell which platform you use\n• Feels like you built a crore-rupee tech product`,
  },
  // ── PRICING ──
  {
    keywords: ['price','pricing','cost','fee','charge','plan','how much','afford','budget','rate','cheap','expensive','subscription','pay','rupee','per student'],
    answer: `**AcadOS Pricing**\n\nPricing is **custom per institution** — no one-size-fits-all plans.\n\n**Factors that affect pricing:**\n• Number of active students\n• Which modules you need (pick any combination)\n• Contract duration (monthly / annual / multi-year)\n• Support level required\n\n**Typical range:**\n• Small centres (50–200 students) — Very affordable, often ₹X per student/month\n• Mid institutes (200–2000 students) — Volume discounts apply\n• Large chains / franchises — Custom enterprise pricing\n\n**What's always included:**\n• All 5 modules (no feature gating by tier)\n• White-label setup on your domain\n• Staff training & onboarding\n• Ongoing support\n• Content updates every academic year\n\n📞 **Get your custom quote:** +91 9660034117\n📧 hoduacademycontenttwo@gmail.com\n\n*Most institutes find it costs less than one part-time staff member's salary.*`,
  },
  // ── DEMO ──
  {
    keywords: ['demo','trial','free','try','test','register','start','book','schedule','get started','sign up','onboard'],
    answer: `**Book a Free AcadOS Demo**\n\n**What happens in a demo:**\n✅ 30–45 minute live walkthrough of all 5 modules\n✅ See it running with real content from your board/class\n✅ Get pricing tailored to your institute size\n✅ Ask any questions to our product expert\n✅ No pressure, no commitment\n\n**How to book:**\n1. Click **"Schedule Demo Slot"** at the top of this page, OR\n2. Call **+91 9660034117** directly, OR\n3. WhatsApp us at +91 9660034117\n\n**Response time:** Within 24 hours (usually within 2–3 hours)\n\n📧 hoduacademycontenttwo@gmail.com\n🌐 www.acados.app | www.acados.co`,
  },
  // ── SETUP / ONBOARDING ──
  {
    keywords: ['setup','install','onboard','implement','deploy','configure','integrate','start','launch','how long','time','week','day','technical'],
    answer: `**AcadOS Setup Timeline**\n\n⏱️ Most institutes are **fully live in 5–7 days:**\n\n**Day 1:** Domain & SSL configuration (we handle it)\n**Day 2:** Branding — logo, colours, institute name applied\n**Day 3:** Data import — student list, batch structure, staff accounts\n**Day 4:** Staff training session (2–3 hours, online video call)\n**Day 5:** Soft launch — first test run with a small batch\n**Day 6–7:** Go live with all students\n\n**No technical skills needed from your side.**\nOur team handles everything. You just provide:\n• Your domain name (or we help you buy one)\n• Your logo file\n• Student/staff data (Excel sheet)\n\n**Ongoing support:** Dedicated support team, WhatsApp support, video call help`,
  },
  // ── BOARDS & EXAMS ──
  {
    keywords: ['board','cbse','icse','state','jee','neet','upsc','ssc','banking','cuet','olympiad','foundation','class','standard','grade','syllabus','curriculum'],
    answer: `**AcadOS Content Coverage**\n\n**School Boards (Classes 1–12):**\n• CBSE (All subjects, all classes)\n• ICSE / ISC\n• IGCSE (Cambridge)\n• Rajasthan Board (RBSE)\n• UP Board\n• MP Board\n• Maharashtra Board (SSC/HSC)\n• Karnataka Board (SSLC/PUC)\n• Bihar Board\n• Gujarat Board\n• And 6+ more State Boards\n\n**Competitive Exams:**\n• JEE Main & JEE Advanced\n• NEET UG & NEET PG\n• CUET UG & PG\n• UPSC CSE Prelims & Mains\n• SSC CGL, CHSL, MTS, CPO\n• Banking: IBPS PO/Clerk, SBI PO/Clerk, RBI\n• NDA, CLAT, MAT, CAT\n• Olympiads (Math, Science, English)\n\n**Content updated** every academic year as syllabi change.`,
  },
  // ── WHO USES IT ──
  {
    keywords: ['who','target','audience','customer','use','school','coaching','institute','centre','academy','college','tuition','batch','users'],
    answer: `**Who Uses AcadOS**\n\n🏫 **K-12 Schools**\n• CBSE/ICSE/State Board schools (200+ students)\n• Need: OMR tests, parent reports, ERP\n\n🎯 **JEE/NEET Coaching Institutes**\n• Foundation to advanced level\n• Need: CBT mocks, TestMaker, rank tracking\n\n📖 **State Board Coaching Centres**\n• Class 9–12 board prep\n• Need: Content library, paper generation\n\n🏛️ **Government Exam Coaching**\n• UPSC, SSC, Banking prep academies\n• Need: Practice sets, CBT mock tests\n\n🧒 **Foundation Institutes (Class 6–10)**\n• Olympiad & scholarship prep\n• Need: Content + assessment tools\n\n🌍 **Franchise & Chain Institutes**\n• Multi-branch management\n• Need: Centralised ERP + white-label\n\n📍 **Currently active** across Rajasthan, UP, MP, Maharashtra, Gujarat & Delhi NCR`,
  },
  // ── MOBILE / DEVICE ──
  {
    keywords: ['mobile','app','android','ios','iphone','phone','tablet','device','pwa','download','install','offline'],
    answer: `**AcadOS on Mobile Devices**\n\n📱 **Works as a PWA (Progressive Web App):**\n• No App Store or Play Store download needed\n• Students open the browser, visit your portal URL, tap "Add to Home Screen"\n• Appears as a native app icon with YOUR logo\n• Works on Android 8+ and iOS 13+\n\n**What students can do on mobile:**\n• Browse content library & download PDFs\n• Attempt CBT mock tests (full-screen)\n• View results & analytics\n• Get WhatsApp notifications\n• Access timetable & schedule\n\n**What teachers can do on mobile:**\n• Scan OMR sheets with camera\n• Mark attendance in one tap\n• View batch performance\n• Send WhatsApp announcements\n\n**Minimum phone requirement:** Android 8+, any browser (Chrome recommended)\n**Data usage:** Light — works well on 2G/3G\n**Offline:** PDFs can be downloaded; content accessible offline after first load`,
  },
  // ── SECURITY ──
  {
    keywords: ['security','safe','data','privacy','protect','secure','hack','breach','gdpr','trust','confidential','encrypt'],
    answer: `**AcadOS Data Security**\n\n🔒 **Encryption:** All data encrypted in transit (HTTPS/TLS 1.3) and at rest (AES-256)\n🔒 **Indian servers:** Data stored on Indian cloud infrastructure (data sovereignty)\n🔒 **Role-based access:** Teachers see only their batches; admins see all; students see only their own data\n🔒 **No third-party data sharing:** Student data is never sold or shared with advertisers\n🔒 **Regular backups:** Automated daily backups with 30-day retention\n🔒 **Session security:** Auto-logout, 2FA for admin accounts\n🔒 **Audit logs:** All admin actions are logged with timestamps\n\n**DPDP Compliance:** Built in alignment with India's Digital Personal Data Protection Act 2023`,
  },
  // ── ANALYTICS ──
  {
    keywords: ['analytics','report','performance','result','progress','track','dashboard','insight','data','statistic','score','rank','analysis'],
    answer: `**AcadOS Analytics & Reporting**\n\n📊 **Student-level analytics:**\n• Subject-wise & chapter-wise scores\n• Weak topic identification\n• Time management per question\n• Improvement trend over time\n• Rank within batch and across institute\n\n📊 **Batch-level analytics:**\n• Class average & distribution\n• Topper list & bottom performers\n• Question-wise difficulty analysis\n• Attendance correlation with scores\n\n📊 **Institute-level dashboard:**\n• Overall pass rates\n• Module usage & engagement\n• Enrolment & revenue tracking\n• Faculty performance metrics\n\n📊 **Parent reports:**\n• Auto-generated PDF report cards\n• Sent via WhatsApp after every test\n• Monthly progress summary\n\n**Export formats:** PDF, Excel (.xlsx), CSV`,
  },
  // ── SUPPORT ──
  {
    keywords: ['support','help','issue','problem','bug','error','contact','team','service','call','email','whatsapp','response','fix'],
    answer: `**AcadOS Support**\n\n📞 **Phone/WhatsApp:** +91 9660034117 (Mon–Sat, 9 AM – 7 PM IST)\n📧 **Email:** hoduacademycontenttwo@gmail.com\n🌐 **Portal:** www.acados.app | www.acados.co\n\n**Support channels:**\n• WhatsApp support (fastest response)\n• Video call support (scheduled)\n• Email support\n• In-app help documentation\n\n**Response times:**\n• WhatsApp: Within 2–4 hours\n• Email: Within 24 hours\n• Critical issues: Same-day resolution\n\n**Onboarding support:** Dedicated onboarding manager for first 30 days\n**Training:** Online video call training for all staff included in setup\n**Updates:** Automatic — no manual updates needed`,
  },
  // ── NOTIFICATIONS ──
  {
    keywords: ['notification','whatsapp','sms','alert','message','parent','communicate','inform','send','broadcast','announce'],
    answer: `**AcadOS Communication & Notifications**\n\n💬 **WhatsApp Automation:**\n• Result cards sent to parents after every test\n• Fee reminders with payment link\n• Attendance alerts (if student absent)\n• Exam schedule reminders\n• Batch announcements\n• Enquiry follow-up sequences (CRM)\n\n📱 **SMS fallback** when WhatsApp unavailable\n\n📧 **Email notifications** for fee receipts, exam schedules\n\n**Bulk broadcast:**\n• Send to entire institute or specific batch\n• Schedule announcements in advance\n• Track delivery & read status\n\n**No additional cost** for standard WhatsApp notifications (within plan limits)`,
  },
  // ── COMPARISON ──
  {
    keywords: ['compare','vs','versus','difference','other','competitor','alternative','better','platform','classplus','physicswallah','extramarks','teachmint','lms'],
    answer: `**AcadOS vs Other Platforms**\n\n| Feature | AcadOS | Others |\n|---|---|---|\n| White-label | ✅ Full | ❌ Their branding |\n| OMR via phone | ✅ No hardware | ❌ Machine needed |\n| India board content | ✅ 15+ boards | ⚠️ Limited |\n| ERP + CRM built-in | ✅ Yes | ❌ Separate tool |\n| Offline PDF access | ✅ Yes | ❌ No |\n| Custom domain | ✅ Yes | ❌ No |\n| All-in-one login | ✅ Yes | ❌ Multiple tools |\n| 1-week setup | ✅ Yes | ❌ Weeks/months |\n\n**Key differentiator:** AcadOS is the **only platform** that combines white-label branding + smartphone OMR + full ERP + content library in one affordable package built specifically for Indian institutes.\n\n📞 Compare live: +91 9660034117`,
  },
  // ── COMPANY ──
  {
    keywords: ['company','hoducation','who made','founder','team','built','created','developed','hodu','history','about us','background'],
    answer: `**About Hoducation Technologies Pvt. Ltd.**\n\n🏢 AcadOS is built by **Hoducation Technologies Pvt. Ltd.**, an Indian ed-tech company dedicated to empowering coaching institutes and schools with enterprise-grade technology at accessible prices.\n\n**Mission:** Make world-class academic tools available to every Indian institute — not just the top-tier ones.\n\n**Focus:** India-specific solutions built for Indian boards, Indian languages, Indian connectivity realities, and Indian institute workflows.\n\n**Presence:** Active across Rajasthan, Uttar Pradesh, Madhya Pradesh, Maharashtra, Gujarat & Delhi NCR.\n\n📞 +91 9660034117\n📧 hoduacademycontenttwo@gmail.com\n🌐 www.acados.app | www.acados.co`,
  },
  // ── LANGUAGE ──
  {
    keywords: ['language','hindi','english','regional','medium','vernacular','bilingual','translate'],
    answer: `**Language Support in AcadOS**\n\n🗣️ **Interface:** Available in English & Hindi\n🗣️ **Content:** English, Hindi, and select regional languages\n🗣️ **Question papers:** Generate in English or Hindi\n🗣️ **Regional boards:** Content follows the board's medium of instruction\n🗣️ **CBT exams:** Bilingual (Hindi + English) like actual NTA exams\n🗣️ **WhatsApp notifications:** Can be sent in Hindi or English\n\nPerfect for Hindi-medium coaching institutes, State Board schools, and bilingual institutions.`,
  },
  // ── OFFLINE ──
  {
    keywords: ['offline','internet','bandwidth','slow','network','rural','village','2g','3g','connection','speed','data'],
    answer: `**AcadOS Works in Low-Connectivity Areas**\n\n📶 **Designed for real India:**\n• Works on 2G/3G connections for core features\n• PDFs download once → accessible offline forever\n• CBT exams can be hosted on local LAN (no internet needed)\n• OMR scanning works offline — syncs when connected\n• Teacher attendance app works offline\n\n**Minimum internet speed:** 512 Kbps for basic use\n**Data usage:** Optimised — light on data vs video-heavy platforms\n**Devices:** Works on ₹5,000 Android phones (Android 8+)\n\nPerfect for **Tier-2, Tier-3 cities and rural institutes** where internet is patchy.`,
  },
  // ── GREETINGS ──
  {
    keywords: ['hi','hello','hey','hii','helo','namaste','good morning','good evening','good afternoon','howdy','sup','yo'],
    answer: `Hello! 👋 I'm **Acad**, your AcadOS assistant!\n\nI can answer anything about AcadOS — features, pricing, setup, specific modules, or how it can help your institute.\n\n**Quick topics:**\n• 📚 Learners Hub & Content Library\n• 📝 TestMaker & Paper Generation\n• 💻 CBT Mock Exam Platform\n• 📷 OMR Evaluation\n• 🏫 ERP + Lead CRM\n• 💰 Pricing & Plans\n• 🚀 Getting Started\n\nWhat would you like to know?`,
  },
  // ── THANKS ──
  {
    keywords: ['thank','thanks','shukriya','dhanyavad','great','awesome','nice','perfect','excellent','good bot','helpful','amazing','superb','wonderful'],
    answer: `You're most welcome! 😊\n\nIf you'd like to explore AcadOS for your institute:\n📞 **Call:** +91 9660034117\n📅 **Book a free demo** — click "Schedule Demo Slot" at the top\n📧 **Email:** hoduacademycontenttwo@gmail.com\n\nIs there anything else I can help you with?`,
  },
];

/* ── Smart KB engine: score-based intent matching ── */
const STOPWORDS = new Set(['is','it','the','a','an','in','on','at','to','for','of','and','or','but','with','this','that','can','do','does','how','what','when','where','who','will','be','are','was','were','i','me','my','we','our','you','your']);

function generalReply(text: string): string {
  const q = text.toLowerCase();

  // Greetings
  if (/^(hi|hello|hey|hii|helo|namaste|sup|yo|howdy|good\s*(morning|evening|afternoon|night))\b/.test(q))
    return "Hey! 👋 I'm **Acad**, your AI assistant. I can answer questions about **AcadOS** as well as general topics — math, science, history, study tips, anything! What's on your mind?";

  // How are you
  if (/how are you|how r u|kaise ho|how's it going|how do you do/.test(q))
    return "I'm doing great, thanks for asking! 😊 I'm here and ready to help. What would you like to know?";

  // Who are you / what can you do
  if (/who are you|what are you|your name|introduce yourself|what can you do|capabilities/.test(q))
    return "I'm **Acad** 🤖 — the AI assistant for AcadOS. I can:\n• Answer **any question** about AcadOS (modules, pricing, setup, etc.)\n• Help with **general knowledge** — science, math, history, GK\n• Give **study tips** and exam strategies\n• Answer **everyday questions**\n\nJust ask me anything!";

  // Math
  if (/what is \d+[\s\+\-\*\/x]\d+|calculate|solve|equation|formula|algebra|geometry|trigonometry|calculus|differentiat|integrat|probability|statistics|matrix/.test(q)) {
    try {
      const expr = text.match(/[\d\s\+\-\*\/\(\)\.]+/)?.[0]?.trim();
      if (expr && /[\+\-\*\/]/.test(expr)) {
        // eslint-disable-next-line no-eval
        const result = Function(`"use strict"; return (${expr})`)();
        if (!isNaN(result)) return `The answer is **${result}** 🧮\n\nNeed help with more math or want to understand the concept? Just ask!`;
      }
    } catch { /* fall through */ }
    return "Happy to help with math! Could you write out the full equation or problem? For example: \"What is 15% of 250?\" or \"Solve x² - 5x + 6 = 0\" and I'll work through it with you. 🧮";
  }

  // Percentage
  if (/(\d+)\s*%\s*of\s*(\d+)/.test(q)) {
    const m = q.match(/(\d+)\s*%\s*of\s*(\d+)/);
    if (m) { const r = (parseFloat(m[1]) / 100) * parseFloat(m[2]); return `**${m[1]}% of ${m[2]} = ${r}** 🎯`; }
  }

  // JEE / NEET / competitive exam tips
  if (/jee|neet|cuet|upsc|ssc|bank.*exam|competitive exam|crack.*exam|study.*strategy|rank|percentile/.test(q))
    return "Great topic! Here are top tips for competitive exams:\n\n📚 **Study strategy:**\n• Stick to **NCERT first** for NEET/JEE — 80% of questions come from it\n• Solve **10+ years of PYQPs** — pattern is everything\n• One subject per day deep-focus, not all three shallow\n\n⏱️ **Time management:**\n• Attempt easiest section first in CBT exams\n• Never spend >2 min on one question — skip & return\n• Mock tests weekly — track weak chapters\n\n🧠 **Retention:**\n• Revise every 3 days (spaced repetition)\n• Teach concepts out loud to yourself\n\nAcadOS's **Practice CBT** replicates exact JEE/NEET interfaces for this! Want to know more?";

  // Science
  if (/photosynthesis|newton|einstein|gravity|atom|molecule|cell|dna|evolution|relativity|quantum|chemical|periodic table|element|compound/.test(q))
    return "Great science question! 🔬 I'll give you a clear answer:\n\n" + scienceFact(q);

  // History / GK
  if (/who (was|is|invented|discovered|founded|wrote|built|won)|when (was|did|is)|where (is|was|did)|capital of|president of|prime minister|independence|world war/.test(q))
    return "Good question! Let me answer that:\n\n" + gkFact(q);

  // Study tips
  if (/study tip|how to study|focus|concentrate|remember|memorize|revise|revision|notes|time table|schedule|distraction|motivation/.test(q))
    return "Here are proven study techniques:\n\n🧠 **The Feynman Technique** — Explain a concept in simple words as if teaching a child. Gaps in your explanation = gaps in understanding.\n\n⏱️ **Pomodoro Method** — 25 min focused study → 5 min break → repeat 4 times → long break.\n\n📝 **Active recall** — Instead of re-reading, close the book and write what you remember. Much more effective.\n\n🔄 **Spaced repetition** — Review notes after 1 day, 3 days, 1 week, 1 month.\n\n📵 **Remove distractions** — Phone in another room. App blockers like Forest or Cold Turkey work well.\n\nWant tips for a specific exam like JEE or NEET?";

  // Jokes / fun
  if (/joke|funny|laugh|humour|humor/.test(q))
    return "Here's one for you 😄\n\nWhy don't scientists trust atoms?\n\n**Because they make up everything!** 😂\n\nWant another one, or shall we get back to serious stuff?";

  // Thank you
  if (/thank|thanks|thx|shukriya|dhanyavad/.test(q))
    return "You're welcome! 😊 Feel free to ask me anything else — about **AcadOS** or any topic at all. I'm here to help!";

  // Bye / goodbye
  if (/bye|goodbye|see you|later|take care|alvida/.test(q))
    return "Take care! 👋 Come back anytime — I'm always here to help with AcadOS or anything else. Good luck! 🎯";

  // Weather (can't actually know)
  if (/weather|temperature|rain|sunny|forecast/.test(q))
    return "I don't have real-time weather data, but you can check **weather.com** or Google \"weather [your city]\" for accurate forecasts. 🌤️\n\nAnything else I can help with?";

  // Default — genuinely try to be helpful
  return `That's an interesting question! I'm best at answering about **AcadOS** and education topics, but I'm happy to help with general queries too.\n\nCould you give me a bit more detail? For example:\n• If it's a math or science question — write out the full problem\n• If it's a general knowledge question — ask it more specifically\n\nOr for AcadOS-specific questions, try: **"How does OMR work?"**, **"What is TestMaker?"**, **"What does AcadOS cost?"**`;
}

function scienceFact(q: string): string {
  if (/photosynthesis/.test(q)) return "**Photosynthesis** is the process by which plants make food using sunlight.\n\n🌱 Formula: **6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂**\n\nChlorophyll in leaves absorbs sunlight → converts CO₂ from air + water from roots → glucose (food) + oxygen released.";
  if (/newton.*law|law.*newton/.test(q)) return "**Newton's 3 Laws of Motion:**\n\n1️⃣ **Inertia** — An object at rest stays at rest; an object in motion stays in motion (unless acted on by a force)\n2️⃣ **F = ma** — Force = mass × acceleration\n3️⃣ **Action-Reaction** — For every action, there is an equal and opposite reaction";
  if (/gravity/.test(q)) return "**Gravity** is the force of attraction between objects with mass.\n\n• Newton's law: F = Gm₁m₂/r²\n• Earth's gravity: 9.8 m/s²\n• Einstein's General Relativity: gravity is actually the **curvature of spacetime** caused by mass";
  if (/atom/.test(q)) return "An **atom** is the smallest unit of an element.\n\n⚛️ Structure:\n• **Nucleus** — protons (+) and neutrons (neutral) in the centre\n• **Electrons** (−) orbit around the nucleus in shells\n\nAtoms of the same element have the same number of protons (atomic number).";
  if (/dna/.test(q)) return "**DNA** (Deoxyribonucleic Acid) is the molecule that carries genetic information.\n\n🧬 Structure: Double helix — two strands twisted together\n• Made of nucleotides: Adenine (A), Thymine (T), Guanine (G), Cytosine (C)\n• A pairs with T, G pairs with C\n• Found in the **nucleus** of every cell";
  return "Science is fascinating! Could you ask the specific concept you'd like explained? For example: *\"What is Newton's second law?\"* or *\"Explain photosynthesis\"*. 🔬";
}

function gkFact(q: string): string {
  if (/capital of india/.test(q)) return "The **capital of India** is **New Delhi**. 🇮🇳";
  if (/capital of/.test(q)) {
    const country = q.match(/capital of (.+?)(\?|$)/)?.[1]?.trim();
    return country ? `Looking for the capital of **${country}**? That's a great GK question! For accurate and updated info, I'd suggest checking a reliable source like Wikipedia or Britannica. My training may not cover all recent changes. 🌍` : "Could you mention which country or state you're asking about?";
  }
  if (/independence day.*india|india.*independence/.test(q)) return "India achieved independence on **15 August 1947** from British rule. 🇮🇳\n\nThe Indian Independence Act was passed by the British Parliament, and **Jawaharlal Nehru** became the first Prime Minister.";
  if (/who (invented|discovered) (telephone|phone)/.test(q)) return "The **telephone** was invented by **Alexander Graham Bell** in **1876**. He made the first successful telephone call to his assistant Thomas Watson.";
  if (/who (invented|discovered) (electricity|bulb|light bulb)/.test(q)) return "The practical **incandescent light bulb** was invented by **Thomas Edison** in **1879**. He also developed the first electrical power distribution system.";
  if (/who (wrote|authored)/.test(q)) return "Great literary question! Could you mention the specific book or work title? I'll give you the accurate answer. 📚";
  return "Great GK question! For the most accurate answer on this, I'd recommend checking **NCERT textbooks** or a trusted GK site. Could you give me more context so I can help better? 🌍";
}

function smartReply(userText: string): string {
  const words = userText
    .toLowerCase()
    .split(/\W+/)
    .filter(w => w.length > 2 && !STOPWORDS.has(w));

  if (!words.length) return KNOWLEDGE[0].answer; // default to overview

  let best = { score: 0, idx: 0 };
  KNOWLEDGE.forEach((entry, idx) => {
    const score = words.reduce((acc, w) => {
      // exact keyword match = 3pts, partial = 1pt
      const exact = entry.keywords.some(k => k === w);
      const partial = !exact && entry.keywords.some(k => k.includes(w) || w.includes(k));
      return acc + (exact ? 3 : partial ? 1 : 0);
    }, 0);
    if (score > best.score) best = { score, idx };
  });

  // If score is too low, it's probably a general question — answer it helpfully
  if (best.score < 2) {
    return generalReply(userText);
  }

  return KNOWLEDGE[best.idx].answer;
}

/* ── Legacy KB kept for backwards compat ── */
const KB: { patterns: RegExp[]; answer: string }[] = [
  {
    patterns: [/what is acados/i, /tell me about acados/i, /acados kya hai/i, /about acados/i, /overview/i],
    answer:
      '**AcadOS** is a complete Academic Operating System built for Indian schools & coaching institutes.\n\nIt bundles 5 powerful modules under **your brand and domain**:\n• 📚 Learners Hub — 5 Lakh+ questions & worksheets\n• 📝 TestMaker — AI paper generator\n• 💻 Practice CBT — Online mock exam platform\n• 📷 OMR Evaluation — Smartphone-based sheet scanning\n• 🏫 ERP + Lead CRM — Full institute management\n\nCall **+91 9660034117** or book a free demo to see it live!',
  },
  {
    patterns: [/learners hub/i, /content library/i, /digital library/i, /questions/i, /worksheet/i],
    answer:
      '**Learners Hub** is AcadOS\'s digital content library with **5 Lakh+ questions** mapped to:\n\n• CBSE, ICSE, 15+ State Boards\n• JEE Main & Advanced, NEET, CUET\n• UPSC, SSC, Banking & Government exams\n• Classes 1 to 12\n\nFeatures: Chapter-wise PDFs, concept notes, difficulty-sorted practice sets, and printable worksheets — all under your institute\'s branding.',
  },
  {
    patterns: [/testmaker/i, /test maker/i, /paper generator/i, /question paper/i, /paper generate/i],
    answer:
      '**TestMaker** lets teachers generate exam papers in minutes:\n\n• Select board, class, subject & chapter\n• Pick difficulty mix (Easy / Medium / Hard)\n• Instant paper + answer key generation\n• OMR-compatible format for offline exams\n• Custom header with your institute name & logo\n• Download as PDF ready to print\n\nNo more 2-hour paper-setting sessions!',
  },
  {
    patterns: [/cbt/i, /computer based/i, /mock exam/i, /online exam/i, /practice test/i, /mock test/i],
    answer:
      '**Practice CBT** (Computer-Based Testing) replicates real JEE/NEET/CUET exam interfaces:\n\n• Full-screen lockdown mode\n• Section-wise navigation with timer\n• Mark for review, question palette\n• Instant scoring & percentile\n• Rank prediction vs national pool\n• Detailed topic-wise analytics\n• Works on tablets, phones, and desktops\n\nStudents get real exam confidence before the big day!',
  },
  {
    patterns: [/omr/i, /smartphone scanning/i, /answer sheet/i, /scan/i, /grading/i, /evaluation/i],
    answer:
      '**OMR Evaluation** — grade 100 answer sheets in under 5 minutes with just a smartphone:\n\n• No special OMR hardware needed\n• Teacher photographs the sheet → auto-graded in seconds\n• Supports 60 / 90 / 120 / 150 question sheets\n• Generates instant class-wise reports\n• Download results as PDF or Excel\n• Works even on low-end Android phones\n\nPerfect for coaching institutes running daily tests!',
  },
  {
    patterns: [/erp/i, /crm/i, /management/i, /admission/i, /fee/i, /attendance/i, /staff/i, /payroll/i],
    answer:
      '**ERP + Lead CRM** is complete institute management in one place:\n\n**ERP features:**\n• Student admissions & fee collection\n• Attendance tracking & reports\n• Batch scheduling & timetable\n• Faculty payroll & leave management\n• WhatsApp & SMS notifications\n\n**CRM features:**\n• Capture enquiries from website / calls\n• Follow-up reminders & pipeline view\n• Convert leads to enrolments\n• Campaign analytics\n\nStops lead leakage and automates daily admin!',
  },
  {
    patterns: [/white.?label/i, /my brand/i, /custom domain/i, /branding/i, /own logo/i],
    answer:
      'AcadOS is **100% white-labelled**:\n\n• Runs on **your domain** (e.g. app.yourcoaching.com)\n• Students see **your logo & institute name** everywhere\n• Mobile app (PWA) also shows your branding\n• No AcadOS branding visible to students\n• You own the relationship with your students\n\nThis is a major differentiator vs other ed-tech platforms!',
  },
  {
    patterns: [/price/i, /pricing/i, /cost/i, /fees/i, /how much/i, /kitna/i, /charge/i, /plan/i],
    answer:
      'AcadOS pricing is **custom per institution** based on:\n• Number of students\n• Modules selected\n• Contract duration\n\nMost institutes find it very affordable — often less than the cost of a single part-time staff member!\n\n📞 Call **+91 9660034117** for a personalised quote, or click **"Book Demo"** on the site. We\'ll share pricing after understanding your setup.',
  },
  {
    patterns: [/demo/i, /free trial/i, /try/i, /register/i, /sign up/i, /get started/i, /start/i],
    answer:
      'Getting started with AcadOS is easy!\n\n1️⃣ Click **"Schedule Demo Slot"** at the top of the page\n2️⃣ Fill in your institute details\n3️⃣ Our team calls you within 24 hours\n4️⃣ Get a live walkthrough of all 5 modules\n5️⃣ We set up your white-label portal\n\nOr call directly: **+91 9660034117**\n📧 hoduacademycontenttwo@gmail.com',
  },
  {
    patterns: [/board/i, /cbse/i, /icse/i, /state board/i, /jee/i, /neet/i, /upsc/i, /ssc/i],
    answer:
      'AcadOS content covers **15+ boards & exams**:\n\n**School boards:** CBSE, ICSE, MP Board, UP Board, Rajasthan Board, Maharashtra Board, Karnataka Board + more\n\n**Competitive exams:** JEE Main, JEE Advanced, NEET UG, CUET, UPSC CSE, SSC CGL/CHSL, Banking (IBPS/SBI)\n\n**Classes:** 1 to 12 + Dropper batches\n\nContent is updated every academic year!',
  },
  {
    patterns: [/who use/i, /for whom/i, /target/i, /customer/i, /school/i, /coaching/i, /institute/i],
    answer:
      'AcadOS is built for:\n\n🏫 **K-12 Schools** — CBSE/ICSE/State with 200+ students\n🎯 **Coaching Institutes** — JEE, NEET, CUET, Foundation\n📖 **Study Circles** — Small batches needing digital tools\n🏛️ **Government Exam Coaching** — UPSC, SSC, Banking\n\nCurrently serving institutes across Rajasthan, UP, MP & Maharashtra!',
  },
  {
    patterns: [/contact/i, /number/i, /phone/i, /call/i, /email/i, /reach/i, /support/i, /help/i],
    answer:
      'You can reach the AcadOS team here:\n\n📞 **Hotline:** +91 9660034117\n📧 **Email:** hoduacademycontenttwo@gmail.com\n🌐 **Web:** www.acados.app / www.acados.co\n\nOr **Book a Demo** directly on the site and our team will contact you within 24 hours!',
  },
  {
    patterns: [/offline/i, /internet/i, /bandwidth/i, /low.?data/i, /rural/i],
    answer:
      'AcadOS is built for **Indian connectivity realities**:\n\n• Works on 2G/3G connections for basic features\n• PDFs and worksheets download for offline access\n• CBT can be run on local network (LAN) without internet\n• Mobile-first design — works on ₹5,000 Android phones\n• No heavy installations required\n\nPerfect for Tier-2 and Tier-3 city institutes!',
  },
  {
    patterns: [/hoducation/i, /company/i, /who made/i, /founder/i, /team/i, /hodu/i],
    answer:
      'AcadOS is a product of **Hoducation Technologies Pvt. Ltd.**\n\nWe are an Indian ed-tech company focused on empowering coaching institutes and schools with enterprise-grade technology at accessible prices.\n\n📍 Based in India | 🎓 Education-first mission\n\nLearn more on the "About Leaders" section of the website!',
  },
];

const KB_EXTRA: { patterns: RegExp[]; answer: string }[] = [
  {
    patterns: [/why should i use/i, /why use/i, /why acados/i, /benefit/i, /advantage/i, /reason/i, /worth/i, /good for/i, /better than/i, /kyun use/i, /kyu use/i, /is it good/i, /should i/i, /recommend/i, /suggest/i, /is acados/i, /useful/i, /helpful/i, /value/i],
    answer:
      'Here\'s **why 100+ institutes trust AcadOS**:\n\n✅ **Save 10+ hours/week** — Auto-generate papers, grade OMR sheets, and manage admissions without manual work\n✅ **Your brand, not ours** — White-labelled portal on your domain; students never see "AcadOS"\n✅ **All-in-one** — No juggling 5 different tools; everything from content to ERP in one login\n✅ **India-first content** — 5 Lakh+ questions mapped to CBSE, NEET, JEE, State Boards\n✅ **Works on any device** — Phones, tablets, PCs; even on low-bandwidth connections\n✅ **Proven ROI** — Institutes report 30–40% better student retention after switching\n\nCall **+91 9660034117** or book a free demo to see the difference yourself!',
  },
  {
    patterns: [/how does it work/i, /how it works/i, /kaise kaam/i, /process/i, /workflow/i, /steps/i],
    answer:
      '**How AcadOS works in 4 simple steps:**\n\n1️⃣ **We set up your white-label portal** — Your logo, domain, colours\n2️⃣ **You onboard students & staff** — Bulk upload or manual entry\n3️⃣ **Activate the modules you need** — Learners Hub, TestMaker, CBT, OMR, ERP\n4️⃣ **Go live the same week** — Training provided to your team\n\nNo IT team needed. No complex installation. Just a browser or phone.\n\nBook a demo at **+91 9660034117** to see the full onboarding flow!',
  },
  {
    patterns: [/difference/i, /compare/i, /vs /i, /versus/i, /other platform/i, /competitor/i, /alternative/i],
    answer:
      '**AcadOS vs Other Platforms:**\n\n| Feature | AcadOS | Others |\n|---|---|---|\n| White-label | ✅ Full | ❌ Their brand |\n| OMR via phone | ✅ Yes | ❌ Hardware needed |\n| India board content | ✅ 15+ boards | ⚠️ Limited |\n| ERP + CRM built-in | ✅ Yes | ❌ Separate tool |\n| Offline support | ✅ Yes | ❌ No |\n| Custom domain | ✅ Yes | ❌ No |\n\nMost platforms give you one tool. **AcadOS gives you the whole OS** — under your brand.\n\nCall **+91 9660034117** for a side-by-side comparison!',
  },
  {
    patterns: [/feature/i, /what can/i, /what does/i, /kya kar/i, /capabilities/i, /module/i, /function/i],
    answer:
      'AcadOS has **5 powerful modules**:\n\n📚 **Learners Hub** — 5 Lakh+ questions, worksheets, chapter notes for Classes 1-12 + JEE/NEET/UPSC\n📝 **TestMaker** — AI paper generator with answer keys, PDF export, OMR-ready format\n💻 **Practice CBT** — Exact JEE/NEET interface, timers, rank prediction, analytics\n📷 **OMR Evaluation** — Scan 100 sheets in 5 mins using just a smartphone camera\n🏫 **ERP + CRM** — Admissions, fees, attendance, payroll, lead management — all in one\n\nAll modules are **white-labelled** under your institute name. Which one would you like to know more about?',
  },
  {
    patterns: [/security/i, /data safe/i, /privacy/i, /secure/i, /data protect/i],
    answer:
      'AcadOS takes **data security seriously**:\n\n🔒 All data encrypted in transit (HTTPS/TLS)\n🔒 Student data stored on secure Indian servers\n🔒 Role-based access — teachers only see their batches\n🔒 Regular automated backups\n🔒 No data sold to third parties — ever\n\nYour institute\'s data and student records are completely private and secure.',
  },
  {
    patterns: [/mobile/i, /app/i, /android/i, /ios/i, /phone/i, /tablet/i],
    answer:
      'AcadOS works **seamlessly on mobile**:\n\n📱 **PWA (Progressive Web App)** — Install like a native app on Android & iOS\n📱 No App Store download needed — works from the browser\n📱 Students can access content, take CBT tests, view results on their phones\n📱 Teachers can scan OMR sheets, check attendance, send notifications\n📱 Works on devices as affordable as ₹5,000 Android phones\n\nNo special hardware required anywhere!',
  },
  {
    patterns: [/setup/i, /install/i, /onboard/i, /how long/i, /time to start/i, /implementation/i, /kitna time/i],
    answer:
      '**AcadOS setup is surprisingly fast:**\n\n⏱️ **Day 1** — Domain & branding configured\n⏱️ **Day 2** — Student & staff data imported\n⏱️ **Day 3** — Module training for your team (online session)\n⏱️ **Day 4-5** — Go live with your first test or content session\n\nMost institutes are **fully live within 1 week** of signing up.\n\nNo IT team or technical expertise needed. We handle everything!\n\nCall **+91 9660034117** to start your setup today.',
  },
  {
    patterns: [/language/i, /hindi/i, /english/i, /regional/i, /medium/i, /vernacular/i],
    answer:
      'AcadOS supports **multiple languages**:\n\n🗣️ Interface available in **English & Hindi**\n🗣️ Content available in English, Hindi, and select regional languages\n🗣️ Question papers can be generated in Hindi or English\n🗣️ Regional board content follows the medium of instruction\n\nPerfect for Hindi-medium coaching institutes and State Board schools!',
  },
  {
    patterns: [/report/i, /analytics/i, /performance/i, /result/i, /progress/i, /tracking/i, /dashboard/i],
    answer:
      'AcadOS gives **powerful analytics at every level**:\n\n📊 **Student level** — Subject-wise scores, weak areas, time management\n📊 **Batch level** — Class avg, top performers, improvement trends\n📊 **Institute level** — Overall pass rates, module usage, enrolment stats\n📊 **Parent reports** — Auto-sent via WhatsApp after every test\n📊 **Teacher dashboard** — Question-wise analysis, difficulty review\n\nAll reports downloadable as **PDF or Excel** in one click!',
  },
  {
    patterns: [/parent/i, /notification/i, /whatsapp/i, /sms/i, /communication/i, /inform/i],
    answer:
      'AcadOS keeps **parents always in the loop**:\n\n💬 **WhatsApp notifications** — Auto-sent after tests with score & rank\n💬 **Fee reminders** — Automated payment due alerts\n💬 **Attendance alerts** — Parents notified if student is absent\n💬 **Result cards** — PDF report cards sent directly to parent WhatsApp\n💬 **Announcements** — Batch-wise or institute-wide broadcasts\n\nNo manual calling or printing needed — everything automated!',
  },
  {
    patterns: [/student/i, /learner/i, /how many student/i, /batch size/i, /capacity/i],
    answer:
      'AcadOS scales from **50 to 50,000+ students**:\n\n• Small coaching centres (50-200 students) — lightweight, affordable plan\n• Mid-size institutes (200-2000 students) — full feature set\n• Large chains / school groups (2000+) — enterprise plan with dedicated support\n\nAll plans include all 5 modules. No feature locked behind higher tiers.\n\nCall **+91 9660034117** for a quote based on your student count!',
  },
  {
    patterns: [/free/i, /trial/i, /demo free/i, /no cost/i, /muft/i],
    answer:
      'Yes! AcadOS offers a **free live demo** with no commitment:\n\n✅ Full walkthrough of all 5 modules\n✅ See it running with sample data from your board/class\n✅ Q&A with our product team\n✅ No credit card required\n✅ No pressure to buy immediately\n\nJust click **"Schedule Demo Slot"** at the top of the page, or call **+91 9660034117**!\n\nWe usually respond within a few hours.',
  },
  {
    patterns: [/teacher/i, /faculty/i, /staff/i, /trainer/i, /instructor/i],
    answer:
      'AcadOS makes **teachers\' lives much easier**:\n\n👩‍🏫 **TestMaker** — Generate a full paper in 10 minutes (not 2 hours)\n👩‍🏫 **OMR grading** — Grade 100 answer sheets in under 5 minutes\n👩‍🏫 **Content access** — 5 Lakh+ questions to pull from for any chapter\n👩‍🏫 **Attendance** — Mark attendance from phone with one tap\n👩‍🏫 **Analytics** — Instantly see which students need extra help\n👩‍🏫 **No tech skills needed** — Designed for non-technical educators\n\nTeachers typically save **8-10 hours per week** after switching to AcadOS!',
  },
  {
    patterns: [/hi$/i, /hello/i, /hey/i, /hii/i, /namaste/i, /good morning/i, /good evening/i, /howdy/i],
    answer:
      'Hello! 👋 I\'m **Acad**, your AcadOS assistant!\n\nI can help you with:\n• 📚 Product features & modules\n• 💰 Pricing & plans\n• 🚀 Getting started / demo\n• 🔧 Setup & onboarding\n• 📊 Analytics & reporting\n\nWhat would you like to know about AcadOS?',
  },
  {
    patterns: [/thank/i, /thanks/i, /shukriya/i, /dhanyavad/i, /great/i, /awesome/i, /nice/i, /good bot/i, /helpful/i],
    answer:
      'You\'re welcome! 😊 Happy to help!\n\nIf you\'d like to see AcadOS in action, don\'t hesitate to:\n📞 Call us at **+91 9660034117**\n📅 Or click **"Schedule Demo Slot"** on the site\n\nIs there anything else I can help you with?',
  },
];

const ALL_KB = [...KB, ...KB_EXTRA];

/* Fuzzy keyword scorer — sums how many words from the query appear in an answer */
function fuzzyMatch(query: string, answers: typeof ALL_KB): string | null {
  const words = query.toLowerCase().split(/\W+/).filter(w => w.length > 3);
  if (!words.length) return null;
  let best = { score: 0, answer: '' };
  for (const entry of answers) {
    const score = words.filter(w => entry.answer.toLowerCase().includes(w)).length;
    if (score > best.score) best = { score, answer: entry.answer };
  }
  return best.score >= 2 ? best.answer : null;
}

/* getBotReply now delegates to the new smartReply engine */
function getBotReply(text: string): string {
  // First try legacy regex KB for backwards compat
  const lower = text.toLowerCase();
  for (const entry of ALL_KB) {
    if (entry.patterns.some((p) => p.test(lower))) return entry.answer;
  }
  // Fall through to the comprehensive smart KB
  return smartReply(text);
}

const SYSTEM_PROMPT = `You are Acad, the friendly AI assistant for AcadOS — India's most complete white-label ed-tech platform for schools and coaching institutes, built by Hoducation Technologies Pvt. Ltd.

You have encyclopedic knowledge of AcadOS. Answer ANY question about it fully and accurately.

═══════════════════════════════════════
PRODUCT: ACADOS — COMPLETE KNOWLEDGE
═══════════════════════════════════════

OVERVIEW:
AcadOS (Academic Operating System) is an all-in-one, white-label academic platform combining 5 integrated modules for K-12 schools, JEE/NEET coaching, state board institutes and competitive exam academies. 5 Lakh+ questions, 15+ boards, Classes 1-12, works on ₹5,000 Android phones. 100% white-labelled under the institute's own brand and domain.

MODULE 1 — LEARNERS HUB (Content Library):
- 5 Lakh+ questions organised by board/class/subject/chapter
- Boards: CBSE, ICSE, IGCSE, RBSE, UP Board, MP Board, Maharashtra, Karnataka, Bihar, Gujarat & 6+ more State Boards
- Exams: JEE Main & Advanced, NEET UG & PG, CUET UG & PG, UPSC CSE, SSC CGL/CHSL, IBPS/SBI Banking, NDA, CLAT, CAT, GATE, Olympiads
- Classes 1-12 + Dropper batches
- Content: chapter-wise notes, concept summaries, difficulty-sorted practice sets, PDF worksheets with answer keys, PYQPs, formula sheets, SmartBoard modules
- All PDFs carry the institute's branding

MODULE 2 — TESTMAKER (AI Paper Generator):
- Generate complete exam papers in under 10 minutes
- Select: Board → Class → Subject → Chapter(s) → Difficulty ratio → No. of questions
- Output: print-ready PDF + answer key, OMR-compatible bubble sheet, section-wise format (JEE Physics/Chem/Math), custom header with institute logo
- Features: chapter mixing for unit/half-yearly tests, auto-shuffle Set A/Set B, add custom questions alongside AI-generated ones, passage/case-study questions, save templates
- Saves teachers 2-3 hours per paper

MODULE 3 — PRACTICE CBT (Computer-Based Testing):
- Replicates exact JEE Main, NEET UG, CUET UG/PG, UPSC CSAT interfaces
- Full-screen lockdown mode, section-wise timers, Mark for Review, Question Palette
- Negative marking, multi-language (Hindi+English), image/passage-based questions, auto-submit
- Post-test: instant score, percentile rank, topic-wise breakdown, time-per-question analysis, attempted vs correct vs wrong report, WhatsApp result card to parents
- Works on phones, tablets, PCs — any browser

MODULE 4 — OMR EVALUATION (Smartphone Grading):
- Grade 100 answer sheets in under 5 minutes — no hardware, no scanner
- Process: student fills OMR bubbles → teacher photographs with Android phone → AI reads bubbles instantly → results in 2-3 seconds per sheet
- Sheet formats: 30, 60, 90, 120, 150, 200 question; single & double-sided; custom formats
- Output: individual scores, class average/topper list, question-wise analysis, Excel/PDF reports, WhatsApp result dispatch, rank list
- Works on Android 8+ (even ₹5,000 phones), 99.7%+ accuracy in normal lighting

MODULE 5 — ERP + LEAD CRM:
ERP (Operations): student admissions + document upload, fee collection (cash/online/EMI), fee reminder automation via WhatsApp/SMS, one-tap attendance app, batch/timetable scheduling, faculty payroll & leave, certificate & ID card generation, parent app access
CRM (Leads & Sales): capture enquiries from website/phone/walk-in, lead pipeline (New→Contacted→Demo→Enrolled), follow-up reminders, WhatsApp drip campaigns, conversion analytics, source tracking, staff performance dashboard
Impact: 40% fewer lead leakages, 3x faster admission processing

WHITE-LABEL:
- Your domain (e.g. app.yourinstitute.com), your logo, your colours, your name everywhere
- Zero AcadOS branding visible to students
- PWA — students install it on phone homescreen as your branded app (no Play Store)
- Competitors can't identify your tech stack

PRICING:
- Custom per institution based on student count, modules chosen, contract duration
- Small (50-200 students), Mid (200-2000), Enterprise (chains/franchises)
- All modules included in every plan — no feature gating by tier
- Usually costs less than one part-time staff salary
- Quote: call +91 9660034117 or book a free demo

SETUP & ONBOARDING:
- Live in 5-7 days: Day 1 domain+SSL, Day 2 branding, Day 3 data import, Day 4 staff training, Day 5 soft launch, Day 6-7 full launch
- No technical skills needed from institute side
- Dedicated onboarding manager for first 30 days
- Ongoing: WhatsApp support (2-4hr response), email (24hr), video call, auto-updates

TECHNICAL:
- Works on 2G/3G, Android 8+, any browser
- PDFs download once → offline access forever
- CBT exams hostable on local LAN (no internet for exam)
- Data encrypted in transit (HTTPS/TLS 1.3) and at rest (AES-256)
- Indian servers, daily backups (30-day retention), RBAC, 2FA for admins, audit logs
- DPDP 2023 compliant

ANALYTICS:
- Student: subject/chapter scores, weak topic ID, time management, improvement trend, rank
- Batch: class average, distribution, question difficulty analysis, attendance-score correlation
- Institute: pass rates, module engagement, enrolment/revenue, faculty metrics
- Parent: auto PDF report cards via WhatsApp after every test, monthly summary
- Export: PDF, Excel, CSV

NOTIFICATIONS:
- WhatsApp automation: result cards, fee reminders + payment link, absence alerts, exam reminders, announcements, CRM drip sequences
- SMS fallback, email for receipts/schedules, bulk broadcast with delivery tracking

COMPANY:
- Hoducation Technologies Pvt. Ltd. — Indian ed-tech company
- Mission: enterprise-grade academic tools accessible to every Indian institute
- Active in Rajasthan, UP, MP, Maharashtra, Gujarat, Delhi NCR
- 100+ institutes trust AcadOS

CONTACT:
- Phone/WhatsApp: +91 9660034117
- Email: hoduacademycontenttwo@gmail.com
- Website: www.acados.app | www.acados.co
- Demo: free 30-45 min walkthrough, no commitment

VS COMPETITORS:
AcadOS is the ONLY platform combining: full white-label + smartphone OMR + full ERP + 15-board content library + CBT in one affordable package built for Indian institutes. Competitors either lack white-label, need OMR hardware, or separate multiple tools.

═══════════════════════════════════════

PERSONALITY: Warm, helpful, direct. Use bullet points for lists. Use **bold** for key terms. Keep responses focused. When someone asks about pricing/demo, always share +91 9660034117. If asked something completely unrelated to AcadOS, answer helpfully anyway — you are a knowledgeable assistant, not a gatekeeper.`;

let geminiClient: GoogleGenAI | null = null;
function getGemini() {
  const key = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  if (!key) return null;
  if (!geminiClient) geminiClient = new GoogleGenAI({ apiKey: key });
  return geminiClient;
}

const MODELS = [
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-1.5-flash',
  'gemini-1.5-flash-8b',
  'gemini-2.0-flash-exp',
];

async function getAIReply(messages: Message[]): Promise<string> {
  const ai = getGemini();
  const last = messages[messages.length - 1]?.content ?? '';
  if (!ai) return smartReply(last);

  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  // Try each model in order; fall back to KB on quota/error
  for (const model of MODELS) {
    try {
      const res = await ai.models.generateContent({
        model,
        contents,
        config: { systemInstruction: SYSTEM_PROMPT, maxOutputTokens: 400 },
      });
      const text = res.text;
      if (text) return text;
    } catch {
      // quota hit or error — try next model
    }
  }
  // All models failed — use comprehensive smart KB
  return smartReply(last);
}

/* ── 3-D animated bot head ── */
function BotAvatar({ speaking, size = 56 }: { speaking?: boolean; size?: number }) {
  return (
    <div style={{ width: size, height: size, perspective: '300px', flexShrink: 0 }}>
      <motion.div
        animate={{ rotateY: speaking ? [0, 12, -12, 8, -8, 0] : [0, 6, -6, 0] }}
        transition={
          speaking
            ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
        }
        style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
      >
        <svg viewBox="0 0 56 56" width={size} height={size} xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 0 10px rgba(128,0,0,0.5))' }}>
          <defs>
            <radialGradient id="acadHeadGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#c41e1e" />
              <stop offset="100%" stopColor="#3b0000" />
            </radialGradient>
            <radialGradient id="acadEyeGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="100%" stopColor="#a0d4ff" />
            </radialGradient>
          </defs>
          <line x1="28" y1="4" x2="28" y2="11" stroke="#800000" strokeWidth="2" strokeLinecap="round" />
          <motion.circle cx="28" cy="3.5" r="2.5" fill="#ff4444"
            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
          <rect x="8" y="11" width="40" height="34" rx="8" fill="url(#acadHeadGrad)" />
          <rect x="4" y="20" width="5" height="10" rx="2" fill="#600000" />
          <rect x="47" y="20" width="5" height="10" rx="2" fill="#600000" />
          <rect x="8" y="17" width="40" height="14" rx="4" fill="rgba(0,0,0,0.35)" />
          <circle cx="20" cy="24" r="5" fill="url(#acadEyeGrad)" />
          <circle cx="36" cy="24" r="5" fill="url(#acadEyeGrad)" />
          <motion.circle cx="20" cy="24" r="2.5" fill="#800000"
            animate={{ cx: [20, 20.6, 19.4, 20] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.circle cx="36" cy="24" r="2.5" fill="#800000"
            animate={{ cx: [36, 36.6, 35.4, 36] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
          <circle cx="21.5" cy="22.5" r="1" fill="white" opacity="0.8" />
          <circle cx="37.5" cy="22.5" r="1" fill="white" opacity="0.8" />
          <rect x="16" y="36" width="24" height="5" rx="2.5" fill="rgba(0,0,0,0.4)" />
          {speaking ? (
            <motion.rect x="18" y="37" width="20" height="3" rx="1.5" fill="#ff6666"
              animate={{ height: [3, 1, 3, 2, 3] }} transition={{ duration: 0.4, repeat: Infinity }} />
          ) : (
            <rect x="18" y="38" width="20" height="1.5" rx="0.75" fill="#ff4444" opacity="0.6" />
          )}
          <rect x="12" y="43" width="32" height="2" rx="1" fill="#600000" opacity="0.5" />
        </svg>
      </motion.div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 0.15, 0.3].map((delay, i) => (
        <motion.span key={i} className="w-2 h-2 rounded-full"
          style={{ background: '#800000' }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay }} />
      ))}
    </div>
  );
}

const INITIAL_MSG: Message = {
  role: 'assistant',
  content:
    "Hi! I'm **Acad**, your AcadOS guide 🤖\n\nAsk me anything about our modules — Learners Hub, TestMaker, CBT, OMR Evaluation or ERP + CRM. I'm here to help!",
};

export default function AcadBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MSG]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setLoading(true);
    setSpeaking(false);
    try {
      const reply = await getAIReply(newMessages);
      setSpeaking(true);
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
      setTimeout(() => setSpeaking(false), 2500);
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: "Sorry, I ran into an issue. Please try again or call us at **+91 9660034117**!" }]);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setMessages([INITIAL_MSG]);
    setSpeaking(false);
    setInput('');
  };

  const renderContent = (text: string) => {
    return text.split('\n').map((line, li) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <React.Fragment key={li}>
          {parts.map((part, pi) =>
            part.startsWith('**') && part.endsWith('**') ? (
              <strong key={pi}>{part.slice(2, -2)}</strong>
            ) : (
              <span key={pi}>{part}</span>
            )
          )}
          {li < text.split('\n').length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  const QUICK = ['What is AcadOS?', 'OMR scanning features', 'Pricing & demo', 'Boards supported'];

  return (
    <>
      {/* Launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="launcher"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-[9998] flex items-center gap-2 rounded-2xl shadow-2xl cursor-pointer"
            style={{ background: 'linear-gradient(135deg,#800000,#3b0000)', padding: '10px 16px 10px 10px' }}
            aria-label="Open AcadBot"
          >
            <BotAvatar speaking={false} size={40} />
            <div className="text-left">
              <p className="text-white text-xs font-bold leading-tight">Ask Acad</p>
              <p className="text-red-200 text-[10px] leading-tight">AcadOS AI Assistant</p>
            </div>
            <motion.span
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chatwindow"
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="fixed bottom-6 right-6 z-[9998] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              width: 'clamp(320px, 92vw, 400px)',
              height: 'clamp(480px, 75vh, 600px)',
              background: '#0A0A0F',
              border: '1px solid rgba(128,0,0,0.35)',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 shrink-0"
              style={{ background: 'linear-gradient(135deg,#800000,#3b0000)' }}>
              <BotAvatar speaking={speaking} size={44} />
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm leading-tight">Acad</p>
                <p className="text-red-200 text-[11px] leading-tight">AcadOS AI Assistant</p>
                <span className="inline-flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-300 text-[10px]">Online</span>
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={reset}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-red-200 hover:bg-white/10 transition-colors"
                  title="Reset chat">
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-red-200 hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#3b0000 transparent' }}>
              {messages.map((msg, idx) => (
                <motion.div key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {msg.role === 'assistant' && (
                    <BotAvatar speaking={speaking && idx === messages.length - 1} size={28} />
                  )}
                  <div
                    className="max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed"
                    style={
                      msg.role === 'user'
                        ? { background: '#800000', color: '#fff', borderBottomRightRadius: 4 }
                        : { background: '#13131A', color: '#F5F5F0', border: '1px solid rgba(128,0,0,0.2)', borderBottomLeftRadius: 4 }
                    }
                  >
                    {renderContent(msg.content)}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 items-end">
                  <BotAvatar speaking size={28} />
                  <div className="rounded-2xl" style={{ background: '#13131A', border: '1px solid rgba(128,0,0,0.2)', borderBottomLeftRadius: 4 }}>
                    <TypingDots />
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick suggestions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex gap-2 flex-wrap shrink-0">
                {QUICK.map((q) => (
                  <button key={q}
                    onClick={() => send(q)}
                    className="text-[11px] px-3 py-1 rounded-full border transition-colors"
                    style={{ borderColor: 'rgba(128,0,0,0.4)', color: '#ffa0a0', background: 'rgba(128,0,0,0.1)' }}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex items-center gap-2 px-3 py-3 shrink-0"
              style={{ borderTop: '1px solid rgba(128,0,0,0.25)', background: '#0d0d14' }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
                placeholder="Ask about AcadOS…"
                className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
              />
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => send()}
                disabled={!input.trim() || loading}
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 disabled:opacity-30 transition-opacity"
                style={{ background: 'linear-gradient(135deg,#800000,#3b0000)' }}
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
