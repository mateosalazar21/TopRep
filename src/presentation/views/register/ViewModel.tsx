import { confirmPasswordReset } from "@react-native-firebase/auth";
import { useState } from "react";

const RegisterViewModel = ( ) => {

    const [error, setError] = useState('')
    const [values, setValues] = useState({
        username: '',
        email: '',
        password:'',
        confirmPassword:''
    });

    const register = () =>{
        if (isValidForm()) {
            console.log('Elformulario es valido');
            console.log('Valores: ', values);
            
            
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
        error,
        onChange,
        register,
        setError
    }
}
export default RegisterViewModel;