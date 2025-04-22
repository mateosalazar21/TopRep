import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { BookmarkCheck } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

export default function Step7Confirmation() {
    const router = useRouter();
    const { user, formCompleted, checkFormStatus } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const handleContinue = async () => {
        if (!user) return;
        setIsLoading(true);

        const { error } = await supabase
            .from('athletes')
            .update({ form_completed: true })
            .eq('athlete_id', user.id);

        setIsLoading(false);

        if (!error) {
            await checkFormStatus(user.id); //actualiza la memoria
        } else {
            console.error('Error al actualizar form_completed:', error.message);
            // Aquí puedes agregar una alerta si deseas
        }

        setIsLoading(false);
    };

    // 🧭 Redirigir automáticamente cuando formCompleted sea verdadero
    useEffect(() => {
        if (formCompleted) {
            router.replace('/(tabs)');
        }
    }, [formCompleted]);

    return (
        <View className="flex-1 px-6 pt-14 justify-between pb-10">

            {/* Barra de progreso */}
            <View className="w-full pt-6">
                <View className="h-2 bg-neutral-700 rounded-full">
                    <View className="h-2 bg-orange-600 rounded-full w-6/6" />
                </View>
                <Text className="text-stone-100 font-poppinsMedium text-sm mt-2 text-right">6 de 6</Text>
            </View>

            {/* Título */}
            <Text className="text-center text-white text-2xl font-poppinsBold mb-10">
                ¡TU PERFIL ESTÁ LISTO!{'\n'}¡COMIENZA A ENTRENAR!
            </Text>

            {/* Icono central */}
            <View className="my-12 justify-center items-center">
                <BookmarkCheck size={96} color="white" />
            </View>

            {/* Botones */}
            <View className="flex-row justify-between gap-4 mt-8">
                <TouchableOpacity
                    onPress={() => router.replace('/(form)/step6_goals')}
                    className="flex-1 bg-stone-100 py-4 rounded-full"
                >
                    <Text className="text-center text-orange-600 font-poppinsBold text-lg">
                        REGRESAR
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleContinue}
                    className="flex-1 bg-orange-600 py-4 rounded-full"
                    disabled={isLoading}
                >
                    <Text className="text-center text-white font-poppinsBold text-lg">
                        {isLoading ? 'Cargando...' : 'CONTINUAR'}
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}
