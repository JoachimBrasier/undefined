import withAuth from 'lib/middlewares/withAuth';

const handler = async (req, res) => {
  if (req.method !== 'PUT') {
    return res.status(405).end();
  }

  return res.status(200).json({});
};

export default withAuth(handler, { sameUser: true });
