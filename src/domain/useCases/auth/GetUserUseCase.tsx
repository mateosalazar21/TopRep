export const GetUserUseCase = ({AuthRepository}) => {
     return {
         run(){
            const { result, error } = AuthRepository.getUser();
            return { result, error }
        }
     }
}