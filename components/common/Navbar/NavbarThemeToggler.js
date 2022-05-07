import { useRouter } from 'next/router';

import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import { useTheme } from 'next-themes';

import { Tooltip } from 'components/ui';

import locales from 'locales';

import s from './NavbarThemeToggler.module.css';

const NavbarThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const { locale } = useRouter();
  const { light, dark } = locales[locale].themes;

  return (
    <Tooltip title={theme === 'light' ? dark : light} placement="bottom">
      <button className={s.root} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? <MoonIcon className={s.icon} /> : <SunIcon className={s.icon} />}
      </button>
    </Tooltip>
  );
};

export default NavbarThemeToggler;
