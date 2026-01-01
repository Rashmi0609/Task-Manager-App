import { useState, useEffect } from "react";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  updateUserProfile,
} from "../api";

export default function Dashboard({ user, setUser }) {
  // Tasks
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");

  // Profile
  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);
  const [userPassword, setUserPassword] = useState("");

  // Toggle profile update
  const [showProfile, setShowProfile] = useState(false);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add, update, delete tasks
  const handleAdd = async () => {
    if (!title) return alert("Title required");
    if (description.length > 200) return alert("Description too long (max 200 chars)");
    try {
      const newTask = await addTask({ title, description });
      setTasks([newTask, ...tasks]);
      setTitle("");
      setDescription("");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdate = async (task) => {
    try {
      const updated = await updateTask(task._id, { completed: !task.completed });
      setTasks(tasks.map((t) => (t._id === updated._id ? updated : t)));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((t) => t._id !== taskId));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleProfileUpdate = async () => {
    if (!userName || !userEmail) return alert("Name and Email required");
    try {
      const updatedUser = await updateUserProfile({
        name: userName,
        email: userEmail,
        password: userPassword || undefined,
      });
      setUser(updatedUser);
      setUserPassword("");
      alert("Profile updated successfully!");
      setShowProfile(false);
    } catch (err) {
      alert(err.message);
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.trim().toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(search.trim().toLowerCase()))
  );

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", fontFamily: "sans-serif" }}>
      {/* Header Card */}
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          position: "relative",
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: "1.8rem" }}>Welcome, {user.name} 🎉</h1>
          <p style={{ color: "#555" }}>{user.email}</p>
        </div>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            style={{
              padding: "8px 12px",
              backgroundColor: "#0077ff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            ☰
          </button>

          {showProfile && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "calc(100% + 10px)",
                width: "250px",
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                padding: "15px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                zIndex: 10,
              }}
            >
              <h3 style={{ margin: 0, color: "#333" }}>Profile</h3>
              <input
                placeholder="Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
              />
              <input
                placeholder="Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
              />
              <input
                type="password"
                placeholder="New Password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
              />
              <button
                onClick={handleProfileUpdate}
                style={{
                  padding: "8px",
                  backgroundColor: "#0077ff",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowProfile(false);
                  setUserPassword("");
                }}
                style={{
                  padding: "6px",
                  backgroundColor: "#ccc",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>


      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ marginBottom: "10px", color: "#333" }}>Add Task</h2>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "10px" }}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "10px" }}
        />
        <button
          onClick={handleAdd}
          style={{
            padding: "10px",
            backgroundColor: "#7f5af0",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Add Task
        </button>
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      >
        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {filteredTasks.length === 0 && <p style={{ color: "#777" }}>No tasks yet.</p>}
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            style={{
              padding: "15px",
              borderRadius: "12px",
              backgroundColor: task.completed ? "#e0ffe0" : "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{ margin: 0, textDecoration: task.completed ? "line-through" : "none", color: task.completed ? "#555" : "#000" }}>
                {task.title}
              </h3>
              {task.description && <p style={{ margin: "5px 0", color: "#555" }}>{task.description}</p>}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => handleUpdate(task)}
                style={{
                  padding: "6px 12px",
                  backgroundColor: task.completed ? "#ffcc00" : "#4caf50",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
