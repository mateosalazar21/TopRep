import { User } from "../../models/User"

export const RegisterUseCase = ({AuthRepository}) => {
     return {
        async run(user: User){
            const { result, error } = await AuthRepository.register(user);
            return { result, error }
        }
     }
}