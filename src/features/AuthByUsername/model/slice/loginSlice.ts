import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { LoginSchema } from '../types/loginSchema'
import { loginByUsername } from '../services/loginByUsername/loginByUsername'

const initialState: LoginSchema = {
  username: '',
  password: '',
  isLoading: false  
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
      setUsername: (state, action: PayloadAction<string>) => { // редьюсер который меняет юзернейм, для того что бы принимать юзернейм из вне используем экшены, c помощью PayloadAction<string> мы можем определить какие данные мы ожидаем
        state.username = action.payload
      },
      setPassword: (state, action: PayloadAction<string>) => { // редьюсер который меняет пароль
        state.password = action.payload
      }  
    },   
    extraReducers: (builder) => {
      builder
        .addCase(loginByUsername.pending, (state, action) => { // состояние когда начал выполняться асинк экшен
          state.error = undefined;
          state.isLoading = true;
          
        })        
        .addCase(loginByUsername.fulfilled, (state, action) => {
          state.isLoading = false;
          
        })
        .addCase(loginByUsername.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload
        })        
    },
  },  
)

export const { actions: loginActions } = loginSlice
export const { reducer: loginReducer } = loginSlice