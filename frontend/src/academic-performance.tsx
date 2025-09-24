import type { Subject } from "./lib/types";

type AcademicPerformanceProps = {
  data: Subject[];
};

const getBadgeClass = (
  grade: string
): string => {
  if (grade.startsWith("A")) return "bg-green-100 text-green-800";
  if (grade.startsWith("B")) return "bg-yellow-100 text-yellow-800";
  if (grade.startsWith("C") || grade.startsWith("D")) return "bg-orange-100 text-orange-800";
  return "bg-red-100 text-red-800";
};

export default function AcademicPerformance({ data }: AcademicPerformanceProps) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold">Detailed Report</h3>
      <p className="text-muted-foreground mb-4">
        A detailed breakdown of subjects, scores, and grades for the term.
      </p>
      <div className="border rounded-md">
        <table className="min-w-full divide-y">
          <thead className="bg-secondary">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Subject</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Score</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Grade</th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y">
            {data.map((subject) => (
              <tr key={subject.name}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">{subject.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-muted-foreground text-right">{subject.score}/100</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getBadgeClass(subject.grade)} capitalize`}>
                    {subject.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
