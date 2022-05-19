import { useRouter } from 'next/router';

import { NextSeo } from 'next-seo';

import { DrawingCanvas } from 'components/common';

import locales from 'locales';

// TODO add flood fill (paint bucket)
// TODO add color picker
const Error = () => {
  const { locale: activeLocale } = useRouter();
  const { sorry, draw, gallery } = locales[activeLocale].pages.notFound;

  return (
    <>
      <NextSeo title="404" nofollow noindex />
      <div className="w-full max-w-screen-xl mx-auto px-4 py-16">
        <h1 className="text-center text-5xl font-bold leading-7 mb-8 text-slate-900 dark:text-slate-200">404</h1>
        <p className="text-center text-base font-normal leading-6 text-slate-900 dark:text-slate-200">{sorry}</p>
        {/* <p className="hidden md:block text-center text-base font-normal leading-6 text-slate-900 dark:text-slate-200 mb-8">
          {draw}
        </p>
        <DrawingCanvas /> */}
      </div>
    </>
  );
};

export default Error;
