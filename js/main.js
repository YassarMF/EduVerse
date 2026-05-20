/**
 * main.js - EduVerse V3 Global Logic
 * Handles localStorage state management with a single JSON object.
 */

const STORAGE_KEY = 'edu_user';

const AppState = {
  
  // Get User Object safely
  getUser: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return null;
      return JSON.parse(data);
    } catch (e) {
      console.error("Error parsing user data:", e);
      return null;
    }
  },

  // Save User Object
  saveUser: (userData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } catch (e) {
      console.error("Error saving user data:", e);
    }
  },

  // Initialize new user
  initUser: (username) => {
    const newUser = {
      username: username,
      xp: 0,
      level: 1,
      history: [],
      avatar: 'fa-user-astronaut' // Default icon
    };
    AppState.saveUser(newUser);
    return newUser;
  },

  // Add XP and handle leveling
  addXP: (amount) => {
    let user = AppState.getUser();
    if (!user) return;

    user.xp += amount;
    
    // Level formula: Level = floor(0.1 * sqrt(XP)) + 1
    const newLevel = Math.floor(0.1 * Math.sqrt(user.xp)) + 1;
    let leveledUp = false;

    if (newLevel > user.level) {
      user.level = newLevel;
      leveledUp = true;
    }

    AppState.saveUser(user);
    return { user, leveledUp };
  },

  // Add History
  addHistory: (minutes) => {
    let user = AppState.getUser();
    if (!user) return;

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Check if we already have an entry for today
    const existingEntry = user.history.find(h => h.date === today);
    if (existingEntry) {
      existingEntry.minutes += minutes;
    } else {
      user.history.push({ date: today, minutes: minutes });
    }

    AppState.saveUser(user);
  },

  // Get Progress Percent for current level
  getProgressPercent: () => {
    const user = AppState.getUser();
    if (!user) return 0;
    
    const xp = user.xp;
    const currentLevel = user.level;
    const nextLevel = currentLevel + 1;
    
    // Reverse the formula to find XP required for current and next level
    // Level = 0.1 * sqrt(XP) + 1  => (Level - 1)/0.1 = sqrt(XP) => XP = ((Level - 1)*10)^2
    
    const currentLevelXP = Math.pow((currentLevel - 1) * 10, 2);
    const nextLevelXP = Math.pow((nextLevel - 1) * 10, 2);
    
    const xpRequiredForNext = nextLevelXP - currentLevelXP;
    const currentProgressXP = xp - currentLevelXP;
    
    let percentage = (currentProgressXP / xpRequiredForNext) * 100;
    return Math.min(Math.max(percentage, 0), 100); // clamp 0-100
  },

  // Logout
  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.href = 'login.html';
  },

  // Protect page
  protectPage: () => {
    if (!AppState.getUser()) {
      window.location.href = 'login.html';
    }
  }
};

// UI Helpers
const UI = {
  showToast: (message, type = 'success', xpGained = null) => {
    const toast = document.createElement('div');
    const borderColor = type === 'success' ? 'border-emerald-500' : 'border-zinc-500';
    const icon = type === 'success' ? 'fa-check-circle text-emerald-400' : 'fa-info-circle text-zinc-400';
    
    let content = `
      <div class="flex items-center gap-3">
        <i class="fa-solid ${icon} text-xl"></i>
        <div class="flex flex-col">
          <span class="font-medium text-zinc-200 text-sm">${message}</span>
          ${xpGained ? `<span class="text-xs font-bold text-emerald-400">+${xpGained} XP</span>` : ''}
        </div>
      </div>
    `;

    toast.className = `fixed bottom-6 right-6 bg-zinc-900 border-l-4 ${borderColor} px-5 py-4 rounded shadow-2xl z-50 toast-enter`;
    toast.innerHTML = content;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translate3d(100%, 0, 0)';
      toast.style.transition = 'all 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }
};
