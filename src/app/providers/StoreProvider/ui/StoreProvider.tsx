// по сути этот провадер нужен для того что бы мы могли связать редакс с реактом 
// что бы мы в наших реакт компонентов могли использовать редакс
import { ReactNode, Reducer } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';
import { StateSchema } from '../config/StateSchema';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

interface StoreProviderProps {
  children?: ReactNode,
  initialState?: DeepPartial<StateSchema>,
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

const StoreProvider = ({children, initialState, asyncReducers} : StoreProviderProps) => {

  const navigate = useNavigate() // функиця необходима для того что бы программно можно было управлять роутингом, например полсе успешного входа переходить на страницу пользователя 

  const store = createReduxStore(initialState as StateSchema, asyncReducers as ReducersMapObject<StateSchema>, navigate) // здесь мы создаем сам стор ОСНОВНОЙ для всего приложения

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default StoreProvider;