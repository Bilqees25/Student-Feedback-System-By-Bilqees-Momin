import Link from "next/link";
import { BookUser, School, UserCog } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Welcome to ParentView</h1>
        <p className="text-lg text-muted-foreground mt-2">Please select your role to sign in.</p>
      </header>

      <div className="w-full max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        
        {/* Parent Login Card */}
        <div className="flex flex-col items-center justify-between bg-card p-8 rounded-lg shadow-md">
          <header className="text-center space-y-2 mb-6">
            <div className="mx-auto bg-secondary rounded-full p-3 w-fit">
              <BookUser className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Parent Portal</h2>
            <p className="text-muted-foreground">
              Access your child's dashboard.
            </p>
          </header>
          <Link href="/dashboard" className="block w-full text-center bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors mt-auto">
              Sign In as Parent
          </Link>
        </div>

        {/* Teacher Login Card */}
        <div className="flex flex-col items-center justify-between bg-card p-8 rounded-lg shadow-md">
           <header className="text-center space-y-2 mb-6">
            <div className="mx-auto bg-secondary rounded-full p-3 w-fit">
              <School className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Teacher's Desk</h2>
            <p className="text-muted-foreground">
              Manage your students and classes.
            </p>
          </header>
          <Link href="/teacher-dashboard" className="block w-full text-center bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors mt-auto">
              Sign In as Teacher
          </Link>
        </div>

        {/* Admin Login Card */}
        <div className="flex flex-col items-center justify-between bg-card p-8 rounded-lg shadow-md">
           <header className="text-center space-y-2 mb-6">
            <div className="mx-auto bg-secondary rounded-full p-3 w-fit">
              <UserCog className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Admin Panel</h2>
            <p className="text-muted-foreground">
              Oversee the entire system.
            </p>
          </header>
          <Link href="/admin-dashboard" className="block w-full text-center bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors mt-auto">
              Sign In as Admin
          </Link>
        </div>

      </div>
      <footer className="text-center mt-12">
        <p className="text-sm text-muted-foreground">
          App made by Bilqees Momin
        </p>
      </footer>
    </main>
  );
}

