import { addTask, toggleDone, editTask, deleteTask } from "./tasks.js";
import { renderTasks, setFilter, setSearchQuery } from "./ui.js";

const taskInput = document.getElementById("task-input");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll("#filters button");
const addTaskBtn = document.getElementById("addTaskBtn");

window.toggleDone = toggleDone;
window.editTask = editTask;
window.deleteTask = deleteTask;

addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault(); // حتى لا يعمل reload للصفحة
  const task = taskInput.value.trim();
  if (task) {
    addTask(task);
    taskInput.value = "";
    renderTasks();
  }
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setFilter(btn.dataset.filter);
    renderTasks();
  });
});

searchInput.addEventListener("input", (e) => {
  setSearchQuery(e.target.value.trim());
  renderTasks();
});

renderTasks();
