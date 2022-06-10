import { useRouter } from 'next/router';

import { Tab } from '@headlessui/react';
import { CogIcon, DesktopComputerIcon, ShieldExclamationIcon, UserIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { getSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';

import { Account, DangerZone, Display, Profile } from 'components/user/settings';

import locales from 'locales';

const { Group, List, Panels, Panel } = Tab;

const Settings = () => {
  const { locale: activeLocale } = useRouter();
  const { display, profile, account, dangerZone } = locales[activeLocale].pages.user.settings;

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
      <NextSeo title="Settings" nofollow noindex />
      <Group vertical>
        <List className="flex flex-col w-full md:w-72">
          <Tab
            className={({ selected }) =>
              clsx(
                'text-left text-slate-700 dark:text-slate-400 px-2 py-1.5 cursor-pointer flex flex-row flex-nowrap items-center',
                { 'bg-slate-100 dark:bg-slate-800 rounded font-semibold': selected },
              )
            }
          >
            <DesktopComputerIcon className="w-5 h-5 mr-4" />
            {display.title}
          </Tab>
          <Tab
            className={({ selected }) =>
              clsx(
                'text-left text-slate-700 dark:text-slate-400 px-2 py-1.5 cursor-pointer flex flex-row flex-nowrap items-center',
                { 'bg-slate-100 dark:bg-slate-800 rounded font-semibold': selected },
              )
            }
          >
            <UserIcon className="w-5 h-5 mr-4" />
            {profile.title}
          </Tab>
          <Tab
            className={({ selected }) =>
              clsx(
                'text-left text-slate-700 dark:text-slate-400 px-2 py-1.5 cursor-pointer flex flex-row flex-nowrap items-center',
                { 'bg-slate-100 dark:bg-slate-800 rounded font-semibold': selected },
              )
            }
          >
            <CogIcon className="w-5 h-5 mr-4" />
            {account.title}
          </Tab>
          <Tab
            className={({ selected }) =>
              clsx(
                'text-left text-slate-700 dark:text-slate-400 px-2 py-1.5 cursor-pointer flex flex-row flex-nowrap items-center',
                { 'bg-slate-100 dark:bg-slate-800 rounded font-semibold': selected },
              )
            }
          >
            <ShieldExclamationIcon className="w-5 h-5 mr-4" />
            {dangerZone.title}
          </Tab>
        </List>
        <Panels className="grow">
          <Panel>
            <Display />
          </Panel>
          <Panel>
            <Profile />
          </Panel>
          <Panel>
            <Account />
          </Panel>
          <Panel>
            <DangerZone />
          </Panel>
        </Panels>
      </Group>
    </div>
  );
};

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
