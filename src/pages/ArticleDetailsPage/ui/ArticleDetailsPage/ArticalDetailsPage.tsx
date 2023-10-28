import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticalDetailsPage.module.scss'
import ArticleDetails from 'entites/Article/ui/ArticleDetails/ArticleDetails';
import { useParams } from 'react-router-dom';

interface ArticalDetailsPageProps {
  className?: string
}

const ArticalDetailsPage = ({className}: ArticalDetailsPageProps) => {
  const { t } = useTranslation('article')

  const { id } = useParams<{id: string}>() // c помощью этого хука можно выцеплять значения из строки запроса
  

  if(!id){
    return (
      <div className={classNames(cls.ArticalDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>
    )
  }

  return (
    <div className={classNames(cls.ArticalDetailsPage, {}, [className])}>
      <ArticleDetails id={id}/>
    </div>
  );
};

export default memo(ArticalDetailsPage);