import AttendanceOverview from "./components/dashboard/attendance-overview";
import { getStudentData } from "./lib/actions";

export default async function AttendancePage() {
    const studentData = await getStudentData();
    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 bg-background">
            <div className="bg-card p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold">Attendance Overview</h2>
                <p className="text-muted-foreground">A summary of {studentData.name}'s attendance for the current academic year.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AttendanceOverview attendance={studentData.attendance} />
            </div>
        </main>
    );
}

