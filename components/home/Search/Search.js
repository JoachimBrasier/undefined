import { useRouter } from 'next/router';

import { MenuIcon } from '@heroicons/react/outline';
import debounce from 'lodash.debounce';
import { useCallback } from 'react';

import { useHomeContext } from 'components/home';

import locales from 'locales';

import s from './Search.module.css';

const Search = () => {
  const { locale: activeLocale } = useRouter();
  const { searchPlaceholder } = locales[activeLocale].pages.home;
  const { openSidebar, search, setSearch } = useHomeContext();

  const debounceSetSearch = useCallback(debounce(setSearch, 300), []);

  return (
    <div className={s.root}>
      <button type="button" onClick={openSidebar} className={s.button}>
        <MenuIcon className={s.icon} />
      </button>
      <input
        className={s.input}
        defaultValue={search}
        onChange={(e) => debounceSetSearch(e.target.value)}
        placeholder={searchPlaceholder}
      />
    </div>
  );
};

export default Search;
