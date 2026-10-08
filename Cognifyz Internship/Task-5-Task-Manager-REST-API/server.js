/**
 * Task 5: API Integration and Front-End Interaction
 * -------------------------------------------------
 * A simple RESTful API (Express) for managing "tasks",
 * plus a static front-end (in /public) that consumes it.
 *
 * Endpoints:
 *   GET    /api/tasks         -> list all tasks
 *   GET    /api/tasks/:id     -> get a single task
 *   POST   /api/tasks         -> create a task
 *   PUT    /api/tasks/:id     -> update a task (full or partial)
 *   DELETE /api/tasks/:id     -> delete a task
 */

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ---- In-memory "database" ----------------------------------------------
// (Replace this with a real database, e.g. SQLite/Postgres/MongoDB, for
// anything beyond a learning exercise.)
let tasks = [
  { id: 1, title: "Solve two problems in java", completed: true },
  { id: 2, title: "Learn new topics today", completed: false },
  { id: 3, title: "create repository in github", completed: false },
];
let nextId = 4;

// ---- Helpers -------------------------------------------------------------
function findTaskIndex(id) {
  return tasks.findIndex((t) => t.id === Number(id));
}

// ---- CRUD ROUTES ----------------------------------------------------------

// CREATE
app.post("/api/tasks", (req, res) => {
  const { title, completed = false } = req.body;

  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "A non-empty 'title' string is required." });
  }

  const newTask = { id: nextId++, title: title.trim(), completed: Boolean(completed) };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// READ (all)
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// READ (one)
app.get("/api/tasks/:id", (req, res) => {
  const index = findTaskIndex(req.params.id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });
  res.json(tasks[index]);
});

// UPDATE
app.put("/api/tasks/:id", (req, res) => {
  const index = findTaskIndex(req.params.id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });

  const { title, completed } = req.body;

  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ error: "'title' must be a non-empty string." });
    }
    tasks[index].title = title.trim();
  }

  if (completed !== undefined) {
    tasks[index].completed = Boolean(completed);
  }

  res.json(tasks[index]);
});

// DELETE
app.delete("/api/tasks/:id", (req, res) => {
  const index = findTaskIndex(req.params.id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });

  const [deleted] = tasks.splice(index, 1);
  res.json({ message: "Task deleted", task: deleted });
});

// Fallback: serve the front-end for any other GET route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
