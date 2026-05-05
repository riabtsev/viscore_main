import Link from 'next/link';

const ACCENT = '#FF4F1F';

const MODULE_TITLE: Record<number, string> = {
  2: 'Линия',
  3: 'Форма',
  4: 'Композиция',
  5: 'Цвет',
  6: 'Типографика',
  7: 'Итоговый проект',
};

export default function ModuleLessonPlaceholder({ moduleId }: { moduleId: number }) {
  const title = MODULE_TITLE[moduleId] ?? `Модуль ${moduleId}`;

  return (
    <div className="min-h-[100dvh] flex flex-col items-center px-6 py-16" style={{ background: '#F5F0EB' }}>
      <div
        className="w-[72px] h-[72px] rounded-[22px] flex items-center justify-center mb-5 border border-black/[0.08]"
        style={{ background: 'rgba(17,17,16,0.04)' }}
        aria-hidden
      >
        <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="#9A8E85" strokeWidth="2">
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 018 0v3" strokeLinecap="round" />
        </svg>
      </div>
      <div className="text-[0.7rem] font-black uppercase tracking-[0.14em] text-[#9A8E85] mb-2 text-center">{title}</div>
      <h1 className="text-2xl font-black text-[#111110] tracking-tight text-center mb-3 max-w-lg">Урок недоступен</h1>
      <p className="text-sm text-[#7A7065] text-center max-w-md leading-relaxed mb-8">
        Для открытия этого блока пройди модуль «Точка» и закрепи материал. Остальные модули курса появятся здесь последовательно — так
        выстроена программа VisualCore.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/cabinet/module/1"
          className="inline-flex rounded-xl py-3 px-6 font-extrabold text-sm text-white border-none"
          style={{ background: ACCENT }}
        >
          Открыть «Точка»
        </Link>
        <Link href="/cabinet" className="inline-flex rounded-xl py-3 px-6 font-extrabold text-sm border border-black/[0.1] text-[#111110] bg-white">
          В кабинет
        </Link>
      </div>
    </div>
  );
}
