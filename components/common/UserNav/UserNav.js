import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Menu, Transition } from '@headlessui/react';
import { CogIcon, LogoutIcon, MoonIcon, SunIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { forwardRef } from 'react';

import locales from 'locales';

import s from './UserNav.module.css';

const { Items, Item, Button } = Menu;

const LinkItem = forwardRef((props, ref) => {
  const { href, as, children, ...rest } = props;
  return (
    <Link href={href} as={as}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  );
});

LinkItem.displayName = 'LinkItem';

const UserNav = () => {
  const { data } = useSession();
  const { locale: activeLocale } = useRouter();
  const { layout, themes } = locales[activeLocale];
  const { theme, setTheme } = useTheme();

  return (
    <Menu>
      <div className={s.root}>
        <Button className={s.button}>
          <Image className={s.image} src={data.user.image} alt={data.user.username} layout="fill" objectFit="cover" />
        </Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Items className={s.dropdown}>
            <Item key="settings">
              {({ active }) => (
                <LinkItem href="/user/settings" className={clsx(s.item, { [s.activeItem]: active })}>
                  <CogIcon className={s.icon} />
                  {layout.navbar.userNav.settings}
                </LinkItem>
              )}
            </Item>
            <Item key="theme">
              {({ active }) => (
                <span
                  className={clsx(s.item, { [s.activeItem]: active })}
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                  {theme === 'light' ? <MoonIcon className={s.icon} /> : <SunIcon className={s.icon} />}
                  {theme === 'light' ? themes.dark : themes.light}
                </span>
              )}
            </Item>
            <Item key="logout">
              {({ active }) => (
                <span className={clsx(s.item, { [s.activeItem]: active })} onClick={signOut}>
                  <LogoutIcon className={s.icon} />
                  {layout.navbar.userNav.logout}
                </span>
              )}
            </Item>
          </Items>
        </Transition>
      </div>
    </Menu>
  );
};

export default UserNav;
