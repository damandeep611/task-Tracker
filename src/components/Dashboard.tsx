import TaskManager from "./DashboardComponents/TaskManager";
import WeekGoal from "./DashboardComponents/WeekGoal";
import Stats from "./Todo/Stats";
import TaskTracker from "./Todo/TaskTracker";

export default function Dashboard() {
  return (
    <section className="w-full mx-auto m-6">
      <header className="mb-6 m-6">
        <h1 className="text-2xl font-bold text-gray-900">Task Tracker</h1>
        <p className="text-gray-500 mt-1">Manage your daily tasks</p>
      </header>
      <Stats />
      <TaskTracker />
      <div>
        <WeekGoal />
      </div>
      <div>
        <TaskManager />
      </div>
    </section>
  );
}
