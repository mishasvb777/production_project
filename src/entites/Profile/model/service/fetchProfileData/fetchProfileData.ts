// необходим для того что бы асинхронно подгружать данные с сервера о пользователе
import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Profile } from "../../types/profile"


export const fetchProfileData = createAsyncThunk<Profile, string | undefined, ThunkConfig<string>>( // User - это то что функция должна вернуть, а LoginUsernameProps это то что будет приниматься в качестве аргуементов, ThunkConfig<string> - описание конфига для thunk 
  'profile/fetchProfileData',
  async (profileId, {extra, rejectWithValue}) => { // profileId - то для каого пользователя мы хотим получить профиль, thunkAPI - деструктуризируем и достаем от туда dispatch и extra и rejectWithValue
    try{      
      const response = await extra.api.get<Profile>(`/profile/${profileId}`) // extra.api - это экстра аргумент

      if(!response.data){
        throw new Error()
      }

      return response.data
    }
    catch(e) {
      return rejectWithValue('error') 
    }     
  }
)