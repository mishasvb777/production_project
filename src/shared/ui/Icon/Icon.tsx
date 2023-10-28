import { memo } from 'react';
import cls from './Icon.module.scss'
import { classNames } from 'shared/lib/classNames/classNames';

interface IconProps {
  className?: string;
  Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>
}

const Icon = memo(({className, Svg}: IconProps) => {

  return (
    <Svg className={classNames(cls.Icon, {}, [className])}/>
  );
});

export default Icon;