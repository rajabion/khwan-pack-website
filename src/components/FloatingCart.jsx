import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingCart() {
  const { cartCount } = useCart();
  const { lang, t } = useLang();

  return (
    <AnimatePresence>
      {cartCount > 0 && (
        <motion.div
          initial={{ scale: 0, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0, y: 100 }}
          className={`fixed bottom-8 ${lang === 'ar' ? 'left-8' : 'right-8'} z-[100]`}
        >
          <Link to="/quote-review" className="relative group">
            <div className="absolute inset-0 bg-blue-600 blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="relative bg-slate-900 text-white p-5 rounded-3xl shadow-2xl flex items-center gap-4 transition-transform hover:scale-105 active:scale-95">
              <ShoppingBag size={24} />
              <span className="font-bold text-sm tracking-tight">
                {t('floating_cart')}
              </span>
              <div className="bg-red-600 w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-extrabold shadow-inner">
                {cartCount}
              </div>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
