import AboutPage from 'pages/AboutPage/ui/AboutPage'
import { ArticalPageDetails } from 'pages/ArticleDetailsPage'
import { ArticalPage } from 'pages/ArticlesPage'

import { MainPage } from 'pages/MainPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { ProfilePage } from 'pages/ProfilePage'
import { type RouteProps } from 'react-router-dom'

//Безопасные роуты
export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
}

// Сделаем перечеслинение внутри которого мы объявим список route
// это необходимо если мы захотим хранить информацию о маршрутах в стетйте редакса
export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about', 
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLES_DETAILS = 'articles_details',
  //last
  NOT_FOUND = 'not_found'
}

// Здесь сделаем путь до соответствующего компонента
export const RoutePatch: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.ARTICLES]: '/articles',
  [AppRoutes.ARTICLES_DETAILS]: '/articles/', // + :id
  //last
  [AppRoutes.NOT_FOUND]: '*'
}

// Сами роуты, маршрут для них, компонент который должны отрисовыватьcя
export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePatch.main,
    element: <MainPage />
  },
  [AppRoutes.ABOUT]: {
    path: RoutePatch.about,
    element: <AboutPage />
  }, 
  [AppRoutes.PROFILE]: {
    path: RoutePatch.profile,
    element: <ProfilePage />,
    authOnly: true
  }, 
  [AppRoutes.ARTICLES]: {
    path: RoutePatch.articles,
    element: <ArticalPage />,
    authOnly: true
  }, 
  [AppRoutes.ARTICLES_DETAILS]: {
    path: `${RoutePatch.articles_details}:id` ,
    element: <ArticalPageDetails />,
    authOnly: true
  }, 
  //last
  [AppRoutes.NOT_FOUND]: {
    path: RoutePatch.not_found,
    element: <NotFoundPage />
  },
}
