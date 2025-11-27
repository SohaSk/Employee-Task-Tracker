import React, { useState, useEffect } from "react";
import API from "./api";
import {
  LayoutDashboard,
  Users,
  ListChecks,
} from "lucide-react";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedPage, setSelectedPage] = useState("dashboard");

  useEffect(() => {
    API.get("/employees").then((res) => setEmployees(res.data));
    API.get("/tasks").then((res) => setTasks(res.data));
  }, []);

  const totalTasks = tasks.length;
  const completed = tasks.filter((t) => t.status === "done").length;
  const completionRate = totalTasks ? Math.round((completed / totalTasks) * 100) : 0;

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Inter, sans-serif" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          borderRight: "1px solid #e5e7eb",
          padding: "1.5rem 1rem",
          background: "#ffffff",
        }}
      >
        <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "2rem", color: "#2563eb" }}>
          TaskTracker
        </h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <button
            onClick={() => setSelectedPage("dashboard")}
            style={navBtn(selectedPage === "dashboard")}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>

          <button
            onClick={() => setSelectedPage("employees")}
            style={navBtn(selectedPage === "employees")}
          >
            <Users size={18} /> Employees
          </button>

          <button
            onClick={() => setSelectedPage("tasks")}
            style={navBtn(selectedPage === "tasks")}
          >
            <ListChecks size={18} /> Tasks
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, background: "#f8fafc" }}>
        {/* Top Navbar */}
        <header
          style={{
            height: "70px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 2rem",
            background: "#ffffff",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
            {selectedPage === "dashboard" && "Dashboard Overview"}
            {selectedPage === "employees" && "Employees"}
            {selectedPage === "tasks" && "Tasks"}
          </h2>

          <div style={{ fontWeight: "600" }}>Admin</div>
        </header>

        {/* Page Content */}
        <div style={{ padding: "1.5rem" }}>
          {selectedPage === "dashboard" && (
            <DashboardCards
              employees={employees.length}
              tasks={tasks.length}
              completionRate={completionRate}
            />
          )}

          {selectedPage === "employees" && <EmployeePage employees={employees} />}

          {selectedPage === "tasks" && <TaskPage tasks={tasks} />}
        </div>
      </div>
    </div>
  );
}

/* Sidebar Button Styling */
function navBtn(active) {
  return {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 1rem",
    width: "100%",
    borderRadius: "8px",
    background: active ? "#e8f0fe" : "transparent",
    color: active ? "#2563eb" : "#374151",
    border: "none",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: 500,
    textAlign: "left",
  };
}

/* Dashboard Cards */
function DashboardCards({ employees, tasks, completionRate }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1rem",
      }}
    >
      <Card title="Total Employees" value={employees} color="#2563eb" />
      <Card title="Active Tasks" value={tasks} color="#7c3aed" />
      <Card title="Project Completion" value={`${completionRate}%`} color="#16a34a" />
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "1.2rem",
        borderRadius: "12px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: "0.5rem" }}>{title}</div>
      <div style={{ fontSize: "1.5rem", fontWeight: "700", color }}>{value}</div>
    </div>
  );
}

