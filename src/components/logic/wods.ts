import { supabase } from '@/lib/supabase';

export const getCurrentChallenge = async () => {
  const { data, error } = await supabase
    .from('wods')
    .select('*')
    .eq('is_daily_challenge', true)
    .order('created_at', { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) {
    console.error('❌ Error obteniendo desafío actual:', error?.message || 'No data');
    return null;
  }

  return data[0];
};
