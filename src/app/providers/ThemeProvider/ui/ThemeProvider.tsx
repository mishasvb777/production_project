// что бы работать с контекстом нам необходим провайдер, если мы обернем приложение в него
// то мы можем в любом компоненте иметь доступ к выбранной теме

import React, { type FC, useMemo, useState } from 'react'
import {
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  ThemeContext
} from '../lib/ThemeContext'

const defaultTheme =
  (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT

interface ThemeProviderProps {
  initialTheme?: Theme;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme) // состояния для изменения темы

  // в провайдер передается объект, тк как это ссылочный тип данных, будет передаваться ссылка, и реакт будет думать что передается каждый раз
  // новый объект, и будет перерисовывать этот компонент, по этому нужно обернуть useMemo

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme
    }),
    [theme]
  )

  return (
    // возвращаем из контекста провайдер, для него обязательное свойство value, это значение самого провайдера
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
