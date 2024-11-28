import {
  BarChart2,
  CheckSquare,
  Smartphone,
  Target,
  Timer,
} from "lucide-react";
import FeatureCard from "./FeatureCard";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

export default function KeyFeatures() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return (
    <section ref={ref} className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Track. Analyze. Transform.
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Timer className="w-10 h-10 text-primary" />}
            title="Task Timer"
            description="Real-time tracking for each task"
            delay={0.1}
          />
          <FeatureCard
            icon={<BarChart2 className="w-10 h-10 text-primary" />}
            title="Weekly Analysis"
            description="Visual breakdown of time spent on tasks, categorized by project or type"
            delay={0.2}
          />
          <FeatureCard
            icon={<CheckSquare className="w-10 h-10 text-primary" />}
            title="Habit Tracker"
            description="Plan and monitor habits alongside tasks"
            delay={0.3}
          />
          <FeatureCard
            icon={<Target className="w-10 h-10 text-primary" />}
            title="Custom Goals"
            description="Set daily or weekly objectives and measure progress"
            delay={0.4}
          />
          <FeatureCard
            icon={<Smartphone className="w-10 h-10 text-primary" />}
            title="Sync Across Devices"
            description="Accessible on web and mobile"
            delay={0.5}
          />
        </div>
      </div>
    </section>
  );
}
