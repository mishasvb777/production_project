// необходим для того что бы асинхронно подгружать данные с сервера о пользователе
import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Article } from "entites/Article"
import { getArticlesPageHasMore, getArticlesPageInited, getArticlesPageIsLoading, getArticlesPageLimit, getArticlesPageNum } from "../../selectors/articlesPageSelectors";
import { articlePageActions } from "../../slices/articlePageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";
import { useSelector } from "react-redux";



export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>( // Comment - это то что функция должна вернуть, string | undefined - первый аргумент который передается в функцию,  ThunkConfig<string> - описание конфига для thunk 
  'articlesPage/initArticlesPage',
  async (_, {extra, rejectWithValue, getState, dispatch}) => { // thunkAPI - деструктуризируем и достаем от туда dispatch и extra и rejectWithValue
    const inited = getArticlesPageInited(getState())
    
    if(!inited) {
      dispatch(articlePageActions.initState());
      dispatch(fetchArticlesList({
          page: 1,
      }));
    } 
  }
)

