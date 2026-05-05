'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  DASHBOARD_USER as USER,
  DASHBOARD_MODULES as MODULES,
  DASHBOARD_BADGES as BADGES,
  DASHBOARD_PORTFOLIO as PORTFOLIO,
  DASHBOARD_FEEDBACK as FEEDBACK,
  type FeedbackRow,
} from './dashboardMockData';

const ACCENT = '#FF4F1F';
const DARK1 = '#111110';
const DARK3 = '#1A1917';
const BASE = '#F5F0EB';
const MUTED = '#7A7065';

function useCountUp(target: number, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return val;
}

const IconHome = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M3 12L12 4l9 8" />
    <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
  </svg>
);
const IconGrid = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);
const IconFolder = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
  </svg>
);
const IconTrophy = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M6 9H4a2 2 0 01-2-2V5h4M18 9h2a2 2 0 002-2V5h-4M4 5h16v4a6 6 0 01-6 6h-4a6 6 0 01-6-6V5zM12 15v4M8 21h8" />
  </svg>
);
const IconSettings = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);
const IconPlay = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 3l14 9-14 9V3z" />
  </svg>
);
const IconChevron = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);
const IconCheck = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
const IconLock = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);
const IconMsg = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);
const IconBell = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

type NavId = 'home' | 'mods' | 'folio' | 'rank';

function NavRail({ active, setActive }: { active: NavId; setActive: (id: NavId) => void }) {
  const items: { id: NavId; icon: React.ReactNode; label: string }[] = [
    { id: 'home', icon: <IconHome />, label: 'Главная' },
    { id: 'mods', icon: <IconGrid />, label: 'Модули' },
    { id: 'folio', icon: <IconFolder />, label: 'Портфолио' },
    { id: 'rank', icon: <IconTrophy />, label: 'Рейтинг' },
  ];
  return (
    <nav
      className="flex flex-row md:flex-col items-center md:items-center justify-start gap-1 shrink-0 w-full md:w-[4.5rem] border-b md:border-b-0 md:border-r border-white/[0.06] py-2.5 px-3 md:py-6 md:px-0"
      style={{ background: DARK1, minHeight: 'auto' }}
      aria-label="Разделы кабинета"
    >
      <Link
        href="/"
        className="flex w-9 h-9 md:w-[38px] md:h-[38px] rounded-xl md:mb-4 items-center justify-center shrink-0 mr-2 md:mr-0"
        style={{ background: ACCENT }}
        aria-label="На главную"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 3a9 9 0 100 18A9 9 0 0012 3z" stroke="white" strokeWidth="2" />
          <path d="M12 8v4l3 3" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </Link>
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            title={item.label}
            className="relative w-10 h-10 md:w-[42px] md:h-[42px] rounded-xl border-none flex items-center justify-center cursor-pointer transition-all duration-150 shrink-0"
            style={{
              background: isActive ? 'rgba(255,79,31,0.15)' : 'transparent',
              color: isActive ? ACCENT : 'rgba(255,255,255,0.3)',
            }}
          >
            {item.icon}
            {isActive && (
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r md:block hidden"
                style={{ background: ACCENT }}
              />
            )}
          </button>
        );
      })}
      <div className="flex-1 min-h-0 hidden md:block" />
      <button
        type="button"
        title="Настройки"
        className="hidden md:flex w-[42px] h-[42px] rounded-xl border-none items-center justify-center cursor-pointer shrink-0 mb-1 text-white/35 hover:text-white/55 hover:bg-white/[0.06] transition-colors"
      >
        <IconSettings />
      </button>
    </nav>
  );
}

