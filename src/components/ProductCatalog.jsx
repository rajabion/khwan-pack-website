import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, PRODUCT_CATEGORIES } from '../assets/products';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LanguageContext';
import { Plus, Minus, CheckCircle2 } from 'lucide-react';

export default function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState('cups');
  const { addToCart } = useCart();
  const { lang, t } = useLang();
  const [addedPop, setAddedPop] = useState(null);

  const filteredProducts = PRODUCTS.filter(p => p.category === activeCategory);

  const handleAdd = (product, quantity) => {
    addToCart(product, quantity);
    setAddedPop(product.id);
    setTimeout(() => setAddedPop(null), 2000);
  };

  return (
    <section
      id="catalog"
      className="py-24 relative z-10 container mx-auto px-4"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          {t('catalog.title')}
        </h2>
        <p className="text-slate-500 text-lg uppercase tracking-widest font-bold">
          {t('catalog.subtitle')}
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {PRODUCT_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-8 py-3 rounded-2xl font-bold transition-all border ${
              activeCategory === cat.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-105'
                : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
            }`}
          >
            {lang === 'ar' ? cat.nameAr : cat.nameEn}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={handleAdd}
              isAdded={addedPop === product.id}
              t={t}
              lang={lang}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProductCard({ product, onAdd, isAdded, t, lang }) {
  const [quantity, setQuantity] = useState(1000);
  const [size, setSize] = useState(product.sizes[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      className="glass-card overflow-hidden flex flex-col h-full border border-white/40 shadow-xl rounded-[40px]"
    >
      <div className="h-64 overflow-hidden relative grayscale-[0.2] hover:grayscale-0 transition-all duration-500">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 end-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-extrabold text-slate-800 shadow-sm">
          {product.category.toUpperCase()}
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow text-start">
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          {lang === 'ar' ? product.name : product.nameEn}
        </h3>
        <p className="text-xs text-slate-400 font-bold mb-6 italic">
          {lang === 'ar' ? 'تصميم يحاكي الرقي' : 'Designed for Elegance'}
        </p>

        {/* Size Selector */}
        <div className="mb-6">
          <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-tighter mb-2">
            {t('catalog.size_label')}
          </label>
          <div className="flex flex-wrap gap-2 justify-start">
            {product.sizes.map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                  size === s
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-slate-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selector Slider */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg font-extrabold text-blue-700">
              {quantity.toLocaleString()}
            </span>
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-tighter">
              {t('catalog.qty_label')}
            </label>
          </div>
          <input
            type="range"
            min="1000"
            max="50000"
            step="1000"
            value={quantity}
            onChange={e => setQuantity(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Add to Quote Button */}
        <button
          onClick={() => onAdd({ ...product, selectedSize: size }, quantity)}
          disabled={isAdded}
          className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${
            isAdded
              ? 'bg-green-100 text-green-700'
              : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95 shadow-lg'
          }`}
        >
          {isAdded ? (
            <>
              <CheckCircle2 size={18} />
              <span>{t('catalog.added_btn')}</span>
            </>
          ) : (
            <>
              <Plus size={18} />
              <span>{t('catalog.add_btn')}</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
