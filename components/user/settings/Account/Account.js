import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';

import locales from 'locales';

import s from './Account.module.css';

const Account = () => {
  const { data } = useSession();
  const { locale: activeLocale } = useRouter();
  const { changeEmail, exportData } = locales[activeLocale].pages.user.settings.account;

  const handleExport = () => {};

  return (
    <>
      <h3 className={s.title}>{changeEmail.title}</h3>
      <div className={s.inputContainer}>
        <label htmlFor="email" className={s.label}>
          {changeEmail.form.emailField}
        </label>
        <input type="text" id="email" name="email" className={s.input} defaultValue={data.user.email} />
      </div>
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
