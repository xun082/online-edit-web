export const PATHS = {
  HOME: '/',
  MAIN_DASHBOARD: '/dashboard',
  MAIN_TEMPLATES: '/templates',
  AI: '/edit/ai',
} as const;

export const PROJECT_Name = 'online-edit';
export type PathKeys = keyof typeof PATHS;
export type PathValues = (typeof PATHS)[PathKeys];

export const PRETTIER_FORMAT_PATH: string = 'PRETTIER_FORMAT_PATH';

export const UPLOAD_FILE_DATA: string = 'UPLOAD_FILE_DATA';

export const DEFAULT_PRETTIER_CONFIG: string = `{
  "printWidth": 80,
  "tabWidth": 2,
  "trailingComma": "all",
  "semi": true,
  "endOfLine": "auto",
  "arrowParens": "avoid",
  "bracketSpacing": true
}
`;

export const MONACO_THEME_ARRAY = [
  'slack-dark',
  'solarized-dark',
  'vitesse-dark',
  'rose-pine-moon',
  'one-dark-pro',
  'night-owl',
  'material-theme-darker',
  'ayu-dark',
  'dark-plus',
];
export const MONACO_THEME_MAP: Record<string, string> = {
  'Dark Plus': 'dark-plus',
  'Ayu Dark': 'ayu-dark',
  'Material Theme Darker': 'material-theme-darker',
  'One Dark Pro': 'one-dark-pro',
  'Night Owl': 'night-owl',
  'Rose Pine Moon': 'rose-pine-moon',
  'Vitesse Dark': 'vitesse-dark',
  'Slack Dark': 'slack-dark',
  'Solarized Dark': 'solarized-dark',
};
