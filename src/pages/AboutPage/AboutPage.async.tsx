// Файл для асинхронной (ленивой) загрузки компонента
// для этого используется React.lazy и асинхронный импорт
import { lazy } from 'react'


export const AboutPageAsync = lazy( () => new Promise(resolve => {
  //@ts-ignore
  // ТАК НА РЕАЛЬНЫХ ПРОЕКТАХ ДЕЛАТЬ НЕ НАДО!!!
  setTimeout( () =>  resolve(import('./AboutPage')), 1500 )
}) )
