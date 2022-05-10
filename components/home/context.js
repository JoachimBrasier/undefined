import { useRouter } from 'next/router';

import qs from 'qs';
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';

const initialState = {
  isSidebarOpen: false,
  activeFilter: 'latest',
  activeTags: [],
  search: '',
};

const HomeContext = createContext(initialState);

const homeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, search: action.value };
    case 'SET_TAGS':
      const newTags = [...state.activeTags];

      if (newTags.includes(action.value)) {
        const index = newTags.indexOf(action.value);
        newTags.splice(index, 1);
      } else {
        newTags.push(action.value);
      }

      return { ...state, activeTags: newTags };
    case 'SET_FILTER':
      return { ...state, activeFilter: action.value };
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

export const HomeProvider = ({ children, initialQuery }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(homeReducer, initialState);

  const isSidebarOpen = useMemo(() => state.isSidebarOpen, [state.isSidebarOpen]);
  const activeFilter = useMemo(() => state.activeFilter, [state.activeFilter]);
  const activeTags = useMemo(() => state.activeTags, [state.activeTags]);
  const search = useMemo(() => state.search, [state.search]);

  const toggleSidebar = useCallback(() => dispatch({ type: 'TOGGLE_SIDEBAR' }), [dispatch]);
  const openSidebar = useCallback(() => dispatch({ type: 'OPEN_SIDEBAR' }), [dispatch]);
  const closeSidebar = useCallback(() => dispatch({ type: 'CLOSE_SIDEBAR' }), [dispatch]);
  const setActiveFilter = useCallback((value) => dispatch({ type: 'SET_FILTER', value }), [dispatch]);
  const setActiveTags = useCallback((value) => dispatch({ type: 'SET_TAGS', value }), [dispatch]);
  const setSearch = useCallback((value) => dispatch({ type: 'SET_SEARCH', value }), [dispatch]);

  useEffect(() => {
    const query = qs.stringify(
      {
        ...(search !== initialState.search && { search }),
        ...(activeFilter !== initialState.activeFilter && { filter: activeFilter }),
        ...(activeTags.length !== 0 && { tags: activeTags }),
      },
      { arrayFormat: 'comma', encodeValuesOnly: true },
    );

    router.push('/', { query }, { shallow: true });
  }, [state]);

  const value = useMemo(
    () => ({
      isSidebarOpen,
      activeFilter,
      activeTags,
      search,
      setSearch,
      toggleSidebar,
      openSidebar,
      closeSidebar,
      setActiveFilter,
      setActiveTags,
    }),
    [
      isSidebarOpen,
      activeFilter,
      activeTags,
      search,
      setSearch,
      toggleSidebar,
      openSidebar,
      closeSidebar,
      setActiveFilter,
      setActiveTags,
    ],
  );

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export const useHomeContext = () => useContext(HomeContext);
