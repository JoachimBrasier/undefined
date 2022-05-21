import GridCard from './GridCard';
import GridProposal from './GridProposal';

import s from './Grid.module.css';

const Grid = ({ resources, visits }) => (
  <div className={s.root}>
    <GridProposal />
    {resources.map((resource) => (
      <GridCard key={resource.id} resource={resource} visited={visits.includes(resource.id)} />
    ))}
  </div>
);

export default Grid;
