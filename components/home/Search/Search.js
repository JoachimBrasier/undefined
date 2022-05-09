import { useRouter } from 'next/router';

import { MenuIcon } from '@heroicons/react/outline';

import { useHomeContext } from 'components/home';

import locales from 'locales';

import s from './Search.module.css';

const Search = () => {
  const { locale: activeLocale } = useRouter();
  const { searchPlaceholder } = locales[activeLocale].pages.home;
  const { openSidebar } = useHomeContext();

  return (
    <div className={s.root}>
      <button type="button" onClick={openSidebar} className={s.button}>
        <MenuIcon className={s.icon} />
      </button>
      <input className={s.input} placeholder={searchPlaceholder} />
    </div>
  );
};

export default Search;
