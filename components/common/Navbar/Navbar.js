import Link from 'next/link';
import { useRouter } from 'next/router';

import locales from 'locales';

import NavbarLocaleSelect from './NavbarLocaleSelect';
import NavbarThemeToggler from './NavbarThemeToggler';

import s from './Navbar.module.css';

const Navbar = () => {
  const { locale } = useRouter();
  const { links } = locales[locale].layout.navbar;

  return (
    <nav className={s.root}>
      <div className={s.container}>
        <Link href="/">
          <a className={s.logo}>Undefined</a>
        </Link>
        <div className={s.links}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} as={link?.as}>
              <a className={s.link}>{link.label}</a>
            </Link>
          ))}
        </div>
        <div className={s.divider} />
        <div className={s.actions}>
          <NavbarLocaleSelect />
          <NavbarThemeToggler />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
