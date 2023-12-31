import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import 'app/styles/index.scss';
import { articleDetailsReducer } from 'entites/Article/model/slice/articleDetailsSlice';
import { profileReducer } from 'entites/Profile';
import { getAddCommentFormText } from 'features/AddCommentForm/model/selectors/addCommentFormSelectors';
import { addCommentFormReducer } from 'features/AddCommentForm/model/slices/addCommentFormSlice';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { articleDetailsCommentsReducer } from 'pages/ArticleDetailsPage/model/slices/articleDetailsCommentSlice';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

// так как у нас есть асинхронные редьюсеры, нам так же их надо добавить в декораторы для сторибука, для тех элементов которые эти редьюсеры используют, например LoginForm
const defaultAsyncreducers:ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articleDetailsComments: articleDetailsCommentsReducer
}

export const StoreDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) => (StoryComponent: StoryFn) => (
  <StoreProvider initialState={state} asyncReducers={{...defaultAsyncreducers, ...asyncReducers}}>
      <StoryComponent />
  </StoreProvider>
)