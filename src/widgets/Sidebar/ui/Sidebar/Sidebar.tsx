import React, { memo, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import LangSwitcher from 'widgets/LangSwitcher/LangSwitcher'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import cls from './Sidebar.module.scss'
import Button, { ButtonSize, ThemeButton } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import { useSelector } from 'react-redux'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'


interface SideBarProps {
  className?: string
}

const Sidebar = memo(({ className }: SideBarProps) => {
  const [collapsed, setCollapsed] = useState(false) // состояние отвечает за то свернут сайдбар или развернут

  const sidebarItemList = useSelector(getSidebarItems)
  const { t } = useTranslation('translation')  

  const onToggle = () => {
    setCollapsed((prev) => !prev)
  }

  const itemList = useMemo(() => {
    return sidebarItemList.map((item) => (
      <SidebarItem 
        item={item}
        collapsed={collapsed}
        key={item.path}       
      />     
    ))
  }, [collapsed, sidebarItemList])


     
  return (
    <menu
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
        {itemList}
      </div>
      <div className={cls.switcher}>
        <ThemeSwitcher />
        <LangSwitcher short = {collapsed} className={cls.lang} />
      </div>
    </menu>
  )
})

export default Sidebar
