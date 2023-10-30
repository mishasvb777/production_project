// описания схемы для ОБЩЕГО стора
import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { Axios, AxiosInstance } from "axios";
import { ArticleDetailsSchema } from "entites/Article";
import  { CounterSchema }  from "entites/Counter/indext";
import { ProfileSchema } from "entites/Profile";
import { UserSchema } from "entites/User";
import { LoginSchema } from "features/AuthByUsername";
import { AddCommentFormSchema } from "features/AddCommentForm";
import { ArticleDetailsCommentsSchema } from "pages/ArticleDetailsPage";
import { NavigateOptions, To } from "react-router-dom";


export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema; 

  //Асинхронные редьюсеры
  loginForm?: LoginSchema;
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema;
  articleDetailsComments?: ArticleDetailsCommentsSchema;
  addCommentForm?: AddCommentFormSchema
}

export type StateSchemKey = keyof StateSchema

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> { // EnhancedStore стандартный тип который нам возвращается при создании стора
  reducerManager: ReducerManager
}

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>, 
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>,
  add: (key: StateSchemKey, reducer: Reducer) => void,
  remove: (key: StateSchemKey) => void
}

export interface ThunkExtraArg { // тип для описания экстра аргументов которые передаем через мидлвары axios
  api: AxiosInstance;
  navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> { // этот тип для описания thunk 
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}