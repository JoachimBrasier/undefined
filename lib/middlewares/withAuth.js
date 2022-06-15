import { getSession } from 'next-auth/react';

const withAuth = (handler, options = { sameUser: false }) => {
  return async (req, res) => {
    const session = await getSession({ req });
    const { userId } = req.query;

    if (!session) {
      return res.status(401).end();
    }

    if (options.sameUser) {
      if (!userId) {
        return res.status(403).end();
      }

      if (session.user.id !== userId) {
        return res.status(403).end();
      }
    }

    req.session = session;

    return handler(req, res);
  };
};

export default withAuth;
