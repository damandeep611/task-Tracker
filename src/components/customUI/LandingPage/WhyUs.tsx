import { Clock, TrendingDown, X } from "lucide-react";

export default function WhyUs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Ever Wondered Where Your Time Goes?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <Clock className="w-16 h-16 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Losing track of time on tasks
            </h3>
            <p className="text-muted-foreground">
              Hours slip by without realizing where they went
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <TrendingDown className="w-16 h-16 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Lack of clarity on productivity trends
            </h3>
            <p className="text-muted-foreground">
              No insight into how you're spending your time day-to-day
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <X className="w-16 h-16 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Struggling to build and maintain productive habits
            </h3>
            <p className="text-muted-foreground">
              Good intentions that never seem to stick
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
