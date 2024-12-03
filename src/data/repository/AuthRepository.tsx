//Using awilix (Dependency Injection Container) - easier to organize, maintain, and test code

import { User } from "../../domain/models/User";

export const AuthRepository = ({ AuthDataSource }) => { //AuthDataSource is contained in ioc.tsx in the method register()
    return {
        
        getUser() {
            const { result, error } = AuthDataSource.getUser();
            return { result, error }
        },
        async login(email: string, password: string) {
            const {result, error} = await AuthDataSource.login(email,password);
            return {result, error}
        },
        async register(user: User) {
            const {result, error} = await AuthDataSource.register(user);
            return {result, error}
        },
        async logout() {
            const {result, error} = await AuthDataSource.logout();
            return {result, error}
        }
    }
}