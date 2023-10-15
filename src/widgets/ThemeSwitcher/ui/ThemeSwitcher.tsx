import { useTheme, Theme } from 'app/providers/ThemeProvider/index'
import { classNames } from 'shared/lib/classNames';
import cls from './ThemeSwitcher.module.scss'
import LightIcon from 'shared/assets/icons/theme-light.svg'
import DarkIcon from 'shared/assets/icons/theme-dark.svg'
import Button, { ThemeButton } from 'shared/ui/Button/Button'

interface ThemeSwitcherProps {
  className?: string
}

const ThemeSwitcher = ({className}: ThemeSwitcherProps) => { 

  const { theme, toggleTheme } = useTheme()
  return (    
      <Button theme={ThemeButton.CLEAR} className={classNames(cls.ThemeSwitcher, {}, [className])} onClick={toggleTheme}>
        {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
      </Button>       
  );
};

export default ThemeSwitcher;