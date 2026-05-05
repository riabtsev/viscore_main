import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4 py-24 text-[#332E2E] bg-[#FAFAF8]">
      <h1 className="text-2xl font-semibold tracking-tight">Страница не найдена</h1>
      <p className="text-sm text-neutral-600 text-center max-w-md">
        Ссылка устарела или адрес набран неверно. Вернитесь на главную.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-neutral-950 text-white px-5 py-2.5 text-sm font-medium hover:bg-neutral-800 transition-colors"
      >
        На главную
      </Link>
    </div>
  );
}
