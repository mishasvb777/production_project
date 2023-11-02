// ЗДЕСЬ ДЕЛАЕМ СЛАЙС С ИСПОЛЬЗОВАНИЕМ НОРМАЛИЗАЦИИ ДАННЫХ

import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { Article, ArticleView } from "entites/Article";
import { ArticlesPageSchema } from "../types/articlesPageSchema";
import { fetchArticlesList } from "../services/fetchArticlesList/fetchArticlesList";
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from "shared/const/localstorage";

const articlesAdapter = createEntityAdapter<Article>({
  selectId:(article) => article.id
})

export const getArticles = articlesAdapter.getSelectors<StateSchema>( // getArticles будут хранится все селекторы данного слайса
  (state) => state.articlesPage || articlesAdapter.getInitialState()
)

const articlePageSlice = createSlice({
  name: 'articlePage',
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
    view: ArticleView.PLAYD,
    hasMore: true,
    page: 1,
    _inited: false
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload)
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
 
    initState: (state) => {
      const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView
      state.view = view;
      state.limit = view === ArticleView.LIST ? 4 : 9;
      state._inited = true;
    }
  },
  extraReducers: (builder) => { // редьюсеры для выполнения асинхронных операций
    builder
      //extraRedusers для получения статьи
      .addCase(fetchArticlesList.pending, (state, action) => { // состояние когда начал выполняться асинк экшен
        state.error = undefined;
        state.isLoading = true;       
      })        
      .addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.isLoading = false;
        articlesAdapter.addMany(state, action.payload)
        state.hasMore = action.payload.length > 0
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      })       
  },
})

export const { 
  reducer: articlePageReducer,
  actions: articlePageActions
} = articlePageSlice
