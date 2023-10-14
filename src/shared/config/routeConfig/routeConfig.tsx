import AboutPage from "pages/AboutPage/ui/AboutPage"
import { MainPage } from "pages/MainPage"
import { RouteProps } from "react-router-dom"

//Сделаем перечеслинение внутри которого мы объявим список route
//это необходимо если мы захотим хранить информацию о маршрутах в стетйте редакса
export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about'
}

//Здесь сделаем путь до соответствующего компонента 
export const RoutePatch: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about'
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
  }
}