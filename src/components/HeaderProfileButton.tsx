import { Pressable, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { User } from 'lucide-react-native';

export default function HeaderProfileButton() {
  const router = useRouter();

  return (
    
    <Link href="/profileModal" asChild>
        <Pressable className='mr-4 bg-stone-800 rounded-full p-2'>
            <User size={28} color="white"/>
        </Pressable>
    </Link>
  );
}
