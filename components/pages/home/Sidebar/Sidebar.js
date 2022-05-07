import { useRouter } from 'next/router';

import { CheckIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import mockTags from 'mock/tags.json';
import { useState } from 'react';

import locales from 'locales';

import s from './Sidebar.module.css';

const Item = ({ selected, onChange, label, value }) => (
  <li className={clsx(s.item, { [s.itemSelected]: selected })} onClick={() => onChange(value)}>
    {label}
    {selected && <CheckIcon className={s.icon} />}
  </li>
);

const Sidebar = () => {
  const [activeFilter, setActiveFilter] = useState('latest');
  const [activeTags, setActiveTags] = useState([]);
  const { locale: activeLocale } = useRouter();
  const { filters, tags, history } = locales[activeLocale].pages.home;

  const onTagsChange = (value) => {
    const newActiveTags = [...activeTags];

    if (newActiveTags.includes(value)) {
      const index = newActiveTags.indexOf(value);
      newActiveTags.splice(index, 1);
    } else {
      newActiveTags.push(value);
    }

    setActiveTags(newActiveTags);
  };

  return (
    <div className={s.root}>
      <div className={s.block}>
        <span className={s.title}>{filters.title}</span>
        <ul className={s.list}>
          <Item value="latest" label={filters.latest} selected={activeFilter === 'latest'} onChange={setActiveFilter} />
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
        </ul>
      </div>
      <div className={s.block}>
        <span className={s.title}>{tags.title}</span>
        <ul className={s.list}>
          {mockTags.map(({ value, label }) => (
            <Item
              key={value}
              value={value}
              label={label}
              selected={activeTags.includes(value)}
              onChange={onTagsChange}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
