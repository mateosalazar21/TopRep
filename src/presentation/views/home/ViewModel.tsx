import { useState } from "react";

const HomeViewModel = ({ LogoutUseCase}) => {

    const [error, setError] = useState('')
    const [result, setResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        setLoading(true); //Waiting animation
        const {result, error} = await LogoutUseCase.run();
        setResult(result);
        setError(error); //Null
        setLoading(false);
    }

    return {
        result,
        error,
        loading,
        logout,
        setError
    }
}

export default HomeViewModel;