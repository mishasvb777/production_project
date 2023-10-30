// необходим для того что бы асинхронно подгружать данные с сервера о пользователе
import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Comment } from "entites/Comment"

export const fetchCommentsByArticleId = createAsyncThunk<Comment[], string | undefined, ThunkConfig<string>>( // Comment - это то что функция должна вернуть, string | undefined - первый аргумент который передается в функцию,  ThunkConfig<string> - описание конфига для thunk 
  'articleDetails/fetchCommentsByArticleId',
  async (articleId, {extra, rejectWithValue}) => { // thunkAPI - деструктуризируем и достаем от туда dispatch и extra и rejectWithValue
    
    if(!articleId) {
      return rejectWithValue('error')
    }

    try{      
      const response = await extra.api.get<Comment[]>('/comments', {
        params: {
          articleId,
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