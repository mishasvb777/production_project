import { t } from 'i18next';
import cls from './ProfilePageHeader.module.scss';
import Text, { TextAlign, TextTheme } from 'shared/ui/Text/Text';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { classNames } from 'shared/lib/classNames/classNames';
import { getProfileData, getProfileReadonly, profileActions, updateProfileData } from 'entites/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from 'entites/User';

interface ProfilePageHeaderProps  {
  className? : string 
}

const ProfilePageHeader = ({className} : ProfilePageHeaderProps) => {
  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id

  const readonly = useSelector(getProfileReadonly)

  const dispatch = useAppDispatch()

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false))    
  }, [dispatch])

  const onSave = useCallback(() => {
    dispatch(updateProfileData())  
  }, [dispatch])

  const onCanselEdit = useCallback(() => {
    dispatch(profileActions.canselEdit())
  }, [dispatch])

  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t('Профиль')}/>
      {canEdit && 
        <div className={cls.btnsWrapper}>
          {readonly 
            ? 
              <Button theme={ThemeButton.OUTLINE} className={cls.editBtn} onClick={onEdit}>
                {t('Редактировать')}
              </Button> 
            : 
            <>          
              <Button theme={ThemeButton.OUTLINE_RED} className={cls.editBtn} onClick={onCanselEdit}>
                {t('Отменить')}
              </Button> 
              <Button theme={ThemeButton.OUTLINE} className={cls.saveBtn} onClick={onSave}>
                {t('Сохранить')}
              </Button> 
            </>        
          }
        </div>
      }
      
    </div>
  );
};

export default ProfilePageHeader;