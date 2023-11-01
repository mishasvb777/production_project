// необходим для того что бы асинхронно подгружать данные с сервера о пользователе
import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Article } from "entites/Article"
import { getArticlesPageHasMore, getArticlesPageIsLoading, getArticlesPageLimit, getArticlesPageNum } from "../../selectors/articlesPageSelectors";
import { articlePageActions } from "../../slices/articlePageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";



export const fetchNextArticlePage = createAsyncThunk<void, void, ThunkConfig<string>>( // Comment - это то что функция должна вернуть, string | undefined - первый аргумент который передается в функцию,  ThunkConfig<string> - описание конфига для thunk 
  'articlesPage/fetchNextArticlesPage',
  async (_, {extra, rejectWithValue, getState, dispatch}) => { // thunkAPI - деструктуризируем и достаем от туда dispatch и extra и rejectWithValue
    const isLoading = getArticlesPageIsLoading(getState())
    const hasMore = getArticlesPageHasMore(getState())   
    const page = getArticlesPageNum(getState())

    if(hasMore && !isLoading) {
      dispatch(articlePageActions.setPage(page + 1))
      dispatch(fetchArticlesList({
        page: page + 1
      })) 
    }    
  }
)

