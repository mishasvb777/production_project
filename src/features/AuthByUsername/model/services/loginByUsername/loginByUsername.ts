import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { User, userActions } from "entites/User"
import { t } from "i18next"
import i18n from "shared/config/i18n/i18n"
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage"

interface LoginUsernameProps{
  username: string,
  password: string
}

export const loginByUsername = createAsyncThunk<User, LoginUsernameProps, { rejectValue: string }>( // User - это то что функция должна вернуть, а LoginUsernameProps это то что будет приниматься в качестве аргуементов
  'login/loginByUsername',
  async (authData, thunkAPI) => {
    try{
      const response = await axios.post<User>('http://localhost:8000/login', authData)

      if(!response.data){
        throw new Error()
      }

      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
      thunkAPI.dispatch(userActions.setAuthData(response.data))

      return response.data
    }
    catch(e) {
      console.log(e)
      return thunkAPI.rejectWithValue(i18n.t('Вы ввели неверный логин или пароль')) 
    }     
  }
)