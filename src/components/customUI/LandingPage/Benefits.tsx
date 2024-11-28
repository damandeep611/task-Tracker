import { useScroll, motion, useTransform } from "framer-motion";
import { Clock, Focus, TrendingUp } from "lucide-react";
import { useRef } from "react";

export default function Benefits() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={ref} className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why You'll Love TaskMaster
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          <BenefitCard
            icon={<Clock className="w-12 h-12 text-primary" />}
            title="Gain control over your time"
            description="Understand where your time goes and make informed decisions to optimize your day"
            delay={0.1}
          />
          <BenefitCard
            icon={<Focus className="w-12 h-12 text-primary" />}
            title="Improve focus and productivity"
            description="Minimize distractions and maximize your output with our intuitive task management system"
            delay={0.3}
          />
          <BenefitCard
            icon={<TrendingUp className="w-12 h-12 text-primary" />}
            title="Build habits for long-term success"
            description="Develop and maintain positive habits that align with your goals and aspirations"
            delay={0.5}
          />
        </div>
      </div>
    </section>
  );
}

function BenefitCard({ icon, title, description, delay }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      style={{ y }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        {icon}
      </motion.div>
      <motion.h3
        className="text-xl font-semibold mt-4 mb-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.3 }}
      >
        {title}
      </motion.h3>
      <motion.p
        className="text-muted-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.4 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
