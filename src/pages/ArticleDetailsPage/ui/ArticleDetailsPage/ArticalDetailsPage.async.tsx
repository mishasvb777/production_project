// Файл для асинхронной (ленивой) загрузки компонента
// для этого используется React.lazy и асинхронный импорт
import { lazy } from 'react'

export const ArticalPageDetailsAsync = lazy(async () => await new Promise(resolve => {
  // @ts-expect-error
  // ТАК НА РЕАЛЬНЫХ ПРОЕКТАХ ДЕЛАТЬ НЕ НАДО!!!
  setTimeout(() => { resolve(import('./ArticalDetailsPage')) }, 1000) // код загружает компонент MainPage с задержкой в 1,5 секунды после загрузки страницы.
}))
