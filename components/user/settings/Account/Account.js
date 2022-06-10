import { useRouter } from 'next/router';

import locales from 'locales';

import s from './Account.module.css';

const Account = () => {
  const { locale: activeLocale } = useRouter();
  const { changeEmail } = locales[activeLocale].pages.user.settings.account;

  return (
    <>
      <h3 className="text-lg font-semibold leading-6 text-slate-900 dark:text-slate-200 mb-2 pb-2 flex items-center border-b border-slate-900/10 dark:border-slate-700">
        {changeEmail.title}
      </h3>
    </>
  );
};

export default Account;
