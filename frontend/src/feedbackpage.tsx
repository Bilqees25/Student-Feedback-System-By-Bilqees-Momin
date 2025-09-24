import TeacherFeedback from "./components/dashboard/teacher-feedback";
import { getStudentData } from "./lib/actions";

export default async function FeedbackPage() {
    const studentData = await getStudentData();
    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 bg-background">
            <TeacherFeedback feedback={studentData.teacherFeedback} />
        </main>
    )
}