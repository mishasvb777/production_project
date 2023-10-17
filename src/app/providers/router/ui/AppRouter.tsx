import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import PageLoader from 'widgets/PageLoader/ui/PageLoader'

const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      {/* Suspense позволяет отложить рендеринг определенной
    части компонента или даже целого компонента, пока данные для этой части не будут загружены. */}
      {/* Оборачиваем для того что в момент загрузки была какая та загрузка */}
      <Routes>
        {' '}
        {/* здесь получаем объект наших роутов их routeConfig, достаем из него массив значений, и мапимся и отрисовываем страницы */}
        {Object.values(routeConfig).map(({ element, path }) => (
          <Route
            key={path}
            path={path}
            element={(
              <div className='page-wrapper'>
                {element}
              </div>
            )}
          />
        ))}
      </Routes>
    </Suspense>
  )
}

export default AppRouter
