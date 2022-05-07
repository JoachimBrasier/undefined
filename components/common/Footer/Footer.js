import { useRouter } from 'next/router';

import { HeartIcon } from '@heroicons/react/solid';
import { Fragment } from 'react';
import reactStringReplace from 'react-string-replace';

import locales from 'locales';

import s from './Footer.module.css';

const Footer = () => {
  const { locale: activeLocale } = useRouter();
  const { loveMessage } = locales[activeLocale].layout.footer;

  return (
    <footer className={s.root}>
      <div className={s.container}>
        <span className={s.text}>
          {reactStringReplace(loveMessage, ' [icon-heart] ', (match, i) => (
            <Fragment key={i}>
              &nbsp;
              <HeartIcon className={s.icon} />
              &nbsp;
            </Fragment>
          ))}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
