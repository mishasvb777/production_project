import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticalPage.module.scss'
import { memo } from 'react';

interface ArticalPageProps {
  className?: string
}

const ArticalPage = ({className}: ArticalPageProps) => {
  const { t } = useTranslation('article')

  return (
    <div className={classNames(cls.ArticalPage, {}, [className])}>
      Artical Page
    </div>
  );
};

export default memo(ArticalPage);