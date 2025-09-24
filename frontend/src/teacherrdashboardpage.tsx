import { getStudentsForTeacher, getTeacherData } from "./lib/actions";
import Link from "next/link";
import { ChevronRight, User } from "lucide-react";

export default async function TeacherDashboardPage() {
  const teacher = await getTeacherData();
  const students = await getStudentsForTeacher(teacher.id);

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 bg-background">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {teacher.name}!
          </h1>
          <p className="text-muted-foreground">
            Here are the students in your class.
          </p>
        </div>
      </div>
      
      <div className="bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">My Students</h2>
        <div className="border rounded-md">
          <ul className="divide-y divide-border">
            {students.map((student) => (
              <li key={student.id}>
                <Link href={`/teacher-dashboard/student/${student.id}`} className="flex items-center justify-between p-4 hover:bg-secondary transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-secondary p-2 rounded-full">
                      <User className="h-6 w-6 text-primary"/>
                    </div>
                    <div>
                      <p className="font-semibold">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.class}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
