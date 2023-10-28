import React, { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleTextBlockComponent.module.scss'
import Text from 'shared/ui/Text/Text';
import { ArticleTextBlock } from 'entites/Article/model/types/article';

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock
}

const ArticleTextBlockComponent = ({className, block}: ArticleTextBlockComponentProps) => {

 
  return (
    <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
      {block.title && <Text title={block.title} className={cls.title}/>}     
      {block.paragraphs && block.paragraphs.map((paragraph) => (
        <Text key={paragraph} text={paragraph} className={cls.paragraph} />
      ))}
    </div>
  );
};

export default memo(ArticleTextBlockComponent);