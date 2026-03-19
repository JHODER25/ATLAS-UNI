'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addComment(eventId: string, content: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Debes iniciar sesión para comentar.');
  }

  const { error } = await supabase.from('event_comments').insert({
    event_id: eventId,
    user_id: user.id,
    content
  });

  if (error) throw new Error(error.message);

  revalidatePath(`/eventos/${eventId}`);
}

export async function addRating(eventId: string, rating: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Debes iniciar sesión para valorar.');
  }

  // Check if exists
  const { data: existing } = await supabase
    .from('event_ratings')
    .select('id')
    .eq('event_id', eventId)
    .eq('user_id', user.id)
    .single();
  
  if (existing) {
    const { error } = await supabase.from('event_ratings').update({ rating }).eq('id', existing.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from('event_ratings').insert({
      event_id: eventId,
      user_id: user.id,
      rating
    });
    if (error) throw new Error(error.message);
  }

  revalidatePath(`/eventos/${eventId}`);
}
