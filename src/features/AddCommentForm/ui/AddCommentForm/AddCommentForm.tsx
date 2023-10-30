import React, { useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AddComment.module.scss'
import Input from 'shared/ui/Input/Input';
import Button from 'shared/ui/Button/Button';
import { t } from 'i18next';
import DynamicModuleLoader, { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice';
import { useSelector } from 'react-redux';
import { getAddCommentFormError, getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useParams } from 'react-router-dom';

export interface AddCommentFormProps {
  className?: string
  onSendComment: (text: string) => void; // мы нашу функцию отправки комментария сделали полностью независимой, 
  //и теперь в функцию которая будет отправлять комментарии будем принимать пропсом, и на каждой сущности, статья, товар какойто, профиль,
  // будет свой функция по добавлению комментария, и будет передаваться в этот компонент
}

const AddCommentForm = ({className, onSendComment}:AddCommentFormProps) => {
  const text = useSelector(getAddCommentFormText)
  const error = useSelector(getAddCommentFormError)
  const dispatch = useAppDispatch()
  const { id } = useParams<{id: string}>() // c помощью этого хука можно выцеплять значения из строки запроса  

  const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer
  }

  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addCommentFormActions.setText(value))
  }, [dispatch]) 
 
  const onSendHandler = useCallback(() => {
    onSendComment(text || '')
    onCommentTextChange('')
  }, [onSendComment, onCommentTextChange, text])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.AddCommentForm, {}, [className])}>
        <Input className={cls.input} placeholder={t('Введите текст комментария')} value={text} onChange={onCommentTextChange}/>
        <Button children='Отправить' onClick={onSendHandler}/>      
      </div>
    </DynamicModuleLoader>    
  );
};

export default AddCommentForm;