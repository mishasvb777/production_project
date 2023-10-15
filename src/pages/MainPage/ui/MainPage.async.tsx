// Файл для асинхронной (ленивой) загрузки компонента
// для этого используется React.lazy и асинхронный импорт
import { lazy } from 'react'


export const MainPageAsync = lazy( () => new Promise(resolve => {
  //@ts-ignore
  // ТАК НА РЕАЛЬНЫХ ПРОЕКТАХ ДЕЛАТЬ НЕ НАДО!!!
  setTimeout( () =>  resolve(import('./MainPage')), 1500 ) //код загружает компонент MainPage с задержкой в 1,5 секунды после загрузки страницы.
}) )