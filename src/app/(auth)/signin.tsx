import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useLayoutEffect } from 'react';
import { Input } from '@/components/reusables/ui/input'
import { Label } from '@/components/reusables/ui/label';
import { Eye, EyeOff } from 'lucide-react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';

export default function SignInScreen() {

    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Ingresa tus datos',
            headerBackButtonDisplayMode: 'minimal',
            headerTransparent: true,
        })
    }, [navigation]);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            alert('Por favor completa tu correo y contraseña');
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('LOGIN ERROR:', error);
            alert('Error al iniciar sesión: ' + error.message);
            return;
        }

        alert('¡Bienvenid@!');
        router.replace('/(tabs)');
    };

    const { from } = useLocalSearchParams();

    useEffect(() => {
        if (from === 'signup') {
            alert('Ingresa con los datos que usaste para registrarte.');
        }
    }, [from]);

    const inputStyle = "bg-stone-50 text-stone-700 border-stone-700 rounded-xl px-4 py-3 font-poppinsMedium";


    return (
        <View className='flex-1 items-center justify-center'>

            <View className='w-4/5'>
                <Label nativeID='inputLabel' className='text-stone-50 font-poppinsMedium mb-2'>
                    Correo electrónico
                </Label>
                <Input
                    placeholder='ejemplo@mail.com'
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    aria-labelledby='inputLabel'
                    aria-errormessage='inputError'
                    className={inputStyle}
                />
            </View>

            <View className='w-4/5 mt-5'>

                <Label nativeID='inputLabelPassword' className='text-stone-50 text-lg font-poppinsMedium mb-2'>
                    Contraseña
                </Label>

                <View className='flex-row items-center justify-between bg-stone-50 border-stone-700 rounded-xl'>
                    <Input
                        placeholder='Contraseña'
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        aria-labelledby='inputLabel'
                        aria-errormessage='inputError'
                        className='border-0 font-poppinsMedium text-stone-700 pl-5'
                    />
                    <TouchableOpacity

                        className='pr-5'
                        onPress={() => setShowPassword(prev => !prev)}
                    >
                        {showPassword ? (
                            <EyeOff color="#334155" size={20} />
                        ) : (
                            <Eye color="#334155" size={20} />
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            <View className='w-4/5 mt-10'>
                <TouchableOpacity
                    onPress={handleLogin}
                    className='bg-orange-600 p-4 rounded-full w-full items-center'
                >
                    <Text
                        className='font-poppinsSemiBold text-xl text-stone-50'>
                        INGRESAR
                    </Text>
                </TouchableOpacity>
            </View>

            {/* <View className='w-4/5 mt-1'>
                <TouchableOpacity
                    onPress=''
                    className='p-4 w-full items-center'
                >
                    <Text
                        className='font-poppinsMedium text-xl text-stone-50'>
                        RESTABLECER CONTRASEÑA
                    </Text>
                </TouchableOpacity>
            </View> */}

        </View>
    );
}