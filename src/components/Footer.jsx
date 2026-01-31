import React from 'react';
import { useLang } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 mt-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-start">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">KhwanPack</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t('footer.desc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 text-yellow-500">
              {t('footer.links_title')}
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.about')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.guide')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.faq')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('footer.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-6 text-yellow-500">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>{t('footer.location')}</li>
              <li>info@khwanpack.com</li>
              <li>+966 50 000 0000</li>
            </ul>
          </div>

          {/* Colors/Pattern Decor */}
          <div className="relative h-40 rounded-2xl overflow-hidden glass opacity-80">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-50 mix-blend-multiply"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-bold text-lg">Khwan Pack</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Khwan Pack. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}
