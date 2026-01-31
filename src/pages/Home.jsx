import React, { Suspense } from 'react';
import HeroSection from '../components/HeroSection';
import ConfiguratorSection from '../components/ConfiguratorSection';
import ProductCatalog from '../components/ProductCatalog';
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';

// Reusable Section Component
const Section = ({
  title,
  subtitle,
  children,
  align = 'center',
  className = '',
}) => (
  <section
    className={`min-h-[60vh] flex flex-col items-center justify-center p-8 relative z-10 ${className}`}
  >
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      className={`glass-card p-12 md:p-16 rounded-[48px] max-w-5xl w-full border border-white/50 shadow-2xl ${align === 'start' ? 'text-start' : 'text-center'}`}
    >
      <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-slate-900 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-blue-700 font-bold mb-8 tracking-wide">
          {subtitle}
        </p>
      )}
      <div className="text-slate-600 text-lg md:text-xl leading-relaxed">
        {children}
      </div>
    </motion.div>
  </section>
);

export default function Home() {
  const { t } = useLang();

  return (
    <div className="flex flex-col gap-10">
      <HeroSection />

      {/* 1. About Us - The Creative Unit */}
      <Section
        title={t('about.title')}
        subtitle={t('about.subtitle')}
        align="start"
      >
        <div className="space-y-6">
          <p dangerouslySetInnerHTML={{ __html: t('about.desc1') }} />
          <p className="border-s-4 border-yellow-400 ps-6 italic text-slate-500 font-medium">
            {t('about.quote')}
          </p>
          <p>{t('about.desc2')}</p>
        </div>
      </Section>

      {/* 2. 3D Configurator - Design Focus */}
      <ConfiguratorSection />

      {/* 3. Product Catalog - The Quote Builder */}
      <ProductCatalog />

      {/* 4. Services - Why Us? */}
      <Section title={t('services.title')} subtitle={t('services.subtitle')}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-8">
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4 font-extrabold">
              01
            </div>
            <h4 className="font-bold text-xl mb-3">{t('services.s1_title')}</h4>
            <p className="text-sm text-slate-500 font-medium">
              {t('services.s1_desc')}
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col items-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-4 font-extrabold">
              02
            </div>
            <h4 className="font-bold text-xl mb-3">{t('services.s2_title')}</h4>
            <p className="text-sm text-slate-500 font-medium">
              {t('services.s2_desc')}
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col items-center">
            <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mb-4 font-extrabold">
              03
            </div>
            <h4 className="font-bold text-xl mb-3">{t('services.s3_title')}</h4>
            <p className="text-sm text-slate-500 font-medium">
              {t('services.s3_desc')}
            </p>
          </div>
        </div>
      </Section>

      {/* 5. Portfolio - Success Partners */}
      <Section
        id="portfolio"
        title={t('nav.portfolio')}
        subtitle="SUCCESS PARTNERS"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mt-4">
          {[
            'Glaze',
            'Black Rose',
            'First Exit',
            'Repose',
            "Joe's Cafe",
            'Phi Boutique',
            'Veloce',
          ].map(client => (
            <motion.div
              key={client}
              whileHover={{ y: -5, scale: 1.05 }}
              className="p-6 md:p-10 flex items-center justify-center font-extrabold text-slate-300 bg-white/40 border border-white/50 rounded-[32px] shadow-sm hover:shadow-lg hover:text-blue-600 hover:border-blue-200 transition-all cursor-default"
            >
              {client}
            </motion.div>
          ))}
          <div className="p-6 md:p-10 flex items-center justify-center font-bold text-blue-600 bg-blue-50/50 border border-blue-100 rounded-[32px] italic">
            ...
          </div>
        </div>
      </Section>

      <div className="h-[10vh]" />
    </div>
  );
}
