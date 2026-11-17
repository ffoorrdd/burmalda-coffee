/**
 * REGISTRATION & AUTH MODAL COMPONENT
 * Центральная система регистрации в клубе Бурмалда Кофе
 * 152-ФЗ Согласие, Никнейм Telegram, Имя, Телефон для Т-Кассы
 * и мгновенный выпуск персональной 3D-карты с начислением 3 стартовых билетов
 * СТРОГО БЕЗ ЭМОДЗИ
 */
import { store } from '../utils/storage.js';
import { sounds } from '../utils/sound.js';

export function renderAuthModal(container, { onShowToast }) {
  let isRegisterMode = true;

  function render() {
    container.innerHTML = `
      <div class="modal-backdrop" id="auth-modal-backdrop" role="dialog" aria-modal="true" aria-label="Регистрация в клубе">
        <div class="modal-dialog" style="max-width: 480px; padding: 28px;">
          
          <div class="modal-header" style="margin-bottom: 16px;">
            <div>
              <h2 class="modal-title" style="color: var(--color-pink);">${isRegisterMode ? 'Выпуск Карты Гостя' : 'Вход в Клуб'}</h2>
              <span style="font-size: 0.78rem; color: var(--color-blue-bright); font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">
                БУРМАЛДА СПЕШЕЛТИ • РОСТОВ
              </span>
            </div>
            <button class="modal-close-btn pressable" id="auth-close-btn" aria-label="Закрыть окно"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
          </div>

          <!-- МИНИ-ПРЕВЬЮ КАРТЫ ЛОЯЛЬНОСТИ В РЕАЛЬНОМ ВРЕМЕНИ -->
          ${isRegisterMode ? `
            <div style="position: relative; width: 100%; aspect-ratio: 1024 / 571; border-radius: 12px; overflow: hidden; margin-bottom: 20px; box-shadow: 0 8px 24px rgba(0,0,0,0.5); border: 1px solid var(--border-pink);">
              <img src="assets/banners/banner_card_template.jpg" alt="" style="width: 100%; height: 100%; object-fit: cover;" />
              <div id="live-card-preview-name" style="position: absolute; left: 50.3%; top: 27.1%; transform: translate(-50%, -50%); font-weight: 800; font-size: 13px; color: var(--color-blue); text-align: center; white-space: nowrap;">
                @username
              </div>
              <div id="live-card-preview-id" style="position: absolute; left: 53.2%; top: 41.2%; transform: translate(-50%, -50%); font-weight: 800; font-size: 11px; font-family: monospace; color: var(--color-blue); text-align: center; white-space: nowrap;">
                #NEW
              </div>
            </div>
          ` : ''}

          <form id="auth-form">
            ${isRegisterMode ? `
              <div class="form-group">
                <label class="form-label" for="reg-first-name">Ваше имя:</label>
                <input type="text" id="reg-first-name" class="form-input" placeholder="Никита…" required />
              </div>
            ` : ''}

            <div class="form-group">
              <label class="form-label" for="reg-username">Никнейм в Telegram:</label>
              <input type="text" id="reg-username" class="form-input" placeholder="@burmalda_fan…" required spellcheck="false" />
            </div>

            <div class="form-group">
              <label class="form-label" for="reg-phone">Номер телефона:</label>
              <input type="tel" id="reg-phone" class="form-input" placeholder="+7 (999) 000-00-00…" required />
            </div>

            ${isRegisterMode ? `
              <div style="margin: 16px 0 20px 0; display: flex; align-items: flex-start; gap: 10px;">
                <input type="checkbox" id="reg-policy-agree" required style="margin-top: 4px; accent-color: var(--color-pink); cursor: pointer;" />
                <label for="reg-policy-agree" style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.45; cursor: pointer;">
                  Я согласен на обработку персональных данных в соответствии с 152-ФЗ РФ и правилами программы лояльности Бурмалда Кофе.
                </label>
              </div>
            ` : ''}

            <button type="submit" class="btn-primary pressable" style="width: 100%; padding: 13px; font-size: 0.95rem;">
              ${isRegisterMode ? 'Выпустить 3D-карту (+3 стартовых тикета)' : 'Войти в личный кабинет'}
            </button>
          </form>

          <div style="text-align: center; margin-top: 18px; font-size: 0.85rem; color: var(--text-secondary);">
            ${isRegisterMode ? 'Уже есть карта гостя?' : 'Впервые в кофейне?'}
            <button id="toggle-auth-mode-btn" style="color: var(--color-pink); font-weight: 700; margin-left: 6px; text-decoration: underline;">
              ${isRegisterMode ? 'Войти' : 'Выпустить карту'}
            </button>
          </div>

        </div>
      </div>
    `;

    const backdrop = container.querySelector('#auth-modal-backdrop');
    const closeBtn = container.querySelector('#auth-close-btn');
    const toggleBtn = container.querySelector('#toggle-auth-mode-btn');
    const form = container.querySelector('#auth-form');

    closeBtn.addEventListener('click', () => backdrop.classList.remove('active'));
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.classList.remove('active');
    });

    // Живой предпросмотр имени на карточке
    const usernameInput = container.querySelector('#reg-username');
    const liveName = container.querySelector('#live-card-preview-name');
    if (usernameInput && liveName) {
      usernameInput.addEventListener('input', () => {
        const val = usernameInput.value.trim();
        liveName.textContent = val ? (val.startsWith('@') ? val : `@${val}`) : '@username';
      });
    }

    toggleBtn.addEventListener('click', () => {
      isRegisterMode = !isRegisterMode;
      sounds.playTick();
      render();
      openModal();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const uInput = container.querySelector('#reg-username');
      const nameInput = container.querySelector('#reg-first-name');

      const cleanUsername = uInput.value.trim().replace(/^@/, '') || 'guest';
      const cleanName = nameInput ? nameInput.value.trim() : cleanUsername;

      if (isRegisterMode) {
        const randomUserId = Math.floor(100000 + Math.random() * 900000);
        store.login({
          user_id: randomUserId,
          username: cleanUsername,
          first_name: cleanName,
          created_at: new Date().toLocaleDateString('ru-RU'),
          coffee_month: 0,
          coffee_total: 0,
          tokens: (store.getTokens() || 0) + 3,
          avatar: 'assets/branding/logo_burmalda.png'
        });
        sounds.playWin();
        onShowToast(`Добро пожаловать в клуб, ${cleanName}! Карта #${randomUserId} активирована. Вам начислено 3 билета.`, 'success');
      } else {
        store.login({
          username: cleanUsername,
          first_name: cleanName
        });
        sounds.playWin();
        onShowToast(`С возвращением в клуб, ${cleanName}!`, 'success');
      }

      backdrop.classList.remove('active');
    });
  }

  function openModal() {
    render();
    const backdrop = container.querySelector('#auth-modal-backdrop');
    if (backdrop) backdrop.classList.add('active');
  }

  render();
  return { open: openModal };
}
