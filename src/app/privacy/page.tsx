import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности · VisualCore',
  description: 'Как VisualCore обрабатывает персональные данные пользователей платформы.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-[100dvh] px-6 py-16 sm:py-24" style={{ background: '#F5F0EB' }}>
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm font-bold text-[#FF4F1F] mb-8 inline-block">
          ← На главную
        </Link>
        <h1 className="text-3xl sm:text-4xl font-black text-[#111110] tracking-tight mb-4">Политика конфиденциальности</h1>
        <p className="text-sm text-[#7A7065] leading-relaxed mb-8">
          Ниже — ключевые положения обработки данных. Полный юридический текст может дополняться по мере масштабирования сервиса; актуальная
          редакция всегда доступна по этому адресу.
        </p>
        <div className="rounded-2xl border border-[#E8E1D8] bg-white p-6 sm:p-8 space-y-4 text-sm text-[#4A433A] leading-relaxed">
          <p>
            VisualCore может собирать минимально необходимые данные для работы аккаунта (имя, контакт для входа), статистику прохождения
            модулей и работы пользователя для отображения в кабинете и связи с педагогом.
          </p>
          <p>
            Вы можете запросить уточнение по хранению и удалению данных, написав в поддержку через канал обратной связи в подвале сайта.
          </p>
        </div>
      </div>
    </div>
  );
}
