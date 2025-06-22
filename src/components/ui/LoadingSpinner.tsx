// src/components/ui/LoadingSpinner.tsx
'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export default function LoadingSpinner({
  size = 'md',
  color = '#00527C',
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-solid border-t-transparent ${sizeClasses[size]}`}
        style={{ borderColor: color }}
      ></div>
    </div>
  );
}