import { useTranslation } from 'react-i18next'
import { useTheme } from 'app/providers/ThemeProvider/index'
import { classNames } from 'shared/lib/classNames'
import cls from './LangSwitcher.module.scss'
import Button, { ThemeButton } from 'shared/ui/Button/Button'

interface LangSwitcherProps {
  className?: string
}

const LangSwitcher = ({ className }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation()

  const toggle = async () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }

  return (    
    <Button 
      className={classNames(cls.ThemeSwitcher, {}, [className])}
      theme={ThemeButton.CLEAR} 
      onClick={toggle}
    >
      {t('Язык')}
    </Button>    
  )
}

export default LangSwitcher
