import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Plus } from "lucide-react";
import { Label } from "./ui/label";


interface TaskFormProps {
  onAddTask: (text: string) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = () => {
    onAddTask(newTask);
    setNewTask("");
  };
  // adding task on enter button

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Add New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <div className="  flex-grow">
            <Label htmlFor="new-task">Task Name</Label>
            <Input
              id="new-task"
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter your task"
              className="flex-1"
              onSubmit={handleSubmit}
            />
          </div>

          <div className="flex items-end">
            <Button type="submit" onClick={handleSubmit}>
              <Plus className="m-2 h-4 w-4" /> Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
