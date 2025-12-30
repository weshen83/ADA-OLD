import { gsap } from 'gsap';

export const runDeepScanSequence = (
    barRef: React.RefObject<HTMLDivElement | null>,
    onComplete: () => void,
    playSound: (id: string) => void
) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const timeScale = isMobile ? 1.5 : 1;

    const tl = gsap.timeline({
        onComplete,
        defaults: { ease: "power2.out" }
    });

    if (barRef.current) {
        tl.to(barRef.current, { width: "30%", duration: 0.8 * timeScale, onStart: () => playSound('init') })
            .to(barRef.current, { width: "45%", duration: 1.5 * timeScale, ease: "linear" })
            .to(barRef.current, { width: "85%", duration: 0.6 * timeScale, ease: "power4.out", onStart: () => playSound('burst') })
            .to(barRef.current, { width: "92%", duration: 2.0 * timeScale, ease: "none" }) // The "Deep Think" Stall
            .to(barRef.current, { width: "100%", duration: 0.4 * timeScale, ease: "expo.out", onStart: () => playSound('success') });
    }

    return tl;
};
