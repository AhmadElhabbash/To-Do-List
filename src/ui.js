import {
  getAllTasks,
  addTask,
  deleteTask,
  updateTask,
  toggleTaskDone,
  filterAndSortTasks,
  exportTasksAsCSV,
  getTaskCounts,
} from "./tasks.js";

export const setupUI = () => {
  const input = document.getElementById("task-input");
  const dateInput = document.getElementById("task-date");
  const form = document.getElementById("task-form");
  const list = document.getElementById("task-list");
  const totalC = document.getElementById("total-count");
  const doneC = document.getElementById("done-count");
  const notDoneC = document.getElementById("not-done-count");
  const search = document.getElementById("search");
  const sort = document.getElementById("sort-tasks");
  const exportBtn = document.getElementById("export-btn");

  let currentFilter = "";
  let searchQuery = "";
  let currentSort = "oldest";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    const date = dateInput.value;
    if (!text) return;
    addTask(text, date);
    input.value = "";
    dateInput.value = "";
    render();
  });

  document.querySelectorAll("#filters button").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentFilter = btn.dataset.filter;
      render();
    });
  });

  search.addEventListener("input", () => {
    searchQuery = search.value.trim();
    render();
  });

  sort.addEventListener("change", () => {
    currentSort = sort.value;
    render();
  });

  exportBtn.addEventListener("click", exportTasksAsCSV);

  function render() {
    list.innerHTML = "";
    const tasks = filterAndSortTasks(searchQuery, currentFilter, currentSort);
    const today = new Date().setHours(0, 0, 0, 0);

    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      const dateSpan = document.createElement("small");

      span.textContent = task.text;
      dateSpan.textContent = task.date;
      span.style.textDecoration = task.done ? "line-through" : "none";

      const taskDateObj = new Date(task.date).setHours(0, 0, 0, 0);
      if (task.done) {
        li.style.backgroundColor = "#c7f8d3ff";
        li.style.border = "1px solid #28a745";
      } else if (taskDateObj < today) {
        li.style.backgroundColor = "#f8d7da";
        li.style.border = "1px solid #dc3545";
      } else {
        li.style.backgroundColor = "#fff3cd";
        li.style.border = "1px solid #ffc107";
      }

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.done;
      checkbox.addEventListener("change", () => {
        toggleTaskDone(getAllTasks().indexOf(task), checkbox.checked);
        render();
      });

      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      delBtn.addEventListener("click", () => {
        deleteTask(getAllTasks().indexOf(task));
        render();
      });

      const editBtn = document.createElement("button");
      editBtn.textContent = "✏️";
      editBtn.addEventListener("click", () => {
        li.innerHTML = "";
        const editInput = document.createElement("input");
        editInput.value = task.text;
        const editDate = document.createElement("input");
        editDate.type = "date";
        editDate.value = task.date;
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "💾";
        saveBtn.addEventListener("click", () => {
          updateTask(
            getAllTasks().indexOf(task),
            editInput.value.trim(),
            editDate.value
          );
          render();
        });
        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "إلغاء";
        cancelBtn.addEventListener("click", () => render());

        li.append(editInput, editDate, saveBtn, cancelBtn);
      });

      li.append(checkbox, span, dateSpan, delBtn, editBtn);
      list.appendChild(li);
    });

    if (tasks.length === 0) {
      const li = document.createElement("li");
      li.textContent = "لا يوجد نتائج مطابقة";
      list.appendChild(li);
    }

    const counts = getTaskCounts();
    totalC.textContent = counts.total;
    doneC.textContent = counts.done;
    notDoneC.textContent = counts.notDone;
  }

  render();
};
