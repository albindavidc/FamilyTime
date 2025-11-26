import React from 'react';
import { cn } from '../../lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-lg backdrop-blur-md",
        hoverEffect && "transition-all duration-300 hover:bg-white/5 hover:scale-[1.01] hover:shadow-xl cursor-pointer",
        className
      )}
      {...props}
    >
      {/* Shine effect overlay */}
      <div className="pointer-events-none absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-20 group-hover:animate-shine" />
      {children}
    </div>
  );
}
