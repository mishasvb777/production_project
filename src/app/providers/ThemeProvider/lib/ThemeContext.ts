import { createContext } from 'react'

export enum Theme { // перечисления для хранения списка тем
  LIGHT = 'light',
  DARK = 'dark'
}

export interface ThemeContextProps {
  theme?: Theme
  setTheme?: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps>({})

export const LOCAL_STORAGE_THEME_KEY = 'theme'// для того что бы сохранять значение выбранной темы, даже когда браузер закрывается
