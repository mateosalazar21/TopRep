export const GetUserByIdUseCase = ({UsersRepository}) => {
    return{
        run(id: string, callback) {
            UsersRepository.getUserById(id, ({result, error}) => {
                callback({result,error});
            })
        }
    }
}