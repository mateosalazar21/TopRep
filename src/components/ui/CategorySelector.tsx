import { View, Text, TouchableOpacity } from 'react-native';

interface CategorySelectorProps<T extends string> {
  categories: { value: T; label: string }[];
  activeCategory: T;
  onChange: (category: T) => void;
}

export default function CategorySelector<T extends string>({
  categories,
  activeCategory,
  onChange,
}: CategorySelectorProps<T>) {
  return (
    <View className="flex-row justify-center gap-4 mb-8">
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat.value}
          onPress={() => onChange(cat.value)}
          className={`flex-1 py-2 rounded-full items-center ${
            activeCategory === cat.value ? 'bg-orange-600' : 'bg-stone-700'
          }`}
        >
          <Text className="text-white font-poppinsMedium">{cat.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
