// необходим для того что бы асинхронно подгружать данные с сервера о пользователе
import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Article } from "entites/Article"

export const fetchArticlesList = createAsyncThunk<Article[], void, ThunkConfig<string>>( // Comment - это то что функция должна вернуть, string | undefined - первый аргумент который передается в функцию,  ThunkConfig<string> - описание конфига для thunk 
  'articlesPage/fetchArticlesList',
  async (_, {extra, rejectWithValue}) => { // thunkAPI - деструктуризируем и достаем от туда dispatch и extra и rejectWithValue
    
    try{      
      const response = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user'
        }
      }) // extra.api - это экстра аргумент

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