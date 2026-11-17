/**
 * ADAPTIVE COFFEE MENU COMPONENT
 * Интеграция аутентичного меню с Google Диска и умное продолжение фона
 * через CSS backdrop-filter, размытие и градиенты (Seamless Bleed)
 * СТРОГО БЕЗ ЭМОДЗИ
 */
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData.js';
import { sounds } from '../utils/sound.js';

export function renderMenuSection(container, { onSelectDrink }) {
  let activeCategory = 'all';

  function render() {
    const filteredItems = activeCategory === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

    container.innerHTML = `
      <section class="menu-section container" id="menu-section" aria-label="Меню кофейни">
        <div class="section-head">
          <span class="section-tag">SPECIALTY MENU 2026</span>
          <h2 class="section-title">Авторское Меню Бурмалды</h2>
          <p class="section-desc">Свежеобжаренное зерно, фирменная линейка Вайперр и согревающие донские чаи на натуральных ягодах.</p>
        </div>

        <!-- КНОПКИ ФИЛЬТРАЦИИ -->
        <div class="menu-filter-bar" role="tablist" aria-label="Категории напитков">
          ${MENU_CATEGORIES.map((cat) => `
            <button class="menu-filter-btn ${cat.id === activeCategory ? 'active' : ''} pressable" 
                    data-cat="${cat.id}" 
                    role="tab" 
                    aria-selected="${cat.id === activeCategory}">
              ${cat.title}
            </button>
          `).join('')}
        </div>

        <!-- АДАПТИВНАЯ СЕТКА КАРТОЧЕК С УМНЫМ ПРОДОЛЖЕНИЕМ ФОНА -->
        <div class="menu-grid" id="menu-cards-grid">
          ${filteredItems.map((item) => `
            <article class="menu-card pressable" data-id="${item.id}" tabindex="0" aria-label="${item.name}, цена ${item.price} рублей">
              <!-- ВИЗУАЛЬНЫЙ БЛОК С УМНЫМ БЛЮРОМ -->
              <div class="menu-card-visual-wrap">
                <!-- Размытый бэкдроп-клон для органичного продолжения фона фото -->
                <div class="menu-card-blur-backdrop" style="background-image: url('${item.image}');" aria-hidden="true"></div>
                
                <!-- Основное изображение меню -->
                <img src="${item.image}" alt="${item.name}" class="menu-card-img" loading="lazy" width="310" height="220" />
                
                <!-- Чистый CSS-бейдж статуса -->
                <span class="menu-badge">${item.badge}</span>
              </div>

              <!-- ТЕЛО КАРТОЧКИ -->
              <div class="menu-card-body">
                <div class="menu-item-header">
                  <h3 class="menu-item-name">${item.name}</h3>
                  <div class="menu-item-price">${item.price} ₽</div>
                </div>

                <p class="menu-item-desc">${item.description}</p>

                <div class="menu-item-footer">
                  <span class="menu-item-volume">${item.volume}</span>
                  <span style="font-size: 0.78rem; color: var(--color-pink); font-weight: 700;">Спешелти обжарка</span>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;

    container.querySelectorAll('.menu-filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.cat;
        sounds.playTick();
        render();
      });
    });

    container.querySelectorAll('.menu-card').forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        const drink = MENU_ITEMS.find((d) => d.id === id);
        if (drink && onSelectDrink) {
          onSelectDrink(drink);
        }
      });
    });
  }

  render();
}
