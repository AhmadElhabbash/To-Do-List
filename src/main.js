const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${task}
      <button onclick="deleteTask(${index})">X</button>
    `;
    taskList.appendChild(li);
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}
window.deleteTask = deleteTask;

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = taskInput.value.trim();
  if (task !== "") {
    tasks.push(task);
    taskInput.value = "";
    saveTasks();
    renderTasks();
  }
});

renderTasks();
