const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/todos', todoRoutes);
const path = require('path');

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../public')));

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error(err));

module.exports = app; // for testing
