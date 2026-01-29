import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
    ar: {
        hero: {
            tag: "شريكك الاستراتيجي في قطاع الضيافة",
            title: "هويتك..",
            subtitle: "علينا تفصيلها، وعليك تميزها",
            desc: "من الفكرة لين توصل بابك. حنا 'خوان باك'.. ذراعك اليمين في التغليف. جودة تبيّض الوجه، وتصميم يخلي منتجك.. سالفة الموسم.",
            cta_primary: "طب وتخيّر",
            cta_secondary: "تواصل معنا"
        },
        nav: {
            home: "الرئيسية",
            catalog: "منتجاتنا",
            portfolio: "شركاء النجاح",
            book: "تواصل معنا"
        },
        floating_cart: "عرض مسودة التسعير",
        about: {
            title: "حنا.. أكثر من مجرد مصنع",
            subtitle: "ترانا مبدعين",
            desc1: "في <span className=\"text-blue-700 font-extrabold\">خوان باك</span>، القضية مو بس كوب وعلبة. حنا ذراعك الإبداعي اللي يفهم سوقك ويضبطك. نجمع بين فن التصميم وقوة التصنيع عشان نطلع بنتيجة.. باختصار: <span className=\"font-extrabold\">تجمّل!</span>",
            quote: "\"ودك بمنتج يبيض الوجه قدام ضيوفك؟.. وصلت خير.\"",
            desc2: "نهتم بأدق التفاصيل: ملمس الكوب، وضوح الألوان، وحتى جودة الغطاء. لأننا نعرف إن التغليف هو \"سفيرك الصامت\" عند العميل."
        },
        configurator: {
            title: "عندك تصميم؟.. ورنا إبداعك!",
            desc: "الكوب سويناه، وخامتنا \"على الشدّ\".. باقي لمستك! ارفع شعارك وشفه يحاكي الواقع قبل لا نعتمد.",
            cup_type: "نوع الكوب",
            paper: "ورقي نخب أول",
            plastic: "بلاستيك فاخر",
            upload_label: "ارفع الشعار",
            upload_btn: "اختر ملف الشعار",
            hint: "حرك الموديل، زوم، وشوف أدق التفاصيل",
            preview_label: "معاينة تفاعلية"
        },
        services: {
            title: "خدماتنا.. مفصلة عليك",
            subtitle: "OUR SERVICES",
            s1_title: "هويتك.. لعبتنا",
            s1_desc: "عندك فكرة؟ حنا نحولها لواقع ملموس. فريقنا الإبداعي يضبطك بتصاميم (Nfaslha Tafseel) تميّزك بالسوق.",
            s2_title: "طباعة تبيّض الوجه",
            s2_desc: "نستخدم أحدث تقنيات الطباعة اللي تطلع ألوانك زي ما هي بالشاشة.. وأحلى.",
            s3_title: "مستعجل؟.. جاهزين",
            s3_desc: "لأصحاب المشاريع الناشئة والمستعجلين.. عندنا تشكيلة جاهزة فاخرة (بدون طباعة) تفك أزمة."
        },
        catalog: {
            title: "منتجاتنا.. اللي تجمّل",
            subtitle: "شيك على المنتجات المتوفرة عندنا",
            size_label: "المقاس / الحجم",
            qty_label: "الكمية المطلوبة",
            add_btn: "إضافة لطلب التسعير",
            added_btn: "تمت الإضافة للمسودة"
        },
        review: {
            success_title: "وصل طلبك.. وازهل الباقي!",
            success_desc: "فريقنا في <span className=\"text-blue-700 font-extrabold\">خوان باك</span> استلم المسودة. بنجهز لك عرض سعر يطيب خاطرك، ونتواصل معك خلال ٢٤ ساعة.",
            back_home: "العودة للرئيسية",
            contact_title: "بيانات التواصل",
            name_label: "الاسم الكريم",
            name_placeholder: "لانك غالي.. ودنا نعرفك باسمك",
            business_label: "وش اسم مشروعك؟",
            business_placeholder: "اسم البرند",
            phone_label: "رقم جوالك (للتواصل)",
            email_label: "البريد الإلكتروني",
            submit_btn: "اعتمد الطلب.. وهات التسعيرة",
            cart_title: "سلة التسعير",
            clear_cart: "مسح السلة",
            empty_cart: "السلة فاضية.. ودنا نخدمك، اختر منتجاتك",
            size_prefix: "المقاس: ",
            note: "* ملاحظة: السعر النهائي يعتمد على حجم الطلب، عدد ألوان الطباعة، ومعايرة أختام التصميم. مندوبنا بيتواصل معك لتأكيد كل التفاصيل."
        },
        footer: {
            desc: "وحدة إبداعية متكاملة لحلول التغليف والهوية البصرية. نحول فكرتك إلى واقع ملموس بجودة تليق بعلامتك التجارية.",
            links_title: "روابط سريعة",
            about: "من نحن",
            guide: "الدليل الشامل",
            faq: "الأسئلة الشائعة",
            contact: "تواصل معنا",
            location: "الرياض، المملكة العربية السعودية",
            rights: "جميع الحقوق محفوظة."
        }
    },
    en: {
        hero: {
            tag: "YOUR STRATEGIC HOSPITALITY PARTNER",
            title: "Your Identity..",
            subtitle: "We Craft It, You Define It.",
            desc: "From concept to doorstep. We are 'Khwan Pack'.. your right hand in packaging. Quality that honors your brand, and design that makes your product.. the talk of the town.",
            cta_primary: "Explore Collection",
            cta_secondary: "Get in Touch"
        },
        nav: {
            home: "Home",
            catalog: "Products",
            portfolio: "Success Partners",
            book: "Contact Us"
        },
        floating_cart: "View Quote Draft",
        about: {
            title: "We Are.. More Than Just A Factory",
            subtitle: "THE CREATIVE UNIT",
            desc1: "At <span className=\"text-blue-700 font-extrabold\">Khwan Pack</span>, it's not just about a cup or a box. We are your creative arm that understands your market. We blend design art with manufacturing power to deliver a result that is simply.. <span className=\"font-extrabold\">Impeccable!</span>",
            quote: "\"Want a product that stands out to your guests?.. You've arrived.\"",
            desc2: "We obsess over details: cup texture, color vividness, even lid quality. Because we know packaging is your \"Silent Ambassador\" to the customer."
        },
        configurator: {
            title: "Got a Design?.. Show Us!",
            desc: "The cup is ready, material is top-notch.. missing your touch! Upload your logo and visualize it in reality before we proceed.",
            cup_type: "Cup Type",
            paper: "Premium Paper",
            plastic: "Luxury Plastic",
            upload_label: "Upload Logo",
            upload_btn: "Choose Logo File",
            hint: "Rotate model, zoom, and see every detail",
            preview_label: "Interactive Preview"
        },
        services: {
            title: "Services.. Tailored For You",
            subtitle: "OUR SERVICES",
            s1_title: "Your Identity.. Our Playground",
            s1_desc: "Have an idea? We turn it into tangible reality. Our creative team sets you up with designs (Nfaslha Tafseel) that distinguish you in the market.",
            s2_title: "Printing That Pops",
            s2_desc: "We use the latest printing tech that outputs your colors exactly as seen on screen.. and better.",
            s3_title: "In a Rush?.. We're Ready",
            s3_desc: "For startups and those in a hurry.. we have a luxury ready-made collection (unprinted) to save the day."
        },
        catalog: {
            title: "Our Collection.. That Inspires",
            subtitle: "THE QUOTE BUILDER",
            size_label: "Size / Volume",
            qty_label: "Requested Quantity",
            add_btn: "Add to Quote Request",
            added_btn: "Added to Draft"
        },
        review: {
            success_title: "Request Received.. We've Got You!",
            success_desc: "Our team at <span className=\"text-blue-700 font-extrabold\">Khwan Pack</span> has received your draft. We'll prepare a quote that fits your needs and reach out within 24 hours.",
            back_home: "Back to Home",
            contact_title: "Contact Details",
            name_label: "Full Name",
            name_placeholder: "Help us get to know you",
            business_label: "Your Business Name",
            business_placeholder: "Brand Name",
            phone_label: "Phone Number (WhatsApp)",
            email_label: "Email Address",
            submit_btn: "Confirm Request & Get Quote",
            cart_title: "Quote Cart",
            clear_cart: "Clear Cart",
            empty_cart: "Your cart is empty.. let us serve you, pick your products",
            size_prefix: "Size: ",
            note: "* Note: Final pricing depends on order volume, number of printing colors, and design stamp calibration. Our representative will contact you to confirm all details."
        },
        footer: {
            desc: "A creative unit for packaging and visual identity. We turn your ideas into reality with quality that honors your brand.",
            links_title: "Quick Links",
            about: "About Us",
            guide: "Full Guide",
            faq: "FAQs",
            contact: "Contact Us",
            location: "Riyadh, Saudi Arabia",
            rights: "All rights reserved."
        }
    }
};

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState('ar');

    const toggleLang = () => setLang(prev => prev === 'ar' ? 'en' : 'ar');

    const t = (path) => {
        const keys = path.split('.');
        let result = translations[lang];
        for (const key of keys) {
            result = result[key];
        }
        return result;
    };

    React.useEffect(() => {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.title = lang === 'ar'
            ? 'خوان باك | وحدة إبداعية لقطاع الضيافة'
            : 'Khwan Pack | Strategic Hospitality Packaging';
    }, [lang]);

    return (
        <LanguageContext.Provider value={{ lang, toggleLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLang = () => useContext(LanguageContext);
