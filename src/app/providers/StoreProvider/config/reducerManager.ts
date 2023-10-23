import { AnyAction, Reducer, ReducersMapObject, combineReducers } from "@reduxjs/toolkit"
import { ReducerManager, StateSchema, StateSchemKey } from "./StateSchema"


export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>): ReducerManager {
  const reducers = { ...initialReducers } // на вход функция принимает дефолтные редьюсеры
  let combinedReducer = combineReducers(reducers) // потом с помощью combineReducers мы создаем корневой редьюсер
  let keysToRemove: Array<StateSchemKey> = [] // массив который хранит в себе название редьюсеров которые мы хотим удалить 

  return {
    getReducerMap: () => reducers, // getReducerMap функция которая просто возвращает редьюсеры 
    reduce: (state: StateSchema, action: AnyAction) => { // reduce - по сути и есть редьюсер аргументом принимает стейт и экшен 
      if (keysToRemove.length > 0) { // если в массиве для удаления есть какие то ключи, то мы эти ключи из стейта полностью удаляем 
        state = { ...state }
        for (let key of keysToRemove) {
          delete state[key]
        }
        keysToRemove = []
      }

      return combinedReducer(state, action) // затем возвращаем новый редьюсер в который передаем стейт уже без лишних ключей 
    },

    add: (key: StateSchemKey, reducer: Reducer) => {  // добавляет по ключу новый редьюсер
      if (!key || reducers[key]) {
        return
      }
      reducers[key] = reducer
      combinedReducer = combineReducers(reducers)
    },

    remove: (key: StateSchemKey)  => { // добавляет ключ в массив и удаляет этот ключ из редьюсера
      if (!key || !reducers[key]) {
        return
      }
      delete reducers[key]
      keysToRemove.push(key)
      combinedReducer = combineReducers(reducers)
    }
  }
}

