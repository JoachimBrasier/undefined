const en = {
  newLocale: 'New locale',
  loginRequired: 'You must be logged in',
  themes: {
    light: 'Light theme',
    dark: 'Dark theme',
  },
  layout: {
    navbar: {
      links: {
        about: 'About',
      },
      userNav: {
        logout: 'Logout',
        settings: 'Settings',
      },
    },
    footer: {
      loveMessage: 'Made with [icon-heart] for developers',
    },
  },
  components: {},
  pages: {
    notFound: {
      sorry: "Sorry we can't find the page you're looking for...",
      draw: 'Leave your most beautiful pixel art for the lost others.',
      gallery: 'Here are all the works left by the lost',
    },
    home: {
      resourceDeprecated: 'Deprecated, be careful when using',
      searchPlaceholder: 'Search...',
      hero: {
        title: 'Be part of the community',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed consectetur eleifend sapien a tempor.',
        button: 'Login with GitHub',
      },
      proposal: {
        title: "Don't be shy!",
        description: 'Help us grow the resource collection by sharing your favorite one',
        button: "Let's do it",
      },
      filters: {
        title: 'Filter by',
        latest: 'Date',
        popular: 'Popularity',
        history: 'Visited',
        favorites: 'Favorites',
      },
      tagsTitle: 'Tags',
      tagsTranslate: 'Translate',
    },
    about: {},
    user: {
      settings: {
        display: {
          title: 'Display',
          ThemePreferences: {
            title: 'Theme preferences',
            description: 'Select your favorite theme between light and dark.',
          },
          visitedResources: {
            title: 'Visited resources',
            checkbox: 'Show visited resources on home page',
            description: 'Enabling this will add an opacity filter on resources you already visited.',
            button: 'Update preferences',
          },
        },
        profile: {
          title: 'Profile',
          button: 'Update profile',
        },
        account: {
          title: 'Account',
          changeEmail: {
            title: 'Change email',
            description: '',
            button: 'Update email',
            form: {
              emailField: 'Email',
            },
          },
          exportData: {
            title: 'Export account data',
            description: 'Description...',
            button: 'Export data',
          },
        },
        dangerZone: {
          title: 'Danger zone',
          deleteAccount: {
            title: 'Delete account',
            description: 'Your account will be entirely deleted from the database, this action is irreversible.',
            button: 'Delete account',
            modal: {
              title: 'Are you sure?',
              description: 'Do you really want to leave us? All your data will be lost forever.',
            },
          },
        },
      },
    },
  },
};

export default en;
