import {
  isFirebaseReady,
  getUserByUsername,
  createUser,
  getUserDoc,
  updateUserXP,
  addCompletedModule,
  addWeakness,
  updateStreak,
  updateUser,
  getUserByEmail
} from '@/config/firebase-config.js';


// ═══════════════════════════════════════════════════════════════
// LOCAL STORAGE CACHE
// ═══════════════════════════════════════════════════════════════

const STORAGE_KEY = 'eduverse_user';

export const AppState = {
  /**
   * Get cached user from localStorage
   */
  getUser() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return null;
      return JSON.parse(data);
    } catch (e) {
      console.error("Error reading user cache:", e);
      return null;
    }
  },

  /**
   * Save user data to localStorage cache
   */
  saveUser(userData) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } catch (e) {
      console.error("Error saving user cache:", e);
    }
  },

  /**
   * Clear user data and redirect to login
   */
  logout() {
    localStorage.removeItem(STORAGE_KEY);
    const basePath = window.location.pathname.includes('/pages/') ? '../' : './';
    window.location.href = basePath + 'index.html';
  },

  /**
   * Protect page — redirect to login if not authenticated
   */
  requireAuth() {
    if (!this.getUser()) {
      const basePath = window.location.pathname.includes('/pages/') ? '../' : './';
      window.location.href = basePath + 'index.html';
      return false;
    }
    return true;
  },

  /**
   * Login with email and password
   * @param {string} email 
   * @param {string} password 
   * @returns {Object} user data
   */
  async login(email, password) {
    if (!isFirebaseReady()) {
      throw new Error("Firebase not initialized");
    }

    const { auth, signInWithEmailAndPassword } = await import('@/config/firebase-config.js');

    // Authenticate with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const authUser = userCredential.user;

    // Use email prefix as username for fallback or creation
    const username = email.split('@')[0];

    // Check if user exists in Firestore by email first
    let user = await getUserByEmail(email);

    // Fallback: search by username if old user didn't have email saved
    if (!user) {
      user = await getUserByUsername(username);
    }

    if (user) {
      // Existing user — calculate streak
      const streak = this.calculateStreak(user.lastLogin, user.streak);
      user.streak = streak;
      
      // Update last login and streak in Firestore
      await updateStreak(user.id, streak);
      user.lastLogin = new Date().toISOString();
      
      this.saveUser(user);
      return user;
    } else {
      // New user — create in Firestore if they somehow registered without a document
      const newUser = await createUser(username, 'Belum diatur', email);
      this.saveUser(newUser);
      return newUser;
    }
  },

  /**
   * Register a new user with email and password
   * @param {string} email 
   * @param {string} password 
   * @param {string} name 
   * @param {string} school 
   * @returns {Object} user data
   */
  async register(email, password, name, school) {
    if (!isFirebaseReady()) {
      throw new Error("Firebase not initialized");
    }

    const { auth, createUserWithEmailAndPassword } = await import('@/config/firebase-config.js');

    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const authUser = userCredential.user;

    // Use name as username, fallback to email prefix
    const username = name || email.split('@')[0];
    const userSchool = school || 'Belum diatur';

    // Create user document in Firestore
    const newUser = await createUser(username, userSchool, email);
    this.saveUser(newUser);
    return newUser;
  },

  /**
   * Calculate streak based on last login
   */
  calculateStreak(lastLoginISO, currentStreak) {
    if (!lastLoginISO) return 1;

    const lastLogin = new Date(lastLoginISO);
    const today = new Date();

    // Reset time to midnight for comparison
    const lastDate = new Date(lastLogin.getFullYear(), lastLogin.getMonth(), lastLogin.getDate());
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Same day — keep current streak
      return currentStreak || 1;
    } else if (diffDays === 1) {
      // Consecutive day — increment streak
      return (currentStreak || 0) + 1;
    } else {
      // Streak broken — reset to 1
      return 1;
    }
  },

  /**
   * Add XP and sync to Firestore
   */
  async addXP(amount) {
    const user = this.getUser();
    if (!user) return;

    user.xp = (user.xp || 0) + amount;
    this.saveUser(user);

    if (isFirebaseReady() && user.id && !user.id.startsWith('local_')) {
      try {
        await updateUserXP(user.id, user.xp);
      } catch (e) {
        console.error("Failed to sync XP:", e);
      }
    }

    return user;
  },

  /**
   * Mark module as completed and sync
   */
  async completeModule(moduleId) {
    const user = this.getUser();
    if (!user) return;

    if (!user.completedModules) user.completedModules = [];
    if (!user.completedModules.includes(moduleId)) {
      user.completedModules.push(moduleId);
      this.saveUser(user);

      if (isFirebaseReady() && user.id && !user.id.startsWith('local_')) {
        try {
          await addCompletedModule(user.id, moduleId);
        } catch (e) {
          console.error("Failed to sync completed module:", e);
        }
      }
    }
  },

  /**
   * Record a weakness topic and sync
   */
  async recordWeakness(topic) {
    const user = this.getUser();
    if (!user) return;

    if (!user.weaknesses) user.weaknesses = [];
    if (!user.weaknesses.includes(topic)) {
      user.weaknesses.push(topic);
      this.saveUser(user);

      if (isFirebaseReady() && user.id && !user.id.startsWith('local_')) {
        try {
          await addWeakness(user.id, topic);
        } catch (e) {
          console.error("Failed to sync weakness:", e);
        }
      }
    }
  },

  /**
   * Refresh user data from Firestore
   */
  async refreshFromFirestore() {
    const user = this.getUser();
    if (!user || !isFirebaseReady() || !user.id || user.id.startsWith('local_')) return user;

    try {
      const freshData = await getUserDoc(user.id);
      if (freshData) {
        this.saveUser(freshData);
        return freshData;
      }
    } catch (e) {
      console.error("Failed to refresh from Firestore:", e);
    }
    return user;
  },

  /**
   * Initialize Global Study Timer
   */
  initStudyTimer() {
    let user = this.getUser();
    if (!user) return;

    // Tick every 5 seconds
    setInterval(() => {
      user = this.getUser(); // re-fetch
      if (!user) return;
      
      const today = new Date().toISOString().split('T')[0];
      if (!user.studyTime || user.studyTime.date !== today) {
        user.studyTime = { date: today, seconds: 0 };
      }
      
      user.studyTime.seconds += 5;
      this.saveUser(user);

      // Dispatch event for UI
      window.dispatchEvent(new CustomEvent('studyTimeUpdated', { detail: user.studyTime.seconds }));

      // Sync to firebase every 30 seconds
      if (user.studyTime.seconds % 30 === 0 && user.id) {
        import('@/config/firebase-config.js').then(module => {
          if (module.isFirebaseReady()) {
            module.updateUser(user.id, { studyTime: user.studyTime }).catch(err => console.error("Error syncing timer:", err));
          }
        });
      }
    }, 5000);
  }
};

// Start timer if user is logged in
if (AppState.getUser()) {
  AppState.initStudyTimer();
}


