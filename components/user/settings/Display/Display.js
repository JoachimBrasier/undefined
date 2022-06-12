import { useRouter } from 'next/router';

import { useTheme } from 'next-themes';

import locales from 'locales';

import s from './Display.module.css';

const Display = () => {
  const { locale: activeLocale } = useRouter();
  const { theme, setTheme } = useTheme();
  const { ThemePreferences, visitedResources } = locales[activeLocale].pages.user.settings.display;
  const { light, dark } = locales[activeLocale].themes;

  const handleSave = () => {};

  return (
    <>
      <h3 className={s.title}>{ThemePreferences.title}</h3>
      <p className={s.description}>{ThemePreferences.description}</p>
      <div className={s.radioGrid}>
        <label htmlFor="light-theme-radio" className={s.radioLabel}>
          <input
            type="radio"
            name="theme-radio"
            className={s.radioInput}
            id="light-theme-radio"
            checked={theme === 'light'}
            onChange={() => setTheme('light')}
          />
          <span className={s.radioText}>{light}</span>
        </label>
        <label htmlFor="dark-theme-radio" className={s.radioLabel}>
          <input
            type="radio"
            name="theme-radio"
            className={s.radioInput}
            id="dark-theme-radio"
            checked={theme === 'dark'}
            onChange={() => setTheme('dark')}
          />
          <span className={s.radioText}>{dark}</span>
        </label>
      </div>
      <h3 className={s.title}>{visitedResources.title}</h3>
      <div className={s.checkbox}>
        <div className={s.checkboxInputContainer}>
          <input
            id="visited-resources-checkbox"
            name="visited-resources-checkbox"
            type="checkbox"
            className={s.checkboxInput}
            aria-describedby="visited-resources-checkbox-description"
          />
        </div>
        <label htmlFor="visited-resources-checkbox" className={s.checkboxLabel}>
          <span className={s.checkboxText}>{visitedResources.checkbox}</span>
          <span id="visited-resources-checkbox-description" className={s.checkboxDescription}>
            {visitedResources.description}
          </span>
        </label>
      </div>
      <button type="button" className={s.button} onClick={handleSave}>
        {visitedResources.button}
      </button>
    </>
  );
};

export default Display;
