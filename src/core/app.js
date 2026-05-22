/**
 * ═══════════════════════════════════════════════════════════════
 * EduVerse — Core Application Logic (Facade)
 * ═══════════════════════════════════════════════════════════════
 */

import { AppState } from '@/core/state.js';
import { UI } from '@/core/ui.js';
import { ModuleData, getModuleMap, PythonData, UiUxData } from '@/features/courses/courses-data.js';

// ── Expose logout globally for onclick handlers ────────────────
window.EduVerse = {
  logout: () => AppState.logout()
};

export { AppState, UI, ModuleData, getModuleMap, PythonData, UiUxData };
