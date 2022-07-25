import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { useHomeContext } from 'components/home';

import GridCard from './GridCard';
import GridProposal from './GridProposal';

import s from './Grid.module.css';

const Grid = () => {
  const [mounted, setMounted] = useState(false);
  const { locale: activeLocale } = useRouter();
  const { queryString } = useHomeContext();
  const { status } = useSession();
  const { data: resources, isValidating, mutate: mutateResources } = useSWR(`/api/resources?${queryString}`);
  const { data: visits, mutate: mutateVisits } = useSWR(status === 'authenticated' ? '/api/users/visits' : null);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      mutateResources();
    }
  }, [activeLocale]);

  return (
    <div className={s.root}>
      <GridProposal />
      {isValidating && !resources
        ? 'Chargement...'
        : resources?.map((resource) => (
            <GridCard
              key={resource.id}
              resource={resource}
              visited={visits?.includes(resource.id)}
              onVisit={(resourceId) => mutateVisits([...visits, resourceId])}
            />
          ))}
    </div>
  );
};

export default Grid;
