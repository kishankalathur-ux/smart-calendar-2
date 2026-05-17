<<<<<<< HEAD
const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// Connect to SQLite
const db = new Database("database.db");

// Create tables
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS availability (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  date TEXT NOT NULL,
  start INTEGER NOT NULL,
  end INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  desc TEXT
);
`);

/* ---------------- USERS ---------------- */
app.get("/users", (req, res) => {
  const rows = db.prepare("SELECT username FROM users").all();
  res.json(rows.map(r => r.username));
});

app.post("/users", (req, res) => {
  const { username } = req.body;
  try {
    db.prepare("INSERT INTO users (username) VALUES (?)").run(username);
    res.json({ success: true });
  } catch {
    res.json({ success: false, error: "User already exists" });
  }
});

app.delete("/users", (req, res) => {
  const { username } = req.body;
  db.prepare("DELETE FROM users WHERE username=?").run(username);
  db.prepare("DELETE FROM availability WHERE username=?").run(username);
  res.json({ success: true });
});

/* ---------------- AVAILABILITY ---------------- */
app.get("/availability", (req, res) => {
  const rows = db.prepare("SELECT * FROM availability").all();
  res.json(rows);
});

app.post("/availability", (req, res) => {
  const { username, date, start, end } = req.body;
  db.prepare(`
    INSERT INTO availability (username, date, start, end)
    VALUES (?, ?, ?, ?)
  `).run(username, date, start, end);
  res.json({ success: true });
});

app.delete("/availability", (req, res) => {
  const { username, date } = req.body;
  db.prepare(`
    DELETE FROM availability
    WHERE username=? AND date=?
  `).run(username, date);
  res.json({ success: true });
});

/* ---------------- EVENTS ---------------- */
app.get("/events", (req, res) => {
  const rows = db.prepare("SELECT * FROM events").all();
  res.json(rows);
});

app.post("/events", (req, res) => {
  const { title, date, desc } = req.body;
  db.prepare(`
    INSERT INTO events (title, date, desc)
    VALUES (?, ?, ?)
  `).run(title, date, desc);
  res.json({ success: true });
});

app.delete("/events", (req, res) => {
  const { title } = req.body;
  db.prepare("DELETE FROM events WHERE title=?").run(title);
  res.json({ success: true });
});

/* ---------------- START SERVER ---------------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
=======
const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// Connect to SQLite
const db = new Database("database.db");

// Create tables
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS availability (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  date TEXT NOT NULL,
  start INTEGER NOT NULL,
  end INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  desc TEXT
);
`);

/* ---------------- USERS ---------------- */
app.get("/users", (req, res) => {
  const rows = db.prepare("SELECT username FROM users").all();
  res.json(rows.map(r => r.username));
});

app.post("/users", (req, res) => {
  const { username } = req.body;
  try {
    db.prepare("INSERT INTO users (username) VALUES (?)").run(username);
    res.json({ success: true });
  } catch {
    res.json({ success: false, error: "User already exists" });
  }
});

app.delete("/users", (req, res) => {
  const { username } = req.body;
  db.prepare("DELETE FROM users WHERE username=?").run(username);
  db.prepare("DELETE FROM availability WHERE username=?").run(username);
  res.json({ success: true });
});

/* ---------------- AVAILABILITY ---------------- */
app.get("/availability", (req, res) => {
  const rows = db.prepare("SELECT * FROM availability").all();
  res.json(rows);
});

app.post("/availability", (req, res) => {
  const { username, date, start, end } = req.body;
  db.prepare(`
    INSERT INTO availability (username, date, start, end)
    VALUES (?, ?, ?, ?)
  `).run(username, date, start, end);
  res.json({ success: true });
});

app.delete("/availability", (req, res) => {
  const { username, date } = req.body;
  db.prepare(`
    DELETE FROM availability
    WHERE username=? AND date=?
  `).run(username, date);
  res.json({ success: true });
});

/* ---------------- EVENTS ---------------- */
app.get("/events", (req, res) => {
  const rows = db.prepare("SELECT * FROM events").all();
  res.json(rows);
});

app.post("/events", (req, res) => {
  const { title, date, desc } = req.body;
  db.prepare(`
    INSERT INTO events (title, date, desc)
    VALUES (?, ?, ?)
  `).run(title, date, desc);
  res.json({ success: true });
});

app.delete("/events", (req, res) => {
  const { title } = req.body;
  db.prepare("DELETE FROM events WHERE title=?").run(title);
  res.json({ success: true });
});

/* ---------------- START SERVER ---------------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
>>>>>>> ed7bcc0400ad3a420ace30d9e009c1999c86fa63
