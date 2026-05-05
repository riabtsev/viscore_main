'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import {
  MODULE1_META,
  MODULE1_TRACK,
  module1AfterPracticeBridge,
  module1EditorHint,
  module1Games,
  module1GamesIntro,
  module1HeroLead,
  module1HeroTitle,
  module1Highlight,
  module1NotesLead,
  module1NotesTitle,
  module1PracticeIntro,
  module1PracticeTask,
  module1ResourcesHint,
  module1TheoryBody,
  module1TheoryTitle,
} from './module1Content';
import { FOCUS_ROUNDS, PATH_ROUNDS } from './module1GameScenes';
import { GameFocusScene, GamePathScene } from './module1GameViews';

const ACCENT = '#FF4F1F';
const BASE = '#F5F0EB';
const CARD = '#111110';
const STROKE = '#E2E8F0';

type GameId = (typeof module1Games)[number]['id'];

function GameResultModal({
  open,
  percent,
  xp,
  title,
  onClose,
}: {
  open: boolean;
  percent: number;
  xp: number;
  title: string;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: 'rgba(17,17,16,0.45)' }}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-result-title"
        className="w-full max-w-md rounded-[22px] p-6 sm:p-8 shadow-2xl border border-black/[0.06] bg-white"
      >
        <div id="game-result-title" className="text-[0.7rem] font-black uppercase tracking-[0.12em] text-[#9A8E85] mb-1">
          Результат
        </div>
        <h2 className="text-xl font-black text-[#111110] tracking-tight mb-4">{title}</h2>
        <div className="flex items-end gap-2 mb-2">
          <span className="text-[2.75rem] font-black leading-none tabular-nums" style={{ color: ACCENT }}>
            {percent}
          </span>
          <span className="text-lg font-bold text-[#9A8E85] pb-1">%</span>
        </div>
        <p className="text-sm text-[#7A7065] leading-relaxed mb-6">
          Точность ответов влияет на начисление опыта за это упражнение. Повтори попытку, если хочешь поднять балл.
        </p>
        <div
          className="rounded-2xl px-4 py-3 mb-6 flex items-center justify-between"
          style={{ background: 'rgba(255,79,31,0.08)' }}
        >
          <span className="text-sm font-bold text-[#111110]">Опыт</span>
          <span className="text-lg font-black tabular-nums" style={{ color: ACCENT }}>
            +{xp} XP
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl py-3 font-extrabold text-white border-none cursor-pointer"
          style={{ background: ACCENT }}
        >
          Продолжить
        </button>
      </div>
    </div>
  );
}

