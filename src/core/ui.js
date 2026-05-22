import { AppState } from '@/core/state.js';

// ═══════════════════════════════════════════════════════════════
// UI HELPERS
// ═══════════════════════════════════════════════════════════════

export const UI = {
  /**
   * Show a toast notification
   */
  showToast(message, type = 'success', duration = 3500) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const icons = {
      success: '✅',
      error: '❌',
      xp: '⭐',
      info: 'ℹ️'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${icons[type] || '📢'}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-exit');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  /**
   * Show XP floating animation at position
   */
  showXPFloat(amount, x, y) {
    const el = document.createElement('div');
    el.className = 'xp-float';
    el.textContent = `+${amount} XP`;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  },

  /**
   * Render sidebar with user data (call on each protected page)
   */
  renderSidebar(activePage) {
    const user = AppState.getUser();
    if (!user) return;

    const sidebar = document.getElementById('app-sidebar');
    if (!sidebar) return;

    const xpForLevel = (level) => Math.pow(level * 10, 2);
    const currentLevel = Math.floor(0.1 * Math.sqrt(user.xp || 0)) + 1;
    const currentLevelXP = xpForLevel(currentLevel - 1);
    const nextLevelXP = xpForLevel(currentLevel);
    const progress = nextLevelXP - currentLevelXP > 0
      ? Math.min(((user.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100, 100)
      : 0;

    const navItems = [
      { id: 'dashboard', href: 'dashboard.html', icon: 'fa-compass', label: 'Dashboard' },
      { id: 'course', href: 'course.html', icon: 'fa-map', label: 'Materi Belajar' },
      { id: 'career', href: 'career.html', icon: 'fa-briefcase', label: 'Career Tracks' },
      { id: 'assistant', href: 'assistant.html', icon: 'fa-robot', label: 'AI Assistant' },
      { id: 'leaderboard', href: 'leaderboard.html', icon: 'fa-trophy', label: 'Leaderboard' }
    ];

    sidebar.innerHTML = `
      <div class="sidebar-logo">
        <div class="sidebar-logo-icon">
          <i class="fa-solid fa-rocket"></i>
        </div>
        <span class="sidebar-logo-text">EduVerse</span>
      </div>

      <div class="sidebar-user">
        <div class="sidebar-avatar">${user.activeAvatar || '🧑‍🚀'}</div>
        <div class="sidebar-username">${user.displayName || user.username}</div>
        <div class="sidebar-title" style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600; margin-bottom: 0.25rem;">${user.activeTitle || 'Explorer Baru'}</div>
        <div class="sidebar-school">${user.school || ''}</div>
        <div class="sidebar-stats">
          <span class="neo-badge neo-badge-purple">⚡ ${user.xp || 0} XP</span>
          <span class="neo-badge neo-badge-orange">
            <span class="streak-fire">🔥 ${user.streak || 1}</span>
          </span>
        </div>
      </div>

      <div class="sidebar-xp-section" style="padding-top: 1rem;">
        <div class="xp-bar-label">
          <span>Level ${currentLevel}</span>
          <span>${user.xp || 0} / ${nextLevelXP} XP</span>
        </div>
        <div class="xp-bar-container">
          <div class="xp-bar-fill" style="width: ${progress}%"></div>
        </div>
      </div>

      <nav class="sidebar-nav">
        ${navItems.map(item => `
          <a href="${item.href}" class="nav-link ${activePage === item.id ? 'active' : ''}">
            <i class="fa-solid ${item.icon}"></i>
            ${item.label}
          </a>
        `).join('')}
      </nav>

      <div class="sidebar-footer">
        <button onclick="window.EduVerse.logout()" class="neo-btn neo-btn-sm neo-btn-block" style="background: var(--card-pink);">
          <i class="fa-solid fa-right-from-bracket"></i> Keluar
        </button>
      </div>
    `;

    // Animate XP bar after render
    requestAnimationFrame(() => {
      const bar = sidebar.querySelector('.xp-bar-fill');
      if (bar) {
        bar.style.width = '0%';
        requestAnimationFrame(() => {
          bar.style.width = `${progress}%`;
        });
      }
    });
  },

  /**
   * Render mobile bottom navigation
   */
  renderMobileNav(activePage) {
    const nav = document.getElementById('mobile-nav');
    if (!nav) return;

    const items = [
      { id: 'dashboard', href: 'dashboard.html', icon: 'fa-compass', label: 'Home' },
      { id: 'course', href: 'course.html', icon: 'fa-map', label: 'Belajar' },
      { id: 'career', href: 'career.html', icon: 'fa-briefcase', label: 'Karir' },
      { id: 'assistant', href: 'assistant.html', icon: 'fa-robot', label: 'AI' },
      { id: 'leaderboard', href: 'leaderboard.html', icon: 'fa-trophy', label: 'Rank' }
    ];

    nav.innerHTML = `
      <div class="mobile-nav-links">
        ${items.map(item => `
          <a href="${item.href}" class="mobile-nav-link ${activePage === item.id ? 'active' : ''}">
            <i class="fa-solid ${item.icon}"></i>
            ${item.label}
          </a>
        `).join('')}
        <button onclick="window.EduVerse.logout()" class="mobile-nav-link" style="background: none; border: none; cursor: pointer; color: var(--danger); font-family: var(--font-heading); font-weight: 700; font-size: 0.75rem;">
          <i class="fa-solid fa-right-from-bracket"></i>
          Keluar
        </button>
      </div>
    `;
  }
};

