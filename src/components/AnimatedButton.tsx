'use client';

interface AnimatedButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function AnimatedButton({ 
  onClick, 
  children, 
  className = "",
  disabled = false
}: AnimatedButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`animated-button-wrapper cursor-pointer outline-none border-none bg-transparent ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <span className="animated-box">
        {children}
      </span>
    </button>
  );
} 