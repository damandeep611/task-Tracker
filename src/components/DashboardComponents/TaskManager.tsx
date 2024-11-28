"use client";

import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  CheckCircle2,
  Circle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Toaster } from "@/components/ui/toaster";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

type Task = {
  id: number;
  name: string;
  estimatedTime: number;
  timeLeft: number;
  status: "pending" | "in_progress" | "completed" | "failed";
  priority: "low" | "medium" | "high";
  createdAt: Date;
  completedAt?: Date;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    name: "",
    estimatedTime: 30,
    priority: "medium" as const,
  });
  const [filter, setFilter] = useState("all");
  const [activeTimers, setActiveTimers] = useState<{
    [key: number]: NodeJS.Timeout;
  }>({});
  const [completionDialog, setCompletionDialog] = useState<{
    isOpen: boolean;
    taskId: number | null;
  }>({ isOpen: false, taskId: null });

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.status === "in_progress" && task.timeLeft > 0) {
            const newTimeLeft = task.timeLeft - 1;
            if (newTimeLeft === 0) {
              clearInterval(activeTimers[task.id]);
              delete activeTimers[task.id];
              setCompletionDialog({ isOpen: true, taskId: task.id });
            }
            return { ...task, timeLeft: newTimeLeft };
          }
          return task;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTimers]);

  const addTask = () => {
    if (!newTask.name.trim()) {
      Toaster({
        title: "Error",
        description: "Task name cannot be empty",
        variant: "destructive",
      });
      return;
    }
    const id = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    setTasks([
      ...tasks,
      {
        ...newTask,
        id,
        timeLeft: newTask.estimatedTime * 60,
        status: "pending",
        createdAt: new Date(),
      },
    ]);
    setNewTask({ name: "", estimatedTime: 30, priority: "medium" });
    toast({ title: "Success", description: "New task added" });
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    if (activeTimers[id]) {
      clearInterval(activeTimers[id]);
      delete activeTimers[id];
    }
    toast({ title: "Task Deleted", description: "The task has been removed" });
  };

  const startTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: "in_progress" } : task
      )
    );
    const timer = setInterval(() => {}, 1000); // This interval is managed by the main useEffect
    setActiveTimers({ ...activeTimers, [id]: timer });
  };

  const pauseTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: "pending" } : task
      )
    );
    if (activeTimers[id]) {
      clearInterval(activeTimers[id]);
      delete activeTimers[id];
    }
  };

  const resetTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, timeLeft: task.estimatedTime * 60, status: "pending" }
          : task
      )
    );
    if (activeTimers[id]) {
      clearInterval(activeTimers[id]);
      delete activeTimers[id];
    }
  };

  const completeTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: "completed", completedAt: new Date() }
          : task
      )
    );
    if (activeTimers[id]) {
      clearInterval(activeTimers[id]);
      delete activeTimers[id];
    }
    setCompletionDialog({ isOpen: false, taskId: null });
    toast({ title: "Task Completed", description: "Great job!" });
  };

  const failTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: "failed", completedAt: new Date() }
          : task
      )
    );
    if (activeTimers[id]) {
      clearInterval(activeTimers[id]);
      delete activeTimers[id];
    }
    setCompletionDialog({ isOpen: false, taskId: null });
    toast({
      title: "Task Failed",
      description: "Don't worry, you can try again!",
    });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active")
      return task.status === "pending" || task.status === "in_progress";
    if (filter === "completed") return task.status === "completed";
    if (filter === "failed") return task.status === "failed";
    return true;
  });

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const taskStatusData = [
    {
      name: "Completed",
      value: tasks.filter((t) => t.status === "completed").length,
    },
    {
      name: "Failed",
      value: tasks.filter((t) => t.status === "failed").length,
    },
    {
      name: "In Progress",
      value: tasks.filter((t) => t.status === "in_progress").length,
    },
    {
      name: "Pending",
      value: tasks.filter((t) => t.status === "pending").length,
    },
  ];

  const taskPriorityData = [
    { name: "High", value: tasks.filter((t) => t.priority === "high").length },
    {
      name: "Medium",
      value: tasks.filter((t) => t.priority === "medium").length,
    },
    { name: "Low", value: tasks.filter((t) => t.priority === "low").length },
  ];

  const completionRateData = [
    {
      name: "Success Rate",
      rate:
        tasks.length > 0
          ? (tasks.filter((t) => t.status === "completed").length /
              tasks.length) *
            100
          : 0,
    },
    {
      name: "Failure Rate",
      rate:
        tasks.length > 0
          ? (tasks.filter((t) => t.status === "failed").length / tasks.length) *
            100
          : 0,
    },
  ];

  const averageCompletionTime = () => {
    const completedTasks = tasks.filter(
      (t) => t.status === "completed" && t.completedAt
    );
    if (completedTasks.length === 0) return 0;
    const totalTime = completedTasks.reduce((acc, task) => {
      const completionTime =
        task.completedAt!.getTime() - task.createdAt.getTime();
      return acc + completionTime;
    }, 0);
    return totalTime / completedTasks.length / 60000; // Convert to minutes
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addTask();
            }}
            className="flex flex-wrap gap-4"
          >
            <div className="flex-grow">
              <Label htmlFor="new-task">Task Name</Label>
              <Input
                id="new-task"
                value={newTask.name}
                onChange={(e) =>
                  setNewTask({ ...newTask, name: e.target.value })
                }
                placeholder="Enter task name"
                required
              />
            </div>
            <div>
              <Label htmlFor="estimated-time">Estimated Time (minutes)</Label>
              <Input
                id="estimated-time"
                type="number"
                value={newTask.estimatedTime}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    estimatedTime: parseInt(e.target.value),
                  })
                }
                min="1"
                required
              />
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={newTask.priority}
                onValueChange={(value: "low" | "medium" | "high") =>
                  setNewTask({ ...newTask, priority: value })
                }
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button type="submit">
                <Plus className="mr-2 h-4 w-4" /> Add Task
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Task List</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setFilter("all")}>
                All
              </TabsTrigger>
              <TabsTrigger value="active" onClick={() => setFilter("active")}>
                Active
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                onClick={() => setFilter("completed")}
              >
                Completed
              </TabsTrigger>
              <TabsTrigger value="failed" onClick={() => setFilter("failed")}>
                Failed
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <ul className="space-y-4">
                {filteredTasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center justify-between p-4 bg-gray-100 rounded"
                  >
                    <div className="flex items-center space-x-4">
                      {task.status === "completed" ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      ) : task.status === "failed" ? (
                        <AlertCircle className="h-6 w-6 text-red-500" />
                      ) : (
                        <Circle className="h-6 w-6 text-gray-400" />
                      )}
                      <div>
                        <p className="font-semibold">{task.name}</p>
                        <p className="text-sm text-gray-500">
                          Estimated: {task.estimatedTime} min | Remaining:{" "}
                          {formatTime(task.timeLeft)} | Priority:{" "}
                          <Badge
                            variant={
                              task.priority === "high"
                                ? "destructive"
                                : task.priority === "medium"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {task.priority}
                          </Badge>
                        </p>
                        {task.status === "in_progress" && (
                          <Progress
                            value={
                              ((task.estimatedTime * 60 - task.timeLeft) /
                                (task.estimatedTime * 60)) *
                              100
                            }
                            className="mt-2"
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {task.status === "pending" ||
                      task.status === "in_progress" ? (
                        <>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              task.status === "pending"
                                ? startTask(task.id)
                                : pauseTask(task.id)
                            }
                          >
                            {task.status === "pending" ? (
                              <Play className="h-4 w-4" />
                            ) : (
                              <Pause className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => resetTask(task.id)}
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        </>
                      ) : null}
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteTask(task.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Task Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Priority Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskPriorityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {taskPriorityData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Completion Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={completionRateData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rate" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Task Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Average Completion Time
              </h3>
              <p className="text-3xl font-bold">
                {averageCompletionTime().toFixed(2)} minutes
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Most Common Priority
              </h3>
              <p className="text-3xl font-bold">
                {
                  taskPriorityData.reduce((a, b) => (a.value > b.value ? a : b))
                    .name
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={completionDialog.isOpen}
        onOpenChange={(isOpen) =>
          setCompletionDialog({ ...completionDialog, isOpen })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Task Completed?</DialogTitle>
            <DialogDescription>
              The timer for your task has ended. Did you complete the task?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => failTask(completionDialog.taskId!)}
            >
              No, Mark as Failed
            </Button>
            <Button onClick={() => completeTask(completionDialog.taskId!)}>
              Yes, Mark as Completed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
