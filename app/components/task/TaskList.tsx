import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useFetchTasksQuery,
  useUpdateTaskMutation,
} from "@/app/redux/features/task/task.api";
import React, { useState } from "react";

const TaskList = () => {
  const { data: tasks = [], refetch } = useFetchTasksQuery({});
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const [editingTask, setEditingTask] = useState<{
    id: string;
    title: string;
    description: string;
  } | null>(null);
  const [taskInput, setTaskInput] = useState({ title: "", description: "" });
  console.log("this is tasks", tasks);
  const handleCreateTask = async () => {
    await createTask(taskInput);
    setTaskInput({ title: "", description: "" });
    refetch();
  };

  const handleUpdateTask = async () => {
    if (editingTask) {
      await updateTask({ id: editingTask.id, ...taskInput });
      setEditingTask(null);
      setTaskInput({ title: "", description: "" });
      refetch();
    }
  };

  const handleDeleteTask = async (id: unknown) => {
    await deleteTask(id);
    refetch();
  };

  const handleEditClick = (task: {
    _id: string;
    title: string;
    description: string;
  }) => {
    setEditingTask({
      id: task._id,
      title: task.title,
      description: task.description,
    });
    setTaskInput({ title: task.title, description: task.description });
  };

  return (
    <div className=" flex items-center justify-center min-h-screen bg-gray-100 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        {" "}
        <div className="">
          <h1 className="text-3xl font-semibold mb-4">
            Simbrella Task Management
          </h1>
          <div className="mb-4 flex-col">
            <input
              className="border p-2 mb-2"
              placeholder="Task Title"
              value={taskInput.title}
              onChange={(e) =>
                setTaskInput({ ...taskInput, title: e.target.value })
              }
            />
            <input
              className="border p-2 mr-2"
              placeholder="Task Description"
              value={taskInput.description}
              onChange={(e) =>
                setTaskInput({ ...taskInput, description: e.target.value })
              }
            />
            {editingTask ? (
              <button
                className="bg-green-500 text-white p-2 rounded"
                onClick={handleUpdateTask}
              >
                Update Task
              </button>
            ) : (
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={handleCreateTask}
              >
                Create Task
              </button>
            )}
          </div>
        </div>
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task._id} className="border p-4 mb-2 rounded-lg">
              <h2 className="text-xl font-bold">{task.title}</h2>
              <p>{task.description}</p>
              <button
                className="bg-yellow-500 text-white p-1 rounded mr-2"
                onClick={() => handleEditClick(task)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white p-1 rounded"
                onClick={() => handleDeleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
