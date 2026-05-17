const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
const db = new Database("database.db");

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Create tables if not exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS availability (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL
  )
`).run();

// Routes
app.get("/users", (req, res) => {
  const users = db.prepare("SELECT * FROM users").all();
  res.json(users);
});

app.post("/users", (req, res) => {
  const { name } = req.body;
  db.prepare("INSERT INTO users (name) VALUES (?)").run(name);
  res.json({ success: true });
});

app.get("/availability", (req, res) => {
  const rows = db.prepare("SELECT * FROM availability").all();
  res.json(rows);
});

app.post("/availability", (req, res) => {
  const { user_id, date, start_time, end_time } = req.body;
  db.prepare(`
    INSERT INTO availability (user_id, date, start_time, end_time)
    VALUES (?, ?, ?, ?)
  `).run(user_id, date, start_time, end_time);
  res.json({ success: true });
});

app.get("/events", (req, res) => {
  const events = db.prepare("SELECT * FROM events").all();
  res.json(events);
});

app.post("/events", (req, res) => {
  const { title, date, start_time, end_time } = req.body;
  db.prepare(`
    INSERT INTO events (title, date, start_time, end_time)
    VALUES (?, ?, ?, ?)
  `).run(title, date, start_time, end_time);
  res.json({ success: true });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
