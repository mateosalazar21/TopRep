import { View, Text, TouchableOpacity } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { calculateGoalProgress } from '@/components/logic/calculateGoalProgress';
import { useAuth } from '@/context/AuthContext';

interface GoalCardProps {
    type: 'strength' | 'endurance';
    goal: any;
    onDelete: () => void;
}

const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
        .toString()
        .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
};

export default function GoalCard({ type, goal, onDelete }: GoalCardProps) {
    const { user } = useAuth(); // 🔁 asegura que tienes athlete_id
    const [progress, setProgress] = useState<number | null>(null);

    useEffect(() => {
        const loadProgress = async () => {
            if (!user) return;
            const res = await calculateGoalProgress(goal, type, user.id);
            setProgress(res.progressPercent);
        };

        loadProgress();
    }, [goal, type, user]);

    return (
        <View className="px-5 py-4 mb-4 rounded-2xl border border-orange-600 bg-orange-700/30 relative">
            <TouchableOpacity
                onPress={onDelete}
                className="absolute top-3 right-3"
            >
                <Trash2 size={20} color="#fff" />
            </TouchableOpacity>

            <Text className="text-white font-poppinsBold text-lg mb-1 capitalize">
                {goal.exercise_name.replace('_', ' ')}
            </Text>

            {type === 'strength' ? (
                <Text className="text-white font-poppinsMedium text-base">
                    De {goal.current_pr_lb} lb a {goal.target_pr_lb} lb
                </Text>
            ) : (
                <Text className="text-white font-poppinsMedium text-base">
                    De {formatTime(goal.current_time_sec)} a {formatTime(goal.target_time_sec)}
                </Text>
            )}

            <Text className="text-stone-300 font-poppinsMedium text-sm mt-1">
                Estimación: {goal.recommended_weeks}–{goal.max_weeks} semanas
            </Text>

            {progress !== null && (
                <Text className="text-green-400 font-poppinsMedium text-sm mt-2">
                    Progreso basado en desafíos: {progress.toFixed(1)}%
                </Text>
            )}
        </View>
    );
}
