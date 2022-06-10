import { useRouter } from 'next/router';

import locales from 'locales';

import s from './Display.module.css';

const Display = () => {
  const { locale: activeLocale } = useRouter();
  const { ThemePreferences, visitedResources } = locales[activeLocale].pages.user.settings.display;

  return (
    <>
      <h3 className="text-lg font-semibold leading-6 text-slate-900 dark:text-slate-200 mb-2 pb-2 flex items-center border-b border-slate-900/10 dark:border-slate-700">
        {ThemePreferences.title}
      </h3>
      <h3 className="text-lg font-semibold leading-6 text-slate-900 dark:text-slate-200 mb-2 pb-2 flex items-center border-b border-slate-900/10 dark:border-slate-700">
        {visitedResources.title}
      </h3>
    </>
  );
};

export default Display;
