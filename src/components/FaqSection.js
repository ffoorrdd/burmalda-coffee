/**
 * FAQ ACCORDION COMPONENT
 * Плавное раскрытие с анимацией высоты и прозрачности (GPU-friendly CSS grid rows)
 * Содержит тестовый «Частый вопрос 1» по ТЗ
 */
import { FAQ_DATA } from '../data/faqData.js';
import { sounds } from '../utils/sound.js';

export function renderFaqSection(container) {
  let openId = null;

  function render() {
    container.innerHTML = `
      <section class="faq-section container" id="faq-section" aria-label="Частые вопросы">
        <div class="section-head">
          <span class="section-tag">FAQ</span>
          <h2 class="section-title">Часто Задаваемые Вопросы</h2>
          <p class="section-desc">Все о накопительной программе, сканировании QR-кода на кассе Т-Банка и мини-играх.</p>
        </div>

        <div class="faq-container">
          ${FAQ_DATA.map((item) => {
            const isOpen = item.id === openId;
            return `
              <div class="faq-item ${isOpen ? 'open' : ''}" id="${item.id}">
                <button class="faq-trigger" data-id="${item.id}" aria-expanded="${isOpen}">
                  <span>${item.question}</span>
                  <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div class="faq-content" role="region" aria-labelledby="${item.id}">
                  <div class="faq-content-inner">
                    <div class="faq-body">${item.answer}</div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>
    `;

    container.querySelectorAll('.faq-trigger').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        openId = openId === id ? null : id;
        sounds.playTick();
        render();
      });
    });
  }

  render();
}
