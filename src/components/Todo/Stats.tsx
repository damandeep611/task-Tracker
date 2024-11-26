import { basicTodoLogic } from "@/hooks/basicTodoLogic";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Stats() {
  const { taskStats } = basicTodoLogic();
  return (
    <div>
      <div className=" mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{taskStats.pendingTasks}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{taskStats.completedTasks}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{taskStats.pendingTasks}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
