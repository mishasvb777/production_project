import { Mods, classNames } from 'shared/lib/classNames/classNames'
import cls from './Text.module.scss'
import { memo } from 'react';

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error'
}

export enum TextAlign {
  RIGHT = 'right',
  CENTER = 'center',  
  LEFT = 'left'
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
}


const Text = memo(({className, title, text, theme = TextTheme.PRIMARY, align = TextAlign.LEFT} : TextProps) => {

  const mods: Mods = {
    [cls[theme]]: true, 
    [cls[align]]: true
  }
  
  return (
    <div className={classNames(cls.Text, mods, [className])}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  )
})

export default Text
