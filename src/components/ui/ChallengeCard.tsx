import { View, Text, TouchableOpacity } from 'react-native';
import { Dumbbell, Timer, CheckCircle } from 'lucide-react-native';

interface ChallengeCardProps {
  wod: {
    wod_id: string;
    name: string;
    description: string;
    wod_type: string;
    scoring_type: string;
  };
  onAccept: () => void;
  submitting: boolean;
  result?: {
    score_value: number;
    notes?: string;
  };
}

export default function ChallengeCard({
  wod,
  onAccept,
  submitting,
  result,
}: ChallengeCardProps) {
  const getIcon = (type: string) => {
    if (type === 'strength') return <Dumbbell size={24} color="#EA580C" />;
    if (type === 'endurance') return <Timer size={24} color="#EA580C" />;
    return null;
  };

  const isCompleted = result && result.score_value > 0;
  const isPending = result && result.score_value === 0;

  const renderScore = () => {
    if (!result) return null;

    if (wod.scoring_type === 'time') {
      const min = Math.floor(result.score_value / 60)
        .toString()
        .padStart(2, '0');
      const sec = Math.floor(result.score_value % 60)
        .toString()
        .padStart(2, '0');
      return `${min}:${sec}`;
    }

    if (wod.scoring_type === 'load') {
      return `${result.score_value.toFixed(1)} lb`;
    }

    if (wod.scoring_type === 'reps') {
      return `${Math.round(result.score_value)} reps`;
    }

    return `${result.score_value}`;
  };

  return (
    <View className="bg-stone-800 rounded-3xl px-5 py-5 mb-4 border border-stone-700">
      {/* Tipo e ícono */}
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-orange-600 font-poppinsMedium text-base uppercase tracking-wider">
          {wod.wod_type === 'strength'
            ? 'Fuerza'
            : wod.wod_type === 'endurance'
            ? 'Resistencia'
            : 'Otro'}
        </Text>
        {getIcon(wod.wod_type)}
      </View>

      {/* Nombre y descripción */}
      <Text className="text-white font-poppinsBold text-xl mb-1">
        {wod.name}
      </Text>
      <Text className="text-stone-300 font-poppinsRegular text-base mb-4">
        {wod.description}
      </Text>

      {/* Estado del desafío */}
      {!result && (
        <TouchableOpacity
          onPress={onAccept}
          disabled={submitting}
          className="bg-orange-600 py-3 rounded-xl"
        >
          <Text className="text-white text-center font-poppinsMedium">
            Aceptar desafío
          </Text>
        </TouchableOpacity>
      )}

      {isPending && (
        <View className="flex-row justify-center items-center mt-2 gap-2">
          <CheckCircle size={18} color="#facc15" />
          <Text className="text-yellow-400 font-poppinsRegular text-sm">
            Ya inscrito – esperando resultado
          </Text>
        </View>
      )}

      {isCompleted && (
        <View className="flex-row justify-center items-center mt-2 gap-2">
          <CheckCircle size={18} color="#22c55e" />
          <Text className="text-green-500 font-poppinsRegular text-sm">
            Completado — {renderScore()}
          </Text>
        </View>
      )}
    </View>
  );
}
