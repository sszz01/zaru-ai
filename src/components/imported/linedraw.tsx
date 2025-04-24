import { motion } from "framer-motion";

const LineDraw: React.FC = () => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = i * 0.1;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  };

  const sharedPathStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
  };

  const sharedCircleStyle: React.CSSProperties = {
    strokeWidth: 3,
    strokeLinecap: "round",
    fill: "transparent",
  };

  const paths = [
    {
      d: "M 300 0 L 300 600",
      custom: 1,
      delay: 0.5,
      transform: "translateX(-90%)",
    },
    {
      d: "M 300 0 L 300 600",
      custom: 2,
      delay: 1,
      transform: "translateX(-92%)",
    },
    {
      d: "M 300 0 L 300 600",
      custom: 3,
      delay: 1.5,
      transform: "translateX(-94%)",
    },
    {
      d: "M 300 300 A 50 50 0 0 1 350 250",
      custom: 7,
      delay: 0,
      transform: "translateX(-90%)",
    },
    {
      d: "M 73 250 L 200 250",
      custom: 9,
      delay: 3.5,
      transform: "translateX(-44%)",
    },
    {
      d: "M 400 000 Q 350 200 400 300 T 400 600",
      custom: 10,
      delay: 4,
      transform: "translateX(75%)",
    },
    {
      d: "M 400 000 Q 350 200 400 300 T 400 600",
      custom: 11,
      delay: 4,
      transform: "translateX(77%)",
    },
  ];

  const circles = [
    {
      cx: 100,
      cy: 100,
      r: 80,
      custom: 4,
      delay: 4,
      transform: "translateX(100%)",
    },
    {
      cx: 100,
      cy: 100,
      r: 50,
      custom: 5,
      delay: 2,
      transform: "translateX(100%) translateY(65%)",
    },
    {
      cx: 100,
      cy: 100,
      r: 30,
      custom: 6,
      delay: 3,
      transform: "translateX(110%) translateY(40%)",
    },
  ];

  return (
    <motion.svg
      viewBox="0 0 600 600"
      preserveAspectRatio="xMidYMid meet"
      initial="hidden"
      animate="visible"
      style={{
        width: "100%",
        height: "auto",
        maxWidth: "100vw",
        display: "block",
      }}
    >
      {paths.map((path, index) => (
        <motion.path
          key={index}
          d={path.d}
          fill="transparent"
          stroke="#7ebd4a"
          strokeWidth="3"
          variants={draw}
          custom={path.custom}
          style={{
            ...sharedPathStyle,
            transform: path.transform,
          }}
          transition={{ delay: path.delay }}
        />
      ))}

      {circles.map((circle, index) => (
        <motion.circle
          key={index}
          cx={circle.cx}
          cy={circle.cy}
          r={circle.r}
          stroke="#4a98bd"
          variants={draw}
          custom={circle.custom}
          style={{
            ...sharedCircleStyle,
            transform: circle.transform,
          }}
          animate={{
            cx: [
              circle.cx,
              circle.cx + 5,
              circle.cx,
              circle.cx - 5,
              circle.cx,
            ],
            cy: [
              circle.cy,
              circle.cy - 5,
              circle.cy,
              circle.cy + 5,
              circle.cy,
            ],
          }}
          transition={{
            delay: circle.delay,
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.svg>
  );
};

export default LineDraw;
