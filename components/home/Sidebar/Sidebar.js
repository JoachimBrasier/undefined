import Link from 'next/link';
import { useRouter } from 'next/router';

import { CheckIcon, XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

import { useHomeContext } from 'components/home';

import locales from 'locales';

import s from './Sidebar.module.css';

const Item = ({ selected, onChange, label, value }) => (
  <li className={clsx(s.item, { [s.itemSelected]: selected })} onClick={() => onChange(value)}>
    {label}
    {selected && <CheckIcon className={s.icon} />}
  </li>
);

const Sidebar = ({ tags }) => {
  const { locale: activeLocale } = useRouter();
  const { filters, tagsTitle, tagsTranslate } = locales[activeLocale].pages.home;
  const { isSidebarOpen, closeSidebar, activeFilter, setActiveFilter, activeTags, setActiveTags } = useHomeContext();

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
            <Item
              value="latest"
              label={filters.latest}
              selected={activeFilter === 'latest'}
              onChange={setActiveFilter}
            />
            <Item
              value="popular"
              label={filters.popular}
              selected={activeFilter === 'popular'}
              onChange={setActiveFilter}
            />
            <Item
              value="history"
              label={filters.history}
              selected={activeFilter === 'history'}
              onChange={setActiveFilter}
            />
            <Item
              value="favorites"
              label={filters.favorites}
              selected={activeFilter === 'favorites'}
              onChange={setActiveFilter}
            />
          </ul>
        </div>
        <div className={s.block}>
          <span className={s.title}>
            {tagsTitle}
            <Link href="/locales/tags">
              <a className={s.translateButton}>{tagsTranslate}</a>
            </Link>
          </span>
          <ul className={s.list}>
            {tags.map(({ id, slug, names }) => (
              <Item
                key={id}
                value={slug}
                label={names[activeLocale] || names['en']}
                selected={activeTags.includes(slug)}
                onChange={setActiveTags}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
