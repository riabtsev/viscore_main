"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const ACCENT = '#FF4F1F';
const CARD_DARK = '#111110';
const CARD_DARK_2 = '#171614';
const BASE = '#F5F0EB';
const MUTED = '#7A7065';

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ background: BASE }}>
      <NavBar />

      {/* Hero */}
      <section className="pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#7A7065] mb-5">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />
              О платформе
            </div>
            <h1
              className="font-black leading-[0.92] tracking-tight text-[#111110]"
              style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4rem)' }}
            >
              Дизайн
              <br />
              понятен
              <br />
              <span style={{ color: ACCENT }}>с нуля.</span>
            </h1>
            <p className="mt-7 text-base sm:text-lg leading-relaxed max-w-[44ch]" style={{ color: MUTED }}>
              Мы идём от обратного: не учим инструментам — объясняем, как устроен визуал. Семь модулей — от точки, линии и
              формы до композиции, цвета и типографики, с финальной сборкой всего в одной работе.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
            <div
              className="col-span-2 rounded-[20px] p-5 sm:p-6 text-white transition-transform hover:-translate-y-0.5"
              style={{ background: CARD_DARK }}
            >
              <div className="text-2xl sm:text-3xl font-black mb-2.5">●→■</div>
              <div className="text-[11px] font-bold uppercase tracking-widest opacity-50">Основа</div>
              <div className="text-base sm:text-lg font-bold mt-1">
                От простого к сложному — через принципы, а не инструменты
              </div>
            </div>
            {[
              { icon: '·', label: 'Модуль 01', name: 'Точка' },
              { icon: '—', label: 'Модуль 02', name: 'Линия' },
              { icon: '▲', label: 'Модуль 03', name: 'Форма' },
              { icon: '⊞', label: 'Модуль 04', name: 'Композиция' },
              { icon: '◐', label: 'Модуль 05', name: 'Цвет' },
              { icon: 'Aa', label: 'Модуль 06', name: 'Типографика' },
              { icon: '✦', label: 'Модуль 07', name: 'Итоговый проект' },
            ].map((p, i) => (
              <div
                key={p.label}
                className={`rounded-[20px] p-5 border border-black/[0.06] transition-transform hover:-translate-y-0.5 ${
                  i === 1 ? 'text-white' : 'bg-white'
                }`}
                style={i === 1 ? { background: ACCENT, borderColor: 'transparent' } : {}}
              >
                <div className={`text-xl font-black mb-2 ${i === 1 ? '' : 'text-[#111110]'}`}>{p.icon}</div>
                <div className={`text-[11px] font-bold uppercase tracking-widest opacity-50 ${i === 1 ? '' : ''}`}>
                  {p.label}
                </div>
                <div className={`text-sm font-bold mt-1 ${i === 1 ? '' : 'text-[#111110]'}`}>{p.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8" style={{ background: CARD_DARK }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white/40 mb-5">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />
              Наша идея
            </div>
            <h2 className="font-black text-white leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
              Не «делай
              <br />
              <span style={{ color: ACCENT }}>красиво»</span> —
              <br />
              понимай почему.
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            {[
              {
                n: '01',
                text: (
                  <>
                    <strong className="text-white font-bold">Принципы важнее инструментов.</strong> Многие курсы учат Figma и
                    Photoshop, но не объясняют, зачем принимаются решения. Мы начинаем с основ визуального языка.
                  </>
                ),
              },
              {
                n: '02',
                text: (
                  <>
                    <strong className="text-white font-bold">Теория + практика в каждом модуле.</strong> Игровые задания
                    помогают закрепить материал и увидеть результат сразу — обучение не превращается в повторение действий.
                  </>
                ),
              },
              {
                n: '03',
                text: (
                  <>
                    <strong className="text-white font-bold">Доступно для всех.</strong> Платформа изначально строится так,
                    чтобы курс оставался понятным и финансово доступным, в том числе для студентов из регионов.
                  </>
                ),
              },
              {
                n: '04',
                text: (
                  <>
                    <strong className="text-white font-bold">Связь с реальными задачами.</strong> Лучшие работы могут
                    использоваться в проектах партнёров — вы видите, как ваша работа живёт в реальной среде.
                  </>
                ),
              },
            ].map((item) => (
              <Reveal key={item.n}>
                <div
                  className="flex gap-4 sm:gap-5 items-start p-5 sm:p-6 rounded-2xl border border-white/[0.06] transition-colors hover:bg-white/[0.07]"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <span className="text-xs font-bold shrink-0 w-6 pt-0.5" style={{ color: ACCENT, letterSpacing: '0.05em' }}>
                    {item.n}
                  </span>
                  <p className="text-[0.975rem] leading-relaxed text-white/65">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Reveal className="mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#7A7065] mb-4">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />
            Как мы учим
          </div>
          <h2 className="font-black text-[#111110] leading-tight tracking-tight" style={{ fontSize: 'clamp(1.65rem, 3vw, 2.5rem)' }}>
            Семь <span style={{ color: ACCENT }}>модулей</span>,<br />
            один путь к понятному визуалу
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '·', title: 'Точка', body: 'Простейший элемент, с которого начинается любое изображение. Учимся видеть структуру в хаосе.', variant: 'light' as const },
            { icon: '—', title: 'Линия', body: 'Движение, ритм, граница. Как линия задаёт настроение и управляет вниманием зрителя.', variant: 'light' as const },
            { icon: '▲', title: 'Форма', body: 'Геометрия и её эмоциональный язык. Почему круг ощущается иначе, чем треугольник.', variant: 'dark' as const },
            { icon: '⊞', title: 'Композиция', body: 'Как расположить элементы, чтобы взгляд двигался туда, куда нужно. Иерархия, сетки, порядок.', variant: 'orange' as const },
            {
              icon: '◐',
              title: 'Цвет',
              body: 'Палитра, контраст и настроение: как цвет усиливает смысл, выделяет главное и связывает композицию без лишнего шума.',
              variant: 'light' as const,
            },
            { icon: 'Aa', title: 'Типографика', body: 'Текст как визуальный элемент. Шрифт, кегль, интерлиньяж — и почему это влияет на восприятие.', variant: 'light' as const },
            {
              icon: '✦',
              title: 'Итоговый проект',
              body: 'Полноценная работа: соединяешь всё изученное и применяешь принципы на практике — как в реальной задаче.',
              variant: 'dark' as const,
            },
          ].map((m) => (
            <Reveal key={m.title}>
              <div
                className="rounded-[22px] p-7 flex flex-col gap-3.5 border transition-all hover:-translate-y-1 hover:shadow-lg cursor-default"
                style={
                  m.variant === 'dark'
                    ? { background: CARD_DARK_2, borderColor: 'rgba(255,255,255,0.04)' }
                    : m.variant === 'orange'
                      ? { background: ACCENT, borderColor: 'transparent' }
                      : { background: '#fff', borderColor: 'rgba(0,0,0,0.07)' }
                }
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl font-black"
                  style={{
                    background: m.variant === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.07)',
                    color: m.variant === 'light' ? CARD_DARK : '#fff',
                  }}
                >
                  {m.icon}
                </div>
                <div
                  className="text-[1.05rem] font-black tracking-tight"
                  style={{ color: m.variant === 'light' ? CARD_DARK : '#fff' }}
                >
                  {m.title}
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: m.variant === 'light' ? MUTED : m.variant === 'orange' ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  {m.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Teacher */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8" style={{ background: CARD_DARK }}>
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white/40 mb-6">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />
            Педагог
          </div>
          <Reveal>
            <div
              className="grid lg:grid-cols-[minmax(0,340px)_1fr] rounded-[28px] overflow-hidden border border-white/[0.07]"
              style={{ background: CARD_DARK_2 }}
            >
              <div className="relative min-h-[280px] lg:min-h-[420px] bg-[#1A1917]">
                <Image
                  src="/pedagog.png"
                  alt="Екатерина Литвинова — педагог платформы VisualCore"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 340px"
                  priority
                />
              </div>
              <div className="p-8 sm:p-10 lg:p-11 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.12em] mb-3" style={{ color: ACCENT }}>
                    Педагог платформы
                  </div>
                  <h3 className="font-black text-white leading-tight tracking-tight mb-6" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)' }}>
                    Екатерина
                    <br />
                    Литвинова
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Архитектор-строитель', 'Дизайнер', 'Художник', 'Скульптор', 'Педагог ШКИ'].map((t) => (
                      <span
                        key={t}
                        className="px-3.5 py-1 rounded-full text-xs font-semibold border border-white/[0.08] text-white/60"
                        style={{ background: 'rgba(255,255,255,0.07)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-[0.95rem] leading-relaxed text-white/60 mb-8">
                    Педагог студии дизайна и анимации ШКИ, действующий архитектор-строитель, дизайнер и художник. Участник и
                    организатор форумов всероссийского и международного значения: пленэр, «Будущее — это мы», конференция
                    городов-партнёров России и Германии. Преподаёт дизайн и скетчинг детям с 1 по 11 класс.
                  </p>
                  <blockquote
                    className="pl-6 pr-5 py-5 rounded-2xl border-l-[3px] italic text-[0.925rem] leading-relaxed text-white/65"
                    style={{ background: 'rgba(255,255,255,0.04)', borderLeftColor: ACCENT }}
                  >
                    «Искусство преподавания дизайна — дать ребёнку свободу творчества, направляя его и раскрывая потенциал. В
                    любой деятельности важна база: теоретические знания, которые становятся фундаментом для создания
                    уникальных вещей.»
                  </blockquote>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Reveal className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#7A7065] mb-4">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />
            Партнёры
          </div>
          <h2 className="font-black text-[#111110] tracking-tight" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)' }}>
            Сотрудничаем с
          </h2>
          <p className="mt-3 text-[0.975rem] leading-relaxed max-w-xl mx-auto" style={{ color: MUTED }}>
            Лучшие работы студентов могут участвовать в реальных проектах наших партнёров
          </p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              logoSrc: '/sheredar.png',
              logoAlt: 'Логотип благотворительного фонда «Шередарь»',
              name: 'БФ «Шередарь»',
              desc: 'Благотворительный фонд помощи детям с онкологическими заболеваниями. Работы студентов могут использоваться в их проектах и инициативах.',
              href: 'https://www.sheredar.ru/',
              link: 'sheredar.ru →',
            },
            {
              logoSrc: '/vks.png',
              logoAlt: 'Логотип ВКС-Кэмп',
              name: 'ВКС-Кэмп',
              desc: 'Языковые программы для детей и подростков. Совместные проекты позволяют студентам применять дизайн-навыки в образовательном контексте.',
              href: 'https://www.speakenglish.ru/',
              link: 'speakenglish.ru →',
            },
          ].map((p) => (
            <Reveal key={p.name}>
              <div className="rounded-[22px] p-8 sm:p-9 bg-white border border-black/[0.07] flex flex-col gap-6 transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className="min-w-0">
                  <div className="text-lg font-black text-[#111110] tracking-tight mb-1.5">{p.name}</div>
                  <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                    {p.desc}
                  </p>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-sm font-semibold transition-opacity hover:opacity-100 opacity-85"
                    style={{ color: ACCENT }}
                  >
                    {p.link}
                  </a>
                </div>
                {/* Логотип под текстом, внутри круга снизу карточки */}
                <div className="mt-auto flex justify-center pt-1">
                  <div className="relative size-[72px] shrink-0 overflow-hidden rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.07)] sm:size-20">
                    <Image
                      src={p.logoSrc}
                      alt={p.logoAlt}
                      fill
                      className="object-contain object-center scale-[0.88]"
                      sizes="(max-width: 640px) 72px, 80px"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <Reveal>
          <div
            className="relative rounded-[28px] px-8 sm:px-12 py-14 sm:py-16 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 overflow-hidden"
            style={{ background: CARD_DARK }}
          >
            <div
              className="pointer-events-none absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(255,79,31,0.15), transparent 70%)' }}
            />
            <div className="relative z-10">
              <h2 className="font-black text-white tracking-tight leading-tight" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)' }}>
                Начни разбираться
                <br />
                в дизайне <span style={{ color: ACCENT }}>сегодня</span>
              </h2>
              <p className="mt-3 text-[0.975rem] leading-relaxed text-white/55 max-w-md">
                Первый модуль — бесплатно. Никаких инструментов заранее учить не нужно.
              </p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/#modules"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-[14px] font-bold text-sm text-white transition-transform hover:scale-[1.03]"
                style={{ background: ACCENT }}
              >
                Начать учиться →
              </Link>
              <Link
                href="/#modules"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-[14px] font-semibold text-sm border border-white/[0.15] text-white/75 hover:border-white/40 hover:text-white transition-colors"
              >
                Смотреть модули
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      <Footer />
    </main>
  );
}
