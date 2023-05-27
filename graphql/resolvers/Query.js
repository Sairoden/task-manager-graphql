const { getAllTasks, getTask } = require("../tasks/tasksResolver");

const Query = {
  getAllTasks,
  getTask,
};

module.exports = Query;
