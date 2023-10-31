import React, { HTMLAttributes, ReactNode } from 'react';
import cls from './Card.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface CardProps extends HTMLAttributes<HTMLDivElement>{
  className?: string;
  children?: ReactNode;
}

const Card = ({className, children, ...otherProps}: CardProps) => {
  return (
    <div className={classNames(cls.Card, {}, [className])} {...otherProps}>
      {children}
    </div>
  );
};

export default Card;