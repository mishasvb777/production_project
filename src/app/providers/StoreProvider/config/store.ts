// по хорошему конфигурации держать рядом для чего это конфигурация пишется 
import { ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "./StateSchema";
import { counterReducer } from "entites/Counter/indext";
import { userReducer } from "entites/User";
import { loginReducer } from "features/AuthByUsername";

export function createReduxStore(initialState?: StateSchema) { // вынесим создание стора в отдельную функцию для того что мы могли переиспользовать ее, и например для storybook или для jest этот стор отдельно создавать
  const rootReducers: ReducersMapObject<StateSchema> = {// для корневого редьюсера (который объединяет все наши редьюсеры) создаем общий объект
    counter: counterReducer, 
    user: userReducer,
    loginForm: loginReducer
  }

  return configureStore<StateSchema>({
    reducer: rootReducers, 
    devTools: __IS_DEV__, // отключаенм девтулся для продакшена, а в дев режими оставлять
    preloadedState: initialState, // нужно напримре для инициализации стейста например для тестов, подготовитьт нужные данные 
  })
}



