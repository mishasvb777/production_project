
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppRouter } from './providers/router'
import { Navbar } from 'widgets/Navbar'
import Sidebar from 'widgets/Sidebar/ui/Sidebar/Sidebar'
import { Suspense, useEffect, useState } from 'react'
import { Modal } from 'shared/ui/Modal/Modal'
import Counter from 'entites/Counter/ui/Counter'

const App = () => {
  const { theme } = useTheme()

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">        
        <Navbar />
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  )
}

export default App
