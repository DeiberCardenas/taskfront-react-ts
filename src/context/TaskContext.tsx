import { createContext, useState, useEffect } from "react";
import {
  getTaskReq,
  createTaskReq,
  updateTaskReq,
  deleteTaskReq,
} from "../api/task";
import { Task, CreateTask, UpdateTask } from "../interfaces/task.interface";

interface TaskContextValue {
  tasks: Task[];
  createTask: (task: CreateTask) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (id: string, task: UpdateTask) => Promise<void>;
}

export const TaskContext = createContext<TaskContextValue>({
  tasks: [],
  createTask: async () => {},
  deleteTask: async () => {},
  updateTask: async () => {},
});

interface Props {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<Props> = ({ children }) => {
  const [tasks, setTask] = useState<Task[]>([]);

  useEffect(() => {
    getTaskReq()
      .then((res) => res.json())
      .then((data) => setTask(data));
  }, []);

  const createTask = async (task: CreateTask) => {
    const res = await createTaskReq(task);
    const data = await res.json();

    setTask([...tasks, data]);
  };

  const updateTask = async (id: string, task: UpdateTask) => {
    const res = await updateTaskReq(id, task);
    const data = await res.json();
    setTask(
      tasks.map((task) => (task._id === id ? { ...task, ...data } : task))
    );
  };

  const deleteTask = async (id: string) => {
    const res = await deleteTaskReq(id);
    if (res.status === 204) {
      setTask(tasks.filter((task) => task._id !== id));
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
