// Файл для асинхронной (ленивой) загрузки компонента
// для этого используется React.lazy и асинхронный импорт
import { FC, lazy } from 'react'
import { LoginFormProps } from './LoginForm'

export const LoginFormAsync = lazy<FC<LoginFormProps>>(async () => await new Promise(resolve => {
  
  // ТАК НА РЕАЛЬНЫХ ПРОЕКТАХ ДЕЛАТЬ НЕ НАДО!!!
  setTimeout(() => { resolve(import('./LoginForm')) }, 1500)
}))
 