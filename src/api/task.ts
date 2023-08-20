import { CreateTask, UpdateTask } from "../interfaces/task.interface";

const API = "http://localhost:3000/api";

export const getTaskReq = () => fetch(`${API}/tasks`);

export const createTaskReq = (task: CreateTask) =>
  fetch(`${API}/tasks`, {
    method: "POST",
    body: JSON.stringify(task),
    headers: { "Content-Type": "application/json" },
  });

export const updateTaskReq = (id: string, task: UpdateTask) =>
  fetch(`${API}/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(task),
    headers: { "Content-Type": "application/json" },
  });

export const deleteTaskReq = (id: string) =>
  fetch(`${API}/tasks/${id}`, { method: "DELETE" });
