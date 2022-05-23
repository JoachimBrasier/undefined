import cookie from 'cookie';

import prisma from 'lib/prisma';

const handler = async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie ?? '');
  const activeLocale = cookies.NEXT_LOCALE || 'en';

  const resources = await prisma.resource.findMany({
    where: {
      status: 'PUBLISHED',
    },
    orderBy: {
      createdAt: 'desc',
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
      author: {
        select: {
          id: true,
          username: true,
        },
      },
      _count: {
        select: {
          visitedBy: true,
        },
      },
    },
  });

  return res.status(200).json(resources);
};

export default handler;
