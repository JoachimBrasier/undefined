import GridCard from './GridCard';
import GridProposal from './GridProposal';

import s from './Grid.module.css';

const Grid = ({ resources }) => (
  <div className={s.root}>
    <GridProposal />
    {resources.map((resource) => (
      <GridCard key={resource.id} resource={resource} />
    ))}
  </div>
);

export default Grid;
