import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { useTranslation } from 'react-i18next'
import Button, { ThemeButton } from 'shared/ui/Button/Button'
import { useCallback, useState } from 'react'
import { LoginModal } from 'features/AuthByUsername'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAuthData, userActions } from 'entites/User'

// интерфейс который описывет пропсы которые навбар ожидает на вход
interface NavbarProps {
  className?: string
}

const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation()
  const [isAuthModal, setIsAuthModal] = useState(false) // состояние с помощью которого будем управлять видимость модального окна
  const authData = useSelector(getUserAuthData)
  const dispatch = useDispatch()
  // ДЛЯ ВСЕХ ФУНКЦИЯ КОТОРЫЕ МЫ БУДЕМ ПЕРЕДАВАТЬ КУДА ТО КАК ПРОПС МЫ БУДЕМ ИСПОЛЬЗОВАТЬ useCallback ЧТОБЫ НЕ МЕНЯЛАСЬ ССЫЛКА
  const onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [setIsAuthModal]) 

  const onShowModal = useCallback(() => {
    setIsAuthModal(true)
  }, [setIsAuthModal]) 

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch]) 

  if(authData) {
    return(
      <div className={classNames(cls.Navbar, {}, [className])}>
        <Button theme={ThemeButton.CLEAR_INVERTED} className={cls.links} onClick={onLogout}>
          {t('Выйти')}
        </Button>         
      </div>
    )    
  }

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
