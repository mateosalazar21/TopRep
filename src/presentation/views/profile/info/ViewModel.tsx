import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useState } from "react";
import { User } from "../../../../domain/models/User";

const ProfileInfoViewModel = ({ LogoutUseCase, GetUserUseCase, GetUserByIdUseCase }) => {
    
    const [error, setError] = useState<string | null>(null); // State to store errors
    const [user, setUser] = useState<User | null>(null); // State to store user data
    const [result, setResult] = useState(false); // State to handle logout result

    /**
     * Retrieves the current user's session and fetches their data by ID.
     */
    const getUserSession = async () => {
        try {
            const { result, error } = await GetUserUseCase.run();

            if (error) {
                console.error("Error retrieving user session:", error);
                setError(error);
                return;
            }

            const myUser = result as FirebaseAuthTypes.User;

            if (!myUser || !myUser.uid) {
                console.error("Invalid user or UID");
                setError("Invalid user or UID");
                return;
            }

            getUserById(myUser.uid);
        } catch (e) {
            console.error("Unexpected error in getUserSession:", e);
            setError("Unexpected error in getUserSession");
        }
    };

    /**
     * Fetches user data from the repository by ID.
     * @param id - The user's unique identifier (UID).
     */
    const getUserById = (id: string) => {
        GetUserByIdUseCase.run(id, ({ result, error }) => {
            if (error) {
                console.error("Error fetching user by ID:", error);
                setError(error);
                return;
            }

            console.log("User data retrieved:", result);
            setError(null); // Clear any previous errors
            setUser(result); // Store the user data
        });
    };

    /**
     * Logs out the current user and updates the logout result state.
     */
    const logout = async () => {
        try {
            const { result, error } = await LogoutUseCase.run();
            if (error) {
                console.error("Error during logout:", error);
                setError(error);
                return;
            }
            setResult(result);
        } catch (e) {
            console.error("Unexpected error during logout:", e);
            setError("Unexpected error during logout");
        }
    };

    // Expose the result and functions for external usage
    return {
        result,
        error,
        user,
        logout,
        getUserSession,
        setError,
    };
};

export default ProfileInfoViewModel;
