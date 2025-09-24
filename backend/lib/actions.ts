
import { mockStudentData, mockTeacher, allStudents } from './mock-data';
import type { StudentData, Teacher, Student, Feedback } from './types';

// --- Parent View Actions ---
export async function getStudentData(): Promise<StudentData> {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockStudentData;
}


// --- Teacher View Actions ---

export async function getTeacherData(): Promise<Teacher> {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockTeacher;
}

export async function getStudentsForTeacher(teacherId: number): Promise<Student[]> {
   // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  const teacher = mockTeacher; // In a real app, find the teacher by ID
  if (teacher.id !== teacherId) {
    return [];
  }
  return allStudents.filter(student => teacher.students.includes(student.id));
}

export async function getStudentById(studentId: number): Promise<Student | undefined> {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  return allStudents.find(student => student.id === studentId);
}

// This is a mock action. In a real app, this would update a database.
export async function addFeedback(studentId: number, newFeedback: Feedback): Promise<Student | undefined> {
  console.log(`Adding feedback for student ${studentId}:`, newFeedback);
  
  const studentIndex = allStudents.findIndex(s => s.id === studentId);
  if (studentIndex !== -1) {
    allStudents[studentIndex].teacherFeedback.push(newFeedback);
    return allStudents[studentIndex];
  }
  return undefined;
}
