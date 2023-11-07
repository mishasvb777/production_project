import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticalPage.module.scss'
import { memo, useCallback } from 'react';
import { ArticleList, ArticleView, ArticleViewSelector } from 'entites/Article';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlePageActions, articlePageReducer, getArticles } from '../../../model/slices/articlePageSlice';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInititalEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getArticlesPageError, getArticlesPageHasMore, getArticlesPageIsLoading, getArticlesPageNum, getArticlesPageView } from '../../../model/selectors/articlesPageSelectors';
import { Page } from 'widgets/Page/Page';
import { fetchNextArticlePage } from '../../../model/services/fetchNextArticlesPage/fetchNextArticlePage';
import { initArticlesPage } from '../../../model/services/initArticlesPage/initArticlesPage';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';

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
  const page = useSelector(getArticlesPageNum)
  const hasMore = useSelector(getArticlesPageHasMore)

 


  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlePage())
  }, [dispatch, hasMore, page, isLoading]);

  useInitialEffect(() => {
    dispatch(initArticlesPage())   
  });


  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page onScrollEnd={onLoadNextPart} className={classNames(cls.ArticalPage, {}, [className])}>
        <ArticlesPageFilters />
        <ArticleList 
          view={view} 
          isLoading = {isLoading}
          articles={articles} 
        />
      </Page>
    </DynamicModuleLoader>    
  );
};

export default memo(ArticalPage);

