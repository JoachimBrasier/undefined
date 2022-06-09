import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { ArrowRightIcon } from '@heroicons/react/outline';

import locales from 'locales';

import s from './GridProposal.module.css';

const GridProposal = () => {
  const { locale: activeLocale } = useRouter();
  const { title, description, button } = locales[activeLocale].pages.home.proposal;

  return (
    <div className={s.root}>
      {/* <div
        className={s.imageContainer}
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dtqosun31/image/upload/w_640/e_blur:2000,q_1,f_auto/sharingcaring-01_kccuip.webp)`,
        }}
      >
        <Image
          src="https://res.cloudinary.com/dtqosun31/image/upload/v1652988751/sharingcaring-01_kccuip.webp"
          alt="Sharing is caring"
          className={s.image}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div> */}
      <div className={s.content}>
        <h3 className={s.title}>{title}</h3>
        <p className={s.description}>{description}</p>
        <Link href="/resources/new" as="/new-resource">
          <a className={s.link}>
            {button}
            <ArrowRightIcon className={s.icon} />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default GridProposal;
