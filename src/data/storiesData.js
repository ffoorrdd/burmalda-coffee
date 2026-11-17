/**
 * СТОРИС-НОВОСТИ (TELEGRAM / WHATSAPP STYLE)
 * СТРОГО БЕЗ ЭМОДЗИ
 * Аватар: фирменный розово-бело-синий логотип logo_burmalda.png
 */

export const STORIES_DATA = [
  {
    id: 'story-1',
    title: 'Новость 1',
    author: 'БУРМАЛДА КОФЕ',
    avatar: 'assets/branding/logo_burmalda.png',
    date: '2026-11-17T15:00:00Z',
    displayDate: '15 минут назад',
    isNew: true,
    slides: [
      {
        id: 's1-1',
        mediaType: 'image',
        mediaUrl: 'assets/banners/banner_main.jpg',
        title: 'Новость 1: Новый спешелти спот на Дону',
        caption: 'Мы открыли новую локацию с панорамным видом на реку Дон. Свежая обжарка, зерно Specialty 86+ Q-грейдинга и авторская подача.',
        duration: 5000
      },
      {
        id: 's1-2',
        mediaType: 'image',
        mediaUrl: 'assets/banners/banner_channel.jpg',
        title: 'Комьюнити Бурмалды',
        caption: 'Подписывайтесь на наш официальный Telegram @burmalda_coffee, чтобы первыми получать секретные промокоды на бесплатный кофе.',
        duration: 5000
      }
    ]
  },
  {
    id: 'story-2',
    title: 'Новость 2',
    author: 'Шеф-Бариста',
    avatar: 'assets/branding/logo_burmalda.png',
    date: '2026-11-17T12:30:00Z',
    displayDate: '3 часа назад',
    isNew: true,
    slides: [
      {
        id: 's2-1',
        mediaType: 'image',
        mediaUrl: 'assets/banners/banner_menu.jpg',
        title: 'Новость 2: Секретный дроп Вайперр',
        caption: 'Линейка ледяных напитков Бамбл Липстик и Айс Какао Вайперр уже доступна в меню. 500 мл чистого вкуса и энергии.',
        duration: 5000
      }
    ]
  },
  {
    id: 'story-3',
    title: 'Новость 3',
    author: 'Зона Азарта',
    avatar: 'assets/branding/logo_burmalda.png',
    date: '2026-11-16T18:00:00Z',
    displayDate: 'Вчера',
    isNew: true,
    slides: [
      {
        id: 's3-1',
        mediaType: 'image',
        mediaUrl: 'assets/banners/banner_fortune.jpg',
        title: 'Новость 3: Испытай удачу за тикеты',
        caption: 'За каждую покупку кофе и ввод промокодов вы получаете билеты. Крутите Колесо Фортуны, выбивайте Слоты и открывайте Mystery Box со скидками до 50%.',
        duration: 5000
      }
    ]
  }
];
