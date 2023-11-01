import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticalDetailsPage.module.scss'
import ArticleDetails from 'entites/Article/ui/ArticleDetails/ArticleDetails';
import { useNavigate, useParams } from 'react-router-dom';
import Text from 'shared/ui/Text/Text';
import { CommentList } from 'entites/Comment';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slices/articleDetailsCommentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInititalEffect';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommetsByArticleId/fetchCommetsByArticleId';
import { AddCommentForm } from 'features/AddCommentForm';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { RoutePatch } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'shared/ui/Page/Page';

interface ArticalDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
}

const ArticalDetailsPage = ({className}: ArticalDetailsPageProps) => {
  const { t } = useTranslation('article')
  const { id } = useParams<{id: string}>() // c помощью этого хука можно выцеплять значения из строки запроса  
  const comments = useSelector(getArticleComments.selectAll) // здесь вытаскиваем те самые селекторы комментов которые инициализировали в слайсе
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onBackToList = useCallback(() => {
    navigate(RoutePatch.articles)
  }, [navigate])

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text))
    // dispatch(fetchCommentsByArticleId(id)) вариант автоматического обновления комментов при добавлении
  }, [dispatch])

  useInitialEffect( () => {
    dispatch(fetchCommentsByArticleId(id))
  })

  if(!id){
    return (
      <Page className={classNames(cls.ArticalDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </Page>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <Button theme={ThemeButton.OUTLINE} onClick={onBackToList}>
          {t('Назад к списку')}
        </Button>
        <ArticleDetails id={id}/>        
        <Text className={cls.commentTitle} title={t('Комментарий')} />
        <AddCommentForm onSendComment={onSendComment}/>
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </Page>
    </DynamicModuleLoader>
    
  );
};

export default memo(ArticalDetailsPage);


