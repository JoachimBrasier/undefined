import { useRouter } from 'next/router';

import { HeartIcon } from '@heroicons/react/solid';
import reactStringReplace from 'react-string-replace';

import i18n from './i18n.json';

import s from './Footer.module.css';

const { loveMessage } = i18n;

const Footer = () => {
  const { locale } = useRouter();

  return (
    <footer className={s.root}>
      <div className={s.container}>
        <span className={s.text}>
          {reactStringReplace(loveMessage[locale], ' [icon-heart] ', () => (
            <>
              &nbsp;
              <HeartIcon className={s.icon} />
              &nbsp;
            </>
          ))}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
