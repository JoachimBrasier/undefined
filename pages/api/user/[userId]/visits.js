import Joi from 'joi';

import withAuth from 'lib/middlewares/withAuth';
import withJoi from 'lib/middlewares/withJoi';
import prisma from 'lib/prisma';

const schema = Joi.object({
  resourceId: Joi.number().required(),
});

const handlePUT = withJoi(async (req, res) => {
  const resource = await prisma.resource.findUnique({ where: { id: req.body.resourceId } });

  if (!resource) {
    return res.status(400).json();
  }

  const result = await prisma.user.update({
    where: {
      id: req.query.userId,
    },
    data: {
      visits: {
        connect: [{ id: req.body.resourceId }],
      },
    },
  });

  return res.status(200).json(result);
}, schema);

const handleGET = async (req, res) => {
  let visits = [];

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

  visits = user.visits.map((item) => item.id);

  return res.status(200).json(visits);
};

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return handleGET(req, res);
    case 'PUT':
      return handlePUT(req, res);
    default:
      return res.status(405).json();
  }
};

export default withAuth(handler, { sameUser: true });
