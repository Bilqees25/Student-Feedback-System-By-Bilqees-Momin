import { getStudentData } from "./lib/actions";
import type { Assignment } from "./lib/mock-data";
// ...existing code...
const getBadgeClass = (submitted: boolean): string => {
  return submitted ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
};

export default async function AssignmentsPage() {
  const studentData = await getStudentData();
  const { assignments } = studentData;
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 bg-background">
      <div className="bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-1">Assignments (CIE)</h2>
        <p className="text-muted-foreground mb-4">
          A list of internal and external assignments and their submission status for {studentData.name}.
        </p>
        <div className="border rounded-md">
          <table className="min-w-full divide-y">
            <thead className="bg-secondary">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Assignment Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Due Date</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y">
              {assignments.map((assignment: Assignment) => (
                <tr key={assignment.name}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">{assignment.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{assignment.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{new Date(assignment.dueDate).toLocaleDateString()}</td>
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
    </main>
  );
}