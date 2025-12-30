'use client';

import { useEffect, useRef } from 'react';

export const useScramble = (
    text: string,
    trigger: boolean = true,
    speed: number = 30
) => {
    const elementRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!trigger || !elementRef.current) return;

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let iterations = 0;
        const element = elementRef.current;

        const interval = setInterval(() => {
            element.innerText = text
                .split("")
                .map((letter, index) => {
                    if (index < iterations) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");

            if (iterations >= text.length) clearInterval(interval);
            iterations += 1 / 3;
        }, speed);

        return () => clearInterval(interval);
    }, [text, trigger, speed]);

    return elementRef;
};
