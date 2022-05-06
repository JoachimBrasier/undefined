import Link from 'next/link';
import { useRouter } from 'next/router';

import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import cookies from 'js-cookie';
import { Fragment, useEffect, useState } from 'react';

import i18n from './i18n.json';

import s from './NavbarLocaleSelect.module.css';

const { Button, Options, Option } = Listbox;
const { locales } = i18n;

const NavbarLocaleSelect = () => {
  const router = useRouter();
  const { locale: activeLocale } = router;
  const [selectedLocale, setSelectedLocale] = useState(locales.find((locale) => locale.value === activeLocale));

  useEffect(() => {
    const newLocale = locales.find((locale) => locale.value === activeLocale);
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
          {locales.map((locale) => {
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
        </Options>
      </div>
    </Listbox>
  );
};

export default NavbarLocaleSelect;
