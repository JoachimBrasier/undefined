import { Grid, List, Search, Sidebar } from 'components/pages/home';

const Home = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto p-4 flex gap-6">
      <Sidebar />
      <div className="flex-grow">
        <Search />
        <Grid />
        <List />
        <div />
      </div>
    </div>
  );
};

export default Home;
