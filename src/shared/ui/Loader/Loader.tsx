import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Loader.module.scss'

interface LoaderProps {
  className?: string;
}

const Loader = ({className} : LoaderProps) => {
  return (
    <div className={classNames(cls['loadingio-spinner-reload-pa67dedwe7d'], {}, [className])}>
      <div className={cls['ldio-eeedvgdy55i']}>
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Loader
