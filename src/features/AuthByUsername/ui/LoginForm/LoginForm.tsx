import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LoginForm.module.scss'
import { useTranslation } from 'react-i18next'
import Button, { ThemeButton } from 'shared/ui/Button/Button'
import Text, { TextTheme } from 'shared/ui/Text/Text'
import Input from 'shared/ui/Input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { memo, useCallback } from 'react'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername'
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'
import { getLoginIsLoading } from '../../model/selectors/getLoginLoading/getLoginIsLoading'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'


export interface LoginFormProps {
  className?: string
}

const initialReducers: ReducersList = {
  loginForm: loginReducer
}

const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  const username = useSelector(getLoginUsername)
  const password = useSelector(getLoginPassword)
  const isLoading = useSelector(getLoginIsLoading)
  const error = useSelector(getLoginError)


  const onChangeUsername = useCallback((value: string) => { // для всех функций которые мы куда то передаем пропсом мы оборачиваем в useCallback
    dispatch(loginActions.setUsername(value))
  }, [dispatch])

  const onChangePassword = useCallback((value: string) => { // для всех функций которые мы куда то передаем пропсом мы оборачиваем в useCallback
    dispatch(loginActions.setPassword(value))
  }, [dispatch])

  const onLoginClick = useCallback(() => { // эта функция будет отрабатывать в момент когда нажали на кнопку
    dispatch(loginByUsername({username, password}))
  }, [dispatch, password, username])

  return (
    // DynamicModuleLoader модуль для асинхроной подгрузки модуля
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount> 
      <div className={classNames(cls.LoginForm, {}, [className])}>     
        <Text title={t('Форма авторизации')} /> 
        {error && <Text text={error} theme={TextTheme.ERROR}/>}
        <Input 
          type="text" 
          className={cls.input} 
          placeholder={t('Введите username')} 
          autofocus 
          onChange={onChangeUsername}
          value={username}
        />
        <Input 
          type="text" 
          className={cls.input} 
          placeholder={t('Введите пароль')} 
          onChange={onChangePassword}
          value={password}
        />
        <Button 
          className={cls.loginBtn} 
          theme={ThemeButton.OUTLINE}
          onClick={onLoginClick}
          disabled = {isLoading}
        >
          {t('Войти')}
        </Button>
      </div>  
    </DynamicModuleLoader>    
  )
})

export default LoginForm
