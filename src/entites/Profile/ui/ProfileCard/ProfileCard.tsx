import cls from './ProfileCard.module.scss'
import { Mods, classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next';
import Text, { TextAlign, TextTheme } from 'shared/ui/Text/Text';
import Input from 'shared/ui/Input/Input';
import Loader from 'shared/ui/Loader/Loader';
import { Profile } from 'entites/Profile';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency } from 'entites/Currency';
import { Country } from 'entites/Country';
import { CurrencySelect } from 'entites/Currency/ui/CurrencySelect/CurrencySelect';
import { CountrySelect } from 'entites/Country/ui/CountrySelect/CountrySelect';


interface ProfileCardProps {
  className? : string
  data?: Profile
  error?: string | undefined
  isLoading?: boolean | undefined
  readonly?: boolean
  onChangeLastname?: (value?: string) => void;
  onChangeFirstname?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeAge?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void; 
  onChangeAvatar?: (value?: string) => void; 
  onChangeCurrency?: (currency: Currency) => void;
  onChangeCountry?: (country: Country) => void;
}

const ProfileCard = (
  {
    className, 
    data, 
    error, 
    isLoading, 
    readonly, 
    onChangeLastname, 
    onChangeFirstname, 
    onChangeCity, 
    onChangeAge,
    onChangeAvatar,
    onChangeUsername,
    onChangeCurrency,
    onChangeCountry
  } : ProfileCardProps) => {

  const { t } = useTranslation('profile') 

  if(isLoading){
    return ( 
      <div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
        <Loader />
      </div>
    )
  }

  if(error){
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text 
          theme={TextTheme.ERROR} 
          title={t('Ошибка при загрузке')} 
          text={t('Попробуйте перезагрузить страницу')} 
          align={TextAlign.CENTER}
        />
      </div>
    )
  }

  const mods: Mods = {
    [cls.editing]: !readonly
  }

  return (
    <div className={classNames(cls.ProfileCard, mods, [className])}>      
      <div className={cls.data}>        
        {data?.avatar && 
          <div className={cls.avatarWrapper}> 
            <Avatar src={data?.avatar} size={150}/>           
          </div>
        }
        <Input value={data?.first} placeholder={t('Ваше имя')} className={cls.input} onChange={onChangeFirstname} readonly={readonly}/>
        <Input value={data?.lastname} placeholder={t('Ваша фамилия')} className={cls.input} onChange={onChangeLastname} readonly={readonly}/>
        <Input value={data?.age} type={'number'} placeholder={t('Ваш возраст')} className={cls.input} onChange={onChangeAge} readonly={readonly}/>
        <Input value={data?.city} placeholder={t('Город')} className={cls.input} onChange={onChangeCity} readonly={readonly}/>
        <Input value={data?.username} placeholder={t('Имя пользователя')} className={cls.input} onChange={onChangeUsername} readonly={readonly}/>
        <Input value={data?.avatar} placeholder={t('Введите ссылку на аватар')} className={cls.input} onChange={onChangeAvatar} readonly={readonly}/>
        <CurrencySelect value={data?.currency} className={cls.input} onChange = {onChangeCurrency} readonly={readonly}/>
        <CountrySelect value={data?.country} className={cls.input} onChange = {onChangeCountry} readonly={readonly}/>
      </div>
    </div>
  );
};

export default ProfileCard;

