/**
 * GAMES TEASER SECTION
 * СТРОГО БЕЗ ЭМОДЗИ: только чистый CSS и инлайн-SVG
 */
import { sounds } from '../utils/sound.js';

export function renderGamesTeaserSection(container, { onOpenGamesWithTab }) {
  container.innerHTML = `
    <section class="games-section container" id="games-section" aria-label="Зона азарта Бурмалды">
      <div class="section-head">
        <span class="section-tag">PLAY AND WIN</span>
        <h2 class="section-title">Зона Азарта: Испытай Удачу</h2>
        <p class="section-desc">Строгое правило: 1 тикет = 1 игра. Выигрывайте скидки до 50%, бесплатные сиропы и пополняйте инвентарь купонов.</p>
      </div>

      <div class="games-grid">
        <!-- КАРТОЧКА 1: КОЛЕСО -->
        <div class="game-card-teaser pressable" data-tab="wheel">
          <div class="game-icon-circle" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/></svg>
          </div>
          <span class="game-cost-badge">1 БИЛЕТ ЗА СПИН</span>
          <h3 class="game-title">Колесо Фортуны</h3>
          <p class="game-desc">Плавное вращение с интригующим замедлением в конце. Выигрывайте скидки 50%, 25%, 15% или бесплатный сироп.</p>
          <button class="btn-primary pressable" style="width: 100%;">Крутить Колесо</button>
        </div>

        <!-- КАРТОЧКА 2: СЛОТЫ -->
        <div class="game-card-teaser pressable" data-tab="slots">
          <div class="game-icon-circle" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/><path d="M18 8h.01"/></svg>
          </div>
          <span class="game-cost-badge">1 БИЛЕТ ЗА СПИН</span>
          <h3 class="game-title">Слоты Бариста</h3>
          <p class="game-desc">3 барабана в стиле спешелти: кристаллы, чашки, звезды. Сорвите джекпот со скидкой 50% на весь чек!</p>
          <button class="btn-primary pressable" style="width: 100%;">Дернуть рычаг</button>
        </div>

        <!-- КАРТОЧКА 3: MYSTERY BOX -->
        <div class="game-card-teaser pressable" data-tab="box">
          <div class="game-icon-circle" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
          </div>
          <span class="game-cost-badge">1 БИЛЕТ ЗА ИГРУ</span>
          <h3 class="game-title">Подарочный Бокс</h3>
          <p class="game-desc">Три запечатанных бокса от шеф-бариста. Выберите один — крышка эффектно взлетит с подарком внутри.</p>
          <button class="btn-primary pressable" style="width: 100%;">Открыть Бокс</button>
        </div>
      </div>
    </section>
  `;

  container.querySelectorAll('.game-card-teaser').forEach((card) => {
    card.addEventListener('click', () => {
      const tab = card.dataset.tab;
      sounds.playTick();
      onOpenGamesWithTab(tab);
    });
  });
}
