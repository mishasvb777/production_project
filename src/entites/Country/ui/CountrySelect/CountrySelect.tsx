import { Country } from 'entites/Country';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';

interface CountrySelectProps {
  className?: string,
  value?: Country,
  onChange?: (value: Country) => void,
  readonly?: boolean
}

const options = [ // тк как массив статичный его можно вынести за пределы компонента
    {value: Country.Armenia, content: Country.Armenia},
    {value: Country.Belarus, content: Country.Belarus},
    {value: Country.Kazakhstan, content: Country.Kazakhstan},
    {value: Country.Russia, content: Country.Russia},
  ]

export const CountrySelect = memo(({ className, value, onChange, readonly }: CountrySelectProps) => { 
  const { t } = useTranslation()

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country)
  }, [onChange])

  return (
    <Select 
      className={classNames('', {}, [className])}
      label={t('Укажите cтрану')} 
      options={options}          
      value={value}
      onChange={onChangeHandler}
      readonly= {readonly}
    />
  );
});
