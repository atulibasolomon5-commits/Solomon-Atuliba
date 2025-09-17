
import React from 'react';
import type { User, Message } from '../types';
import { UserAvatar } from './UserAvatar';

interface ContactListProps {
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
  chatHistory: Record<number, Message[]>;
}

export const ContactList: React.FC<ContactListProps> = ({ users, selectedUser, onSelectUser, chatHistory }) => {
  const getLastMessage = (userId: number): string => {
    const history = chatHistory[userId];
    if (!history || history.length === 0) return "No messages yet";
    const lastMsg = history[history.length - 1];
    
    if (lastMsg.file) return `📎 ${lastMsg.file.name}`;
    if (lastMsg.sticker) return 'Sent a sticker';
    
    let text = lastMsg.text;
    if (lastMsg.sender === 'me') {
        text = `You: ${text}`;
    }
    return text.length > 30 ? text.substring(0, 27) + '...' : text;
  };

  return (
    <aside className="w-80 bg-slate-900/70 backdrop-blur-sm border-r border-slate-700/50 flex flex-col">
      <header className="p-4 border-b border-slate-700/50">
        <h1 className="text-2xl font-bold text-white">Chats</h1>
        <input
          type="text"
          placeholder="Search..."
          className="w-full mt-3 p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </header>
      <div className="flex-1 overflow-y-auto">
        {users.map(user => (
          <div
            key={user.id}
            onClick={() => onSelectUser(user)}
            className={`
              flex items-center p-3 cursor-pointer transition-colors duration-200
              ${selectedUser?.id === user.id ? 'bg-indigo-600/30' : 'hover:bg-slate-800/50'}
              border-l-4 ${selectedUser?.id === user.id ? 'border-indigo-500' : 'border-transparent'}
            `}
          >
            <UserAvatar user={user} />
            <div className="ml-4 flex-1 overflow-hidden">
              <h3 className="font-semibold text-white truncate">{user.name}</h3>
              <p className="text-sm text-slate-400 truncate">{getLastMessage(user.id)}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
