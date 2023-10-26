import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { 
  ProfileCard, 
  fetchProfileData, 
  getProfileError, 
  getProfileReadonly, 
  getProfilesLoading, 
  getProfileForm,
  profileActions, 
  profileReducer, 
  getProfileValidateErrors
} from 'entites/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import ProfilePageHeader from './ProfilePageHeader/ProfilePageHeader';
import { Currency } from 'entites/Currency';
import { Country } from 'entites/Country';
import Text from 'shared/ui/Text/Text';
import { TextTheme } from 'shared/ui/Text/Text';
import { ValidateProfileError } from 'entites/Profile/model/types/profile';

const reducers: ReducersList = {
  profile: profileReducer
}

interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({} : ProfilePageProps) => {
  const {t} = useTranslation('profile')
  const dispatch = useAppDispatch() // диспатч нужен для того что бы работать с асинхронным экшенном
  const formData = useSelector(getProfileForm)
  const error = useSelector(getProfileError)
  const isLoading = useSelector(getProfilesLoading)
  const readonly = useSelector(getProfileReadonly)
  const validateErrors = useSelector(getProfileValidateErrors)

  const validateErrorTranslate = {
    [ValidateProfileError.SERVER_ERROR]: t('Серверная ошиба при сохранении'),
    [ValidateProfileError.INCORRECT_AGE]: t('Некоректный возраст'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('Некоректный регион'),
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
    [ValidateProfileError.NO_DATA]: t('Данные не указаны')
  }

  useEffect(() => {
    if(__PROJECT__ !== 'storybook'){
      dispatch(fetchProfileData())
    }    
  }, [dispatch])

  const onChangeFirstname = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({first: value || ''}))
  }, [dispatch])

  const onChangeLastname = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({lastname: value || ''}))
  }, [dispatch])

  const onChangeAge = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
}, [dispatch]);

  const onChangeCity = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({city: value || ''}))
  }, [dispatch])

  const onChangeUsername = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({username: value || ''}))
  }, [dispatch])

  const onChangeAvatar = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({avatar: value || ''}))
  }, [dispatch])

  const onChangeCurrency = useCallback((value: Currency) => {
    dispatch(profileActions.updateProfile({currency: value}))
  }, [dispatch])

  const onChangeCountry = useCallback((value: Country) => {
    dispatch(profileActions.updateProfile({country: value}))
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames('', {}, [])}>
        <ProfilePageHeader />
        {validateErrors?.length && validateErrors.map(err => (
          <Text theme={TextTheme.ERROR} text={validateErrorTranslate[err]} key={err}/>
        ))}
        <ProfileCard 
          data={formData} 
          isLoading={isLoading} 
          error={error}
          readonly={readonly}
          onChangeFirstname = {onChangeFirstname}
          onChangeLastname = {onChangeLastname}
          onChangeAge = {onChangeAge}
          onChangeCity = {onChangeCity}
          onChangeUsername = {onChangeUsername}
          onChangeAvatar = {onChangeAvatar}
          onChangeCurrency = {onChangeCurrency}
          onChangeCountry = {onChangeCountry}
        /> 
      </div>
    </DynamicModuleLoader>    
  );
};

export default ProfilePage;

