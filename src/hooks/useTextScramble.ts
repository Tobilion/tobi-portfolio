import { useState, useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

/**
 * Scrambles text on mount, then resolves to the final string.
 * @param text    The final resolved string
 * @param delay   Ms to wait before starting (default 0)
 * @param speed   Ms per frame (default 35)
 */
export function useTextScramble(text: string, delay = 0, speed = 35): string {
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);

  useEffect(() => {
    let started = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const start = (): void => {
      started = true;
      frame.current = 0;
      const totalFrames = text.length * 3;

      const tick = (): void => {
        const progress = frame.current / totalFrames;
        const resolvedCount = Math.floor(progress * text.length);

        const scrambled = text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < resolvedCount) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");

        setDisplay(scrambled);
        frame.current++;

        if (frame.current <= totalFrames) {
          const id = setTimeout(tick, speed);
          timers.push(id);
        } else {
          setDisplay(text);
        }
      };
      tick();
    };

    const delayId = setTimeout(start, delay);
    timers.push(delayId);

    return () => {
      timers.forEach(clearTimeout);
      if (started) setDisplay(text);
    };
  }, [text, delay, speed]);

  return display;
}
