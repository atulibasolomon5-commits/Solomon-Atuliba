
import type { User } from './types';

export const USERS: User[] = [
  { id: 1, name: 'Sarah Miller', avatar: 'https://picsum.photos/seed/sarah/100', status: 'online' },
  { id: 2, name: 'Mike Johnson', avatar: 'https://picsum.photos/seed/mike/100', status: 'online' },
  { id: 3, name: 'Emily White', avatar: 'https://picsum.photos/seed/emily/100', status: 'offline' },
  { id: 4, name: 'David Chen', avatar: 'https://picsum.photos/seed/david/100', status: 'online' },
];

export const STICKERS: string[] = [
    'https://raw.githubusercontent.com/google/gemini-pro-samples/main/website/src/assets/stickers/google-logo.svg',
    'https://raw.githubusercontent.com/google/gemini-pro-samples/main/website/src/assets/stickers/sparkle.svg',
    'https://raw.githubusercontent.com/google/gemini-pro-samples/main/website/src/assets/stickers/thumbs-up.svg',
    'https://raw.githubusercontent.com/google/gemini-pro-samples/main/website/src/assets/stickers/light-bulb.svg',
    'https://raw.githubusercontent.com/google/gemini-pro-samples/main/website/src/assets/stickers/rocket.svg',
    'https://raw.githubusercontent.com/google/gemini-pro-samples/main/website/src/assets/stickers/party-popper.svg',
];

export const EMOJIS = [
    '😀', '😂', '😍', '🤔', '😎', '😭', '🤯', '👍', '❤️', '🔥', '🚀', '🎉'
];
