import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import cls from './Navbar.module.scss'
import { useTranslation } from 'react-i18next'
import Button, { ThemeButton } from 'shared/ui/Button/Button'
import { useCallback, useState } from 'react'
import { Modal } from 'shared/ui/Modal/Modal'

// интерфейс который описывет пропсы которые навбар ожидает на вход
interface NavbarProps {
  className?: string
}

const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation()
  const [isAuthModal, setIsAuthModal] = useState(false) // состояние с помощью которого будем управлять видимость модального окна

  // ДЛЯ ВСЕХ ФУНКЦИЯ КОТОРЫЕ МЫ БУДЕМ ПЕРЕДАВАТЬ КУДА ТО КАК ПРОПС МЫ БУДЕМ ИСПОЛЬЗОВАТЬ useCallback ЧТОБЫ НЕ МЕНЯЛАСЬ ССЫЛКА
  const onToggleModal = useCallback(() => {
    setIsAuthModal((prev) => !prev)
  }, [setIsAuthModal]) 


  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button theme={ThemeButton.CLEAR_INVERTED} className={cls.links} onClick={onToggleModal}>
        {t('Войти')}
      </Button>
      <Modal isOpen = {isAuthModal} onClose={onToggleModal}>123123123123123123123123</Modal> 
    </div>
  )
}

export default Navbar
