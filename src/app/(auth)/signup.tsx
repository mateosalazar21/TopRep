import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Input } from '@/components/reusables/ui/input'
import { Label } from '@/components/reusables/ui/label';
import React from 'react';
import { useRouter } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';



export default function SignUpScreen() {

    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Crea tu cuenta',
            headerBackButtonDisplayMode: 'minimal',
            headerTransparent: true,
        })
    }, [navigation]);

    const [name, setName] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const router = useRouter();

    const handleSignup = async () => {
        if (!email || !password) {
            alert('Por favor completa el correo y la contraseña');
            return;
        }

        if (username.length < 5 || username.length > 20 || !/^[a-zA-Z0-9_]+$/.test(username)) {
            alert('El nombre de usuario debe tener entre 5 y 20 caracteres y solo puede incluir letras, números y _');
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            console.error('SUPABASE SIGNUP ERROR:', JSON.stringify(error, null, 2));
            alert('Error al registrarse: ' + error.message);
            return;
        }

        alert(`Genial ${name}! Tu cuenta fue creada con éxito.`);
        router.push('/(auth)/signin');
    };


    const inputStyle = "bg-stone-50 text-stone-700 border-stone-700 rounded-xl px-4 py-3 font-poppinsMedium"

    return (
        <View className='flex-1 items-center justify-center '>
            <View className='w-4/5'>
                <Label nativeID='inputLabel' className='text-stone-50 font-poppinsMedium mb-2'>
                    Nombre
                </Label>
                <Input
                    placeholder='Ariel'
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    aria-labelledby='inputLabel'
                    aria-errormessage='inputError'
                    className={inputStyle}
                />
            </View>

            <View className='w-4/5 mt-5'>
                <Label nativeID='inputLabel' className='text-stone-50 font-poppinsMedium mb-2'>
                    Apellido
                </Label>
                <Input
                    placeholder='Pérez'
                    value={surname}
                    onChangeText={setSurname}
                    autoCapitalize="words"
                    aria-labelledby='inputLabel'
                    aria-errormessage='inputError'
                    className={inputStyle}
                />
            </View>

            <View className='w-4/5 mt-5'>
                <Label nativeID='inputLabel' className='text-stone-50 text-lg font-poppinsMedium mb-2'>
                    Nombre de usuario
                </Label>
                <Input
                    placeholder='Tu nombre de usuario'
                    value={username}
                    onChangeText={setUsername}
                    aria-labelledby='inputLabel'
                    aria-errormessage='inputError'
                    autoCapitalize="none"
                    autoCorrect={false}
                    className={inputStyle}
                />
            </View>

            <View className='w-4/5 mt-5'>
                <Label nativeID='inputLabel' className='text-stone-50 text-lg font-poppinsMedium mb-2'>
                    Correo electrónico
                </Label>
                <Input
                    placeholder='ejemplo@mail.com'
                    value={email}
                    onChangeText={setEmail}
                    aria-labelledby='inputLabel'
                    aria-errormessage='inputError'
                    autoCapitalize="none"
                    autoCorrect={false}
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
                    onPress={handleSignup}
                    className='bg-orange-600 p-4 rounded-full w-full items-center'
                >
                    <Text
                        className='font-poppinsSemiBold text-xl text-stone-50'>
                        REGÍSTRATE
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}