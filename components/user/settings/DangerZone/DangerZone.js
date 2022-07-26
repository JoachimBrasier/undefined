import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';

import { Modal } from 'components/ui';

import locales from 'locales';

import s from './DangerZone.module.css';

const DangerZone = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef();
  const { data } = useSession();
  const { theme } = useTheme();
  const { locale: activeLocale } = useRouter();
  const { deleteAccount } = locales[activeLocale].pages.user.settings.dangerZone;

  const handleClose = () => {
    recaptchaRef.current.reset();
    setModalVisible(false);
  };

  const handleDelete = async () => {
    setLoading(true);

    const result = await fetch(`/api/users/${data.user.id}/delete-account`, {
      method: 'DELETE',
    });

    if (result.status === 200) {
      handleClose();
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
        onClose={handleClose}
        onConfirm={handleDelete}
        title={deleteAccount.modal.title}
        description={deleteAccount.modal.description}
        danger
        loading={loading}
      >
        <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} hl={activeLocale} theme={theme} />
      </Modal>
    </>
  );
};

export default DangerZone;
