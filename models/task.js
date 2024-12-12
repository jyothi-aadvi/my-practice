const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  label: { type: String, required: true },
  description: { type: String },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  dueDate: { type: Date },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
