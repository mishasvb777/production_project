import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticalPage.module.scss'
import { memo } from 'react';
import { Article, ArticleList, ArticleView } from 'entites/Article';

interface ArticalPageProps {
  className?: string
}

const article = {
    
} as Article

const ArticalPage = ({className}: ArticalPageProps) => {
  const { t } = useTranslation('article')

  return (
    <div className={classNames(cls.ArticalPage, {}, [className])}>
      <ArticleList 
        view={ArticleView.LIST} 
        isLoading
        articles={new Array(16).fill(0).map((item, index) => ({ ...article, id: String(index)}))} 
      />
    </div>
  );
};

export default memo(ArticalPage);