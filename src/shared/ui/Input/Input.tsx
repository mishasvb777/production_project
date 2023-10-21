import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Input.module.scss'
import { InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react';

//когда мы описывем InputProps у нас возникает конфликт типов, т.к. в InputHTMLAttributes уже прописаны типы value и onChange, 
// что бы сделать переопределить эти типы, мы можем вытащить все типы из InputHTMLAttributes, кроме указанных, в нашем слуаче это
// value и onChange, и уже InputProps экстендить от этого типа, вытащить типы кроме указанных мы можем с помощью Omit

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> // первым параметром передаем от куда мы хотим взять типы, вторым параметром, какие типы мы хотим исключить

interface InputProps extends HTMLInputProps{
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  autofocus?: boolean;
}


const Input = memo(({className, value, onChange, type = 'text', placeholder, autofocus, ...othetProps} : InputProps) => {

  const [isFocused, setIsFocused] = useState(false) // состояние для того что бы коретка отображалась при фокусе на инпуте, а не постоянно
  const [caretPosition, setCaretPosition] = useState(0) // состояние которое отвечает за позицию коретки

  const ref = useRef<HTMLInputElement>(null) // ссылка на инпут для того что бы если есть автофокус физически проставлять туда фокус


  useEffect(() => {
    if(autofocus){
      setIsFocused(true);      
      ref.current?.focus()
    }
  }, [autofocus])

  const onChangeHundler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
    setCaretPosition(e.target.value.length);
  }

  const onBlur = () => {
    setIsFocused(false)
  }

  const onFocus = () => {
    setIsFocused(true)
  }

  const onSelect = (e: any) => {
    setCaretPosition(e?.target?.selectionStart || 0)
  }

  return (
    <div className={classNames(cls.InputWrapper, {}, [className])}>
      {placeholder && <div className={cls.placeholder}>
        {`${placeholder}>`}
      </div>}
      <div className={cls.caretWrapper}>
        <input 
          ref={ref}
          className={cls.input} 
          type={type} 
          value={value} 
          onChange={onChangeHundler} 
          onFocus={onFocus}
          onBlur={onBlur}
          onSelect={onSelect}
          {...othetProps}
        />
        {isFocused && <span className={cls.caret} style={{left: `${caretPosition * 9}px`}}/>}             
      </div>      
    </div>
  )
})

export default Input
