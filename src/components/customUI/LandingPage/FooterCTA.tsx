import { Button } from "@/components/ui/button";

export default function FooterCTA() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Take Control of Your Time and Habits Today
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Your first step toward better productivity starts here. Join thousands
          of users who have transformed their work and life with TaskMaster.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" variant="secondary">
            Start Free Trial
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
