import React, { useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import LangSwitcher from 'widgets/LangSwitcher/LangSwitcher'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import cls from './Sidebar.module.scss'

interface SideBarProps {
  className?: string
}

const Sidebar = ({ className }: SideBarProps) => {
  const [collapsed, setCollapsed] = useState(false) // состояние отвечает за то свернут сайдбар или развернут

  const onToggle = () => {
    setCollapsed((prev) => !prev)
  }

  return (
    <div
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <button onClick={onToggle}>toggle</button>
      <div className={cls.switcher}>
        <ThemeSwitcher />
        <LangSwitcher className={cls.lang} />
      </div>
    </div>
  )
}

export default Sidebar
