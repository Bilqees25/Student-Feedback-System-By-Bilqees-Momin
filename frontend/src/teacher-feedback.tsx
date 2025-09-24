"use client";

import type { StudentData } from "@/lib/types";
import { useState } from "react";

type TeacherFeedbackProps = {
  feedback: StudentData["teacherFeedback"];
};

export default function TeacherFeedback({ feedback: initialFeedback }: TeacherFeedbackProps) {
  const [feedback, setFeedback] = useState(initialFeedback);
  
  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div>
            <h2 className="text-2xl font-bold">Teacher Feedback</h2>
            <p className="text-muted-foreground">Recent comments from teachers.</p>
        </div>
      </div>
      <div className="h-auto overflow-y-auto pr-4 space-y-6">
        {feedback.length > 0 ? (
          feedback.map((item, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <div className="flex items-baseline justify-between">
                <p className="font-semibold text-sm">{item.teacherName}</p>
                <p className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
              </div>
              <p className="text-sm text-muted-foreground">"{item.feedback}"</p>
            </div>
          ))
        ) : (
           <p className="text-sm text-muted-foreground text-center">No feedback has been provided for this student yet.</p>
        )}
      </div>
    </div>
  );
}
