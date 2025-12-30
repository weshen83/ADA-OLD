import { gsap } from 'gsap';

export const animateRiskNeedle = (needle: HTMLElement, score: number) => {
    const rotation = (score / 10) * 180;

    gsap.to(needle, {
        rotation: rotation,
        duration: 2.5,
        ease: "elastic.out(1, 0.4)", // Heavy bounce
        transformOrigin: "bottom center",
        delay: 0.2
    });
};
