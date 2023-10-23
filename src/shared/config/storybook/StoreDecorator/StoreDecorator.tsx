import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { Decorator, StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import 'app/styles/index.scss';
import { profileReducer } from 'entites/Profile';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';

// так как у нас есть асинхронные редьюсеры, нам так же их надо добавить в декораторы для сторибука, для тех элементов которые эти редьюсеры используют, например LoginForm
const defaultAsyncreducers: DeepPartial<ReducersMapObject<StateSchema>> = {
  loginForm: loginReducer,
  profile: profileReducer
}

export const StoreDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>) => (StoryComponent: StoryFn) => (
  <StoreProvider initialState={state} asyncReducers={{...defaultAsyncreducers, ...asyncReducers}}>
      <StoryComponent />
  </StoreProvider>
)