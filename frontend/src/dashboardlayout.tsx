import { BookUser, CalendarCheck, FileText, GraduationCap, Home, LogOut, MessageSquare, Star, UserCircle } from "lucide-react";
import StudentSelector from "./components/dashboard/student-selector";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 bg-card border-r flex flex-col">
        <header className="p-4 border-b">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-secondary rounded-full p-2 w-fit">
              <BookUser className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">ParentView</h2>
          </div>
          <StudentSelector />
        </header>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li><Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-accent-foreground font-medium"><Home className="h-5 w-5" /> Dashboard</Link></li>
            <li><Link href="/dashboard/attendance" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-accent-foreground font-medium"><CalendarCheck className="h-5 w-5" /> Attendance</Link></li>
            <li><Link href="/dashboard/assignments" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-accent-foreground font-medium"><FileText className="h-5 w-5" /> Assignments</Link></li>
            <li><Link href="/dashboard/marks" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-accent-foreground font-medium"><GraduationCap className="h-5 w-5" /> Marks</Link></li>
            <li><Link href="/dashboard/feedback" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-accent-foreground font-medium"><MessageSquare className="h-5 w-5" /> Teacher Feedback</Link></li>
            <li><Link href="/dashboard/review" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-accent-foreground font-medium"><Star className="h-5 w-5" /> Parent Review</Link></li>
          </ul>
        </nav>
        <footer className="p-4 border-t">
          <div className="flex items-center gap-3 p-2 rounded-lg border">
            <UserCircle className="h-10 w-10 text-muted-foreground" />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">Nilofer Momin</p>
              <p className="text-xs text-muted-foreground truncate">
                nilofer.momin@email.com
              </p>
            </div>
            <Link href="/" className="p-2 hover:bg-accent rounded-lg">
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        </footer>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="flex h-14 items-center justify-between p-4 border-b md:justify-end bg-card">
          <h1 className="text-lg font-semibold md:hidden">Dashboard</h1>
        </header>
        {children}
      </div>
    </div>
  );
}