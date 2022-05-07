import s from './Search.module.css';

const Search = () => {
  return (
    <div className={s.root}>
      <input className={s.input} placeholder="Rechercher..." />
    </div>
  );
};

export default Search;
