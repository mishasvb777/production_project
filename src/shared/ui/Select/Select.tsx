import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss'
import { ChangeEvent, useMemo } from 'react';

export interface SelectOption {
  value: string;
  content: string;
}

interface SelectProps {
  className?: string;
  label?: string;
  options? : SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean
}

export const Select = ({className, label, options, onChange, value, readonly}: SelectProps) => {
  const optionsList = useMemo(() => {
    return options?.map(opt => (
      <option className={cls.option} value={opt.value} key={opt.value}>{opt.content}</option>
    ))
  }, [options])

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if(onChange){
      onChange(e.target.value)
    }    
  }

  const mods: Mods = {
    
  }

  return (
    <div className={classNames(cls.Wrapper, mods, [className])}>
      {label && 
        (<span className={cls.label}>
          {`${label}>`}
        </span>)        
      } 
      <select className={cls.select} value={value} onChange={onChangeHandler} disabled={readonly} >
        {optionsList}
      </select>          
    </div>
  );
};

