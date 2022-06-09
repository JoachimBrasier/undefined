import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { useHomeContext } from 'components/home';

import GridCard from './GridCard';
import GridProposal from './GridProposal';

import s from './Grid.module.css';

const Grid = ({ visits }) => {
  const [mounted, setMounted] = useState(false);
  const { locale: activeLocale } = useRouter();
  const { queryString } = useHomeContext();
  const { data, isValidating, mutate } = useSWR(`/api/resources?${queryString}`);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      mutate();
    }
  }, [activeLocale]);

  return (
    <div className={s.root}>
      <GridProposal />
      {isValidating && !data
        ? 'Chargement...'
        : data?.map((resource) => (
            <GridCard key={resource.id} resource={resource} visited={visits.includes(resource.id)} />
          ))}
    </div>
  );
};

export default Grid;
