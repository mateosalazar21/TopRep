//Using awilix (Dependency Injection Container) - easier to organize, maintain, and test code

export const LoginUseCase = ({AuthRepository}) => {
    return {
        async run(email: string, password: string){
            const {result, error} = await AuthRepository.login(email, password);
            return {result, error}
        }

    }
} 