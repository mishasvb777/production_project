import React, { useState } from 'react';
import { classNames } from 'shared/lib/classNames';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import cls from './Sidebar.module.scss'

interface SideBarProps {
  className?: string
}

const Sidebar = ({className}: SideBarProps) => {
  const [collapsed, setCollapsed] = useState(false) // состояние отвечает за то свернут сайдбар или развернут
  
  const onToggle = () => {
    setCollapsed(prev => !prev)
  }

  return (
    <div className={classNames(cls.Sidebar, {[cls.collapsed] : collapsed}, [className])}>
      <button onClick={onToggle}>toggle</button>
      <div className={cls.switcher}>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Sidebar;