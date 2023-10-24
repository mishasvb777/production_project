import cls from './ProfileCard.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { useSelector } from 'react-redux';
import { getProfileData } from 'entites/Profile/model/selectors/getProfileData/getProfileData';
import { getProfileError } from 'entites/Profile/model/selectors/getProfileError/getProfileError';
import { getProfilesLoading } from 'entites/Profile/model/selectors/getProfilesLoading/getProfilesLoading';
import { useTranslation } from 'react-i18next';
import Text from 'shared/ui/Text/Text';
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import Input from 'shared/ui/Input/Input';

interface ProfileCardProps {
  className? : string
}

const ProfileCard = ({className} : ProfileCardProps) => {
  const { t } = useTranslation('profile') 

  const data = useSelector(getProfileData)
  const isLoading = useSelector(getProfileError)
  const error = useSelector(getProfilesLoading)

  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.header}>
        <Text title={t('Профиль')}/>
        <Button theme={ThemeButton.OUTLINE} className={cls.editBtn}>
          {t('Редактировать')}
        </Button>
      </div>
      <div className={cls.data}>
        <Input value={data?.first} placeholder={t('Ваше имя')} className={cls.input}/>
        <Input value={data?.lastname} placeholder={t('Ваша фамилия')} className={cls.input}/>
      </div>
    </div>
  );
};

export default ProfileCard;

