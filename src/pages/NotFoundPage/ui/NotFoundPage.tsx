import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './NotFoundPage.module.scss'
import { Page } from 'widgets/Page/Page'

interface NotFoundPageProps {
  className?: string
}

const NotFoundPage = ({ className }: NotFoundPageProps) => {
  const { t } = useTranslation()  

  return (
    <Page className={classNames(cls.NotFoundPage)}>
      {t('Страница не найдена')}
    </Page>
    
  )
}

export default NotFoundPage
