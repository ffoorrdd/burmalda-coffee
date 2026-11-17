/**
 * FEEDBACK COMPONENT («ПРЕДЛОЖИТЬ ИДЕЮ»)
 * СТРОГОЕ УСЛОВИЕ: Скрыт от гостей и появляется только для авторизованных пользователей клуба
 * СТРОГО БЕЗ ЭМОДЗИ
 */
import { store } from '../utils/storage.js';
import { sounds } from '../utils/sound.js';

export function renderFeedbackSection(container, { onOpenAuth, onShowToast }) {
  function render() {
    const user = store.getUser();

    container.innerHTML = `
      <section class="feedback-section container" id="feedback-section" aria-label="Обратная связь">
        <div class="feedback-card">
          <div class="section-head" style="margin-bottom: 24px;">
            <span class="section-tag">КОМЬЮНИТИ</span>
            <h2 class="section-title">Предложить идею для Бурмалды</h2>
            <p class="section-desc">Мы создаем спешелти-культуру Ростова вместе с вами. Придумали новый напиток или хотите авторский мерч? Напишите нам.</p>
          </div>

          ${
            !user.isAuthenticated ? `
              <!-- БЛОК ЗАБЛОКИРОВАН ДЛЯ ГОСТЕЙ (СТРОГО ПО ТЗ) -->
              <div class="feedback-guest-locked">
                <div class="feedback-lock-icon" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 6px;">Доступно только для участников клуба</h3>
                <p style="font-size: 0.88rem; color: var(--text-secondary); max-width: 440px; margin: 0 auto 20px auto;">
                  Форма прямой связи с шеф-бариста открыта гостям с активированной картой лояльности.
                </p>
                <button class="btn-primary pressable" id="feedback-login-trigger">
                  Выпустить карту гостя
                </button>
              </div>
            ` : `
              <!-- АКТИВНАЯ ФОРМА ДЛЯ АВТОРИЗОВАННЫХ ПОЛЬЗОВАТЕЛЕЙ -->
              <form id="idea-submit-form">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                  <div class="form-group">
                    <label class="form-label" for="idea-author">Автор:</label>
                    <input type="text" id="idea-author" class="form-input" value="${user.first_name} (@${user.username})" disabled />
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="idea-category">Категория:</label>
                    <select id="idea-category" class="form-input" style="cursor: pointer;">
                      <option value="drink">Новый напиток или рецепт</option>
                      <option value="merch">Дроп мерча и фигурок</option>
                      <option value="event">Каппинг или Мероприятие</option>
                      <option value="service">Предложение по сервису</option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label" for="idea-title">Название идеи:</label>
                  <input type="text" id="idea-title" class="form-input" placeholder="Например: Раф с донской вишней и розмарином…" required />
                </div>

                <div class="form-group">
                  <label class="form-label" for="idea-text">Подробное описание:</label>
                  <textarea id="idea-text" class="form-textarea" placeholder="Расскажите вашу задумку шеф-бариста…" required></textarea>
                </div>

                <button type="submit" class="btn-primary pressable" style="width: 100%; padding: 14px; font-size: 1rem;">
                  Отправить идею шеф-бариста
                </button>
              </form>
            `
          }
        </div>
      </section>
    `;

    const loginTrigger = container.querySelector('#feedback-login-trigger');
    if (loginTrigger) {
      loginTrigger.addEventListener('click', onOpenAuth);
    }

    const form = container.querySelector('#idea-submit-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = container.querySelector('#idea-title').value;
        sounds.playWin();
        onShowToast(`Идея «${title}» отправлена бариста. Спасибо за вклад в развитие кофейни!`, 'success');
        form.reset();
      });
    }
  }

  render();
  store.subscribe(render);
}
