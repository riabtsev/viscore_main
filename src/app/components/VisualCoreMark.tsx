type VisualCoreMarkProps = {
  className?: string;
  /** Сторона квадрата марки в px (как во вкладке браузера) */
  size?: number;
};

/**
 * Марка VisualCore — совпадает с `public/favicon.svg` (оранжевый квадрат, белый контраст-круг).
 */
export function VisualCoreMark({ className = "", size = 36 }: VisualCoreMarkProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="32" height="32" rx="9" fill="#FF4F1F" />
      <circle cx="16" cy="16" r="7.5" stroke="white" strokeWidth="1.75" fill="none" />
      <path fill="white" d="M16 8.5 A7.5 7.5 0 0 1 16 23.5 Z" />
    </svg>
  );
}
