import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { Progress } from "../ui/progress";
import React, { useState } from "react";

interface habitDataTypes {
  id: number;
  title: string;
  details: string;
  streak: number;
  totalDays: number;
  progress: number;
  color: string;
  visualData: {
    type: string;
    data: number[];
  };
}

const habitData: habitDataTypes[] = [
  {
    id: 1,
    title: "Task Timer Countdown",
    details:
      "Timer functionality on each task to track time spend on each todo task",
    streak: 7,
    totalDays: 30,
    progress: 23,
    color: "#4CAF50",
    visualData: {
      type: "chart",
      data: [3, 5, 7, 7, 7, 7, 7], // Last 7 days streak
    },
  },
  {
    id: 2,
    title: "Weekly Analysis",
    details: "Get Analysis on how much work you got done this week.",
    streak: 5,
    totalDays: 30,
    progress: 17,
    color: "#FF5722",
    visualData: {
      type: "chart",
      data: [0, 3, 4, 5, 5, 5, 5], // Last 7 days streak
    },
  },
  {
    id: 3,
    title: "90 Day Transformation Planner",
    details: "Make a 90 Day planner with easy to use Tools and planner",
    streak: 10,
    totalDays: 30,
    progress: 33,
    color: "#2196F3",
    visualData: {
      type: "chart",
      data: [8, 9, 10, 10, 10, 10, 10], // Last 7 days streak
    },
  },
  {
    id: 4,
    title: "Track Your Behavior",
    details:
      "Time based task manger allows you to task what you spend your whole day on, Check your productivity level Using this tool",
    streak: 3,
    totalDays: 30,
    progress: 10,
    color: "#9C27B0",
    visualData: {
      type: "chart",
      data: [0, 0, 1, 2, 3, 8, 3], // Last 7 days streak
    },
  },
  {
    id: 5,
    title: "Add Small Notes to self",
    details:
      "Add notes to remember and ideas to store in a small sticky note card, Easy to add and manage",
    streak: 3,
    totalDays: 30,
    progress: 10,
    color: "#ecd59f",
    visualData: {
      type: "chart",
      data: [9, 0, 1, 2, 3, 3, 3], // Last 7 days streak
    },
  },
];

