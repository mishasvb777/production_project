// необходим для того что бы асинхронно подгружать данные с сервера о пользователе
import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Profile } from "../../types/profile"


export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>( // User - это то что функция должна вернуть, а LoginUsernameProps это то что будет приниматься в качестве аргуементов, ThunkConfig<string> - описание конфига для thunk 
  'profile/fetchProfileData',
  async (_, {extra, rejectWithValue}) => { // thunkAPI - деструктуризируем и достаем от туда dispatch и extra и rejectWithValue
    try{      
      const response = await extra.api.get<Profile>('/profile') // extra.api - это экстра аргумент
      return response.data
    }
    catch(e) {
      console.log(e)
      return rejectWithValue('error') 
    }     
  }
)