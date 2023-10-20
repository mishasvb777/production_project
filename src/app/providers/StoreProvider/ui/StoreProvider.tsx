// по сути этот провадер нужен для того что бы мы могли связать редакс с реактом 
// что бы мы в наших реакт компонентов могли использовать редакс
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';
import { StateSchema } from '../config/StateSchema';
import { DeepPartial } from '@reduxjs/toolkit';

interface StoreProviderProps {
  children?: ReactNode,
  initialState? : DeepPartial<StateSchema>
}

const StoreProvider = ({children, initialState} : StoreProviderProps) => {

  const store = createReduxStore(initialState as StateSchema)

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default StoreProvider;