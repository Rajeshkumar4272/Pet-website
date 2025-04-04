const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./aino_petz.db');

db.serialize(() => {
    // Create Food table
    db.run(`CREATE TABLE IF NOT EXISTS food (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL
    )`);

    // Create Toy table
    db.run(`CREATE TABLE IF NOT EXISTS toy (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL
    )`);
});

module.exports = db;
