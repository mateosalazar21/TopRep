import { View, Text, TouchableOpacity } from 'react-native';

interface CategorySelectorProps {
  activeCategory: 'strength' | 'endurance';
  onChange: (category: 'strength' | 'endurance') => void;
}

export default function CategorySelector({
  activeCategory,
  onChange,
}: CategorySelectorProps) {
  return (
    <View className="flex-row justify-center gap-4 mb-8">
      <TouchableOpacity
        onPress={() => onChange('strength')}
        className={`flex-1 py-2 rounded-full items-center ${
          activeCategory === 'strength' ? 'bg-orange-600' : 'bg-stone-700'
        }`}
      >
        <Text className="text-white font-poppinsMedium">Fuerza</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onChange('endurance')}
        className={`flex-1 py-2 rounded-full items-center ${
          activeCategory === 'endurance' ? 'bg-orange-600' : 'bg-stone-700'
        }`}
      >
        <Text className="text-white font-poppinsMedium">Resistencia</Text>
      </TouchableOpacity>
    </View>
  );
}
