const Task = require("./tasksModel");

const getAllTasks = async (parent, args, ctx, info) => {
  try {
    const tasks = await Task.find();

    if (!tasks) throw new Error("There are no tasks");

    return tasks;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const createTask = async (parent, args, ctx, info) => {
  try {
    const newTask = await Task.create(args);

    if (!newTask) throw new Error("Creating task incompleted");

    return newTask;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getTask = async (parent, args, ctx, info) => {
  try {
    const task = Task.findById(args.id);

    if (!task) throw new Error("Task id not found");

    return task;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateTask = async (parent, args, ctx, info) => {
  try {
    const task = await Task.findByIdAndUpdate(args.id, args, { new: true });

    if (!task) throw new Error("Task id not found");

    return task;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteTask = async (parent, args, ctx, info) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(args.id);

    if (!deletedTask) throw new Error("Task id not found");

    return deletedTask;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
