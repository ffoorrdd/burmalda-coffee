/**
 * USER PROFILE MODAL & INVENTORY COMPONENT
 * Профиль на основе структуры из бота (ID, статус, статистика чашек, баланс тикетов)
 * Ввод промокодов (фри10, фри1, фри20) и CSS-купоны
 * СТРОГО БЕЗ ЭМОДЗИ
 */
import { store } from '../utils/storage.js';
import { sounds } from '../utils/sound.js';

export function renderProfileModal(container, { onShowToast }) {
  function render() {
    const user = store.getUser();
    const status = store.getLoyaltyStatus();
    const coupons = store.getCoupons();
    const tokens = store.getTokens();

    container.innerHTML = `
      <div class="modal-backdrop" id="profile-modal-backdrop" role="dialog" aria-modal="true" aria-label="Личный кабинет гостя">
        <div class="modal-dialog" style="max-width: 580px;">
          <div class="modal-header">
            <div>
              <h2 class="modal-title" style="color: var(--color-pink);">Кофейный Профиль</h2>
              <span style="font-size: 0.8rem; color: var(--color-blue-bright); font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">БУРМАЛДА СПЕШЕЛТИ КЛУБ</span>
            </div>
            <button class="modal-close-btn pressable" id="profile-close-btn" aria-label="Закрыть профиль"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
          </div>

          <!-- СВОДКА ПОЛЬЗОВАТЕЛЯ -->
          <div style="background: #fff0f6; padding: 22px; border-radius: var(--radius-lg); border: 1.5px solid var(--border-subtle); margin-bottom: 24px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
              <div>
                <div style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary);">${user.first_name} <span style="font-size: 0.85em; color: var(--text-muted); font-weight: 400;">(@${user.username})</span></div>
                <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">В клубе с ${user.created_at} • ID: #${user.user_id}</div>
              </div>
              <div style="text-align: right;">
                <span class="badge" style="background: #ffffff; color: var(--color-pink-deep); padding: 5px 12px; border-radius: 99px; font-weight: 800; font-size: 0.82rem; border: 1px solid var(--border-pink);">
                  ${status.title}
                </span>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; border-top: 1px solid var(--border-subtle); padding-top: 14px;">
              <div>
                <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Билеты</div>
                <div style="font-size: 1.35rem; font-weight: 900; color: var(--color-pink-deep);">${tokens} шт.</div>
              </div>
              <div>
                <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">За месяц</div>
                <div style="font-size: 1.35rem; font-weight: 900; color: var(--text-primary);">${user.coffee_month || 0} шт.</div>
              </div>
              <div>
                <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Скидка</div>
                <div style="font-size: 1.35rem; font-weight: 900; color: var(--color-blue);">${status.discount}%</div>
              </div>
            </div>
          </div>

          <!-- ВВОД ПРОМОКОДА -->
          <div style="margin-bottom: 28px;">
            <label class="form-label" for="promo-input">Промокод:</label>
            <div style="display: flex; gap: 10px;">
              <input type="text" id="promo-input" class="form-input" placeholder="Введите промокод…" autocomplete="off" spellcheck="false" />
              <button class="btn-primary pressable" id="promo-apply-btn" style="flex-shrink: 0; padding: 0 20px;">
                Применить
              </button>
            </div>
          </div>

          <!-- ИНВЕНТАРЬ КУПОНОВ (CSS TICKET) -->
          <div>
            <h3 style="font-size: 1.1rem; font-weight: 800; margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between;">
              <span>Ваши активные купоны и скидки</span>
              <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 400;">${coupons.length} шт.</span>
            </h3>

            <div id="coupons-list" style="max-height: 240px; overflow-y: auto; padding-right: 4px;">
              ${coupons.length === 0 ? `
                <div style="text-align: center; padding: 24px; color: var(--text-muted); font-size: 0.88rem;">
                  У вас пока нет выигранных купонов.<br>
                  Испытайте удачу в разделе мини-игр!
                </div>
              ` : coupons.map((c) => `
                <div class="coupon-item">
                  <div>
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 2px;">
                      <span class="coupon-code-val">${c.code}</span>
                      <span style="font-size: 0.68rem; background: rgba(253,134,182,0.2); color: var(--color-pink); padding: 2px 6px; border-radius: 4px; font-weight: 700;">${c.tag || 'СКИДКА'}</span>
                    </div>
                    <div class="coupon-discount-text">${c.title}</div>
                    <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">Получен: ${c.date}</div>
                  </div>
                  <button class="coupon-copy-btn pressable" data-code="${c.code}">
                    Копировать
                  </button>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- КНОПКА ВЫХОДА ИЗ ПРОФИЛЯ ДЛЯ ТЕСТИРОВАНИЯ ГОСТЕВОГО РЕЖИМА -->
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-subtle); text-align: center;">
            <button class="btn-secondary pressable" id="profile-logout-btn" style="font-size: 0.82rem; padding: 8px 18px; color: var(--text-secondary); border-color: var(--border-subtle);">
              Выйти из профиля
            </button>
          </div>

        </div>
      </div>
    `;

    const backdrop = container.querySelector('#profile-modal-backdrop');
    const closeBtn = container.querySelector('#profile-close-btn');
    const logoutBtn = container.querySelector('#profile-logout-btn');

    closeBtn.addEventListener('click', () => backdrop.classList.remove('active'));
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.classList.remove('active');
    });

    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        store.logout();
        backdrop.classList.remove('active');
        sounds.playTick();
        onShowToast('Вы вышли из профиля гостя.', 'info');
      });
    }

    const promoInput = container.querySelector('#promo-input');
    const applyBtn = container.querySelector('#promo-apply-btn');

    const handleApply = (code) => {
      const val = code || promoInput.value;
      if (!val) return;
      const res = store.applyPromoCode(val);
      if (res.success) {
        sounds.playWin();
        onShowToast(res.message, 'success');
        promoInput.value = '';
      } else {
        sounds.playReelStop();
        onShowToast(res.message, 'error');
      }
    };

    applyBtn.addEventListener('click', () => handleApply());
    promoInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleApply();
    });

    container.querySelectorAll('.coupon-copy-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const code = btn.dataset.code;
        try {
          await navigator.clipboard.writeText(code);
          sounds.playTick();
          btn.textContent = 'Скопировано!';
          setTimeout(() => { btn.textContent = 'Копировать'; }, 2000);
          onShowToast(`Промокод ${code} скопирован в буфер обмена. Назовите его бариста на кассе.`, 'success');
        } catch {
          onShowToast(`Промокод: ${code}`, 'success');
        }
      });
    });
  }

  function openModal() {
    render();
    const backdrop = container.querySelector('#profile-modal-backdrop');
    if (backdrop) backdrop.classList.add('active');
  }

  render();
  store.subscribe(render);

  return { open: openModal };
}
