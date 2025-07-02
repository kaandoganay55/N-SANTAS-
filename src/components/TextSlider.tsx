'use client';

import { useEffect, useState } from 'react';

interface TextSliderProps {
  texts: string[];
  speed?: number;
  className?: string;
  textColor?: string;
  direction?: 'left' | 'right';
  separator?: string;
}

export default function TextSlider({ 
  texts, 
  speed = 30, 
  className = "",
  textColor = "text-stone-800",
  direction = 'left',
  separator = "•"
}: TextSliderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Server-side rendering için placeholder
    return (
      <div className={`w-full overflow-hidden whitespace-nowrap relative text-slider-container ${className}`}>
        <div className="flex w-full">
          <span className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold ${textColor} tracking-[0.15em] sm:tracking-[0.2em] uppercase mx-4 sm:mx-6 md:mx-8 opacity-0`}>
            Loading...
          </span>
        </div>
      </div>
    );
  }

  const animationClass = direction === 'left' ? 'animate-scroll-text' : 'animate-scroll-text-reverse';

  return (
    <div className={`w-full overflow-hidden whitespace-nowrap relative text-slider-container ${className}`}>
      <div className={`flex ${animationClass} w-full`} style={{ animationDuration: `${speed}s` }}>
        {/* First set of texts */}
        {texts.map((text, index) => (
          <div key={`first-${index}`} className="flex items-center flex-shrink-0">
            <span className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold ${textColor} tracking-[0.15em] sm:tracking-[0.2em] uppercase mx-4 sm:mx-6 md:mx-8`}>
              {text}
            </span>
            {index < texts.length - 1 && (
              <span className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl ${textColor} opacity-50 mx-2 sm:mx-4`}>
                {separator}
              </span>
            )}
          </div>
        ))}
        {/* Separator between sets */}
        <span className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl ${textColor} opacity-50 mx-4 sm:mx-6 md:mx-8`}>
          {separator}
        </span>
        {/* Duplicate set for seamless loop */}
        {texts.map((text, index) => (
          <div key={`second-${index}`} className="flex items-center flex-shrink-0">
            <span className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold ${textColor} tracking-[0.15em] sm:tracking-[0.2em] uppercase mx-4 sm:mx-6 md:mx-8`}>
              {text}
            </span>
            {index < texts.length - 1 && (
              <span className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl ${textColor} opacity-50 mx-2 sm:mx-4`}>
                {separator}
              </span>
            )}
          </div>
        ))}
        {/* Separator at end */}
        <span className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl ${textColor} opacity-50 mx-4 sm:mx-6 md:mx-8`}>
          {separator}
        </span>
      </div>
    </div>
  );
} 