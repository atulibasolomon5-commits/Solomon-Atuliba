
export interface User {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
}

export interface MessageFile {
    name: string;
    url: string;
    type: string;
}

export interface Message {
  id: number;
  text: string;
  sender: User | 'me';
  file?: MessageFile;
  sticker?: string;
  timestamp?: string;
}

export type ViewType = 'chat' | 'livestream' | 'settings';
