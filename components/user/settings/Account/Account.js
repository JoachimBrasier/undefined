import { useRouter } from 'next/router';

import locales from 'locales';

import s from './Account.module.css';

const Account = () => {
  const { locale: activeLocale } = useRouter();
  const { changeEmail, exportData } = locales[activeLocale].pages.user.settings.account;

  const handleExport = () => {};

  return (
    <>
      <h3 className={s.title}>{changeEmail.title}</h3>
      <button type="button" className={s.button} onClick={handleExport}>
        {changeEmail.button}
      </button>
      <h3 className={s.title}>{exportData.title}</h3>
      <p className={s.description}>{exportData.description}</p>
      <button type="button" className={s.button} onClick={handleExport}>
        {exportData.button}
      </button>
    </>
  );
};

export default Account;
