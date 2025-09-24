import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, PlusCircle, Edit, Trash2, Save, XCircle } from "lucide-react";
import { allStudents as initialStudents } from "./lib/mock-data";
import type { Student } from "./lib/types";

// Use Omit to create a type for the new student, as 'id' and other properties will be generated/mocked.
type NewStudent = Pick<Student, 'name' | 'class'>;

export default function ManageStudentsPage() {
  const [students, setStudents] = useState(initialStudents);
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
  const [editedStudentData, setEditedStudentData] = useState<Student | null>(null);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [newStudentData, setNewStudentData] = useState<NewStudent>({ name: '', class: '' });

  const handleEditClick = (student: Student) => {
    setEditingStudentId(student.id);
    setEditedStudentData({ ...student });
  };

  const handleCancelClick = () => {
    setEditingStudentId(null);
    setEditedStudentData(null);
  };

  const handleSaveClick = () => {
    if (!editedStudentData) return;
    setStudents(students.map(student => student.id === editedStudentData.id ? editedStudentData : student));
    setEditingStudentId(null);
    setEditedStudentData(null);
    alert("Student saved successfully!");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedStudentData) return;
    const { name, value } = e.target;
    setEditedStudentData({ ...editedStudentData, [name]: value });
  };
  
  const handleDeleteClick = (studentId: number) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
        setStudents(students.filter(student => student.id !== studentId));
        alert("Student deleted successfully.");
    }
  };

  const handleAddNewStudentClick = () => {
    setIsAddingStudent(true);
  };

  const handleCancelAddStudent = () => {
    setIsAddingStudent(false);
    setNewStudentData({ name: '', class: '' });
  };

  const handleSaveNewStudent = () => {
    if (!newStudentData.name || !newStudentData.class) {
        alert("Please fill in all fields for the new student.");
        return;
    }
    // In a real app, this would be a proper new object saved to a database.
    // Here we create a mock student object for the demo.
    const newStudentWithId: Student = { 
        ...newStudentData, 
        id: Date.now(), // Use timestamp for unique ID in this mock setup
        academicPerformance: [],
        assignments: [],
        attendance: { totalDays: 0, presentDays: 0, absentDays: 0 },
        teacherFeedback: [],
    };
    setStudents([newStudentWithId, ...students]);
    handleCancelAddStudent();
    alert("New student added successfully!");
  };

  const handleNewStudentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setNewStudentData({ ...newStudentData, [name]: value });
  };

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 bg-background">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <Link href="/admin-dashboard" className="p-2 hover:bg-accent rounded-lg">
                <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">
                Manage Students
            </h1>
        </div>
        <button 
          onClick={handleAddNewStudentClick}
          className="inline-flex items-center justify-center bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:bg-muted disabled:text-muted-foreground"
          disabled={isAddingStudent}
        >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add New Student
        </button>
      </div>

       <div className="bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Student List</h2>
         <div className="border rounded-md">
          <table className="min-w-full divide-y">
            <thead className="bg-secondary">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Class</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y">
               {isAddingStudent && (
                <tr>
                   <td className="px-6 py-4 whitespace-nowrap">
                    <input type="text" name="name" placeholder="Full Name" value={newStudentData.name} onChange={handleNewStudentInput} className="p-1 border rounded-md bg-background w-full" />
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                    <input type="text" name="class" placeholder="Class Name" value={newStudentData.class} onChange={handleNewStudentInput} className="p-1 border rounded-md bg-background w-full" />
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                     <button onClick={handleSaveNewStudent} className="p-2 hover:bg-accent rounded-lg text-green-600" aria-label="Save new student">
                        <Save className="h-4 w-4" />
                     </button>
                     <button onClick={handleCancelAddStudent} className="p-2 hover:bg-accent rounded-lg text-destructive" aria-label="Cancel adding new student">
                        <XCircle className="h-4 w-4" />
                     </button>
                   </td>
                </tr>
               )}
              {students.map((student) => (
                <tr key={student.id}>
                  {editingStudentId === student.id && editedStudentData ? (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input type="text" name="name" value={editedStudentData.name} onChange={handleInputChange} className="p-1 border rounded-md bg-background w-full" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                         <input type="text" name="class" value={editedStudentData.class} onChange={handleInputChange} className="p-1 border rounded-md bg-background w-full" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                         <button onClick={handleSaveClick} className="p-2 hover:bg-accent rounded-lg text-green-600" aria-label={`Save student ${student.name}`}>
                            <Save className="h-4 w-4" />
                         </button>
                         <button onClick={handleCancelClick} className="p-2 hover:bg-accent rounded-lg text-destructive" aria-label={`Cancel editing student ${student.name}`}>
                            <XCircle className="h-4 w-4" />
                         </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">{student.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{student.class}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                         <button onClick={() => handleEditClick(student)} className="p-2 hover:bg-accent rounded-lg" aria-label={`Edit student ${student.name}`}>
                            <Edit className="h-4 w-4" />
                         </button>
                         <button onClick={() => handleDeleteClick(student.id)} className="p-2 hover:bg-accent rounded-lg text-destructive" aria-label={`Delete student ${student.name}`}>
                            <Trash2 className="h-4 w-4" />
                         </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
