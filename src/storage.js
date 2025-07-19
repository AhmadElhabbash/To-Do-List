// 📁 storage.js
export const getTasks = () => {
  return JSON.parse(localStorage.getItem("T")) || [];
};

export const saveTasks = (tasks) => {
  localStorage.setItem("T", JSON.stringify(tasks));
};
