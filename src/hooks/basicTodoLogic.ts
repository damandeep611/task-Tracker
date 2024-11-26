import { Column, Task } from "@/types/task.types";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export const basicTodoLogic = () => {
  // storing tasks from local storage
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const savedTasks = localStorage.getItem("todos");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error("Error loading tasks:", error);
      return [];
    }
  });

  //  and the we will initialize columns as an array
  const [columns, setColumns] = useState<Column[]>(() => [
    { id: "todo", title: "Todo", tasks: [] },
    { id: "InProgress", title: "In Progress", tasks: [] },
    { id: "completed", title: "Completed", tasks: [] },
  ]);

  // respective todos loading in assigned columns
  useEffect(() => {
    const todoTasks = tasks.filter((task) => !task.isCompleted);
    const completedTasks = tasks.filter((task) => task.isCompleted);

    setColumns([
      { id: "todo", title: "Todo", tasks: todoTasks },
      { id: "inProgress", title: "In Progress", tasks: [] },
      { id: "completed", title: "Completed tasks", tasks: completedTasks },
    ]);
    // as it will only run once so no dependncy
  }, []);

  //  save tasks to storage when they change , so [tasks] as dependency

  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  }, [tasks]);

  // add task fn
  const addTask = (text: string) => {
    if (text.trim() !== "") {
      const newTaskItem = {
        id: Date.now(),
        text: text.trim(),
        isCompleted: false,
        createdAt: format(new Date(), "MMM d, yyyy HH:mm"),
      };

      // Update tasks state
      setTasks((prevTasks) => [...prevTasks, newTaskItem]);

      // Update columns state
      setColumns((prevColumns) =>
        prevColumns.map((column) =>
          column.id === "todo"
            ? { ...column, tasks: [...column.tasks, newTaskItem] }
            : column
        )
      );
    }
  };

  const deleteTask = (id: number) => {
    // Update tasks state
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

    // Update columns state
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== id),
      }))
    );
  };

  const toggleTask = (id: number) => {
    // Update tasks state
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );

    // Update columns state and move task between columns
    setColumns((prevColumns) => {
      // find the task and it's curretn column
      let taskToMove: Task | undefined;
      let sourceColumnId: string = "";

      prevColumns.forEach((column) => {
        const task = column.tasks.find((t) => t.id === id);
        if (task) {
          taskToMove = task;
          sourceColumnId = column.id;
        }
      });

      if (!taskToMove) return prevColumns;

      // determine target column based on completion status
      const targetColumnId = !taskToMove.isCompleted ? "completed" : "todo";
      // create updated task
      const updatedTask = {
        ...taskToMove,
        isCompleted: !taskToMove.isCompleted,
      };

      // update columns array
      return prevColumns.map((column) => {
        if (column.id === sourceColumnId) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== id),
          };
        }
        if (column.id === targetColumnId) {
          return {
            ...column,
            tasks: [...column.tasks, updatedTask],
          };
        }
        return column;
      });
    });
  };

  // move tasks
  const moveTask = (taskId: number, targetColumnId: string) => {
    setColumns((prevColumns) => {
      let taskToMove: Task | undefined;
      let sourceColumnId: string | undefined;

      for (const column of prevColumns) {
        const task = column.tasks.find((t) => t.id === taskId);
        if (task) {
          taskToMove = task;
          sourceColumnId = column.id;
          break;
        }
      }
      if (!taskToMove || !sourceColumnId || sourceColumnId === targetColumnId) {
        return prevColumns;
      }

      return prevColumns.map((column) => {
        if (column.id === sourceColumnId) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== taskId),
          };
        }
        if (column.id === targetColumnId) {
          return {
            ...column,
            tasks: [...column.tasks, taskToMove as Task],
          };
        }
        return column;
      });
    });
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
    columns,
    setColumns,
    taskStats,
    moveTask,
  };
};
