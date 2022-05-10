import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Listbox } from '@headlessui/react';
import { CogIcon, LogoutIcon, MoonIcon, SunIcon } from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { Fragment } from 'react';

import locales from 'locales';

import s from './UserNav.module.css';

const { Button, Options, Option } = Listbox;

const UserNav = () => {
  const { status, data } = useSession();
  const { locale: activeLocale } = useRouter();
  const { layout, themes } = locales[activeLocale];
  const { theme, setTheme } = useTheme();

  const handleClick = (event, callback) => {
    event.preventDefault();
    callback();
  };

  if (status === 'authenticated') {
    return (
      <Listbox>
        <div className={s.root}>
          <Button className={s.button}>
            <Image className={s.image} src={data.user.image} alt={data.user.username} layout="fill" objectFit="cover" />
          </Button>
          <Options className={s.dropdown}>
            <Option key="settings" as={Fragment}>
              <Link href="/user/settings" passHref>
                <li className={s.item}>
                  <CogIcon className={s.icon} />
                  {layout.navbar.userNav.settings}
                </li>
              </Link>
            </Option>
            <Option key="theme" as={Fragment}>
              <li
                className={s.item}
                onClick={(event) => handleClick(event, () => setTheme(theme === 'light' ? 'dark' : 'light'))}
              >
                {theme === 'light' ? <MoonIcon className={s.icon} /> : <SunIcon className={s.icon} />}
                {theme === 'light' ? themes.dark : themes.light}
              </li>
            </Option>
            <Option key="logout" as={Fragment}>
              <li className={s.item} onClick={(event) => handleClick(event, signOut)}>
                <LogoutIcon className={s.icon} />
                {layout.navbar.userNav.logout}
              </li>
            </Option>
          </Options>
        </div>
      </Listbox>
    );
  }

  return null;
};

export default UserNav;