function TopBar() {
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Доброе утро' : hour < 18 ? 'Добрый день' : 'Добрый вечер';
  return (
    <header className="flex flex-wrap gap-4 justify-between items-center px-1 pb-1">
      <div>
        <div className="text-[0.72rem] font-semibold text-[#9A8E85] tracking-wide mb-0.5">{greet}</div>
        <h1 className="text-2xl font-black tracking-tight text-[#111110]">
          {USER.name} {USER.surname}
        </h1>
      </div>
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          className="relative w-[38px] h-[38px] rounded-xl border-none flex items-center justify-center cursor-pointer text-[#7A7065] bg-white shadow-sm"
        >
          <IconBell />
          <span
            className="absolute top-1.5 right-[7px] w-[7px] h-[7px] rounded-full border-2"
            style={{ background: ACCENT, borderColor: BASE }}
          />
        </button>
        <div className="flex items-center gap-2 bg-white rounded-[14px] py-1 pl-1 pr-3 shadow-sm cursor-default">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-[0.65rem] text-white shrink-0"
            style={{ background: ACCENT }}
          >
            АМ
          </div>
          <div>
            <div className="text-[0.78rem] font-bold leading-tight">{USER.name}</div>
            <div className="text-[0.6rem] text-[#9A8E85]">Ур. {USER.level}</div>
          </div>
        </div>
      </div>
    </header>
  );
}

