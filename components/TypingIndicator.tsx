
import React from 'react';
import type { User } from '../types';
import { UserAvatar } from './UserAvatar';

interface TypingIndicatorProps {
    user: User;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ user }) => {
  return (
    <div className="flex items-end gap-3">
      <UserAvatar user={user} className="w-8 h-8"/>
      <div className="flex items-center space-x-1.5 bg-slate-700 rounded-2xl rounded-bl-none px-4 py-3">
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
      </div>
    </div>
  );
};
