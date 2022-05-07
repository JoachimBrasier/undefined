import { useRouter } from 'next/router';

import locales from 'locales';

import s from './Search.module.css';

const Search = () => {
  const { locale: activeLocale } = useRouter();
  const { searchPlaceholder } = locales[activeLocale].pages.home;

  return (
    <div className={s.root}>
      <input className={s.input} placeholder={searchPlaceholder} />
    </div>
  );
};

export default Search;
