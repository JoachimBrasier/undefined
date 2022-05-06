import { useRouter } from 'next/router';

import i18n from './i18n.json';

import s from './Footer.module.css';

const { loveMessage } = i18n;

const Footer = () => {
  const { locale } = useRouter();

  return (
    <footer className={s.root}>
      <div className={s.container}>
        <span className={s.text}>{loveMessage[locale]}</span>
      </div>
    </footer>
  );
};

export default Footer;
