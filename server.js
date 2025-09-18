const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = __dirname + "/tasks.json";

if (!fs.existsSync(FILE)) {
  fs.writeJsonSync(FILE, []);
}

app.get("/tasks", async (req, res) => {
  const tasks = await fs.readJson(FILE);
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const tasks = await fs.readJson(FILE);
  const newTask = { id: Date.now(), ...req.body };
  tasks.push(newTask);
  await fs.writeJson(FILE, tasks);
  res.json(newTask);
});

app.put("/tasks/:id", async (req, res) => {
  const tasks = await fs.readJson(FILE);
  const id = parseInt(req.params.id);
  const updated = tasks.map(t => (t.id === id ? { ...t, ...req.body } : t));
  await fs.writeJson(FILE, updated);
  res.json({ success: true });
});

app.delete("/tasks/:id", async (req, res) => {
  const tasks = await fs.readJson(FILE);
  const id = parseInt(req.params.id);
  const filtered = tasks.filter(t => t.id !== id);
  await fs.writeJson(FILE, filtered);
  res.json({ success: true });
});

app.listen(4000, () => console.log("✅ Backend rodando na porta 4000"));
