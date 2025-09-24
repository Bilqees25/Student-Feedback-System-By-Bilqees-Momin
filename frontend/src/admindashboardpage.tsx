import Link from "next/link";
import { LogOut, Users, BarChart2, Settings, School } from "lucide-react";

export default function AdminDashboardPage() {

  const adminCards = [
    {
      title: "Manage Users",
      description: "Add, edit, or remove teachers and parents.",
      icon: <Users className="h-8 w-8 text-primary" />,
      href: "/admin-dashboard/users",
    },
    {
      title: "Manage Students",
      description: "Enroll new students and assign them to classes.",
      icon: <School className="h-8 w-8 text-primary" />,
      href: "/admin-dashboard/students",
    },
    {
      title: "System Analytics",
      description: "View app usage and performance metrics.",
      icon: <BarChart2 className="h-8 w-8 text-primary" />,
      href: "/admin-dashboard/analytics",
    },
    {
      title: "System Settings",
      description: "Configure application-wide settings.",
      icon: <Settings className="h-8 w-8 text-primary" />,
      href: "/admin-dashboard/settings",
    },
  ];

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 bg-background">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
            Admin Dashboard
        </h1>
        <Link href="/" className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg border">
            <LogOut className="h-4 w-4" />
            Sign Out
        </Link>
      </div>
      
       <div className="bg-card p-6 rounded-lg shadow-md text-left">
        <h2 className="text-2xl font-bold mb-1">Welcome, Admin!</h2>
        <p className="text-muted-foreground">
          Here's an overview of your system management tools.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {adminCards.map((card) => (
          <div key={card.title} className="bg-card p-6 rounded-lg shadow-md flex flex-col">
            <header className="flex items-center gap-4 mb-4">
              <div className="bg-secondary rounded-lg p-3 w-fit h-fit">
                {card.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold">{card.title}</h3>
              </div>
            </header>
            <p className="text-muted-foreground flex-grow">{card.description}</p>
            <div className="mt-4">
              <Link href={card.href} className="inline-flex items-center justify-center w-full bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                  Go to {card.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
