import { View, Text, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
// import { Tooltip } from '@rneui/themed'; // 🔒 Guardado para futuro uso
import { HelpCircle } from 'lucide-react-native';

export default function Step6Goals() {
    const router = useRouter();
    const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

    const toggleGoal = (value: string) => {
        setSelectedGoal((prev) => (prev === value ? null : value));
    };

    const handleBack = () => {
        setSelectedGoal(null);
        router.back();
    };

    const handleNext = () => {
        if (!selectedGoal) return;
        // Guardar metas seleccionadas en Supabase más adelante
        router.replace('/(form)/step7_confirmation');
    };


    const goals = [
        {
            label: '💪 PR en levantamientos',
            value: 'pr_levantamientos',
            description: 'Mejorar tus cargas máximas en ejercicios como sentadilla, clean & jerk y snatch.',
        },
        {
            label: '🏃‍♂️ Tiempo en resistencia',
            value: 'resistencia',
            description: 'Reducir tus tiempos en WODs de larga duración o pruebas de cardio.',
        },
        {
            label: '🤸 Reps gimnásticos',
            value: 'gimnasticos',
            description: 'Aumentar la cantidad de repeticiones en pull-ups, muscle-ups, handstand push-ups y similares.',
        },
    ];


    return (
        <View className="flex-1 px-6 pt-14 justify-between pb-10">
            {/* Barra de progreso */}
            <View className="w-full pt-6">
                <View className="h-2 bg-neutral-700 rounded-full">
                    <View className="h-2 bg-orange-600 rounded-full w-5/6" />
                </View>
                <Text className="text-stone-100 font-poppinsMedium text-sm mt-2 text-right">5 de 6</Text>
            </View>

            {/* Título */}
            <Text className="text-center text-white text-2xl font-poppinsBold mb-10">
                Elige tu meta principal
            </Text>

            {/* Lista de metas */}
            <View className="gap-4 mb-10">
                {goals.map((goal) => {
                    const isActive = selectedGoal === goal.value;
                    return (
                        <View key={goal.value} className="relative">
                            <Pressable
                                onPress={() => toggleGoal(goal.value)}
                                className={`flex-row justify-between items-center py-4 px-5 rounded-full ${isActive
                                    ? 'bg-orange-600'
                                    : 'bg-neutral-800 border border-white/20'
                                    }`}
                            >
                                <Text className="text-white font-poppinsBold">
                                    {goal.label}
                                </Text>

                                {/* Tooltip desactivado temporalmente */}
                                {/* <Tooltip
                                    popover={<Text className="text-white">{goal.description}</Text>}
                                    backgroundColor="#0c0c0c"
                                    pointerColor="#0c0c0c"
                                >
                                <HelpCircle size={20} color="white" />
                                </Tooltip> */}
                                <HelpCircle size={20} color="white" />
                            </Pressable>
                        </View>
                    );
                })}
            </View>

            {/* Botones de navegación */}
            <View className="flex-row justify-between gap-4 mt-16">
                <TouchableOpacity
                    onPress={handleBack}
                    className="flex-1 bg-stone-100 py-4 rounded-full"
                >
                    <Text className="text-center text-orange-600 font-poppinsBold text-lg">
                        CANCELAR
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleNext}
                    disabled={!selectedGoal}
                    className={`flex-1 py-4 rounded-full ${!selectedGoal ? 'bg-orange-400/60' : 'bg-orange-600'
                        }`}
                >
                    <Text className="text-center text-white font-poppinsBold text-lg">
                        CONTINUAR
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
