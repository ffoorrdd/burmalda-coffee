/**
 * 3D LOYALTY CARD & SPECIALTY CUP PROGRESS ENGINE
 * СТРОГО БЕЗ ЭМОДЗИ
 * Лицевая сторона: оригинальный фото-шаблон banner_card_template.jpg
 * с динамическим наложением данных по координатам profile_card.py:
 * Аватар (слева), QR-код (справа вверху), Никнейм, ID, Куплено кофе, Дата (#1E4078)
 */
import { store } from '../utils/storage.js';
import { sounds } from '../utils/sound.js';

export function renderCard3D(container, { onShowToast }) {
  let isFlipped = false;

  function update() {
    const user = store.getUser();
    const status = store.getLoyaltyStatus();
    const rawCups = user.coffee_month || 0;
    const cupsInCurrentCycle = (rawCups > 0 && rawCups % 6 === 0) ? 6 : (rawCups % 6);
    const fillPercent = Math.min(100, Math.round((cupsInCurrentCycle / 6) * 100));
    const liquidY = cupsInCurrentCycle === 0 ? 82 : Math.max(18, 80 - (fillPercent * 0.60));

    // Имя для отображения
    const displayName = user.username ? `@${user.username}` : (user.first_name || `Гость #${user.user_id}`);

    container.innerHTML = `
      <section class="loyalty-hero-section container" aria-label="Карта лояльности и прогресс">
        <div class="loyalty-showcase-grid">
          
          <!-- ЛЕВАЯ КОЛОНКА: ИНТЕРАКТИВНАЯ 3D-КАРТА НА БАЗЕ ФОТО-ШАБЛОНА -->
          <div>
            <div class="card-3d-perspective-container" id="card-3d-wrap">
              <div class="card-3d-inner" id="card-3d-element">
                <!-- Световой блик наклона -->
                <div class="card-glare" id="card-glare-effect"></div>

                <!-- ЛИЦЕВАЯ СТОРОНА: ФОТО-ШАБЛОН С НАЛОЖЕНИЕМ ДАННЫХ -->
                <div class="card-3d-face real-card-template-face" style="background-image: url('assets/banners/banner_card_template.jpg');">
                  
                  <!-- 1. Круглая аватарка в слот слева -->
                  <div class="real-card-avatar-slot">
                    <img src="${user.avatar || 'assets/branding/logo_burmalda.png'}" alt="" class="real-card-avatar-img" width="100" height="100" />
                  </div>

                  <!-- 2. QR-код в слот справа (кликабельный для сканера Т-Банка) -->
                  <button class="real-card-qr-slot pressable" id="card-qr-trigger" aria-label="Увеличить QR-код для сканера Т-Кассы">
                    <svg class="real-card-qr-svg" viewBox="0 0 100 100">
                      <rect width="100" height="100" fill="#ffffff" />
                      <path d="M10 10h30v30h-30z M16 16h18v18h-18z M22 22h6v6h-6z M60 10h30v30h-30z M66 16h18v18h-18z M72 22h6v6h-6z M10 60h30v30h-30z M16 66h18v18h-18z M22 72h6v6h-6z M46 16h8v8h-8z M46 30h8v16h-8z M60 50h8v8h-8z M76 50h14v8h-14z M52 64h12v12h-12z M70 64h12v8h-12z M86 70h8v18h-8z M64 82h14v8h-14z" />
                    </svg>
                  </button>

                  <!-- 3. Текстовые поля строго синего оттенка #1E4078 -->
                  <div class="real-card-field-name">${displayName}</div>
                  <div class="real-card-field-id">#${user.user_id}</div>
                  <div class="real-card-field-coffee">${user.coffee_month || 0} шт</div>
                  <div class="real-card-field-date">${user.created_at}</div>
                </div>

                <!-- ОБОРОТНАЯ СТОРОНА КАРТЫ -->
                <div class="card-3d-face card-3d-face-back card-back-design">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 800; font-size: 1.1rem; letter-spacing: 0.1em; color: var(--color-pink);">BURMALDA SPECIALTY PASS</span>
                    <span style="font-size: 0.75rem; color: var(--color-blue-bright); font-weight: 700;">ROSTOV-ON-DON</span>
                  </div>

                  <div style="margin: 20px 0; font-size: 0.85rem; line-height: 1.6; color: var(--text-secondary);">
                    <div style="font-weight: 700; color: #ffffff; margin-bottom: 6px;">Условия программы лояльности:</div>
                    <div>• 10 чашек/месяц — скидка 5% на кассе Т-Банка</div>
                    <div>• 25 чашек/месяц — скидка 10% на весь чек</div>
                    <div>• Каждый 6-й кофе в подарок по счетчику чашки</div>
                  </div>

                  <div style="display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--text-muted); border-top: 1px solid var(--border-subtle); padding-top: 12px;">
                    <span>Статус: <b>${status.title}</b></span>
                    <span>Т-Банк Webhook Ready</span>
                  </div>
                </div>

              </div>
            </div>

            <!-- Кнопки управления 3D-картой -->
            <div class="card-3d-controls">
              <button class="card-rotate-btn pressable" id="card-flip-btn" aria-label="Перевернуть карту на 360 градусов">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
                  <path d="M16 21h5v-5"/>
                </svg>
                <span>360° Повернуть карту</span>
              </button>
            </div>
          </div>

          <!-- ПРАВАЯ КОЛОНКА: ВИДЖЕТ «КАЖДЫЙ 6-Й КОФЕ В ПОДАРОК» С ИЗЯЩНОЙ SVG-КРУЖКОЙ -->
          <div>
            <div class="cup-progress-card">
              <div class="cup-header-status">
                <span class="cup-status-title">Каждый 6-й кофе в подарок</span>
                <span class="badge" style="background: rgba(253,134,182,0.18); color: var(--color-pink); padding: 5px 12px; border-radius: 99px; font-size: 0.78rem; font-weight: 700; border: 1px solid var(--border-pink);">
                  ${cupsInCurrentCycle} из 6 чашек
                </span>
              </div>

              <div class="cup-visual-container">
                <!-- ИЗЯЩНАЯ КЕРАМИЧЕСКАЯ ЧАШКА БУРМАЛДЫ (CSS + SVG) -->
                <div class="spec-cup-wrapper" aria-hidden="true">
                  <!-- Пар над чашкой -->
                  <div style="position: absolute; top: -14px; left: 24px; display: flex; gap: 8px;">
                    <div class="steam-line" style="width: 2px; height: 16px; background: rgba(253,134,182,0.6); border-radius: 2px;"></div>
                    <div class="steam-line" style="width: 2px; height: 20px; background: rgba(59,128,197,0.6); border-radius: 2px;"></div>
                    <div class="steam-line" style="width: 2px; height: 14px; background: rgba(255,255,255,0.7); border-radius: 2px;"></div>
                  </div>

                  <svg class="spec-cup-svg" viewBox="0 0 100 90">
                    <defs>
                      <clipPath id="cup-liquid-clip">
                        <!-- Внутренний контур чашки -->
                        <path d="M14 20 L20 74 Q22 80 28 80 L62 80 Q68 80 70 74 L76 20 Z" />
                      </clipPath>
                    </defs>

                    <!-- Блюдце -->
                    <ellipse cx="45" cy="84" rx="42" ry="5" fill="#ffffff" stroke="var(--color-pink)" stroke-width="1.5" />

                    <!-- Ручка чашки -->
                    <path d="M68 28 C86 28, 86 64, 64 64" fill="none" stroke="var(--color-pink)" stroke-width="5" stroke-linecap="round" />

                    <!-- Тело керамической чашки -->
                    <path d="M10 18 L18 74 Q20 82 28 82 L62 82 Q70 82 72 74 L76 20 Z" fill="#ffffff" stroke="var(--color-pink)" stroke-width="2.5" />

                    <!-- Жидкий кофе с анимированной волной внутри (чистый SVG/CSS) -->
                    <g clip-path="url(#cup-liquid-clip)">
                      ${cupsInCurrentCycle > 0 ? `
                        <!-- Базовый объем напитка (чистый брендовый синий Бурмалды) -->
                        <rect x="0" y="${liquidY}" width="100" height="80" fill="var(--color-blue)">
                          <animate attributeName="y" to="${liquidY}" dur="0.6s" fill="freeze" />
                        </rect>
                        <!-- Непрерывная плавная волна на поверхности (GPU-ускоренная) -->
                        <g class="liquid-wave-layer" style="transform: translateZ(0);">
                          <path d="M 0 ${liquidY} Q 25 ${liquidY - 2.5} 50 ${liquidY} T 100 ${liquidY} Q 125 ${liquidY - 2.5} 150 ${liquidY} T 200 ${liquidY} L 200 90 L 0 90 Z" fill="var(--color-blue)" opacity="0.95" />
                          <path d="M 0 ${liquidY} Q 25 ${liquidY - 2.5} 50 ${liquidY} T 100 ${liquidY} Q 125 ${liquidY - 2.5} 150 ${liquidY} T 200 ${liquidY}" fill="none" stroke="#fee8f5" stroke-width="2" opacity="0.85" />
                        </g>
                      ` : ''}
                    </g>

                    <!-- Ободок чашки -->
                    <ellipse cx="45" cy="18" rx="35" ry="5" fill="none" stroke="#ffffff" stroke-width="2" />
                  </svg>
                </div>

                <div style="flex: 1;">
                  <div style="font-size: 1.5rem; font-weight: 800; color: var(--color-pink); font-variant-numeric: tabular-nums;">
                    ${cupsInCurrentCycle === 6 ? 'Чашка готова!' : (cupsInCurrentCycle === 0 ? 'Новый цикл' : `Еще ${6 - cupsInCurrentCycle} шт.`)}
                  </div>
                  <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px;">
                    ${cupsInCurrentCycle === 6 
                      ? 'Поздравляем! Ваш 6-й авторский кофе в подарок' 
                      : (cupsInCurrentCycle === 0 
                        ? 'Начните новый цикл накопления напитка' 
                        : 'До бесплатного авторского напитка любого объема')}
                  </div>
                  <div style="margin-top: 8px; font-size: 0.8rem; color: var(--text-muted);">
                    Всего выпито за месяц: <b>${user.coffee_month || 0} шт.</b> (за все время: ${user.coffee_total || 0})
                  </div>
                </div>
              </div>

              <!-- Шаги накопления 1..6 чашек -->
              <div class="cup-step-chips" aria-label="Шкала накопления">
                ${[1, 2, 3, 4, 5, 6].map((step) => `
                  <div class="cup-step-chip ${step <= cupsInCurrentCycle ? 'filled' : ''}">
                    ${step === 6 ? 'FREE' : step}
                  </div>
                `).join('')}
              </div>

              <!-- Кнопка добавления чашки кофе -->
              <button class="btn-simulate-coffee pressable" id="btn-simulate-purchase">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                  <line x1="6" y1="1" x2="6" y2="4"/>
                  <line x1="10" y1="1" x2="10" y2="4"/>
                  <line x1="14" y1="1" x2="14" y2="4"/>
                </svg>
                <span>+1 чашка</span>
              </button>
            </div>
          </div>

        </div>

        <!-- ПОЛНОЭКРАННЫЙ QR-КОД -->
        <div class="qr-fullscreen-modal" id="qr-zoom-modal" role="dialog" aria-modal="true" aria-label="QR-код для кассира">
          <div class="qr-modal-content">
            <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 8px; color: var(--color-blue);">QR КАРТЫ</h3>

            <div class="qr-modal-image-wrap">
              <svg viewBox="0 0 100 100" width="100%" height="100%" fill="var(--color-blue)">
                <rect width="100" height="100" fill="#ffffff" />
                <path d="M10 10h30v30h-30z M16 16h18v18h-18z M22 22h6v6h-6z M60 10h30v30h-30z M66 16h18v18h-18z M72 22h6v6h-6z M10 60h30v30h-30z M16 66h18v18h-18z M22 72h6v6h-6z M46 16h8v8h-8z M46 30h8v16h-8z M60 50h8v8h-8z M76 50h14v8h-14z M52 64h12v12h-12z M70 64h12v8h-12z M86 70h8v18h-8z M64 82h14v8h-14z" />
              </svg>
            </div>

            <div style="font-size: 1.4rem; font-weight: 800; font-family: monospace; letter-spacing: 0.06em; color: var(--color-blue);">
              #${user.user_id}
            </div>
          </div>
        </div>

      </section>
    `;

    // 3D ТРЕКИНГ КУРСОРА МЫШИ (Tilt & Glare)
    const wrap = container.querySelector('#card-3d-wrap');
    const card = container.querySelector('#card-3d-element');
    const glare = container.querySelector('#card-glare-effect');
    const flipBtn = container.querySelector('#card-flip-btn');
    const qrTrigger = container.querySelector('#card-qr-trigger');
    const qrModal = container.querySelector('#qr-zoom-modal');
    const simulateBtn = container.querySelector('#btn-simulate-purchase');

    if (wrap && card) {
      const handleMove = (e) => {
        const rect = wrap.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const x = (clientX - rect.left) / rect.width;
        const y = (clientY - rect.top) / rect.height;

        const rotateX = ((y - 0.5) * -22).toFixed(2);
        const rotateY = ((x - 0.5) * 22).toFixed(2);
        const baseRotY = isFlipped ? 180 : 0;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${parseFloat(rotateY) + baseRotY}deg)`;
        
        if (glare) {
          glare.style.setProperty('--glare-x', `${x * 100}%`);
          glare.style.setProperty('--glare-y', `${y * 100}%`);
          glare.style.setProperty('--glare-opacity', '0.5');
        }
      };

      const handleLeave = () => {
        const baseRotY = isFlipped ? 180 : 0;
        card.style.transform = `rotateX(0deg) rotateY(${baseRotY}deg)`;
        if (glare) {
          glare.style.setProperty('--glare-opacity', '0');
        }
      };

      wrap.addEventListener('mousemove', handleMove);
      wrap.addEventListener('mouseleave', handleLeave);
      wrap.addEventListener('touchmove', handleMove, { passive: true });
      wrap.addEventListener('touchend', handleLeave);
    }

    if (flipBtn && card) {
      flipBtn.addEventListener('click', () => {
        isFlipped = !isFlipped;
        card.style.transform = `rotateX(0deg) rotateY(${isFlipped ? 180 : 0}deg)`;
        sounds.playTick();
      });
    }

    if (qrTrigger && qrModal) {
      qrTrigger.addEventListener('click', () => {
        qrModal.classList.add('active');
        sounds.playTick();
      });

      qrModal.addEventListener('click', () => {
        qrModal.classList.remove('active');
      });
    }

    if (simulateBtn) {
      simulateBtn.addEventListener('click', () => {
        const res = store.addCoffeeCup();
        sounds.playWin();

        if (res.isFreeCup) {
          onShowToast('Вы набрали 6 чашек! Вам начислен бесплатный кофе в инвентарь.', 'success');
        } else {
          onShowToast(`+1 кофе учтен через Т-Банк. Всего за месяц: ${res.month}`, 'success');
        }
      });
    }
  }

  update();
  store.subscribe(update);
}
