// ЗДЕСЬ ДЕЛАЕМ СЛАЙС С ИСПОЛЬЗОВАНИЕМ НОРМАЛИЗАЦИИ ДАННЫХ

import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { Comment } from 'entites/Comment'
import { ArticleDetailsCommentsSchema } from "../types/ArticleDetailsCommentsSchema";
import { fetchCommentsByArticleId } from "../services/fetchCommetsByArticleId/fetchCommetsByArticleId";

const commentsAdapter = createEntityAdapter<Comment>({
  selectId:(comment) => comment.id
})

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>( // это селекторы которвые используется в компонентах
  (state) => state.articleDetailsComments || commentsAdapter.getInitialState()
)

const articleDetailsCommentsSlice = createSlice({
  name: 'articleDetailsCommentsSlice',
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {
    }
  }),
  reducers: {

  },
  extraReducers: (builder) => { // редьюсеры для выполнения асинхронных операций
    builder
      //extraRedusers для получения статьи
      .addCase(fetchCommentsByArticleId.pending, (state, action) => { // состояние когда начал выполняться асинк экшен
        state.error = undefined;
        state.isLoading = true;       
      })        
      .addCase(fetchCommentsByArticleId.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.isLoading = false;
        commentsAdapter.setAll(state, action.payload)
      })
      .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      })       
  },
})

export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice
