/**
 * Раунды игр модуля «Точка»: вопросы, ключи сцен, верный индекс варианта (0..2).
 */

export type GameId = 'focus' | 'path';

/** Ключи визуальных сцен (рендер в module1GameViews) */
export type FocusSceneKey =
  | 'f_dual_equal' /** два равных акцента */
  | 'f_single_hero' /** один явный акцент */
  | 'f_tri_muted' /** несколько слабых равных точек */
  | 'f_low_contrast' /** точка сливается с массой */
  | 'f_high_contrast' /** контрастная изолированная */
  | 'f_obscured' /** акцент перекрыт */
  | 'f_big_mass_tiny_gray' /** огромные блоки, серая точка */
  | 'f_big_mass_accent_pop' /** большие блоки, яркая маленькая точка в воздухе */
  | 'f_flat_no_hierarchy' /** всё равнозначно без точки-героя */
  | 'f_cramped' /** точка зажата */
  | 'f_open_field' /** точка в воздухе */
  | 'f_corner_noise'; /** угол + шум */

export type PathSceneKey =
  | 'p_stair_to_dot' /** ступеньки ведут к точке */
  | 'p_chaos' /** хаос, нет направления */
  | 'p_away_from_dot' /** массы отвлекают от точки */
  | 'p_scan_hot_zone' /** точка зона первого контакта + контраст */
  | 'p_scan_cold' /** точка в слабой зоне */
  | 'p_scan_muted' /** точка тона фона */
  | 'p_second_neighbor' /** второй акцент рядом по оси */
  | 'p_second_far' /** только далеко */
  | 'p_second_compete'; /** два равных после точки */

export type GameRound<G extends GameId> = G extends 'focus'
  ? { question: string; options: readonly [FocusSceneKey, FocusSceneKey, FocusSceneKey]; correctIndex: 0 | 1 | 2 }
  : { question: string; options: readonly [PathSceneKey, PathSceneKey, PathSceneKey]; correctIndex: 0 | 1 | 2 };

export const FOCUS_ROUNDS: GameRound<'focus'>[] = [
  {
    question: 'Где ровно один главный акцент, без конкурентов за внимание?',
    options: ['f_single_hero', 'f_dual_equal', 'f_tri_muted'],
    correctIndex: 0,
  },
  {
    question: 'Где точка «читается» сильнее всего за счёт контраста к фону и фигурам?',
    options: ['f_low_contrast', 'f_obscured', 'f_high_contrast'],
    correctIndex: 2,
  },
  {
    question: 'Где небольшая точка тянет взгляд сильнее тяжёлых блоков?',
    options: ['f_big_mass_accent_pop', 'f_flat_no_hierarchy', 'f_big_mass_tiny_gray'],
    correctIndex: 0,
  },
  {
    question: 'Где негативное пространство помогает точке — её не зажимают массы?',
    options: ['f_cramped', 'f_open_field', 'f_corner_noise'],
    correctIndex: 1,
  },
];

export const PATH_ROUNDS: GameRound<'path'>[] = [
  {
    question: 'Куда композиция ведёт взгляд в первую очередь?',
    options: ['p_stair_to_dot', 'p_chaos', 'p_away_from_dot'],
    correctIndex: 0,
  },
  {
    question: 'Где проще всего заметить акцент при первом сканировании кадра?',
    options: ['p_scan_muted', 'p_scan_hot_zone', 'p_scan_cold'],
    correctIndex: 1,
  },
  {
    question: 'После главной точки куда логичнее перейти взгляду?',
    options: ['p_second_far', 'p_second_compete', 'p_second_neighbor'],
    correctIndex: 2,
  },
];