// необходим для того что бы асинхронно подгружать данные с сервера о пользователе
import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Article } from "entites/Article"
import { getArticlesPageLimit } from "../../selectors/articlesPageSelectors";

interface FetchArticlesListProps {
  page?: number;
}

export const fetchArticlesList = createAsyncThunk<Article[], FetchArticlesListProps, ThunkConfig<string>>( // Comment - это то что функция должна вернуть, string | undefined - первый аргумент который передается в функцию,  ThunkConfig<string> - описание конфига для thunk 
  'articlesPage/fetchArticlesList',
  async (props, {extra, rejectWithValue, getState}) => { // thunkAPI - деструктуризируем и достаем от туда dispatch и extra и rejectWithValue
    const { page = 1 } = props;
    const limit = getArticlesPageLimit(getState()) // функция getState() возвращает актуальный стейт
    
    try{      
      const response = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page
        }
      }) // extra.api - это экстра аргумент

      if(!response.data){
        throw new Error()
      }
      console.log(response.data)
      return response.data
    }
    catch(e) {
      return rejectWithValue('error') 
    }     
  }
)

