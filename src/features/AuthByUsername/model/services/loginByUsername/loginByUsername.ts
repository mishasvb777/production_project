import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig, ThunkExtraArg } from "app/providers/StoreProvider/config/StateSchema"
import { User, userActions } from "entites/User"

import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage"

interface LoginUsernameProps{
  username: string,
  password: string
}

export const loginByUsername = createAsyncThunk<User, LoginUsernameProps, ThunkConfig<string>>( // User - это то что функция должна вернуть, а LoginUsernameProps это то что будет приниматься в качестве аргуементов, ThunkConfig<string> - описание конфига для thunk 
  'login/loginByUsername',
  async (authData, {dispatch, extra, rejectWithValue}) => { // thunkAPI - деструктуризируем и достаем от туда dispatch и extra и rejectWithValue
    try{      
      const response = await extra.api.post<User>('/login', authData) // extra.api - это экстра аргумент

      if(!response.data){
        throw new Error()
      }

      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
      dispatch(userActions.setAuthData(response.data))
      
      if(extra.navigate){
        extra.navigate('/about') // получается при вызове этой функции мы говорим что после успешного выполения запроса перевели на страницу about
      }
      
      return response.data
    }
    catch(e) {
      console.log(e)
      return rejectWithValue('error') 
    }     
  }
)