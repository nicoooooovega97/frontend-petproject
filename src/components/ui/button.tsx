// src/components/ui/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button = ({ 
  children, 
  className = "", 
  variant = 'primary', 
  size = 'md',
  ...props 
}: ButtonProps) => {
  // Estilos base
  const baseStyles = 'rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed';
  
  // Variantes
  const variantStyles = {
    primary: 'bg-[#00527C] text-white hover:bg-[#003d5c] focus:ring-[#00527C] shadow-md',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300',
    outline: 'border border-[#00527C] text-[#00527C] hover:bg-[#00527C]/10 focus:ring-[#00527C]'
  };
  
  // Tamaños
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;