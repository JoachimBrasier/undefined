import { Grid, Hero, HomeProvider, List, Search, Sidebar } from 'components/pages/home';

const Home = () => (
  <HomeProvider>
    <div className="w-full max-w-screen-xl mx-auto px-4 py-6 flex gap-6">
      <Sidebar />
      <div className="flex-grow">
        <Hero />
        <Search />
        <Grid />
        <List />
        <div />
      </div>
    </div>
  </HomeProvider>
);

export default Home;
