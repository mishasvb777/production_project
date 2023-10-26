import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User, UserSchema } from '../types/user'
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage'

const initialState: UserSchema = {
  _inited: false // флаг который будет показывать что пользователь инициализован
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      setAuthData: (state, action: PayloadAction<User>) => { // редьюсер который будет добавлять данные о пользователе, и на основе их будет определять авторизован пользователь или нет
        state.authData = action.payload
      }, 
      initAuthData: (state) => { //уредьюсер который будет определять авторизован пользователь или при закрытии или открытии вкладки браузера    
        const user = localStorage.getItem(USER_LOCALSTORAGE_KEY)
        if(user){
          state.authData = JSON.parse(user);
        }      
        state._inited = true  
      },
      logout: (state) => { //редьюсер который будет очищать стейт и удалять токен из localstorage    
        state.authData = undefined;
        localStorage.removeItem(USER_LOCALSTORAGE_KEY)
      },
    },    
  },
)

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice