import { getSession } from 'next-auth/react';
import qs from 'qs';

import { Grid, Hero, HomeProvider, Search, Sidebar } from 'components/home';

import prisma from 'lib/prisma';

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
  const session = await getSession(ctx);
  const { locale: activeLocale } = ctx;

  const query = qs.parse(ctx.query, { comma: true });

  // Fetch all resources
  const resources = await prisma.resource.findMany({
    where: {
      status: 'PUBLISHED',
    },
    include: {
      descriptions: {
        select: {
          en: true, // Always include english
          ...(activeLocale !== 'en' && { [activeLocale]: true }), // Include active locale
        },
      },
      tags: {
        select: {
          id: true,
          slug: true,
          names: {
            select: {
              en: true, // Always include english
              ...(activeLocale !== 'en' && { [activeLocale]: true }), // Include active locale
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Fetch all tags
  const tags = await prisma.tag.findMany({
    include: {
      names: {
        select: {
          en: true, // Always include english
          ...(activeLocale !== 'en' && { [activeLocale]: true }), // Include active locale
        },
      },
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

  let visits = [];

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        visits: {
          select: {
            id: true,
          },
        },
      },
    });

    if (user) {
      visits = user.visits.map((item) => item.id);
    }
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
