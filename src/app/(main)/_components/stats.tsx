"use client";

import React, { useEffect, useState } from "react";

export const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <AnimatedCounter value="500" label="IoT Devices" />
          <AnimatedCounter value="99.9" label="Uptime %" />
          <AnimatedCounter value="1,000" label="Daily Encryptions" />
          <AnimatedCounter value="256" label="Bit Security" />
        </div>
      </div>
    </section>
  );
};

const AnimatedCounter = ({
  value,
  label,
}: {
  value: string;
  label: string;
}) => {
  const [count, setCount] = useState(0);
  const targetValue = parseInt(value.replace(/,/g, ""));

  useEffect(() => {
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = Math.round(targetValue * progress);

      setCount(currentCount);

      if (frame === totalFrames) {
        clearInterval(timer);
      }
    }, frameDuration);

    return () => clearInterval(timer);
  }, [targetValue]);

  return (
    <div className="text-center">
      <div className="text-4xl lg:text-5xl font-bold text-primary">
        {count.toLocaleString()}+
      </div>
      <div className="text-muted-foreground mt-2">{label}</div>
    </div>
  );
};
