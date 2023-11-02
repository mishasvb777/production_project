import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ScrollSaveSchema } from '../types/ScrollSaveSchema'



const initialState: ScrollSaveSchema = {
  scroll: {}
}

export const scrollSaveSlice = createSlice({
    name: 'scrollSaveSlice',
    initialState,
    reducers: {
      setScrollPosition: (state, {payload}: PayloadAction<{path: string; position: number}>) => { // редьюсер который меняет юзернейм, для того что бы принимать юзернейм из вне используем экшены, c помощью PayloadAction<string> мы можем определить какие данные мы ожидаем
        state.scroll[payload.path] = payload.position
      },      
    },  
  },  
)

export const { actions: scrollSaveActions } = scrollSaveSlice
export const { reducer: scrollSaveReducer } = scrollSaveSlice