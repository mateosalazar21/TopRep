//Using awilix (Dependency Injection Container) - easier to organize, maintain, and test code

import { Resource } from "../../domain/Resource";
import { AuthDataSource } from "../datasource/remote/AuthDataSource";

export interface AuthRepository{
    login(email: string, password: string): Promise<Resource>
}

export const AuthRepository = ({ AuthDataSource }: { AuthDataSource:  AuthDataSource}) => {
    return {
        async login(email: string, password: string) {
            return await AuthDataSource.login(email,password);

        }
    }
}