export default function AnimatedSection() {
  const [selectedHabit, setSelectedHabit] = useState(habitData[0]);

  return (
    <Card className="w-full max-w-7xl mx-auto overflow-hidden shadow-lg">
      <CardContent className="p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-2rem)] max-h-[700px]">
          {/* Left Column */}
          <div className="overflow-y-auto p-4 ">
            {habitData.map((habit) => (
              <HabitItem
                key={habit.id}
                habit={habit}
                isSelected={selectedHabit.id === habit.id}
                onSelect={() => setSelectedHabit(habit)}
              />
            ))}
          </div>

          {/* Right Column */}
          <div className="p-6 flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedHabit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full relative"
              >
                <SmartphoneAnimation habit={selectedHabit} />
                <AnimatedCards habit={selectedHabit} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface HabitItemProps {
  habit: habitDataTypes;
  isSelected: boolean;
  onSelect?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function HabitItem({ habit, isSelected, onSelect }: HabitItemProps) {
  return (
    <motion.div
      layout
      onClick={onSelect}
      className={`cursor-pointer  border-border last:border-b-0 rounded-lg mb-4 overflow-hidden transition-colors duration-200 ${
        isSelected ? "bg-muted shadow-md" : "hover:bg-muted/50"
      }`}
      style={{ borderColor: habit.color }}
    >
      <div className="p-4 flex justify-between items-center">
        <h3 className=" text-2xl font-semibold" style={{ color: habit.color }}>
          {habit.title}
        </h3>
        {isSelected ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 pb-4"
          >
            <p className="text-sm text-muted-foreground mb-2">
              {habit.details}
            </p>
            <p className="text-sm">
              <span className="font-semibold" style={{ color: habit.color }}>
                {habit.streak}
              </span>{" "}
              day streak
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface SmartphoneAnimationProps {
  habit: habitDataTypes;
}

function SmartphoneAnimation({ habit }: SmartphoneAnimationProps) {
  return (
    <div className="relative w-64 h-[500px] mx-auto">
      <motion.div
        className="absolute inset-0 bg-gray-800 rounded-3xl shadow-xl overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-t-3xl"></div>
        <div className="absolute bottom-0 inset-x-0 h-6 bg-gray-900 rounded-b-3xl"></div>
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-800 rounded-full"></div>
        <div className="absolute inset-2 bg-white rounded-2xl overflow-hidden">
          <div className="p-4 h-full flex flex-col">
            <h3
              className="text-lg font-bold mb-4"
              style={{ color: habit.color }}
            >
              {habit.title}
            </h3>
            <div className="space-y-4 flex-grow">
              <div>
                <p className="text-sm text-gray-600 mb-1">Current Streak</p>
                <p
                  className="text-3xl font-bold"
                  style={{ color: habit.color }}
                >
                  {habit.streak} days
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Progress</p>
                <Progress
                  value={habit.progress}
                  className="h-2"
                  style={{ backgroundColor: `${habit.color}40` }}
                >
                  <div
                    className="h-full"
                    style={{ backgroundColor: habit.color }}
                  ></div>
                </Progress>
                <p className="text-sm mt-1">{habit.progress}% complete</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Last 7 Days</p>
                <div className="h-20">
                  <StreakChart
                    data={habit.visualData.data}
                    color={habit.color}
                  />
                </div>
              </div>
            </div>
            <motion.div
              className="mt-4 p-2 bg-gray-100 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Smartphone
                className="w-5 h-5 mr-2"
                style={{ color: habit.color }}
              />
              <span
                className="text-sm font-medium"
                style={{ color: habit.color }}
              >
                Open in App
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function StreakChart({ data, color }) {
  const maxValue = Math.max(...data);

  return (
    <div className="flex items-end justify-between h-full w-full">
      {data.map((value, index) => (
        <motion.div
          key={index}
          className="w-[10%]"
          style={{ backgroundColor: color }}
          initial={{ height: 0 }}
          animate={{ height: `${(value / maxValue) * 100}%` }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        />
      ))}
    </div>
  );
}

function AnimatedCards({ habit }) {
  const cards = [
    {
      icon: Calendar,
      title: "Consistency",
      value: `${habit.streak} days`,
      size: "small",
    },
    {
      icon: Target,
      title: "Goal",
      value: `${habit.totalDays} days`,
      size: "medium",
    },
    {
      icon: TrendingUp,
      title: "Progress",
      value: `${habit.progress}%`,
      size: "large",
    },
    {
      icon: Zap,
      title: "Streak",
      value: `${habit.streak} days`,
      size: "small",
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {cards.map((card, index) => (
        <AnimatedCard
          key={index}
          card={card}
          index={index}
          color={habit.color}
        />
      ))}
    </div>
  );
}

function AnimatedCard({ card, index, color }) {
  const positions = [
    { top: "5%", left: "5%" },
    { bottom: "10%", left: "10%" },
    { top: "50%", right: "5%", transform: "translateY(-50%)" },
    { top: "15%", right: "10%" },
  ];

  const sizes = {
    small: "w-24 h-24",
    medium: "w-32 h-32",
    large: "w-56 h-32",
  };

  const animations = [
    {
      initial: { opacity: 0, scale: 0.5, rotate: -10 },
      animate: { opacity: 1, scale: 1, rotate: 0 },
      transition: { duration: 0.5, delay: index * 0.1 },
    },
    {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: index * 0.1 },
    },
    {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.5, delay: index * 0.1 },
    },
    {
      initial: { opacity: 0, scale: 1.5 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.5, delay: index * 0.1 },
    },
  ];

  return (
    <motion.div
      className={`absolute bg-white rounded-lg shadow-lg p-3 ${
        sizes[card.size]
      }`}
      style={{
        ...positions[index],
        borderTop: `3px solid ${color}`,
      }}
      {...animations[index]}
    >
      <card.icon className="w-6 h-6 mb-2" style={{ color }} />
      <h4 className="text-sm font-semibold mb-1">{card.title}</h4>
      <p className="text-xs text-gray-600">{card.value}</p>
    </motion.div>
  );
}
