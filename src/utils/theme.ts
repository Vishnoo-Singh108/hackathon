// Theme management utility
export type Theme = 'light' | 'dark' | 'system';

export class ThemeManager {
  private static instance: ThemeManager;
  private currentTheme: Theme = 'system';
  private readonly THEME_KEY = 'safeedu_theme';

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    // Load theme from localStorage or default to system
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    this.currentTheme = savedTheme || 'system';
    this.applyTheme(this.currentTheme);
  }

  private applyTheme(theme: Theme): void {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      // Use system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(systemPrefersDark ? 'dark' : 'light');
    } else {
      root.classList.add(theme);
    }
  }

  setTheme(theme: Theme): void {
    this.currentTheme = theme;
    localStorage.setItem(this.THEME_KEY, theme);
    this.applyTheme(theme);
    
    // Dispatch custom event for components to listen to
    window.dispatchEvent(new CustomEvent('themeChange', { detail: theme }));
  }

  getTheme(): Theme {
    return this.currentTheme;
  }

  toggleTheme(): void {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(this.currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    this.setTheme(nextTheme);
  }

  isDarkMode(): boolean {
    if (this.currentTheme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return this.currentTheme === 'dark';
  }
}

export const themeManager = ThemeManager.getInstance();