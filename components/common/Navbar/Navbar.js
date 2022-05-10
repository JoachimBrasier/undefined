import Link from 'next/link';
import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';

import { UserNav } from 'components/common';

import locales from 'locales';

import NavbarLocaleSelect from './NavbarLocaleSelect';
import NavbarThemeToggler from './NavbarThemeToggler';

import s from './Navbar.module.css';

const Navbar = () => {
  const { status } = useSession();
  const { locale: activeLocale } = useRouter();
  const { about } = locales[activeLocale].layout.navbar.links;

  return (
    <nav className={s.root}>
      <div className={s.container}>
        <Link href="/">
          <a className={s.logo}>Undefined</a>
        </Link>
        <div className={s.right}>
          <div className={s.links}>
            <Link href="/about">
              <a className={s.link}>{about}</a>
            </Link>
          </div>
          <div className={s.divider} />
          <div className={s.actions}>
            <NavbarLocaleSelect />
            {['unauthenticated', 'loading'].includes(status) && <NavbarThemeToggler />}
            <UserNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
