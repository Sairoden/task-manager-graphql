const taskIDDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const taskCompletedDOM = document.querySelector(".task-edit-completed");
const editFormDOM = document.querySelector(".single-task-form");
const editBtnDOM = document.querySelector(".task-edit-btn");
const formAlertDOM = document.querySelector(".form-alert");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");
let tempName;

const showTask = async () => {
  try {
    const res = await axios("http://localhost:3000/graphql", {
      method: "post",
      data: {
        query: `
        query {
          getTask(id: ${JSON.stringify(id)}) {
            id
            name
            completed
          }
        }
      `,
      },
    });

    const task = res.data.data.getTask;
    const { id: taskID, completed, name } = task;

    taskIDDOM.textContent = taskID;
    taskNameDOM.value = name;
    tempName = name;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
  } catch (error) {
    console.log(error);
  }
};

showTask();

editFormDOM.addEventListener("submit", async e => {
  editBtnDOM.textContent = "Loading...";
  e.preventDefault();
  try {
    const taskName = taskNameDOM.value;
    const taskCompleted = taskCompletedDOM.checked;

    // const {
    //   data: { task },
    // } = await axios.patch(`/api/v1/tasks/${id}`, {
    //   name: taskName,
    //   completed: taskCompleted,
    // });

    const res = await axios("http://localhost:3000/graphql", {
      method: "post",
      data: {
        query: `
          mutation {
            updateTask(id: ${JSON.stringify(id)}, name: ${JSON.stringify(
          taskName
        )}, completed: ${JSON.stringify(taskCompleted)}) {
              id
              name
              completed
            }
          }
        `,
      },
    });

    const task = res.data.data.updateTask;

    const { id: taskID, completed, name } = task;

    taskIDDOM.textContent = taskID;
    taskNameDOM.value = name;
    tempName = name;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `success, edited task`;
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    console.error(error);
    taskNameDOM.value = tempName;
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `error, please try again`;
  }
  editBtnDOM.textContent = "Edit";
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});