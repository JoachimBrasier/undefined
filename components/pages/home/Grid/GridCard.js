import Image from 'next/image';
import { useRouter } from 'next/router';

import { ExclamationIcon } from '@heroicons/react/outline';
import { memo } from 'react';

import { Tooltip } from 'components/ui';

import locales from 'locales';

import s from './GridCard.module.css';

// TODO add author et created date
// TODO add placeholder image
// TODO responsive mode for mobile
// TODO select tag on click
// TODO overlay on tags (bottom image)
// ? add likes
const GridCard = memo(({ resource }) => {
  const { locale: activeLocale } = useRouter();
  const { resourceDeprecated } = locales[activeLocale].pages.home;

  return (
    <a href={resource.url} target="_blank" key={resource.id} className={s.root} rel="noopener noreferrer">
      <div className={s.imageContainer}>
        <Image src={resource.image} alt={resource.title} className={s.image} layout="fill" objectFit="cover" />
        <div className={s.tags}>
          {resource.tags.map((tag, index) => (
            <span key={index} className={s.tag}>
              {tag}
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
        <p className={s.description}>{resource.description[activeLocale]}</p>
      </div>
    </a>
  );
});

GridCard.displayName = 'GridCard';
export default GridCard;
