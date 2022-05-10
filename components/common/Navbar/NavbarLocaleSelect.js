import Link from 'next/link';
import { useRouter } from 'next/router';

import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon, PlusIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import cookies from 'js-cookie';
import { Fragment, useEffect, useState } from 'react';

import locales from 'locales';

import s from './NavbarLocaleSelect.module.css';

const { Button, Options, Option } = Listbox;

const NavbarLocaleSelect = () => {
  const router = useRouter();
  const { locale: activeLocale } = router;
  const { newLocale } = locales[activeLocale];
  const [selectedLocale, setSelectedLocale] = useState(locales.options.find((locale) => locale.value === activeLocale));

  useEffect(() => {
    const newLocale = locales.options.find((locale) => locale.value === activeLocale);
    cookies.set('NEXT_LOCALE', newLocale.value);
    setSelectedLocale(newLocale);
  }, [activeLocale]);

  return (
    <Listbox value={selectedLocale}>
      <div className={s.root}>
        <Button className={s.button}>
          {selectedLocale.label}
          <ChevronDownIcon className={s.icon} />
        </Button>
        <Options className={s.dropdown}>
          {locales.options.map((locale) => {
            const { pathname, query, asPath } = router;

            return (
              <Option key={locale.value} value={locale} as={Fragment}>
                {({ selected }) => (
                  <Link href={{ pathname, query }} as={asPath} locale={locale.value} passHref>
                    <li className={clsx(s.item, { [s.itemSelected]: selected })}>
                      {locale.label}
                      {selected && <CheckIcon className={s.icon} />}
                    </li>
                  </Link>
                )}
              </Option>
            );
          })}
          <div className={s.divider} />
          <Option key="new" as={Fragment}>
            <Link href="/locales/new" passHref>
              <li className={s.item}>
                {newLocale}
                <PlusIcon className="h-4 w-4 ml-4" />
              </li>
            </Link>
          </Option>
        </Options>
      </div>
    </Listbox>
  );
};

export default NavbarLocaleSelect;
