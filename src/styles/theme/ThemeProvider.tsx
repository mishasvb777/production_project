// что бы работать с контекстом нам необходим провайдер, если мы обернем приложение в него 
// то мы можем в любом компоненте иметь доступ к выбранной теме

import React, { FC, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

const ThemeProvider: FC = ({children}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme) // состояния для изменения темы

  
  // в провайдер передается объект, тк как это ссылочный тип данных, будет передаваться ссылка, и реакт будет думать что передается каждый раз
  // новый объект, и будет перерисовывать этот компонент, по этому нужно обернуть useMemo

  const defaultProps = useMemo(() => ({    
    theme: theme,
    setTheme: setTheme    
  }), [theme])

  return (
    // возвращаем из контекста провайдер, для него обязательное свойство value, это значение самого провайдера
    <ThemeContext.Provider value={defaultProps}> 
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;