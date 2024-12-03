export const LogoutUseCase = ({AuthRepository}) => {
     return {
        async run(){
            const { result, error } = await AuthRepository.logout();
            return { result, error }
        }
     }
}