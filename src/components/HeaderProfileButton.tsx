import { Pressable, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { User } from 'lucide-react-native';

export default function HeaderProfileButton() {
  const router = useRouter();

  return (
    
    <Link href="/profileModal" asChild>
        <Pressable className='mr-4'>
            <User size={24} color="white" />
        </Pressable>
    </Link>
  );
}
