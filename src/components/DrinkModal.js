/**
 * DRINK DETAIL MODAL
 * Всплывающая карточка выбранного напитка со вкусовым профилем и умным блюром
 * СТРОГО БЕЗ ЭМОДЗИ
 */

export function renderDrinkModal(container) {
  function render(drink) {
    if (!drink) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = `
      <div class="modal-backdrop active" id="drink-detail-backdrop" role="dialog" aria-modal="true" aria-label="${drink.name}">
        <div class="modal-dialog" style="max-width: 480px; padding: 0; overflow: hidden;">
          
          <!-- ВИЗУАЛЬНЫЙ БЛОК -->
          <div style="position: relative; width: 100%; height: 260px; overflow: hidden; background: #fff0f6;">
            <div class="menu-card-blur-backdrop" style="background-image: url('${drink.image}');"></div>
            <img src="${drink.image}" alt="${drink.name}" style="position: relative; z-index: 2; width: 100%; height: 100%; object-fit: cover;" />
            <button class="modal-close-btn pressable" id="drink-modal-close" style="position: absolute; top: 14px; right: 14px; z-index: 10; background: rgba(0,0,0,0.6); color: #ffffff;" aria-label="Закрыть"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
            <span class="menu-badge" style="top: 14px; left: 14px;">${drink.badge}</span>
          </div>

          <!-- КОНТЕНТ -->
          <div style="padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
              <h3 style="font-size: 1.4rem; font-weight: 800; color: var(--text-primary);">${drink.name}</h3>
              <span style="font-size: 1.4rem; font-weight: 900; color: var(--color-pink-deep); font-variant-numeric: tabular-nums;">${drink.price} ₽</span>
            </div>

            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 20px;">
              ${drink.description}
            </p>

            <div style="background: #fff0f6; padding: 14px 18px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 6px;">
                <span style="color: var(--text-muted);">Объем порции:</span>
                <span style="font-weight: 700; color: var(--text-primary);">${drink.volume}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 6px;">
                <span style="color: var(--text-muted);">Зерно / Основа:</span>
                <span style="font-weight: 700; color: var(--text-primary);">Specialty Arabica 86+ Q</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
                <span style="color: var(--text-muted);">Опции молока:</span>
                <span style="font-weight: 700; color: var(--color-blue-bright);">Овсяное / Кокосовое / Классик</span>
              </div>
            </div>

            <button class="btn-primary pressable" id="drink-show-barista-btn" style="width: 100%; padding: 12px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
                <path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
              </svg>
              <span>Показать бариста на кассе</span>
            </button>
          </div>
        </div>
      </div>
    `;

    const backdrop = container.querySelector('#drink-detail-backdrop');
    const closeBtn = container.querySelector('#drink-modal-close');
    const baristaBtn = container.querySelector('#drink-show-barista-btn');

    const close = () => {
      container.innerHTML = '';
    };

    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) close();
    });
    baristaBtn.addEventListener('click', close);
  }

  return { open: render };
}
