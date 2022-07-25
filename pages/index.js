import { getSession } from 'next-auth/react';
import qs from 'qs';

import { Grid, Hero, HomeProvider, Search, Sidebar } from 'components/home';

const Home = ({ tags, initialQuery, session, visits }) => (
  <HomeProvider initialQuery={initialQuery}>
    <div className="w-full max-w-screen-xl mx-auto px-4 py-6 flex gap-6">
      <Sidebar tags={tags} />
      <div className="grow">
        {!session && <Hero />}
        <Search />
        <Grid visits={visits} />
        <div />
      </div>
    </div>
  </HomeProvider>
);

// TODO visited & favorites filter only when user is auth
export const getServerSideProps = async (ctx) => {
  const { locale: activeLocale } = ctx;
  const availableFilters = ['popular', 'history', 'favorites'];
  const headers = { Locale: activeLocale, Cookie: ctx.req.headers.cookie };
  const session = await getSession(ctx);

  let query = qs.parse(ctx.query, { comma: true });
  query.filter = availableFilters.includes(query.filter) ? query.filter : null;
  query.tags = typeof query.tags === 'undefined' ? [] : Array.isArray(query.tags) ? query.tags : [query.tags];
  query.search = typeof query.search === 'string' ? query.search : null;

  let queryString = qs.stringify(query, { arrayFormat: 'comma', encodeValuesOnly: true, skipNulls: true });

  // Fetch all resources
  let resources = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/resources?${queryString}`, { headers });
  resources = await resources.json();

  // Fetch all tags
  let tags = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tags`, { headers });
  tags = await tags.json();

  let visits = [];

  // Fetch user visited resources
  // Only when user is auth
  if (session) {
    visits = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/visits`, { headers });
    visits = await visits.json();
  }

  return {
    props: {
      initialQuery: {
        activeFilter: query.filter ?? null,
        activeTags: query.tags ?? [],
        search: query.search ?? null,
      },
      tags,
      session,
      visits,
      fallback: {
        [`/api/resources?${queryString}`]: resources,
        ...(session && { '/api/users/visits': visits }),
      },
    },
  };
};

export default Home;
