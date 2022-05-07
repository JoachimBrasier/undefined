import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';

const initialState = {
  isSidebarOpen: false,
  filter: 'latest',
  tags: [],
  search: '',
};

const HomeContext = createContext(initialState);

const homeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TAGS':
      const newTags = [...state.tags];

      if (newTags.includes(action.value)) {
        const index = newTags.indexOf(action.value);
        newTags.splice(index, 1);
      } else {
        newTags.push(action.value);
      }

      return { ...state, tags: newTags };
    case 'SET_FILTER':
      return { ...state, filter: action.value };
    case 'OPEN_SIDEBAR':
      return { ...state, isSidebarOpen: true };
    case 'CLOSE_SIDEBAR':
      return { ...state, isSidebarOpen: false };
    case 'TOGGLE_SIDEBAR':
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    default:
      return state;
  }
};

export const HomeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(homeReducer, initialState);

  const isSidebarOpen = useMemo(() => state.isSidebarOpen, [state.isSidebarOpen]);
  const filter = useMemo(() => state.filter, [state.filter]);
  const tags = useMemo(() => state.tags, [state.tags]);
  const search = useMemo(() => state.search, [state.search]);

  const toggleSidebar = useCallback(() => dispatch({ type: 'TOGGLE_SIDEBAR' }), [dispatch]);
  const openSidebar = useCallback(() => dispatch({ type: 'OPEN_SIDEBAR' }), [dispatch]);
  const closeSidebar = useCallback(() => dispatch({ type: 'CLOSE_SIDEBAR' }), [dispatch]);
  const setFilter = useCallback((value) => dispatch({ type: 'SET_FILTER', value }), [dispatch]);
  const setTags = useCallback((value) => dispatch({ type: 'SET_TAGS', value }), [dispatch]);

  const value = useMemo(
    () => ({
      isSidebarOpen,
      filter,
      tags,
      search,
      toggleSidebar,
      openSidebar,
      closeSidebar,
      setFilter,
      setTags,
    }),
    [isSidebarOpen, filter, tags, search, toggleSidebar, openSidebar, closeSidebar, setFilter, setTags],
  );

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export const useHomeContext = () => useContext(HomeContext);
