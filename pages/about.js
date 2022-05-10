import { getSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';

const About = ({ session }) => (
  <>
    <NextSeo title="About || A propos" />
  </>
);

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  return {
    props: {
      session,
    },
  };
};

export default About;
