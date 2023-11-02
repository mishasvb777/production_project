import { BugButton } from 'app/providers/ErrorBoundaruy'
import { Counter } from 'entites/Counter/indext'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Input from 'shared/ui/Input/Input'
import { Page } from 'widgets/Page/Page'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'

const MainPage = () => {
  const { t } = useTranslation('main')
  const [value, seTvalue] = useState('')

  const onChange = (val: string) => {
    seTvalue(val)
  }
  console.log('render')
  return (
    <Page>
      Main Page 
    </Page>
  )
}

export default MainPage
