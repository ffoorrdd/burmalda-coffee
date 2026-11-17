/**
 * STATE MANAGEMENT & LOCAL STORAGE
 * Реактивное состояние пользователя, баланса тикетов, чашек и инвентаря купонов
 * СТРОГО БЕЗ ЭМОДЗИ
 */

const STORAGE_KEYS = {
  USER: 'burmalda_user',
  COUPONS: 'burmalda_coupons',
  STORIES_READ: 'burmalda_stories_read',
  PROMO_USED: 'burmalda_promo_used'
};

const DEFAULT_USER = {
  user_id: 849204,
  username: 'burmalda_fan',
  first_name: 'Никита',
  created_at: '17.11.2026',
  coffee_month: 4,     // 4 из 6 чашек до бесплатного кофе
  coffee_total: 18,
  tokens: 15,          // 15 билетов на мини-игры
  isAuthenticated: true,
  avatar: 'assets/branding/logo_burmalda.png'
};

class Store {
  constructor() {
    this.listeners = new Set();
    this.state = {
      user: this._loadUser(),
      coupons: this._loadCoupons(),
      storiesRead: this._loadStoriesRead(),
      promosUsed: this._loadPromosUsed()
    };
  }

  _loadUser() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : { ...DEFAULT_USER };
    } catch {
      return { ...DEFAULT_USER };
    }
  }

  _loadCoupons() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COUPONS);
      return data ? JSON.parse(data) : [
        { id: 'c-welcome', code: 'WELCOME-50', title: 'Скидка 50% на первый заказ', date: '17.11.2026', tag: 'VIP' }
      ];
    } catch {
      return [];
    }
  }

  _loadStoriesRead() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STORIES_READ);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  _loadPromosUsed() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROMO_USED);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  _save() {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(this.state.user));
      localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(this.state.coupons));
      localStorage.setItem(STORAGE_KEYS.STORIES_READ, JSON.stringify(this.state.storiesRead));
      localStorage.setItem(STORAGE_KEYS.PROMO_USED, JSON.stringify(this.state.promosUsed));
    } catch (e) {
      console.error('LocalStorage write error', e);
    }
    this._notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  _notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  // --- МЕТОДЫ ПОЛЬЗОВАТЕЛЯ ---
  getUser() {
    return this.state.user;
  }

  getLoyaltyStatus() {
    const month = this.state.user.coffee_month || 0;
    if (month >= 25) {
      return { title: 'Кофейный гуру', discount: 10, nextTier: null, needed: 0 };
    }
    if (month >= 10) {
      return { title: 'Мастер обжарки', discount: 5, nextTier: 'Кофейный гуру (10%)', needed: 25 - month };
    }
    return { title: 'Бариста-любитель', discount: 0, nextTier: 'Мастер обжарки (5%)', needed: 10 - month };
  }

  login(userData) {
    this.state.user = {
      ...this.state.user,
      ...userData,
      isAuthenticated: true
    };
    this._save();
  }

  logout() {
    this.state.user.isAuthenticated = false;
    this._save();
  }

  // Симуляция покупки кофе через Т-Банк
  addCoffeeCup() {
    this.state.user.coffee_month = (this.state.user.coffee_month || 0) + 1;
    this.state.user.coffee_total = (this.state.user.coffee_total || 0) + 1;
    
    // Проверка на каждый 6-й кофе в подарок
    if (this.state.user.coffee_month % 6 === 0) {
      this.addCoupon({
        code: `FREE-CUP-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        title: 'Бесплатный 6-й кофе в подарок',
        date: new Date().toLocaleDateString('ru-RU'),
        tag: 'ПОДАРОК'
      });
    }

    this._save();
    return {
      month: this.state.user.coffee_month,
      isFreeCup: this.state.user.coffee_month % 6 === 0
    };
  }

  // Баланс тикетов (токенов)
  getTokens() {
    return this.state.user.tokens || 0;
  }

  spendToken(amount = 1) {
    if ((this.state.user.tokens || 0) < amount) {
      return false;
    }
    this.state.user.tokens -= amount;
    this._save();
    return true;
  }

  addTokens(amount = 1) {
    this.state.user.tokens = (this.state.user.tokens || 0) + amount;
    this._save();
  }

  // --- ПРОМОКОДЫ (СТРОГО БЕЗ ЭМОДЗИ) ---
  applyPromoCode(rawCode) {
    const code = rawCode.trim().toLowerCase();
    const used = this.state.promosUsed;

    if (code === 'фри10') {
      this.addTokens(100);
      return { success: true, message: 'Промокод «фри10» активирован: начислено 100 тикетов!' };
    }
    if (code === 'фри1') {
      if (used.includes('фри1')) {
        return { success: false, message: 'Промокод «фри1» уже был использован на этом аккаунте.' };
      }
      this.state.promosUsed.push('фри1');
      this.addTokens(10);
      this._save();
      return { success: true, message: 'Промокод «фри1» активирован: начислено 10 тикетов!' };
    }
    if (code === 'фри20') {
      if (used.includes('фри20')) {
        return { success: false, message: 'Промокод «фри20» уже был использован на этом аккаунте.' };
      }
      this.state.promosUsed.push('фри20');
      this.addTokens(20);
      this._save();
      return { success: true, message: 'Промокод «фри20» активирован: начислено 20 тикетов!' };
    }
    if (code === 'бурмалда' || code === 'burmalda') {
      if (used.includes(code)) {
        return { success: false, message: 'Промокод «бурмалда» уже использован.' };
      }
      this.state.promosUsed.push(code);
      this.addCoupon({
        code: 'BURMALDA-VIP',
        title: 'Скидка 25% на авторский напиток',
        date: new Date().toLocaleDateString('ru-RU'),
        tag: 'ПРОМО'
      });
      this._save();
      return { success: true, message: 'Купон на скидку 25% добавлен в ваш инвентарь!' };
    }

    return { success: false, message: 'Неверный или недействительный промокод.' };
  }

  // --- КУПОНЫ И ИНВЕНТАРЬ ---
  getCoupons() {
    return this.state.coupons;
  }

  addCoupon(coupon) {
    this.state.coupons.unshift({
      id: `c-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      ...coupon
    });
    this._save();
  }

  // --- СТОРИС ---
  isStoryRead(storyId) {
    return this.state.storiesRead.includes(storyId);
  }

  markStoryRead(storyId) {
    if (!this.state.storiesRead.includes(storyId)) {
      this.state.storiesRead.push(storyId);
      this._save();
    }
  }
}

export const store = new Store();
