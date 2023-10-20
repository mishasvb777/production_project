// по хорошему конфигурации держать рядом для чего это конфигурация пишется 
import { configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "./StateSchema";
import { counterReducer } from "entites/Counter/indext";

export function createReduxStore(initialState?: StateSchema) { // вынесим создание стора в отдельную функцию для того что мы могли переиспользовать ее, и например для storybook или для jest этот стор отдельно создавать
  return configureStore<StateSchema>({
    reducer:{
      counter: counterReducer,
    }, 
    devTools: __IS_DEV__, // отключаенм девтулся для продакшена, а в дев режими оставлять
    preloadedState: initialState, // нужно напримре для инициализации стейста например для тестов, подготовитьт нужные данные 
  })
}



