import { classNames } from 'shared/lib/classNames/classNames';
import { Article, ArticleView } from '../../model/types/article';
import cls from './ArticleList.module.scss'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/aArticelListItemSkeleton';

interface ArticleListProps {
  clasName?: string,
  articles: Article[],
  isLoading?: boolean,
  view?: ArticleView // тип отображения, либо плитка, либо список
}

const getSkeletons = (view: ArticleView) => {
  return new Array(view === ArticleView.PLAYD ? 9 : 3).fill(0).map((item, index) => (
    <ArticleListItemSkeleton clasName={cls.card} key={index} view={view} />
  ))
}

export const ArticleList = ({clasName, articles, isLoading, view = ArticleView.PLAYD}: ArticleListProps) => {

  const renderArticle = (article: Article) => (
    <ArticleListItem clasName={cls.card} article={article} view = {view} key={article.id}/>
  )    
    
  return (
    <div className={classNames(cls.ArticleList, {}, [clasName, cls[view]])}>
      {articles.length > 0      
        ? <>
            {articles.map(renderArticle)}
          </>
        : null
      }
      {isLoading && getSkeletons(view)}
    </div>
  );
};
