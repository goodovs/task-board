import { useEffect, useState } from "react";

interface Task {
  title: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/tasks");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    const tempTask: Task = { title: newTask };
    setTasks(prev => [...prev, tempTask]); // optimistic update
    setNewTask("");

    try {
      const res = await fetch("http://localhost:8000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempTask),
      });
      if (!res.ok) throw new Error("Failed to add task");
      const savedTask = await res.json();
      setTasks(prev => prev.map(t => (t === tempTask ? savedTask : t)));
    } catch (err: any) {
      setError(err.message);
      setTasks(prev => prev.filter(t => t !== tempTask)); // rollback
    }
  };

  const deleteTask = async (index: number) => {
    const taskToDelete = tasks[index];
    setTasks(prev => prev.filter((_, i) => i !== index)); // optimistic
    try {
      const res = await fetch(`http://localhost:8000/tasks/${index}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete task");
    } catch (err: any) {
      setError(err.message);
      setTasks(prev => {
        const copy = [...prev];
        copy.splice(index, 0, taskToDelete); // rollback
        return copy;
      });
    }
  };

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditingTitle(tasks[index].title);
  };

  const saveEdit = async (index: number) => {
    const oldTask = tasks[index];
    const updatedTask = { title: editingTitle };
    setTasks(prev => prev.map((t, i) => (i === index ? updatedTask : t))); // optimistic
    setEditingIndex(null);
    setEditingTitle("");

    try {
      const res = await fetch(`http://localhost:8000/tasks/${index}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const savedTask = await res.json();
      setTasks(prev => prev.map((t, i) => (i === index ? savedTask : t)));
    } catch (err: any) {
      setError(err.message);
      setTasks(prev => prev.map((t, i) => (i === index ? oldTask : t))); // rollback
    }
  };

  return (
    <div className="App">
      <h1>Task Board</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      <div>
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Add new task"
          disabled={loading}
        />
        <button onClick={addTask} disabled={loading || !newTask.trim()}>
          Add
        </button>
      </div>

      <ul>
        {tasks.map((task, i) => (
          <li key={i}>
            {editingIndex === i ? (
              <>
                <input
                  value={editingTitle}
                  onChange={e => setEditingTitle(e.target.value)}
                  disabled={loading}
                />
                <button onClick={() => saveEdit(i)} disabled={loading}>
                  Save
                </button>
              </>
            ) : (
              <>
                {task.title}
                <button onClick={() => startEdit(i)} disabled={loading}>
                  Edit
                </button>
                <button onClick={() => deleteTask(i)} disabled={loading}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

