// необходим для того что бы асинхронно обновлять данные о пользователе на сервере
import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Profile } from "../../types/profile"
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm"


export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>( // User - это то что функция должна вернуть, а LoginUsernameProps это то что будет приниматься в качестве аргуементов, ThunkConfig<string> - описание конфига для thunk 
  'profile/updateProfileData',
  async (_, thunkAPI) => { // thunkAPI - деструктуризируем и достаем от туда dispatch и extra и rejectWithValue
    const {extra, rejectWithValue, getState} = thunkAPI

    const formData = getProfileForm(getState())
    
    try{      
      const response = await extra.api.put<Profile>('/profile', formData) // extra.api - это экстра аргумент
      return response.data
    }
    catch(e) {
      console.log(e)
      return rejectWithValue('error') 
    }     
  }
)