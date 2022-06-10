import { useRouter } from 'next/router';

import locales from 'locales';

import s from './Profile.module.css';

const Profile = () => {
  const { locale: activeLocale } = useRouter();
  const { title } = locales[activeLocale].pages.user.settings.profile;

  return (
    <>
      <h3 className="text-lg font-semibold leading-6 text-slate-900 dark:text-slate-200 mb-2 pb-2 flex items-center border-b border-slate-900/10 dark:border-slate-700">
        {title}
      </h3>
    </>
  );
};

export default Profile;
