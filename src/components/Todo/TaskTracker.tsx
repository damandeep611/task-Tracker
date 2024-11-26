import { useState } from "react";
import TaskForm from "../TaskForm";
import TaskCard from "./TaskCard";
import { basicTodoLogic } from "@/hooks/basicTodoLogic";
import { Task } from "@/types/task.types";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import ColumnDrop from "./ColumnDrop";

export default function TaskTracker() {
  const {
    tasks,
    addTask,
    deleteTask,
    toggleTask,

    columns,
    moveTask,
  } = basicTodoLogic();

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  function handleDragStart(event: DragStartEvent) {
    const task = tasks.find((task) => task.id === Number(event.active.id));
    setActiveTask(task || null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeTaskId = Number(active.id);
    const overColumnId = String(over.id);

    moveTask(activeTaskId, overColumnId);
    setActiveTask(null);
  }
  function handleDragCancel() {
    setActiveTask(null);
  }
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <section className="mx-auto flex flex-col rounded-lg shadow-lg p-6 mt-6 bg-white">
        <TaskForm onAddTask={addTask} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {tasks.length === 0 ? (
            <p className="col-span-3 text-center text-gray-500 py-6">
              No tasks added yet. Add one to get started!
            </p>
          ) : (
            // adding an check to columns to avoid array error
            Array.isArray(columns) &&
            columns.map((column) => (
              <ColumnDrop
                key={column.id}
                column={column}
                onDelete={deleteTask}
                onToggle={toggleTask}
              />
            ))
          )}
        </div>
        <DragOverlay>
          {activeTask ? (
            <TaskCard
              task={activeTask}
              onDelete={deleteTask}
              onToggle={toggleTask}
            />
          ) : null}
        </DragOverlay>
      </section>
    </DndContext>
  );
}
