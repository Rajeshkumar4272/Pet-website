const express = require('express');
const cors = require('cors');
const db = require('../pet-database/db'); // 🟣 connect database
const foodRoutes = require('./routes/foodRoutes');
const toyRoutes = require('./routes/toyRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/food', foodRoutes);
app.use('/api/toys', toyRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Aino Petz Backend 🐾');
});

app.listen(5000, () => {
    console.log('Aino Petz Backend running on http://localhost:5000');
});
