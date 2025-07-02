'use client';

interface BurgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export default function BurgerMenu({ isOpen, onToggle, className = "" }: BurgerMenuProps) {
  return (
    <label className={`burger-menu relative w-10 h-8 bg-transparent cursor-pointer block ${className}`}>
      <input 
        type="checkbox" 
        checked={isOpen}
        onChange={onToggle}
        className="hidden"
      />
      <span className={`
        block absolute h-1 w-full bg-stone-800 rounded-lg opacity-100 left-0
        transition-all duration-300 ease-in-out origin-left-center
        top-0
        ${isOpen ? 'rotate-45 !top-0 !left-1' : 'rotate-0'}
      `}></span>
      <span className={`
        block absolute h-1 w-full bg-stone-800 rounded-lg opacity-100 left-0
        transition-all duration-300 ease-in-out origin-left-center
        top-1/2 -translate-y-1/2
        ${isOpen ? '!w-0 !opacity-0' : 'w-full opacity-100'}
      `}></span>
      <span className={`
        block absolute h-1 w-full bg-stone-800 rounded-lg opacity-100 left-0
        transition-all duration-300 ease-in-out origin-left-center
        top-full -translate-y-full
        ${isOpen ? '-rotate-45 !top-7 !left-1' : 'rotate-0'}
      `}></span>
    </label>
  );
} 