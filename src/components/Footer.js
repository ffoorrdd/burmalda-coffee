/**
 * FOOTER COMPONENT
 * СТРОГО БЕЗ ЭМОДЗИ
 * Логотип: logo_burmalda.png
 */

export function renderFooter(container) {
  container.innerHTML = `
    <footer class="site-footer" role="contentinfo">
      <div class="container">
        <div class="footer-grid">
          
          <!-- КОЛОНКА 1: О БРЕНДЕ И ЛОКАЦИИ -->
          <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
              <img src="assets/branding/logo_burmalda.png" alt="Бурмалда" width="40" height="40" style="border-radius: 8px; background: #ffffff; padding: 2px;" />
              <span style="font-weight: 800; font-size: 1.2rem; color: var(--text-primary);">БУРМАЛДА КОФЕ</span>
            </div>
            <p style="font-size: 0.9rem; line-height: 1.5; color: var(--text-secondary); margin-bottom: 16px; max-width: 380px;">
              Нишевая спешелти-кофейня с берегов Дона. Зерно свежей обжарки 86+ баллов, фирменные холодные напитки Вайперр и согревающие ягодные чаи.
            </p>
            <div style="font-size: 0.85rem; color: var(--color-pink); font-weight: 700;">
              г. Ростов-на-Дону, набережная реки Дон / ул. Береговая
            </div>
            <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 4px;">
              Часы работы: Ежедневно с 08:00 до 23:00
            </div>
            
            <!-- СТИЛИЗОВАННАЯ КНОПКА МАРШРУТА -->
            <div style="margin-top: 16px;">
              <a href="https://yandex.ru/maps/?text=Ростов-на-Дону+Береговая" target="_blank" rel="noopener noreferrer" class="btn-secondary pressable" style="display: inline-flex; font-size: 0.82rem; padding: 8px 14px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                </svg>
                <span>Построить маршрут (Яндекс Карты)</span>
              </a>
            </div>
          </div>

          <!-- КОЛОНКА 2: МЕНЮ И НАВИГАЦИЯ -->
          <div>
            <h4 class="footer-col-title">Навигация</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px; font-size: 0.88rem;">
              <li><a href="#menu-section" style="color: var(--text-secondary); transition: color 0.15s ease;" onmouseover="this.style.color='var(--color-pink)'" onmouseout="this.style.color='var(--text-secondary)'">Бурмалда Меню</a></li>
              <li><a href="#menu-section" style="color: var(--text-secondary); transition: color 0.15s ease;" onmouseover="this.style.color='var(--color-pink)'" onmouseout="this.style.color='var(--text-secondary)'">Вайперр Дроп</a></li>
              <li><a href="#menu-section" style="color: var(--text-secondary); transition: color 0.15s ease;" onmouseover="this.style.color='var(--color-pink)'" onmouseout="this.style.color='var(--text-secondary)'">Баба-Чай Меню</a></li>
              <li><a href="#feedback-section" style="color: var(--text-secondary); transition: color 0.15s ease;" onmouseover="this.style.color='var(--color-pink)'" onmouseout="this.style.color='var(--text-secondary)'">Предложить идею</a></li>
              <li><a href="#faq-section" style="color: var(--text-secondary); transition: color 0.15s ease;" onmouseover="this.style.color='var(--color-pink)'" onmouseout="this.style.color='var(--text-secondary)'">Вопросы и ответы</a></li>
            </ul>
          </div>

          <!-- КОЛОНКА 3: СОЦИАЛЬНЫЕ СЕТИ И БОТ -->
          <div>
            <h4 class="footer-col-title">Мы в сети</h4>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 12px;">
              Официальный бот и канал кофейни в Telegram:
            </p>
            <div class="footer-social-links">
              <!-- Telegram Bot -->
              <a href="https://t.me/burmalda_coffee_bot" target="_blank" rel="noopener noreferrer" class="social-btn pressable" aria-label="Telegram бот Бурмалды">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </a>

              <!-- Telegram Channel -->
              <a href="https://t.me/burmalda_coffee" target="_blank" rel="noopener noreferrer" class="social-btn pressable" aria-label="Telegram канал Бурмалды">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
              </a>
            </div>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 14px;">
              Telegram-бот: <code>@burmalda_coffee_bot</code><br>
              Связь: <code>@burmalda_coffee</code>
            </div>
          </div>

        </div>

        <div style="border-top: 1px solid var(--border-subtle); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; color: var(--text-muted); flex-wrap: wrap; gap: 12px;">
          <div>© 2026 БУРМАЛДА СПЕШЕЛТИ КОФЕ. Все права защищены. 152-ФЗ РФ соблюден.</div>
          <div>Ростов-на-Дону • Specialty Coffee Club</div>
        </div>
      </div>
    </footer>
  `;
}
