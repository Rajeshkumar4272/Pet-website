const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all toys
router.get('/', (req, res) => {
    db.all('SELECT * FROM toy', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Add new toy
router.post('/', (req, res) => {
    const { name, price } = req.body;
    db.run('INSERT INTO toy (name, price) VALUES (?, ?)', [name, price], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, name, price });
    });
});

// Update toy
router.put('/:id', (req, res) => {
    const { name, price } = req.body;
    db.run('UPDATE toy SET name = ?, price = ? WHERE id = ?', [name, price, req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Toy updated' });
    });
});

// Delete toy
router.delete('/:id', (req, res) => {
    db.run('DELETE FROM toy WHERE id = ?', [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Toy deleted' });
    });
});

module.exports = router;
