import { useRouter } from 'next/router';

import locales from 'locales';

import s from './DangerZone.module.css';

const DangerZone = () => {
  const { locale: activeLocale } = useRouter();
  const { exportData, deleteAccount } = locales[activeLocale].pages.user.settings.dangerZone;

  return (
    <>
      <h3 className={s.title}>{exportData.title}</h3>
      <p className={s.description}>{exportData.description}</p>
      <h3 className={s.title}>{deleteAccount.title}</h3>
      <p className={s.description}>{deleteAccount.description}</p>
    </>
  );
};

export default DangerZone;
