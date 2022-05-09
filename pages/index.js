import { Grid, Hero, HomeProvider, List, Search, Sidebar } from 'components/pages/home';

import prisma from 'lib/prisma';

const Home = ({ tags }) => (
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

export const getServerSideProps = async ({ locale: activeLocale }) => {
  const tags = await prisma.tag.findMany({
    include: {
      names: true, // Include all the locales
    },
  });

  // Sort alphabetically regardless of the active locale
  tags.sort((a, b) => {
    // Select the value that match active locale
    // Fallback to english if there is none
    const aName = a.names[activeLocale] || a.names['en'];
    const bName = b.names[activeLocale] || b.names['en'];

    return aName.localeCompare(bName, activeLocale);
  });

  return { props: { tags } };
};

export default Home;
