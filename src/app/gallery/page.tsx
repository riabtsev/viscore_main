"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import GalleryCard, { GalleryItem } from '../components/gallery/GalleryCard';
import GalleryLightbox from '../components/gallery/GalleryLightbox';
import { mockProducts, accessoryProducts } from '../components/gallery/mockProducts';
import FiltersBar from '../components/gallery/FiltersBar';
 

export default function GalleryPage() {
  const allItems: GalleryItem[] = useMemo(
    () => [...mockProducts, ...accessoryProducts],
    []
  );
  const [category, setCategory] = useState<string>('Все');
  const items: GalleryItem[] = useMemo(() => {
    if (category === 'Все') return allItems;
    if (category === 'Модули') return mockProducts;
    if (category === 'Инструменты') return accessoryProducts;
    return allItems;
  }, [allItems, category]);
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Pause background video when hero leaves viewport or when user prefers reduced motion
  useEffect(() => {
    const media = videoRef.current;
    if (!media) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReduced.matches) {
      media.pause();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            media.play().catch(() => {});
          } else {
            media.pause();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(media);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white text-black min-h-screen">
      <NavBar />

      {/* Video Hero in framed card */}
      <section className="pt-20 sm:pt-24 lg:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px] border border-gray-200 shadow-2xl bg-black">
            <video
              ref={videoRef}
              className="w-full h-[36vh] sm:h-[44vh] lg:h-[52vh] object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/practice.png"
            >
              <source src="/videos/gallery.webm" type="video/webm" />
            </video>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-6 sm:p-10 lg:p-14 text-center">
                <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4 text-white">Шоукейс VisualCore</h1>
                <p className="text-gray-200 text-base sm:text-xl max-w-2xl mx-auto">
                  Модули, практики и гайды по инструментам — в одном каталоге.<br />
                  Загляни в урок и продолжи путь в кабинете.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section id="grid" className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FiltersBar categories={["Все", "Модули", "Инструменты"]} onChange={(c) => setCategory(c)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-2">
            {items.map((it) => (
              <GalleryCard key={it.id} item={it} onClick={() => setSelected(it)} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button type="button" className="px-6 py-3 rounded-2xl border border-gray-300 bg-white hover:bg-gray-50 text-sm font-bold">Показать ещё</button>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-black mb-2 text-black">Учиться проще вместе</h2>
            <p className="text-gray-600 text-sm sm:text-base">Практика, короткая обратная связь и понятный путь от идеи до макета — без воды и с фокусом на портфолио.</p>
          </div>
        </div>
      </section>

      <Footer />

      {selected && (
        <GalleryLightbox product={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}


