import AboutPage from 'pages/AboutPage/ui/AboutPage'
import { MainPage } from 'pages/MainPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { type RouteProps } from 'react-router-dom'

// Сделаем перечеслинение внутри которого мы объявим список route
// это необходимо если мы захотим хранить информацию о маршрутах в стетйте редакса
export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about', 
  NOT_FOUND = 'not_found'
}

// Здесь сделаем путь до соответствующего компонента
export const RoutePatch: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.NOT_FOUND]: '*'
}

// Сами роуты, маршрут для них, компонент который должны отрисовыватьcя

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePatch.main,
    element: <MainPage />
  },
  [AppRoutes.ABOUT]: {
    path: RoutePatch.about,
    element: <AboutPage />
  }, 
  [AppRoutes.NOT_FOUND]: {
    path: RoutePatch.not_found,
    element: <NotFoundPage />
  },
}
