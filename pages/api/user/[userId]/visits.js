import Joi from 'joi';

import withAuth from 'lib/middlewares/withAuth';
import withJoi from 'lib/middlewares/withJoi';
import prisma from 'lib/prisma';

const handler = async (req, res) => {
  if (req.method !== 'PUT') {
    return res.status(405).json();
  }

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
};

const schema = Joi.object({
  resourceId: Joi.number().required(),
});

export default withAuth(withJoi(handler, schema), { sameUser: true });
