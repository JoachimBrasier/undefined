import { useRouter } from 'next/router';

import locales from 'locales';

import s from './DangerZone.module.css';

const DangerZone = () => {
  const { locale: activeLocale } = useRouter();
  const { exportData, deleteAccount } = locales[activeLocale].pages.user.settings.dangerZone;

  const handleDelete = () => {};

  return (
    <>
      <h3 className={s.title}>{deleteAccount.title}</h3>
      <p className={s.description}>{deleteAccount.description}</p>
      <button type="button" className={s.deleteButton} onClick={handleDelete}>
        {deleteAccount.button}
      </button>
    </>
  );
};

export default DangerZone;
