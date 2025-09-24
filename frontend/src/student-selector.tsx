e"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { allStudents } from "./app/lib/mock-data";

export default function StudentSelector({ studentName }: { studentName: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleStudentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStudentName = event.target.value;
    const currentPath = window.location.pathname;
    
    // Preserve other query params if they exist
    const params = new URLSearchParams(searchParams.toString());
    params.set('studentName', newStudentName);

    router.push(`${currentPath}?${params.toString()}`);
  };
  
  // Find the selected student object to display the name correctly
  const selectedStudent = allStudents.find(s => s.name === studentName) || allStudents[0];

  return (
    <select 
        value={selectedStudent.name} 
        onChange={handleStudentChange} 
        className="w-full p-2 border rounded-md bg-card text-foreground"
    >
      {allStudents.map(student => (
        <option key={student.id} value={student.name}>{student.name}</option>
      ))}
    </select>
  );
}
