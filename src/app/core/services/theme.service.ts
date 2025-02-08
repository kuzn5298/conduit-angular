import { computed, inject, Injectable, signal } from '@angular/core';
import { PersistenceService } from './persistence.service';

const LOCAL_STORAGE_THEME_KEY = 'conduit-theme';
type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private persistenceService = inject(PersistenceService);
  private currentTheme = signal<Theme>('dark');
  getTheme = computed(() => this.currentTheme());

  constructor() {
    const savedTheme = this.persistenceService.get(
      LOCAL_STORAGE_THEME_KEY
    ) as Theme;
    this.setTheme(savedTheme ?? this.currentTheme());
  }

  setTheme(theme: Theme) {
    document.body.classList.remove(this.currentTheme());
    document.body.classList.add(theme);
    this.currentTheme.set(theme);
    this.persistenceService.set(LOCAL_STORAGE_THEME_KEY, theme);
  }

  toggleTheme() {
    this.setTheme(this.currentTheme() === 'light' ? 'dark' : 'light');
  }
}
