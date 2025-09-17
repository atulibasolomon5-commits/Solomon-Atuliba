
import React, { useEffect, useRef, useState } from 'react';
import type { User } from '../types';
import { UserAvatar } from './UserAvatar';
import { MicOnIcon, MicOffIcon, EndCallIcon, CamOnIcon, CamOffIcon } from './icons/Icons';

interface VideoCallModalProps {
  user: User;
  onEndCall: () => void;
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({ user, onEndCall }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices.", err);
      }
    };

    if (!isCamOff) {
      startCamera();
    } else {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        }
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCamOff]);

  const toggleMute = () => {
    if (streamRef.current) {
        streamRef.current.getAudioTracks().forEach(track => track.enabled = !track.enabled);
        setIsMuted(prev => !prev);
    }
  };
  
  const toggleCam = () => {
      setIsCamOff(prev => !prev);
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="relative w-full h-full">
        {/* Remote user placeholder */}
        <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center">
            <UserAvatar user={user} className="w-40 h-40 border-4 border-slate-600"/>
            <p className="mt-4 text-2xl font-bold text-white">Calling {user.name}...</p>
            <span className="text-slate-400">Connecting</span>
        </div>

        {/* Local user video */}
        <div className="absolute bottom-5 right-5 w-64 h-48 bg-black rounded-lg overflow-hidden shadow-2xl border-2 border-slate-700">
          <video ref={videoRef} autoPlay muted className={`w-full h-full object-cover ${isCamOff ? 'hidden' : 'block'}`}></video>
          {isCamOff && <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">Camera is off</div>}
        </div>
        
        {/* Controls */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-slate-900/50 backdrop-blur-md p-3 rounded-full">
            <button onClick={toggleMute} className="w-14 h-14 rounded-full bg-slate-700/80 flex items-center justify-center text-white hover:bg-slate-600 transition">
                {isMuted ? <MicOffIcon /> : <MicOnIcon />}
            </button>
            <button onClick={toggleCam} className="w-14 h-14 rounded-full bg-slate-700/80 flex items-center justify-center text-white hover:bg-slate-600 transition">
                {isCamOff ? <CamOffIcon /> : <CamOnIcon />}
            </button>
            <button onClick={onEndCall} className="w-20 h-14 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-500 transition scale-110">
                <EndCallIcon />
            </button>
        </div>
      </div>
    </div>
  );
};
