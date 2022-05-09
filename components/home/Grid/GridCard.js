import Image from 'next/image';
import { useRouter } from 'next/router';

import { ExclamationIcon } from '@heroicons/react/outline';
import { memo } from 'react';

import { Tooltip } from 'components/ui';

import locales from 'locales';

import s from './GridCard.module.css';

// TODO add author et created date
// TODO add placeholder image
// TODO select tag on click
// TODO overlay on tags (bottom image)
// TODO remove body scroll
// ? add likes
const GridCard = memo(({ resource }) => {
  const { locale: activeLocale } = useRouter();
  const { resourceDeprecated } = locales[activeLocale].pages.home;

  return (
    <a href={resource.url} target="_blank" key={resource.id} className={s.root} rel="noopener noreferrer">
      <div
        className={s.imageContainer}
        style={{
          backgroundImage: `url(https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_640/e_blur:2000,q_1,f_auto/${resource.image})`,
        }}
      >
        <Image
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${resource.image}`}
          alt={resource.title}
          className={s.image}
          layout="fill"
          objectFit="cover"
        />
        <div className={s.tags}>
          {resource.tags.map((tag) => (
            <span key={tag.id} className={s.tag}>
              {tag.names[activeLocale] || tag.names['en']}
            </span>
          ))}
        </div>
      </div>
      <div className={s.content}>
        <h5 className={s.title}>
          {resource.deprecated && (
            <Tooltip title={resourceDeprecated} placement="bottom">
              <ExclamationIcon className={s.icon} />
            </Tooltip>
          )}
          {resource.title}
        </h5>
        <p className={s.description}>{resource.descriptions[activeLocale] || resource.descriptions['en']}</p>
      </div>
    </a>
  );
});

GridCard.displayName = 'GridCard';
export default GridCard;
