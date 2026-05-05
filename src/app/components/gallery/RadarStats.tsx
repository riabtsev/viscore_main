import React from 'react';

export type RadarMetricLabel =
  | 'Прочность'
  | 'Лёгкость'
  | 'Долговечность'
  | 'Удобство'
  | 'Технологичность'
  | 'Цена/качество';

export type RadarDatum = {
  label: RadarMetricLabel;
  value: number; // 0..100
};

type RadarStatsProps = {
  title?: string;
  size?: number; // px
  levels?: number; // grid rings
  data: RadarDatum[]; // expected length = 6
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export default function RadarStats({
  title = 'Профиль характеристик',
  size = 300,
  levels = 5,
  data,
}: RadarStatsProps) {
  const metrics = data.slice(0, 6);
  const count = metrics.length;
  const radius = size / 2 - 16;
  const center = { x: size / 2, y: size / 2 };

  const angleForIndex = (index: number) => (Math.PI * 2 * index) / count - Math.PI / 2; // start at top

  const pointAt = (ratio: number, angle: number) => ({
    x: center.x + Math.cos(angle) * radius * ratio,
    y: center.y + Math.sin(angle) * radius * ratio,
  });

  const gridLevels = Array.from({ length: levels }, (_, i) => (i + 1) / levels);

  const polygonPoints = metrics
    .map((m, i) => {
      const v = clamp(m.value, 0, 100) / 100;
      const a = angleForIndex(i);
      const p = pointAt(v, a);
      return `${p.x},${p.y}`;
    })
    .join(' ');

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-black text-black">{title}</h3>
        <span className="text-xs text-gray-500">0–100</span>
      </div>

      <svg
        role="img"
        aria-label={`${title}`}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="mx-auto block"
      >
        <defs>
          <linearGradient id="radarFill" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#111827" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#111827" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Grid rings */}
        {gridLevels.map((lvl, idx) => {
          const ringPoints = metrics
            .map((_, i) => {
              const a = angleForIndex(i);
              const p = pointAt(lvl, a);
              return `${p.x},${p.y}`;
            })
            .join(' ');
          return (
            <polygon
              key={`grid-${idx}`}
              points={ringPoints}
              fill="none"
              stroke="#E5E7EB"
              strokeWidth={1}
            />
          );
        })}

        {/* Axes */}
        {metrics.map((m, i) => {
          const a = angleForIndex(i);
          const p = pointAt(1, a);
          return (
            <line
              key={`axis-${m.label}`}
              x1={center.x}
              y1={center.y}
              x2={p.x}
              y2={p.y}
              stroke="#E5E7EB"
              strokeWidth={1}
            />
          );
        })}

        {/* Data polygon */}
        <polygon
          points={polygonPoints}
          fill="url(#radarFill)"
          stroke="#111827"
          strokeOpacity={0.6}
          strokeWidth={2}
        />

        {/* Points */}
        {metrics.map((m, i) => {
          const v = clamp(m.value, 0, 100) / 100;
          const a = angleForIndex(i);
          const p = pointAt(v, a);
          return <circle key={`dot-${m.label}`} cx={p.x} cy={p.y} r={3} fill="#111827" />;
        })}

        {/* Labels */}
        {metrics.map((m, i) => {
          const a = angleForIndex(i);
          const p = pointAt(1.08, a);
          const anchor: 'start' | 'middle' | 'end' =
            Math.cos(a) > 0.1 ? 'start' : Math.cos(a) < -0.1 ? 'end' : 'middle';
          return (
            <text
              key={`label-${m.label}`}
              x={p.x}
              y={p.y}
              textAnchor={anchor}
              className="fill-gray-600 text-[10px] sm:text-[12px]"
            >
              {m.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}


