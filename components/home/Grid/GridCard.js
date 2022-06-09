import Image from 'next/image';
import { useRouter } from 'next/router';

import { ExclamationIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { memo } from 'react';

import { useHomeContext } from 'components/home';
import { Tooltip } from 'components/ui';

import formatDate from 'lib/format-date';

import locales from 'locales';

import s from './GridCard.module.css';

const GridCard = memo(({ resource, onVisit, visited }) => {
  const { status } = useSession();
  const { locale: activeLocale } = useRouter();
  const { resourceDeprecated } = locales[activeLocale].pages.home;
  const { activeTags, setActiveTags } = useHomeContext();

  const onTagClick = (event, tag) => {
    event.preventDefault();

    setActiveTags(tag);
  };

  const handleVisit = async (event) => {
    // if clicked on tags
    if (event.target.type === 'button') {
      return;
    }

    // if not authenticated
    if (status !== 'authenticated') {
      return;
    }

    // if already visited
    if (visited) {
      return;
    }

    const { id: resourceId } = resource;

    const result = await fetch(`/api/user/visits`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resourceId }),
    });

    if (result.status === 200) {
      onVisit(resourceId);
    }
  };

  return (
    <a
      href={resource.url}
      target="_blank"
      key={resource.id}
      className={clsx(s.root, { [s.rootVisited]: visited })}
      rel="noopener noreferrer"
      onClick={handleVisit}
    >
      {/* <div
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
          objectPosition="top"
        />
        <div className={s.tags}>
          {resource.tags.map((tag) => (
            <button
              type="button"
              key={tag.id}
              className={clsx(s.tag, { [s.activeTag]: activeTags.includes(tag.slug) })}
              onClick={(e) => onTagClick(e, tag.slug)}
            >
              {tag.names[activeLocale] || tag.names['en']}
            </button>
          ))}
        </div>
      </div> */}
      <div className={s.content}>
        <small className={s.date}>{formatDate(resource.createdAt, activeLocale)}</small>
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
