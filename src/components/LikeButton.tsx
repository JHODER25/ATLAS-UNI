'use client';

import { useState } from 'react';
import { HeartIcon } from 'lucide-react';
import { toggleLike } from '@/app/actions/forum';

export function LikeButton({ postId, initialLikes }: { postId: string, initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false); // In a fully robust app, we'd pass initialIsLiked per user
  const [isPending, setIsPending] = useState(false);

  const handleLike = async () => {
    if (isPending) return;
    setIsPending(true);
    
    // Optimistic UI update
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikes(prev => newLikedState ? prev + 1 : prev - 1);

    try {
      await toggleLike(postId);
    } catch (e: any) {
      // Revert if error
      setIsLiked(!newLikedState);
      setLikes(prev => !newLikedState ? prev + 1 : prev - 1);
      alert(e.message || 'Error al dar like');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button 
      onClick={handleLike}
      disabled={isPending}
      className={`flex items-center gap-2 transition-colors group ${isLiked ? 'text-[#d93340]' : 'text-white/60 hover:text-[#d93340]'}`}
    >
      <HeartIcon className={`w-5 h-5 ${isLiked ? 'fill-[#d93340]' : 'group-hover:fill-[#d93340]'}`} />
      <span className="text-sm font-medium">{likes}</span>
    </button>
  );
}
