
import { Link } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import './styles/index.scss'
import { AboutPage } from 'pages/AboutPage/index'
import { MainPage } from 'pages/MainPage/index'
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme'
import { classNames } from 'shared/lib/classNames'
import { AppRouter } from './providers/router'
import { Navbar } from 'widgets/Navbar'

const App = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      {/* Link нужен для того что бы переходить по указанным маршрутам */}
      <Navbar />
      <AppRouter />      
    </div>
  )
}

export default App
