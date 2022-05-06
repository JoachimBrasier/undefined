import Link from 'next/link';

import s from './Navbar.module.css';

const Navbar = () => (
  <nav className={s.root}>
    <div className={s.container}>
      <Link href="/">
        <a className={s.logo}>Home</a>
      </Link>
      <div className={s.links}>
        <Link href="/about">
          <a className={s.link}>About</a>
        </Link>
        <Link href="/">
          <a className={s.link}>FAQ</a>
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
