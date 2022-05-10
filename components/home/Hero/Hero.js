import { useRouter } from 'next/router';

import { signIn } from 'next-auth/react';

import { GitHubIcon } from 'components/icon';

import locales from 'locales';

import s from './Hero.module.css';

const Hero = () => {
  const { locale: activeLocale } = useRouter();
  const { title, description, button } = locales[activeLocale].pages.home.hero;

  return (
    <section className={s.root}>
      <h1 className={s.title}>{title}</h1>
      <p className={s.description}>{description}</p>
      <button className={s.button} type="button" onClick={() => signIn('github')}>
        <GitHubIcon className={s.icon} />
        {button}
      </button>
    </section>
  );
};

export default Hero;
