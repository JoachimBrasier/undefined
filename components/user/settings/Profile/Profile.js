import { useRouter } from 'next/router';

import locales from 'locales';

import s from './Profile.module.css';

const Profile = () => {
  const { locale: activeLocale } = useRouter();
  const { title } = locales[activeLocale].pages.user.settings.profile;

  return (
    <>
      <h3 className={s.title}>
        {title}
      </h3>
    </>
  );
};

export default Profile;
