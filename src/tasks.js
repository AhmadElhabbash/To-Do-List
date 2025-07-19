import { getTasks, saveTasks } from "./storage.js";

let tasks = getTasks();

export const getAllTasks = () => tasks;

export const addTask = (text, date) => {
  tasks.push({ text, done: false, date });
  saveTasks(tasks);
};

export const deleteTask = (index) => {
  tasks.splice(index, 1);
  saveTasks(tasks);
};

export const updateTask = (index, newText, newDate) => {
  tasks[index].text = newText;
  tasks[index].date = newDate;
  saveTasks(tasks);
};

export const toggleTaskDone = (index, done) => {
  tasks[index].done = done;
  saveTasks(tasks);
};

export const filterAndSortTasks = (searchQuery, filter, sort) => {
  const today = new Date().toISOString().split("T")[0];

  let result = tasks.filter((t) => {
    let matchesSearch = t.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    let matchesFilter =
      filter === "done"
        ? t.done
        : filter === "not-done"
        ? !t.done
        : filter === "today"
        ? t.date === today
        : true;
    return matchesSearch && matchesFilter;
  });

  if (sort === "latest") result.reverse();
  else if (sort === "done") result.sort((a, b) => b.done - a.done);
  else if (sort === "not-done") result.sort((a, b) => a.done - b.done);
  else if (sort === "by-date")
    result.sort((a, b) => new Date(b.date) - new Date(a.date));

  return result;
};

export const exportTasksAsCSV = () => {
  const csvContent = [
    ["النص", "التاريخ", "منجز؟"],
    ...tasks.map((t) => [
      `"${t.text.replace(/"/g, '""')}"`,
      t.date,
      t.done ? "✔" : "✘",
    ]),
  ]
    .map((row) => row.join(";"))
    .join("\n");

  const blob = new Blob(["\uFEFF" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `Tasks_${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getTaskCounts = () => {
  return {
    total: tasks.length,
    done: tasks.filter((t) => t.done).length,
    notDone: tasks.filter((t) => !t.done).length,
  };
};
