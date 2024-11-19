import { Clock, Trash } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { TaskCardProps } from "@/types/task.types";

export default function TaskCard({ task, onDelete, onToggle }: TaskCardProps) {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
      <div className="flex items-center justify-between gap-2">
        <Checkbox
          checked={task.isCompleted}
          onCheckedChange={() => onToggle(task.id)}
          className="mr-2"
        />
        <div className="flex flex-col">
          <span
            className={
              task.isCompleted ? `text-gray-500 line-through` : "font-semibold"
            }
          >
            {task.text}
          </span>
          {/* timestamp on each task */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-3 w-3" />
            {task.createdAt}
          </div>
        </div>
      </div>
      <Button onClick={() => onDelete(task.id)}>
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
}