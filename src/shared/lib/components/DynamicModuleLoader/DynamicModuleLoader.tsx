// компонент который будет асинхронно подгружать редьюсеры 

import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemKey } from 'app/providers/StoreProvider/config/StateSchema';
import React, { FC, ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = { // этот тип нужен для той ситуации когда у нас в модуле не один редьюсер, а много редьюсеров
  [name in StateSchemKey]?: Reducer
}

type ReducersListEntry = [StateSchemKey, Reducer] // тип нужен для вытаскивания имени и редьюсера из ReducersList

interface DynamicModuleLoaderProps {  
  reducers: ReducersList;
  removeAfterUnmount?: boolean; // тип который будем указывать когда мы хотим удалять редьюсер полсе демонтирования, или наооборот оставлять
}

const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = ({children, reducers, removeAfterUnmount}) => {
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch();

   //в момент монтирования компонента мы с помощью reducerManager уазываем какой редьюсер необходимо добавить 
  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => { // в цикле проходимся по массиву reducers и для каждого выполняем функцию
      store.reducerManager.add(name, reducer)
      dispatch({type: `@INIT ${name} reducer`}) // это нужно для того что бы проверять когда у нас инициализируются редьюсеры
    })    
    
    return () => { // когда компонент уже не нужен, после демонтирования компонента, мы этот редьюсер снова удаляем 
      if(removeAfterUnmount){ // демонтируем редьюсер если передаем removeAfterUnmount в пропсы 
        Object.entries(reducers).forEach(([name, _]: ReducersListEntry) => { // в цикле проходимся по массиву reducers и для каждого выполняем функцию
          store.reducerManager.remove(name)
          dispatch({type: `@Destroy ${name} reducer`}) // это нужно для того что бы проверять когда у нас инициализируются редьюсеры
        })
      }
    }    
  }, [])

  return (
    <>
      {children}
    </>
  );
};

export default DynamicModuleLoader;

function dispatch(arg0: { type: string; }) {
  throw new Error('Function not implemented.');
}
