const fr = {
  newLocale: 'Nouvelle langue',
  loginRequired: 'Vous devez être connecté',
  themes: {
    light: 'Thème clair',
    dark: 'Thème sombre',
  },
  layout: {
    navbar: {
      links: {
        about: 'A propos',
      },
      userNav: {
        logout: 'Déconnexion',
        settings: 'Paramètres',
      },
    },
    footer: {
      loveMessage: 'Fait avec [icon-heart] pour les développeurs',
    },
  },
  components: {},
  pages: {
    notFound: {
      sorry: 'Désolé, nous ne trouvons pas la page que vous cherchez...',
      draw: 'Laissez votre plus beau pixel art pour les autres égarés.',
      gallery: 'Voici toutes les oeuvres laissés par les égarés',
    },
    home: {
      resourceDeprecated: "Obsolète, soyez prudent lors de l'utilisation",
      searchPlaceholder: 'Rechercher...',
      hero: {
        title: 'Faites partie de la communauté',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed consectetur eleifend sapien a tempor.',
        button: 'Connexion avec GitHub',
      },
      proposal: {
        title: 'Ne soyez pas timide !',
        description: 'Aidez-nous à agrandir la collection de ressources en partageant votre préférée',
        button: 'Commencer',
      },
      filters: {
        title: 'Filtrer par',
        latest: 'Date',
        popular: 'Popularité',
        history: 'Visités',
        favorites: 'Favoris',
      },
      tagsTitle: 'Mots-clés',
      tagsTranslate: 'Traduire',
    },
    about: {},
    user: {
      settings: {
        display: {
          title: 'Affichage',
          ThemePreferences: {
            title: 'Thème préféré',
            description: 'Sélectionnez votre thème préféré entre le clair et le sombre.',
          },
          visitedResources: {
            title: 'Ressources visitées',
            checkbox: "Afficher les ressources visités sur la page d'accueil",
            description: "L'activer ajoutera un filtre d'opacité sur les ressources que vous avez déjà visitées.",
            button: 'Mettre à jour les préférences',
          },
        },
        profile: {
          title: 'Profil',
          button: 'Mettre à jour le profil',
        },
        account: {
          title: 'Compte',
          changeEmail: {
            title: "Changer l'adresse email",
            description: '',
            button: "Mettre à jour l'adresse email",
            form: {
              emailField: 'Email',
            },
          },
          exportData: {
            title: 'Exporter les données du compte',
            description: 'Description...',
            button: 'Exporter les données',
          },
        },
        dangerZone: {
          title: 'Zone de danger',
          deleteAccount: {
            title: 'Supprimer le compte',
            description: 'Votre compte sera entièrement supprimé de la base de données, cette action est irréversible.',
            button: 'Supprimer le compte',
            modal: {
              title: 'Vous êtes sûr ?',
              description: 'Voulez-vous vraiment nous quitter ? Toutes vos données seront perdues à jamais.',
            },
          },
        },
      },
    },
  },
};

export default fr;
