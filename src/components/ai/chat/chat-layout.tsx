'use client';

import React from 'react';

import { userData } from './data';
import { Chat } from './chat';

export function ChatLayout() {
  const [selectedUser] = React.useState(userData[0]);

  return <Chat messages={selectedUser.messages} selectedUser={selectedUser} />;
}
