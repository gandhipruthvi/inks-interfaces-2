"use client";

import { useEffect, useRef, useState } from "react";
import { Player, PlayerEvent } from "@lottiefiles/react-lottie-player";

interface LottieAnimationProps {
  src: string;
  autoplay?: boolean;
  loop?: boolean;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
  onEvent?: (event: PlayerEvent) => void;
}

export default function LottieAnimation({
  src,
  autoplay = true,
  loop = true,
  speed = 1,
  className = "",
  style = {},
  onEvent,
}: LottieAnimationProps) {
  const playerRef = useRef<Player>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded && playerRef.current) {
      if (autoplay) {
        playerRef.current.play();
      }
      
      if (speed !== 1 && playerRef.current) {
        playerRef.current.setPlayerSpeed(speed);
      }
    }
  }, [isLoaded, autoplay, speed]);

  const handleEvent = (event: PlayerEvent) => {
    if (event === "load") setIsLoaded(true);
    if (onEvent) onEvent(event);
  };

  return (
    <Player
      ref={playerRef}
      src={src}
      loop={loop}
      autoplay={false} // We'll handle autoplay in useEffect
      className={className}
      style={style}
      onEvent={handleEvent}
    />
  );
}
