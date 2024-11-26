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
        <CardContent>
          <p>
            Solve this problem of ability to focus on one thing for long period
            of time or even 30 minutes. So what you are going to do from
            tomorrow is - write a task you want to do i.e making a pie chart of
            tasks, and then set the time for it, then start doing it and don't
            swtich tabs before completing the task
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
