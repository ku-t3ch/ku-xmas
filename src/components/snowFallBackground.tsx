import { motion } from "framer-motion";
import React, { useMemo } from "react";

const SnowfallBackground = () => {
  const snowflakes = useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => ({
        id: i,
        size: Math.random() * 5 + 2, // Random size between 2px and 7px
        startX: Math.random() * 100, // Start position (percentage of width)
        delay: Math.random() * 25, // Random delay before the snowflake starts falling
        duration: Math.random() * 15 + 10, // Random fall duration between 10s and 25s
      })),
    []
  );

  return (
    <div className="absolute w-full min-h-screen h-full bg-gradient-to-b from-midnight-blue to-black overflow-hidden">
      {snowflakes.map(({ id, size, startX, delay, duration }) => (
        <motion.div
          key={id}
          className="absolute -top-2 rounded-full bg-white"
          style={{ width: size, height: size, left: `${startX}%` }}
          animate={{
            y: "105vh",
            x: ["0px", "10px", "-10px", "0px"],
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
  );
};

export default React.memo(SnowfallBackground);
