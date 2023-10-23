// по хорошему конфигурации держать рядом для чего это конфигурация пишется 
import { DeepPartial, ReducersMapObject, configureStore, createReducer } from "@reduxjs/toolkit";
import { StateSchema } from "./StateSchema";
import { counterReducer } from "entites/Counter/indext";
import { userReducer } from "entites/User";
import { createReducerManager } from "./reducerManager";

export function createReduxStore(initialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) { // вынесим создание стора в отдельную функцию для того что мы могли переиспользовать ее, и например для storybook или для jest этот стор отдельно создавать
  const rootReducers: ReducersMapObject<StateSchema> = {// для корневого редьюсера (который объединяет все наши редьюсеры) создаем общий объект, так же в корневом редьюсере мы оставляем только обязательные редьюсеры которые должны сразу подгружаться, асинхронные редьюсеры не добавляем 
    ...asyncReducers,
    counter: counterReducer, 
    user: userReducer   
  }

  const reducerManager = createReducerManager(rootReducers)

  const store = configureStore<StateSchema>({
    reducer: reducerManager.reduce, // при создании самого стора, необходимо передавать не сами редьюсеры, а необходимо вызывать функцию reduce у reducerManager, ЭТО ВАЖНО, необходимо для того что бы новые редьюсеры добавлялись
    devTools: __IS_DEV__, // отключаенм девтулся для продакшена, а в дев режими оставлять
    preloadedState: initialState, // нужно напримре для инициализации стейста например для тестов, подготовитьт нужные данные     
  })

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store
}



