import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:4000/tasks";

export default function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const loadTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    await axios.post(API, { title: newTask, status: "todo" });
    setNewTask("");
    loadTasks();
  };

  const updateTask = async (id, status) => {
    await axios.put(`${API}/${id}`, { status });
    loadTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const columns = ["todo", "doing", "done"];

  return (
    <div>
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Nova tarefa"
      />
      <button onClick={addTask}>Adicionar</button>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        {columns.map((col) => (
          <div key={col} style={{ flex: 1, border: "1px solid #ccc", padding: 10 }}>
            <h3>{col.toUpperCase()}</h3>
            {tasks.filter((t) => t.status === col).map((t) => (
              <div key={t.id} style={{ border: "1px solid #999", margin: 5, padding: 5 }}>
                <p>{t.title}</p>
                {columns.map((c) =>
                  c !== t.status ? (
                    <button key={c} onClick={() => updateTask(t.id, c)}>
                      Mover para {c}
                    </button>
                  ) : null
                )}
                <button onClick={() => deleteTask(t.id)}>Excluir</button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}