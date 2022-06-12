import { useRouter } from 'next/router';

import locales from 'locales';

import s from './Profile.module.css';

const Profile = () => {
  const { locale: activeLocale } = useRouter();
  const { title, button } = locales[activeLocale].pages.user.settings.profile;

  const handleSave = () => {};

  return (
    <>
      <h3 className={s.title}>{title}</h3>
      <button type="button" className={s.button} onClick={handleSave}>
        {button}
      </button>
    </>
  );
};

export default Profile;