/* Employees Page */
function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("user");
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const addEmployee = async () => {
    if (!newName.trim() || !newEmail.trim() || !newRole.trim()) return;

    try {
      await API.post("/employees", { name: newName, email: newEmail, role: newRole });
      await fetchEmployees();
      setNewName("");
      setNewEmail("");
      setNewRole("user");
      setShowModal(false);
    } catch (err) {
      console.error("Failed to add employee:", err);
      alert(err.response?.data?.message || "Failed to add employee.");
    }
  };

  if (loading) return <div>Loading employees...</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>Employee List</h3>
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "0.5rem 1rem",
            background: "#4f46e5",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          + Add Employee
        </button>
      </div>

      <div
        style={{
          background: "#ffffff",
          padding: "1rem",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        }}
      >
        {/* Table header */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", fontWeight: "600", padding: "0.75rem 0", borderBottom: "2px solid #eee" }}>
          <div>EMPLOYEE</div>
          <div>ROLE</div>
        </div>

        {/* Employee rows */}
        {employees.map((e) => (
          <div key={e.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr", padding: "0.75rem 0", borderBottom: "1px solid #eee", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "#ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.875rem",
                  color: "#fff",
                  textTransform: "uppercase",
                }}
              >
                {e.name[0]}
              </div>
              <div>
                <div style={{ fontWeight: "500" }}>{e.name}</div>
                <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>{e.email}</div>
              </div>
            </div>
            <div>{e.role}</div>
          </div>
        ))}
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "12px",
              width: "350px",
              boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>Add New Employee</h3>

            <input
              type="text"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                marginBottom: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                marginBottom: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="text"
              placeholder="Role"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                marginBottom: "1rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#e5e7eb",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                onClick={addEmployee}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#4f46e5",
                  color: "#fff",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}






/* Tasks Page */

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  const [employeeId, setEmployeeId] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  const openModal = (task = null) => {
    if (task) {
      setEditingTask(task);
      setTitle(task.title);
      setStatus(task.status);
      setEmployeeId(task.employeeId || "");
    } else {
      setEditingTask(null);
      setTitle("");
      setStatus("todo");
      setEmployeeId("");
    }
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingTask) {
        await API.put(`/tasks/${editingTask.id}`, { title, status, employeeId: employeeId || null });
      } else {
        await API.post("/tasks", { title, status, employeeId: employeeId || null });
      }
      await fetchTasks();
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save task.");
    }
  };

  const statusColors = {
    todo: "bg-yellow-100 text-yellow-800",
    "in-progress": "bg-blue-100 text-blue-800",
    done: "bg-green-100 text-green-800",
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>Tasks</h3>
        <button
          onClick={() => openModal()}
          style={{
            padding: "0.5rem 1rem",
            background: "#4f46e5",
            color: "#fff",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          + Add Task
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
            <th style={thStyle}>Task Title</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Assignee</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
              <td style={tdStyle}>{t.title}</td>
              <td style={tdStyle}>
                <span
                  style={{
                    padding: "0.25rem 0.5rem",
                    borderRadius: "8px",
                    backgroundColor: t.status === "todo" ? "#fef3c7" : t.status === "in-progress" ? "#bfdbfe" : "#d1fae5",
                    color: t.status === "todo" ? "#b45309" : t.status === "in-progress" ? "#1d4ed8" : "#065f46",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                  }}
                >
                  {t.status.replace("-", " ")}
                </span>
              </td>
              <td style={tdStyle}>{t.assignee?.name || "Unassigned"}</td>
              <td style={tdStyle}>
                <button
                  onClick={() => openModal(t)}
                  style={{
                    padding: "0.25rem 0.5rem",
                    background: "#fbbf24",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "12px",
              width: "350px",
              boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>{editingTask ? "Edit Task" : "Add Task"}</h3>

            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", padding: "0.5rem", marginBottom: "0.75rem", borderRadius: "8px", border: "1px solid #ccc" }}
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ width: "100%", padding: "0.5rem", marginBottom: "0.75rem", borderRadius: "8px", border: "1px solid #ccc" }}
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Completed</option>
            </select>

            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", borderRadius: "8px", border: "1px solid #ccc" }}
            >
              <option value="">Unassigned</option>
              {employees.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              <button
                onClick={() => setShowModal(false)}
                style={{ padding: "0.5rem 1rem", background: "#e5e7eb", borderRadius: "8px", border: "none", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                style={{ padding: "0.5rem 1rem", background: "#4f46e5", color: "#fff", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "600" }}
              >
                {editingTask ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "0.75rem 1rem",
  fontSize: "0.875rem",
  fontWeight: 600,
  color: "#374151",
};

const tdStyle = {
  padding: "0.75rem 1rem",
  fontSize: "0.875rem",
  color: "#374151",
};


