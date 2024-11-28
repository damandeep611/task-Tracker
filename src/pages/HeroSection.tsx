import { AnimatedSwitch } from "@/components/customUI/AnimatedSwitch";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isToggled, setIsToggled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  });
  return (
    <section className="min-h-screen bg-gradient-to-b from-background to-slate-300 pt-12 md:pt-24 overflow-hidden">
      <div className="container mx-auto px-4 text-center pt-20 pb-32 relative z-10 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <p className=" text-sm text-primary uppercase font-bold">
            Task management and habit tracking
          </p>

          {/* ------heading animation ----*/}
          <h1 className="capitalize flex flex-col text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight  ">
            <AnimatePresence mode="wait">
              <motion.span
                key={isToggled ? "tracking" : "managing"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0, y: -20 }}
                className="inline-block"
              >
                {isToggled
                  ? "Take control by tracking"
                  : "Break free by Managing"}
              </motion.span>
            </AnimatePresence>
            <span className="inline-block items-center">
              {/* <span className="w-full text-left">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isToggled ? "tracking" : "managing"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block"
                  >
                    {isToggled ? "tracking your" : "managing your"}
                  </motion.span>
                </AnimatePresence>
              </span> */}
              {mounted && (
                <AnimatedSwitch
                  checked={isToggled}
                  onCheckedChange={setIsToggled}
                  className="mx-2 data-[state=checked]:bg-primary transition-colors duration-200"
                />
              )}
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={isToggled ? "time" : "habits"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="inline-block bg-gradient-to-r from-lime-300 to-emerald-500  bg-clip-text text-transparent"
              >
                {isToggled ? "your time" : " your habits"}
              </motion.span>
            </AnimatePresence>
          </h1>
          {/* ---------------- */}
          <p className="max-w-xl text-muted-foreground mx-auto mb-8">
            Empower yourself to achieve more. Our intuitive app helps you build
            lasting habits and manage your time effectively, turning your goals
            into daily accomplishments.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              size={"lg"}
              className="bg-primary hover:bg-primary/90 text-white transition-colors duration-200"
            >
              Start Your Journey
            </Button>
            <a className="capitalize text-muted-foreground block mt-4 text-sm hover:text-primary transition-colors duration-300 ">
              discover how it works
            </a>
          </motion.div>
        </motion.div>
      </div>
      <WaveAnimation />
    </section>
  );
}

function WaveAnimation() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
      <svg
        className="relative block w-full h-[100px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <motion.path
          initial={{
            d: "M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,186.7C960,213,1056,235,1152,229.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
          }}
          animate={{
            d: [
              "M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,186.7C960,213,1056,235,1152,229.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,112C672,107,768,149,864,181.3C960,213,1056,235,1152,234.7C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,186.7C960,213,1056,235,1152,229.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            ],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 20,
            ease: "easeInOut",
          }}
          fill="#d4f7d1"
          fillOpacity="0.2"
        />
      </svg>
    </div>
  );
}
