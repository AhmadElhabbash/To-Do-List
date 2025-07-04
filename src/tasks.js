import { saveTasks, loadTasks } from "./storage.js";
import { renderTasks } from "./ui.js";

export let tasks = loadTasks();

export function addTask(text) {
  tasks.push({ text, done: false });
  saveTasks(tasks);
  renderTasks();
}

export function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

export function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks(tasks);
  renderTasks();
}

export function editTask(index, newText) {
  tasks[index].text = newText;
  saveTasks(tasks);
  renderTasks();
}
