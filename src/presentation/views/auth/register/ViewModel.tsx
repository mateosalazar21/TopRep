import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useState } from "react";

const RegisterViewModel = ( { RegisterUseCase } ) => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<FirebaseAuthTypes.UserCredential>();
    const [values, setValues] = useState({
        username: '',
        email: '',
        password:'',
        confirmPassword:''
    });

    const register = async () =>{
        if (isValidForm()) {
            setLoading(true); //Waiting animation
            const{result, error} = await RegisterUseCase.run(values);
            setResult(result);
            setError(error);
            setLoading(false);
        }
    }

    const onChange = (prop: string, value: any) =>{
        setValues({...values, [prop]: value})
    }

    const isValidForm = (): boolean => {
        let reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (values.username === '') {
            setError('El nombre de ususario no puede estar vacio')
            return false;
        }

        if (values.email === '') {
            setError('El email no puede estar vacio')
            return false;
        }
        if (values.password === '') {
            setError('La contraseña no puede estar vacia')
            return false;
        }
        if (values.password.length < 6) {
            setError('La contraseña no puede tener menos de 6 caracteres')
            return false;
        }
        if (reg.test(values.email) === false) {
            setError('Por favor, ingresa un correo válido')
            return false;
        }
        if (values.password != values.confirmPassword) {
            setError('Las contraseñas no coinciden')
            return false;
        }
        return true;
    }

    return{
        ...values,
        result,
        error,
        loading,
        onChange,
        register,
        setError
    }
}
export default RegisterViewModel;