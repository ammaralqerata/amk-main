import type { Variants } from "framer-motion";

export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeRiseStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const cardHover = {
  rest: { y: 0 },
  hover: { y: -4, transition: { duration: 0.2, ease: "easeOut" } },
} as const;

export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
