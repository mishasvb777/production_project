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

interface ArticleListItemProps {
  clasName?: string,
  article: Article,
  view: ArticleView;
}

export const ArticleListItem = ({clasName, article, view}: ArticleListItemProps) => {
  const navigate = useNavigate()
  const {t} = useTranslation()

  const onOpenArticle = useCallback(() => {
    navigate(RoutePatch.articles_details + article.id)
  }, [article.id, navigate])

  const types = <Text text={article.type.join(', ')} className={cls.types} />
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={StarsIcon} />
    </>   
  )

  if(view === ArticleView.LIST) {
    const textBlock = article.blocks.find(
      block => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock

    return (
      <div className={classNames(cls.ArticleItem, {}, [clasName, cls[view]])}>      
        <Card className={cls.card} >
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title}/>
          {types}
          <img alt={article.title} src={article.img} className={cls.img} />
          {textBlock && (<ArticleTextBlockComponent block={textBlock} className={cls.textBlock}/> )}
          <div className={cls.footer}>
            <Button theme={ThemeButton.OUTLINE} onClick={onOpenArticle}>
              {t('Читать далее...')}
            </Button>
            {views}
          </div>
        </Card>      
     </div>
    )    
  }

  return (
    <div className={classNames(cls.ArticleItem, {}, [clasName, cls[view]])}>      
      <Card className={cls.card} onClick={onOpenArticle}>
        <div className={cls.imageWrapper}>
          <img alt={article.title} src={article.img} className={cls.img} />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {types}          
          {views}
        </div>
        <Text text={article.title} className={cls.title} />
      </Card>      
    </div>
  );
};
