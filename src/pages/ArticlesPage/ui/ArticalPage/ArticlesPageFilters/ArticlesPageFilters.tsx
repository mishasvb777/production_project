import React, { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlesPageFilters.module.scss'
import { ArticleSortField, ArticleView, ArticleViewSelector } from 'entites/Article';
import { articlePageActions } from 'pages/ArticlesPage/model/slices/articlePageSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';

import { Select } from 'shared/ui/Select/Select';
import Card from 'shared/ui/Card/Card';
import Input from 'shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import { ArticleSortSelector } from 'entites/Article/ui/ArticleSortSelector/ArticleSortSelector';
import { getArticlesPageOrder, getArticlesPageSort, getArticlesPageView } from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { SortOrder } from 'shared/types';


interface ArticlesPageFiltersProps {
  className?: string
}

export const ArticlesPageFilters = memo(({className}: ArticlesPageFiltersProps) => {
  const {t} = useTranslation() 
  const view = useSelector(getArticlesPageView)

  const dispatch = useAppDispatch()

  const sort = useSelector(getArticlesPageSort)
  const order = useSelector(getArticlesPageOrder)


  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlePageActions.setView(view))
  }, [dispatch])

  const onChangeSort = useCallback((newSort: ArticleSortField) => {
    dispatch(articlePageActions.setSort(newSort))
  }, [dispatch])

  const onChangeOrder = useCallback((newOrder: SortOrder) => {
    dispatch(articlePageActions.setOrder(newOrder))
  }, [dispatch])

  return (
    <div className={classNames(cls.ArticlesPageFilters)}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector onChangeSort={onChangeSort} order={order} sort={sort} onChangeOrder={onChangeOrder}/>
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card className={cls.search}>
        <Input placeholder={t('Поиск')}/>
      </Card>
    </div>
  );
})
