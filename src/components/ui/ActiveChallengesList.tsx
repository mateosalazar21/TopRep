import { View, Text } from 'react-native';
import { Award } from 'lucide-react-native';

interface ActiveChallengesListProps {
  challenges: any[];
  hasGoals: boolean;
}

export default function ActiveChallengesList({
  challenges,
  hasGoals,
}: ActiveChallengesListProps) {
  return (
    <View className="mt-4">
      <View className="flex-row mb-4 items-center gap-2">
        <Award color="#EA580C" size={26} />
        <Text className="text-orange-600 font-poppinsBold text-xl">
          Desafíos Activos
        </Text>
      </View>

      {!hasGoals || challenges.length === 0 ? (
        <View className="bg-stone-800 rounded-2xl px-5 py-6 border border-stone-700">
          <Text className="text-stone-400 font-poppinsRegular text-base text-center">
            Aún no tienes desafíos activos
          </Text>
        </View>
      ) : (
        challenges.map((challenge) => (
          <View
            key={challenge.result_id}
            className="bg-stone-800 rounded-2xl px-5 py-4 mb-3 border border-stone-700"
          >
            <Text className="text-stone-100 font-poppinsSemiBold text-lg mb-1">
              {challenge.wods.name}
            </Text>
            <Text className="text-stone-400 font-poppinsRegular text-base">
              Aceptado el{' '}
              {new Date(challenge.created_at).toLocaleDateString('es-EC', {
                day: 'numeric',
                month: 'long',
              })}{' '}
              — Esperando resultado
            </Text>
          </View>
        ))
      )}
    </View>
  );
}
