import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { supabase } from '@/lib/supabase';
import React from 'react';

import { Input } from '@/components/reusables/ui/input'
import { Label } from '@/components/reusables/ui/label';
import { Eye, EyeOff } from 'lucide-react-native';
import FullScreenLoader from '@/components/ui/FullScreenLoader';


export default function SignInScreen() {
    const navigation = useNavigation();
    const router = useRouter();
    //const { from } = useLocalSearchParams();

    // 📌 Estado de inputs y loadertyrion@mail.com
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // 📌 Personalización del header
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Ingresa tus datos',
            headerBackButtonDisplayMode: 'minimal',
            headerTransparent: true,
        })
    }, [navigation]);

    // // 📌 Mostrar alerta si el usuario viene de "signup"
    // useEffect(() => {
    //     if (from === 'signup') {
    //         Alert.alert('Ingresa con los datos con los que te registraste.');
    //     }
    // }, [from]);


    // 📌 Nueva función de login
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Campos incompletos, por favor completa tu correo y contraseña');
            return;
        }

        setIsLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('LOGIN ERROR:', error);
            Alert.alert('Error al iniciar sesión: ' + error.message);
            setIsLoading(false);
            return;
        }

        // ✅ La sesión se guarda automáticamente en AsyncStorage
        // ✅ AuthContext se actualiza con onAuthStateChange
        // ✅ index.tsx redirige según el estado de onboarding

        router.replace('/'); // 🔁 Solo lo mandamos al index para que la lógica fluya
    };

    // 🎨 Estilo compartido para inputs
    const inputStyle = "bg-stone-50 text-stone-700 border-stone-700 rounded-xl px-4 py-3 font-poppinsMedium";


    return (
        <View className='flex-1 items-center justify-center'>
            {isLoading && <FullScreenLoader message="Iniciando sesión..." />}

            <View className='w-4/5'>
                <Label nativeID='email' className='text-stone-50 font-poppinsMedium mb-2'>
                    Correo electrónico
                </Label>
                <Input
                    value={email}
                    onChangeText={setEmail}
                    placeholder='correo@ejemplo.com'
                    autoCapitalize="none"
                    keyboardType="email-address"
                    className={inputStyle}
                    aria-labelledby='inputLabel'
                    aria-errormessage='inputError'
                />
            </View>

            <View className='w-4/5 mt-5'>

                <Label nativeID='password' className='text-stone-50 text-lg font-poppinsMedium mb-2'>
                    Contraseña
                </Label>

                <View className='flex-row items-center justify-between bg-stone-50 border-stone-700 rounded-xl'>
                    <Input
                        value={password}
                        onChangeText={setPassword}
                        placeholder='••••••••'
                        secureTextEntry={!showPassword}
                        className='border-0 font-poppinsMedium text-stone-700 pl-5'
                        aria-labelledby='inputLabel'
                        aria-errormessage='inputError'
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
        </View>
    );
}