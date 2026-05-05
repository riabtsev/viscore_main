"use client";
import React, { useState } from 'react';

type FiltersBarProps = {
  onChange?: (category: string) => void;
  categories: string[]; // e.g. ['Все','Носки','Аксессуары']
  defaultCategory?: string;
};

export default function FiltersBar({ onChange, categories, defaultCategory = 'Все' }: FiltersBarProps) {
  const [category, setCategory] = useState<string>(defaultCategory);

  const emit = (c: string) => onChange?.(c);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 py-4">
      <h2 className="text-xl sm:text-2xl font-black text-black">Категории</h2>

      <div className="overflow-x-auto no-scrollbar max-w-full">
        <div className="flex items-center gap-2 whitespace-nowrap">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setCategory(cat);
                emit(cat);
              }}
              className={`px-3 py-2 rounded-xl text-sm border transition-colors ${category === cat ? 'bg-black text-white border-black' : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


