import { useTask } from "../context/UseContext";
import { Task } from "../interfaces/task.interface";
import { IoCheckmarkCircleSharp, IoTrash } from "react-icons/io5";

interface Props {
  task: Task;
}

function TaskItem({ task }: Props) {
  const { updateTask, deleteTask } = useTask();

  return (
    <div
      key={task._id}
      className="bg-gray-900 p-2 m-2 flex justify-between hover:bg-gray-800 hover:cursor-pointer"
    >
      <div>
        <h1>{task.title}</h1>
        <p>{task.description}</p>
      </div>
      <div className="flex gap-x-2">
        {task.done ? (
          <IoCheckmarkCircleSharp
            className="text-green-600"
            onClick={async () => {
              await updateTask(task._id, { done: !task.done });
            }}
          ></IoCheckmarkCircleSharp>
        ) : (
          <IoCheckmarkCircleSharp
            className="text-grey-600"
            onClick={async () => {
              await updateTask(task._id, { done: !task.done });
            }}
          ></IoCheckmarkCircleSharp>
        )}

        <IoTrash
          onClick={async () => {
            if (!window.confirm("¿Estás seguro de querer eliminar la tarea?")) {
              return;
            }
            await deleteTask(task._id);
          }}
        ></IoTrash>
      </div>
    </div>
  );
}

export default TaskItem;
