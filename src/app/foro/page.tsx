import { createClient } from '@/utils/supabase/server';
import { MessageSquareIcon, Share2Icon, MoreHorizontalIcon } from 'lucide-react';
import { CreatePostForm } from '@/components/CreatePostForm';
import { LikeButton } from '@/components/LikeButton';

export default async function ForoPage() {
  const supabase = await createClient();
  // Fetch posts with their authors and eager-load likes count
  const { data: posts } = await supabase
    .from('forum_posts')
    .select(`
      *, 
      profiles(email, full_name, avatar_url, role, faculty),
      forum_likes(count)
    `)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-white min-h-[calc(100vh-80px)]">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Foro de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d93340] to-[#a6249d]">Comunidad</span></h1>
        <p className="text-white/60">Comparte, pregunta y conecta con otros estudiantes o profesores de la UNI.</p>
      </div>

      {/* New Post Creator */}
      <CreatePostForm />
      
      {/* Feed */}
      {(!posts || posts.length === 0) ? (
        <div className="mt-12 p-12 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm border-dashed text-white/40 flex flex-col items-center justify-center">
          <MessageSquareIcon className="w-12 h-12 mb-4 opacity-50" />
          <p>El foro está vacío por ahora.</p>
          <p className="text-sm mt-2">¡Sé el primero en iniciar una conversación!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map((post: any) => (
            <div key={post.id} className="relative bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-[#a6249d]/50 hover:shadow-[0_0_30px_rgba(166,36,157,0.1)] transition-all duration-500 hover:-translate-y-1 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#d93340]/0 to-[#a6249d]/0 group-hover:from-[#d93340]/5 group-hover:to-[#a6249d]/5 transition-colors duration-500 pointer-events-none" />
              
              {/* Header: Author info */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 overflow-hidden flex items-center justify-center border border-white/20 flex-shrink-0">
                    {post.profiles?.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.profiles.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                       <span className="font-bold">{post.profiles?.full_name?.charAt(0) || post.profiles?.email?.charAt(0).toUpperCase() || 'U'}</span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white leading-none">
                        {post.profiles?.full_name || post.profiles?.email?.split('@')[0] || 'Anónimo'}
                      </h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wide ${post.profiles?.role === 'Profesor' ? 'bg-blue-500/20 text-blue-400' : 'bg-[#d93340]/20 text-[#d93340]'}`}>
                        {post.profiles?.role || 'Estudiante'}
                      </span>
                    </div>
                    <div className="text-xs text-white/50 mt-1 flex items-center gap-2">
                      {post.profiles?.faculty && <span>{post.profiles.faculty}</span>}
                      {post.profiles?.faculty && <span>•</span>}
                      <span>{new Date(post.created_at).toLocaleDateString('es-PE', { day: 'numeric', month: 'short' })}</span>
                    </div>
                  </div>
                </div>
                <button className="text-white/40 hover:text-white p-2">
                  <MoreHorizontalIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="mb-4">
                {post.title && <h4 className="font-bold text-lg mb-2">{post.title}</h4>}
                <p className="text-white/80 leading-relaxed whitespace-pre-wrap">{post.content}</p>
              </div>

              {/* Optional Post Image */}
              {post.image_url && (
                <div className="mb-4 rounded-2xl overflow-hidden border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.image_url} alt="Post content" className="w-full h-auto object-cover max-h-[400px]" />
                </div>
              )}
              
              {/* Interaction Bar */}
              <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
                <div className="flex items-center gap-6">
                  <LikeButton postId={post.id} initialLikes={post.forum_likes?.[0]?.count || 0} />

                  <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                    <MessageSquareIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">0</span>
                  </button>
                </div>
                <div className="flex items-center gap-4">
                   <button className="text-white/40 hover:text-white transition-colors p-2" title="Compartir">
                    <Share2Icon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
