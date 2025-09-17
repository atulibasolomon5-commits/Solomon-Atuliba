
import React from 'react';
import type { User } from '../types';

interface UserAvatarProps {
  user: User;
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user, className = 'w-12 h-12' }) => {
  return (
    <div className={`relative flex-shrink-0 ${className}`}>
      <img
        src={user.avatar}
        alt={user.name}
        className="rounded-full w-full h-full object-cover"
      />
      {user.status === 'online' && (
        <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-slate-800"></span>
      )}
    </div>
  );
};
