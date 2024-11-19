import TaskForm from "../TaskForm";

import TaskCard from "./TaskCard";
import { basicTodoLogic } from "@/hooks/basicTodoLogic";

export default function TaskTracker() {
  const { tasks, addTask, deleteTask, toggleTask, taskStats } =
    basicTodoLogic();

  return (
    <section className="max-w-md mx-auto flex flex-col rounded-lg shadow-lg p-6 mt-6 bg-white">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Task Tracker</h1>
        <p className="text-gray-500 mt-1">Manage your daily tasks</p>
      </header>

      <TaskForm onAddTask={addTask} />

      <main className="space-y-3 mt-6">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500 py-6">
            No tasks yet. Add one to get started!
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onToggle={toggleTask}
            />
          ))
        )}
      </main>

      <footer className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <p className="text-gray-500">Total</p>
            <p className="font-semibold text-gray-900">
              {taskStats.totalTasks}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Completed</p>
            <p className="font-semibold text-green-600">
              {taskStats.completedTasks}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Pending</p>
            <p className="font-semibold text-orange-600">
              {taskStats.pendingTasks}
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
