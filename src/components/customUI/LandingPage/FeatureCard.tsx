import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface FeatureCardProps {
  title: string;
  icon: string;
  description: string;
  delay: number;
}

export default function FeatureCard({
  title,
  icon,
  delay,
  description,
}: FeatureCardProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      style={{ y }}
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
