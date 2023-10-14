import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';

const AppRouter = () => {
  return (    
    <Suspense fallback={<div>Loading...</div>}> 
    {/* Suspense позволяет отложить рендеринг определенной 
    части компонента или даже целого компонента, пока данные для этой части не будут загружены. */}
      {' '}
      {/* Оборачиваем для того что в момент загрузки была какая та загрузка*/}
      <Routes>
        {' '}
        {/* здесь получаем объект наших роутов их routeConfig, достаем из него массив значений, и мапимся и отрисовываем страницы*/}
        {Object.values(routeConfig).map( ({element, path}) => (
          <Route 
            key={path}            
            path={path}
            element={element}
          />
        ))}
      </Routes>
    </Suspense>    
  );
};

export default AppRouter;