import { getSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';

const Settings = ({ session }) => (
  <>
    <NextSeo title="Settings" nofollow noindex />
  </>
);

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default Settings;
