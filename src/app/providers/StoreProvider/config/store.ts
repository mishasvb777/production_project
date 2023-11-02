// по хорошему конфигурации держать рядом для чего это конфигурация пишется 
import { CombinedState, Reducer, ReducersMapObject, configureStore, createReducer } from "@reduxjs/toolkit";
import { StateSchema, ThunkExtraArg } from "./StateSchema";
import { counterReducer } from "entites/Counter/indext";
import { userReducer } from "entites/User";
import { createReducerManager } from "./reducerManager";
import { $api } from "shared/api/api";
import { NavigateOptions, To } from "react-router-dom";
import { scrollSaveReducer } from "features/ScrollSave";

export function createReduxStore( // вынесим создание стора в отдельную функцию для того что мы могли переиспользовать ее, и например для storybook или для jest этот стор отдельно создавать
    initialState?: StateSchema, 
    asyncReducers?: ReducersMapObject<StateSchema>, 
  ) { 
  const rootReducers: ReducersMapObject<StateSchema> = {// для корневого редьюсера (который объединяет все наши редьюсеры) создаем общий объект, так же в корневом редьюсере мы оставляем только обязательные редьюсеры которые должны сразу подгружаться, асинхронные редьюсеры не добавляем 
    ...asyncReducers,
    counter: counterReducer, 
    user: userReducer,
    scrollSave: scrollSaveReducer   
  }

  const reducerManager = createReducerManager(rootReducers)

  const extraArg: ThunkExtraArg = { //extraArgument - это может быть абсолютно что угодно
    api: $api, // здесь передаем инстанс axios который мы сделали
  }

  const store = configureStore({    
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>, // при создании самого стора, необходимо передавать не сами редьюсеры, а необходимо вызывать функцию reduce у reducerManager, ЭТО ВАЖНО, необходимо для того что бы новые редьюсеры добавлялись
    devTools: __IS_DEV__, // отключаенм девтулся для продакшена, а в дев режими оставлять
    preloadedState: initialState, // нужно напримре для инициализации стейста например для тестов, подготовитьт нужные данные     
    middleware: getDefaultMiddleware => getDefaultMiddleware({ //e thunk api есть аргумент extra в который можно расположить любые вспомогательные функции, данные, как раз в этот аргумент мы инстанс нашего api будем помещать, что бы не импортировать его в каждый файл с thunk func
      thunk: { // thunk принимает некоторые опции в который мы экстра аргумент может передать 
        extraArgument: { //extraArgument - это может быть абсолютно что угодно
          api: $api, // здесь передаем инстанс axios который мы сделали
        }
      }
    })
  })

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'] // поулчаем тип диспатча который возвращается из функции createReduxStore




