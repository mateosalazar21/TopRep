import { SupabaseClient } from '@supabase/supabase-js';
import { Router } from 'expo-router';

export const completeOnboarding = async (
  supabase: SupabaseClient,
  router: Router
) => 

  // Paso 1: Obtener la sesión actual del usuario 
  {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !sessionData.session?.user) {
    alert('No se pudo obtener tu sesión de usuario');
    return;
  }

  const userId = sessionData.session.user.id;

  const { error: updateError } = await supabase
    .from('athletes')
    .update({ onboarding_completed: true })
    .eq('athlete_id', userId);

  if (updateError) {
    console.error('ERROR al actualizar onboarding_completed:', updateError);
    alert('Ocurrió un error al guardar tu progreso');
    return;
  }

  router.replace('/(tabs)');
};