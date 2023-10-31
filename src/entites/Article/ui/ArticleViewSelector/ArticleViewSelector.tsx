import { ArticleView } from '../../model/types/article';
import ListIcon from 'shared/assets/icons/list_menu-20-20.svg'
import PlydIcon from 'shared/assets/icons/plyad_menu-20-20.svg'
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleView.module.scss'
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import Icon from 'shared/ui/Icon/Icon';

interface ArticleViewSelectorProps {
  className?: string,
  view: ArticleView,
  onViewClick?: (view: ArticleView) => void
}

const viewTypes = [
  {
    view: ArticleView.PLAYD,
    icon: PlydIcon
  }, 
  {
    view: ArticleView.LIST,
    icon: ListIcon
  }, 
]

export const ArticleViewSelector = ({ className, view, onViewClick }: ArticleViewSelectorProps) => {

  // const onClick = (newView: ArticleView) => {
  //   return () => {
  //     onViewClick?.(newView)
  //   }
  // }

  return (
    <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
      {viewTypes.map(viewType => (        
        <Button theme={ThemeButton.CLEAR} onClick={() => onViewClick?.(viewType.view)} >
          <Icon Svg={viewType.icon} className={classNames('', {[cls.notSelected]: viewType.view !== view}, [])}/>
        </Button>
      ))}
    </div>
  );
};
