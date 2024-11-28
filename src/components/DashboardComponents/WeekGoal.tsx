import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function WeekGoal() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="text-2xl font-bold">What will Improve this week</h2>
          </CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
