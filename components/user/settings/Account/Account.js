import { useRouter } from 'next/router';

import locales from 'locales';

import s from './Account.module.css';

const Account = () => {
  const { locale: activeLocale } = useRouter();
  const { changeEmail } = locales[activeLocale].pages.user.settings.account;

  return (
    <>
      <h3 className={s.title}>{changeEmail.title}</h3>
    </>
  );
};

export default Account;
