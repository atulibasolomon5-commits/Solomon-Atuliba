
import React, { useRef, useEffect } from 'react';
import type { User, Message } from '../types';
import { UserAvatar } from './UserAvatar';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { VideoCallIcon } from './icons/Icons';
import { TypingIndicator } from './TypingIndicator';

interface ChatWindowProps {
  user: User;
  messages: Message[];
  onSendMessage: (text: string, file: File | null) => void;
  onStartCall: () => void;
  isAiTyping: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ user, messages, onSendMessage, onStartCall, isAiTyping }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiTyping]);

  return (
    <div className="flex-1 flex flex-col h-full">
      <header className="flex items-center justify-between p-4 bg-slate-900/70 backdrop-blur-sm border-b border-slate-700/50 z-10">
        <div className="flex items-center">
          <UserAvatar user={user} />
          <div className="ml-4">
            <h2 className="text-lg font-bold text-white">{user.name}</h2>
            <p className="text-sm text-slate-400">{user.status}</p>
          </div>
        </div>
        <button
          onClick={onStartCall}
          className="p-2 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition"
          aria-label="Start video call"
        >
          <VideoCallIcon />
        </button>
      </header>
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-800">
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isAiTyping && <TypingIndicator user={user} />}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSend={onSendMessage} />
    </div>
  );
};
