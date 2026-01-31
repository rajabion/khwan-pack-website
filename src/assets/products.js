export const PRODUCT_CATEGORIES = [
  { id: 'cups', nameAr: 'أكواب', nameEn: 'Cups' },
  { id: 'boxes', nameAr: 'بوكسات', nameEn: 'Boxes' },
  { id: 'accessories', nameAr: 'كماليات', nameEn: 'Accessories' },
  { id: 'hygiene', nameAr: 'نظافة', nameEn: 'Hygiene' },
];

export const PRODUCTS = [
  // Paper Cups
  {
    id: 'p-single-white',
    category: 'cups',
    name: 'كوب ورقي طبقة واحدة - أبيض',
    nameEn: 'Single Wall Paper Cup - White',
    sizes: ['4oz', '8oz', '12oz', '16oz'],
    image:
      'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=400',
    description: 'كوب ورقي كلاسيكي مناسب للمشروبات الحارة والباردة.',
  },
  {
    id: 'p-double-kraft',
    category: 'cups',
    name: 'كوب ورقي طبقتين - كرافت',
    nameEn: 'Double Wall Paper Cup - Kraft',
    sizes: ['8oz', '12oz'],
    image:
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400',
    description: 'حماية إضافية للحرارة مع مظهر طبيعي أنيق.',
  },
  {
    id: 'p-ripple-black',
    category: 'cups',
    name: 'كوب مموج (Ripple) - أسود',
    nameEn: 'Ripple Cup - Black',
    sizes: ['8oz', '12oz'],
    image:
      'https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?auto=format&fit=crop&q=80&w=400',
    description: 'تصميم مموج يوفر عزل حراري ممتاز وملمس فخم.',
  },
  // Cold Cups
  {
    id: 'c-u-shape',
    category: 'cups',
    name: 'كوب بلاستيك U-Shape',
    nameEn: 'Plastic U-Shape Cold Cup',
    sizes: ['12oz', '16oz', '22oz'],
    image:
      'https://images.unsplash.com/photo-1544203415-3855a8f62776?auto=format&fit=crop&q=80&w=400',
    description: 'مثالي للمشروبات الباردة والآيس كوفي.',
  },
  // Packaging
  {
    id: 'b-kraft-boat',
    category: 'boxes',
    name: 'قوارب كرافت (Kraft Boat)',
    nameEn: 'Kraft Food Boat',
    sizes: ['S', 'M', 'L'],
    image:
      'https://images.unsplash.com/photo-1584283581177-8f553258c49e?auto=format&fit=crop&q=80&w=400',
    description: 'حل عملي لتقديم الوجبات السريعة والسناكس.',
  },
  {
    id: 'b-pizza',
    category: 'boxes',
    name: 'كرتون بيتزا فاخر',
    nameEn: 'Premium Pizza Box',
    sizes: ['9"', '10"', '12"'],
    image:
      'https://images.unsplash.com/photo-1593504049359-74330189a345?auto=format&fit=crop&q=80&w=400',
    description: 'كرتون قوي يحافظ على حرارة البيتزا وقرمشتها.',
  },
  // Accessories
  {
    id: 'a-cutlery-vip',
    category: 'accessories',
    name: 'طقم ملاعق وشوك VIP (أسود)',
    nameEn: 'VIP Cutlery Set (Black)',
    sizes: ['Standard'],
    image:
      'https://images.unsplash.com/photo-1591195853828-11db50a44f51?auto=format&fit=crop&q=80&w=400',
    description: 'إكسسوارات فاخرة تليق بضيافتك.',
  },
  {
    id: 'a-sugar-sticks',
    category: 'accessories',
    name: 'أصابع سكر مغلفة',
    nameEn: 'Wrapped Sugar Sticks',
    sizes: ['5g'],
    image:
      'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&q=80&w=400',
    description: 'سكر بجودة عالية وتغليف أنيق.',
  },
  // Hygiene
  {
    id: 'h-gloves-vinyl',
    category: 'hygiene',
    name: 'قفازات فينيل (Vinyl)',
    nameEn: 'Vinyl Gloves',
    sizes: ['S', 'M', 'L', 'XL'],
    image:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400',
    description: 'حماية وأمان لفريق عملك.',
  },
];
