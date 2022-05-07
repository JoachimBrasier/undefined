import { useRouter } from 'next/router';

import { CheckIcon, XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import mockTags from 'mock/tags.json';

import { useHomeContext } from 'components/pages/home';

import locales from 'locales';

import s from './Sidebar.module.css';

const Item = ({ selected, onChange, label, value }) => (
  <li className={clsx(s.item, { [s.itemSelected]: selected })} onClick={() => onChange(value)}>
    {label}
    {selected && <CheckIcon className={s.icon} />}
  </li>
);

const Sidebar = () => {
  const { locale: activeLocale } = useRouter();
  const { filters, tagsTitle } = locales[activeLocale].pages.home;
  const { isSidebarOpen, closeSidebar, filter, setFilter, tags, setTags } = useHomeContext();

  return (
    <>
      <div className={clsx(s.overlay, { [s.overlayVisible]: isSidebarOpen })} onClick={closeSidebar} />
      <div className={clsx(s.root, { [s.rootOpen]: isSidebarOpen })}>
        <button className={clsx(s.button, { [s.buttonVisible]: isSidebarOpen })} onClick={closeSidebar}>
          <XIcon className={s.icon} />
        </button>
        <div className={s.block}>
          <span className={s.title}>{filters.title}</span>
          <ul className={s.list}>
            <Item value="latest" label={filters.latest} selected={filter === 'latest'} onChange={setFilter} />
            <Item value="popular" label={filters.popular} selected={filter === 'popular'} onChange={setFilter} />
            <Item value="history" label={filters.history} selected={filter === 'history'} onChange={setFilter} />
          </ul>
        </div>
        <div className={s.block}>
          <span className={s.title}>{tagsTitle}</span>
          <ul className={s.list}>
            {mockTags.map(({ value, label }) => (
              <Item key={value} value={value} label={label} selected={tags.includes(value)} onChange={setTags} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
