// Файл для асинхронной (ленивой) загрузки компонента
// для этого используется React.lazy и асинхронный импорт
import { lazy } from 'react'


export const MainPageAsync = lazy( () => new Promise(resolve => {
  //@ts-ignore
  setTimeout( () =>  resolve(import('./MainPage')), 1500 )
}) )
