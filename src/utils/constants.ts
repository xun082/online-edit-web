export const PATHS = {
  EDIT_FILE: '/edit/file',
  EDIT_SEARCH: '/edit/search',
  EDIT_PLUGINS: '/edit/plugins',
  EDIT_SETTINGS: '/edit/settings',
} as const;

export type PathKeys = keyof typeof PATHS;
export type PathValues = (typeof PATHS)[PathKeys];
