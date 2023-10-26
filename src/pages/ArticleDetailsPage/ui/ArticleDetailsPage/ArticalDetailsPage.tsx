import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticalDetailsPage.module.scss'

interface ArticalDetailsPageProps {
  className?: string
}

const ArticalDetailsPage = ({className}: ArticalDetailsPageProps) => {
  const { t } = useTranslation('article')

  return (
    <div className={classNames(cls.ArticalDetailsPage, {}, [className])}>
      Artical Details Page
    </div>
  );
};

export default memo(ArticalDetailsPage);