
import React, { useState, useCallback, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ContactList } from './components/ContactList';
import { ChatWindow } from './components/ChatWindow';
import { LiveStreamView } from './components/LiveStreamView';
import { VideoCallModal } from './components/VideoCallModal';
import type { User, ViewType, Message } from './types';
import { USERS } from './constants';
import { getChatReply } from './services/geminiService';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('chat');
  const [selectedUser, setSelectedUser] = useState<User | null>(USERS[0]);
  const [isCalling, setIsCalling] = useState(false);
  const [chatHistory, setChatHistory] = useState<Record<number, Message[]>>({
    1: [{ id: Date.now(), text: "Hey! I'm an AI clone of Sarah. Ask me anything about our project.", sender: USERS[0] }],
    2: [{ id: Date.now(), text: "Hi, this is Mike's AI assistant. How can I help with your design query?", sender: USERS[1] }],
    3: [{ id: Date.now(), text: "Emily's AI here. Ready to discuss the Q3 report?", sender: USERS[2] }],
  });
   const [isAiTyping, setIsAiTyping] = useState(false);

  const handleSendMessage = useCallback(async (text: string, file: File | null) => {
    if (!selectedUser) return;

    const newUserMessage: Message = {
      id: Date.now(),
      text,
      sender: 'me',
      file: file ? { name: file.name, url: URL.createObjectURL(file), type: file.type } : undefined,
    };

    const updatedHistoryForUser = [...(chatHistory[selectedUser.id] || []), newUserMessage];
    const newChatHistory = { ...chatHistory, [selectedUser.id]: updatedHistoryForUser };
    setChatHistory(newChatHistory);
    setIsAiTyping(true);

    try {
        const aiResponseText = await getChatReply(updatedHistoryForUser);
        const newAiMessage: Message = {
            id: Date.now() + 1,
            text: aiResponseText,
            sender: selectedUser,
        };

        setChatHistory(prev => ({
            ...prev,
            [selectedUser.id]: [...prev[selectedUser.id], newAiMessage]
        }));
    } catch (error) {
        console.error("Failed to get AI reply:", error);
        const errorAiMessage: Message = {
            id: Date.now() + 1,
            text: "Sorry, I'm having trouble connecting right now.",
            sender: selectedUser,
        };
        setChatHistory(prev => ({
            ...prev,
            [selectedUser.id]: [...prev[selectedUser.id], errorAiMessage]
        }));
    } finally {
        setIsAiTyping(false);
    }
  }, [selectedUser, chatHistory]);

  const startCall = () => {
    if (selectedUser) {
      setIsCalling(true);
    }
  };

  const endCall = () => setIsCalling(false);

  return (
    <div className="flex h-screen w-full font-sans">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <ContactList
        users={USERS}
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
        chatHistory={chatHistory}
      />
      <main className="flex-1 bg-slate-800 flex flex-col">
        {activeView === 'chat' && selectedUser ? (
          <ChatWindow
            user={selectedUser}
            messages={chatHistory[selectedUser.id] || []}
            onSendMessage={handleSendMessage}
            onStartCall={startCall}
            isAiTyping={isAiTyping}
          />
        ) : activeView === 'livestream' ? (
          <LiveStreamView />
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            <p>Select a view from the sidebar.</p>
          </div>
        )}
      </main>
      {isCalling && selectedUser && <VideoCallModal user={selectedUser} onEndCall={endCall} />}
    </div>
  );
};

export default App;
