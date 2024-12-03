import { useState } from "react";
import auth from '@react-native-firebase/auth';
import { LoginUseCase } from "../../../domain/useCases/auth/LoginUseCase";

const LoginViewModel = ({ LoginUseCase }: { LoginUseCase: LoginUseCase }) => {

    const [error, setError] = useState('')

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const onChange = (prop: string, value: any) => {
        setValues({ ...values, [prop]: value })
    }

    const login = async () => {
        if (isValidForm()) {
            const data = await LoginUseCase.execute(values.email, values.password);
            console.log('Data: ', data);
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
        onChange,
        login,
        setError

    }

}

export default LoginViewModel;