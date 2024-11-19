import { Task } from "@/types/task.types";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export const basicTodoLogic = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("todos");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // useEffect for local storage
  useEffect(() => {
    // stringify to convert the object into  a josn string as local storage supports storing strings as key and value pairs
    localStorage.setItem("todos", JSON.stringify(tasks));
    // tasks as dependency as the local storage will update whenever tasks state changes
  }, [tasks]);

  // adding the task

  // delete the task
  const addTask = (text: string) => {
    if (text.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: Date.now(),
          text: text.trim(),
          isCompleted: false,
          createdAt: format(new Date(), "MMM d, yyyy HH:mm"),
        },
      ]);
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // check completed task
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };
  const taskStats = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter((task) => task.isCompleted).length,
    pendingTasks:
      tasks.length - tasks.filter((task) => task.isCompleted).length,
  };

  return {
    tasks,
    setTasks,
    deleteTask,
    toggleTask,
    addTask,

    taskStats,
  };
};
