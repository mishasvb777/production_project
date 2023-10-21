import { BugButton } from 'app/providers/ErrorBoundaruy'
import { Counter } from 'entites/Counter/indext'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Input from 'shared/ui/Input/Input'

const MainPage = () => {
  const { t } = useTranslation('main')
  const [value, seTvalue] = useState('')

  const onChange = (val: string) => {
    seTvalue(val)
  }
  console.log('render')
  return (
    <div>
      <BugButton /> 
      <p>{value}</p>    
      <Input value={value} onChange={onChange} placeholder={'Введите текст'}/>
    </div>
  )
}

export default MainPage