function ModuleJourney() {
  const [lockTip, setLockTip] = useState<string | null>(null);
  const currentMod = MODULES.find((m) => m.current);
  const continueId = currentMod?.id ?? 1;
  const moduleIndex = MODULES.findIndex((m) => m.id === continueId) + 1;

  return (
    <div className="relative rounded-[22px]" style={{ background: DARK1 }}>
      <div className="absolute inset-0 overflow-hidden rounded-[22px] pointer-events-none z-0" aria-hidden>
        <div
          className="absolute -right-10 -top-10 w-52 h-52 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,79,31,0.18), transparent 70%)' }}
        />
        <div
          className="absolute left-[30%] -bottom-14 w-44 h-44 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(58,90,240,0.08), transparent 70%)' }}
        />
      </div>
      <div className="relative z-10 pt-7 pb-6 pl-5 pr-5 sm:pl-8 sm:pr-8">
        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="min-w-0 sm:pr-2">
            <div className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/30 mb-1">Твой путь</div>
            <div className="text-lg font-extrabold text-white tracking-tight">
              Модуль <span style={{ color: ACCENT }}>{moduleIndex}</span> из {MODULES.length}
            </div>
            {lockTip && (
              <p className="text-[0.72rem] text-[#FF8C73] mt-2 max-w-[30ch]" role="status">
                {lockTip}
              </p>
            )}
          </div>
          <Link
            href={`/cabinet/module/${continueId}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl py-2.5 px-5 sm:px-[18px] font-extrabold text-[0.82rem] text-white border-none cursor-pointer shrink-0 w-full sm:w-auto whitespace-nowrap hover:scale-[1.02] active:scale-[0.98] transition-transform"
            style={{
              background: ACCENT,
              boxShadow: '0 0 0 0 rgba(255,79,31,0.4)',
              animation: 'dashboardGlow 2.5s ease infinite',
            }}
          >
            <IconPlay /> Продолжить обучение
          </Link>
        </div>
        <div className="relative flex items-center gap-0 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar min-w-0">
        {MODULES.map((m, i) => {
          const isUnlocked = m.id === 1;
          const chip = (
            <>
              <div
                className="flex items-center justify-center font-black transition-all"
                style={{
                  width: m.current ? 48 : 40,
                  height: m.current ? 48 : 40,
                  borderRadius: m.current ? 14 : 12,
                  background: m.done ? m.color : m.current ? DARK3 : 'rgba(255,255,255,0.04)',
                  border: m.current
                    ? '2px solid #22C55E'
                    : m.done
                      ? 'none'
                      : '1.5px solid rgba(255,255,255,0.08)',
                  fontSize: m.current ? '1.1rem' : '0.9rem',
                  color: m.done || m.current ? '#fff' : 'rgba(255,255,255,0.15)',
                  boxShadow: m.done ? `0 4px 16px ${m.color}40` : 'none',
                  animation: m.current ? 'dashboardPulse 2s ease infinite' : 'none',
                  opacity: isUnlocked ? 1 : 0.42,
                }}
              >
                {m.done ? <IconCheck /> : !isUnlocked ? <IconLock /> : m.icon}
              </div>
              <div className="text-center max-w-[72px] sm:max-w-none">
                <div
                  className="text-[0.68rem] font-bold whitespace-nowrap sm:whitespace-normal"
                  style={{
                    color: m.done ? 'rgba(255,255,255,0.7)' : m.current ? '#fff' : 'rgba(255,255,255,0.2)',
                  }}
                >
                  {m.name}
                </div>
                {m.done && m.grade && (
                  <div className="text-[0.58rem] font-bold mt-0.5 opacity-80" style={{ color: m.color }}>
                    {m.grade}
                  </div>
                )}
                {m.current && (
                  <div className="text-[0.55rem] font-semibold mt-0.5 text-[#22C55E]">в процессе</div>
                )}
                {!isUnlocked && !m.current && (
                  <div className="text-[0.55rem] font-semibold mt-0.5 text-white/25">закрыто</div>
                )}
              </div>
            </>
          );

          return (
            <React.Fragment key={m.id}>
              {i > 0 && (
                <div
                  className="flex-1 min-w-[12px] h-0.5 relative self-start mt-5 sm:mt-6"
                  style={{ background: m.done ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)' }}
                >
                  {m.done && (
                    <div
                      className="absolute inset-0 rounded-sm opacity-50"
                      style={{
                        background: `linear-gradient(90deg, ${MODULES[i - 1].color}, ${m.color})`,
                      }}
                    />
                  )}
                </div>
              )}
              {isUnlocked ? (
                <Link
                  href={`/cabinet/module/${m.id}`}
                  className="flex flex-col items-center gap-2 relative z-[1] shrink-0 px-0.5 no-underline text-inherit cursor-pointer rounded-xl hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
                >
                  {chip}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    setLockTip('Чтобы открыть этот модуль, пройдите блок «Точка».')
                  }
                  className="flex flex-col items-center gap-2 relative z-[1] shrink-0 px-0.5 bg-transparent border-none cursor-pointer text-inherit rounded-xl hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
                >
                  {chip}
                </button>
              )}
            </React.Fragment>
          );
        })}
        </div>
      </div>
      <style>{`
        @keyframes dashboardGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,79,31,0.4); }
          50% { box-shadow: 0 0 16px 4px rgba(255,79,31,0.25); }
        }
        @keyframes dashboardPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
      `}</style>
    </div>
  );
}

function XPCard() {
  const xp = useCountUp(USER.xp);
  const pct = Math.round((USER.xp / USER.xpNext) * 100);
  return (
    <div
      className="rounded-[20px] px-[22px] pt-[22px] pb-5 border border-black/[0.05] flex flex-col min-h-[180px]"
      style={{ background: '#fff' }}
    >
      <div className="flex justify-between items-start">
        <div className="text-[0.65rem] font-bold uppercase tracking-widest text-[#9A8E85]">Баллы XP</div>
        <div className="rounded-lg py-0.5 px-2 text-[0.65rem] font-extrabold" style={{ background: 'rgba(255,79,31,0.08)', color: ACCENT }}>
          +220 за неделю
        </div>
      </div>
      <div className="mt-1 flex-1">
        <div className="text-[2.8rem] font-black leading-none tracking-tighter text-[#111110]">{xp}</div>
        <div className="text-xs text-[#7A7065] mt-1.5">
          до уровня {USER.level + 1}:{' '}
          <span className="font-bold text-[#111110]">{USER.xpNext - USER.xp}</span> XP
        </div>
      </div>
      <div className="mt-5 h-2 rounded-full overflow-hidden bg-black/[0.06] shrink-0">
        <div
          className="h-full rounded-full transition-[width] duration-[1.2s] ease-out"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #FF4F1F, #FF8C5A)',
          }}
        />
      </div>
    </div>
  );
}

function LevelCard() {
  return (
    <div
      className="relative rounded-[20px] p-[22px] flex flex-col justify-between gap-2 overflow-hidden min-h-[180px] border border-white/[0.08]"
      style={{ background: '#171614' }}
    >
      <div
        className="pointer-events-none absolute -right-5 -bottom-5 w-28 h-28 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.1), transparent 70%)' }}
      />
      <div className="text-[0.65rem] font-bold uppercase tracking-widest text-white/35 relative">Уровень</div>
      <div className="text-[2.75rem] sm:text-[3rem] font-black leading-none tracking-tighter text-white relative">{USER.level}</div>
      <div className="text-[0.78rem] font-medium text-white/50 relative leading-snug">{USER.role}</div>
    </div>
  );
}

function RatingMini() {
  const bars = [18, 32, 45, 60, 100, 85, 70, 50, 35, 20, 12, 8];
  const coursePct = Math.round((USER.modulesCompletedForProgress / USER.modulesTotal) * 100);
  return (
    <div className="rounded-[20px] p-[22px] border border-black/[0.05] flex flex-col justify-between gap-3 bg-white min-h-[180px]">
      <div className="flex justify-between items-start gap-2">
        <div>
          <div className="text-[0.65rem] font-bold uppercase tracking-widest text-[#9A8E85] mb-2">Рейтинг</div>
          <button type="button" className="bg-transparent border-none font-semibold text-[0.72rem] flex items-center gap-0.5 cursor-pointer p-0" style={{ color: ACCENT }}>
            Посмотреть рейтинг <IconChevron />
          </button>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[0.62rem] font-bold text-[#9A8E85] uppercase tracking-wide">Ход курса</div>
          <div className="text-sm font-black text-[#111110] tabular-nums">
            {USER.modulesCompletedForProgress}/{USER.modulesTotal}
          </div>
          <div className="mt-2 h-1.5 w-20 ml-auto rounded-full overflow-hidden bg-black/[0.06]">
            <div className="h-full rounded-full" style={{ width: `${coursePct}%`, background: ACCENT }} />
          </div>
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-[2.8rem] font-black leading-none tracking-tighter" style={{ color: ACCENT }}>
          #{USER.rating}
        </span>
        <span className="text-sm font-medium text-[#7A7065]">из {USER.ratingTotal}</span>
      </div>
      <div className="flex gap-0.5 items-end h-7">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm transition-[height] duration-[0.6s] ease-out"
            style={{
              height: `${h}%`,
              background: i === 4 ? ACCENT : 'rgba(0,0,0,0.06)',
              transitionDelay: `${i * 40}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Achievements() {
  const earned = BADGES.filter((b) => b.earned).length;
  return (
    <div className="rounded-[20px] p-[22px] border border-black/[0.05] flex flex-col gap-3.5 bg-white">
      <div className="flex justify-between items-center">
        <div className="text-[0.65rem] font-bold uppercase tracking-widest text-[#9A8E85]">Достижения</div>
        <div className="text-[0.82rem] font-extrabold text-[#111110]">
          {earned}
          <span className="text-[#9A8E85] font-medium">/{BADGES.length}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {BADGES.map((b) => (
          <div
            key={b.id}
            className="flex flex-col items-center gap-1.5 py-3 px-1 rounded-[14px] border transition-transform duration-200 border-black/[0.04] bg-black/[0.02] opacity-40"
            style={
              b.earned
                ? {
                    background: `${b.color}12`,
                    border: `1px solid ${b.color}2E`,
                    opacity: 1,
                    boxShadow: `0 2px 8px ${b.color}22`,
                  }
                : {}
            }
          >
            <div
              className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-sm font-black text-white"
              style={{
                background: b.earned ? b.color : '#ddd',
                boxShadow: b.earned ? `0 3px 12px ${b.color}66` : 'none',
              }}
            >
              {b.earned ? b.icon : <IconLock />}
            </div>
            <div className="text-[0.6rem] font-semibold text-[#7A7065] text-center leading-tight">{b.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function patternSvg(type: string, c: string) {
  if (type === 'dots') {
    return `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><circle cx='15' cy='15' r='5' fill='${c}' opacity='0.25'/><circle cx='45' cy='35' r='8' fill='${c}' opacity='0.35'/><circle cx='65' cy='15' r='4' fill='${c}' opacity='0.2'/><circle cx='25' cy='60' r='6' fill='${c}' opacity='0.3'/><circle cx='60' cy='60' r='5' fill='${c}' opacity='0.2'/></svg>`;
  }
  if (type === 'lines') {
    return `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><line x1='0' y1='20' x2='80' y2='20' stroke='${c}' stroke-width='2.5' opacity='0.25'/><line x1='0' y1='40' x2='80' y2='40' stroke='${c}' stroke-width='5' opacity='0.35'/><line x1='0' y1='60' x2='80' y2='60' stroke='${c}' stroke-width='1.5' opacity='0.2'/></svg>`;
  }
  if (type === 'shapes') {
    return `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><rect x='8' y='8' width='26' height='26' rx='2' fill='${c}' opacity='0.25'/><circle cx='55' cy='25' r='16' fill='${c}' opacity='0.2'/><polygon points='20,70 40,42 60,70' fill='${c}' opacity='0.3'/></svg>`;
  }
  return `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><rect x='8' y='8' width='64' height='64' fill='none' stroke='${c}' stroke-width='1.5' opacity='0.25'/><line x1='8' y1='40' x2='72' y2='40' stroke='${c}' stroke-width='1' opacity='0.35'/><line x1='40' y1='8' x2='40' y2='72' stroke='${c}' stroke-width='1' opacity='0.35'/></svg>`;
}

function PortfolioBlock() {
  return (
    <div className="rounded-[20px] p-[22px] border border-black/[0.05] flex flex-col gap-3.5 bg-white">
      <div className="flex justify-between items-center">
        <div className="text-[0.65rem] font-bold uppercase tracking-widest text-[#9A8E85]">Портфолио</div>
        <Link href="/gallery" className="bg-transparent border-none font-semibold text-[0.72rem] flex items-center gap-0.5 cursor-pointer" style={{ color: ACCENT }}>
          Все работы <IconChevron />
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {PORTFOLIO.map((w) => {
          const c = w.color;
          const uri = encodeURIComponent(patternSvg(w.pattern, c));
          return (
            <div
              key={w.id}
              className="rounded-[14px] overflow-hidden cursor-pointer border border-black/[0.06] transition-all hover:-translate-y-1"
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 12px 28px ${c}18`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                className="h-[72px] flex items-center justify-center"
                style={{
                  background: `${c}0D`,
                  backgroundImage: `url("data:image/svg+xml,${uri}")`,
                  backgroundSize: '80px 80px',
                }}
              />
              <div className="px-3 py-2.5">
                <div className="text-[0.65rem] text-[#9A8E85] font-semibold">{w.module}</div>
                <div className="text-[0.8rem] font-bold text-[#111110] mt-0.5">{w.title}</div>
                <div
                  className="inline-block mt-1.5 py-0.5 px-2 rounded-full text-[0.62rem] font-extrabold"
                  style={{ background: `${c}14`, color: c }}
                >
                  {w.grade}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FeedbackItem({ fb }: { fb: FeedbackRow }) {
  const [open, setOpen] = useState(false);
  const c = fb.color;
  return (
    <div
      className="rounded-[14px] overflow-hidden transition-all duration-200 bg-white border"
      style={{ borderColor: open ? `${c}4D` : 'rgba(0,0,0,0.06)' }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 w-full py-3.5 px-4 bg-transparent border-none font-inherit cursor-pointer text-left"
      >
        <div
          className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-full shrink-0 flex items-center justify-center text-[0.62rem] font-black border border-black/[0.04]"
          style={{ background: `${c}18`, color: c }}
        >
          {fb.grade}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-sm text-[#111110]">«{fb.module}»</div>
          <div className="text-[0.7rem] text-[#9A8E85] mt-0.5 flex items-center gap-1">
            <IconMsg /> Обратная связь · {fb.date}
          </div>
        </div>
        <div className="text-[#9A8E85] shrink-0 transition-transform duration-200" style={{ transform: open ? 'rotate(90deg)' : 'none' }}>
          <IconChevron />
        </div>
      </button>
      <div
        className="overflow-hidden transition-[max-height] duration-300 ease-out"
        style={{ maxHeight: open ? 320 : 0 }}
      >
        <div className="px-4 pb-4">
          <div className="h-px bg-black/[0.05] mb-3" />
          <p className="text-[0.82rem] leading-relaxed" style={{ color: MUTED }}>
            {fb.text}
          </p>
          <div className="flex gap-1.5 flex-wrap mt-2.5">
            {fb.tags.map((t) => (
              <span
                key={t}
                className="py-0.5 px-2 rounded-full text-[0.65rem] font-bold"
                style={{ background: `${c}1A`, color: c }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedbackSection() {
  return (
    <div className="rounded-[20px] p-[22px] border border-black/[0.05] flex flex-col gap-2.5 bg-white shadow-[0_1px_0_rgba(0,0,0,0.03)]">
      <div className="flex justify-between items-center mb-1">
        <div className="text-[0.65rem] font-bold uppercase tracking-widest text-[#9A8E85]">Обратная связь от педагога</div>
        <span className="text-[0.62rem] font-extrabold rounded-full py-0.5 px-2" style={{ background: 'rgba(255,79,31,0.08)', color: ACCENT }}>
          {FEEDBACK.length === 1 ? '1 работа' : `${FEEDBACK.length} работы`}
        </span>
      </div>
      {FEEDBACK.map((fb) => (
        <FeedbackItem key={fb.id} fb={fb} />
      ))}
    </div>
  );
}

export default function DashboardMock() {
  const [activeNav, setActiveNav] = useState<NavId>('home');

  return (
    <div className="flex flex-col md:flex-row min-h-[100dvh] md:h-screen md:overflow-hidden" style={{ background: BASE }}>
      <NavRail active={activeNav} setActive={setActiveNav} />
      <main
        className="flex-1 flex flex-col gap-4 px-5 py-5 sm:px-8 sm:py-7 md:pl-9 md:pr-10 overflow-y-auto overflow-x-hidden min-h-0 max-w-[1600px] w-full
          [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/15 [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        {activeNav === 'home' && (
          <>
            <TopBar />
            <ModuleJourney />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
              <XPCard />
              <LevelCard />
              <RatingMini />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-4">
              <Achievements />
              <PortfolioBlock />
            </div>
            <FeedbackSection />
            <div className="h-4 shrink-0" />
          </>
        )}
        {activeNav !== 'home' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
            <h2 className="text-xl font-black text-[#111110] mb-2">
              {activeNav === 'mods' && 'Модули'}
              {activeNav === 'folio' && 'Портфолио'}
              {activeNav === 'rank' && 'Рейтинг'}
            </h2>
            <p className="text-sm text-[#7A7065] max-w-md mb-6 leading-relaxed">
              Программа курса, работы и показатели прогресса собраны на главном экране кабинета. Выбери «Главная» в меню слева, чтобы продолжить
              обучение.
            </p>
            <Link href="/cabinet" className="text-sm font-bold" style={{ color: ACCENT }}>
              ← В кабинет
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
