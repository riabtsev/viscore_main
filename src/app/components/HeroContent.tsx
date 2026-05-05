"use client";
import React, { useRef, useId, useEffect } from 'react';
import Link from 'next/link';
import { motion, useInView, useAnimation } from 'framer-motion';
import { programModules } from './contentSections';

const ACCENT = '#FF4F1F';
const CARD_BG = '#111110';

const modules = programModules.map((m) => ({ name: m.name, icon: m.icon, done: m.done }));

function IconZap({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function IconFlame({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 01-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
    </svg>
  );
}
function IconFolder({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
    </svg>
  );
}
function IconTrophy({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 21 12 17 16 21" />
      <path d="M8 21H4a2 2 0 01-2-2V9a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-4" />
      <path d="M2 9h20" />
    </svg>
  );
}
function IconLock({ size = 10, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

const tr = (delay: number) => ({ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] });

/** Правая колонка героя: 3D-карточка кабинета и плавающие бейджи */
function HeroInteractiveShowcase() {
  const xpRef = useRef<HTMLDivElement>(null);
  const xpInView = useInView(xpRef, { once: true });
  const xpControls = useAnimation();
  const lineId = useId().replace(/:/g, '');
  const xpBadgeControls = useAnimation();

  useEffect(() => {
    const loop = async () => {
      while (true) {
        await new Promise((r) => setTimeout(r, 3000));
        await xpBadgeControls.start({ scale: [1, 0.8, 1.1, 1], transition: { duration: 0.5 } });
      }
    };
    loop();
  }, [xpBadgeControls]);

  useEffect(() => {
    if (xpInView) xpControls.start({ width: '62%', transition: { duration: 1.4, delay: 0.2, ease: 'easeOut' } });
  }, [xpInView, xpControls]);

  return (
    <div className="relative hidden lg:flex items-center justify-center w-full" style={{ minHeight: 520, perspective: '1000px' }}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10, overflow: 'visible' }} aria-hidden>
        <defs>
          <marker id={`${lineId}-dot`} markerWidth="4" markerHeight="4" refX="2" refY="2">
            <circle cx="2" cy="2" r="1.5" fill="#FF4F1F" opacity="0.6" />
          </marker>
        </defs>
        <line
          x1="14%"
          y1="18%"
          x2="58%"
          y2="30%"
          stroke="#FF4F1F"
          strokeWidth="1"
          strokeDasharray="3 4"
          opacity="0.4"
          markerEnd={`url(#${lineId}-dot)`}
        />
        <line
          x1="5%"
          y1="72%"
          x2="40%"
          y2="68%"
          stroke="#FF9F0A"
          strokeWidth="1"
          strokeDasharray="3 4"
          opacity="0.35"
          markerEnd={`url(#${lineId}-dot)`}
        />
        <line
          x1="93%"
          y1="58%"
          x2="78%"
          y2="78%"
          stroke="#E8E1D8"
          strokeWidth="1"
          strokeDasharray="3 4"
          opacity="0.4"
          markerEnd={`url(#${lineId}-dot)`}
        />
      </svg>

      <motion.div
        className="absolute flex items-center gap-2 rounded-2xl font-bold shadow-lg"
        style={{
          top: '10%',
          left: '-2%',
          background: CARD_BG,
          color: '#fff',
          padding: '10px 16px',
          fontSize: 13,
          zIndex: 30,
          boxShadow: '0 8px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)',
        }}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <motion.div
          animate={xpBadgeControls}
          className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: ACCENT }}
        >
          <IconZap size={14} color="#fff" />
        </motion.div>
        <div>
          <div style={{ fontSize: 15, lineHeight: 1.1 }} className="font-black">
            XP +50
          </div>
          <div style={{ fontSize: 10, color: '#6B6355', lineHeight: 1.2 }}>Модуль завершён</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute flex items-center gap-2 rounded-xl font-bold"
        style={{
          bottom: '26%',
          left: '-4%',
          background: '#1C1A16',
          color: '#fff',
          padding: '8px 12px',
          fontSize: 12,
          zIndex: 15,
          filter: 'blur(0.8px)',
          opacity: 0.7,
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7, y: [0, -6, 0] }}
        transition={{ opacity: { delay: 0.9, duration: 0.4 }, y: { duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 1.1 } }}
      >
        <IconFlame size={13} color="#FF9F0A" />
        <div>
          <div className="font-black" style={{ fontSize: 13 }}>
            7 дней
          </div>
          <div style={{ fontSize: 9, color: '#5A5045' }}>подряд</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute flex items-center gap-1.5 rounded-xl font-bold"
        style={{
          top: '52%',
          right: '-6%',
          background: '#fff',
          color: '#111110',
          padding: '6px 10px',
          fontSize: 11,
          zIndex: 30,
          border: '1px solid #E0D8CE',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.4 },
          x: { delay: 1, duration: 0.4 },
          y: { duration: 2.9, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
        }}
      >
        <IconFolder size={12} color="#9A8E85" />
        <span style={{ color: '#7A7065' }}>8 работ</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotateY: -20, rotateX: 8, y: 30 }}
        animate={{ opacity: 1, rotateY: -8, rotateX: 4, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.3 }}
        className="relative w-full max-w-[300px] rounded-3xl p-5"
        style={{
          background: CARD_BG,
          transformStyle: 'preserve-3d',
          boxShadow: `
                  0 40px 80px rgba(255, 79, 31, 0.15),
                  0 20px 40px rgba(0, 0, 0, 0.35),
                  0 0 0 1px rgba(255,255,255,0.06)
                `,
          zIndex: 20,
        }}
      >
        <motion.div
          style={{ background: ACCENT }}
          className="absolute top-4 right-4 w-2 h-2 rounded-full"
          animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="flex items-center gap-3 mb-4">
          <div className="relative shrink-0">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg" style={{ background: '#2A2925' }}>
              🎨
            </div>
            <div className="absolute -bottom-1 -right-1 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md" style={{ background: ACCENT, lineHeight: 1.3 }}>
              Lv.3
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-black text-sm text-white truncate">Александра М.</div>
            <div className="text-[11px]" style={{ color: '#6B6355' }}>
              Дизайнер-джуниор
            </div>
          </div>
        </div>

        <div className="mb-4 px-1">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-black leading-none" style={{ fontSize: 42, color: ACCENT, letterSpacing: '-0.03em' }}>
              1 240
            </span>
            <span className="font-bold text-sm" style={{ color: '#4A4035' }}>
              XP
            </span>
          </div>
          <div ref={xpRef} className="space-y-1">
            <div className="flex justify-between text-[10px]" style={{ color: '#4A4035' }}>
              <span>До Lv.4</span>
              <span>62%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#252320' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${ACCENT}, #FF7A4F)` }}
                initial={{ width: 0 }}
                animate={xpControls}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1.5 mb-4">
          {[
            { Icon: IconFlame, value: '7', label: 'серия', color: '#FF9F0A' },
            { Icon: IconTrophy, value: '4', label: 'награды', color: ACCENT },
            { Icon: IconFolder, value: '8', label: 'работ', color: '#32D74B' },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-2 text-center" style={{ background: '#1A1917' }}>
              <s.Icon size={12} color={s.color} />
              <div className="font-black text-xs mt-1" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="text-[8px] mt-0.5" style={{ color: '#3A3530' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: '#3A3530' }}>
            Модули курса
          </div>
          <div className="grid grid-cols-3 gap-1">
            {modules.map((mod, i) => (
              <motion.div
                key={mod.name}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.05, type: 'spring', stiffness: 220, damping: 18 }}
                className="relative rounded-xl p-2 text-center"
                style={{
                  background: mod.done ? ACCENT : '#181714',
                  border: mod.done ? 'none' : '1px solid rgba(255,255,255,0.08)',
                }}
                whileHover={{ scale: 1.07 }}
              >
                <div className="font-black text-sm leading-none" style={{ color: mod.done ? '#fff' : '#2E2A24' }}>
                  {mod.icon}
                </div>
                <div className="text-[8px] font-semibold mt-0.5 leading-tight line-clamp-2" style={{ color: mod.done ? '#FFD0BC' : '#2E2A24' }}>
                  {mod.name}
                </div>
                {mod.done ? (
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center" style={{ background: '#32D74B' }}>
                    <svg width="6" height="6" viewBox="0 0 8 8" fill="none">
                      <polyline points="1.5,4 3,5.5 6.5,2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                ) : (
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center" style={{ background: '#252320' }}>
                    <IconLock size={6} color="#3A3530" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function HeroContent() {
  const formId = useId().replace(/:/g, '');

  return (
    <div style={{ background: '#F5F0EB' }} className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #C8C2BA 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.35,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-16">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center min-h-[min(100vh-8rem,720px)]">
          <div className="lg:col-span-3 space-y-6 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={tr(0)}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest" style={{ background: '#EDE8E0', color: '#7A6B5E' }}>
                <span style={{ background: ACCENT }} className="w-1.5 h-1.5 rounded-full shrink-0" />
                VisualCore
              </span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={tr(0.08)}>
              <h1 className="font-black leading-[0.95] tracking-tight" style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', color: '#111110' }}>
                Visual<span style={{ color: ACCENT }}>Core</span>
              </h1>
              <p className="mt-4 text-xl sm:text-2xl font-bold leading-snug max-w-xl mx-auto lg:mx-0" style={{ color: '#3A3530' }}>
                Дизайн — это проще, чем кажется
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={tr(0.16)}
              className="text-base sm:text-[1.05rem] leading-relaxed max-w-xl mx-auto lg:mx-0"
              style={{ color: '#7A7065' }}
            >
              Осваивай основы визуала через игру, выполняй задания, зарабатывай баллы и создавай свои первые работы. Учись в удобном
              формате и прокачивай креатив каждый день.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={tr(0.22)}
              className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start"
            >
              <motion.a
                href="#modules"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 text-white px-8 py-4 rounded-2xl font-bold text-base"
                style={{ background: ACCENT, boxShadow: `0 8px 24px ${ACCENT}55` }}
              >
                Начать обучение →
              </motion.a>
              <motion.a
                href="#hero-register"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base"
                style={{ background: '#fff', border: '1.5px solid #DDD5CB', color: '#111110' }}
              >
                Регистрация
              </motion.a>
              <motion.a
                href="#how-it-works"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold text-sm text-[#7A7065] hover:text-[#111110] transition-colors"
              >
                Как это работает
              </motion.a>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={tr(0.28)} className="text-xs text-[#A09890] max-w-md mx-auto lg:mx-0">
              Уже есть аккаунт?{' '}
              <Link href="/cabinet" className="font-bold text-[#111110] underline-offset-2 hover:underline">
                Войти в кабинет
              </Link>
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={tr(0.34)} className="grid grid-cols-3 gap-2 pt-2">
              {[
                { value: '7', label: 'модулей' },
                { value: '1240+', label: 'студентов' },
                { value: '50+', label: 'заданий' },
              ].map((s, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="font-black text-xl sm:text-2xl" style={{ color: '#111110' }}>
                    {s.value}
                  </div>
                  <div className="text-[10px] sm:text-xs font-medium mt-0.5 leading-tight" style={{ color: '#A09890' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="lg:col-span-2 w-full flex justify-center lg:justify-end">
            <HeroInteractiveShowcase />
          </div>

          {/* На мобиле — компактное превью кабинета под текстом */}
          <div className="col-span-full lg:hidden flex justify-center -mt-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.45 }}
              className="rounded-2xl p-4 border w-full max-w-sm"
              style={{ background: CARD_BG, borderColor: '#2A2925', boxShadow: `0 20px 50px ${ACCENT}18` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: '#2A2925' }}>
                  🎨
                </div>
                <div>
                  <div className="font-black text-sm text-white">Кабинет</div>
                  <div className="text-[10px] text-white/35">XP · модули · портфолио</div>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-black text-3xl tabular-nums" style={{ color: ACCENT }}>
                  1 240
                </span>
                <span className="text-xs font-bold text-white/40">XP</span>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {modules.slice(0, 7).map((mod, i) => (
                  <div
                    key={mod.name}
                    className={`rounded-lg py-2 text-[10px] font-bold text-center ${mod.done ? 'text-white' : 'text-white/20'}`}
                    style={{
                      background: mod.done ? `${ACCENT}cc` : 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      animationDelay: `${i * 40}ms`,
                    }}
                  >
                    <div className="leading-none">{mod.icon}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.section
          id="hero-register"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-16 sm:mt-20 scroll-mt-28 rounded-[28px] border overflow-hidden"
          style={{ background: '#fff', borderColor: '#E8E1D8', boxShadow: '0 20px 60px -40px rgba(17,17,16,0.2)' }}
        >
          <div className="grid lg:grid-cols-12 gap-0">
            <div className="lg:col-span-5 px-8 py-10 sm:px-10 sm:py-12" style={{ background: 'linear-gradient(165deg, #111110 0%, #1A1917 45%, #252320 100%)' }}>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] mb-3" style={{ color: '#5A5045' }}>
                Старт в одном месте
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-4">Создай аккаунт</h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Имя, email или логин, пароль и возраст — этого достаточно, чтобы начать работу в кабинете.
              </p>
              <ul className="space-y-3 text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.72)' }}>
                <li className="flex gap-2">
                  <span style={{ color: ACCENT }}>·</span> Модули, XP и награды
                </li>
                <li className="flex gap-2">
                  <span style={{ color: ACCENT }}>·</span> Портфолио и комментарии педагога
                </li>
              </ul>
            </div>
            <div className="lg:col-span-7 px-8 py-10 sm:px-10 sm:py-12 bg-white">
              <HeroRegisterForm formSuffix={formId} />
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

function HeroRegisterForm({ formSuffix }: { formSuffix: string }) {
  const inputClass =
    'w-full rounded-xl border border-[#E0D9D0] bg-[#FAFAF8] px-3.5 py-2.5 text-sm font-medium text-[#111110] outline-none transition-shadow placeholder:text-[#A09890] focus:border-[#FF4F1F88] focus:ring-2 focus:ring-[#FF4F1F22]';

  return (
    <form className="space-y-4" noValidate aria-label="Регистрация" onSubmit={(e) => e.preventDefault()}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`name-${formSuffix}`} className="text-[0.7rem] font-bold text-[#9A8E85] uppercase tracking-wide">
            Имя
          </label>
          <input id={`name-${formSuffix}`} name="name" type="text" autoComplete="name" placeholder="Как к тебе обращаться" className={`mt-1 ${inputClass}`} />
        </div>
        <div>
          <label htmlFor={`email-${formSuffix}`} className="text-[0.7rem] font-bold text-[#9A8E85] uppercase tracking-wide">
            Email / логин
          </label>
          <input id={`email-${formSuffix}`} name="email" type="email" autoComplete="email" placeholder="you@example.com" className={`mt-1 ${inputClass}`} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`pass-${formSuffix}`} className="text-[0.7rem] font-bold text-[#9A8E85] uppercase tracking-wide">
            Пароль
          </label>
          <input id={`pass-${formSuffix}`} name="password" type="password" autoComplete="new-password" placeholder="Минимум 8 символов" className={`mt-1 ${inputClass}`} />
        </div>
        <div>
          <label htmlFor={`age-${formSuffix}`} className="text-[0.7rem] font-bold text-[#9A8E85] uppercase tracking-wide">
            Возраст
          </label>
          <input id={`age-${formSuffix}`} name="age" type="number" min={12} max={99} placeholder="Например, 16" className={`mt-1 ${inputClass}`} />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 rounded-xl py-3.5 font-extrabold text-sm text-white border-none cursor-pointer"
          style={{ background: ACCENT, boxShadow: `0 8px 20px ${ACCENT}44` }}
        >
          Зарегистрироваться
        </button>
        <Link
          href="/cabinet"
          className="flex-1 inline-flex items-center justify-center rounded-xl py-3.5 font-bold text-sm border border-[#E0D9D0] text-[#111110] bg-white hover:bg-[#F5F2EE] transition-colors"
        >
          Войти
        </Link>
      </div>
    </form>
  );
}
