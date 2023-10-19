import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import cls from './Navbar.module.scss'
import { useTranslation } from 'react-i18next'

// интерфейс который описывет пропсы которые навбар ожидает на вход
interface NavbarProps {
  className?: string
}

const Navbar = ({ className }: NavbarProps) => {
  

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.links}>
        
      </div>
    </div>
  )
}

export default Navbar
