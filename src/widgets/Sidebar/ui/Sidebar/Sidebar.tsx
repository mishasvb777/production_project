import React, { useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import LangSwitcher from 'widgets/LangSwitcher/LangSwitcher'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import cls from './Sidebar.module.scss'
import Button, { ButtonSize, ThemeButton } from 'shared/ui/Button/Button'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { RoutePatch } from 'shared/config/routeConfig/routeConfig'
import { useTranslation } from 'react-i18next'
import AboutIcon from 'shared/assets/icons/about-20-20.svg'
import MainIcon from 'shared/assets/icons/main-20-20.svg'

interface SideBarProps {
  className?: string
}

const Sidebar = ({ className }: SideBarProps) => {
  const [collapsed, setCollapsed] = useState(false) // состояние отвечает за то свернут сайдбар или развернут

  const { t } = useTranslation('translation')
  
  const onToggle = () => {
    setCollapsed((prev) => !prev)
  }

  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <Button 
        data-testid="sidebar-toggle" 
        onClick={onToggle}
        className={cls.collapseBtn}
        theme={ThemeButton.BACKGROUND_INVERTED}
        size={ButtonSize.L}
        square        
      >
        {collapsed ? '>' : '<'}
      </Button>
      <div className={cls.items}>      
        <AppLink theme={AppLinkTheme.SECONDARY} to={RoutePatch.main} className={cls.item}>
          <MainIcon className={cls.icon} />
          <span className={cls.link}>{t('Главная')}</span>            
        </AppLink>
        <AppLink theme={AppLinkTheme.SECONDARY} to={RoutePatch.about} className={cls.item}>
          <AboutIcon className={cls.icon} />
          <span className={cls.link}>{t('О сайте')}</span>                   
        </AppLink>
      </div>
      <div className={cls.switcher}>
        <ThemeSwitcher />
        <LangSwitcher short = {collapsed} className={cls.lang} />
      </div>
    </div>
  )
}

export default Sidebar
