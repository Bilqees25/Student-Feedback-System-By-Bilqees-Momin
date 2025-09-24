import AcademicPerformance from "./components/dashboard/academic-performance";
import { getStudentData } from "./lib/actions";

export default async function MarksPage() {
    const studentData = await getStudentData();
    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 bg-background">
            <div className="grid gap-6 md:grid-cols-1">
                <AcademicPerformance data={studentData.academicPerformance} />
            </div>
        </main>
    )
}
