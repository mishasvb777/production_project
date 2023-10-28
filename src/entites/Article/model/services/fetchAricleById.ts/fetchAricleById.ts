// необходим для того что бы асинхронно подгружать данные с сервера о пользователе
import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Article } from "../../types/article"


export const fetchArticleById = createAsyncThunk<Article, string, ThunkConfig<string>>( // User - это то что функция должна вернуть, а LoginUsernameProps это то что будет приниматься в качестве аргуементов, ThunkConfig<string> - описание конфига для thunk 
  'profile/fetchArticleById',
  async (articleId, {extra, rejectWithValue}) => { // thunkAPI - деструктуризируем и достаем от туда dispatch и extra и rejectWithValue
    try{      
      const response = await extra.api.get<Article>(`/articles/${articleId}`) // extra.api - это экстра аргумент

      if(!response.data){
        throw new Error()
      }

      return response.data
    }
    catch(e) {
      console.log(e)
      return rejectWithValue('error') 
    }     
  }
)