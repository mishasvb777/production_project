import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import cls from './Navbar.module.scss'
import { useTranslation } from 'react-i18next'
import Button, { ThemeButton } from 'shared/ui/Button/Button'
import { useCallback, useState } from 'react'
import { Modal } from 'shared/ui/Modal/Modal'
import LoginForm from 'features/AuthByUsername/ui/LoginForm/LoginForm'
import { LoginModal } from 'features'

// интерфейс который описывет пропсы которые навбар ожидает на вход
interface NavbarProps {
  className?: string
}

const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation()
  const [isAuthModal, setIsAuthModal] = useState(false) // состояние с помощью которого будем управлять видимость модального окна

  // ДЛЯ ВСЕХ ФУНКЦИЯ КОТОРЫЕ МЫ БУДЕМ ПЕРЕДАВАТЬ КУДА ТО КАК ПРОПС МЫ БУДЕМ ИСПОЛЬЗОВАТЬ useCallback ЧТОБЫ НЕ МЕНЯЛАСЬ ССЫЛКА
  const onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [setIsAuthModal]) 

  const onShowModal = useCallback(() => {
    setIsAuthModal(true)
  }, [setIsAuthModal]) 

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button theme={ThemeButton.CLEAR_INVERTED} className={cls.links} onClick={onShowModal}>
        {t('Войти')}
      </Button>
      <LoginModal isOpen = {isAuthModal} onClose={onCloseModal} />      
    </div>
  )
}

export default Navbar
