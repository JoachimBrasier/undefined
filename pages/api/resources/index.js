import cookie from 'cookie';
import Joi from 'joi';

import withAuth from 'lib/middlewares/withAuth';
import withJoi from 'lib/middlewares/withJoi';
import prisma from 'lib/prisma';

const handleGET = async (req, res) => {
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

const postSchema = Joi.object({
  title: Joi.string().min(2).max(50).required().trim(),
  descriptions: Joi.object({
    en: Joi.string().min(50).max(160).required().trim(),
    fr: Joi.string().min(50).max(160).trim(),
  }).required(),
  url: Joi.string().uri(),
  image: Joi.string().required(),
  deprecated: Joi.boolean().default(false),
  tags: Joi.array().items({ value: Joi.string().required(), label: Joi.string().required() }).max(5).required(),
});

const handlePOST = withAuth(
  withJoi(async (req, res) => {
    const session = req.session;
    const { title, descriptions, image, url, tags, deprecated } = req.body;
    const connectOrCreateTags = tags.map((tag) => ({
      where: { slug: tag.value },
      create: { slug: tag.value, names: { create: { en: tag.label } } },
    }));

    const result = await prisma.resource.create({
      data: {
        title,
        deprecated: deprecated ?? false,
        image,
        url,
        status: 'SUBMITTED',
        descriptions: {
          create: descriptions,
        },
        tags: {
          connectOrCreate: connectOrCreateTags,
        },
        author: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return res.status(201).json(result);
  }, postSchema),
);

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return handleGET(req, res);
    case 'POST':
      return handlePOST(req, res);
    default:
      return res.status(405).json({});
  }
};

export default handler;
