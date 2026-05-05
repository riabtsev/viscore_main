import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'О платформе — VisualCore',
  description:
    'VisualCore — принципы обучения дизайну: от точки до типографики. Педагог, партнёры и как мы учим.',
  alternates: { canonical: '/about' },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
