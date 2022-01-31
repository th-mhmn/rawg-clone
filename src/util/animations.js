export const fadeIn = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.75,
    },
  },
};

export const popup = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.05,
      staggerChildren: 0.05,
    },
  },
};
