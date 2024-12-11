import { asFunction, asValue, createContainer } from "awilix";
import LoginViewModel from "../presentation/views/auth/login/ViewModel";
import RegisterViewModel from "../presentation/views/auth/register/ViewModel";
import * as AuthDataSource from '../data/datasource/remote/AuthDataSource';
import * as UsersDataSource from '../data/datasource/remote/UsersDataSource'
import { AuthRepository } from "../data/repository/AuthRepository";
import { LoginUseCase } from "../domain/useCases/auth/LoginUseCase";
import { RegisterUseCase } from "../domain/useCases/auth/RegisterUseCase";
import { LogoutUseCase } from "../domain/useCases/auth/LogoutUseCase";
import HomeViewModel from "../presentation/views/home/ViewModel";
import { GetUserUseCase } from "../domain/useCases/auth/GetUserUseCase";
import ProfileInfoViewModel from "../presentation/views/profile/info/ViewModel";
import ProfileUpdateViewModel from "../presentation/views/profile/update/ViewModel"
import { UsersRepository } from "../data/repository/UsersRepository";
import { GetUserByIdUseCase } from "../domain/useCases/users/GetUserByIdUseCase";
import { UpdateUserUseCase } from "../domain/useCases/users/UpdateUserUseCase";
import { UpdateWithImageUserUseCase } from "../domain/useCases/users/UpdateWithImageUserUseCase";


const container = createContainer();

container.register({ //All my injections are located in my ioc.tsx file (here)

    //View model
    LoginViewModel: asFunction(LoginViewModel),
    RegisterViewModel: asFunction(RegisterViewModel),
    HomeViewModel: asFunction(HomeViewModel),
    ProfileInfoViewModel: asFunction(ProfileInfoViewModel),
    ProfileUpdateViewModel: asFunction(ProfileUpdateViewModel),


    //Data source
    AuthDataSource: asValue(AuthDataSource),
    UsersDataSource: asValue(UsersDataSource),

    //Repository
    AuthRepository: asFunction(AuthRepository),
    UsersRepository: asFunction(UsersRepository),

    //Use case
    //Auth
    LoginUseCase: asFunction(LoginUseCase),
    RegisterUseCase: asFunction(RegisterUseCase),
    LogoutUseCase: asFunction(LogoutUseCase),
    GetUserUseCase: asFunction(GetUserUseCase),

    //Users
    GetUserByIdUseCase: asFunction(GetUserByIdUseCase),
    UpdateUserUseCase: asFunction(UpdateUserUseCase),
    UpdateWithImageUserUseCase: asFunction(UpdateWithImageUserUseCase)
});

export default container;