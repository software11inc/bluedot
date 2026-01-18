"use client";

interface HeroCirclesAnimatedProps {
  className?: string;
}

export default function HeroCirclesAnimated({ className }: HeroCirclesAnimatedProps) {
  return (
    <svg
      width="75"
      height="50"
      viewBox="0 0 75 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_hero_circles)">
        {/* Left crescent (blue) - slides in from left */}
        <path
          d="M25.0003 25C25.0003 15.7468 30.0277 7.66786 37.5 3.34571C33.8227 1.21787 29.554 0 25.0003 0C11.1932 0 0 11.1931 0 25C0 38.8069 11.1932 50 25.0003 50C29.554 50 33.8234 48.7821 37.5 46.6543C30.0277 42.3314 25.0003 34.2532 25.0003 25Z"
          fill="#1C39BB"
          className="animate-circle-left"
        />
        {/* Right crescent (gray) - slides in from right */}
        <path
          d="M50.0005 0C45.4468 0 41.1781 1.21787 37.5007 3.34571C44.9731 7.66862 50.0005 15.7468 50.0005 25C50.0005 34.2532 44.9731 42.3321 37.5007 46.6543C41.1781 48.7814 45.4468 50 50.0005 50C63.8075 50 75.0007 38.8069 75.0007 25C75.0007 11.1931 63.8075 0 50.0005 0Z"
          fill="#9F9F9F"
          className="animate-circle-right"
        />
      </g>
      <defs>
        <clipPath id="clip0_hero_circles">
          <rect width="75" height="50" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
