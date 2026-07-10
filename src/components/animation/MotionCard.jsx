import { motion, useReducedMotion } from "motion/react";
import Card from "../ui/Card";

export default function MotionCard({
  children,
  className = "",
  delay = 0,
  amount = 0.18,
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <Card className={className}>{children}</Card>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 24,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount,
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -4,
      }}
    >
      <Card className={className}>{children}</Card>
    </motion.div>
  );
}