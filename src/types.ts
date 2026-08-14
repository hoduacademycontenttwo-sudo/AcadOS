/**
 * AcadOS Shared Type Definitions
 */

export type PageId =
  | 'home'
  | 'schools'
  | 'coaching'
  | 'testmaker'
  | 'learners-hub'
  | 'practice-cbt'
  | 'erp-crm'
  | 'content-library'
  | 'about'
  | 'contact'
  | 'omr-evaluation'
  | 'why-acados';

export interface DemoBooking {
  id: string;
  name: string;
  institutionName: string;
  role: string; // e.g. Principal, Director, Teacher
  phone: string;
  email: string;
  institutionType: string; // e.g. School, Coaching, College
  studentsCount: string;
  interestedModules: string[];
  preferredTime: string;
  createdAt: string;
}

export interface Question {
  id: string;
  type: 'MCQ' | 'Subjective' | 'Numerical';
  subject: string;
  chapter: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  marks: number;
  questionText: string;
  options?: string[]; // for MCQ
  correctAnswer: string;
  solution: string;
}
