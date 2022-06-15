import Joi from 'joi';

import withAuth from 'lib/middlewares/withAuth';
import withJoi from 'lib/middlewares/withJoi';
import prisma from 'lib/prisma';

const putSchema = Joi.object({
  resourceId: Joi.number().required(),
});

const handlePUT = withJoi(async (req, res) => {
  const session = req.session;

  const resource = await prisma.resource.findUnique({ where: { id: req.body.resourceId } });

  if (!resource) {
    return res.status(400).end();
  }

  const result = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      visits: {
        create: [
          {
            resourceId: req.body.resourceId,
            visitedAt: new Date().toISOString(),
          },
        ],
      },
    },
  });

  return res.status(200).json(result);
}, putSchema);

const handleGET = async (req, res) => {
  const session = req.session;

  let visits = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      visits: {
        select: {
          resourceId: true,
        },
      },
    },
  });

  visits = visits.visits.map((item) => item.resourceId);

  return res.status(200).json(visits);
};

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return handleGET(req, res);
    case 'PUT':
      return handlePUT(req, res);
    default:
      return res.status(405).end();
  }
};

export default withAuth(handler);
