
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppRouter } from './providers/router'
import { Navbar } from 'widgets/Navbar'
import Sidebar from 'widgets/Sidebar/ui/Sidebar/Sidebar'
import { Suspense, useEffect, useState } from 'react'
import { Modal } from 'shared/ui/Modal/Modal'
import Counter from 'entites/Counter/ui/Counter'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAuthData, getUserInited, userActions } from 'entites/User'

const App = () => {
  const { theme } = useTheme()
  const dispatch = useDispatch()
  const inited = useSelector(getUserInited)

  useEffect(() => {
    dispatch(userActions.initAuthData())    
  }, [dispatch])

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">        
        <Navbar />
        <div className="content-page">
          <Sidebar />
          {inited && <AppRouter />}
        </div>
      </Suspense>
    </div>
  )
}

export default App
