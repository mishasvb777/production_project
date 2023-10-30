import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig, ThunkExtraArg } from "app/providers/StoreProvider/config/StateSchema"
import { Comment } from "entites/Comment"
import { getUserAuthData } from "entites/User"
import { getArticleDetailsData } from "entites/Article/model/selectors/articleDetails"
import { fetchCommentsByArticleId } from "../fetchCommetsByArticleId/fetchCommetsByArticleId"


export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>( // User - это то что функция должна вернуть, а LoginUsernameProps это то что будет приниматься в качестве аргуементов, ThunkConfig<string> - описание конфига для thunk 
  'articleDetails/addCommentForArticle',
  async (text, {dispatch, extra, rejectWithValue, getState}) => { // thunkAPI - деструктуризируем и достаем от туда dispatch и extra и rejectWithValue
    const userData = getUserAuthData(getState()) // получаем информацию о пользователе который отправляет комментарий
    const article = getArticleDetailsData(getState())

    if(!userData || !text || !article) {
      return rejectWithValue('no data')
    }

    try{      
      const response = await extra.api.post<Comment>('/comments', {
        articleId: article.id,
        userId: userData.id,
        body: text        
      }) // extra.api - это экстра аргумент

      if(!response.data){
        throw new Error()
      }
      dispatch(fetchCommentsByArticleId(article.id)) // автоматического обнеолвение списка комментов при добавлении нового

      return response.data
    }
    catch(e) {
      return rejectWithValue('error') 
    }     
  }
)