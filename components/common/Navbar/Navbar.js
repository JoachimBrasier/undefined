import Link from 'next/link';
import { useRouter } from 'next/router';

import i18n from './i18n.json';
import NavbarLocaleSelect from './NavbarLocaleSelect';

import s from './Navbar.module.css';

const { logo, links } = i18n;

const Navbar = () => {
  const { locale } = useRouter();

  return (
    <nav className={s.root}>
      <div className={s.container}>
        <Link href="/">
          <a className={s.logo}>{logo[locale]}</a>
        </Link>
        <div className={s.links}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} as={link?.as}>
              <a className={s.link}>{link.label[locale]}</a>
            </Link>
          ))}
        </div>
        <div className={s.divider} />
        <div className={s.actions}>
          <NavbarLocaleSelect />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
