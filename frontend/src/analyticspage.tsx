import Link from "next/link";
import { ArrowLeft, Users, LogIn, Activity } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

const dailyLoginsData = [
  { date: "Mon", logins: 55 },
  { date: "Tue", logins: 62 },
  { date: "Wed", logins: 78 },
  { date: "Thu", logins: 65 },
  { date: "Fri", logins: 85 },
  { date: "Sat", logins: 45 },
  { date: "Sun", logins: 40 },
];

const userRolesData = [
    { role: "Parents", count: 120 },
    { role: "Teachers", count: 35 },
    { role: "Admins", count: 2 },
];

export default function SystemAnalyticsPage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 bg-background">
      <div className="flex items-center gap-4">
        <Link href="/admin-dashboard" className="p-2 hover:bg-accent rounded-lg">
            <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">
            System Analytics
        </h1>
      </div>
      
       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
         <div className="bg-card p-4 rounded-lg shadow-md">
            <header className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Total Users</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
            </header>
            <div>
            <div className="text-2xl font-bold">157</div>
            <p className="text-xs text-muted-foreground">Across all roles</p>
            </div>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-md">
            <header className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Daily Logins (Avg)</h3>
            <LogIn className="h-4 w-4 text-muted-foreground" />
            </header>
            <div>
            <div className="text-2xl font-bold">62</div>
            <p className="text-xs text-muted-foreground">Based on the last 7 days</p>
            </div>
        </div>
        <div className="bg-card p-4 rounded-lg shadow-md">
            <header className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Engagement Rate</h3>
            <Activity className="h-4 w-4 text-muted-foreground" />
            </header>
            <div>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Users active in the last month</p>
            </div>
        </div>
      </div>

       <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-card p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">User Roles Distribution</h3>
          <p className="text-muted-foreground mb-4">A breakdown of users by their assigned role.</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={userRolesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="role" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="hsl(var(--primary))" name="Number of Users" />
               </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-md">
           <h3 className="text-xl font-bold">Daily Logins</h3>
           <p className="text-muted-foreground mb-4">Total user logins for the past 7 days.</p>
           <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyLoginsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="logins" fill="hsl(var(--accent))" name="Logins" />
                </BarChart>
            </ResponsiveContainer>
           </div>
        </div>
      </div>
    </main>
  );
}
