"use client";
import React from 'react';
import Link from 'next/link';
import { footerNavigation } from './contentSections';
import { FaTelegram, FaVk, FaInstagram } from 'react-icons/fa';
import { VisualCoreMark } from './VisualCoreMark';

const TG_CONTACT = 'https://t.me/ss_semenova';
const ICON_WRAP = 'w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200 bg-[#F0EAE2] hover:bg-[#E8E1D8]';
const NAV_LINK =
  'text-sm sm:text-base font-medium text-[#7A7065] transition-colors hover:text-[#111110]';

export default function Footer() {
  return (
    <footer className="bg-[#FAFAF8] border-t border-[#E8E1D8]">
      <div className="max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-4 sm:mb-6">
              <span className="rounded-xl shadow-sm ring-1 ring-black/[0.06] overflow-hidden shrink-0">
                <VisualCoreMark size={40} />
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#111110]">VisualCore</h3>
            </div>
            <p className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-md mx-auto sm:mx-0 text-[#7A7065]">
              Образовательная платформа по визуальному дизайну. Модули, игры с XP, практика в редакторе и портфолио с первых шагов.
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center sm:text-left">
            <h4 className="text-base font-black mb-4 sm:mb-6 text-[#111110]">Навигация</h4>
            <ul className="space-y-3 sm:space-y-4">
              {footerNavigation.app.map((item) => (
                <li key={item.name}>
                  {item.href.startsWith('/') ? (
                    <Link href={item.href} className={NAV_LINK}>
                      {item.name}
                    </Link>
                  ) : (
                    <a href={item.href} className={NAV_LINK}>
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Social + контакт */}
          <div className="text-center sm:text-left">
            <h4 className="text-base font-black mb-4 sm:mb-6 text-[#111110]">Соцсети</h4>
            <div className="flex justify-center sm:justify-start gap-3">
              <a href="https://t.me/visualcore" target="_blank" rel="noopener noreferrer" aria-label="Telegram сообщества" className={ICON_WRAP}>
                <FaTelegram className="w-5 h-5 text-[#7A7065]" />
              </a>
              <a href="https://vk.com/visualcore" target="_blank" rel="noopener noreferrer" aria-label="VK" className={ICON_WRAP}>
                <FaVk className="w-5 h-5 text-[#7A7065]" />
              </a>
              <a href="https://www.instagram.com/visualcore" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={ICON_WRAP}>
                <FaInstagram className="w-5 h-5 text-[#7A7065]" />
              </a>
            </div>
            <div className="mt-6">
              <h5 className="text-base font-black mb-3 text-[#111110]">Контакты</h5>
              <a
                href={TG_CONTACT}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#7A7065] hover:text-[#111110] transition-colors"
                aria-label="Telegram @ss_semenova"
              >
                <FaTelegram className="w-4 h-4 shrink-0" />
                <span>@ss_semenova</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-8 border-t border-[#E8E1D8]">
          <Link href="/privacy" className="text-sm font-semibold text-[#7A7065] hover:text-[#111110] transition-colors">
            Политика конфиденциальности
          </Link>
          <a
            href={TG_CONTACT}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-extrabold text-white bg-[#FF4F1F] hover:opacity-95 transition-opacity"
          >
            Обратная связь
          </a>
        </div>
        <p className="mt-6 text-sm text-center font-medium text-[#A09890]">© 2026 VisualCore. Все права защищены.</p>
      </div>
    </footer>
  );
}
