const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide a name"],
    trim: true,
    minlength: [3, "name can not be less than 3 characters"],
    maxlength: [20, "name can not be more than 20 characters"],
  },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
