import { classNames } from 'shared/lib/classNames/classNames';
import { Article, ArticleBlockType, ArticleTextBlock, ArticleView } from '../../model/types/article';
import cls from './ArticleListItem.module.scss'
import Text from 'shared/ui/Text/Text';
import Icon from 'shared/ui/Icon/Icon';
import StarsIcon from 'shared/assets/icons/stars-20-20.svg'
import Card from 'shared/ui/Card/Card';
import { useHover } from 'shared/lib/hooks/useHover/useHover';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import ArticleTextBlockComponent from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { RoutePatch } from 'shared/config/routeConfig/routeConfig';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';

interface ArticleListItemSkeletonProps {
  clasName?: string,
  view: ArticleView;
}

export const ArticleListItemSkeleton = ({clasName, view}: ArticleListItemSkeletonProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  if(view === ArticleView.LIST) {

    return (
      <div className={classNames(cls.ArticleItem, {}, [clasName, cls[view]])}>      
        <Card className={cls.card} >
          <div className={cls.header}>
            <Skeleton height={30} width={30} border={'50%'}/>
            <Skeleton width={150} height={16} className={cls.username} />
            <Skeleton width={150} height={16} className={cls.date} />
          </div>
          <Skeleton width={250} height={24} className={cls.title}/>
          <Skeleton height={200} className={cls.img} />
          <div className={cls.footer}>
            <Skeleton height={36} width={200} />            
          </div>
        </Card>      
      </div>
    )    
  }

  return (
    <div className={classNames(cls.ArticleItem, {}, [clasName, cls[view]])}>      
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <Skeleton width={200} height={200} className={cls.img} />
        </div>
        <div className={cls.infoWrapper}>
          <Skeleton width={130} height={16}/>
        </div>
        <Skeleton width={130} height={16} className={cls.title} />
      </Card>      
    </div>
  );
};
