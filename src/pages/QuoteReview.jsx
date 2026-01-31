import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LanguageContext';
import { Trash2, Send, ChevronRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function QuoteReview() {
  const { cart, removeFromCart, clearCart, cartCount } = useCart();
  const { lang, t } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    whatsapp: '',
    email: '',
  });

  const handleSubmit = e => {
    e.preventDefault();
    // Simulate form submission
    console.log('Submitting Quote Request:', { user: formData, items: cart });
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[50px] shadow-2xl border border-green-100 max-w-2xl"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-6 font-primary">
            {t('review.success_title')}
          </h2>
          <p
            className="text-xl text-slate-500 mb-10 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t('review.success_desc') }}
          />
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-10 py-5 bg-slate-900 text-white rounded-2xl font-extrabold hover:bg-slate-800 transition-all"
          >
            {t('review.back_home')}{' '}
            <ChevronRight
              size={20}
              className={lang === 'ar' ? '' : 'rotate-180'}
            />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Quote Form */}
        <div className="lg:w-1/2 order-2 lg:order-1">
          <div className="glass-card p-10 rounded-[40px] border border-white/50 shadow-xl">
            <h2 className="text-3xl font-extrabold mb-8 text-start">
              {t('review.contact_title')}
            </h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 text-start"
              name="quote-request"
              data-netlify="true"
            >
              <input type="hidden" name="form-name" value="quote-request" />
              <input
                type="hidden"
                name="cart-json"
                value={JSON.stringify(cart)}
              />

              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                  {t('review.name_label')}
                </label>
                <input
                  required
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-start focus:outline-none focus:border-blue-500 transition-all"
                  placeholder={t('review.name_placeholder')}
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                  {t('review.business_label')}
                </label>
                <input
                  required
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-start focus:outline-none focus:border-blue-500 transition-all"
                  placeholder={t('review.business_placeholder')}
                  value={formData.business}
                  onChange={e =>
                    setFormData({ ...formData, business: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                  {t('review.phone_label')}
                </label>
                <input
                  required
                  type="tel"
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-start focus:outline-none focus:border-blue-500 transition-all"
                  placeholder="05xxxxxxx"
                  value={formData.whatsapp}
                  onChange={e =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                  {t('review.email_label')}
                </label>
                <input
                  required
                  type="email"
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl text-start focus:outline-none focus:border-blue-500 transition-all"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={cartCount === 0}
                className="w-full py-5 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-[24px] font-extrabold text-xl shadow-xl hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
              >
                {t('review.submit_btn')}{' '}
                <Send size={24} className={lang === 'ar' ? '' : 'rotate-180'} />
              </button>
            </form>
          </div>
        </div>

        {/* Selected Items List */}
        <div className="lg:w-1/2 order-1 lg:order-2">
          <div className="glass-card p-10 rounded-[40px] border border-white/50 shadow-xl min-h-[400px]">
            <div className="flex justify-between items-center mb-8">
              <button
                onClick={clearCart}
                className="text-red-500 text-xs font-extrabold hover:underline flex items-center gap-1"
              >
                <Trash2 size={14} /> {t('review.clear_cart')}
              </button>
              <h2 className="text-3xl font-extrabold text-start text-slate-900">
                {t('review.cart_title')} ({cartCount})
              </h2>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <p className="font-extrabold mb-4 italic">
                  {t('review.empty_cart')}
                </p>
                <Link
                  to="/"
                  className="text-blue-600 font-extrabold border-b border-blue-600"
                >
                  {lang === 'ar' ? 'العودة للكتالوج' : 'Back to Catalog'}
                </Link>
              </div>
            ) : (
              <div className="space-y-6 text-start">
                {cart.map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    className="flex items-center gap-6 p-4 bg-white/50 rounded-3xl border border-white/30 group"
                  >
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                    <div className="flex-grow">
                      <h4 className="font-extrabold text-slate-900 leading-tight">
                        {lang === 'ar' ? item.name : item.nameEn}
                      </h4>
                      <p className="text-xs text-slate-400 font-extrabold">
                        {t('review.size_prefix')}
                        {item.selectedSize}
                      </p>
                      <div className="mt-2 text-blue-700 font-extrabold text-sm">
                        {item.quantity.toLocaleString()}{' '}
                        {lang === 'ar' ? 'قطعة' : 'Units'}
                      </div>
                    </div>
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl overflow-hidden shadow-inner shrink-0">
                      <img
                        src={item.image}
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>
                  </div>
                ))}

                <div className="mt-8 pt-8 border-t border-white/40 text-start">
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {t('review.note')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