function ExpandableSurface({
  expanded,
  onToggle,
  labelCollapsed,
  labelExpanded,
  children,
}: {
  expanded: boolean;
  onToggle: () => void;
  labelCollapsed: string;
  labelExpanded: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative rounded-[24px] overflow-hidden border border-black/[0.07] bg-white transition-shadow duration-200 ${
        expanded ? 'fixed inset-3 sm:inset-6 z-[150] shadow-2xl' : 'shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)]'
      }`}
    >
      <div className="absolute top-3 right-3 z-20">
        <button
          type="button"
          onClick={onToggle}
          className="text-[11px] font-bold uppercase tracking-wider rounded-full px-3 py-1.5 border border-black/[0.08] bg-white/95 text-[#111110] hover:bg-[#FAFAF8] cursor-pointer backdrop-blur-sm"
        >
          {expanded ? labelExpanded : labelCollapsed}
        </button>
      </div>
      <div className={expanded ? 'h-[calc(100dvh-24px)] sm:h-[calc(100dvh-48px)] overflow-auto' : ''}>{children}</div>
    </div>
  );
}

function FigmaWorkspace({ expanded, onToggle }: { expanded: boolean; onToggle: () => void }) {
  /** Скриншот = полный UI Figma; светлая подложка без лишней высоты — без «чёрного поля» снизу */
  const inner = (
    <div className="bg-[#E8E8E8] pt-12 pb-5 px-4 sm:pt-14 sm:pb-6 sm:px-6 flex justify-center">
      <Image
        src="/practice.png"
        alt="Интерфейс Figma: упражнение с точкой и цветом"
        width={1600}
        height={1000}
        className="block w-full max-w-[min(100%,1100px)] h-auto rounded-lg border border-black/[0.06] bg-white shadow-[0_4px_24px_-8px_rgba(0,0,0,0.12)]"
        sizes="(max-width: 780px) 100vw, min(1100px, 92vw)"
        priority={false}
      />
    </div>
  );

  return (
    <ExpandableSurface
      expanded={expanded}
      onToggle={onToggle}
      labelCollapsed="На весь экран"
      labelExpanded="Свернуть"
    >
      {inner}
    </ExpandableSurface>
  );
}

function StudentWorkTile({ accent }: { accent?: boolean }) {
  return (
    <button
      type="button"
      className="relative aspect-[4/3] rounded-xl bg-[#F5F2EE] border border-black/[0.06] overflow-hidden flex items-center justify-center transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4F1F]/40"
    >
      <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-90">
        <div className="w-10 h-10 rounded-lg bg-[#E0D9D0] border border-black/[0.05]" />
        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${accent ? '' : 'bg-[#9A8E85]'}`} style={accent ? { background: ACCENT, boxShadow: `0 0 0 6px ${ACCENT}22` } : undefined} />
        <div className="w-8 h-12 rounded-lg bg-[#E8E3DC] border border-black/[0.05]" />
      </div>
    </button>
  );
}

const RESOURCE_TOOLS = ['Figma', 'Illustrator', 'Canva'] as const;
const SUBMIT_FORMATS = ['Figma — файл урока', 'Экспорт PNG', 'PDF', 'Ссылка на файл'] as const;
const GALLERY_TABS = ['Все', 'Лучшие', 'Новые'] as const;

