import React, { Suspense, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import './styles/index.scss'
import { AboutPageAsync } from '../pages/AboutPage/AboutPage.async'
import { MainPageAsync } from '../pages/MainPage/MainPage.async'
import { Theme, ThemeContext } from './styles/theme/ThemeContext'
import { useTheme } from './styles/theme/useTheme'
import { classNames } from '../helpers/classNames/classNames'

const App = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      {/* Link нужен для того что бы переходить по указанным маршрутам */}
      <Link to={'/'}>Главная</Link>
      <Link to={'/about'}>О сайте</Link>

      <Suspense fallback={<div>Loading...</div>}>
        {' '}
        {/* Оборачиваем для того что в момент загрузки была какая та загрузка*/}
        <Routes>
          {' '}
          {/* все роуты которые есть в нашем приложение должны быть обернуты в компонент Routes*/}
          <Route path={'/about'} element={<AboutPageAsync />} />
          <Route path={'/'} element={<MainPageAsync />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
