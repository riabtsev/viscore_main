"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, AcademicCapIcon, SparklesIcon } from '@heroicons/react/24/outline';
import HeroContent from './HeroContent';
import Footer from './Footer';
import NavBar from './NavBar';
import { programModules } from './contentSections';

const ACCENT = '#FF4F1F';
const CARD_DARK = '#111110';

/* ─── Utility: blur-fade wrapper ───────────────────────────────── */
function BlurFade({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Number Ticker ─────────────────────────────────────────────── */
function NumberTicker({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const dur = 1400;
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / dur, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(ease * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);
  return <span ref={ref}>{display}{suffix}</span>;
}

/* ─── Shimmer CTA button ─────────────────────────────────────────── */
function ShimmerButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl px-8 py-4 font-bold text-base text-white"
      style={{ background: ACCENT, boxShadow: `0 8px 24px ${ACCENT}55` }}
    >
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)',
          animation: 'shimmer 2.4s infinite',
          backgroundSize: '200% 100%',
        }}
      />
      <style>{`@keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }`}</style>
      <span className="relative">{children}</span>
    </a>
  );
}

/* ─── Animated grid background ─────────────────────────────────── */
function AnimatedGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(to right, #232220 1px, transparent 1px), linear-gradient(to bottom, #232220 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 110% 75% at 50% 50%, black 15%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 110% 75% at 50% 50%, black 15%, transparent 100%)',
          opacity: 0.55,
        }}
      />
    </div>
  );
}

/* ─── Border Beam — removed, hover handled via framer-motion boxShadow ─ */

