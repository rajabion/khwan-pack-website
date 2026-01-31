import React, { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LanguageContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { lang, toggleLang, t } = useLang();

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.catalog'), path: '/#catalog' },
    { name: t('nav.portfolio'), path: '/#portfolio' },
    { name: t('nav.book'), path: '/#book' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass mt-4 rounded-3xl px-6 py-3 flex items-center justify-between border border-white/40">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-900 tracking-tighter"
          >
            KhwanPack
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {navItems.map(item => (
              <a
                key={item.name}
                href={item.path}
                className="text-sm font-bold text-slate-700 hover:text-blue-700 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLang}
              className="text-xs font-extrabold px-4 py-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 transition-colors"
            >
              {lang === 'ar' ? 'English' : 'عربي'}
            </button>

            <Link
              to="/quote-review"
              className="relative p-2 text-slate-700 hover:text-blue-700 transition-colors"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0 end-0 h-5 w-5 bg-red-600 rounded-full text-[10px] flex items-center justify-center text-white font-extrabold shadow-lg">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-slate-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="absolute top-full inset-x-0 p-4 md:hidden">
          <div className="glass-card rounded-xl p-4 flex flex-col gap-4">
            {navItems.map(item => (
              <Link
                key={item.name}
                to={item.path}
                className="text-base font-medium text-slate-700 py-2 border-b border-white/50 last:border-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
