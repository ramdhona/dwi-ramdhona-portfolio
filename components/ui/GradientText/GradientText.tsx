import React from "react";
import "./GradientText.css";

export interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  direction?: "horizontal" | "vertical" | "diagonal";
  pauseOnHover?: boolean;
  yoyo?: boolean;
}

export function GradientText({
  children,
  className = "",
  colors = ["#2563EB", "#60A5FA", "#2563EB"],
  animationSpeed = 8,
  showBorder = false,
  direction = "horizontal",
}: GradientTextProps) {
  const gradientAngle =
    direction === "horizontal"
      ? "to right"
      : direction === "vertical"
      ? "to bottom"
      : "to bottom right";

  const gradientColors = [...colors, colors[0]].join(", ");

  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
    backgroundSize:
      direction === "horizontal"
        ? "200% 100%"
        : direction === "vertical"
        ? "100% 200%"
        : "200% 200%",
    backgroundRepeat: "repeat",
    ["--animation-speed" as string]: `${animationSpeed}s`,
  };

  return (
    <span
      className={`animated-gradient-text ${showBorder ? "with-border" : ""} ${className}`.trim()}
    >
      {showBorder && (
        <span
          className="gradient-overlay"
          style={gradientStyle}
        />
      )}
      <span
        className="text-content animate-gradient"
        style={gradientStyle}
      >
        {children}
      </span>
    </span>
  );
}

export default GradientText;
