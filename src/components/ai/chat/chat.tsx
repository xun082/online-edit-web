import React from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';

import { Message, type UserData } from './data';
import ChatTopbar from './chat-topbar';
import { ChatList } from './chat-list';

interface ChatProps {
  messages?: Message[];
  selectedUser: UserData;
}

export function Chat({ messages, selectedUser }: ChatProps) {
  const [messagesState, setMessages] = React.useState<Message[]>(messages ?? []);

  const sendMessage = (newMessage: Message) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const updateMessage = (id: number, updatedFields: Partial<Message>) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, ...updatedFields } : message,
      ),
    );
  };

  const fetchAnswer = (prompt: Message) => {
    sendMessage(prompt);

    console.log('prompt');
    console.log(JSON.stringify(prompt));

    const answerMessage: Message = {
      id: Date.now() + 1,
      name: 'GPT',
      avatar: '/qwen.png',
      sessionId: prompt.sessionId,
      message: '',
    };
    console.log('messageNew');
    console.log(JSON.stringify(answerMessage));
    sendMessage(answerMessage);

    const ctrl = new AbortController();
    fetchEventSource(`/ai/completion`, {
      method: 'POST',
      body: JSON.stringify({
        input: {
          prompt: prompt.message,
          session_id: prompt.sessionId,
        },
      }),
      signal: ctrl.signal,
      onmessage(event) {
        console.log(event);

        const data = JSON.parse(event.data);
        const updatedMessage = data.output.text;
        console.log(updatedMessage);
        updateMessage(answerMessage.id, { message: updatedMessage });
      },
    });
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar selectedUser={selectedUser} />

      <ChatList messages={messagesState} selectedUser={selectedUser} sendMessage={fetchAnswer} />
    </div>
  );
}
