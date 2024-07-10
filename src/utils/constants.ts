export const PATHS = {
  EDIT_FILE: '/edit/file',
  EDIT_SEARCH: '/edit/search',
  EDIT_PLUGINS: '/edit/plugins',
  EDIT_SETTINGS: '/edit/settings',
  HOME: '/',
  MAIN_DASHBOARD: '/dashboard',
  MAIN_TEMPLATES: '/templates',
  AI: '/edit/ai',
} as const;

export const PROJECT_Name = 'online-edit';
export type PathKeys = keyof typeof PATHS;
export type PathValues = (typeof PATHS)[PathKeys];