/* ─── Step mini-preview illustrations ──────────────────────────── */
function TheoryPreview() {
  return (
    <div style={{ background: '#0D0C0B', borderRadius: 10, padding: 12, height: 86, overflow: 'hidden', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
        <div style={{ width: 6, height: 6, borderRadius: 2, background: '#3A5AF0', flexShrink: 0 }} />
        <div style={{ height: 4, width: 52, borderRadius: 2, background: '#1E1D1A' }} />
        <div style={{ marginLeft: 'auto', height: 14, width: 26, borderRadius: 4, background: '#1A1917', border: '1px solid #2A2925', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 7, color: '#3A5AF0', fontWeight: 900 }}>Lv.3</span>
        </div>
      </div>
      {[72, 55, 64].map((w, i) => (
        <div key={i} style={{ height: 4, width: `${w}%`, borderRadius: 2, background: '#1E1D1A', marginBottom: 5 }} />
      ))}
      <div style={{ marginTop: 8, height: 3, borderRadius: 2, background: '#1E1D1A', overflow: 'hidden' }}>
        <motion.div
          style={{ height: '100%', borderRadius: 2, background: '#3A5AF0' }}
          initial={{ width: 0 }}
          whileInView={{ width: '65%' }}
          transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  );
}

function AssignmentPreview() {
  return (
    <div style={{ background: '#0D0C0B', borderRadius: 10, padding: '14px 12px', height: 86, position: 'relative', overflow: 'hidden' }}>
      {/* dot-grid texture */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #252320 1px, transparent 1px)', backgroundSize: '11px 11px', opacity: 0.7 }} />
      {/* Three shapes centered in a row */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, height: '100%' }}>
        <motion.div
          style={{ width: 24, height: 24, borderRadius: 4, background: `${ACCENT}18`, border: `1.5px solid ${ACCENT}50`, flexShrink: 0 }}
          animate={{ rotate: [0, -6, 6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{ width: 20, height: 20, borderRadius: '50%', background: '#3A5AF018', border: '1.5px solid #3A5AF050', flexShrink: 0 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />
        <motion.div
          style={{ width: 22, height: 22, borderRadius: 3, background: '#32D74B12', border: '1.5px solid #32D74B40', flexShrink: 0, transform: 'rotate(45deg)' }}
          animate={{ scale: [1, 1.1, 1], rotate: ['45deg', '55deg', '45deg'] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
        />
      </div>
      <div style={{ position: 'absolute', bottom: 7, left: 0, right: 0, textAlign: 'center', fontSize: 7, color: '#2A2925', fontWeight: 900, letterSpacing: '0.1em' }}>CANVAS · DRAG</div>
    </div>
  );
}

function PracticePreview() {
  return (
    <div style={{ background: '#F5F2EE', borderRadius: 10, padding: 10, height: 86, position: 'relative', overflow: 'hidden', border: '1px solid #E0D9D0' }}>
      <div style={{ position: 'absolute', top: 6, left: 8, fontSize: 7, fontWeight: 900, color: '#9A8E85', letterSpacing: '0.08em' }}>FIGMA</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingTop: 8 }}>
        <motion.div
          style={{ width: 56, height: 40, borderRadius: 4, background: '#fff', border: '1px solid #DDD5CB', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: ACCENT, boxShadow: `0 0 0 3px ${ACCENT}22` }} />
          <div style={{ width: 18, height: 12, borderRadius: 2, background: '#EDE8E0' }} />
        </motion.div>
      </div>
    </div>
  );
}

function PortfolioPreview() {
  const palette = ['#3A5AF0', ACCENT, '#32D74B', '#FFD60A'];
  return (
    <div style={{ background: '#0D0C0B', borderRadius: 10, padding: 10, height: 86 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, height: '100%' }}>
        {palette.map((c, i) => (
          <motion.div
            key={i}
            style={{ borderRadius: 5, background: `${c}12`, border: `1px solid ${c}25`, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '4px 5px', gap: 2 }}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.09, duration: 0.3, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div style={{ height: 3, width: '55%', borderRadius: 2, background: `${c}45` }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Assignment mini-game: sort dots by size left-to-right ─────── */
function AssignmentMiniGame() {
  const INITIAL: number[] = [14, 6, 18, 8, 12];
  const CORRECT: number[] = [6, 8, 12, 14, 18];
  const [dots, setDots] = useState<number[]>([...INITIAL]);
  const [sel, setSel]   = useState<number | null>(null);
  const [phase, setPhase] = useState<'play' | 'success' | 'fail'>('play');

  const tap = (i: number) => {
    if (phase !== 'play') return;
    if (sel === null) { setSel(i); return; }
    if (sel === i)    { setSel(null); return; }
    setDots(d => { const n = [...d]; [n[i], n[sel]] = [n[sel], n[i]]; return n; });
    setSel(null);
  };

  const check = () => {
    if (dots.every((d, i) => d === CORRECT[i])) {
      setPhase('success');
    } else {
      setPhase('fail');
      setTimeout(() => setPhase('play'), 750);
    }
  };

  const reset = () => { setDots([...INITIAL]); setPhase('play'); setSel(null); };

  return (
    <>
      {/* Canvas */}
      <div className="relative flex-1 flex items-end justify-center pb-3" style={{ background: '#FAFAF8', minHeight: 80 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #E8E1D8 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
        {phase === 'success' && (
          <motion.div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(50,215,75,0.07)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        )}
        <div className="relative flex items-end gap-3">
          {dots.map((size, i) => (
            <motion.button
              key={i}
              onClick={() => tap(i)}
              className="flex-shrink-0 flex items-center justify-center focus:outline-none"
              style={{ width: 28, height: 28, background: 'transparent', border: 'none', cursor: phase === 'success' ? 'default' : 'pointer', padding: 0 }}
              animate={{
                x: phase === 'fail' ? [0, -5, 5, -5, 0] : 0,
                scale: sel === i ? 1.22 : 1,
              }}
              transition={phase === 'fail' ? { duration: 0.38, ease: 'easeInOut' } : { type: 'spring', stiffness: 340, damping: 22 }}
            >
              <div
                style={{
                  width: size, height: size, borderRadius: '50%',
                  background: phase === 'success' ? '#32D74B' : CARD_DARK,
                  outline: sel === i ? `2.5px solid ${ACCENT}` : 'none',
                  outlineOffset: 3,
                  transition: 'background 0.3s',
                  flexShrink: 0,
                }}
              />
            </motion.button>
          ))}
        </div>
        {/* tap hint */}
        {phase === 'play' && sel === null && (
          <div className="absolute bottom-1 left-0 right-0 text-center" style={{ fontSize: 7.5, color: '#C8C0B8', fontWeight: 700, letterSpacing: '0.05em' }}>нажми точку — потом место</div>
        )}
        {sel !== null && (
          <div className="absolute bottom-1 left-0 right-0 text-center" style={{ fontSize: 7.5, color: ACCENT, fontWeight: 700, letterSpacing: '0.05em' }}>теперь нажми куда переставить</div>
        )}
      </div>
      {/* Button */}
      <div className="px-4 py-3" style={{ borderTop: '1px solid #F0EBE3' }}>
        {phase === 'success' ? (
          <motion.button
            onClick={reset}
            className="w-full rounded-xl flex items-center justify-center py-2"
            style={{ background: '#32D74B', border: 'none', cursor: 'pointer' }}
            initial={{ scale: 0.93 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span style={{ fontSize: 9, fontWeight: 900, color: '#fff', letterSpacing: '0.05em' }}>✓ РИТМ НАЙДЕН — +40 XP</span>
          </motion.button>
        ) : (
          <button
            onClick={check}
            className="w-full rounded-xl flex items-center justify-center py-2"
            style={{ background: CARD_DARK, border: 'none', cursor: 'pointer' }}
          >
            <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.05em', color: phase === 'fail' ? '#E8453C' : '#fff', transition: 'color 0.2s' }}>
              {phase === 'fail' ? 'НЕ ТАК — ПЕРЕСТАВЬ ТОЧКИ' : 'ПРОВЕРИТЬ →'}
            </span>
          </button>
        )}
      </div>
    </>
  );
}

/* ─── Main page ─────────────────────────────────────────────────── */
export default function LandingPage() {
  const [openModuleNum, setOpenModuleNum] = useState<string | null>(null);

  return (
    <div style={{ background: '#F5F0EB' }} className="text-black overflow-hidden">
      <NavBar />

      {/* Hero */}
      <section className="pt-20 sm:pt-24 lg:pt-28">
        <HeroContent />
      </section>

      {/* ── Stats bar ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #EDE8E0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#EDE8E0]">
            {[
              { val: 7,    suf: '',  label: 'Модулей в курсе' },
              { val: 1320, suf: '+', label: 'XP за весь курс' },
              { val: 14,   suf: '',  label: 'Наград и достижений' },
              { val: 8,    suf: '+', label: 'Работ в портфолио' },
            ].map((s, i) => (
              <BlurFade key={i} delay={i * 0.07}>
                <div className="px-6 py-7 text-center">
                  <div className="font-black text-3xl sm:text-4xl" style={{ color: CARD_DARK }}>
                    <NumberTicker value={s.val} suffix={s.suf} />
                  </div>
                  <div className="text-xs font-medium mt-1.5" style={{ color: '#9A8E85' }}>{s.label}</div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>

      {/* ── Modules ── */}
      <section id="modules" className="py-24 sm:py-32 scroll-mt-20" style={{ background: '#F5F0EB' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <BlurFade className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: '#EDE8E0', color: '#7A6B5E' }}>Программа</span>
                <h2 className="font-black leading-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', color: CARD_DARK }}>
                  7 блоков: от точки<br />до финальной работы
                </h2>
                <p className="text-sm sm:text-base mt-3 max-w-2xl leading-relaxed" style={{ color: '#7A7065' }}>
                  Нажми на блок — откроется подробное описание: зачем модуль нужен и чему ты научишься.
                </p>
              </div>
            </div>
          </BlurFade>

          {/* Module list — раскрывающиеся блоки программы */}
          <div className="space-y-3">
            {programModules.map((mod, i) => {
              const open = openModuleNum === mod.num;
              return (
                <BlurFade key={mod.name} delay={i * 0.06}>
                  <motion.div
                    layout
                    className="rounded-2xl overflow-hidden shadow-sm"
                    style={{
                      background: mod.done ? CARD_DARK : '#fff',
                      border: mod.done ? '1px solid #2A2925' : '1px solid #EDE8E0',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <motion.button
                      type="button"
                      layout
                      onClick={() => setOpenModuleNum(open ? null : mod.num)}
                      aria-expanded={open}
                      className="group flex w-full items-stretch gap-0 text-left"
                      style={{
                        background: 'transparent',
                        cursor: 'pointer',
                        border: 'none',
                        padding: 0,
                      }}
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                      <div
                        className="flex items-center justify-center shrink-0 font-black select-none pointer-events-none"
                        style={{
                          width: 72,
                          fontSize: 13,
                          letterSpacing: '0.05em',
                          color: mod.done ? ACCENT : '#DDD5CB',
                          background: mod.done ? '#1A1917' : '#F8F3EE',
                          borderRight: mod.done ? '1px solid #2A2925' : '1px solid #EDE8E0',
                        }}
                      >
                        {mod.num}
                      </div>
                      <div
                        className="flex items-center justify-center shrink-0 font-black text-xl pointer-events-none"
                        style={{
                          width: 60,
                          borderRight: mod.done ? '1px solid #2A2925' : '1px solid #EDE8E0',
                        }}
                      >
                        <span style={{ color: mod.done ? ACCENT : '#6B6055', fontSize: 20, fontWeight: 900 }}>{mod.icon}</span>
                      </div>
                      <div className="flex-1 flex items-center px-4 sm:px-6 py-5 min-w-0 pointer-events-none">
                        <div className="min-w-0">
                          <div className="font-black text-base" style={{ color: mod.done ? '#fff' : CARD_DARK }}>{mod.name}</div>
                          <div className="text-sm mt-0.5 leading-snug" style={{ color: mod.done ? '#5A5045' : '#9A8E85' }}>{mod.desc}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 pr-3 sm:pr-5 shrink-0 pointer-events-none">
                        <ChevronDownIcon
                          className={`w-5 h-5 shrink-0 transition-transform duration-300 ease-out ${open ? 'rotate-180' : ''}`}
                          style={{ color: mod.done ? 'rgba(255,255,255,0.4)' : '#9A8E85' }}
                          aria-hidden
                        />
                        <span
                          className="text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap"
                          style={
                            mod.done
                              ? { background: ACCENT, color: '#fff' }
                              : { background: '#F5EFE8', color: '#8B6E4E' }
                          }
                        >
                          {mod.done ? '✓ Пройден' : `+${mod.xp} XP`}
                        </span>
                      </div>
                    </motion.button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          key="panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden border-t"
                          style={{
                            borderColor: mod.done ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                            boxShadow: open ? (mod.done ? 'inset 0 1px 0 0 rgba(255,255,255,0.04)' : 'inset 0 1px 0 0 rgba(255,255,255,0.65)') : undefined,
                          }}
                        >
                          <div
                            className="relative px-5 sm:px-8 lg:px-11 py-8 sm:py-10"
                            style={{
                              background: mod.done
                                ? 'linear-gradient(180deg, #121110 0%, #0D0C0B 50%, #0A0908 100%)'
                                : 'linear-gradient(180deg, #FDFCFA 0%, #FAF8F5 45%, #F7F4F0 100%)',
                            }}
                          >
                            {/* Тонкая сетка / текстура (только светлая тема) */}
                            {!mod.done && (
                              <div
                                className="pointer-events-none absolute inset-0 opacity-[0.45]"
                                style={{
                                  backgroundImage: 'radial-gradient(circle, rgba(90,80,70,0.06) 1px, transparent 1px)',
                                  backgroundSize: '20px 20px',
                                }}
                                aria-hidden
                              />
                            )}

                            <div className="relative max-w-3xl space-y-8 sm:space-y-10">
                              {/* Лид + второй абзац */}
                              <div className="space-y-4">
                                {mod.detail.intro.map((para, pi) => (
                                  <p
                                    key={`${mod.num}-p-${pi}`}
                                    className={`text-balance ${pi === 0 ? 'text-base sm:text-[1.0625rem] font-semibold tracking-[-0.02em] leading-[1.55]' : 'text-sm sm:text-[0.9375rem] font-normal leading-[1.7]'}`}
                                    style={{
                                      color: mod.done ? (pi === 0 ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.66)') : pi === 0 ? CARD_DARK : '#5A5348',
                                    }}
                                  >
                                    {para}
                                  </p>
                                ))}
                              </div>

                              <div
                                className="h-px max-w-md"
                                style={{
                                  background: mod.done
                                    ? 'linear-gradient(90deg, rgba(255,79,31,0.55), rgba(255,79,31,0.08), transparent)'
                                    : 'linear-gradient(90deg, rgba(255,79,31,0.45), rgba(0,0,0,0.06), transparent)',
                                }}
                                aria-hidden
                              />

                              {/* Навыки — карточка */}
                              <div
                                className="rounded-2xl p-5 sm:p-6"
                                style={
                                  mod.done
                                    ? {
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.07)',
                                        boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset',
                                      }
                                    : {
                                        background: 'rgba(255,255,255,0.72)',
                                        border: '1px solid rgba(0,0,0,0.06)',
                                        boxShadow: '0 12px 36px -16px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.9) inset',
                                      }
                                }
                              >
                                <div className="flex items-center gap-2.5 mb-5">
                                  <div
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                                    style={{
                                      background: mod.done ? 'rgba(255,79,31,0.18)' : `${ACCENT}14`,
                                      color: ACCENT,
                                    }}
                                  >
                                    <AcademicCapIcon className="h-[18px] w-[18px]" strokeWidth={2} />
                                  </div>
                                  <div>
                                    <p
                                      className="text-[0.7rem] font-black uppercase tracking-[0.14em]"
                                      style={{ color: mod.done ? 'rgba(255,255,255,0.45)' : '#8A7B6E' }}
                                    >
                                      Ты научишься
                                    </p>
                                    <p
                                      className="text-sm font-bold tracking-tight mt-0.5"
                                      style={{ color: mod.done ? '#fff' : CARD_DARK }}
                                    >
                                      Конкретные навыки блока
                                    </p>
                                  </div>
                                </div>
                                <ul className="space-y-3">
                                  {mod.detail.learn.map((line, li) => (
                                    <li key={line} className="flex gap-3.5 items-start">
                                      <span
                                        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-black tabular-nums"
                                        style={
                                          mod.done
                                            ? { background: '#1F1E1C', color: ACCENT, border: '1px solid rgba(255,79,31,0.25)' }
                                            : { background: '#FFF5F0', color: ACCENT, border: `1px solid ${ACCENT}33` }
                                        }
                                      >
                                        {li + 1}
                                      </span>
                                      <span
                                        className="text-sm sm:text-[0.9375rem] leading-[1.65] pt-0.5"
                                        style={{ color: mod.done ? 'rgba(255,255,255,0.88)' : '#2E2A26' }}
                                      >
                                        {line}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Зачем — коллаут */}
                              <div
                                className="relative overflow-hidden rounded-2xl pl-5 pr-5 py-5 sm:pl-6 sm:pr-6 sm:py-6"
                                style={
                                  mod.done
                                    ? {
                                        background: 'linear-gradient(135deg, rgba(255,79,31,0.09) 0%, rgba(255,79,31,0.02) 55%, transparent 100%)',
                                        border: '1px solid rgba(255,79,31,0.15)',
                                        borderLeftWidth: 3,
                                        borderLeftColor: ACCENT,
                                      }
                                    : {
                                        background: 'linear-gradient(135deg, rgba(255,79,31,0.06) 0%, rgba(255,247,242,0.9) 40%, #FFFCFA 100%)',
                                        border: '1px solid rgba(255,79,31,0.14)',
                                        borderLeftWidth: 3,
                                        borderLeftColor: ACCENT,
                                      }
                                }
                              >
                                <div className="flex items-start gap-3 mb-3">
                                  <SparklesIcon
                                    className="h-5 w-5 shrink-0 mt-0.5"
                                    style={{ color: ACCENT }}
                                    strokeWidth={2}
                                  />
                                  <div>
                                    <p
                                      className="text-[0.7rem] font-black uppercase tracking-[0.14em]"
                                      style={{ color: mod.done ? 'rgba(255,255,255,0.4)' : '#8A7B6E' }}
                                    >
                                      Зачем это нужно
                                    </p>
                                    <p
                                      className="text-sm font-bold tracking-tight mt-0.5"
                                      style={{ color: mod.done ? '#fff' : CARD_DARK }}
                                    >
                                      Практический смысл модуля
                                    </p>
                                  </div>
                                </div>
                                <p
                                  className="text-sm sm:text-[0.9375rem] leading-[1.75] pl-8 sm:pl-0"
                                  style={{ color: mod.done ? 'rgba(255,255,255,0.72)' : '#4A433A' }}
                                >
                                  {mod.detail.why}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="relative py-24 sm:py-32 scroll-mt-20 overflow-hidden" style={{ background: CARD_DARK }}>
        <AnimatedGrid />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <BlurFade className="mb-20 text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6" style={{ background: '#1A1917', color: '#5A5045' }}>Как это работает</span>
            <h2 className="font-black leading-tight text-white" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
              Четыре шага к работе<br />в портфолио
            </h2>
          </BlurFade>

          {/* Four steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              { n: '01', title: 'Короткое объяснение', desc: 'Смотри наглядный разбор: суть темы без лишней воды. Прямой путь от принципа к примеру.', color: '#3A5AF0', Preview: TheoryPreview },
              { n: '02', title: 'Игровое задание', desc: 'Проходи упражнения в браузере: считаются баллы за точность, видно процент успешности.', color: ACCENT, Preview: AssignmentPreview },
              { n: '03', title: 'Практика', desc: 'Переносишь тему в Figma или другой редактор: условие, шаги и комментарий педагога после сдачи.', color: '#7C5AF0', Preview: PracticePreview },
              { n: '04', title: 'Баллы и портфолио', desc: 'XP суммируется, открываются награды, работы становятся частью личной галереи.', color: '#32D74B', Preview: PortfolioPreview },
            ].map((step, i) => (
              <BlurFade key={step.n} delay={i * 0.14}>
                <motion.div
                  className="relative rounded-2xl p-6 h-full cursor-default"
                  style={{ background: '#171614', border: '1px solid #252320' }}
                  whileHover={{ y: -4, boxShadow: `0 0 0 1px ${step.color}30, 0 20px 40px rgba(0,0,0,0.45)` }}
                  transition={{ type: 'spring', stiffness: 280, damping: 26 }}>

                  {/* Decorative background number */}
                  <div
                    className="absolute top-2 right-4 font-black select-none pointer-events-none"
                    style={{ fontSize: 80, lineHeight: 1, letterSpacing: '-0.05em', color: `${step.color}08` }}
                  >
                    {step.n}
                  </div>

                  {/* Mini UI preview */}
                  <div className="mb-5 relative z-10">
                    <step.Preview />
                  </div>

                  {/* Step badge + horizontal rule */}
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div
                      className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs"
                      style={{ background: `${step.color}14`, color: step.color, border: `1px solid ${step.color}22` }}
                    >
                      {step.n}
                    </div>
                    <div className="flex-1 h-px" style={{ background: `${step.color}14` }} />
                  </div>

                  <h3 className="font-black text-xl mb-2 relative z-10 text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed relative z-10" style={{ color: '#5A5045' }}>{step.desc}</p>

                  {/* Animated bottom accent bar */}
                  <div className="absolute bottom-0 left-4 right-4 h-[2px] overflow-hidden rounded-full">
                    <div className="absolute inset-0 rounded-full" style={{ background: `${step.color}12` }} />
                    <motion.div
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{ background: step.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: '32%' }}
                      transition={{ duration: 1, delay: 0.6 + i * 0.12, ease: 'easeOut' }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              </BlurFade>
            ))}
          </div>

          {/* Gamification strip — big stat cells */}
          <BlurFade delay={0.35} className="mt-10">
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: '#171614', border: '1px solid #252320' }}
            >
              {/* Top header */}
              <div className="px-8 pt-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#3A3530' }}>Мотивация</div>
                  <div className="font-black text-2xl sm:text-3xl text-white leading-tight">
                    Прогресс виден<br className="sm:hidden" /> с первого дня
                  </div>
                </div>
                <p className="text-sm" style={{ color: '#3A3530', maxWidth: '28ch' }}>
                  Каждое действие приносит очки, открывает новый уровень и фиксирует результат
                </p>
              </div>

              {/* 4-col stats */}
              <div
                className="grid grid-cols-2 lg:grid-cols-4 mt-6"
                style={{ borderTop: '1px solid #1E1D1A' }}
              >
                  {[
                  { displayVal: '1 240', tickerVal: 1240, suffix: '',  label: 'Очков опыта', sub: 'XP за все пройденные уроки',  color: ACCENT,    pct: 62 },
                  { displayVal: '7',     tickerVal: 7,    suffix: '',  label: 'Дней подряд', sub: 'Серия без пропусков',          color: '#FF9F0A', pct: 70 },
                  { displayVal: '4',     tickerVal: 4,    suffix: '',  label: 'Достижения',  sub: 'Из 12 возможных открыто',      color: '#FFD60A', pct: 33 },
                  { displayVal: 'Топ 8', tickerVal: 8,   suffix: '',  label: 'Рейтинг',     sub: 'Среди всех участников курса',  color: '#32D74B', pct: 50 },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    className="relative px-6 sm:px-8 py-6 sm:py-7 flex flex-col gap-1"
                    style={{
                      borderRight: i < 3 ? '1px solid #1E1D1A' : 'none',
                      borderBottom: i < 2 ? '1px solid #1E1D1A' : 'none',
                    }}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 + i * 0.07, duration: 0.4, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  >
                    {/* Glow behind number */}
                    <div
                      className="absolute top-4 left-4 w-16 h-16 pointer-events-none rounded-full"
                      style={{ background: `${s.color}10`, filter: 'blur(18px)' }}
                    />
                    <div
                      className="font-black leading-none relative"
                      style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: s.color, letterSpacing: '-0.03em' }}
                    >
                      {s.displayVal === 'Топ 8'
                        ? <span>Топ <NumberTicker value={s.tickerVal} /></span>
                        : <NumberTicker value={s.tickerVal} />
                      }
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider" style={{ color: '#fff' }}>{s.label}</div>
                    <div className="text-[11px] leading-snug" style={{ color: '#3A3530' }}>{s.sub}</div>
                    {/* Progress bar */}
                    <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: '#252320' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: s.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.pct}%` }}
                        transition={{ duration: 1.1, delay: 0.6 + i * 0.08, ease: 'easeOut' }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ── About / CTA — Bento Grid ── */}
      <section id="about" className="py-24 sm:py-32 scroll-mt-20" style={{ background: '#F5F0EB' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <BlurFade className="mb-8">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: '#EDE8E0', color: '#7A6B5E' }}>О продукте</span>
            <h2 className="font-black text-2xl sm:text-3xl tracking-tight mb-6" style={{ color: CARD_DARK }}>
              Всё для роста в визуальном дизайне
            </h2>
          </BlurFade>

          <BlurFade className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { t: 'Творческие навыки', d: 'Пошаговые модули от точки до финальной сборки решения.', c: ACCENT },
                { t: 'Игровые задания', d: 'Мини-проверки в браузере: точность считается, виден процент успеха.', c: '#3A5AF0' },
                { t: 'Практика', d: 'Осмысленные задания в Figma с обратной связью от педагога.', c: '#7C5AF0' },
                { t: 'Портфолио', d: 'Работы и XP копятся в одном месте — виден прогресс с первого дня.', c: '#32D74B' },
              ].map((item, i) => (
                <motion.div
                  key={item.t}
                  className="rounded-2xl p-5 sm:p-6 border"
                  style={{ background: '#fff', borderColor: '#E8E1D8' }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  viewport={{ once: true }}
                >
                  <div className="w-2 h-2 rounded-full mb-3" style={{ background: item.c }} />
                  <div className="font-black text-sm sm:text-base mb-2" style={{ color: CARD_DARK }}>{item.t}</div>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#7A7065' }}>{item.d}</p>
                </motion.div>
              ))}
            </div>
          </BlurFade>

          <BlurFade className="mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: '#EDE8E0', color: '#7A6B5E' }}>В кабинете</span>
          </BlurFade>

          {/* Bento — top row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

            <BlurFade delay={0} className="sm:col-span-2">
              <div
                className="relative rounded-3xl p-10 sm:p-12 flex flex-col justify-between overflow-hidden"
                style={{ background: CARD_DARK, minHeight: 280 }}
              >
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #2A2925 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.35 }} />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <h2 className="font-black leading-[0.88] mb-10" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', color: '#fff', letterSpacing: '-0.02em' }}>
                    Дизайн — <span style={{ color: ACCENT }}>это навык,</span><br />
                    а не талант.
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    <ShimmerButton href="#modules">Начать обучение →</ShimmerButton>
                  </div>
                </div>
              </div>
            </BlurFade>

            <BlurFade delay={0.1}>
              {(() => {
                const r = 38; const circ = 2 * Math.PI * r; const pct = 62;
                return (
                  <div
                    className="relative rounded-3xl overflow-hidden flex flex-col"
                    style={{ background: '#171614', border: '1px solid #252320', minHeight: 280 }}
                  >
                    <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 75%, ${ACCENT}12, transparent 60%)` }} />
                    {/* Student identity */}
                    <div className="px-7 pt-7 pb-4 flex items-center gap-3 relative z-10" style={{ borderBottom: '1px solid #1E1D1A' }}>
                      <div className="relative shrink-0">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black" style={{ background: '#2A2925', color: '#fff' }}>А</div>
                        <div className="absolute -bottom-1 -right-1 rounded-md px-1 flex items-center" style={{ background: ACCENT, minWidth: 22, height: 14 }}>
                          <span style={{ fontSize: 8, fontWeight: 900, color: '#fff', lineHeight: 1 }}>Ур.3</span>
                        </div>
                      </div>
                      <div>
                        <div className="font-black text-sm text-white">Александра М.</div>
                        <div style={{ fontSize: 10, color: '#3A3530' }}>Дизайнер-джуниор</div>
                      </div>
                    </div>
                    {/* Arc + XP centered */}
                    <div className="flex-1 flex flex-col items-center justify-center py-6 relative z-10">
                      <div className="relative" style={{ width: 120, height: 120 }}>
                        <svg width={120} height={120} viewBox="0 0 100 100" fill="none">
                          <circle cx="50" cy="50" r={r} strokeWidth="5" stroke="#1E1D1A" />
                          <motion.circle
                            cx="50" cy="50" r={r} strokeWidth="5"
                            stroke={ACCENT} strokeLinecap="round"
                            strokeDasharray={`0 ${circ}`}
                            whileInView={
                              { strokeDasharray: `${(circ / 100) * pct} ${circ}` } as {
                                strokeDasharray: string;
                              }
                            }
                            transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                            viewport={{ once: true }}
                            style={{ transform: 'rotate(-90deg)', transformOrigin: '50px 50px' }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="font-black leading-none" style={{ fontSize: 24, color: '#fff', letterSpacing: '-0.04em' }}>1 240</span>
                          <span className="font-black text-xs mt-0.5" style={{ color: ACCENT }}>XP</span>
                        </div>
                      </div>
                      <div style={{ marginTop: 10, width: 104 }}>
                        <div style={{ height: 3, background: '#1E1D1A', borderRadius: 2, overflow: 'hidden' }}>
                          <motion.div
                            style={{ height: '100%', background: ACCENT, borderRadius: 2 }}
                            initial={{ width: 0 }}
                            whileInView={{ width: '62%' }}
                            transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
                            viewport={{ once: true }}
                          />
                        </div>
                        <div style={{ fontSize: 9, color: '#3A3530', marginTop: 4, textAlign: 'center' }}>62% до Ур.4</div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </BlurFade>

          </div>

          {/* Bento — bottom row: asymmetric heights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">

            <BlurFade delay={0.15}>
              <div
                className="relative rounded-3xl overflow-hidden flex flex-col justify-between"
                style={{ background: '#fff', border: '1px solid #E8E1D8', minHeight: 210 }}
              >
                {/* Browser bar */}
                <div className="flex items-center gap-2 px-4 py-2" style={{ background: '#F5F0EB', borderBottom: '1px solid #EDE8E0' }}>
                  <div className="flex gap-1">{['#EDADA8','#F2C97A','#8DD0A5'].map(c => <div key={c} style={{ width: 6, height: 6, borderRadius: '50%', background: c }} />)}</div>
                  <div className="flex-1 flex items-center gap-1.5 px-2 py-0.5 rounded" style={{ background: '#EDE8E0' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />
                    <span style={{ fontSize: 8, color: '#9A8E85', fontWeight: 700 }}>visualcore.ru / задание</span>
                  </div>
                </div>
                {/* Task prompt */}
                <div className="px-4 pt-3 pb-0" style={{ borderBottom: '1px solid #F0EBE3' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div style={{ width: 14, height: 14, borderRadius: 3, background: `${ACCENT}18`, border: `1.5px solid ${ACCENT}55`, flexShrink: 0 }} />
                    <span style={{ fontSize: 9, fontWeight: 900, color: CARD_DARK, letterSpacing: '0.02em' }}>ЗАДАНИЕ 1.3 — РИТМ ТОЧЕК</span>
                  </div>
                  <div style={{ fontSize: 9, color: '#9A8E85', marginBottom: 10, lineHeight: 1.5 }}>Расставь точки так, чтобы взгляд двигался слева направо</div>
                </div>
                {/* Mini-game — click to swap dots into ascending order */}
                <AssignmentMiniGame />
              </div>
            </BlurFade>

            <BlurFade delay={0.18}>
              <div
                className="relative rounded-3xl p-7 overflow-hidden"
                style={{ background: '#EDE8E0', minHeight: 300 }}
              >
                <div className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#9A8E85' }}>Что изучишь</div>
                <div className="space-y-2 mb-6">
                  {[
                    { icon: '·',  name: 'Точка',            sub: 'Ритм и акцент',           color: '#E8453C' },
                    { icon: '—',  name: 'Линия',            sub: 'Направление и порядок',     color: '#3A5AF0' },
                    { icon: '▲',  name: 'Форма',            sub: 'Геометрия и настроение',   color: '#32D74B' },
                    { icon: '⊞',  name: 'Композиция',       sub: 'Структура и иерархия',     color: '#F5A623' },
                    { icon: '◐',  name: 'Цвет',             sub: 'Палитра и контраст',       color: '#A855F7' },
                    { icon: 'Aa', name: 'Типографика',     sub: 'Текст и восприятие',       color: '#8E8E93' },
                    { icon: '✦',  name: 'Итоговый проект', sub: 'Все принципы на практике',    color: '#FF4F1F' },
                  ].map((mod, i) => (
                    <motion.div
                      key={mod.name}
                      className="flex items-center gap-3 rounded-xl px-3 py-2"
                      style={{ background: 'rgba(255,255,255,0.6)' }}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + i * 0.06, duration: 0.35, ease: 'easeOut' }}
                      viewport={{ once: true }}
                    >
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 font-black text-sm" style={{ background: `${mod.color}22`, color: mod.color }}>{mod.icon}</div>
                      <div className="min-w-0">
                        <div className="font-black text-xs" style={{ color: CARD_DARK }}>{mod.name}</div>
                        <div style={{ fontSize: 9, color: '#9A8E85' }}>{mod.sub}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="font-black text-2xl leading-tight" style={{ color: CARD_DARK }}>7 блоков</div>
              </div>
            </BlurFade>

            <BlurFade delay={0.22}>
              <motion.div
                className="relative rounded-3xl overflow-hidden flex flex-col justify-between"
                style={{ background: CARD_DARK, minHeight: 280 }}
                whileHover={{ scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              >
                <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 80% 10%, ${ACCENT}20, transparent 55%)` }} />
                {/* Work thumbnails — mini screen cards with task names */}
                <div className="grid grid-cols-2 gap-2.5 p-4 relative z-10">
                  {/* Card 1: Ритм точек */}
                  <motion.div className="rounded-xl overflow-hidden flex flex-col" style={{ background: '#1A1917', border: '1px solid #252320', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                    initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.35 }} viewport={{ once: true }}>
                    <div className="flex items-end justify-center gap-1.5" style={{ height: 52, paddingBottom: 8 }}>
                      {[4,7,5,9,6].map((s,i) => <div key={i} style={{ width: s, height: s, borderRadius: '50%', background: '#E8453C', opacity: 0.45 + i*0.13 }} />)}
                    </div>
                    <div style={{ borderTop: '1px solid #252320', padding: '4px 8px' }}>
                      <span style={{ fontSize: 7.5, fontWeight: 800, color: '#5A5045', letterSpacing: '0.04em' }}>РИТМ ТОЧЕК</span>
                    </div>
                  </motion.div>
                  {/* Card 2: Направление линий */}
                  <motion.div className="rounded-xl overflow-hidden flex flex-col" style={{ background: '#1A1917', border: '1px solid #252320', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                    initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.43, duration: 0.35 }} viewport={{ once: true }}>
                    <div className="flex flex-col items-start justify-center gap-1.5 px-3" style={{ height: 52 }}>
                      {[68,44,82,28].map((w,i) => <div key={i} style={{ height: 2, width: `${w}%`, borderRadius: 1, background: '#3A5AF0', opacity: 0.38 + i*0.2 }} />)}
                    </div>
                    <div style={{ borderTop: '1px solid #252320', padding: '4px 8px' }}>
                      <span style={{ fontSize: 7.5, fontWeight: 800, color: '#5A5045', letterSpacing: '0.04em' }}>ЛИНИИ</span>
                    </div>
                  </motion.div>
                  {/* Card 3: Форма */}
                  <motion.div className="rounded-xl overflow-hidden flex flex-col" style={{ background: '#1A1917', border: '1px solid #252320', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                    initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.51, duration: 0.35 }} viewport={{ once: true }}>
                    <div className="relative" style={{ height: 52 }}>
                      <div style={{ position: 'absolute', bottom: 8, left: 10, width: 18, height: 18, borderRadius: 4, background: '#32D74B', opacity: 0.7 }} />
                      <div style={{ position: 'absolute', top: 9, right: 11, width: 14, height: 14, borderRadius: '50%', background: '#32D74B', opacity: 0.4 }} />
                      <div style={{ position: 'absolute', bottom: 9, right: 14, width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderBottom: '12px solid #32D74B', opacity: 0.55 }} />
                    </div>
                    <div style={{ borderTop: '1px solid #252320', padding: '4px 8px' }}>
                      <span style={{ fontSize: 7.5, fontWeight: 800, color: '#5A5045', letterSpacing: '0.04em' }}>ФОРМА</span>
                    </div>
                  </motion.div>
                  {/* Card 4: Типографика */}
                  <motion.div className="rounded-xl overflow-hidden flex flex-col" style={{ background: '#1A1917', border: '1px solid #252320', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                    initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.59, duration: 0.35 }} viewport={{ once: true }}>
                    <div className="flex flex-col justify-center gap-1 px-2.5" style={{ height: 52 }}>
                      <div style={{ fontSize: 15, fontWeight: 900, color: '#FFD60A', lineHeight: 1, letterSpacing: '-0.03em' }}>Ag</div>
                      <div style={{ height: 2, width: '78%', borderRadius: 1, background: '#2A2925' }} />
                      <div style={{ height: 2, width: '52%', borderRadius: 1, background: '#2A2925' }} />
                    </div>
                    <div style={{ borderTop: '1px solid #252320', padding: '4px 8px' }}>
                      <span style={{ fontSize: 7.5, fontWeight: 800, color: '#5A5045', letterSpacing: '0.04em' }}>ТИПОГРАФИКА</span>
                    </div>
                  </motion.div>
                </div>
                {/* Label */}
                <div className="px-5 pb-5 relative z-10">
                  <div className="font-black text-xl leading-tight text-white">8+ работ</div>
                  <div className="text-xs mt-0.5" style={{ color: '#4A4035' }}>Портфолио с первого задания</div>
                </div>
              </motion.div>
            </BlurFade>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
