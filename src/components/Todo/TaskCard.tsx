import { Clock, GripVertical, Trash } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { TaskCardProps } from "@/types/task.types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskCard({ task, onDelete, onToggle }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id.toString(),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <button {...listeners} {...attributes}>
          <GripVertical className="h-5 w-5 text-gray-500" />
        </button>
        <div className="flex items-center justify-between gap-2">
          <Checkbox
            checked={task.isCompleted}
            onCheckedChange={() => onToggle(task.id)}
            className="mr-2"
          />
          <div className="flex flex-col">
            <span
              className={
                task.isCompleted
                  ? `text-gray-500 line-through`
                  : "font-semibold"
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
    </article>
  );
}
