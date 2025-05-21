const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// Create
router.post('/', async (req, res) => {
  const todo = new Todo(req.body);
  const saved = await todo.save();
  res.status(201).json(saved);
});

// Read
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Update
router.put('/:id', async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
