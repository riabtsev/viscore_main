"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

export type GalleryItem = {
  id: string;
  title: string;
  subtitle?: string;
  price: string;
  image: StaticImageData | string;
  images?: (StaticImageData | string)[];
  brand?: string;
  badge?: string;
  tags?: string[];
};

type GalleryCardProps = {
  item: GalleryItem;
  onClick?: (id: string) => void;
};

export default function GalleryCard({ item, onClick }: GalleryCardProps) {
  const images = useMemo(() => (item.images && item.images.length > 0 ? item.images : [item.image]), [item.images, item.image]);
  const [index, setIndex] = useState(0);
  const hoverRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const node = hoverRef.current;
    if (!node || images.length <= 1) return;
    const start = () => {
      if (timerRef.current) return;
      timerRef.current = setInterval(() => setIndex((i) => (i + 1) % images.length), 1200);
    };
    const stop = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIndex(0);
    };
    node.addEventListener('mouseenter', start);
    node.addEventListener('mouseleave', stop);
    return () => {
      node.removeEventListener('mouseenter', start);
      node.removeEventListener('mouseleave', stop);
      stop();
    };
  }, [images.length]);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(item.id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(item.id); }}
      className="group relative w-full overflow-hidden rounded-[28px] bg-white border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-300 text-left"
      aria-label={`${item.title} — открыть`}>

      {/* Image */}
      <div className="relative p-4 sm:p-5">
        {/* Badge */}
        {/* Image gallery panel */}
        <div ref={hoverRef} className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl bg-gray-50 border border-gray-200 overflow-hidden">
          {images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={item.title}
              className={`absolute inset-0 object-contain w-full h-full p-6 sm:p-8 transition-opacity duration-500 ${i === index ? 'opacity-100' : 'opacity-0'}`}
              sizes="(min-width:1024px) 42rem, (min-width:640px) 32rem, 22rem"
              unoptimized
            />
          ))}
          {/* Manual controls */}
          {images.length > 1 && (
            <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Изображение ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full ${i === index ? 'bg-black' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 px-5 sm:px-6 pb-6 -mt-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-gray-900 text-sm sm:text-base font-semibold">{item.price}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight">{item.title}</h3>
            {item.subtitle && (
              <p className="text-gray-600 text-xs sm:text-sm mt-1">{item.subtitle}</p>
            )}
          </div>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-black text-white shadow-md transition-transform duration-300 group-hover:scale-105">
            <ArrowUpRightIcon className="w-5 h-5" />
          </span>
        </div>

        {item.tags && item.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {item.tags.slice(0,3).map((t) => (
              <span key={t} className="text-[10px] px-2 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-700">{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


