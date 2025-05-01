
import { supabase } from '@/lib/supabase';

export async function handleInsertGoal(userId: string, goalType: string) {
  if (!userId || goalType !== 'pr_levantamientos') return;

  const { error } = await supabase.from('athlete_goals').insert([
    {
      athlete_id: userId,
      goal_type: goalType,
    },
  ]);

  if (error) {
    console.error('Error inserting goal:', error.message);
    throw new Error('Failed to insert goal');
  }

  console.log('✅ Meta de tipo PR insertada correctamente');
}