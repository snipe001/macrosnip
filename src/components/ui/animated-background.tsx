"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  videoBackground?: string;
  overlayClassName?: string;
}

export function AnimatedBackground({ videoBackground, overlayClassName = "bg-black/40" }: AnimatedBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(!videoBackground);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (videoBackground && isMounted) {
      const videoElement = document.getElementById("bg-video") as HTMLVideoElement;
      if (videoElement) {
        videoElement.onloadeddata = () => {
          setIsLoaded(true);
        };
      } else {
        // If no video, consider it loaded
        setIsLoaded(true);
      }
    }
  }, [videoBackground, isMounted]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Arka plan animasyonu */}
      <div className="absolute inset-0 z-0">
        {isMounted && videoBackground ? (
          <video
            id="bg-video"
            autoPlay
            loop
            muted
            playsInline
            className={`w-full h-full object-cover ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
          >
            <source src={videoBackground} type="video/mp4" />
          </video>
        ) : (
          <div className="w-full h-full bg-macrosnip-darker"></div>
        )}
      </div>

      {/* Karanlık katman ve gölgeler */}
      <div className={`absolute inset-0 z-10 ${overlayClassName}`}></div>

      {/* Animasyonlu parçacıklar */}
      {isMounted && (
        <div className="absolute inset-0 z-20">
          {Array.from({ length: 20 }).map((_, index) => (
            <motion.div
              key={`particle-${index}`}
              className="absolute bg-macrosnip-red/20 rounded-full w-2 h-2 md:w-3 md:h-3 blur-sm"
              initial={{
                opacity: 0,
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
              }}
              animate={{
                opacity: [0, 0.5, 0],
                x: [
                  Math.random() * 100 - 50,
                  Math.random() * 200 - 100,
                  Math.random() * 100 - 50,
                ],
                y: [
                  Math.random() * 100 - 50,
                  Math.random() * 200 - 100,
                  Math.random() * 100 - 50,
                ],
                scale: [1, 2, 1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 15 + Math.random() * 15,
                ease: "linear",
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
