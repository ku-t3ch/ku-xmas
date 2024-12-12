import { motion } from "framer-motion";
import React from "react";

const SnowfallBackground = ({ children }: { children: React.ReactNode }) => {
  // Generate an array of snowflakes with unique properties
  const snowflakes = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    size: Math.random() * 5 + 2, // Random size between 2px and 7px
    startX: Math.random() * 100, // Start position (percentage of width)
    delay: Math.random() * 25, // Random delay before the snowflake starts falling
    duration: Math.random() * 15 + 10, // Random fall duration between 5s and 10s
  }));

  return (
    <main className="w-full h-full min-h-screen flex justify-center items-center bg-gradient-to-b from-blue-900 to-black overflow-hidden px-6">
      <div className="absolute w-full h-screen bg-gradient-to-b from-midnight-blue to-black overflow-hidden">
        {snowflakes.map(({ id, size, startX, delay, duration }) => (
          <motion.div
            key={id}
            className="absolute top-0 rounded-full bg-white"
            style={{ width: size, height: size, left: `${startX}%` }}
            animate={{
              y: "100vh", // Move to the bottom of the screen
              x: ["0%", "5%", "-5%", "0%"], // Slight swaying effect
            }}
            transition={{
              y: {
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                delay: delay,
              },
              x: {
                duration: duration / 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        ))}
      </div>
      {children}
    </main>
  );
};

export default SnowfallBackground;