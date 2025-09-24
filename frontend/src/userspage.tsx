import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, PlusCircle, Edit, Trash2, Save, XCircle } from "lucide-react";

const initialUsers = [
  {
    id: 1,
    name: "Alifiya Jahagirdar",
    role: "Teacher",
    email: "alifiya.j@example.com",
  },
  {
    id: 2,
    name: "Nilofer Momin",
    role: "Parent",
    email: "nilofer.momin@email.com",
  },
  {
    id: 3,
    name: "Muskan K",
    role: "Teacher",
    email: "muskan.k@example.com",
  },
   {
    id: 4,
    name: "Ashwini Thopte",
    role: "Teacher",
    email: "ashwini.t@example.com",
  },
];

type User = typeof initialUsers[0];
// Use Omit to create a type for the new user, as the 'id' will be generated on save.
type NewUser = Omit<User, 'id'>;

export default function ManageUsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editedUserData, setEditedUserData] = useState<User | null>(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserData, setNewUserData] = useState<NewUser>({ name: '', role: 'Teacher', email: '' });

  const handleEditClick = (user: User) => {
    setEditingUserId(user.id);
    setEditedUserData({ ...user });
  };

  const handleCancelClick = () => {
    setEditingUserId(null);
    setEditedUserData(null);
  };

  const handleSaveClick = () => {
    if (!editedUserData) return;
    setUsers(users.map(user => user.id === editedUserData.id ? editedUserData : user));
    setEditingUserId(null);
    setEditedUserData(null);
    alert("User saved successfully!");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editedUserData) return;
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };
  
  const handleDeleteClick = (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
        setUsers(users.filter(user => user.id !== userId));
        alert("User deleted successfully.");
    }
  };

  const handleAddNewUserClick = () => {
    setIsAddingUser(true);
  };

  const handleCancelAddUser = () => {
    setIsAddingUser(false);
    setNewUserData({ name: '', role: 'Teacher', email: '' });
  }

  const handleSaveNewUser = () => {
    if (!newUserData.name || !newUserData.email) {
        alert("Please fill in all fields for the new user.");
        return;
    }
    const newUserWithId = { ...newUserData, id: Date.now() }; // Use timestamp for unique ID in this mock setup
    setUsers([newUserWithId, ...users]);
    handleCancelAddUser();
    alert("New user added successfully!");
  }

  const handleNewUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setNewUserData({ ...newUserData, [name]: value });
  }

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 bg-background">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <Link href="/admin-dashboard" className="p-2 hover:bg-accent rounded-lg">
                <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">
                Manage Users
            </h1>
        </div>
        <button 
          onClick={handleAddNewUserClick}
          className="inline-flex items-center justify-center bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:bg-muted disabled:text-muted-foreground"
          disabled={isAddingUser}
        >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add New User
        </button>
      </div>

       <div className="bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">User List</h2>
         <div className="border rounded-md">
          <table className="min-w-full divide-y">
            <thead className="bg-secondary">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y">
               {isAddingUser && (
                <tr>
                   <td className="px-6 py-4 whitespace-nowrap">
                    <input type="text" name="name" placeholder="Full Name" value={newUserData.name} onChange={handleNewUserInput} className="p-1 border rounded-md bg-background w-full" />
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                    <select name="role" value={newUserData.role} onChange={handleNewUserInput} className="p-1 border rounded-md bg-background w-full">
                        <option value="Teacher">Teacher</option>
                        <option value="Parent">Parent</option>
                    </select>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                    <input type="email" name="email" placeholder="email@example.com" value={newUserData.email} onChange={handleNewUserInput} className="p-1 border rounded-md bg-background w-full" />
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                     <button onClick={handleSaveNewUser} className="p-2 hover:bg-accent rounded-lg text-green-600" aria-label="Save new user">
                        <Save className="h-4 w-4" />
                     </button>
                     <button onClick={handleCancelAddUser} className="p-2 hover:bg-accent rounded-lg text-destructive" aria-label="Cancel adding new user">
                        <XCircle className="h-4 w-4" />
                     </button>
                   </td>
                </tr>
               )}
              {users.map((user) => (
                <tr key={user.id}>
                  {editingUserId === user.id && editedUserData ? (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input type="text" name="name" value={editedUserData.name} onChange={handleInputChange} className="p-1 border rounded-md bg-background w-full" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                         <select name="role" value={editedUserData.role} onChange={handleInputChange} className="p-1 border rounded-md bg-background w-full">
                            <option value="Teacher">Teacher</option>
                            <option value="Parent">Parent</option>
                         </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input type="email" name="email" value={editedUserData.email} onChange={handleInputChange} className="p-1 border rounded-md bg-background w-full" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                         <button onClick={handleSaveClick} className="p-2 hover:bg-accent rounded-lg text-green-600" aria-label={`Save user ${user.name}`}>
                            <Save className="h-4 w-4" />
                         </button>
                         <button onClick={handleCancelClick} className="p-2 hover:bg-accent rounded-lg text-destructive" aria-label={`Cancel editing user ${user.name}`}>
                            <XCircle className="h-4 w-4" />
                         </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                         <button onClick={() => handleEditClick(user)} className="p-2 hover:bg-accent rounded-lg" aria-label={`Edit user ${user.name}`}>
                            <Edit className="h-4 w-4" />
                         </button>
                         <button onClick={() => handleDeleteClick(user.id)} className="p-2 hover:bg-accent rounded-lg text-destructive" aria-label={`Delete user ${user.name}`}>
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
