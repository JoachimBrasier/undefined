import Link from 'next/link';
import { useRouter } from 'next/router';

import locales from 'locales';

import NavbarLocaleSelect from './NavbarLocaleSelect';
import NavbarThemeToggler from './NavbarThemeToggler';

import s from './Navbar.module.css';

const Navbar = () => {
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
            <NavbarThemeToggler />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
