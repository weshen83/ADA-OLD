import { gsap } from 'gsap';

export const animateRiskScore = (
    element: HTMLElement,
    targetScore: number
) => {
    const obj = { val: 0 };

    gsap.to(obj, {
        val: targetScore,
        duration: 2,
        ease: "power4.out",
        onUpdate: () => {
            element.innerText = obj.val.toFixed(1);

            // Dynamic Color Shift
            if (obj.val > 8) element.style.color = "#FF3333"; // Red
            else if (obj.val > 5) element.style.color = "#F97316"; // Orange
        }
    });
};
