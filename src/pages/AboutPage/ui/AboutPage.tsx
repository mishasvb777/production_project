import { Counter } from 'entites/Counter/indext'
import { useTranslation } from 'react-i18next'
import { Page } from 'shared/ui/Page/Page'

const AboutPage = () => {
  const { t } = useTranslation('about') // 'about' - этой нейм спейс

  return <Page >{t('О сайте')}</Page>
}

export default AboutPage
