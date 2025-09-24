import { School, Users, LogOut, UserCircle } from "lucide-react";
import Link from "next/link";
import { getTeacherData } from "./lib/actions";

export default async function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const teacher = await getTeacherData();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 bg-card border-r flex flex-col">
        <header className="p-4 border-b">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-secondary rounded-full p-2 w-fit">
              <School className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">Teacher's Desk</h2>
          </div>
        </header>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li><Link href="/teacher-dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-accent-foreground font-medium"><Users className="h-5 w-5" /> My Students</Link></li>
          </ul>
        </nav>
        <footer className="p-4 border-t">
          <div className="flex items-center gap-3 p-2 rounded-lg border">
            <UserCircle className="h-10 w-10 text-muted-foreground" />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">{teacher.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {teacher.email}
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
          <h1 className="text-lg font-semibold md:hidden">Teacher Dashboard</h1>
        </header>
        {children}
      </div>
    </div>
  );
}
