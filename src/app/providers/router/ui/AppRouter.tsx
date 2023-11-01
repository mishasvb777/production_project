import { Suspense, memo, useCallback, useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppRoutesProps, routeConfig } from 'shared/config/routeConfig/routeConfig'
import PageLoader from 'widgets/PageLoader/ui/PageLoader'
import { RequireAuth } from './RequireAuth'

const AppRouter = () => {

  const renderWithWrapper = useCallback((route: AppRoutesProps) => {

    const element = (
      <Suspense fallback={<PageLoader />}>
        {route.element}
      </Suspense>
    )
    
    return (
      <Route
        key={route.path}
        path={route.path}
        element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
      />
    )
  }, [])
  

  return (
    //   {/* Suspense позволяет отложить рендеринг определенной
    // части компонента или даже целого компонента, пока данные для этой части не будут загружены. */}
    //   {/* Оборачиваем для того что в момент загрузки была какая та загрузка */}
      <Routes>
        {' '}
        {/* здесь получаем объект наших роутов их routeConfig, достаем из него массив значений, и мапимся и отрисовываем страницы */}
        {Object.values(routeConfig).map(renderWithWrapper)}
        {/* {routes.map(({ element, path }) => (
          <Route
            key={path}
            path={path}
            element={(
              <div className='page-wrapper'>
                {element}
              </div>
            )}
          />
        ))} */}
      </Routes>
  )
}

export default memo(AppRouter)
