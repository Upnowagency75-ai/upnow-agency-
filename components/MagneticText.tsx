"use client";

import { useRef } from "react";

interface Props {
  children: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  style?: React.CSSProperties;
  className?: string;
}

export default function MagneticText({ children, tag: Tag = "span", style, className }: Props) {
  const containerRef = useRef<HTMLElement>(null);

  const applyMagnetic = (clientX: number, clientY: number) => {
    const el = containerRef.current;
    if (!el) return;
    const chars = el.querySelectorAll<HTMLSpanElement>(".split-char");
    const rect  = el.getBoundingClientRect();
    const mx    = clientX - rect.left;
    const my    = clientY - rect.top;

    chars.forEach((char) => {
      const cr   = char.getBoundingClientRect();
      const cx   = cr.left - rect.left + cr.width  / 2;
      const cy   = cr.top  - rect.top  + cr.height / 2;
      const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
      const max  = 90;

      if (dist < max) {
        const force = (max - dist) / max;
        const dx    = (mx - cx) * force * 0.35;
        const dy    = (my - cy) * force * 0.35;
        char.style.transform = `translate(${dx}px, ${dy}px)`;
        char.style.color     = `rgba(41,151,255,${0.4 + force * 0.6})`;
      } else {
        char.style.transform = "";
        char.style.color     = "";
      }
    });
  };

  const resetMagnetic = () => {
    const el = containerRef.current;
    if (!el) return;
    el.querySelectorAll<HTMLSpanElement>(".split-char").forEach((char) => {
      char.style.transform = "";
      char.style.color     = "";
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    applyMagnetic(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    const touch = e.touches[0];
    if (touch) applyMagnetic(touch.clientX, touch.clientY);
  };

  const words = children.split(" ");
  const letters = words.map((word, wi) => (
    <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
      {word.split("").map((char, ci) => (
        <span key={ci} className="split-char">{char}</span>
      ))}
      {wi < words.length - 1 && <span style={{ display: "inline" }}>&nbsp;</span>}
    </span>
  ));

  const AnyTag = Tag as React.ElementType;
  return (
    <AnyTag
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMagnetic}
      onTouchMove={handleTouchMove}
      onTouchEnd={resetMagnetic}
      style={{ display: "inline-block", cursor: "default", ...style }}
      className={className}
    >
      {letters}
    </AnyTag>
  );
}
