import { Column } from "@/types/task.types";
import { useDroppable } from "@dnd-kit/core";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

interface ColumnProps {
  column: Column;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

export default function ColumnDrop({
  column,
  onDelete,
  onToggle,
}: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  return (
    <Card key={column.id} className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{column.title}</CardTitle>
      </CardHeader>
      <CardContent ref={setNodeRef}>
        <SortableContext
          items={column.tasks.map((task) => task.id.toString())}
          strategy={rectSortingStrategy}
        >
          <div className="space-y-3">
            {column.tasks.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No tasks in this column
              </p>
            ) : (
              column.tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={onDelete}
                  onToggle={onToggle}
                />
              ))
            )}
          </div>
        </SortableContext>
      </CardContent>
    </Card>
  );
}
