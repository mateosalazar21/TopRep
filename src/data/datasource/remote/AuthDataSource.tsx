//Info - Service
import auth from '@react-native-firebase/auth';
import { User } from '../../../domain/models/User';

export const getUser = () => {
    try {
        const data = auth().currentUser;
        return { result: data, error: null };
    } catch (error: any) {
        console.log('Error: ', error);
        return { result: null, error: error.message };
    }
}

export const login = async (email: string, password: string) => {

    try {
        const data = await auth().signInWithEmailAndPassword(email, password);
        return Promise.resolve({ error: null, result: data });
    } catch (error: any) {
        console.log('Error: ', error);
        return Promise.resolve({ error: error.message, result: null });
    }

}

export const register = async (user: User) => {

    try {
        const data = await auth().createUserWithEmailAndPassword(user.email, user.password);
        return Promise.resolve({ error: null, result: data });
    } catch (error: any) {
        console.log('Error: ', error);
        return Promise.resolve({ error: error.message, result: null });
    }

}


export const logout = async () => {

    try {
        await auth().signOut();
        return Promise.resolve({ result: true, error: null });
    } catch (error: any) {
        console.log('Error: ', error);
        return Promise.resolve({ result: null, error: error.message });
    }
}