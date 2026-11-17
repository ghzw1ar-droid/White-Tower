/* كل ما يخص الفندق يُعدَّل من هنا فقط / Edit everything about the hotel here */
const HOTEL_CONFIG = {
  wa: '9647709111166',              // 07709111166
  usdRate: 1310,                    // سعر الصرف / IQD per 1 USD
  weekendFactor: 1.25,              // باقة نهاية الأسبوع / VIP
  hero: ['exterior', 'lobby', 'restaurant', 'pool'],
  rooms: [
    { id: 'std', price: 65000,  imgs: ['room-double', 'bath'] },
    { id: 'exe', price: 95000,  imgs: ['twin', 'bath'] },
    { id: 'fam', price: 140000, imgs: ['room-square', 'twin'] },
    { id: 'roy', price: 220000, imgs: ['lobby', 'room-square', 'bath'] }
  ],
  addons: [                         // perNight=true يُضرب بعدد الليالي
    { id: 'pick', price: 25000 }, { id: 'bed', price: 20000, perNight: true },
    { id: 'ban', price: 150000 }, { id: 'spa', price: 40000 }
  ],
  services: [
    { id: 's1', cat: 'stay', ico: '⚡', img: 'exterior' },
    { id: 's2', cat: 'dine', ico: '🍽️', img: 'restaurant' },
    { id: 's3', cat: 'dine', ico: '☕', img: 'restaurant' },
    { id: 's4', cat: 'events', ico: '🏛️', img: 'lobby' },
    { id: 's5', cat: 'well', ico: '🏊', img: 'pool' },
    { id: 's6', cat: 'stay', ico: '🛡️', img: 'lobby' },
    { id: 's7', cat: 'stay', ico: '🧺', img: 'bath' },
    { id: 's8', cat: 'well', ico: '🏋️', img: 'gym' }
  ],
  i18n: {
    ar: {
      hotel: 'فندق البرج الأبيض', dir: 'ar-IQ', iqd: 'د.ع', usd: '$',
      home: 'الرئيسية', rooms: 'الغرف', services: 'الخدمات', book: 'احجز الآن', contact: 'تواصل',
      heroT: 'ضيافة عراقية بروح ملكية', heroP: 'إقامة فاخرة، كهرباء وإنترنت دون انقطاع، وخدمة تليق بضيوفنا على مدار الساعة.',
      heroB: 'احجز إقامتك', cin: 'تاريخ الوصول', cout: 'تاريخ المغادرة', guests: 'الضيوف', check: 'تحقق من الأسعار',
      roomsT: 'غرفنا وأجنحتنا', roomsP: 'اختر الإقامة التي تمنحك الطمأنينة',
      night: 'سعر الليلة', week: 'باقة نهاية الأسبوع / VIP', perNight: 'لليلة', gallery: 'الصور',
      std: 'غرفة مفردة ديلوكس', exe: 'غرفة مزدوجة تنفيذية', fam: 'جناح عائلي فاخر', roy: 'الجناح الملكي الخاص',
      stdD: 'سرير مريح، إضاءة دافئة وحمّام حديث.', exeD: 'سريران منفصلان أو مزدوج، مناسبة لرجال الأعمال.',
      famD: 'مساحة رحبة للعائلة مع جلسة مستقلة.', royD: 'أعلى مستويات الفخامة والخصوصية للوفود والضيوف المميزين.',
      servT: 'الخدمات والمرافق', all: 'الكل', stay: 'الإقامة', dine: 'المطاعم', events: 'المناسبات', well: 'العافية',
      s1: 'كهرباء ذاتية 24/7 وإنترنت فايبر', s1d: 'تكييف وتدفئة دون انقطاع واتصال بمستوى الأعمال.',
      s2: 'مطعم عراقي وعالمي', s2d: 'مشاوي ومسگوف وأطباق قارية وبوفيه إفطار مفتوح مع خدمة الغرف 24/7.',
      s3: 'كافيه وتراس بانورامي', s3d: 'قهوة مختصة وشاي عراقي وحلويات بإطلالة مسائية.',
      s4: 'قاعات المؤتمرات والأعراس', s4d: 'شاشات 4K ونظام صوت وضيافة VIP للمناسبات والاجتماعات الرسمية.',
      s5: 'المسبح الداخلي والحمّام التركي', s5d: 'مسبح مدفأ وساونا وبخار بمواعيد مخصصة.',
      s6: 'حراسة 24/7 وكراج ومرافقة المطار', s6d: 'راحة بال للعوائل والوفود ورجال الأعمال.',
      s7: 'غسيل سريع واستعلامات سياحية', s7d: 'غسيل وكي سريع وإرشاد سياحي على مدار الساعة.',
      s8: 'نادٍ رياضي حديث', s8d: 'أجهزة كارديو وأوزان حرة في قاعة مضيئة.',
      calcT: 'احسب سعر إقامتك واحجز', room: 'نوع الغرفة', nRooms: 'عدد الغرف', name: 'الاسم', phone: 'رقم الهاتف', notes: 'ملاحظات',
      extras: 'خدمات إضافية', pick: 'استقبال VIP من المطار', bed: 'سرير إضافي', ban: 'تجهيز قاعة خاصة', spa: 'باقة السبا',
      nights: 'عدد الليالي', total: 'الإجمالي', send: 'أرسل الحجز عبر واتساب', needDates: 'اختر تاريخ الوصول والمغادرة أولاً.',
      wTip: 'تحدث مع الاستقبال مباشرة 24/7', rights: 'جميع الحقوق محفوظة', close: 'إغلاق', menu: 'القائمة',
      greet: 'السلام عليكم، أرغب بالحجز في', gName: 'الاسم', gPhone: 'الهاتف', gRoom: 'الغرفة', gIn: 'الوصول', gOut: 'المغادرة',
      gN: 'عدد الليالي', gR: 'عدد الغرف', gG: 'عدد الضيوف', gX: 'خدمات إضافية', gT: 'الإجمالي', gNote: 'ملاحظات', none: 'لا يوجد'
    },
    en: {
      hotel: 'White Tower Hotel', dir: 'en-US', iqd: 'IQD', usd: '$',
      home: 'Home', rooms: 'Rooms', services: 'Services', book: 'Book now', contact: 'Contact',
      heroT: 'Iraqi hospitality, royal in spirit', heroP: 'Luxury stays, uninterrupted power and fiber internet, and service worthy of our guests around the clock.',
      heroB: 'Book your stay', cin: 'Check-in', cout: 'Check-out', guests: 'Guests', check: 'Check prices',
      roomsT: 'Rooms & Suites', roomsP: 'Choose the stay that gives you peace of mind',
      night: 'Nightly rate', week: 'Weekend / VIP package', perNight: 'per night', gallery: 'Photos',
      std: 'Deluxe Single Room', exe: 'Executive Double / Twin Room', fam: 'Junior Family Suite', roy: 'Royal Iraqi Hospitality Suite',
      stdD: 'Comfortable bed, warm lighting and a modern bathroom.', exeD: 'Twin or double beds, made for business travelers.',
      famD: 'Generous space for the family with a separate seating area.', royD: 'The highest level of luxury and privacy for delegations and VIP guests.',
      servT: 'Services & Facilities', all: 'All', stay: 'Stay', dine: 'Dining', events: 'Events', well: 'Wellness',
      s1: '24/7 power & fiber Wi-Fi', s1d: 'Continuous air conditioning and heating with business-grade connectivity.',
      s2: 'Iraqi & international dining', s2d: 'Masgouf and grills, continental dishes, open breakfast buffet and 24/7 in-room dining.',
      s3: 'Cafe & panoramic terrace', s3d: 'Specialty coffee, Iraqi tea and desserts with evening views.',
      s4: 'Conference & banquet halls', s4d: '4K screens, sound systems and VIP catering for events and formal meetings.',
      s5: 'Indoor pool & Turkish hammam', s5d: 'Heated pool, sauna and steam room with scheduled hours.',
      s6: '24/7 security, valet & airport chauffeur', s6d: 'Peace of mind for families, delegations and businessmen.',
      s7: 'Express laundry & tour concierge', s7d: 'Quick laundry, dry cleaning and local guidance around the clock.',
      s8: 'Modern fitness center', s8d: 'Cardio machines and free weights in a bright hall.',
      calcT: 'Calculate your stay and book', room: 'Room type', nRooms: 'Rooms', name: 'Name', phone: 'Phone number', notes: 'Notes',
      extras: 'Extra services', pick: 'VIP airport pickup', bed: 'Extra bed', ban: 'Private banquet setup', spa: 'Spa package',
      nights: 'Nights', total: 'Total', send: 'Send booking via WhatsApp', needDates: 'Pick check-in and check-out dates first.',
      wTip: 'Chat with Reception 24/7', rights: 'All rights reserved', close: 'Close', menu: 'Menu',
      greet: 'Hello, I would like to book at', gName: 'Name', gPhone: 'Phone', gRoom: 'Room', gIn: 'Check-in', gOut: 'Check-out',
      gN: 'Nights', gR: 'Rooms', gG: 'Guests', gX: 'Extras', gT: 'Total', gNote: 'Notes', none: 'None'
    }
  }
};
