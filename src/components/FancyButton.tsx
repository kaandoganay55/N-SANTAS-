'use client';

import Link from 'next/link';

interface FancyButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'dark' | 'light';
}

export default function FancyButton({ 
  href, 
  onClick, 
  children, 
  className = "",
  variant = 'dark'
}: FancyButtonProps) {
  const baseClasses = `
    fancy-button
    relative inline-block
    bg-transparent cursor-pointer
    font-bold tracking-wide
    m-0 outline-none overflow-visible
    text-center no-underline
    transition-all duration-500 ease-in-out
    select-none text-sm
    px-8 py-5
    ${variant === 'dark' 
      ? 'border-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white' 
      : 'border-2 border-white text-white hover:bg-white hover:text-stone-900'
    }
    ${className}
  `;

  const beforeClasses = `
    before:content-[''] before:w-6 before:h-0.5 
    ${variant === 'dark' ? 'before:bg-stone-900' : 'before:bg-white'}
    before:top-1/2 before:left-6 before:absolute
    before:-translate-y-1/2 before:origin-center
    before:transition-all before:duration-500
    hover:before:w-4 
    ${variant === 'dark' ? 'hover:before:bg-white' : 'hover:before:bg-stone-900'}
  `;

  const content = (
    <>
      <span className="absolute h-0.5 w-6 -top-0.5 left-2.5 bg-gray-400 transition-all duration-500 ease-out fancy-top-key"></span>
      <span className={`
        block text-left transition-all duration-500 ease-in-out
        uppercase no-underline pl-8 fancy-text
        ${variant === 'dark' ? 'text-stone-900' : 'text-white'}
      `}>
        {children}
      </span>
      <span className="absolute h-0.5 w-6 -bottom-0.5 right-7 bg-gray-400 transition-all duration-500 ease-out fancy-bottom-key-1"></span>
      <span className="absolute h-0.5 w-2.5 -bottom-0.5 right-2.5 bg-gray-400 transition-all duration-500 ease-out fancy-bottom-key-2"></span>
    </>
  );

  if (href) {
    return (
      <Link 
        href={href}
        className={`${baseClasses} ${beforeClasses}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${beforeClasses}`}
    >
      {content}
    </button>
  );
} 