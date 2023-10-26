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
  profileReducer 
} from 'entites/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import ProfilePageHeader from './ProfilePageHeader/ProfilePageHeader';
import { Currency } from 'entites/Currency';
import { Country } from 'entites/Country';

const reducers: ReducersList = {
  profile: profileReducer
}

interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({} : ProfilePageProps) => {
  const {t} = useTranslation()
  const dispatch = useAppDispatch() // диспатч нужен для того что бы работать с асинхронным экшенном
  const formData = useSelector(getProfileForm)
  const isLoading = useSelector(getProfileError)
  const error = useSelector(getProfilesLoading)
  const readonly = useSelector(getProfileReadonly)

  useEffect(() => {
    dispatch(fetchProfileData())
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

