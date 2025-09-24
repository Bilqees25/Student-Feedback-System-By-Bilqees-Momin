import { getStudentById } from "./lib/actions";
import { notFound } from "next/navigation";
import AcademicPerformance from "./components/dashboard/academic-performance";
import AttendanceOverview from "./components/dashboard/attendance-overview";
import AddFeedbackForm from "./components/teacher-dashboard/add-feedback-form";
import type { Assignment } from "./lib/types";

const getBadgeClass = (submitted: boolean): string => {
  return submitted ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
};

export default async function StudentDetailPage({ params }: { params: { id: string } }) {
  const studentId = parseInt(params.id, 10);
  const student = await getStudentById(studentId);

  if (!student) {
    notFound();
  }

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 bg-background">
      <header>
        <h1 className="text-3xl font-bold">{student.name}</h1>
        <p className="text-muted-foreground">{student.class}</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AttendanceOverview attendance={student.attendance} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AcademicPerformance data={student.academicPerformance} />

        <div className="bg-card p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">Assignments</h3>
          <p className="text-muted-foreground mb-4">
            A list of recent assignment submissions.
          </p>
          <div className="border rounded-md">
            <table className="min-w-full divide-y">
              <thead className="bg-secondary">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Assignment</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y">
                {student.assignments.map((assignment: Assignment) => (
                  <tr key={assignment.name}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">{assignment.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getBadgeClass(assignment.submitted)}`}>
                        {assignment.submitted ? "Submitted" : "Not Submitted"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
       
      <AddFeedbackForm student={student} />

    </main>
  );
}
