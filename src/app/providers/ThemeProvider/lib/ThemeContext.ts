import { createContext } from 'react'

export enum Theme { // перечисления для хранения списка тем
  LIGHT = 'app_light_theme',
  DARK = 'app_dark_theme'
}

export interface ThemeContextProps {
  theme?: Theme
  setTheme?: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps>({})

export const LOCAL_STORAGE_THEME_KEY = 'theme'// для того что бы сохранять значение выбранной темы, даже когда браузер закрывается
