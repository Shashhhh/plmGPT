export const spring = {
    offscreen: {
        y: 300,
        opacity: 0
    },
    onscreen: {
        y: 50,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.2,
            duration: 2
        }
    }
};
