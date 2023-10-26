import React, { memo, type ButtonHTMLAttributes, type FC } from 'react'
import {Mods, classNames} from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export enum ThemeButton {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outline_red',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',  

}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl'
}

const Button: FC<ButtonProps> = memo(({
  className,
  children,
  theme = ThemeButton.OUTLINE,
  square,
  size = ButtonSize.M,
  disabled,
  ...otherProps
}) => {

  const mods: Mods = {
    [cls[theme]] : true,   
    [cls.square] : square,    
    [cls[size]] : true,
    [cls.disabled] : disabled
  }

  return (
    <button
      className = {classNames(cls.Button, mods, [className])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  )
})

export default Button
