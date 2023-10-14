//Отдельный хук для того что переключать тему

import { useContext } from 'react'
import {
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  ThemeContext,
} from '../lib/ThemeContext'

interface UseThemeResult {
  toggleTheme: () => void
  theme: Theme
}

//Хук для изменения темы приложения
export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext) // получаем то что мы передали через контекст

  const toggleTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    setTheme(newTheme)
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  }

  return { theme, toggleTheme }
}
