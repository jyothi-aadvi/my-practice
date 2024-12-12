
const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db'); 

const Project = require('./models/project');
const Task = require('./models/task');

const app = express();
const port = 3000;


app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.post('/projects', async (req, res) => {
  try {
    const { name, description } = req.body;
    const newProject = new Project({ name, description });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/projects/:projectId/tasks', async (req, res) => {
  try {
    const { label, description, priority, dueDate } = req.body;
    const { projectId } = req.params;

    console.log('Received projectId:', projectId);

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ error: 'Invalid projectId format' });
    }

    const project = await Project.findById(projectId);
    console.log('Project found:', project); 

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const newTask = new Task({
      label,
      description,
      priority,
      dueDate,
      projectId
    });

    await newTask.save();
    res.status(201).json(newTask); 
  } catch (err) {
    console.error('Error:', err);
    res.status(400).json({ error: err.message });
  }
});

app.get('/projects/:projectId/tasks', async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await Task.find({ projectId });

    if (!tasks.length) {
      return res.status(404).json({ error: 'No tasks found for this project' });
    }

    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/tasks/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const updates = req.body;

    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/tasks/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
