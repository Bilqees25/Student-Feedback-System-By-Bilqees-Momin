export interface AcademicPerformance {
    name: string;
    score: number;
    grade: string;
}

export interface Assignment {
    name: string;
    type: string;
    submitted: boolean;
    dueDate: string;
}

export interface Attendance {
    totalDays: number;
    presentDays: number;
    absentDays: number;
}

export interface TeacherFeedback {
    date: string;
    teacherName: string;
    feedback: string;
}

export interface StudentData {
    id: number;
    name: string;
    class: string;
    academicPerformance: AcademicPerformance[];
    assignments: Assignment[];
    attendance: Attendance;
    teacherFeedback: TeacherFeedback[];
}