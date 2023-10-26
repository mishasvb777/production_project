// Отдельный хук для того что переключать тему

import { useContext } from 'react'
import {
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  ThemeContext
} from '../lib/ThemeContext'

interface UseThemeResult {
  toggleTheme: () => void
  theme: Theme
}

// Хук для изменения темы приложения
export function useTheme (): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext) // получаем то что мы передали через контекст

  const toggleTheme = () => {
    let newTheme: Theme;
    switch(theme) {
      case Theme.DARK: 
        newTheme = Theme.LIGHT
        break;
      case Theme.LIGHT: 
        newTheme = Theme.ORANGE
        break;
      case Theme.ORANGE: 
        newTheme = Theme.DARK
        break;
      default: 
        newTheme = Theme.LIGHT
        break;
    }

    setTheme?.(newTheme)
    document.body.className = newTheme; 
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)

  }

  return { theme: theme || Theme.LIGHT, toggleTheme }
}
