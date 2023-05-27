const {
  createTask,
  updateTask,
  deleteTask,
} = require("../tasks/tasksResolver");

const Mutation = {
  createTask,
  updateTask,
  deleteTask,
};

module.exports = Mutation;
