// необходим для того что бы асинхронно обновлять данные о пользователе на сервере
import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Profile, ValidateProfileError } from "../../types/profile"
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm"
import { validateProfileData } from "../validateProfileData/validateProfileData"


export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>>( // User - это то что функция должна вернуть, а LoginUsernameProps это то что будет приниматься в качестве аргуементов, ThunkConfig<string> - описание конфига для thunk 
  'profile/updateProfileData',
  async (_, thunkAPI) => { // thunkAPI - деструктуризируем и достаем от туда dispatch и extra и rejectWithValue
    const {extra, rejectWithValue, getState} = thunkAPI

    const formData = getProfileForm(getState())

    
    const errors = validateProfileData(formData)

    if(errors.length) {
      return rejectWithValue(errors)
    } 

    try{      
      const response = await extra.api.put<Profile>(`/profile/${formData?.id}`, formData) // extra.api - это экстра аргумент, первый аргумент куда, вторым аргументом что передаем!!!

      if(!response.data){
        throw new Error()
      }

      return response.data
    }
    catch(e) {
      console.log(e)
      return rejectWithValue([ValidateProfileError.SERVER_ERROR]) 
    }     
  }
)