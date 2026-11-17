/**
 * MAIN APP CONTROLLER
 * Координация всех компонентов, модальных окон, дизайн-системы и реактивного состояния
 * СТРОГО БЕЗ ЭМОДЗИ
 */
import { renderHeader } from './components/Header.js';
import { renderStories } from './components/Stories.js';
import { renderHeroSection } from './components/HeroSection.js';
import { renderCard3D } from './components/Card3D.js';
import { renderMenuSection } from './components/MenuSection.js';
import { renderGamesTeaserSection } from './components/GamesTeaserSection.js';
import { renderFeedbackSection } from './components/FeedbackSection.js';
import { renderFaqSection } from './components/FaqSection.js';
import { renderFooter } from './components/Footer.js';

// Модальные окна
import { renderProfileModal } from './components/ProfileModal.js';
import { renderGamesModal } from './components/GamesModal.js';
import { renderAuthModal } from './components/AuthModal.js';
import { renderDrinkModal } from './components/DrinkModal.js';

// Система всплывающих уведомлений (Toasts) на чистых инлайн-SVG
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');

  const iconSvg = type === 'success'
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-pink)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
    : type === 'error'
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-pink)" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-blue-bright)" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;

  toast.innerHTML = `
    <span style="display: flex; align-items: center;">${iconSvg}</span>
    <span style="flex: 1;">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Инициализация веб-приложения
document.addEventListener('DOMContentLoaded', () => {
  // Контейнеры модальных окон
  const profileModalContainer = document.getElementById('profile-modal-mount');
  const gamesModalContainer = document.getElementById('games-modal-mount');
  const authModalContainer = document.getElementById('auth-modal-mount');
  const drinkModalContainer = document.getElementById('drink-modal-mount');

  // Инициализация модалок
  const profileModal = renderProfileModal(profileModalContainer, { onShowToast: showToast });
  const gamesModal = renderGamesModal(gamesModalContainer, { onShowToast: showToast });
  const authModal = renderAuthModal(authModalContainer, { onShowToast: showToast });
  const drinkModal = renderDrinkModal(drinkModalContainer);

  // 1. Шапка
  renderHeader(document.getElementById('header-mount'), {
    onOpenGames: () => gamesModal.open(),
    onOpenProfile: () => profileModal.open(),
    onOpenAuth: () => authModal.open()
  });

  // 2. Сторис-новости (Telegram / WhatsApp стиль)
  renderStories(document.getElementById('stories-mount'));

  // 3. Главный баннер
  renderHeroSection(document.getElementById('hero-mount'), {
    onOpenGames: () => gamesModal.open(),
    onOpenLoyalty: () => {
      const el = document.querySelector('.loyalty-hero-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // 4. 3D-Карта лояльности и прогресс 6-й чашки
  renderCard3D(document.getElementById('card3d-mount'), {
    onShowToast: showToast
  });

  // 5. Адаптивное меню кофейни с умным расширением фона
  renderMenuSection(document.getElementById('menu-mount'), {
    onSelectDrink: (drink) => drinkModal.open(drink)
  });

  // 6. Витрина зоны азарта и игр
  renderGamesTeaserSection(document.getElementById('games-teaser-mount'), {
    onOpenGamesWithTab: (tab) => {
      gamesModal.open(tab);
    }
  });

  // 7. «Предложить идею» (строго для авторизованных)
  renderFeedbackSection(document.getElementById('feedback-mount'), {
    onOpenAuth: () => authModal.open(),
    onShowToast: showToast
  });

  // 8. FAQ-аккордеон
  renderFaqSection(document.getElementById('faq-mount'));

  // 9. Футер
  renderFooter(document.getElementById('footer-mount'));
});
