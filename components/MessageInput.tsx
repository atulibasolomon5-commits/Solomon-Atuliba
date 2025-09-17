
import React, { useState, useRef } from 'react';
import { AttachIcon, EmojiIcon, SendIcon, StickerIcon } from './icons/Icons';
import { EMOJIS, STICKERS } from '../constants';

interface MessageInputProps {
  onSend: (text: string, file: File | null) => void;
}

const Popover: React.FC<{ children: React.ReactNode; onClose: () => void;}> = ({ children, onClose }) => (
    <div className="absolute bottom-full mb-2 bg-slate-900 border border-slate-700 rounded-lg shadow-xl p-2 z-20">
        <div className="max-h-48 overflow-y-auto">
            {children}
        </div>
    </div>
);

export const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showStickers, setShowStickers] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleSend = () => {
    if (text.trim() || file) {
      onSend(text, file);
      setText('');
      setFile(null);
      if(fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setFile(e.target.files[0]);
      }
  };
  
  const handleEmojiSelect = (emoji: string) => {
      setText(prev => prev + emoji);
      setShowEmojis(false);
  };
  
  const handleStickerSelect = (sticker: string) => {
      // Stickers are sent as separate messages
      onSend('', null); // This is a limitation, ideally we would support sticker messages. For now we clear the text and file.
      // We can't really send stickers as there is no message type for it, so we'll just log it
      console.log('Sticker selected:', sticker);
      setShowStickers(false);
  };

  return (
    <div className="p-4 bg-slate-900 border-t border-slate-700/50">
       {file && (
        <div className="mb-2 px-3 py-2 bg-slate-700 rounded-lg flex justify-between items-center">
            <span className="text-sm text-slate-300 truncate">{file.name}</span>
            <button onClick={() => setFile(null)} className="text-slate-400 hover:text-white">&times;</button>
        </div>
      )}
      <div className="relative flex items-center bg-slate-800 rounded-full p-1">
        <div className="relative">
            <button onClick={() => setShowEmojis(s => !s)} className="p-2 text-slate-400 hover:text-indigo-400 transition">
                <EmojiIcon />
            </button>
            {showEmojis && <Popover onClose={() => setShowEmojis(false)}>
                <div className="grid grid-cols-6 gap-1">
                    {EMOJIS.map(emoji => <button key={emoji} onClick={() => handleEmojiSelect(emoji)} className="p-1 text-2xl rounded-md hover:bg-slate-700">{emoji}</button>)}
                </div>
            </Popover>}
        </div>
        <div className="relative">
             <button onClick={() => setShowStickers(s => !s)} className="p-2 text-slate-400 hover:text-indigo-400 transition">
                <StickerIcon />
            </button>
             {showStickers && <Popover onClose={() => setShowStickers(false)}>
                <div className="grid grid-cols-3 gap-2 p-2">
                    {STICKERS.map(sticker => <button key={sticker} onClick={() => handleStickerSelect(sticker)} className="p-1 rounded-md hover:bg-slate-700"><img src={sticker} alt="sticker" /></button>)}
                </div>
             </Popover>}
        </div>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 bg-transparent px-4 text-white placeholder-slate-500 focus:outline-none"
        />
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" id="file-upload"/>
        <button onClick={() => fileInputRef.current?.click()} className="p-2 text-slate-400 hover:text-indigo-400 transition">
          <AttachIcon />
        </button>
        <button
          onClick={handleSend}
          className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-transform duration-200 active:scale-90 shadow-lg"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};
