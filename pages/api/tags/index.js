import cookie from 'cookie';

import prisma from 'lib/prisma';

const handler = async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie ?? '');
  const activeLocale = cookies.NEXT_LOCALE || 'en';

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

  return res.status(200).json(tags);
};

export default handler;
