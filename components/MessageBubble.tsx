
import React from 'react';
import type { Message } from '../types';
import { UserAvatar } from './UserAvatar';
import { FileIcon } from './icons/Icons';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isMe = message.sender === 'me';
  const sender = isMe ? null : message.sender;

  const FileAttachment: React.FC<{file: NonNullable<Message['file']>}> = ({ file }) => {
    if (file.type.startsWith('image/')) {
      return <img src={file.url} alt={file.name} className="mt-2 rounded-lg max-w-xs cursor-pointer" onClick={() => window.open(file.url, '_blank')} />;
    }
    return (
      <a href={file.url} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center bg-slate-500/30 p-2 rounded-lg hover:bg-slate-500/50 transition">
        <FileIcon />
        <span className="ml-2 text-sm text-slate-300">{file.name}</span>
      </a>
    );
  };

  return (
    <div className={`flex items-end gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
      {!isMe && sender && <UserAvatar user={sender} className="w-8 h-8"/>}
      <div
        className={`
          max-w-md lg:max-w-lg px-4 py-3 rounded-2xl
          ${isMe ? 'bg-indigo-600 rounded-br-none' : 'bg-slate-700 rounded-bl-none'}
        `}
      >
        {(message.text || !message.file) && <p className="text-white text-base">{message.text}</p>}
        {message.file && <FileAttachment file={message.file} />}
        {message.sticker && <img src={message.sticker} alt="sticker" className="w-24 h-24" />}
      </div>
    </div>
  );
};
