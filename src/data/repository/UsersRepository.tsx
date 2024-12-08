export const UsersRepository = ({ UsersDataSource }) => {
    
    return{
        getUserById(id: string, callback){
            UsersDataSource.getUserById(id, ({result, error}) => {
                callback({result, error});
            }); 
        }
    }
}