import { useRouter } from 'next/router';

import locales from 'locales';

import s from './Display.module.css';

const Display = () => {
  const { locale: activeLocale } = useRouter();
  const { ThemePreferences, visitedResources } = locales[activeLocale].pages.user.settings.display;

  return (
    <>
      <h3 className="text-lg font-semibold leading-6 text-slate-900 dark:text-slate-200 mb-4 pb-4 first:mt-0 mt-8 flex items-center border-b border-slate-900/10 dark:border-slate-700">
        {ThemePreferences.title}
      </h3>
      <p className="text-base leading-5 text-slate-700 dark:text-slate-400">{ThemePreferences.description}</p>
      <h3 className="text-lg font-semibold leading-6 text-slate-900 dark:text-slate-200 mb-4 pb-4 first:mt-0 mt-8 flex items-center border-b border-slate-900/10 dark:border-slate-700">
        {visitedResources.title}
      </h3>
      <div className="relative flex items-start">
        <div className="flex items-center h-5">
          <input
            id="visited-resources-checkbox"
            name="visited-resources-checkbox"
            type="checkbox"
            className="appearance-none h-4 w-4 border border-slate-900/10 dark:border-slate-700 rounded-sm bg-transparent checked:bg-blue-600 checked:border-blue-600 align-top bg-no-repeat bg-center bg-contain cursor-pointer"
            aria-describedby="visited-resources-checkbox-description"
          />
        </div>
        <label htmlFor="visited-resources-checkbox" className="ml-3">
          <span className="block text-base leading-5 font-medium text-slate-900 dark:text-slate-200">
            {visitedResources.checkbox}
          </span>
          <span
            id="visited-resources-checkbox-description"
            className="block text-sm leading-4 text-gray-500 dark:text-gray-400"
          >
            {visitedResources.description}
          </span>
        </label>
      </div>
    </>
  );
};

export default Display;