export default function Module1Lesson() {
  const [videoFs, setVideoFs] = useState(false);
  const [figmaFs, setFigmaFs] = useState(false);
  const [resourceTool, setResourceTool] = useState<(typeof RESOURCE_TOOLS)[number]>('Figma');
  const [galleryTab, setGalleryTab] = useState<(typeof GALLERY_TABS)[number]>('Все');

  const [gameProgress, setGameProgress] = useState<Record<GameId, { percent: number; xp: number } | undefined>>({});
  const [session, setSession] = useState<{
    gameId: GameId;
    step: number;
    picks: number[];
  } | null>(null);
  const [modal, setModal] = useState<{ gameId: GameId; percent: number; xp: number; title: string } | null>(null);

  const totalGameXp = useMemo(() => Object.values(gameProgress).reduce((s, g) => s + (g?.xp ?? 0), 0), [gameProgress]);

  const focusDone = Boolean(gameProgress.focus);
  const pathUnlocked = focusDone;

  function startGame(gameId: GameId) {
    setSession({ gameId, step: 0, picks: [] });
  }

  function awardGame(gameId: GameId, picks: number[]) {
    const def = module1Games.find((g) => g.id === gameId)!;
    const rounds = gameId === 'focus' ? FOCUS_ROUNDS : PATH_ROUNDS;
    let correct = 0;
    picks.forEach((p, i) => {
      if (rounds[i] && p === rounds[i].correctIndex) correct += 1;
    });
    const total = rounds.length;
    const percent = total ? Math.round((correct / total) * 100) : 0;
    const xp = Math.max(8, Math.round((percent / 100) * def.maxXp));
    setGameProgress((prev) => ({ ...prev, [gameId]: { percent, xp } }));
    setModal({ gameId, percent, xp, title: def.title });
    setSession(null);
  }

  function pickOption(index: number) {
    if (!session) return;
    const { gameId, step, picks } = session;
    const rounds = gameId === 'focus' ? FOCUS_ROUNDS : PATH_ROUNDS;
    const nextPicks = [...picks, index];
    if (nextPicks.length >= rounds.length) {
      awardGame(gameId, nextPicks);
    } else {
      setSession({ gameId, step: step + 1, picks: nextPicks });
    }
  }

  const focusRound = session?.gameId === 'focus' ? FOCUS_ROUNDS[session.step] : null;
  const pathRound = session?.gameId === 'path' ? PATH_ROUNDS[session.step] : null;
  const maxFocus = FOCUS_ROUNDS.length;
  const maxPath = PATH_ROUNDS.length;

  return (
    <div className="min-h-[100dvh] text-[#111110]" style={{ background: BASE }}>
      {/* Top nav */}
      <header
        className="sticky top-0 z-[80] border-b border-black/[0.05] px-4 sm:px-8"
        style={{ background: 'rgba(245, 240, 235, 0.88)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
      >
        <div className="max-w-[780px] mx-auto h-[56px] sm:h-[60px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link
              href="/cabinet"
              className="flex items-center gap-1.5 text-[13px] font-semibold text-[#7A7065] hover:text-[#111110] shrink-0 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M10 12L6 8l4-4" />
              </svg>
              <span className="hidden sm:inline">Модуль {MODULE1_META.id}</span>
            </Link>
            <span className="text-[#E2DED8] hidden sm:inline" aria-hidden>
              |
            </span>
            <span className="text-[15px] font-bold truncate" style={{ color: ACCENT }}>
              {MODULE1_META.title}
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <span className="text-[12px] font-semibold text-[#9A8E85] tracking-wide hidden sm:block">
              {MODULE1_TRACK.lessonIndex} / {MODULE1_TRACK.lessonsTotal} уроков
            </span>
            <div className="w-[72px] sm:w-[120px] h-1 rounded-full bg-black/[0.08] overflow-hidden">
              <div
                className="h-full rounded-full transition-[width] duration-500 ease-out"
                style={{ width: `${MODULE1_TRACK.progressPercent}%`, background: ACCENT }}
              />
            </div>
            <span className="text-[11px] font-bold tabular-nums text-[#7A7065] sm:hidden">{MODULE1_TRACK.progressPercent}%</span>
            <span className="text-[11px] font-bold tabular-nums text-[#9A8E85] hidden sm:inline" title="Опыт за упражнения в этом уроке">
              +{totalGameXp} XP
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-[780px] mx-auto px-4 sm:px-6 pb-20 sm:pb-24">
        {/* Module header */}
        <div className="pt-10 sm:pt-12 pb-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] mb-2" style={{ color: ACCENT }}>
            {MODULE1_TRACK.eyebrow}
          </p>
          <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-black leading-[1.15] tracking-tight text-[#111110] mb-4">{module1HeroTitle}</h1>
          <p className="text-[15px] text-[#7A7065] leading-[1.7] max-w-[640px]">{module1HeroLead}</p>
        </div>

        {/* Video */}
        <div className="mt-8 sm:mt-10">
          <ExpandableSurface
            expanded={videoFs}
            onToggle={() => setVideoFs((v) => !v)}
            labelCollapsed="На весь экран"
            labelExpanded="Свернуть"
          >
            <div className="relative aspect-video bg-[#1A1917] cursor-pointer group">
              <Image
                src="/lesson1.png"
                alt="Кадр из видеоурока"
                fill
                className="object-cover opacity-88 group-hover:opacity-92 transition-opacity"
                sizes="(max-width: 780px) 100vw, 780px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />
              <div
                className="absolute top-4 left-4 text-[11px] font-semibold text-white/90 px-2.5 py-1 rounded-full backdrop-blur-md z-10"
                style={{ background: 'rgba(0,0,0,0.4)' }}
              >
                Видеоурок · 12 мин
              </div>
              <button
                type="button"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-transform duration-200 group-hover:scale-105"
                style={{ background: ACCENT, boxShadow: '0 8px 32px rgba(255,79,31,0.35)' }}
                aria-label="Воспроизвести видео"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                  <path d="M8 5v14l11-7L8 5z" />
                </svg>
              </button>
              <p className="absolute bottom-0 left-0 right-0 px-5 py-4 text-[12px] font-medium text-white/80 bg-gradient-to-t from-black/65 to-transparent">
                Смотри внимательно — примеры в ролике помогут закрепить тему.
              </p>
            </div>
          </ExpandableSurface>
        </div>

        {/* Theory */}
        <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#9A8E85] mt-12 mb-3">Теория · обзор</div>
        <h2 className="text-[clamp(1.1rem,2.5vw,1.5rem)] font-black leading-snug text-[#111110] mb-4">{module1TheoryTitle}</h2>
        {module1TheoryBody.map((p) => (
          <p key={p} className="text-[15px] text-[#7A7065] leading-[1.75] mb-4 max-w-[640px]">
            {p}
          </p>
        ))}

        <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#9A8E85] mt-10 mb-3">{module1NotesTitle}</div>
        <p className="text-[15px] text-[#7A7065] leading-[1.75] mb-2 max-w-[640px]">
          {module1NotesLead.before}{' '}
          <strong className="text-[#111110] font-semibold">{module1NotesLead.emphasis}</strong> {module1NotesLead.after}
        </p>

        {/* Games — interactive cards */}
        <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#9A8E85] mt-12 mb-3">Упражнения</div>
        <p className="text-[15px] text-[#7A7065] leading-relaxed mb-5 max-w-[640px]">{module1GamesIntro}</p>

        <div className="flex flex-col gap-3">
          {module1Games.map((g) => {
            const done = Boolean(gameProgress[g.id]);
            const locked = g.id === 'path' && !pathUnlocked;
            const active = session?.gameId === g.id;
            return (
              <div
                key={g.id}
                className="bg-white border rounded-2xl px-5 py-5 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
                style={{ borderColor: STROKE }}
              >
                <div className="min-w-0">
                  <h4 className="text-[15px] font-bold text-[#111110] mb-1">{g.title}</h4>
                  <p className="text-[13px] text-[#9A8E85] leading-snug max-w-xl">{g.blurb}</p>
                  {done && (
                    <p className="text-[12px] font-semibold mt-2" style={{ color: ACCENT }}>
                      Результат: {gameProgress[g.id]!.percent}% · +{gameProgress[g.id]!.xp} XP
                    </p>
                  )}
                  {locked && <p className="text-[12px] text-[#9A8E85] mt-2 font-medium">Станет доступно после упражнения «Фокус внимания».</p>}
                </div>
                <button
                  type="button"
                  disabled={locked || active}
                  onClick={() => !locked && startGame(g.id)}
                  className={`shrink-0 inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-[13px] font-semibold border-none cursor-pointer transition-transform duration-150 whitespace-nowrap disabled:opacity-45 disabled:cursor-not-allowed ${
                    locked ? 'bg-[#C4BCB4] text-white' : done ? 'bg-[#FAFAF8] text-[#111110] border border-[#E2E8F0]' : 'text-white hover:scale-[1.02]'
                  }`}
                  style={!locked && !done ? { background: ACCENT, boxShadow: '0 4px 16px rgba(255,79,31,0.25)' } : undefined}
                >
                  {locked ? 'Скоро' : active ? 'В процессе…' : done ? 'Повторить' : 'Начать'}
                </button>
              </div>
            );
          })}
        </div>

        {session?.gameId === 'focus' && focusRound && (
          <div
            className="mt-5 rounded-2xl p-5 sm:p-6 text-white border border-white/[0.08]"
            style={{ background: CARD }}
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/40 mb-2">Фокус внимания</div>
            <p className="text-sm text-white/75 mb-1">{focusRound.question}</p>
            <p className="text-[11px] text-white/40 mb-4">
              Вопрос {session.step + 1} из {maxFocus}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {focusRound.options.map((scene, i) => (
                <button
                  key={scene}
                  type="button"
                  onClick={() => pickOption(i)}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-2 hover:bg-white/[0.08] transition-colors text-left"
                >
                  <GameFocusScene scene={scene} />
                  <div className="mt-2 text-center text-[11px] font-semibold text-white/45">Вариант {i + 1}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {session?.gameId === 'path' && pathRound && (
          <div
            className="mt-5 rounded-2xl p-5 sm:p-6 text-white border border-white/[0.08]"
            style={{ background: CARD }}
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/40 mb-2">Путь взгляда</div>
            <p className="text-sm text-white/75 mb-1">{pathRound.question}</p>
            <p className="text-[11px] text-white/40 mb-4">
              Вопрос {session.step + 1} из {maxPath}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {pathRound.options.map((scene, i) => (
                <button
                  key={scene}
                  type="button"
                  onClick={() => pickOption(i)}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-2 hover:bg-white/[0.08] transition-colors text-left"
                >
                  <GamePathScene scene={scene} />
                  <div className="mt-2 text-center text-[11px] font-semibold text-white/45">Вариант {i + 1}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Highlight */}
        <div
          className="mt-12 rounded-r-xl pl-5 pr-5 py-4 text-[15px] font-medium leading-relaxed text-[#111110]"
          style={{
            background: 'rgba(255,79,31,0.05)',
            borderLeft: `3px solid ${ACCENT}`,
          }}
        >
          {module1Highlight}
        </div>

        <p className="mt-6 text-[15px] text-[#7A7065] leading-[1.75] max-w-[640px]">{module1AfterPracticeBridge}</p>

        {/* Practice */}
        <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#9A8E85] mt-14 mb-3">Практика</div>
        {module1PracticeIntro.map((p) => (
          <p key={p} className="text-[15px] text-[#7A7065] leading-[1.75] mb-4 max-w-[640px]">
            {p}
          </p>
        ))}

        <div
          className="mt-8 rounded-[24px] border bg-white p-7 sm:p-8"
          style={{ borderColor: STROKE }}
        >
          <h3 className="text-lg font-black text-[#111110] mb-1">{module1PracticeTask.title}</h3>
          <p className="text-[13px] text-[#9A8E85] mb-6 leading-snug">{module1PracticeTask.brief}</p>

          <p className="text-[11px] font-bold uppercase tracking-wider text-[#9A8E85] mb-3">Что сделать</p>
          <ul className="flex flex-col gap-2 mb-8">
            {module1PracticeTask.bullets.map((b, i) => (
              <li key={b} className="flex gap-3 text-[14px] text-[#7A7065] leading-snug">
                <span className="w-[22px] h-[22px] shrink-0 rounded-md bg-[#F5F0EB] flex items-center justify-center text-[11px] font-bold text-[#9A8E85] mt-0.5">
                  {i + 1}
                </span>
                <span className="pt-0.5">{b}</span>
              </li>
            ))}
          </ul>

          <div className="pt-6 border-t" style={{ borderColor: STROKE }}>
            <h4 className="text-sm font-bold text-[#111110] mb-3">{module1PracticeTask.figmaTitle}</h4>
            <ol className="space-y-2 list-decimal pl-5 text-[14px] text-[#7A7065] leading-relaxed mb-6">
              {module1PracticeTask.figmaSteps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>

            <h4 className="text-sm font-bold text-[#111110] mb-2">{module1PracticeTask.limitsTitle}</h4>
            <ul className="space-y-1.5 text-[14px] text-[#7A7065] mb-6">
              {module1PracticeTask.limits.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>

            <div
              className="rounded-xl px-4 py-4"
              style={{
                background: 'linear-gradient(135deg, rgba(255,79,31,0.06), rgba(255,79,31,0.02))',
                border: '1px solid rgba(255,79,31,0.14)',
              }}
            >
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#8A7B6E] mb-1">{module1PracticeTask.goalTitle}</div>
              <ul className="text-sm text-[#2E2A26] space-y-1">
                {module1PracticeTask.goal.map((line, i) => (
                  <li key={i} className={i === 0 ? 'font-bold' : ''}>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t" style={{ borderColor: STROKE }}>
            <h4 className="text-sm font-bold text-[#111110] mb-3">Инструмент</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {RESOURCE_TOOLS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setResourceTool(t)}
                  className={`text-[12px] font-medium px-3.5 py-1.5 rounded-full border transition-all duration-150 ${
                    resourceTool === t
                      ? 'border-[#FF4F1F] text-[#FF4F1F] bg-[rgba(255,79,31,0.06)]'
                      : 'border-transparent bg-[#F5F0EB] text-[#7A7065] hover:border-black/[0.08]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="text-[13px] text-[#7A7065] leading-relaxed">{module1ResourcesHint}</p>
          </div>

          <div className="pt-6 mt-6 border-t" style={{ borderColor: STROKE }}>
            <h4 className="text-sm font-bold text-[#111110] mb-1">Формат сдачи</h4>
            <p className="text-[12px] text-[#9A8E85] mb-3">Выбери удобный вариант при отправке работы.</p>
            <div className="flex flex-wrap gap-2">
              {SUBMIT_FORMATS.map((f) => (
                <span
                  key={f}
                  className="text-[12px] font-medium px-3 py-1.5 rounded-full border bg-white text-[#7A7065] cursor-default"
                  style={{ borderColor: STROKE }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="mt-10">
          <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#9A8E85] mb-3">Редактор</div>
          <p className="text-[13px] text-[#7A7065] leading-relaxed mb-4 max-w-[640px]">{module1EditorHint}</p>
          <FigmaWorkspace expanded={figmaFs} onToggle={() => setFigmaFs((f) => !f)} />
        </div>

        {focusDone && Boolean(gameProgress.path) && (
          <p className="mt-6 text-[13px] font-semibold text-emerald-700">Упражнения пройдены — переходи к практике в редакторе выше.</p>
        )}

        {/* Gallery */}
        <div className="mt-12 rounded-[24px] border bg-white p-7 sm:p-8" style={{ borderColor: STROKE }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
            <h4 className="text-sm font-bold text-[#111110]">Работы учеников</h4>
            <div className="flex gap-1 p-1 rounded-[10px] bg-[#F5F0EB] self-start">
              {GALLERY_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setGalleryTab(tab)}
                  className={`text-[12px] font-medium px-3.5 py-1.5 rounded-lg border-none cursor-pointer transition-all ${
                    galleryTab === tab ? 'bg-white text-[#111110] shadow-sm' : 'bg-transparent text-[#9A8E85] hover:text-[#111110]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <StudentWorkTile />
            <StudentWorkTile accent />
            <StudentWorkTile />
          </div>
        </div>

        {/* Bottom nav */}
        <div className="mt-14 pt-6 border-t flex flex-col-reverse sm:flex-row sm:justify-between gap-4" style={{ borderColor: STROKE }}>
          <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#C4BCB4] cursor-not-allowed">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M11 14L6 9l5-5" />
            </svg>
            Предыдущий урок
          </span>
          <Link
            href="/cabinet/module/2"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#7A7065] hover:text-[#111110]"
          >
            Следующий урок
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M7 4l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </main>

      <GameResultModal
        open={modal !== null}
        percent={modal?.percent ?? 0}
        xp={modal?.xp ?? 0}
        title={modal?.title ?? ''}
        onClose={() => setModal(null)}
      />
    </div>
  );
}
