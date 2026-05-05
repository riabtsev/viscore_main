import type { StaticImageData } from 'next/image';
import lesson1 from '../../../../public/lesson1.png';
import practice from '../../../../public/practice.png';
import pedagog from '../../../../public/pedagog.png';
import ai from '../../../../public/ai.png';
import sheredar from '../../../../public/sheredar.png';
import vks from '../../../../public/vks.png';
import figma from '../../../../public/figma.png';
import photoshop from '../../../../public/photoshop.png';
import procreate from '../../../../public/procreate.png';
import principle from '../../../../public/principle.png';
import framer from '../../../../public/framer.png';

export type MockProduct = {
  id: string;
  title: string;
  subtitle?: string;
  price: string;
  image: StaticImageData | string;
  images?: (StaticImageData | string)[];
  brand?: string;
  badge?: string;
  tags?: string[];
};

export const mockProducts: MockProduct[] = [
  {
    id: 'module-visual-language',
    title: 'Модуль 1: визуальный язык',
    subtitle: 'Композиция, контраст и сетки на практике',
    price: 'Входит в тариф',
    image: lesson1,
    images: [lesson1, practice],
    brand: 'VisualCore',
    tags: ['Композиция', 'Сетки', 'Старт'],
  },
  {
    id: 'module-practice',
    title: 'Практикум: от референса к макету',
    subtitle: 'Сбор визуальной идеи и быстрые итерации',
    price: 'Входит в тариф',
    image: practice,
    images: [practice, lesson1],
    brand: 'VisualCore',
    tags: ['Практика', 'Итерации'],
  },
  {
    id: 'module-typography',
    title: 'Типографика и иерархия',
    subtitle: 'Читабельность, ритм и акценты в интерфейсе',
    price: 'Скоро',
    image: pedagog,
    images: [pedagog, ai],
    brand: 'VisualCore',
    badge: 'Скоро',
    tags: ['Типографика', 'UI'],
  },
  {
    id: 'module-ai-assist',
    title: 'AI в дизайн-процессе',
    subtitle: 'Где генеративный инструмент помогает, а где мешает',
    price: 'Входит в тариф',
    image: ai,
    images: [ai, vks],
    brand: 'VisualCore',
    tags: ['AI', 'Workflow'],
  },
  {
    id: 'module-portfolio',
    title: 'Портфолио с первого дня',
    subtitle: 'Структура кейса и подача результатов',
    price: 'Входит в тариф',
    image: sheredar,
    images: [sheredar, practice],
    brand: 'VisualCore',
    tags: ['Портфолио', 'Подача'],
  },
  {
    id: 'module-community',
    title: 'Сообщество и разборы',
    subtitle: 'Живые Q&A и обратная связь по работам',
    price: 'Pro',
    image: vks,
    images: [vks, lesson1],
    brand: 'VisualCore',
    tags: ['Разборы', 'Q&A'],
  },
];

export const accessoryProducts: MockProduct[] = [
  {
    id: 'track-figma',
    title: 'Figma: системный макет',
    subtitle: 'Компоненты, автолейаут и дизайн-системы',
    price: 'Гайд',
    image: figma,
    images: [figma, principle],
    brand: 'VisualCore',
    tags: ['Инструменты', 'UI', 'Компоненты'],
  },
  {
    id: 'track-photoshop',
    title: 'Photoshop для визуала',
    subtitle: 'Растр, маски и финальная полировка',
    price: 'Гайд',
    image: photoshop,
    images: [photoshop, procreate],
    brand: 'VisualCore',
    tags: ['Растр', 'Постобработка'],
  },
  {
    id: 'track-procreate',
    title: 'Procreate и скетчи',
    subtitle: 'Быстрые зарисовки и иллюстрация',
    price: 'Гайд',
    image: procreate,
    images: [procreate, pedagog],
    brand: 'VisualCore',
    tags: ['Скетч', 'Иллюстрация'],
  },
  {
    id: 'track-framer-principle',
    title: 'Прото в Framer и Principle',
    subtitle: 'Интерактивные состояния без лишней суеты',
    price: 'Гайд',
    image: framer,
    images: [framer, principle],
    brand: 'VisualCore',
    tags: ['Прототип', 'Motion'],
  },
];

