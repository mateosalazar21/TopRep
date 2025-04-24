import { View, Text, TouchableOpacity } from 'react-native';
import { useState, useMemo } from 'react';
import { useRouter } from 'expo-router';

export default function Step5Weeks() {
    const router = useRouter();
    const [selectedWeeks, setSelectedWeeks] = useState<number | null>(null);

    // 🧪 Simulación del porcentaje de mejora seleccionado (luego vendrá del contexto o props)
    const selectedPercent: number = 10;

    // 🧠 Calcular semanas disponibles según el porcentaje
    const availableWeeks = useMemo(() => {
        if (selectedPercent === 5) return [4, 5, 6];
        if (selectedPercent === 10) return [8, 9, 10];
        if (selectedPercent === 15) return [10, 12, 14];
        if (selectedPercent === 20) return [14, 16, 18, 20];
        return [];
    }, [selectedPercent]);

    const handleContinue = () => {
        if (!selectedWeeks) return;
        // ⚠️ En el futuro: guardar semanas seleccionadas en Supabase
        router.push('/goalsActions/step6_summary');
    };

    return (
        <View className="flex-1 px-6 pt-14 pb-10 justify-between">
            {/* Título */}
            <View>
                {/*<Text className="text-orange-500 text-lg font-poppinsMedium uppercase tracking-wide">
          Paso 5
        </Text>*/}
                <Text className="text-white text-2xl text-center font-poppinsBold mt-10 pt-5 mb-10">
                    ¿En cuánto tiempo quieres lograrlo?
                </Text>

                <View className="gap-4 mt-20 pt-20">
                    {availableWeeks.map((week) => (
                        <TouchableOpacity
                            key={week}
                            onPress={() => setSelectedWeeks(week)}
                            className={`py-4 px-5 rounded-full border ${selectedWeeks === week
                                    ? 'bg-orange-600 border-orange-500'
                                    : 'bg-neutral-800 border-stone-700'
                                }`}
                        >
                            <Text className="text-white text-lg font-poppinsMedium text-center">
                                {week} semanas
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Botones de navegación */}
            <View className="flex-row justify-between gap-4 mt-12">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="flex-1 bg-stone-100 py-4 rounded-full"
                >
                    <Text className="text-center text-orange-600 font-poppinsBold text-lg">
                        CANCELAR
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleContinue}
                    disabled={!selectedWeeks}
                    className={`flex-1 py-4 rounded-full ${!selectedWeeks ? 'bg-orange-400/60' : 'bg-orange-600'
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
