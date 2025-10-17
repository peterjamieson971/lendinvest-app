import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  highlighted?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  highlighted = false,
  onClick
}) => {
  const baseClasses = "bg-white rounded-xl border shadow-sm transition-all duration-200";
  const hoverClasses = hover ? "hover:shadow-md hover:border-[#CBD5E1] cursor-pointer hover:-translate-y-0.5" : "";
  const highlightClasses = highlighted
    ? "border-[#FFB800] bg-[#FFFBF0] shadow-md"
    : "border-[#E2E8F0]";

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${highlightClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
