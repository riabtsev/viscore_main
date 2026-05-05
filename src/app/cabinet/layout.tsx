import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Личный кабинет — VisualCore',
  description: 'Прогресс, модули, достижения и портфолио.',
  alternates: { canonical: '/cabinet' },
};

export default function CabinetLayout({ children }: { children: ReactNode }) {
  return children;
}
