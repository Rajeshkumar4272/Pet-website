const express = require('express');
const router = express.Router();
const db = require('../../pet-database/db');

// Get all food
router.get('/', (req, res) => {
    db.all('SELECT * FROM food', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Add new food
router.post('/', (req, res) => {
    const { name, price } = req.body;
    db.run('INSERT INTO food (name, price) VALUES (?, ?)', [name, price], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, name, price });
    });
});

// Delete food
router.delete('/:id', (req, res) => {
    db.run('DELETE FROM food WHERE id = ?', [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deletedID: req.params.id });
    });
});

// Update food
router.put('/:id', (req, res) => {
    const { name, price } = req.body;
    db.run('UPDATE food SET name = ?, price = ? WHERE id = ?', [name, price, req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ updatedID: req.params.id });
    });
});

module.exports = router;
