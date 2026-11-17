/**
 * HERO BANNER SECTION COMPONENT
 * СТРОГО БЕЗ ЭМОДЗИ
 */

export function renderHeroSection(container, { onOpenGames, onOpenLoyalty }) {
  container.innerHTML = `
    <section class="hero-section container" aria-label="Главный баннер кофейни">
      <div class="hero-banner-card">
        <img src="assets/banners/banner_main.jpg" alt="Бурмалда Кофе" class="hero-banner-img" fetchpriority="high" width="1200" height="460" />
        
        <div class="hero-banner-overlay">
          <div class="hero-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            <span>EST. 2026 • ROSTOV SPECIALTY SPOT</span>
          </div>

          <h1 class="hero-title">
            БУРМАЛДА КОФЕ <br>
            <span style="color: var(--color-pink);">С БЕРЕГОВ ДОНА</span>
          </h1>

          <p class="hero-subtitle">
            Нишевая specialty-кофейня Ростова-на-Дону. 3D-карта лояльности, каждый 6-й кофе в подарок и мини-игры с призами.
          </p>

          <div class="hero-actions">
            <a href="#menu-section" class="btn-primary pressable" style="padding: 12px 24px; font-size: 0.95rem;">
              <span>Смотреть меню</span>
            </a>
            <button class="btn-secondary pressable" id="hero-games-trigger" style="padding: 12px 22px; font-size: 0.95rem; background: rgba(255,255,255,0.2); backdrop-filter: blur(8px); border-color: rgba(255,255,255,0.4); color: #ffffff;">
              <span>Зона азарта</span>
            </button>
            <button class="btn-secondary pressable" id="hero-card-trigger" style="padding: 12px 20px; font-size: 0.95rem; background: rgba(255,255,255,0.2); backdrop-filter: blur(8px); border-color: rgba(255,255,255,0.4); color: #ffffff;">
              <span>3D Карта гостя</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  `;

  const gamesTrigger = container.querySelector('#hero-games-trigger');
  if (gamesTrigger) gamesTrigger.addEventListener('click', onOpenGames);

  const cardTrigger = container.querySelector('#hero-card-trigger');
  if (cardTrigger) {
    cardTrigger.addEventListener('click', () => {
      const cardEl = document.querySelector('.loyalty-hero-section');
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
