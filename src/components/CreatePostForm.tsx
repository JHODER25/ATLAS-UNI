'use client';

import { useState } from 'react';
import { ImageIcon, FileTextIcon, SendIcon } from 'lucide-react';
import { createForumPost } from '@/app/actions/forum';

export function CreatePostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;
    setIsSubmitting(true);
    try {
      await createForumPost(title, content);
      setTitle('');
      setContent('');
    } catch (e: any) {
      alert(e.message || 'Error al publicar en el foro');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#130b2c]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 mb-8 mt-8 shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-[#d93340]/5 to-[#a6249d]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="flex gap-6 items-start relative z-10">
        <div className="w-14 h-14 bg-gradient-to-br from-[#d93340] to-[#a6249d] rounded-2xl flex items-center justify-center text-white font-black text-xl flex-shrink-0 shadow-lg shadow-[#d93340]/20">
          Tú
        </div>
        <div className="flex-1 space-y-4">
          <input 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-[#d93340] transition-colors font-bold tracking-tight"
            placeholder="Título de tu publicación..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={isSubmitting}
          />
          <textarea 
            className="w-full bg-transparent border-none text-white placeholder-white/30 focus:outline-none min-h-[100px] resize-none text-lg leading-relaxed"
            placeholder="¿Qué estás pensando o buscando? Comparte con la comunidad..."
            value={content}
            onChange={e => setContent(e.target.value)}
            disabled={isSubmitting}
          />
          
          <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-4">
            <div className="flex items-center gap-3">
              <button 
                type="button" 
                className="text-white/40 hover:text-[#a6249d] transition-all p-3 bg-white/5 hover:bg-[#a6249d]/10 rounded-xl"
                title="Adjuntar Imagen"
              >
                <ImageIcon className="w-5 h-5" />
              </button>
              <button 
                type="button" 
                className="text-white/40 hover:text-[#d93340] transition-all p-3 bg-white/5 hover:bg-[#d93340]/10 rounded-xl"
                title="Adjuntar Documento"
              >
                <FileTextIcon className="w-5 h-5" />
              </button>
            </div>
            <button 
              onClick={handleSubmit} 
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 hover:shadow-2xl hover:shadow-[#a6249d]/30 transition-all flex items-center gap-3 disabled:opacity-30 disabled:scale-100"
            >
              {isSubmitting ? 'Publicando...' : 'Publicar'} <SendIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
