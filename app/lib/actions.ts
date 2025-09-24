import createPool from "./db";
import { allStudents, allTeachers } from "./mock-data";
import type { StudentData, Teacher, Student, Feedback } from "./types";

// --- Parent View Actions ---
export async function getStudentData(name?: string): Promise<StudentData> {
  const pool = createPool();
  try {
    // If no name is provided, we need a default behavior. Let's try to get the first student from the DB.
    const studentName =
      name ||
      (await pool.query<any[]>("SELECT name FROM students LIMIT 1"))[0][0]
        ?.name;

    if (!studentName) {
      throw new Error("No students found in the database.");
    }

    const [rows] = await pool.query<any[]>(
      `
      SELECT * FROM students WHERE name = ?
    `,
      [studentName]
    );

    if (rows.length === 0) {
      throw new Error(`Student with name "${studentName}" not found.`);
    }
    const student = rows[0];

    const [academicPerformance] = await pool.query(
      "SELECT * FROM academic_performance WHERE student_id = ?",
      [student.id]
    );
    const [assignments] = await pool.query(
      "SELECT name, type, submitted, DATE_FORMAT(dueDate, '%Y-%m-%d') as dueDate FROM assignments WHERE student_id = ?",
      [student.id]
    );
    const [attendance] = await pool.query(
      "SELECT * FROM attendance WHERE student_id = ?",
      [student.id]
    );
    const [teacherFeedback] = await pool.query(
      "SELECT *, DATE_FORMAT(date, '%Y-%m-%d') as date FROM teacher_feedback WHERE student_id = ?",
      [student.id]
    );

    return {
      id: student.id,
      name: student.name,
      class: student.class,
      academicPerformance: academicPerformance as any,
      assignments: (assignments as any[]).map((a) => ({
        ...a,
        submitted: !!a.submitted,
      })),
      attendance: (attendance as any)[0] || {
        totalDays: 0,
        presentDays: 0,
        absentDays: 0,
      },
      teacherFeedback: teacherFeedback as any,
    };
  } catch (error) {
    console.error("Failed to get student data:", error);
    throw new Error("Could not fetch student data from the database.");
  }
}

// --- Teacher View Actions ---

export async function getTeacherData(name?: string): Promise<Teacher> {
  const pool = createPool();
  try {
    const teacherName =
      name ||
      (await pool.query<any[]>("SELECT name FROM teachers LIMIT 1"))[0][0]
        ?.name;
    if (!teacherName) {
      throw new Error("No teachers found in the database.");
    }

    const [rows] = await pool.query<any[]>(
      "SELECT * FROM teachers WHERE name = ?",
      [teacherName]
    );

    if (rows.length === 0) {
      throw new Error(`Teacher with name "${teacherName}" not found.`);
    }
    const teacher = rows[0];

    const [studentIds] = await pool.query<any[]>(
      "SELECT student_id FROM teacher_students WHERE teacher_id = ?",
      [teacher.id]
    );

    return {
      ...teacher,
      students: studentIds.map((row) => row.student_id),
    };
  } catch (error) {
    console.error("Failed to get teacher data:", error);
    throw new Error("Could not fetch teacher data from the database.");
  }
}

export async function getStudentsForTeacher(
  teacherId: number
): Promise<Student[]> {
  const pool = createPool();
  try {
    const [rows] = await pool.query<any[]>(
      `
      SELECT s.* FROM students s
      JOIN teacher_students ts ON s.id = ts.student_id
      WHERE ts.teacher_id = ?
    `,
      [teacherId]
    );
    return rows;
  } catch (error) {
    console.error("Failed to get students for teacher:", error);
    return []; // Return empty array on error as the component can handle it
  }
}

export async function getStudentById(
  studentId: number
): Promise<Student | undefined> {
  const pool = createPool();
  try {
    const [rows] = await pool.query<any[]>(
      "SELECT * FROM students WHERE id = ?",
      [studentId]
    );
    if (rows.length === 0) {
      return undefined;
    }
    const student = rows[0];

    const [academicPerformance] = await pool.query(
      "SELECT * FROM academic_performance WHERE student_id = ?",
      [student.id]
    );
    const [assignments] = await pool.query(
      "SELECT name, type, submitted, DATE_FORMAT(dueDate, '%Y-%m-%d') as dueDate FROM assignments WHERE student_id = ?",
      [student.id]
    );
    const [attendance] = await pool.query(
      "SELECT * FROM attendance WHERE student_id = ?",
      [student.id]
    );
    const [teacherFeedback] = await pool.query(
      "SELECT *, DATE_FORMAT(date, '%Y-%m-%d') as date FROM teacher_feedback WHERE student_id = ?",
      [student.id]
    );

    return {
      id: student.id,
      name: student.name,
      class: student.class,
      academicPerformance: academicPerformance as any,
      assignments: (assignments as any).map((a: any) => ({
        ...a,
        submitted: Boolean(a.submitted),
      })),
      attendance: (attendance as any)[0] || {
        totalDays: 0,
        presentDays: 0,
        absentDays: 0,
      },
      teacherFeedback: teacherFeedback as any,
    };
  } catch (error) {
    console.error(`Failed to get student by ID ${studentId}:`, error);
    return undefined;
  }
}

export async function addFeedback(
  studentId: number,
  newFeedback: Feedback
): Promise<Student | undefined> {
  const pool = createPool();
  try {
    await pool.query(
      `
      INSERT INTO teacher_feedback (student_id, date, teacherName, feedback)
      VALUES (?, ?, ?, ?)
    `,
      [
        studentId,
        newFeedback.date,
        newFeedback.teacherName,
        newFeedback.feedback,
      ]
    );

    return await getStudentById(studentId);
  } catch (error) {
    console.error(`Failed to add feedback for student ${studentId}:`, error);
    throw new Error("Could not add feedback to the database.");
  }
}
