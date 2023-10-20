import { BugButton } from 'app/providers/ErrorBoundaruy'
import { Counter } from 'entites/Counter/indext'
import { useTranslation } from 'react-i18next'

const MainPage = () => {
  const { t } = useTranslation('main')

  return (
    <div>
      <BugButton />
        {t('Главная страница')}        
    </div>
  )
}

export default MainPage
