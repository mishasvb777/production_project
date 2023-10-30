import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticalDetailsPage.module.scss'
import ArticleDetails from 'entites/Article/ui/ArticleDetails/ArticleDetails';
import { useParams } from 'react-router-dom';
import Text from 'shared/ui/Text/Text';
import { CommentList } from 'entites/Comment';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slices/articleDetailsCommentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInititalEffect';
import { fetchCommentsByArticleId } from 'pages/ArticleDetailsPage/model/services/fetchCommetsByArticleId/fetchCommetsByArticleId';

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

  useInitialEffect( () => {
    dispatch(fetchCommentsByArticleId(id))
  })

  if(!id){
    return (
      <div className={classNames(cls.ArticalDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <ArticleDetails id={id}/>
        <Text className={cls.commentTitle} title={t('Комментарий')} />
        <CommentList isLoading={commentsIsLoading} comments={comments}/>
      </div>
    </DynamicModuleLoader>
    
  );
};

export default memo(ArticalDetailsPage);


