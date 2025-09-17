
import React from 'react';
import { UserAvatar } from './UserAvatar';
import { USERS } from '../constants';
import { HeartIcon } from './icons/Icons';

const mockChat = [
    { user: USERS[1], text: "This is awesome!" },
    { user: USERS[2], text: "Loving the content! 🔥" },
    { user: USERS[3], text: "Great stream today!" },
    { user: USERS[0], text: "What are you playing next?" },
    { user: USERS[1], text: "Can you give a shoutout?" },
    { user: USERS[3], text: "Let's gooo!" },
];

export const LiveStreamView: React.FC = () => {
  return (
    <div className="flex h-full bg-slate-800">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 bg-black flex items-center justify-center relative">
          <img src="https://picsum.photos/seed/stream/1280/720" alt="Live stream" className="max-w-full max-h-full" />
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            LIVE
          </div>
           <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 text-white px-3 py-1 rounded-md text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
            <span>1,432 viewers</span>
          </div>
        </div>
        <div className="p-4 bg-slate-900/70 border-t border-slate-700/50">
          <h1 className="text-2xl font-bold">Gaming Marathon for Charity!</h1>
          <div className="flex items-center gap-3 mt-2">
            <UserAvatar user={USERS[0]} />
            <div>
              <p className="font-semibold">{USERS[0].name}</p>
              <p className="text-sm text-slate-400">Playing: Cosmic Rift</p>
            </div>
          </div>
        </div>
      </div>
      <aside className="w-80 bg-slate-900 border-l border-slate-700/50 flex flex-col">
        <h2 className="p-4 text-lg font-bold border-b border-slate-700/50">Live Chat</h2>
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {mockChat.map((chat, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
                <UserAvatar user={chat.user} className="w-6 h-6 mt-1" />
                <div>
                    <span className="font-semibold text-indigo-400">{chat.user.name}: </span>
                    <span className="text-slate-300">{chat.text}</span>
                </div>
            </div>
          ))}
        </div>
        <div className="p-2 border-t border-slate-700/50">
           <div className="relative flex items-center bg-slate-800 rounded-full">
            <input type="text" placeholder="Say something..." className="flex-1 bg-transparent p-3 text-white placeholder-slate-500 focus:outline-none"/>
             <button className="p-3 text-slate-400 hover:text-indigo-400">
                <HeartIcon />
            </button>
           </div>
        </div>
      </aside>
    </div>
  );
};
