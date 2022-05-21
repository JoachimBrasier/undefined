import { getSession } from 'next-auth/react';

const withAuth = (handler, options = { sameUser: false }) => {
  return async (req, res) => {
    const session = await getSession({ req });
    const { userId } = req.query;

    if (!session) {
      return res.status(401).json();
    }

    if (options.sameUser) {
      if (!userId) {
        return res.status(403).json();
      }

      if (session.user.id !== userId) {
        return res.status(403).json();
      }
    }

    req.session = session;

    return handler(req, res);
  };
};

export default withAuth;
