"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
  onComplete?: () => void;
}

export default function TypewriterText({
  text,
  speed = 50,
  delay = 0,
  className = "",
  cursor = true,
  onComplete
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Reset when text changes
    setDisplayText("");
    setIsComplete(false);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Initial delay before typing starts
    timeoutRef.current = setTimeout(() => {
      setIsTyping(true);
      let index = 0;

      const typeNextChar = () => {
        if (index < text.length) {
          setDisplayText(text.substring(0, index + 1));
          index++;
          timeoutRef.current = setTimeout(typeNextChar, speed);
        } else {
          setIsTyping(false);
          setIsComplete(true);
          if (onComplete) onComplete();
        }
      };

      typeNextChar();
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {cursor && isTyping && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="inline-block ml-0.5 -mb-0.5 w-[2px] h-[1.2em] bg-current"
        />
      )}
    </span>
  );
}
