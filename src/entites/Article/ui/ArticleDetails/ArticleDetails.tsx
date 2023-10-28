import React, { memo, useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetails.module.scss'
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { fetchArticleById } from '../../model/services/fetchAricleById.ts/fetchAricleById';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from 'entites/Article/model/selectors/articleDetails';
import  Text, { TextAlign, TextSize } from 'shared/ui/Text/Text'
import { t } from 'i18next';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import TestIcon from 'shared/assets/icons/main-20-20.svg';
import Icon from 'shared/ui/Icon/Icon';
import { ArticleBlock, ArticleBlockType } from 'entites/Article/model/types/article';
import ArticleCodeBlockComponent from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import ArticleImageBlockComponent from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import ArticleTextBlockComponent from '../ArticleTextBlockComponent/ArticleTextBlockComponent';


interface ArticleDetailsProps {
  className?: string
  id: string
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer
}

const ArticleDetails = ({className, id}: ArticleDetailsProps) => { 
  const dispatch = useAppDispatch()
  const isLoading = useSelector(getArticleDetailsIsLoading); 
  const article = useSelector(getArticleDetailsData);
  const error = useSelector(getArticleDetailsError); 

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type){
      case ArticleBlockType.CODE:
        return <ArticleCodeBlockComponent key={block.id} className={cls.block} block={block}/>
      case ArticleBlockType.IMAGE:
        return <ArticleImageBlockComponent key={block.id} className={cls.block} block={block}/>
      case ArticleBlockType.TEXT:
        return <ArticleTextBlockComponent key={block.id} className={cls.block} block={block}/>
      default:
        return null;
    }
  }, [dispatch])

  useEffect(() => {
    if(__PROJECT__ !== 'storybook'){
      dispatch(fetchArticleById(id))
    }
  }, [dispatch, id])

  let content;

  if(isLoading) {
    content = (
      <>
        <Skeleton className={cls.avatar} width={200} height={200} border={'50%'}/>
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width={'100%'} height={200} />
        <Skeleton className={cls.skeleton} width={'100%'} height={200} />
      </>
    )
  } else if(error){
    content = (
      <>
        <Text 
          align={TextAlign.CENTER}
          title={t('Произошла ошибка при загрузке страницы')}
        />
      </>
    )
  } else {
    content = (
      <>
        <div className={cls.avatarWrapper}>
          <Avatar size={200} src={article?.img} className={cls.avatar}/>
        </div>
        <Text className={cls.title} title={article?.title} text={article?.subtitle} size={TextSize.L}/>
        <div className={cls.articleInfo}>
          <Icon Svg={TestIcon} className={cls.icon}/>
          <Text text={String(article?.views)} />
        </div>
        <div className={cls.articleInfo}>
          <Icon Svg={TestIcon} className={cls.icon}/>
          <Text text={article?.createdAt} />
        </div>
        {article?.blocks.map(renderBlock)}
      </>
    )
  }

  return (
    //оборачиваем в DynamicModuleLoader для того что бы наши редьюсеры удалялись, когда будем выходить из статьи, редьюсеры которые отвечают за детальный обзор статьи нам не нужны
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={ true }> 
      {content}
    </DynamicModuleLoader>    
  );
};

export default memo(ArticleDetails);

