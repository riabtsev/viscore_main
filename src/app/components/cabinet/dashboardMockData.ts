export const DASHBOARD_USER = {
  name: 'Александра',
  surname: 'М.',
  role: 'Дизайнер-Джуниор',
  level: 3,
  xp: 1240,
  xpNext: 1600,
  modulesTotal: 7,
  modulesDone: 0,
  /** Завершённые по курсу (для шкалы прогресса на карточке рейтинга); старт «Точка» в процессе */
  modulesCompletedForProgress: 1,
  rating: 12,
  ratingTotal: 87,
};

export type ModuleRow = {
  id: number;
  name: string;
  icon: string;
  color: string;
  done: boolean;
  xp: number;
  grade?: string;
  current?: boolean;
  desc: string;
};

export const DASHBOARD_MODULES: ModuleRow[] = [
  { id: 1, name: 'Точка', icon: '·', color: '#3A5AF0', done: false, xp: 0, current: true, desc: 'Начало всего' },
  { id: 2, name: 'Линия', icon: '─', color: '#7C5AF0', done: false, xp: 0, desc: 'Движение и ритм' },
  { id: 3, name: 'Форма', icon: '▲', color: '#FF9F0A', done: false, xp: 0, desc: 'Геометрия эмоций' },
  { id: 4, name: 'Композиция', icon: '⊞', color: '#FF4F1F', done: false, xp: 0, desc: 'Баланс и структура' },
  { id: 5, name: 'Цвет', icon: '◐', color: '#A855F7', done: false, xp: 0, desc: 'Палитра и контраст' },
  { id: 6, name: 'Типографика', icon: 'Aa', color: '#E8453C', done: false, xp: 0, desc: 'Текст как визуал' },
  { id: 7, name: 'Итоговый проект', icon: '✦', color: '#22C55E', done: false, xp: 0, desc: 'Практика и сборка' },
];

export type BadgeRow = {
  id: number;
  icon: string;
  name: string;
  earned: boolean;
  color: string;
};

export const DASHBOARD_BADGES: BadgeRow[] = [
  { id: 1, icon: '·', name: 'Точка зрения', earned: false, color: '#3A5AF0' },
  { id: 2, icon: '─', name: 'Прямой путь', earned: false, color: '#7C5AF0' },
  { id: 3, icon: '▲', name: 'Геометр', earned: false, color: '#FF9F0A' },
  { id: 4, icon: '⊞', name: 'Баланс', earned: false, color: '#FF4F1F' },
  { id: 5, icon: '◐', name: 'Палитра', earned: false, color: '#A855F7' },
  { id: 6, icon: 'Aa', name: 'Шрифтоман', earned: false, color: '#E8453C' },
  { id: 7, icon: '✦', name: 'Финалист', earned: false, color: '#22C55E' },
  { id: 8, icon: '★', name: 'Топ-10', earned: false, color: '#9A8E85' },
];

export type PortfolioRow = {
  id: number;
  module: string;
  title: string;
  grade: string;
  color: string;
  pattern: 'dots' | 'lines' | 'shapes' | 'comp';
};

export const DASHBOARD_PORTFOLIO: PortfolioRow[] = [
  { id: 1, module: 'Точка', title: 'Ритм точек', grade: '—', color: '#3A5AF0', pattern: 'dots' },
];

export type FeedbackRow = {
  id: number;
  module: string;
  grade: string;
  date: string;
  color: string;
  text: string;
  tags: string[];
};

export const DASHBOARD_FEEDBACK: FeedbackRow[] = [
  {
    id: 1,
    module: 'Точка',
    grade: 'A',
    date: '12 апр',
    color: '#3A5AF0',
    text: 'Отличная работа с ритмом и паузами. Видно чувство пространства. Обрати внимание на равномерность размеров — в верхнем правом углу точки немного крупнее. В целом — уверенный результат.',
    tags: ['Ритм', 'Пространство'],
  },
];
