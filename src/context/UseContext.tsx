import { useContext } from "react";
import { TaskContext } from "./TaskContext";

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks debe estar dentro de TaskProvider");
  }
  return context;
};
