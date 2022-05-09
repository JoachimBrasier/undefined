import GridCard from './GridCard';

import s from './Grid.module.css';

const Grid = ({ resources }) => (
  <div className={s.root}>
    {resources.map((resource) => (
      <GridCard key={resource.id} resource={resource} />
    ))}
  </div>
);

export default Grid;
