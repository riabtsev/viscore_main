"use client";
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { GalleryItem } from './GalleryCard';

type GalleryLightboxProps = {
  product: GalleryItem;
  onClose: () => void;
};

export default function GalleryLightbox({ product, onClose }: GalleryLightboxProps) {
  const images = useMemo(() => (product.images && product.images.length > 0 ? product.images : [product.image]), [product.images, product.image]);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const handleClose = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => onClose(), 250);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => setOpen(true));
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = original;
    };
  }, [handleClose, next, prev]);

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={`Просмотр: ${product.title}`}>
      <div className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} onClick={handleClose} />
      <div className="relative z-[61] h-full w-full p-4 sm:p-6 flex items-center justify-center">
        <div className={`relative w-full max-w-5xl bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden transition-all duration-300 ease-out ${open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-1'}`}>
          {/* Close */}
          <button type="button" aria-label="Закрыть" onClick={handleClose} className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow">
            <XMarkIcon className="w-5 h-5" />
          </button>

          {/* Media */}
          <div className="relative bg-gray-50 border-b border-gray-200">
            <div className="relative mx-auto w-full" style={{ minHeight: '50vh', maxHeight: '80vh' }}>
              {images.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`${product.title} ${i + 1}`}
                  className={`absolute inset-0 m-auto w-full h-full object-contain transition-opacity duration-500 ${i === index ? 'opacity-100' : 'opacity-0'}`}
                  sizes="100vw"
                  unoptimized
                />
              ))}

              {images.length > 1 && (
                <>
                  <button type="button" aria-label="Предыдущее" onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow transition-transform duration-200 hover:scale-105">
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <button type="button" aria-label="Следующее" onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow transition-transform duration-200 hover:scale-105">
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
                    {images.map((_, i) => (
                      <button key={i} type="button" aria-label={`Изображение ${i + 1}`} onClick={() => setIndex(i)} className={`w-2.5 h-2.5 rounded-full ${i === index ? 'bg-black' : 'bg-gray-300'}`} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Caption */}
          <div className="px-5 sm:px-6 py-4 text-center">
            <h3 className="text-lg sm:text-xl font-black text-black">{product.title}</h3>
            {product.subtitle && <p className="text-sm text-gray-600 mt-1">{product.subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}


