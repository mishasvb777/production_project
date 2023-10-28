import React, { ReactNode, memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Code.module.scss'
import Button, { ThemeButton } from '../Button/Button';
import CopyIcon from 'shared/assets/icons/copy_icon_20_20.svg'
import Icon from '../Icon/Icon';

interface CodeProps {
  className?: string,
  text: string
}

const Code = memo(({className, text}: CodeProps) => {

  const onCopy = useCallback(()=> {
    navigator.clipboard.writeText(text)
  }, [text])

  return (   
    <pre className={classNames(cls.Code, {}, [className])}>
       <Button onClick={onCopy} className={cls.copyBtn} theme={ThemeButton.CLEAR}>
          <Icon Svg={CopyIcon}/>
       </Button>
      <code>
        {text}
      </code>
    </pre>    
  );
});

export default Code;