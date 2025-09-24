import { Users, CalendarCheck, CalendarX } from "lucide-react";
import type { StudentData } from "./lib/types";

type AttendanceOverviewProps = {
  attendance: StudentData["attendance"];
};

export default function AttendanceOverview({
  attendance,
}: AttendanceOverviewProps) {
  return (
    <>
      <div className="bg-card p-4 rounded-lg shadow-md">
        <header className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Total School Days</h3>
          <Users className="h-4 w-4 text-muted-foreground" />
        </header>
        <div>
          <div className="text-2xl font-bold">{attendance.totalDays}</div>
          <p className="text-xs text-muted-foreground">Current academic year</p>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg shadow-md">
        <header className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Present</h3>
          <CalendarCheck className="h-4 w-4 text-green-500" />
        </header>
        <div>
          <div className="text-2xl font-bold">{attendance.presentDays}</div>
          <p className="text-xs text-muted-foreground">
            {((attendance.presentDays / attendance.totalDays) * 100).toFixed(1)}% attendance
          </p>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg shadow-md">
        <header className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Absent</h3>
          <CalendarX className="h-4 w-4 text-red-500" />
        </header>
        <div>
          <div className="text-2xl font-bold">{attendance.absentDays}</div>
          <p className="text-xs text-muted-foreground">
            {attendance.absentDays} days missed
          </p>
        </div>
      </div>
    </>
  );
}
