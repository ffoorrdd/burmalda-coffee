/**
 * STORIES COMPONENT (TELEGRAM / WHATSAPP STYLE)
 * Полноэкранный плеер с таймерами прогресса, свайпами и сохранением статуса просмотра
 */
import { STORIES_DATA } from '../data/storiesData.js';
import { store } from '../utils/storage.js';

export function renderStories(container) {
  let activeStoryIdx = -1;
  let activeSlideIdx = 0;
  let progressTimer = null;
  let isPaused = false;
  let progressVal = 0;

  function renderCarousel() {
    container.innerHTML = `
      <section class="stories-section container" aria-label="Сторис-новости">
        <div class="stories-carousel" id="stories-track" role="region" aria-label="Карусель историй">
          ${STORIES_DATA.map((story, idx) => {
            const isRead = store.isStoryRead(story.id);
            return `
              <button class="story-item ${isRead ? 'read' : ''}" data-idx="${idx}" aria-label="Открыть историю: ${story.title}">
                <div class="story-avatar-wrap ${!isRead ? 'story-ring-unread' : ''}">
                  <div class="story-avatar-inner">
                    <img src="${story.avatar}" alt="" class="story-avatar-img" width="68" height="68" loading="eager" />
                  </div>
                </div>
                <span class="story-title">${story.title}</span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- МОДАЛЬНЫЙ ПЛЕЕР СТОРИС -->
        <div class="stories-modal-backdrop" id="story-player-modal" role="dialog" aria-modal="true" aria-label="Просмотр истории">
          <div class="story-player-frame" id="story-frame">
            <!-- Верхние прогресс-бары -->
            <div class="story-progress-bar-container" id="story-bars"></div>

            <!-- Шапка сторис -->
            <div class="story-player-header">
              <div class="story-author-info">
                <img src="" alt="" class="story-author-avatar" id="player-avatar" />
                <div>
                  <div class="story-author-name" id="player-author"></div>
                  <div class="story-time-stamp" id="player-date"></div>
                </div>
              </div>
              <button class="story-close-btn pressable" id="player-close-btn" aria-label="Закрыть историю">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <!-- Зоны тапа для навигации -->
            <div class="story-tap-zones">
              <div class="story-tap-left" id="tap-prev" aria-label="Предыдущий слайд"></div>
              <div class="story-tap-right" id="tap-next" aria-label="Следующий слайд"></div>
            </div>

            <!-- Медиа контент -->
            <img src="" alt="" class="story-media-view" id="player-media" />

            <!-- Описание сторис -->
            <div class="story-caption-overlay">
              <h3 class="story-caption-title" id="player-caption-title"></h3>
              <p class="story-caption-text" id="player-caption-text"></p>
            </div>
          </div>
        </div>
      </section>
    `;

    // Привязка кликов по превью
    container.querySelectorAll('.story-item').forEach((item) => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.dataset.idx, 10);
        openStory(idx);
      });
    });

    // Навешивание обработчиков плеера
    const modal = container.querySelector('#story-player-modal');
    const closeBtn = container.querySelector('#player-close-btn');
    const tapPrev = container.querySelector('#tap-prev');
    const tapNext = container.querySelector('#tap-next');
    const frame = container.querySelector('#story-frame');

    closeBtn.addEventListener('click', closeStory);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeStory();
    });

    tapPrev.addEventListener('click', prevSlide);
    tapNext.addEventListener('click', nextSlide);

    // Пауза при удержании пальца/мыши
    frame.addEventListener('pointerdown', () => { isPaused = true; });
    frame.addEventListener('pointerup', () => { isPaused = false; });
    frame.addEventListener('pointercancel', () => { isPaused = false; });

    // Клавиатурная навигация
    window.addEventListener('keydown', (e) => {
      if (activeStoryIdx === -1) return;
      if (e.key === 'Escape') closeStory();
      if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    });
  }

  function openStory(storyIdx) {
    activeStoryIdx = storyIdx;
    activeSlideIdx = 0;
    progressVal = 0;
    const modal = container.querySelector('#story-player-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    renderCurrentSlide();
  }

  function closeStory() {
    activeStoryIdx = -1;
    clearInterval(progressTimer);
    const modal = container.querySelector('#story-player-modal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
    renderCarousel(); // Обновление статуса просмотрено
  }

  function renderCurrentSlide() {
    if (activeStoryIdx < 0 || activeStoryIdx >= STORIES_DATA.length) {
      closeStory();
      return;
    }

    const story = STORIES_DATA[activeStoryIdx];
    store.markStoryRead(story.id);

    const slide = story.slides[activeSlideIdx];
    if (!slide) {
      nextStory();
      return;
    }

    // Заполнение данных
    const avatar = container.querySelector('#player-avatar');
    const author = container.querySelector('#player-author');
    const date = container.querySelector('#player-date');
    const media = container.querySelector('#player-media');
    const title = container.querySelector('#player-caption-title');
    const text = container.querySelector('#player-caption-text');
    const barsContainer = container.querySelector('#story-bars');

    avatar.src = story.avatar;
    author.textContent = story.author;
    date.textContent = story.displayDate;
    media.src = slide.mediaUrl;
    title.textContent = slide.title;
    text.textContent = slide.caption;

    // Отрисовка полосок прогресса
    barsContainer.innerHTML = story.slides.map((_, i) => `
      <div class="story-progress-segment">
        <div class="story-progress-fill" id="p-fill-${i}" style="width: ${i < activeSlideIdx ? '100%' : '0%'}"></div>
      </div>
    `).join('');

    // Запуск таймера
    startProgressTimer(slide.duration || 5000);
  }

  function startProgressTimer(duration) {
    clearInterval(progressTimer);
    progressVal = 0;
    const interval = 50;
    const step = (interval / duration) * 100;

    progressTimer = setInterval(() => {
      if (isPaused) return;

      progressVal += step;
      const currentFill = container.querySelector(`#p-fill-${activeSlideIdx}`);
      if (currentFill) {
        currentFill.style.width = `${Math.min(100, progressVal)}%`;
      }

      if (progressVal >= 100) {
        nextSlide();
      }
    }, interval);
  }

  function nextSlide() {
    const story = STORIES_DATA[activeStoryIdx];
    if (activeSlideIdx < story.slides.length - 1) {
      activeSlideIdx++;
      renderCurrentSlide();
    } else {
      nextStory();
    }
  }

  function prevSlide() {
    if (activeSlideIdx > 0) {
      activeSlideIdx--;
      renderCurrentSlide();
    } else if (activeStoryIdx > 0) {
      activeStoryIdx--;
      activeSlideIdx = STORIES_DATA[activeStoryIdx].slides.length - 1;
      renderCurrentSlide();
    }
  }

  function nextStory() {
    if (activeStoryIdx < STORIES_DATA.length - 1) {
      activeStoryIdx++;
      activeSlideIdx = 0;
      renderCurrentSlide();
    } else {
      closeStory();
    }
  }

  renderCarousel();
}
