import { classNames } from 'shared/lib/classNames/classNames';
import { Comment } from '../../model/types/comment';
import React, { memo } from 'react';
import cls from './Comment.module.scss';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import Text from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePatch } from 'shared/config/routeConfig/routeConfig';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading? : boolean
}

export const CommentCard = memo(({className, comment, isLoading}: CommentCardProps) => {
  
  if(isLoading){
    return (
      <div className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} border='50%'/>
          <Skeleton height={16} width={100} className={cls.username}/>
        </div>
        <Skeleton width={'100%'} height={50} className={cls.text}/>
      </div>
    )
  }

  if(!comment) {
    return null
  }


  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <div className={cls.header}>        
        <Avatar size={30} src={comment.user.avatar} />
        <AppLink to={`${RoutePatch.profile}${comment.user.id}`}>
          <Text className={cls.username} title={comment.user.username} />
        </AppLink>
      </div>
      <Text className={cls.text} text={comment.body} />
    </div>
  );
});
