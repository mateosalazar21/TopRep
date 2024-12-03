import { asFunction, asValue, createContainer } from "awilix";
import LoginViewModel from "../presentation/views/login/ViewModel";
import RegisterViewModel from "../presentation/views/register/ViewModel";
import * as AuthDataSource from '../data/datasource/remote/AuthDataSource';
import { AuthRepository } from "../data/repository/AuthRepository";
import { LoginUseCase } from "../domain/useCases/auth/LoginUseCase";
import { RegisterUseCase } from "../domain/useCases/auth/RegisterUseCase";
import { LogoutUseCase } from "../domain/useCases/auth/LogoutUseCase";
import HomeViewModel from "../presentation/views/home/ViewModel";
import { GetUserUseCase } from "../domain/useCases/auth/GetUserUseCase";


const container = createContainer();

container.register({ //All my injections are located in my ioc.tsx file (here)

    //View model
    LoginViewModel: asFunction(LoginViewModel),
    RegisterViewModel: asFunction(RegisterViewModel),
    HomeViewModel: asFunction(HomeViewModel),


    //Data source
    AuthDataSource: asValue(AuthDataSource),

    //Repository
    AuthRepository: asFunction(AuthRepository),

    //Use case
    LoginUseCase: asFunction(LoginUseCase),
    RegisterUseCase: asFunction(RegisterUseCase),
    LogoutUseCase: asFunction(LogoutUseCase),
    GetUserUseCase: asFunction(GetUserUseCase),
});

export default container;