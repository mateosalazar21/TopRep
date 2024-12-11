import { User } from "../../models/User";

export const UpdateUserUseCase = ({UsersRepository}) => {
    return{
        async run(id: string, user: User){
            const {result, error} = await UsersRepository.update(id, user);
            return {result, error};
        }
    }
}