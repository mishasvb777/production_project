import React, { ReactNode, type FC, useState, useRef, useEffect, useCallback } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Modal.module.scss'
import { Portal } from '../Portal/Portal';
import { useTheme } from 'app/providers/ThemeProvider';


interface ModalProps {
  className?: string;
  children?: ReactNode; 
  isOpen?: boolean;
  onClose?: () => void; 
}

const ANIMATION_DELAY = 300;

export const Modal: FC<ModalProps> = ({className, children, isOpen, onClose}: ModalProps) => {

  const [isClosing, setIsClosing] = useState(false); // состояние нужно для обработки плавного закрытия модалки
  const timeRef = useRef<ReturnType<typeof setTimeout>>(); // <ReturnType<typeof setTimeout>> c помощью можем получить тип который возвращает та или иная функция
  const {theme} = useTheme() 
  
  const closeHandler = useCallback(() => { // функция для обработки плавного закрытия модалки
    if(onClose){  
      setIsClosing(true)    
      timeRef.current = setTimeout(() => {
        onClose()
        setIsClosing(false)
      }, ANIMATION_DELAY)
    }
  }, [setIsClosing, onClose])

  //На каждый перерендр функции onKeyDown и onContentClick создаются заново, и создается новые ссылки, из за чего могут быть лишние перерендеры
  // для этого их надо оборачивать в useCallback для мемоизации
  const onKeyDown = useCallback((e: KeyboardEvent) => { // сама функция которая будет закрывать модалку на ESC
    if(e.key === 'Escape') {
      closeHandler()
    }
  }, [closeHandler])

  const onContentClick = (e: React.MouseEvent) => { // нужно для того что предодвраитть всплытие и что бы не происходило closeHandler при клике на область cls.content
    e.stopPropagation() 
  }

  useEffect(() => {
    if(isOpen){
      window.addEventListener('keydown', onKeyDown) // делаем для того что бы можно было закрывать модалку на клавишу ESC
    }

    return () => {
      clearTimeout(timeRef.current);
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])
  
  const mods: Record<string, boolean> = {
    [cls.opened] : isOpen, 
    [cls.isClosing] : isClosing
  }

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <div className={cls.overlay} onClick={closeHandler}>
          <div className={cls.content} onClick={onContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>    
  )
}
function useStheme(): { theme: any; } {
  throw new Error('Function not implemented.');
}

