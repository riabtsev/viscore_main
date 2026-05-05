import type { Metadata } from 'next';
import Link from 'next/link';
import Module1Lesson from '../../../components/cabinet/lesson/Module1Lesson';
import ModuleLessonPlaceholder from '../../../components/cabinet/lesson/ModuleLessonPlaceholder';

type Props = { params: Promise<{ moduleId: string }> };

/** Статический экспорт: перечисляем сегменты маршрута явно */
export function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6, 7].map((n) => ({ moduleId: String(n) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { moduleId } = await params;
  const id = Number(moduleId);
  if (id === 1) {
    return { title: 'Модуль 1 — Точка · VisualCore', description: 'Урок: ознакомление, видео, игры, практика в Figma.' };
  }
  return {
    title: `Модуль ${moduleId} · VisualCore`,
    description: 'Материалы и задания модуля курса VisualCore.',
  };
}

function InvalidModule() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16 gap-4" style={{ background: '#F5F0EB' }}>
      <p className="text-sm font-semibold text-[#7A7065]">Такого модуля нет.</p>
      <Link href="/cabinet" className="text-sm font-extrabold text-[#FF4F1F]">
        ← В кабинет
      </Link>
    </div>
  );
}

export default async function CabinetModulePage({ params }: Props) {
  const { moduleId } = await params;
  const id = Number(moduleId);
  if (!Number.isFinite(id) || id < 1 || id > 7) {
    return <InvalidModule />;
  }
  if (id === 1) {
    return <Module1Lesson />;
  }
  return <ModuleLessonPlaceholder moduleId={id} />;
}
