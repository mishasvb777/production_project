import React, { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Comment.module.scss'
import Text from 'shared/ui/Text/Text';
import { t } from 'i18next';
import { CommentCard } from '../CommentCard/CommentCard';
import { Comment } from 'entites/Comment/model/types/comment';

interface CommentListProps {
  className?: string;
  comments?: Comment[]
  isLoading?: boolean;
}


export const CommentList = memo(({className, isLoading, comments}: CommentListProps) => {
  if(isLoading) {
    <div className={classNames(cls.CommentList, {}, [className])}>
      <CommentCard isLoading/>
      <CommentCard isLoading/>
      <CommentCard isLoading/>
    </div>
  }
  
  return (
    <div className={classNames(cls.CommentList, {}, [className])}>
      {comments?.length 
        ? comments.map(comment => <CommentCard className={cls.comment} isLoading={isLoading} comment={comment}/>)
        : <Text text={t('Комментариев нет')}/>}
    </div>
  );
});
