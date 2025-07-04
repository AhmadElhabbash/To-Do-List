import { tasks, toggleDone, editTask, deleteTask } from "./tasks.js";

let currentFilter = "all";
let searchQuery = "";

export function setFilter(filter) {
  currentFilter = filter;
}

export function setSearchQuery(query) {
  searchQuery = query;
}

const taskList = document.getElementById("task-list");

export function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const matchesFilter =
      currentFilter === "all" ||
      (currentFilter === "done" && task.done) ||
      (currentFilter === "not-done" && !task.done);

    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (matchesFilter && matchesSearch) {
      const li = document.createElement("li");
      li.innerHTML = `
        <input type="checkbox" onchange="toggleDone(${index})" ${
        task.done ? "checked" : ""
      }>
        <span contenteditable="true" onblur="editTask(${index}, this.textContent)" style="flex: 1; text-decoration: ${
        task.done ? "line-through" : "none"
      }">
          ${task.text}
        </span>
        <button onclick="deleteTask(${index})">X</button>
      `;
      taskList.appendChild(li);
    }
  });
  updateTasksCounter();
}

function updateTasksCounter() {
  const completed = tasks.filter((t) => t.done).length;
  const remaining = tasks.length - completed;

  document.getElementById("completedCount").textContent = completed;
  document.getElementById("remainingCount").textContent = remaining;
}
