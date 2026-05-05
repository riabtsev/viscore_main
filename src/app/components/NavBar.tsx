"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { landingPageNavigationItems } from './contentSections';
import { VisualCoreMark } from './VisualCoreMark';

type NavItem = { name: string; to?: string; href?: string };

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 gpu-smooth">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 sm:p-5 lg:px-8" aria-label="Global">

        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" aria-label="На главную" className="-m-1.5 p-1.5 flex items-center gap-2.5 group">
            <span className="rounded-xl shadow-sm ring-1 ring-black/[0.08] overflow-hidden shrink-0 transition-transform duration-200 group-hover:scale-[1.04]">
              <VisualCoreMark size={36} />
            </span>
            <span className="text-xl font-black tracking-tight text-gray-900">
              VisualCore
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-violet-50 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Открыть главное меню</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex lg:gap-x-10">
          {landingPageNavigationItems.map((item: NavItem) => {
            const url = item.to ?? item.href ?? '#';
            return (
              <Link
                key={item.name}
                href={url}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 px-2 py-1"
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Personal cabinet */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-3">
          <Link
            href="/cabinet"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2.5 rounded-xl transition-colors duration-200"
          >
            Войти
          </Link>
          <Link
            href="/#hero-register"
            className="text-sm font-bold text-white bg-gray-900 px-5 py-2.5 rounded-xl hover:bg-black transition-colors duration-200 shadow-sm"
          >
            Регистрация
          </Link>
        </div>
      </nav>

      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
              <span className="rounded-lg shadow-sm ring-1 ring-black/[0.08] overflow-hidden shrink-0">
                <VisualCoreMark size={32} />
              </span>
              <span className="text-lg font-black text-gray-900">VisualCore</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Закрыть меню</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-100">
              <div className="space-y-1 py-6">
                {landingPageNavigationItems.map((item: NavItem) => {
                  const url = item.to ?? item.href ?? '#';
                  return (
                    <Link
                      key={item.name}
                      href={url}
                      className="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
              <div className="py-6 space-y-3">
                <Link
                  href="/cabinet"
                  className="block w-full text-center border border-gray-200 text-gray-700 px-6 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Войти
                </Link>
                <Link
                  href="/#hero-register"
                  className="block w-full text-center bg-gray-900 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-black transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Регистрация
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}


