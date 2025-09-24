import { getStudentData } from "./lib/actions";
import Link from "next/link";
import { ArrowRight, CalendarCheck, FileText, GraduationCap, MessageSquare, Star } from "lucide-react";

export default async function DashboardPage() {
  const studentData = await getStudentData();
  const pages = [
    {
      name: "Attendance",
      href: "/dashboard/attendance",
      icon: <CalendarCheck className="h-6 w-6 text-primary" />,
      description: "View attendance records.",
    },
    {
      name: "Assignments",
      href: "/dashboard/assignments",
      icon: <FileText className="h-6 w-6 text-primary" />,
      description: "Check assignment submissions.",
    },
    {
      name: "Marks",
      href: "/dashboard/marks",
      icon: <GraduationCap className="h-6 w-6 text-primary" />,
      description: "See detailed subject marks.",
    },
    {
      name: "Teacher Feedback",
      href: "/dashboard/feedback",
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      description: "Read comments from teachers.",
    },
     {
      name: "Parent Review",
      href: "/dashboard/review",
      icon: <Star className="h-6 w-6 text-primary" />,
      description: "Provide your feedback.",
    },
  ];

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 bg-background">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, Parent!
          </h1>
          <p className="text-muted-foreground">
            Here's a quick overview for {studentData.name}.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <div key={page.name} className="bg-card p-6 rounded-lg shadow-md flex flex-col">
            <header className="flex items-center gap-4 mb-4">
               <div className="bg-secondary rounded-lg p-3">
                {page.icon}
               </div>
              <div>
                <h3 className="text-xl font-bold">{page.name}</h3>
                <p className="text-muted-foreground">{page.description}</p>
              </div>
            </header>
            <div className="mt-auto">
              <Link href={page.href} className="inline-flex items-center justify-center w-full bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                  View {page.name}
                  <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
