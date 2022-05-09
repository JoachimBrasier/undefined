import { Grid, Hero, HomeProvider, List, Search, Sidebar } from 'components/pages/home';

import prisma from 'lib/prisma';

const Home = ({ tags }) => {
  return (
    <HomeProvider>
      <div className="w-full max-w-screen-xl mx-auto px-4 py-6 flex gap-6">
        <Sidebar tags={tags} />
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
};

export const getServerSideProps = async () => {
  const tags = await prisma.tag.findMany({
    include: {
      name: true,
    },
  });

  return { props: { tags } };
};

export default Home;
