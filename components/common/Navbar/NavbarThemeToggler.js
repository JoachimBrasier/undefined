import { useRouter } from 'next/router';

import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import { useTheme } from 'next-themes';

import { Tooltip } from 'components/ui';

import i18n from './i18n.json';

import s from './NavbarThemeToggler.module.css';

const { themes } = i18n;

const NavbarThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const { locale } = useRouter();

  return (
    <Tooltip title={theme === 'light' ? themes.dark[locale] : themes.light[locale]} placement="bottom">
      <button className={s.root} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? <MoonIcon className={s.icon} /> : <SunIcon className={s.icon} />}
      </button>
    </Tooltip>
  );
};

export default NavbarThemeToggler;
