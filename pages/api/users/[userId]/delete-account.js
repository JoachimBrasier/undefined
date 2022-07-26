import Joi from 'joi';

import withAuth from 'lib/middlewares/withAuth';
import withJoi from 'lib/middlewares/withJoi';
import validateRecaptcha from 'lib/validate-recaptcha';

const schema = Joi.object({
  recaptcha: Joi.string().required().trim(),
});

const handlePOST = withJoi(async (req, res) => {
  const result = await validateRecaptcha(req.body.recaptcha);

  return res.status(200).json(result);
}, schema);

const handler = async (req, res) => {
  if (req.method !== 'DELETE') {
    return res.status(405).end();
  }

  return handlePOST(req, res);
};

export default withAuth(handler, { sameUser: true });
