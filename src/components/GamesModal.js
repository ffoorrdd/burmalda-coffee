/**
 * GAMIFICATION ENGINE: ЗОНА АЗАРТА БУРМАЛДЫ
 * Строгое правило: 1 тикет = 1 игра
 * СТРОГО БЕЗ ЭМОДЗИ (только чистый SVG и CSS)
 * Классическое крутое Колесо Фортуны, Слоты и Mystery Box в светлой розовой стилистике
 */
import { store } from '../utils/storage.js';
import { sounds } from '../utils/sound.js';

export function renderGamesModal(container, { onShowToast }) {
  let activeTab = 'wheel';
  let isPlaying = false;
  let currentWheelDeg = 0;

  function render() {
    const tokens = store.getTokens();

    container.innerHTML = `
      <div class="modal-backdrop" id="games-modal-backdrop" role="dialog" aria-modal="true" aria-label="Игры за тикеты">
        <div class="modal-dialog" style="max-width: 580px; background: #ffffff;">
          <div class="modal-header">
            <div>
              <h2 class="modal-title" style="color: var(--color-pink-deep); font-weight: 900; font-size: 1.5rem;">
                Игры за билеты
              </h2>
              <div style="display: flex; align-items: center; gap: 6px; margin-top: 4px;">
                <span style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 600;">Баланс:</span>
                <span class="badge" style="background: #fff0f6; color: var(--color-pink-deep); border: 1px solid var(--border-pink); padding: 3px 10px; border-radius: 99px; font-weight: 800; font-size: 0.85rem;" id="game-token-counter">
                  ${tokens} билетов
                </span>
                <span style="font-size: 0.8rem; color: var(--text-muted);">(1 билет = 1 игра)</span>
              </div>
            </div>
            <button class="modal-close-btn pressable" id="games-close-btn" aria-label="Закрыть игры">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <!-- ВКЛАДКИ ИГР -->
          <div style="display: flex; gap: 8px; margin-bottom: 22px; border-bottom: 1.5px solid var(--border-subtle); padding-bottom: 12px; overflow-x: auto;">
            <button class="menu-filter-btn ${activeTab === 'wheel' ? 'active' : ''} pressable" data-tab="wheel">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/></svg>
              <span>Колесо Фортуны</span>
            </button>
            <button class="menu-filter-btn ${activeTab === 'slots' ? 'active' : ''} pressable" data-tab="slots">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/><path d="M18 8h.01"/></svg>
              <span>Слоты</span>
            </button>
            <button class="menu-filter-btn ${activeTab === 'box' ? 'active' : ''} pressable" data-tab="box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
              <span>Подарочный бокс</span>
            </button>
          </div>

          <!-- ТЕЛО АКТИВНОЙ ИГРЫ -->
          <div id="game-active-stage"></div>

          <!-- КРАСИВЫЙ РОЗОВЫЙ БАННЕР ВЫИГРЫША -->
          <div id="game-win-banner" style="display: none; margin-top: 20px; padding: 18px 20px; border-radius: var(--radius-md); background: #fff0f6; border: 2px solid var(--color-pink); text-align: center; box-shadow: var(--shadow-sm); animation: toastSlideIn 0.3s ease;">
            <div style="font-size: 0.82rem; font-weight: 800; color: var(--color-blue); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 2px;">
              Поздравляем!
            </div>
            <h3 style="font-size: 1.25rem; color: var(--color-pink-deep); font-weight: 900; margin-bottom: 4px;" id="win-title">
              Победа!
            </h3>
            <p style="font-size: 0.9rem; color: var(--text-primary);" id="win-desc"></p>
          </div>
        </div>
      </div>
    `;

    const backdrop = container.querySelector('#games-modal-backdrop');
    const closeBtn = container.querySelector('#games-close-btn');

    closeBtn.addEventListener('click', () => backdrop.classList.remove('active'));
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.classList.remove('active');
    });

    container.querySelectorAll('[data-tab]').forEach((tabBtn) => {
      tabBtn.addEventListener('click', () => {
        if (isPlaying) return;
        activeTab = tabBtn.dataset.tab;
        sounds.playTick();
        render();
        openModal();
      });
    });

    const stage = container.querySelector('#game-active-stage');
    if (activeTab === 'wheel') renderWheelGame(stage);
    if (activeTab === 'slots') renderSlotsGame(stage);
    if (activeTab === 'box') renderBoxGame(stage);
  }

  function openModal() {
    const backdrop = container.querySelector('#games-modal-backdrop');
    if (backdrop) backdrop.classList.add('active');
  }

  function checkTicketsOrAlert() {
    if (store.getTokens() < 1) {
      onShowToast('Недостаточно билетов для игры. Пейте кофе или используйте промокоды кофейни.', 'error');
      sounds.playReelStop();
      return false;
    }
    return true;
  }

  // ==========================================================================
  // 1. КЛАССИЧЕСКОЕ КРУТОЕ КОЛЕСО ФОРТУНЫ (КАК В ШОУ / ЯРКОЕ И ПОНЯТНОЕ)
  // ==========================================================================
  function renderWheelGame(stage) {
    const sectors = [
      { label: '-50%', bg: '#fd86b6', color: '#ffffff', type: 'coupon', code: 'FORTUNE-50', title: 'Скидка 50% на заказ', desc: 'Суперприз Колеса Фортуны добавлен в купоны!' },
      { label: 'КОФЕ', bg: '#ffffff', color: '#1e4078', type: 'coupon', code: 'FREE-COFFEE', title: 'Бесплатный кофе', desc: 'Купон на любой авторский кофе сохранен!' },
      { label: '+10', bg: '#1e4078', color: '#ffffff', type: 'tokens', amount: 10, title: '+10 Билетов', desc: 'Начислено 10 дополнительных билетов!' },
      { label: '-20%', bg: '#fee8f5', color: '#f43f86', type: 'coupon', code: 'FORTUNE-20', title: 'Скидка 20% на напиток', desc: 'Скидка 20% сохранена в ваш профиль!' },
      { label: 'СИРОП', bg: '#f43f86', color: '#ffffff', type: 'coupon', code: 'FREE-SYRUP', title: 'Сироп в подарок', desc: 'Купон на бесплатный лавандовый сироп!' },
      { label: '+5', bg: '#ffffff', color: '#fd86b6', type: 'tokens', amount: 5, title: '+5 Билетов', desc: 'Возврат билетов с бонусом: +5 попыток!' },
      { label: '-30%', bg: '#3b80c5', color: '#ffffff', type: 'coupon', code: 'FORTUNE-30', title: 'Скидка 30% на десерт', desc: 'Скидка 30% на свежую выпечку добавлена!' },
      { label: 'КРУАССАН', bg: '#fee8f5', color: '#1e4078', type: 'coupon', code: 'FREE-CROISSANT', title: 'Круассан в подарок', desc: 'Хрустящий масляный круассан к кофе!' }
    ];

    const R = 46;
    const cx = 50, cy = 50;
    const sectorAngle = 360 / sectors.length;

    const pathsSvg = sectors.map((s, i) => {
      const a1 = (i * sectorAngle) * Math.PI / 180;
      const a2 = ((i + 1) * sectorAngle) * Math.PI / 180;
      const x1 = (cx + R * Math.sin(a1)).toFixed(2);
      const y1 = (cy - R * Math.cos(a1)).toFixed(2);
      const x2 = (cx + R * Math.sin(a2)).toFixed(2);
      const y2 = (cy - R * Math.cos(a2)).toFixed(2);
      const midA = (i * sectorAngle + sectorAngle / 2).toFixed(1);

      return `
        <path d="M ${cx} ${cy} L ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2} Z" fill="${s.bg}" stroke="#ffffff" stroke-width="0.8" />
        <g transform="rotate(${midA} ${cx} ${cy})">
          <text x="${cx}" y="20" text-anchor="middle" font-size="4.6" font-weight="900" fill="${s.color}" font-family="system-ui, sans-serif" letter-spacing="-0.02em">${s.label}</text>
        </g>
      `;
    }).join('');

    const pegsSvg = Array.from({ length: 16 }).map((_, k) => {
      const a = (k * 22.5) * Math.PI / 180;
      const px = (cx + 48.2 * Math.sin(a)).toFixed(2);
      const py = (cy - 48.2 * Math.cos(a)).toFixed(2);
      return `<circle cx="${px}" cy="${py}" r="1.4" fill="#ffffff" stroke="#f43f86" stroke-width="0.6"/>`;
    }).join('');

    stage.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; position: relative; padding: 10px 0;">
        <!-- Стрелка-указатель сверху (Классический стоппер) -->
        <div id="wheel-pointer" style="position: absolute; top: -6px; z-index: 10; width: 0; height: 0; border-left: 14px solid transparent; border-right: 14px solid transparent; border-top: 24px solid var(--color-pink-deep); filter: drop-shadow(0 3px 5px rgba(0,0,0,0.35)); transition: transform 0.15s ease;"></div>

        <!-- Круг Колеса -->
        <div style="position: relative; width: 290px; height: 290px; margin: 10px 0 24px 0;">
          <svg id="wheel-disc" viewBox="0 0 100 100" style="width: 100%; height: 100%; border-radius: 50%; box-shadow: 0 12px 36px rgba(253, 134, 182, 0.3), 0 4px 12px rgba(0,0,0,0.08); transform: rotate(${currentWheelDeg}deg); transition: transform 4s cubic-bezier(0.12, 0.95, 0.2, 1);">
            <!-- Внешний обод с заклепками (сочный розовый цвет Бурмалды) -->
            <circle cx="50" cy="50" r="49" fill="none" stroke="var(--color-pink-deep)" stroke-width="2.6" />
            
            <!-- 8 секторов -->
            ${pathsSvg}

            <!-- 16 заклепок по ободу -->
            ${pegsSvg}

            <!-- Центральная втулка-кнопка (КРУТИТЬ) -->
            <circle cx="50" cy="50" r="11" fill="#ffffff" stroke="#f43f86" stroke-width="1.8" style="cursor: pointer;" />
            <circle cx="50" cy="50" r="8.5" fill="#f43f86" style="cursor: pointer;" />
            <polygon points="50,45.5 51.5,48.5 55,49 52.5,51.5 53,55 50,53.2 47,55 47.5,51.5 45,49 48.5,48.5" fill="#ffffff"/>
          </svg>
        </div>

        <button class="btn-primary pressable" id="spin-wheel-btn" style="width: 260px; font-size: 1.05rem; padding: 13px 24px;">
          Крутить (1 билет)
        </button>
      </div>
    `;

    const spinBtn = stage.querySelector('#spin-wheel-btn');
    const disc = stage.querySelector('#wheel-disc');
    const pointer = stage.querySelector('#wheel-pointer');

    function doSpin() {
      if (isPlaying) return;
      if (!checkTicketsOrAlert()) return;

      store.spendToken(1);
      isPlaying = true;
      spinBtn.disabled = true;

      const wonIndex = Math.floor(Math.random() * sectors.length);
      const targetSectorMid = wonIndex * sectorAngle + sectorAngle / 2;
      const totalSpins = 6;
      
      // Вычисляем точный угол так, чтобы выбранный сектор встал ровно под верхнюю стрелку
      const targetDeg = 360 - targetSectorMid;
      const deltaDeg = (targetDeg - (currentWheelDeg % 360) + 360) % 360;
      const finalDeg = currentWheelDeg + totalSpins * 360 + deltaDeg;
      currentWheelDeg = finalDeg;

      disc.style.transform = `rotate(${finalDeg}deg)`;

      // Анимация трещотки стрелки и звук
      let ticksCount = 0;
      const tickInterval = setInterval(() => {
        sounds.playTick();
        pointer.style.transform = (ticksCount % 2 === 0) ? 'rotate(10deg)' : 'rotate(-10deg)';
        ticksCount++;
      }, 130);

      setTimeout(() => {
        clearInterval(tickInterval);
        pointer.style.transform = 'rotate(0deg)';
        isPlaying = false;
        spinBtn.disabled = false;

        const prize = sectors[wonIndex];
        sounds.playWin();

        if (prize.type === 'coupon') {
          store.addCoupon({
            code: `${prize.code}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
            title: prize.title,
            date: new Date().toLocaleDateString('ru-RU'),
            tag: 'КОЛЕСО'
          });
        } else {
          store.addTokens(prize.amount);
        }

        showWinBanner(prize.title, prize.desc);
      }, 4000);
    }

    spinBtn.addEventListener('click', doSpin);
    disc.addEventListener('click', doSpin);
  }

  // ==========================================================================
  // 2. СЛОТЫ БАРИСТА (ПРОСТЫЕ, КРАСИВЫЕ, БЕЗ ЭМОДЗИ)
  // ==========================================================================
  function renderSlotsGame(stage) {
    const slotIcons = {
      diamond: `<svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="var(--color-pink-deep)" stroke-width="2"><path d="M6 3h12l4 6-10 12L2 9z"/></svg>`,
      cup: `<svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="var(--color-blue)" stroke-width="2"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>`,
      star: `<svg width="46" height="46" viewBox="0 0 24 24" fill="#fd86b6" stroke="var(--color-pink-deep)" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
      zap: `<svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="var(--color-pink-deep)" stroke-width="2.2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
      shield: `<svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="var(--color-blue-bright)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
    };

    const symbolKeys = ['diamond', 'cup', 'star', 'zap', 'shield'];

    stage.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; padding: 10px 0;">
        <!-- Корпус слот-машины -->
        <div style="display: flex; gap: 14px; margin: 10px 0 26px 0; background: #fff0f6; padding: 22px; border-radius: 24px; border: 2px solid var(--border-pink); box-shadow: var(--shadow-md);">
          <div class="slot-reel-box" id="reel-1" style="width: 86px; height: 110px; background: #ffffff; border-radius: 14px; display: flex; align-items: center; justify-content: center; border: 1.5px solid var(--border-subtle); box-shadow: inset 0 2px 8px rgba(0,0,0,0.06); overflow: hidden;">
            ${slotIcons.cup}
          </div>
          <div class="slot-reel-box" id="reel-2" style="width: 86px; height: 110px; background: #ffffff; border-radius: 14px; display: flex; align-items: center; justify-content: center; border: 1.5px solid var(--border-subtle); box-shadow: inset 0 2px 8px rgba(0,0,0,0.06); overflow: hidden;">
            ${slotIcons.diamond}
          </div>
          <div class="slot-reel-box" id="reel-3" style="width: 86px; height: 110px; background: #ffffff; border-radius: 14px; display: flex; align-items: center; justify-content: center; border: 1.5px solid var(--border-subtle); box-shadow: inset 0 2px 8px rgba(0,0,0,0.06); overflow: hidden;">
            ${slotIcons.star}
          </div>
        </div>

        <button class="btn-primary pressable" id="spin-slots-btn" style="width: 260px; font-size: 1.05rem; padding: 13px 24px;">
          Крутить слоты (1 билет)
        </button>
      </div>
    `;

    const spinBtn = stage.querySelector('#spin-slots-btn');
    const r1 = stage.querySelector('#reel-1');
    const r2 = stage.querySelector('#reel-2');
    const r3 = stage.querySelector('#reel-3');

    spinBtn.addEventListener('click', () => {
      if (isPlaying) return;
      if (!checkTicketsOrAlert()) return;

      store.spendToken(1);
      isPlaying = true;
      spinBtn.disabled = true;

      [r1, r2, r3].forEach((r) => r.classList.add('reel-spinning'));

      const sTimer = setInterval(() => {
        r1.innerHTML = slotIcons[symbolKeys[Math.floor(Math.random() * symbolKeys.length)]];
        r2.innerHTML = slotIcons[symbolKeys[Math.floor(Math.random() * symbolKeys.length)]];
        r3.innerHTML = slotIcons[symbolKeys[Math.floor(Math.random() * symbolKeys.length)]];
        sounds.playTick();
      }, 70);

      const roll = Math.random();
      let res1, res2, res3;
      if (roll < 0.22) {
        res1 = res2 = res3 = 'diamond';
      } else if (roll < 0.45) {
        res1 = res2 = res3 = 'cup';
      } else if (roll < 0.70) {
        res1 = res2 = 'star';
        res3 = 'zap';
      } else {
        res1 = 'cup'; res2 = 'star'; res3 = 'shield';
      }

      setTimeout(() => {
        r1.classList.remove('reel-spinning');
        r1.classList.add('reel-bounce-stop');
        r1.innerHTML = slotIcons[res1];
        sounds.playReelStop();
      }, 1200);

      setTimeout(() => {
        r2.classList.remove('reel-spinning');
        r2.classList.add('reel-bounce-stop');
        r2.innerHTML = slotIcons[res2];
        sounds.playReelStop();
      }, 1600);

      setTimeout(() => {
        clearInterval(sTimer);
        r3.classList.remove('reel-spinning');
        r3.classList.add('reel-bounce-stop');
        r3.innerHTML = slotIcons[res3];
        sounds.playReelStop();

        isPlaying = false;
        spinBtn.disabled = false;

        if (res1 === 'diamond' && res2 === 'diamond' && res3 === 'diamond') {
          sounds.playWin();
          store.addCoupon({
            code: 'SLOTS-JACKPOT50',
            title: 'ДЖЕКПОТ: Скидка 50% на заказ',
            date: new Date().toLocaleDateString('ru-RU'),
            tag: 'СЛОТЫ'
          });
          showWinBanner('ДЖЕКПОТ: 3 КРИСТАЛЛА!', 'Скидка 50% на весь заказ добавлена в ваши купоны!');
        } else if (res1 === 'cup' && res2 === 'cup' && res3 === 'cup') {
          sounds.playWin();
          store.addCoupon({
            code: 'SLOTS-COFFEE25',
            title: 'Скидка 25% на авторский кофе',
            date: new Date().toLocaleDateString('ru-RU'),
            tag: 'СЛОТЫ'
          });
          showWinBanner('3 ЧАШКИ В РЯД!', 'Скидка 25% на любой кофе сохранена!');
        } else if (res1 === res2 || res2 === res3) {
          sounds.playWin();
          store.addTokens(5);
          showWinBanner('Пара совпала!', 'Вы вернули билет и получили +5 бонусных попыток!');
        } else {
          showWinBanner('Попробуйте снова', 'Комбинация не совпала. Сделайте еще один спин!');
        }
      }, 2000);
    });
  }

  // ==========================================================================
  // 3. ПОДАРОЧНЫЙ БОКС (3D РОЗОВЫЕ КОРОБКИ С БАНТАМИ)
  // ==========================================================================
  function renderBoxGame(stage) {
    stage.innerHTML = `
      <div style="text-align: center; padding: 10px 0;">
        <div style="display: flex; justify-content: center; gap: 24px; margin: 16px 0 26px 0;">
          ${[1, 2, 3].map((num) => `
            <div class="mystery-box-item pressable" data-box="${num}" style="width: 104px; height: 114px; position: relative; cursor: pointer; perspective: 600px;">
              <!-- Крышка коробки в фирменном сочном розовом цвете с белым бантом -->
              <div class="box-lid" id="lid-${num}" style="position: absolute; top: 0; left: 0; right: 0; height: 32px; background: var(--color-pink-deep); border-radius: 8px 8px 0 0; border: 2px solid #ffffff; box-shadow: 0 4px 10px rgba(253, 134, 182, 0.35); z-index: 5;">
                <div style="position: absolute; top: 50%; left: 0; right: 0; height: 6px; background: #ffffff; transform: translateY(-50%);"></div>
                <!-- Бант на крышке (SVG) -->
                <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); width: 22px; height: 14px; color: #ffffff;">
                  <svg viewBox="0 0 24 16" width="100%" height="100%" fill="currentColor"><path d="M12 8 C6 2, 2 6, 8 10 C10 11, 12 8, 12 8 C12 8, 14 11, 16 10 C22 6, 18 2, 12 8 Z"/></svg>
                </div>
              </div>

              <!-- Тело коробки на чистом CSS -->
              <div class="box-base" id="base-${num}" style="position: absolute; bottom: 0; left: 6px; right: 6px; height: 82px; background: #ffffff; border-radius: 0 0 12px 12px; border: 2px solid var(--border-pink); box-shadow: var(--shadow-sm); display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.4rem; color: var(--color-pink-deep);">
                <div style="position: absolute; top: 0; bottom: 0; width: 12px; background: var(--color-pink-soft);"></div>
                <span style="position: relative; z-index: 2;">#${num}</span>
              </div>

              <!-- Вылетающий приз внутри (чистый SVG вектор) -->
              <div class="box-prize-reveal" id="prize-${num}" style="position: absolute; top: 16px; left: 0; right: 0; text-align: center; display: none; z-index: 10;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-pink-deep)" stroke-width="2"><path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    stage.querySelectorAll('.mystery-box-item').forEach((boxEl) => {
      boxEl.addEventListener('mouseenter', () => {
        if (!isPlaying) boxEl.classList.add('mystery-box-shake');
      });
      boxEl.addEventListener('animationend', () => {
        boxEl.classList.remove('mystery-box-shake');
      });

      boxEl.addEventListener('click', () => {
        if (isPlaying) return;
        if (!checkTicketsOrAlert()) return;

        store.spendToken(1);
        isPlaying = true;
        const boxNum = boxEl.dataset.box;
        const lid = stage.querySelector(`#lid-${boxNum}`);
        const prizeReveal = stage.querySelector(`#prize-${boxNum}`);

        sounds.playTick();

        lid.classList.add('lid-flying');

        setTimeout(() => {
          prizeReveal.style.display = 'block';
          prizeReveal.classList.add('prize-emerging');
          sounds.playWin();

          const boxPrizes = [
            { title: 'Скидка 40% на заказ', desc: 'Вам достался главный подарок из бокса!', code: 'BOX-40', type: 'coupon' },
            { title: '+8 Билетов', desc: 'Целая пачка билетов возвращена на баланс!', amount: 8, type: 'tokens' },
            { title: 'Десерт бесплатно', desc: 'Купон на круассан или чизкейк добавлен в профиль!', code: 'BOX-DESSERT', type: 'coupon' }
          ];

          const won = boxPrizes[Math.floor(Math.random() * boxPrizes.length)];

          if (won.type === 'coupon') {
            store.addCoupon({
              code: `${won.code}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
              title: won.title,
              date: new Date().toLocaleDateString('ru-RU'),
              tag: 'БОКС'
            });
          } else {
            store.addTokens(won.amount);
          }

          showWinBanner(won.title, won.desc);
          isPlaying = false;
        }, 600);
      });
    });
  }

  function showWinBanner(title, desc) {
    const banner = container.querySelector('#game-win-banner');
    const tEl = container.querySelector('#win-title');
    const dEl = container.querySelector('#win-desc');
    const tokenCounter = container.querySelector('#game-token-counter');

    if (tEl) tEl.textContent = title;
    if (dEl) dEl.textContent = desc;
    if (tokenCounter) tokenCounter.textContent = `${store.getTokens()} билетов`;
    if (banner) banner.style.display = 'block';

    const globalCounter = document.querySelector('#header-ticket-counter');
    if (globalCounter) globalCounter.textContent = store.getTokens();
  }

  return {
    render,
    open: (initialTab) => {
      if (initialTab) activeTab = initialTab;
      render();
      openModal();
    }
  };
}
