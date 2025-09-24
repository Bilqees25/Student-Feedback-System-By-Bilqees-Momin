export type Subject = {
  name: string;
  score: number;
  grade: string;
};

export type Assignment = {
  name: string;
  type: 'Internal' | 'External';
  submitted: boolean;
  dueDate: string;
};

export type Feedback = {
  date: string;
  teacherName: string;
  feedback: string;
};

export type Student = {
  id: number;
  name: string;
  class: string;
  academicPerformance: Subject[];
  assignments: Assignment[];
  attendance: {
    totalDays: number;
    presentDays: number;
    absentDays: number;
  };
  teacherFeedback: Feedback[];
};
