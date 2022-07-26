import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { Modal } from 'components/ui';

import locales from 'locales';

import s from './DangerZone.module.css';

const DangerZone = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data } = useSession();
  const { locale: activeLocale } = useRouter();
  const { deleteAccount } = locales[activeLocale].pages.user.settings.dangerZone;

  const handleDelete = async () => {
    setLoading(true);

    const result = await fetch(`/api/users/${data.user.id}/delete-account`, {
      method: 'DELETE',
    });

    if (result.status === 200) {
      setModalVisible(false);
      toast.success('Account successfully deleted');
    }

    setLoading(false);
  };

  return (
    <>
      <h3 className={s.title}>{deleteAccount.title}</h3>
      <p className={s.description}>{deleteAccount.description}</p>
      <button type="button" className={s.deleteButton} onClick={() => setModalVisible(true)}>
        {deleteAccount.button}
      </button>
      <Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDelete}
        title={deleteAccount.modal.title}
        description={deleteAccount.modal.description}
        danger
        loading={loading}
      />
    </>
  );
};

export default DangerZone;
