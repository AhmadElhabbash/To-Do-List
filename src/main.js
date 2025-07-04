const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all"; // فلتر افتراضي
let searchQuery = "";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "done" && task.done) ||
      (filter === "not-done" && !task.done);

    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (matchesFilter && matchesSearch) {
      const li = document.createElement("li");
      li.innerHTML = `
        <input type="checkbox" onchange="toggleDone(${index})" ${
        task.done ? "checked" : ""
      }>
        <span contenteditable="true" onblur="editTask(${index}, this)" style="flex: 1; text-decoration: ${
        task.done ? "line-through" : "none"
      }">
          ${task.text}
        </span>
        <button onclick="deleteTask(${index})">X</button>
      `;
      taskList.appendChild(li);
    }
  });
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks(currentFilter);
}
window.toggleDone = toggleDone;

function editTask(index, el) {
  const newValue = el.innerText.trim();
  if (newValue !== "") {
    tasks[index].text = newValue;
    saveTasks();
  }
}
window.editTask = editTask;

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks(currentFilter);
}
window.deleteTask = deleteTask;

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = taskInput.value.trim();
  if (task !== "") {
    tasks.push({ text: task, done: false });
    taskInput.value = "";
    saveTasks();
    renderTasks(currentFilter);
  }
});

// ✅ فلتر الأزرار: All, Done, Not Done
document.querySelectorAll("#filters button").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    renderTasks(currentFilter);
  });
});

document.getElementById("searchInput").addEventListener("input", function (e) {
  searchQuery = e.target.value.trim();
  renderTasks(currentFilter);
});

renderTasks();
