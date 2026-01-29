import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';

export default function HeroSection() {
    const { t } = useLang();

    return (
        <section className="relative min-h-[75vh] flex flex-col items-center justify-center container mx-auto px-4 py-20 z-10">
            <div className="bg-white/70 backdrop-blur-2xl p-10 md:p-20 rounded-[50px] shadow-2xl border border-white/50 text-center max-w-5xl relative overflow-hidden group">

                {/* Animated background glow inside the card */}
                <div className="absolute -top-20 -end-20 w-64 h-64 bg-blue-400/10 blur-[100px] rounded-full group-hover:bg-blue-400/20 transition-all duration-1000" />
                <div className="absolute -bottom-20 -start-20 w-64 h-64 bg-purple-400/10 blur-[100px] rounded-full group-hover:bg-purple-400/20 transition-all duration-1000" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <span className="inline-block px-6 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold mb-8 border border-blue-100 uppercase tracking-widest shadow-inner">
                        {t('hero.tag')}
                    </span>

                    <h1 className="text-5xl md:text-8xl font-extrabold text-slate-900 leading-[1.1] mb-8">
                        {t('hero.title')} <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-900 to-purple-800">
                            {t('hero.subtitle')}
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                        {t('hero.desc')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="px-12 py-5 bg-slate-900 text-white rounded-[24px] font-extrabold text-lg shadow-2xl hover:bg-slate-800 transition-all hover:scale-105 active:scale-95">
                            {t('hero.cta_primary')}
                        </button>
                        <button className="px-12 py-5 bg-white text-slate-900 border border-slate-200 rounded-[24px] font-extrabold text-lg shadow-sm hover:bg-slate-50 transition-all hover:border-slate-300">
                            {t('hero.cta_secondary')}
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
