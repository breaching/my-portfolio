interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  repeat?: number;
}

export function Marquee({
  className = "",
  reverse = false,
  pauseOnHover = false,
  children,
  repeat = 4,
}: MarqueeProps) {
  return (
    <div
      className={`group flex overflow-hidden [--duration:40s] [--gap:2rem] gap-[var(--gap)] ${className}`}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={`flex shrink-0 justify-around gap-[var(--gap)] animate-marquee ${
              pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
            } ${reverse ? "[animation-direction:reverse]" : ""}`}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
