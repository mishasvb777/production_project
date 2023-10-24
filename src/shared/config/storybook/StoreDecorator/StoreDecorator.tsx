import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import 'app/styles/index.scss';
import { profileReducer } from 'entites/Profile';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

// так как у нас есть асинхронные редьюсеры, нам так же их надо добавить в декораторы для сторибука, для тех элементов которые эти редьюсеры используют, например LoginForm
const defaultAsyncreducers:ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer
}

export const StoreDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) => (StoryComponent: StoryFn) => (
  <StoreProvider initialState={state} asyncReducers={{...defaultAsyncreducers, ...asyncReducers}}>
      <StoryComponent />
  </StoreProvider>
)