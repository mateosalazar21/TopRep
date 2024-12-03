import { useState } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Resource } from "../../../domain/utils/Resource";


const LoginViewModel = ({ LoginUseCase }) => {

    const [error, setError] = useState('')
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    
    const [result, setResult] = useState<FirebaseAuthTypes.UserCredential>()
    const [loading, setLoading] = useState(false);

    const onChange = (prop: string, value: any) => {
        setValues({ ...values, [prop]: value })
    }

    const login = async () => {
        if (isValidForm()) {
            setLoading(true); //Waiting animation
            const {result, error} = await LoginUseCase.run(values.email, values.password);
            setResult(result);
            setError(error); //Null
            setLoading(false);
        }

    }

    const isValidForm = (): boolean => {
        let reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
        return true;

    }

    return {
        ...values,
        error,
        loading,
        onChange,
        login,
        result,
        setError

    }

}

export default LoginViewModel;