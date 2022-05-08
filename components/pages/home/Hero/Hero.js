import { GitHubIcon } from 'components/icon';

import s from './Hero.module.css';

const Hero = () => (
  <section className={s.root}>
    <h1 className={s.title}>Help us !</h1>
    <p className={s.description}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur eleifend sapien a tempor.
    </p>
    <button className={s.button} type="button">
      <GitHubIcon className={s.icon} />
      Login with GitHub
    </button>
  </section>
);

export default Hero;
