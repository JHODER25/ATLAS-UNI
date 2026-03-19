'use client';

import { useState } from 'react';
import { StarIcon } from 'lucide-react';
import { addComment, addRating } from '@/app/actions/feedback';
import { useRouter } from 'next/navigation';

export function EventFeedback({ 
  eventId, 
  initialAvgRating, 
  totalVotes 
}: { 
  eventId: string, 
  initialAvgRating: string, 
  totalVotes: number 
}) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [isRating, setIsRating] = useState(false);
  const router = useRouter();

  const handleCommentSubmit = async () => {
    if (!content.trim()) return;
    setIsSubmitting(true);
    try {
      await addComment(eventId, content);
      setContent('');
      router.refresh();
    } catch (e: any) {
      alert(e.message || 'Error al enviar comentario');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRate = async (rating: number) => {
    setIsRating(true);
    try {
      await addRating(eventId, rating);
      router.refresh();
    } catch (e: any) {
      alert(e.message || 'Error al enviar valoración');
    } finally {
      setIsRating(false);
    }
  };

  const currentDisplayRating = hoverRating > 0 ? hoverRating : parseFloat(initialAvgRating) || 0;

  return (
    <>
      {/* Rating Display / Interactive Stars */}
      <div className="flex items-center gap-4 mb-8">
        <span className="font-semibold text-white/50">Valoración:</span>
        <div className="flex items-center gap-1" onMouseLeave={() => setHoverRating(0)}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button 
              key={star}
              disabled={isRating}
              type="button"
              onMouseEnter={() => setHoverRating(star)}
              onClick={() => handleRate(star)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <StarIcon 
                className={`w-6 h-6 ${star <= currentDisplayRating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} 
              />
            </button>
          ))}
        </div>
        <span className="text-lg font-bold">{initialAvgRating}</span>
        <span className="text-xs text-white/40">({totalVotes} votos)</span>
      </div>

      {/* Comment Form */}
      <div className="mb-8">
        <label className="block text-sm font-semibold mb-2 text-white/70">Comentario:</label>
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
          className="w-full bg-[#130b2c] border border-white/10 rounded-2xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-[#a6249d] min-h-[120px] mb-4 transition-colors disabled:opacity-50"
          placeholder="Escribe un comentario o consulta sobre este evento..."
        />
        <button 
          onClick={handleCommentSubmit}
          disabled={isSubmitting || !content.trim()}
          className="bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white px-8 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-[#a6249d]/20 transition-all disabled:opacity-50"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar comentario'}
        </button>
      </div>
    </>
  );
}
