import { asFunction, asValue, createContainer } from "awilix";
import LoginViewModel from "../presentation/views/login/ViewModel";
import RegisterViewModel from "../presentation/views/register/ViewModel";
import * as AuthDataSource from '../data/datasource/remote/AuthDataSource';
import { AuthRepository } from "../data/repository/AuthRepository";
import { LoginUseCase } from "../domain/useCases/auth/LoginUseCase";


const container = createContainer();

container.register({
    LoginViewModel: asFunction(LoginViewModel),
    RegisterViewModel: asFunction(RegisterViewModel),
    AuthDataSource: asValue(AuthDataSource),
    AuthRepository: asFunction(AuthRepository),
    LoginUseCase: asFunction(LoginUseCase)
});

export default container;