import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticalPage.module.scss'
import { memo, useCallback } from 'react';
import { Article, ArticleList, ArticleView, ArticleViewSelector } from 'entites/Article';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlePageActions, articlePageReducer, getArticles } from '../../model/slices/articlePageSlice';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInititalEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { useSelector } from 'react-redux';
import { getArticlesPageError, getArticlesPageIsLoading, getArticlesPageView } from '../../model/selectors/articlesPageSelectors';

interface ArticalPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesPage: articlePageReducer
}


const ArticalPage = ({className}: ArticalPageProps) => {
  const { t } = useTranslation('article')
  const dispatch = useAppDispatch();

  const articles = useSelector(getArticles.selectAll) // getArticles.selectAll - берет все селекторы из getArticles
  const isLoading = useSelector(getArticlesPageIsLoading)
  const view = useSelector(getArticlesPageView)
  const error = useSelector(getArticlesPageError)

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlePageActions.setView(view))
  }, [dispatch])


  useInitialEffect(() => {
   dispatch(fetchArticlesList()) 
   dispatch(articlePageActions.initState())
  })
  
  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.ArticalPage, {}, [className])}>
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList 
          view={view} 
          isLoading = {isLoading}
          articles={articles} 
        />
      </div>
    </DynamicModuleLoader>    
  );
};

export default memo(ArticalPage);

