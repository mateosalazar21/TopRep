import { View, Text } from 'react-native';
import { Trophy } from 'lucide-react-native';

interface LeaderboardEntry {
  athlete_id: string;
  athlete_name: string;
  score_value: number;
  scoring_type: 'load' | 'time' | 'reps';
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

const formatScore = (score: number, type: 'load' | 'time' | 'reps') => {
  if (type === 'time') {
    const m = Math.floor(score / 60)
      .toString()
      .padStart(2, '0');
    const s = Math.floor(score % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${s} min`;
  }
  if (type === 'load') return `${score.toFixed(1)} lb`;
  if (type === 'reps') return `${score} reps`;
  return score.toString();
};

export default function Leaderboard({ entries }: LeaderboardProps) {
  console.log('🧪 Total entries recibidas en Leaderboard:', entries.length);
  console.log('🧪 Entradas:', entries);

  return (
    <View className="bg-stone-800 rounded-2xl px-4 py-5 border border-stone-700">

      <Text className="text-stone-500 text-xs text-center mb-4">
        Total atletas inscritos: {entries.length}
      </Text>

      {entries.length === 0 ? (
        <Text className="text-stone-400 text-center font-poppinsRegular">
          Aún no hay resultados registrados
        </Text>
      ) : (
        entries.map((entry, index) => {
          console.log(`🧪 Entry ${index + 1}:`, entry.athlete_name, '-', entry.score_value);

          return (
            <View
              key={entry.athlete_id}
              className="flex-row items-center justify-between mb-2"
            >
              <View className="flex-row items-center gap-3">
                <Text className="text-white font-poppinsBold text-base">
                  #{index + 1}
                </Text>
                <Text className="text-white font-poppinsMedium text-base">
                  {entry.athlete_name || 'Sin nombre'}
                </Text>
              </View>

              <Text
                className={`font-poppinsMedium text-base ${
                  entry.score_value === 0
                    ? 'text-yellow-400 italic'
                    : 'text-orange-400'
                }`}
              >
                {entry.score_value === 0
                  ? 'Pendiente'
                  : formatScore(entry.score_value, entry.scoring_type)}
              </Text>
            </View>
          );
        })
      )}
    </View>
  );
}
