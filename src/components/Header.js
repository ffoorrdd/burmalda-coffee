/**
 * HEADER COMPONENT
 * Логотип logo_burmalda.png, баланс тикетов, навигация
 * СТРОГО БЕЗ ЭМОДЗИ: только чистый CSS и векторные инлайн-SVG
 */
import { store } from '../utils/storage.js';

export function renderHeader(container, { onOpenGames, onOpenProfile, onOpenAuth }) {
  function update() {
    const user = store.getUser();
    const tokens = store.getTokens();

    container.innerHTML = `
      <header class="site-header">
        <div class="header-container">
          <a href="#" class="brand-badge pressable" aria-label="Бурмалда Кофе Главная">
            <div class="brand-logo-wrap">
              <img src="assets/branding/logo_burmalda.png" alt="Бурмалда" class="brand-logo-img" width="46" height="46" />
            </div>
            <div>
              <div class="brand-title">БУРМАЛДА</div>
              <span class="brand-subtitle">Specialty Coffee • Rostov</span>
            </div>
          </a>

          <div class="header-actions">
            <!-- Интерактивный баланс тикетов -->
            <button class="ticket-pill pressable" id="header-ticket-btn" aria-label="Баланс тикетов: ${tokens}">
              <svg class="ticket-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
                <path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/>
              </svg>
              <span>${tokens} <small style="font-size:0.75em;opacity:0.85;text-transform:uppercase;">Тикетов</small></span>
            </button>

            <!-- Кнопка профиля или регистрации -->
            ${
              user.isAuthenticated
                ? `<button class="btn-secondary pressable" id="header-profile-btn" aria-label="Открыть профиль пользователя">
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                       <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                       <circle cx="12" cy="7" r="4"/>
                     </svg>
                     <span>${user.first_name || 'Профиль'}</span>
                   </button>`
                : `<button class="btn-primary pressable" id="header-login-btn">
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                       <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                       <polyline points="10 17 15 12 10 7"/>
                       <line x1="15" y1="12" x2="3" y2="12"/>
                     </svg>
                     <span>Регистрация</span>
                   </button>`
            }
          </div>
        </div>
      </header>
    `;

    const ticketBtn = container.querySelector('#header-ticket-btn');
    if (ticketBtn) ticketBtn.addEventListener('click', onOpenGames);

    const profileBtn = container.querySelector('#header-profile-btn');
    if (profileBtn) profileBtn.addEventListener('click', onOpenProfile);

    const loginBtn = container.querySelector('#header-login-btn');
    if (loginBtn) loginBtn.addEventListener('click', onOpenAuth);
  }

  update();
  store.subscribe(update);
}
