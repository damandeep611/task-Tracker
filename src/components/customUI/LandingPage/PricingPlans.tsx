import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Check } from "lucide-react";

export default function PricingPlans() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Plans That Fit Your Goals
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <PricingCard
            title="Free"
            price="$0"
            description="Basic task management and time tracking"
            features={[
              "Unlimited tasks",
              "Basic time tracking",
              "Daily overview",
            ]}
          />
          <PricingCard
            title="Premium"
            price="$9.99"
            description="Advanced analytics, habit tracker, and integrations"
            features={[
              "Everything in Free",
              "Advanced analytics",
              "Habit tracker",
              "Integrations",
              "Priority support",
            ]}
            highlighted
          />
          <PricingCard
            title="Team"
            price="$19.99"
            description="Collaborative features and shared insights"
            features={[
              "Everything in Premium",
              "Team collaboration",
              "Shared projects",
              "Team analytics",
              "Admin controls",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  title,
  price,
  description,
  features,
  highlighted = false,
}) {
  return (
    <Card className={highlighted ? "border-primary shadow-lg" : ""}>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <p className="text-4xl font-bold">
          {price}
          <span className="text-sm font-normal">/month</span>
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="w-5 h-5 text-primary mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant={highlighted ? "default" : "outline"}
        >
          {highlighted ? "Start Free Trial" : "Get Started"}
        </Button>
      </CardFooter>
    </Card>
  );
}
