import { useRouter } from 'next/router';

import { useTheme } from 'next-themes';

import locales from 'locales';

import s from './Display.module.css';

const Display = () => {
  const { locale: activeLocale } = useRouter();
  const { theme, setTheme } = useTheme();
  const { ThemePreferences, visitedResources } = locales[activeLocale].pages.user.settings.display;
  const { light, dark } = locales[activeLocale].themes;

  return (
    <>
      <h3 className="text-lg font-semibold leading-6 text-slate-900 dark:text-slate-200 mb-4 pb-4 first:mt-0 mt-8 flex items-center border-b border-slate-900/10 dark:border-slate-700">
        {ThemePreferences.title}
      </h3>
      <p className="text-base leading-5 text-slate-700 dark:text-slate-400">{ThemePreferences.description}</p>
      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <label
          htmlFor="light-theme-radio"
          className="flex items-center p-3 block w-full border border-slate-900/10 dark:border-slate-700 rounded-md text-base leading-5 bg-transparent dark:text-gray-400"
        >
          <input
            type="radio"
            name="theme-radio"
            className="appearance-none rounded-full h-4 w-4 border border-slate-900/10 dark:border-slate-700 bg-transparent checked:bg-blue-600 checked:border-blue-600 align-top bg-no-repeat bg-center bg-contain cursor-pointer"
            id="light-theme-radio"
            checked={theme === 'light'}
            onChange={() => setTheme('light')}
          />
          <span className="text-base leading-5 font-medium text-slate-900 dark:text-slate-200 ml-3">{light}</span>
        </label>
        <label
          htmlFor="dark-theme-radio"
          className="flex items-center p-3 block w-full border border-slate-900/10 dark:border-slate-700 rounded-md text-base leading-5 bg-transparent dark:text-gray-400"
        >
          <input
            type="radio"
            name="theme-radio"
            className="appearance-none rounded-full h-4 w-4 border border-slate-900/10 dark:border-slate-700 bg-transparent checked:bg-blue-600 checked:border-blue-600 align-top bg-no-repeat bg-center bg-contain cursor-pointer"
            id="dark-theme-radio"
            checked={theme === 'dark'}
            onChange={() => setTheme('dark')}
          />
          <span className="text-base leading-5 font-medium text-slate-900 dark:text-slate-200 ml-3">{dark}</span>
        </label>
      </div>
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
