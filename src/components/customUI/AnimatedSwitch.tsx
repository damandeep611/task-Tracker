import { motion } from "framer-motion";

interface AnimatedSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className: string;
}

export function AnimatedSwitch({
  checked,
  onCheckedChange,
}: AnimatedSwitchProps) {
  return (
    <motion.button
      className="switch-target relative h-8 w-16 rounded-full bg-gray-200 p-1 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
      onClick={() => onCheckedChange(!checked)}
      animate={{
        backgroundColor: checked ? "rgb(35, 110, 0)" : "rgb(229, 231, 235)",
      }}
      whileTap={{ scale: 0.95 }}
      aria-checked={checked}
      role="switch"
    >
      <motion.div
        className="h-6 w-6 rounded-full bg-white shadow-md"
        animate={{
          x: checked ? "100%" : "0%",
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />
    </motion.button>
  );
}
