export const userData: UserData[] = [
  {
    id: 1,
    avatar: 'https://github.com/shadcn.png',
    messages: [],
    name: '通义千问',
  },
];

export type UserData = {
  id: number;
  avatar: string;
  messages: Message[];
  name: string;
};

export const loggedInUserData = {
  id: 5,
  avatar: 'https://github.com/shadcn.png',
  name: '通义千问',
  sessionId: Date.now(),
};

export type LoggedInUserData = typeof loggedInUserData;

export interface Message {
  id: number;
  avatar: string;
  name: string;
  message: string;
  sessionId: number;
}

export interface User {
  id: number;
  avatar: string;
  messages: Message[];
  name: string;
}
