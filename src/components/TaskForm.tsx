import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface TaskFormProps {
  onAddTask: (text: string) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(newTask);
    setNewTask("");
  };
  // adding task on enter button

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between gap-2"
    >
      <Input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter your task"
        className="flex-1"
      />
      <Button type="submit">Add</Button>
    </form>
  );
}
