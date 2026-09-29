import React, { useState } from 'react';

interface BakeryImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectClass?: string;
}

export const BakeryImage: React.FC<BakeryImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]',
  containerClassName = 'relative overflow-hidden bg-[#FAF6F7]',
  aspectClass = '',
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`${containerClassName} ${aspectClass}`}>
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={className}
        />
      ) : (
        <div
          className="w-full h-full min-h-[200px] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FDF6F8] via-[#FAF3F5] to-[#F7EFE4] border border-[#E8D8C0]/50"
          role="img"
          aria-label={alt}
        >
          <svg
            className="w-10 h-10 text-[#C5A059] mb-3 opacity-85"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
            <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
            <path d="M2 21h20" />
            <path d="M7 8v3" />
            <path d="M12 8v3" />
            <path d="M17 8v3" />
            <path d="M7 4h.01" />
            <path d="M12 4h.01" />
            <path d="M17 4h.01" />
          </svg>
          <span className="font-serif text-base font-medium text-[#23191C] line-clamp-2 max-w-[220px]">
            {alt}
          </span>
          <span className="text-[11px] text-[#8B7379] mt-1">
            Cake Grand Shop · Islamabad
          </span>
        </div>
      )}
    </div>
  );
};
