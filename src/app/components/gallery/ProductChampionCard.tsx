"use client";
import React from 'react';
import Image, { StaticImageData } from 'next/image';

export type ProductAward =
  | 'Выбор покупателей'
  | 'Хит продаж'
  | 'Рекомендовано спортсменами'
  | 'Инновация года';

export type ProductChampion = {
  id: string;
  title: string;
  brand: string;
  price: string;
  image: StaticImageData | string;
  badges?: ProductAward[];
  attributes?: Array<{ label: string; value: string }>; // мини-хар-ки
  rating?: Array<{ label: string; value: number }>; // 0..100
};

type ProductChampionCardProps = {
  product: ProductChampion;
  onClick?: (id: string) => void;
};

export default function ProductChampionCard({ product, onClick }: ProductChampionCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(product.id)}
      className="group relative w-full text-left bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-5 sm:p-6 overflow-hidden border border-gray-800 hover:border-white/30 transition-colors duration-300"
      aria-label={`${product.title} — открыть`}>

      {/* Holographic sheen */}
      <div className="pointer-events-none absolute -inset-[1px] rounded-3xl" aria-hidden>
        <div className="absolute inset-0 opacity-[0.12] group-hover:opacity-[0.2] transition-opacity duration-500"
             style={{
               background:
                 'conic-gradient(from 90deg at 50% 50%, rgba(255,255,255,0.15), rgba(255,255,255,0), rgba(255,255,255,0.15))',
               filter: 'blur(8px)'
             }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
            <span className="text-[10px] font-black text-white tracking-wider">{product.brand}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">{product.title}</h3>
        </div>
        <div className="text-white font-black text-base sm:text-lg">{product.price}</div>
      </div>

      {/* Image */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-white/10 to-transparent border border-white/10 mb-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.15),_transparent_60%)]" aria-hidden />
        <Image
          src={product.image}
          alt={product.title}
          className="w-full h-auto object-contain"
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 18rem, 14rem"
          priority={false}
          unoptimized
        />
      </div>

      {/* Attributes */}
      {product.attributes && product.attributes.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {product.attributes.map((attr) => (
            <div key={attr.label} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="text-[11px] text-gray-300">
                <span className="text-white/80">{attr.label}:</span> {attr.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Awards */}
      {product.badges && product.badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {product.badges.map((b) => (
            <span key={b} className="text-[11px] font-semibold tracking-wide px-2 py-1 rounded-md bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-200 border border-yellow-500/30">
              {b}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}


