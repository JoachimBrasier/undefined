import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import locales from 'locales';

import s from './DangerZone.module.css';

const DangerZone = () => {
  const { data } = useSession();
  const { locale: activeLocale } = useRouter();
  const { exportData, deleteAccount } = locales[activeLocale].pages.user.settings.dangerZone;

  const handleDelete = async () => {
    const result = await fetch(`/api/users/${data.user.id}/delete-account`, {
      method: 'DELETE',
    });

    if (result.status === 200) {
      toast.success('Account successfully deleted');
    }
  };

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
