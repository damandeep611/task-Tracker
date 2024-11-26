// task input i.e todo's types
export interface Task {
  id: number;
  text: string;
  isCompleted: boolean;
  createdAt: string;
}

// task card
export interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

// kanban column types 
export interface Column {
  id: string;
  title: string;
  tasks: (Task)[];
}
