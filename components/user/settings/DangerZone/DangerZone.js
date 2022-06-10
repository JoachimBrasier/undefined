import { useRouter } from 'next/router';

import locales from 'locales';

import s from './DangerZone.module.css';

const DangerZone = () => {
  const { locale: activeLocale } = useRouter();
  const { exportData, deleteAccount } = locales[activeLocale].pages.user.settings.dangerZone;

  return (
    <>
      <h3 className="text-lg font-semibold leading-6 text-slate-900 dark:text-slate-200 mb-2 pb-2 flex items-center border-b border-slate-900/10 dark:border-slate-700">
        {exportData.title}
      </h3>
      <p className="text-base leading-5 text-slate-700 dark:text-slate-400">{exportData.description}</p>
      <h3 className="text-lg font-semibold leading-6 text-slate-900 dark:text-slate-200 mb-2 pb-2 flex items-center border-b border-slate-900/10 dark:border-slate-700">
        {deleteAccount.title}
      </h3>
      <p className="text-base leading-5 text-slate-700 dark:text-slate-400">{deleteAccount.description}</p>
    </>
  );
};

export default DangerZone;