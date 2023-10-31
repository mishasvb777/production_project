// Файл для асинхронной (ленивой) загрузки компонента
// для этого используется React.lazy и асинхронный импорт
import { lazy } from 'react'

export const ProfilePageAsync = lazy(async () => await new Promise(resolve => {
  // @ts-expect-error
  // ТАК НА РЕАЛЬНЫХ ПРОЕКТАХ ДЕЛАТЬ НЕ НАДО!!!
  setTimeout(() => { resolve(import('./ProfilePage')) }, 400) // код загружает компонент ProfilePage с задержкой в 1,5 секунды после загрузки страницы.
}))
