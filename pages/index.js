import { getSession } from 'next-auth/react';
import qs from 'qs';

import { Grid, Hero, HomeProvider, Search, Sidebar } from 'components/home';

const Home = ({ tags, resources, initialQuery, session, visits }) => (
  <HomeProvider initialQuery={initialQuery}>
    <div className="w-full max-w-screen-xl mx-auto px-4 py-6 flex gap-6">
      <Sidebar tags={tags} />
      <div className="flex-grow">
        {!session && <Hero />}
        <Search />
        <Grid resources={resources} visits={visits} />
        <div />
      </div>
    </div>
  </HomeProvider>
);

// TODO favorites filter only when user is auth
// TODO visited filter only when user is auth
export const getServerSideProps = async (ctx) => {
  const { locale: activeLocale } = ctx;
  const headers = { Locale: activeLocale, Cookie: ctx.req.headers.cookie };
  const session = await getSession(ctx);

  const query = qs.parse(ctx.query, { comma: true });

  // Fetch all resources
  let resources = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/resources`, { headers });
  resources = await resources.json();

  // Fetch all tags
  let tags = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tags`, { headers });
  tags = await tags.json();

  let visits = [];

  if (session) {
    visits = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/visits`, { headers });
    visits = await visits.json();
  }

  return {
    props: {
      tags,
      resources,
      initialQuery: query,
      session,
      visits,
    },
  };
};

export default Home;
