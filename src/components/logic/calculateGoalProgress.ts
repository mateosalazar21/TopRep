import { supabase } from '@/lib/supabase';

export async function calculateGoalProgress(
  goal: any,
  type: 'strength' | 'endurance',
  athleteId: string
): Promise<{
  progressPercent: number;
  completedWods: number;
  expectedWods: number;
}> {
  const exercise = goal.exercise_name;

  // Calcular fechas
  const startDate = goal.start_date || new Date();
  const targetDate = goal.target_date || new Date(
    new Date(startDate).getTime() + (goal.recommended_weeks || 6) * 7 * 24 * 60 * 60 * 1000
  );

  const start = new Date(startDate).toISOString().split('T')[0];
  const end = new Date(targetDate).toISOString().split('T')[0];

  // 1. Obtener lista de wod_ids válidos (sin depender de is_daily_challenge)
  const { data: wods, error: wodsError } = await supabase
    .from('wods')
    .select('wod_id')
    .eq('exercise_name', exercise)
    .gte('start_date', start)
    .lte('start_date', end);

  if (wodsError || !wods) return { progressPercent: 0, completedWods: 0, expectedWods: 0 };

  const wodIds = wods.map((w) => w.wod_id);

  // 2. WODs completados por el atleta (con resultado > 0)
  const { count: completedWods } = await supabase
    .from('wod_results')
    .select('*', { count: 'exact', head: true })
    .eq('athlete_id', athleteId)
    .gt('score_value', 0)
    .in('wod_id', wodIds);

  // 3. Estimar WODs esperados por semanas
  const diffWeeks = Math.ceil(
    (new Date(end).getTime() - new Date(start).getTime()) / (7 * 24 * 60 * 60 * 1000)
  );
  const expectedWods = diffWeeks * 4.15;

  const progressPercent = completedWods && expectedWods
    ? Math.min((completedWods / expectedWods) * 100, 100)
    : 0;

  return {
    progressPercent,
    completedWods: completedWods || 0,
    expectedWods: Math.round(expectedWods),
  };
}
