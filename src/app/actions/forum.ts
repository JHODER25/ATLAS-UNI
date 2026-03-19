'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createForumPost(title: string, content: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Debes iniciar sesión para publicar en el foro.');
  }

  const { error } = await supabase.from('forum_posts').insert({
    user_id: user.id,
    title,
    content,
  });

  if (error) throw new Error(error.message);

  revalidatePath('/foro');
}

export async function toggleLike(postId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Debes iniciar sesión para dar like.');

  const { data: existing } = await supabase
    .from('forum_likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', user.id)
    .single();

  if (existing) {
    await supabase.from('forum_likes').delete().eq('id', existing.id);
  } else {
    await supabase.from('forum_likes').insert({ post_id: postId, user_id: user.id });
  }

  revalidatePath('/foro');
}
