/**
 * ДАННЫЕ МЕНЮ «БУРМАЛДА КОФЕ» (РОСТОВ-НА-ДОНУ)
 * СТРОГО БЕЗ ЭМОДЗИ: только чистый текст и типографика
 */

export const MENU_CATEGORIES = [
  { id: 'all', title: 'Все напитки' },
  { id: 'burmalda', title: 'Бурмалда Меню' },
  { id: 'viperr', title: 'Вайперр Меню' },
  { id: 'tea', title: 'Баба-Чай Меню' }
];

export const MENU_ITEMS = [
  // --- БУРМАЛДА МЕНЮ ---
  {
    id: 'b-latte',
    category: 'burmalda',
    name: 'Латте «Бурмалда»',
    price: 350,
    volume: '500 мл',
    description: 'Фирменный шелковистый латте на зерне собственной обжарки с карамельно-сливочным профилем и нотками ореха пекан.',
    image: 'assets/menu/menu_burmalda.jpg',
    badge: 'Хит сезона'
  },
  {
    id: 'b-cappuccino',
    category: 'burmalda',
    name: 'Капучино «Баба-кофе»',
    price: 320,
    volume: '500 мл',
    description: 'Плотная глянцевая овсяно-молочная пена с глубоким двойным шот-эспрессо. Настоящий ростовский характер.',
    image: 'assets/menu/menu_burmalda.jpg',
    badge: 'Классика'
  },
  {
    id: 'b-raf-popcorn',
    category: 'burmalda',
    name: 'Раф «Попкорн»',
    price: 320,
    volume: '500 мл',
    description: 'Нежный сливочный раф с карамелизированным попкорном, морской солью и ароматом кинотеатра.',
    image: 'assets/menu/menu_burmalda.jpg',
    badge: 'Сливочный'
  },
  {
    id: 'b-raf-kotost',
    category: 'burmalda',
    name: 'Раф «Котость»',
    price: 320,
    volume: '500 мл',
    description: 'Теплый, мягкий и пушистый напиток на сливках с добавлением белого шоколада и маршмеллоу.',
    image: 'assets/menu/menu_burmalda.jpg',
    badge: 'Десертный'
  },
  {
    id: 'b-raf-hamam',
    category: 'burmalda',
    name: 'Раф «Хамам»',
    price: 320,
    volume: '500 мл',
    description: 'Пряный согревающий раф с кардамоном, корицей и лепестками дамасской розы. Защита от донского ветра.',
    image: 'assets/menu/menu_burmalda.jpg',
    badge: 'Пряный'
  },
  {
    id: 'b-latte-bam',
    category: 'burmalda',
    name: 'Латте «Бэм-бэм-бэм»',
    price: 320,
    volume: '500 мл',
    description: 'Взрывной заряд бодрости: тройной эспрессо, тростниковый сахар мусковадо и густая молочная пена.',
    image: 'assets/menu/menu_burmalda.jpg',
    badge: 'Энергия'
  },
  {
    id: 'b-matcha-bird',
    category: 'burmalda',
    name: 'Матча «Мама Птица»',
    price: 320,
    volume: '500 мл',
    description: 'Церемониальная зеленая матча из Удзи на кокосовом молоке с тонким жасминовым послевкусием.',
    image: 'assets/menu/menu_burmalda.jpg',
    badge: 'Матча'
  },
  {
    id: 'b-blue-matcha',
    category: 'burmalda',
    name: 'Синяя Матча «Тёмный друн»',
    price: 320,
    volume: '500 мл',
    description: 'Неоново-синий настой анчана со взбитым ванильным молоком. Стильный визуальный градиент.',
    image: 'assets/menu/menu_burmalda.jpg',
    badge: 'Фирменный'
  },
  {
    id: 'b-cacao',
    category: 'burmalda',
    name: 'Какао «Омайгад»',
    price: 320,
    volume: '500 мл',
    description: 'Густой бельгийский шоколад с кремовой текстурой, взбитыми сливками и шоколадным крамблом.',
    image: 'assets/menu/menu_burmalda.jpg',
    badge: 'Шоколад'
  },

  // --- ВАЙПЕРР МЕНЮ ---
  {
    id: 'v-bumble',
    category: 'viperr',
    name: 'Бамбл «Липстик»',
    price: 320,
    volume: '500 мл',
    description: 'Освежающий фреш апельсина, холодный карамельный сироп и плотный слой эспрессо. Идеально для ростовской жары.',
    image: 'assets/menu/menu_viperr.jpg',
    badge: 'Холодный'
  },
  {
    id: 'v-ice-cacao',
    category: 'viperr',
    name: 'Айс Какао «Вайперр»',
    price: 320,
    volume: '500 мл',
    description: 'Ледяной какао на миндальном молоке с шариком шоколадного крафтового пломбира и дроблеными какао-бобами.',
    image: 'assets/menu/menu_viperr.jpg',
    badge: 'Колд Дроп'
  },
  {
    id: 'v-lemonade',
    category: 'viperr',
    name: 'Лимонад «Альтушка»',
    price: 320,
    volume: '500 мл',
    description: 'Игристый крафтовый лимонад из розового грейпфрута, сиропа личи, гибискуса и веточки розмарина.',
    image: 'assets/menu/menu_viperr.jpg',
    badge: 'Фреш'
  },
  {
    id: 'v-glintwein',
    category: 'viperr',
    name: 'Глинтвейн б/а «Вайперрша»',
    price: 320,
    volume: '500 мл',
    description: 'Вишнево-гранатовый безалкогольный сбор на открытом огне с бадьяном, гвоздикой и цитрусовыми чипсами.',
    image: 'assets/menu/menu_viperr.jpg',
    badge: 'Согревающий'
  },

  // --- БАБА-ЧАЙ МЕНЮ ---
  {
    id: 't-kiwi',
    category: 'tea',
    name: 'Чай «Одно киви»',
    price: 300,
    volume: '500 мл',
    description: 'Крупнолистовой зеленый чай с сочной мякотью спелого киви, соком лайма и листиками мяты.',
    image: 'assets/menu/menu_tea.jpg',
    badge: 'Фруктовый'
  },
  {
    id: 't-currant',
    category: 'tea',
    name: 'Чай «Одна смородина»',
    price: 300,
    volume: '500 мл',
    description: 'Черная донская смородина с терпким черным чаем ассам и веточкой чабреца.',
    image: 'assets/menu/menu_tea.jpg',
    badge: 'Витаминный'
  },
  {
    id: 't-raspberry',
    category: 'tea',
    name: 'Чай «Одна малина»',
    price: 300,
    volume: '500 мл',
    description: 'Свежая протертая малина с натуральным медом, имбирем и гибискусом.',
    image: 'assets/menu/menu_tea.jpg',
    badge: 'Ягодный'
  },
  {
    id: 't-orange',
    category: 'tea',
    name: 'Чай «Один апельсин»',
    price: 300,
    volume: '500 мл',
    description: 'Согревающий цитрусовый сбор с палочкой цейлонской корицы и бадьяном.',
    image: 'assets/menu/menu_tea.jpg',
    badge: 'Цитрус'
  },
  {
    id: 't-pear',
    category: 'tea',
    name: 'Чай «Одна груша»',
    price: 300,
    volume: '500 мл',
    description: 'Сладкая печеная груша с ванилью, зеленым улуном и каплей кленового сиропа.',
    image: 'assets/menu/menu_tea.jpg',
    badge: 'Десертный'
  }
];
