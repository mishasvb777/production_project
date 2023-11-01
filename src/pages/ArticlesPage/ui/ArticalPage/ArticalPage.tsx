import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticalPage.module.scss'
import { memo, useCallback, useEffect } from 'react';
import { Article, ArticleList, ArticleView, ArticleViewSelector } from 'entites/Article';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlePageActions, articlePageReducer, getArticles } from '../../model/slices/articlePageSlice';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInititalEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { useSelector } from 'react-redux';
import { getArticlesPageError, getArticlesPageHasMore, getArticlesPageIsLoading, getArticlesPageNum, getArticlesPageView } from '../../model/selectors/articlesPageSelectors';
import { use } from 'i18next';
import { Page } from 'shared/ui/Page/Page';
import { fetchNextArticlePage } from 'pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlePage';

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
  console.log(articles)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const view = useSelector(getArticlesPageView)
  const error = useSelector(getArticlesPageError)
  const page = useSelector(getArticlesPageNum)
  const hasMore = useSelector(getArticlesPageHasMore)

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlePageActions.setView(view))
  }, [dispatch])


  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlePage())
  }, [dispatch, hasMore, page, isLoading]);

  // useInitialEffect(() => {
  //   dispatch(articlePageActions.initState());
  //   dispatch(fetchArticlesList({
  //       page: 1,
  //   }));
  // });

  useEffect(() => {    
    dispatch(articlePageActions.initState())
    dispatch(fetchArticlesList({
      page: 1
    }))   
  }, [view])
  
  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page onScrollEnd={onLoadNextPart} className={classNames(cls.ArticalPage, {}, [className])}>
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
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

