"use client";

import { useState } from 'react';
import type { Student, Feedback, Teacher } from './app/lib/types';
import { addFeedback } from './app/lib/actions';
import { useRouter } from 'next/navigation';

type AddFeedbackFormProps = {
    student: Student;
    teacher: Teacher;
};

export default function AddFeedbackForm({ student, teacher }: AddFeedbackFormProps) {
    const [feedbackText, setFeedbackText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!feedbackText.trim()) return;

        setIsSubmitting(true);

        const newFeedback: Feedback = {
            date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
            teacherName: teacher.name,
            feedback: feedbackText,
        };

        try {
            await addFeedback(student.id, newFeedback);
            setFeedbackText('');
            alert('Feedback submitted successfully!');
            router.refresh(); // Re-fetch server data to show the new feedback
        } catch (error) {
            console.error('Failed to submit feedback:', error);
            alert('Failed to submit feedback. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="grid gap-6">
            <div className="bg-card p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold">Teacher Feedback History</h3>
                <p className="text-muted-foreground mb-4">
                    Recent comments from teachers.
                </p>
                <div className="h-48 overflow-y-auto pr-4 space-y-4 border p-4 rounded-md">
                    {student.teacherFeedback.length > 0 ? (
                        student.teacherFeedback.map((item, index) => (
                            <div key={index} className="flex flex-col space-y-1 text-sm">
                                <div className="flex items-baseline justify-between">
                                <p className="font-semibold">{item.teacherName}</p>
                                <p className="text-xs text-muted-foreground">{(new Date(item.date)).toLocaleDateString()}</p>
                                </div>
                                <p className="text-muted-foreground">"{item.feedback}"</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground text-center">No feedback has been added yet.</p>
                    )}
                </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold">Add New Feedback</h3>
                <p className="text-muted-foreground mb-4">
                    Provide your comments on the student's progress.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid w-full gap-1.5">
                        <label htmlFor="feedback-message" className="font-semibold">Your Message</label>
                        <textarea
                            id="feedback-message"
                            placeholder={`Type your feedback for ${student.name} here.`}
                            required
                            className="w-full p-2 border rounded-md bg-background min-h-[100px]"
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                </form>
            </div>
        </div>
    );
}
