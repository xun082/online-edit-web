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
