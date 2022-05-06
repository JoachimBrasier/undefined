import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import { useTheme } from 'next-themes';

import s from './NavbarThemeToggler.module.css';

const NavbarThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button className={s.root} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? <MoonIcon className={s.icon} /> : <SunIcon className={s.icon} />}
    </button>
  );
};

export default NavbarThemeToggler;
