import { saveTasks, loadTasks } from "./storage.js";

export let tasks = loadTasks();

export function addTask(text) {
  tasks.push({ text, done: false });
  saveTasks(tasks);
}

export function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks(tasks);
}

export function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks(tasks);
}

export function editTask(index, newText) {
  tasks[index].text = newText;
  saveTasks(tasks);
}
